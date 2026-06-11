"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  FileText, 
  Clock, 
  ArrowRight,
  Zap
} from "lucide-react";
import Link from "next/link";

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

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile?.displayName || "Developer"}</h1>
        <p className="text-muted-foreground">Manage your documentation projects and convert them to PDFs.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Credits</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.dailyConversions || 0} / 10</div>
            <p className="text-xs text-muted-foreground">Resets at midnight UTC</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Active Markdown files</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Limit</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">Basic features enabled</p>
          </CardContent>
        </Card>
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pro Features</CardTitle>
            <GithubIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Off</div>
            <Link href="/pricing" className="text-xs text-primary hover:underline">Upgrade to unlock</Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4 border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your recently edited Markdown files.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No projects yet</h3>
              <p className="text-sm text-muted-foreground mb-6">Create your first Markdown document to get started.</p>
              <Link href="/editor">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3 border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full justify-between h-auto py-4 px-6 group" asChild>
              <Link href="/editor">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-semibold">Create from Scratch</span>
                  <span className="text-xs text-muted-foreground">Open the Markdown editor</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between h-auto py-4 px-6 group" asChild>
              <Link href="/editor?import=github">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-semibold">Import from GitHub</span>
                  <span className="text-xs text-muted-foreground">Import README or Repository</span>
                </div>
                <GithubIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between h-auto py-4 px-6 group">
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold">Browse Templates</span>
                <span className="text-xs text-muted-foreground">Documentation, Resume, Ebooks</span>
              </div>
              <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
