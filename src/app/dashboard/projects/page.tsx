"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, ExternalLink, Download, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function ProjectsPage() {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "projects"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })).sort((a: any, b: any) => {
          const dateA = a.updatedAt?.toDate ? a.updatedAt.toDate() : 0;
          const dateB = b.updatedAt?.toDate ? b.updatedAt.toDate() : 0;
          return dateB - dateA;
        });
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground">Manage and edit your saved Markdown files.</p>
        </div>
        <Link href="/editor">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No projects found</h3>
            <p className="text-sm text-muted-foreground mb-6">You haven&apos;t saved any projects yet.</p>
            <Link href="/editor">
              <Button variant="outline">Create your first project</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-colors group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-4 line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last edited {project.updatedAt?.toDate ? format(project.updatedAt.toDate(), "MMM d, yyyy") : "recently"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 flex gap-2">
                <Link href={`/editor?id=${project.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">Edit</Button>
                </Link>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
