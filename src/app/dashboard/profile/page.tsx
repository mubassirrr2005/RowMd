"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, profile } = useAuth();

  if (!user || !profile) return null;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your public profile and identity.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>This is your avatar from your login provider.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border border-border">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
              <AvatarFallback className="text-2xl">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                We currently sync your profile picture with your authentication provider (Google/GitHub).
              </p>
              <Button variant="outline" disabled>Change Avatar</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input value={user.displayName || "Unknown User"} disabled className="bg-muted/50 max-w-md" />
            </div>
            
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={user.email || ""} disabled className="bg-muted/50 max-w-md" />
            </div>

            <div className="space-y-2">
              <Label>Account ID</Label>
              <Input value={user.uid} disabled className="bg-muted/50 max-w-md font-mono text-xs" />
            </div>

            <div className="pt-4 border-t border-border/40 text-sm text-muted-foreground">
              Account created: {profile.createdAt?.toDate ? format(profile.createdAt.toDate(), "MMMM do, yyyy") : "recently"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
