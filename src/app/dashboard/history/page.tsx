"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function HistoryPage() {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !db) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "projects"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const historyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })).sort((a: any, b: any) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : 0;
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : 0;
          return dateB - dateA; // Sort by creation date descending
        });
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conversion History</h1>
        <p className="text-muted-foreground">A timeline of your recent Markdown to PDF conversions and created projects.</p>
      </div>

      <div className="relative border-l border-border/40 ml-4 pl-6 space-y-8">
        {history.length === 0 ? (
          <div className="text-muted-foreground">No history found. Create your first project to get started!</div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="relative">
              <div className="absolute -left-[35px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm group hover:border-primary/40 transition-colors">
                <CardHeader className="py-4 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {item.createdAt?.toDate ? format(item.createdAt.toDate(), "PPpp") : "Unknown Date"}
                    </CardDescription>
                  </div>
                  <Link href={`/editor?id=${item.id}`}>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                      Open <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="pb-4 text-sm text-muted-foreground">
                  Template used: <span className="capitalize text-foreground font-medium">{item.template}</span>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
