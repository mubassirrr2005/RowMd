"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  FileText, 
  Clock, 
  ArrowRight,
  Zap,
  ShieldCheck,
  GithubIcon
} from "lucide-react";
import { isSameDay } from "date-fns";
import Link from "next/link";

export default function DashboardPage() {
  const { profile } = useAuth();

  // Compute effective daily conversions
  let effectiveDailyConversions = 0;
  if (profile && profile.lastConversionDate) {
    const lastConversionDate = profile.lastConversionDate.toDate ? profile.lastConversionDate.toDate() : profile.lastConversionDate;
    if (isSameDay(lastConversionDate, new Date())) {
      effectiveDailyConversions = profile.dailyConversions;
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile?.displayName || "Developer"}</h1>
        <p className="text-muted-foreground">Manage your documentation projects and convert them to PDFs.</p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-sm font-medium">Daily Credits</CardTitle>
               <Zap className="h-4 w-4 text-primary" />
             </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {effectiveDailyConversions} / 10
                </div>
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
               <CardTitle className="text-sm font-medium">Plan</CardTitle>
               <ShieldCheck className="h-4 w-4 text-primary" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">Free</div>
               <p className="text-xs text-muted-foreground">All features included</p>
             </CardContent>
           </Card>
         </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
         <Card className="md:col-span-7 border-border/40 bg-card/50 backdrop-blur-sm">
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
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Link href="/editor">
                    <Button className="flex-1 gap-2">
                      <Plus className="h-4 w-4" />
                      New Project
                    </Button>
                  </Link>
                  <Link href="/editor?import=github">
                    <Button className="flex-1 gap-2">
                      <GithubIcon className="h-4 w-4" />
                      Import from GitHub
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
         </Card>
       </div>
    </div>
  );
}
