"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileText, 
  Layout, 
  Code, 
  Layers, 
  Zap, 
  ShieldCheck 
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

import { Logo } from "@/components/ui/logo";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">RowMD</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Start Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                <span>Now with GitHub Import</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
              >
                Convert Markdown to <span className="text-primary">Beautiful PDFs</span> in Seconds
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed"
              >
                Professional templates, syntax highlighting, and GitHub integration. 
                The most developer-friendly Markdown-to-PDF converter.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    View Demo
                  </Button>
                </Link>
              </motion.div>

              {/* Preview UI Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-16 w-full max-w-5xl rounded-xl border border-border bg-card/50 p-2 shadow-2xl backdrop-blur-sm"
              >
                <div className="rounded-lg border border-border/40 bg-background overflow-hidden aspect-[16/10] flex">
                  {/* Mock Editor */}
                  <div className="w-1/2 border-r border-border p-4 bg-muted/30">
                    <div className="flex gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500/50" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                      <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-3 font-mono text-sm text-muted-foreground">
                      <p className="text-primary"># Introduction</p>
                      <p>RowMD is a modern SaaS application...</p>
                      <p className="text-primary">## Features</p>
                      <p>- **Professional Templates**</p>
                      <p>- **GitHub Integration**</p>
                      <p>- **Syntax Highlighting**</p>
                      <p className="mt-4">```javascript</p>
                      <p>function greet() {'{'}</p>
                      <p>  console.log("Hello World");</p>
                      <p>{'}'}</p>
                      <p>```</p>
                    </div>
                  </div>
                  {/* Mock PDF Preview */}
                  <div className="w-1/2 p-8 bg-white text-black flex flex-col">
                    <div className="h-4 w-24 bg-black/10 rounded mb-6 self-end" />
                    <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                    <p className="text-sm mb-6 text-gray-600">RowMD is a modern SaaS application built for developers who need to convert documentation into professional documents.</p>
                    <h3 className="text-lg font-bold mb-2">Features</h3>
                    <ul className="text-sm space-y-1 list-disc pl-4 mb-6">
                      <li>Professional Templates</li>
                      <li>GitHub Integration</li>
                      <li>Syntax Highlighting</li>
                    </ul>
                    <div className="rounded p-4 bg-gray-900 text-white font-mono text-xs">
                      <p><span className="text-blue-400">function</span> <span className="text-yellow-400">greet</span>() {'{'}</p>
                      <p>&nbsp;&nbsp;<span className="text-gray-400">console</span>.<span className="text-yellow-400">log</span>(<span className="text-green-400">&quot;Hello World&quot;</span>);</p>
                      <p>{'}'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Everything you need for perfect documentation</h2>
              <p className="text-muted-foreground md:text-lg mx-auto max-w-[700px]">Built with a developer-first mindset, focusing on quality, speed, and customization.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<GithubIcon className="h-6 w-6" />}
                title="GitHub Import"
                description="Import READMEs and documentation directly from your repositories via URL."
              />
              <FeatureCard 
                icon={<Code className="h-6 w-6" />}
                title="Syntax Highlighting"
                description="Support for 100+ languages with beautiful themes preserved in the PDF."
              />
              <FeatureCard 
                icon={<Layout className="h-6 w-6" />}
                title="Professional Templates"
                description="Choose from documentation, resume, ebook, or technical report templates."
              />
              <FeatureCard 
                icon={<Zap className="h-6 w-6" />}
                title="Instant Generation"
                description="Powered by Puppeteer for pixel-perfect, high-resolution PDF rendering."
              />
              <FeatureCard 
                icon={<ShieldCheck className="h-6 w-6" />}
                title="Secure & Private"
                description="We store your Markdown and settings securely. Your content is yours."
              />
              <FeatureCard 
                icon={<Layers className="h-6 w-6" />}
                title="Customizable"
                description="Adjust margins, fonts, colors, and headers to match your brand."
              />
              <FeatureCard 
                icon={<FileText className="h-6 w-6" />}
                title="Live Preview"
                description="See changes in real-time as you type or edit your Markdown."
              />
              <FeatureCard 
                icon={<ArrowRight className="h-6 w-6" />}
                title="A4 / Letter Support"
                description="Full control over page sizes and print settings for professional printing."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground md:text-lg">Start for free and upgrade when you need more power.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-2xl border border-border bg-card p-8 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-muted-foreground mb-6">Perfect for individual projects and hobbyists.</p>
                <div className="text-4xl font-bold mb-6">$0 <span className="text-lg font-normal text-muted-foreground">/ month</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> 10 conversions per day</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Basic Templates</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Standard PDF rendering</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> GitHub Import (Public repos)</li>
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </div>
              {/* Pro Plan */}
              <div className="rounded-2xl border-2 border-primary bg-card p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary px-3 py-1 text-xs font-bold text-primary-foreground rounded-bl-lg uppercase">Recommended</div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-muted-foreground mb-6">For professional teams and power users.</p>
                <div className="text-4xl font-bold mb-6">$12 <span className="text-lg font-normal text-muted-foreground">/ month</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Unlimited conversions</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> All Pro Templates</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> High-Resolution rendering</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Private GitHub Repos</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Custom fonts & branding</li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full">Upgrade to Pro</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="text-lg font-bold tracking-tight">RowMD</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 RowMD. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">GitHub</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors group">
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
