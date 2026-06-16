"use client";

import { useState, useRef, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { renderMarkdown } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Save, 
  ChevronLeft, 
  Eye,
  Code2,
  Loader2,
  Upload,
} from "lucide-react";
import Link from "next/link";


import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";



import { Logo } from "@/components/ui/logo";
import { TemplateType } from "@/lib/templates";
import { FaGithub } from "react-icons/fa";

export default function EditorPage() {
  const [markdown, setMarkdown] = useState("# Welcome to RowMD\n\nStart writing your documentation here...");
  const html = useMemo(() => renderMarkdown(markdown), [markdown]);
  const [title, setTitle] = useState("Untitled Project");
  const [template, setTemplate] = useState<TemplateType>("github");
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState<"split" | "editor" | "preview">("split");
  const [githubUrl, setGithubUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const { user } = useAuth();
  const previewRef = useRef<HTMLDivElement>(null);


  const handleSave = async () => {
    if (!user) {
      toast.error("Please login to save projects");
      return;
    }
    setIsSaving(true);
    try {
      await addDoc(collection(db, "projects"), {
        userId: user.uid,
        title,
        markdown,
        template,
        pdfSettings: {
          pageSize: "A4",
          margins: "10mm",
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("Project saved successfully!");
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      toast.error("Failed to save project: " + errMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const idToken = user ? await user.getIdToken() : null;
      
      const response = await axios.post("/api/generate-pdf", {
        markdown,
        title,
        template,
        idToken,
      }, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      toast.success("PDF generated successfully!");
    } catch {
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGithubImport = async () => {
    if (!githubUrl) return;
    setIsImporting(true);
    try {
      let rawUrl = githubUrl.trim();
      
      // Remove trailing slashes
      if (rawUrl.endsWith("/")) rawUrl = rawUrl.slice(0, -1);

      // Handle standard GitHub web URLs
      if (rawUrl.includes("github.com") && !rawUrl.includes("raw.githubusercontent.com")) {
        // Case: Specific file URL (blob)
        if (rawUrl.includes("/blob/")) {
          rawUrl = rawUrl.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
        } 
        // Case: Repository root URL
        else {
          const parts = rawUrl.split("/");
          // URL looks like https://github.com/user/repo
          if (parts.length === 5) {
            // Try main branch README.md
            rawUrl = rawUrl.replace("github.com", "raw.githubusercontent.com") + "/main/README.md";
          }
        }
      }
      
      try {
        const response = await axios.get(rawUrl);
        setMarkdown(response.data);
        const fileName = rawUrl.split("/").pop() || "Imported Project";
        setTitle(fileName.replace(".md", ""));
        toast.success("GitHub content imported!");
        } catch (err: unknown) {
        // If it was a repo root attempt, try 'master' branch if 'main' fails
        if (rawUrl.includes("/main/README.md")) {
          const masterUrl = rawUrl.replace("/main/README.md", "/master/README.md");
          const response = await axios.get(masterUrl);
          setMarkdown(response.data);
          const fileName = masterUrl.split("/").pop() || "Imported Project";
          setTitle(fileName.replace(".md", ""));
          toast.success("GitHub content imported (master branch)!");
        } else {
          throw err;
        }
        }
        } catch (error: unknown) {
        console.error("Import error:", error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("Markdown file not found. Check the URL and branch name.");
        } else {
        toast.error("Failed to import. Ensure the repo is public or the URL is correct.");
        }
        } finally {
        setIsImporting(false);
        }
        };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith(".md")) {
      toast.error("Please upload a .md file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdown(content);
      setTitle(file.name.replace(".md", ""));
      toast.success("File uploaded!");
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith(".md")) {
      toast.error("Please drop a .md file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdown(content);
      setTitle(file.name.replace(".md", ""));
      toast.success("File dropped and loaded!");
    };
    reader.readAsText(file);
  };

  return (
    <div 
      className="flex h-screen flex-col bg-background relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/10 backdrop-blur-sm border-4 border-dashed border-primary m-4 rounded-xl pointer-events-none">
          <div className="flex flex-col items-center gap-4 bg-background p-8 rounded-2xl shadow-2xl border border-border">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Upload className="h-8 w-8 animate-bounce" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Drop to Upload</h2>
              <p className="text-muted-foreground">Markdown file will be loaded instantly</p>
            </div>
          </div>
        </div>
      )}

      {/* Editor Header */}
      <header className="flex h-14 items-center justify-between border-b border-border/40 px-4 shrink-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 w-48 border-none bg-transparent font-medium focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/50 rounded-lg p-1 mr-4">
            <Button 
              variant={view === "editor" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-7 px-3 text-xs"
              onClick={() => setView("editor")}
            >
              <Code2 className="mr-1.5 h-3.5 w-3.5" /> Editor
            </Button>
            <Button 
              variant={view === "split" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-7 px-3 text-xs"
              onClick={() => setView("split")}
            >
              Split
            </Button>
            <Button 
              variant={view === "preview" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-7 px-3 text-xs"
              onClick={() => setView("preview")}
            >
              <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
            </Button>
          </div>

          <div className="flex items-center gap-2 pr-4 border-r border-border/40 mr-2">
            <Dialog>
               <DialogTrigger asChild>
                 <Button variant="outline" size="sm" className="gap-2 h-8">
                   <FaGithub className="h-4 w-4" />
                   Import
                 </Button>
               </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import from GitHub</DialogTitle>
                  <DialogDescription>
                    Paste a link to a repository or a specific Markdown file.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Input 
                      placeholder="https://github.com/user/repo" 
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGithubImport()}
                    />
                    <p className="text-[10px] text-muted-foreground italic">Works with repo roots, blobs, or raw URLs.</p>
                  </div>
                   <Button className="w-full" onClick={handleGithubImport} disabled={isImporting}>
                     {isImporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FaGithub className="mr-2 h-4 w-4" />}
                     Import Markdown
                   </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="relative">
              <input 
                type="file" 
                accept=".md" 
                onChange={handleFileUpload} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                title="Upload Markdown"
              />
              <Button variant="outline" size="sm" className="gap-2 h-8 pointer-events-none">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving} className="h-8">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save
          </Button>

          <Button size="sm" className="gap-2 h-8" onClick={handleGeneratePDF} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Generate PDF
          </Button>


        </div>
      </header>

      {/* Editor Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Monaco Editor */}
        <div className={`flex-1 border-r border-border/40 ${(view === "preview") ? "hidden" : "block"}`}>
          <Editor
            height="100%"
            defaultLanguage="markdown"
            theme="vs-dark"
            value={markdown}
            onChange={(value) => setMarkdown(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              padding: { top: 20 },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              fontFamily: 'var(--font-geist-mono)',
            }}
          />
        </div>

        {/* Live Preview */}
        <div className={`flex-1 overflow-auto bg-white text-black p-12 ${(view === "editor") ? "hidden" : "block"}`}>
          <div 
            ref={previewRef}
            className="prose prose-slate max-w-none prose-pre:bg-gray-900 prose-pre:text-white"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      

    </div>
  );
}
