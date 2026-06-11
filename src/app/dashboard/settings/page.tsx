"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { user, profile } = useAuth();

  if (!user || !profile) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account details and subscription.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="h-24 w-24 border border-border">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
              <AvatarFallback className="text-2xl">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex-1 w-full">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={user.displayName || ""} disabled className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email || ""} disabled className="bg-muted/50" />
                <p className="text-xs text-muted-foreground">Managed by your authentication provider.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Manage your current usage and limits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${profile.plan === "pro" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg capitalize">{profile.plan} Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.plan === "free" ? "10 conversions per day" : "Unlimited conversions"}
                  </p>
                </div>
              </div>
              {profile.plan === "free" && (
                <Link href="/pricing">
                  <Button>Upgrade to Pro</Button>
                </Link>
              )}
            </div>

            <div className="space-y-2">
              <Label>Daily Usage</Label>
              <div className="flex justify-between text-sm mb-1">
                <span>{profile.dailyConversions} conversions used</span>
                <span className="text-muted-foreground">10 maximum</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: `${(profile.dailyConversions / 10) * 100}%` }} 
                />
              </div>
            </div>
            
            <div className="pt-4 text-sm text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Member since {profile.createdAt?.toDate ? format(profile.createdAt.toDate(), "MMM d, yyyy") : "recently"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
