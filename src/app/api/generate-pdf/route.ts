import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { renderMarkdown } from "@/lib/markdown";
import { getTemplateHtml, TemplateType } from "@/lib/templates";
import { adminAuth, adminDb, FieldValue } from "@/lib/firebase-admin";

// Configure chromium for serverless vs local
const getBrowser = async () => {
  if (process.env.NODE_ENV === "development") {
    // For local development on Windows/Mac
    const localPuppeteer = (await import("puppeteer")).default;
    return localPuppeteer.launch({
      headless: true,
    });
  }

  // For production (Vercel/AWS Lambda)
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
};

export async function POST(req: NextRequest) {
  try {
    const { markdown, title, template = "github", idToken } = await req.json();

    if (!markdown) {
      return NextResponse.json({ error: "Markdown content is required" }, { status: 400 });
    }

    // 0. Verify User and Usage
    let userId = null;
    if (idToken && adminAuth && adminDb) {
      try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        userId = decodedToken.uid;

         // Check usage tracking
        const userRef = adminDb.collection("users").doc(userId);
        const userDoc = await userRef.get();
        
        if (userDoc.exists) {
          const userData = userDoc.data();
          const plan = userData?.plan || "free";
          const dailyConversions = userData?.dailyConversions || 0;
          
          // Daily limit for free plan - configurable via environment variable
          const DAILY_LIMIT = parseInt(process.env.DAILY_CONVERSION_LIMIT || "10", 10);
          
          if (plan === "free" && dailyConversions >= DAILY_LIMIT) {
            return NextResponse.json({ 
              error: `Daily conversion limit (${DAILY_LIMIT}) reached. Please try again tomorrow.` 
            }, { status: 403 });
          }

          // Increment conversions using the exported FieldValue
          await userRef.update({
            dailyConversions: FieldValue.increment(1),
            monthlyConversions: FieldValue.increment(1),
            lastConversionDate: FieldValue.serverTimestamp(),
          });
        }
      } catch (e) {
        console.error("Auth verification failed:", e);
      }
    }

    // 1. Convert Markdown to HTML
    const contentHtml = renderMarkdown(markdown);
    
    // 2. Inject into Template
    const fullHtml = getTemplateHtml(contentHtml, template as TemplateType, title);

    // 3. Launch Puppeteer
    const browser = await getBrowser();
    const page = await browser.newPage();

    // Set content and wait for it to be ready
    await page.setContent(fullHtml, { waitUntil: "load" });

    // 4. Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    await browser.close();

    // 5. Return PDF
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${title || "document"}.pdf"`,
      },
    });
  } catch (error: unknown) {
    console.error("PDF Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to generate PDF: " + errorMessage }, { status: 500 });
  }
}
