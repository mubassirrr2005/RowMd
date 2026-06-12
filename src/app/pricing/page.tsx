"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex h-16 items-center justify-between border-b border-border/40 px-6 bg-background/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">RowMD</span>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">Go to Dashboard</Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-24 px-4">
        <div className="text-center mb-16 space-y-4 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground md:text-xl">
            Choose the plan that best fits your workflow. Upgrade anytime to unlock unlimited PDF generation and pro features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {/* Free Plan */}
          <div className="rounded-2xl border border-border bg-card p-8 flex flex-col shadow-sm">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-muted-foreground mb-6">Perfect for individual developers and small projects.</p>
            <div className="text-5xl font-bold mb-6">$0 <span className="text-lg font-normal text-muted-foreground">/ month</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> 10 PDF conversions per day</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> Basic Templates (GitHub, Docs)</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> GitHub Repository Import</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> Cloud Project Storage</li>
            </ul>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full py-6 text-lg">Current Plan</Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="rounded-2xl border-2 border-primary bg-card p-8 flex flex-col relative shadow-xl shadow-primary/10">
            <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-xs font-bold text-primary-foreground rounded-bl-lg uppercase tracking-wider">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-muted-foreground mb-6">For power users, writers, and professional teams.</p>
            <div className="text-5xl font-bold mb-6">$12 <span className="text-lg font-normal text-muted-foreground">/ month</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> Unlimited PDF conversions</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> All Pro Templates (Resume, Ebook)</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> High-Resolution Print Output</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> Custom margins & font loading</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /> Priority email support</li>
            </ul>
            <Button className="w-full py-6 text-lg" onClick={() => alert("Stripe Integration Coming Soon!")}>Upgrade to Pro</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
