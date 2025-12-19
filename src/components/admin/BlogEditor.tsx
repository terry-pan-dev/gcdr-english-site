import { useState, useEffect, useMemo } from "react";
import { marked } from "marked";
import { MetadataPanel } from "./MetadataPanel";
import { BlogPreview } from "./BlogPreview";
import { MarkdownEditor } from "./MarkdownEditor";
import { Button } from "../ui/button";
import type { BlogPost } from "../../lib/admin-api";
import { blogApi } from "../../lib/admin-api";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { ArrowLeft, Save } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { toast } from "sonner";

interface Props {
  mode: "new" | "edit";
  blogId: string | null;
  onBack: () => void;
  onSave: () => void;
  blogs?: BlogPost[];
}

export function BlogEditor({ mode, blogId, onBack, onSave, blogs = [] }: Props) {
  const [metadata, setMetadata] = useState<Partial<BlogPost>>({
    title: "",
    subtitle: "",
    author: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    excerpt: "",
    image: "",
    featured: false,
    pinned: false,
    tags: [],
    publish: false,
    seo: {},
  });
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Configure marked for GFM features
  useEffect(() => {
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: false, // Don't convert line breaks to <br>
    });
  }, []);

  // Convert markdown to HTML for preview
  const htmlContent = useMemo(() => {
    if (!markdownContent) return "";
    try {
      return marked.parse(markdownContent) as string;
    } catch (error) {
      console.error("Error parsing markdown:", error);
      return markdownContent;
    }
  }, [markdownContent]);

  useEffect(() => {
    if (mode === "edit" && blogId) {
      loadBlog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, blogId]);

  const loadBlog = async () => {
    if (!blogId) return;
    setLoading(true);
    try {
      const result = await blogApi.get(blogId);
      if (result.data) {
        setMetadata(result.data);
        // Assume content is stored as markdown (or HTML that we'll treat as markdown)
        setMarkdownContent(result.data.content || "");
      }
    } catch (error) {
      console.error("Error loading blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!metadata.title || !metadata.author || !metadata.category || !metadata.excerpt) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields (title, author, category, excerpt)",
      });
      return;
    }

    setSaving(true);
    try {
      if (mode === "new") {
        const result = await blogApi.create({
          ...metadata,
          content: markdownContent,
        } as any);
        if (result.error) {
          toast.error("Failed to Save", {
            description: result.error,
          });
        } else {
          toast.success("Blog Post Created", {
            description: `"${metadata.title}" has been successfully created.`,
          });
          onSave();
          setTimeout(() => onBack(), 500);
        }
      } else if (blogId) {
        const result = await blogApi.update(blogId, {
          ...metadata,
          content: markdownContent,
        } as any);
        if (result.error) {
          toast.error("Failed to Update", {
            description: result.error,
          });
        } else {
          toast.success("Blog Post Updated", {
            description: `"${metadata.title}" has been successfully updated.`,
          });
          onSave();
          setTimeout(() => onBack(), 500);
        }
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to Save", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="size-4" />
            </Button>
            <h1 className="text-2xl font-semibold">
              {mode === "new" ? "New Blog Post" : "Edit Blog Post"}
            </h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 size-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {/* Editor with Resizable Panels */}
      <div className="flex-1 overflow-hidden flex">
        <ResizablePanelGroup direction="horizontal" className="h-full flex-1">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <Card className="h-full flex flex-col rounded-none border-0 border-r overflow-hidden">
              <CardContent className="flex-1 min-h-0 p-0">
                <MarkdownEditor content={markdownContent} onChange={setMarkdownContent} />
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={35} minSize={25}>
            <Card className="h-full flex flex-col rounded-none border-0 border-r overflow-hidden">
              <CardHeader className="border-b flex-shrink-0">
                <CardTitle className="text-base">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0 p-0">
                <ScrollArea className="h-full w-full">
                  <BlogPreview content={htmlContent} frontmatter={metadata} />
                </ScrollArea>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Metadata Panel - Fixed width, no resize handle */}
        <div className="w-72 flex-shrink-0 border-l bg-background overflow-hidden">
          <Card className="h-full flex flex-col rounded-none border-0">
            <CardHeader className="border-b flex-shrink-0">
              <CardTitle className="text-base">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 p-0">
              <ScrollArea className="h-full w-full">
                <MetadataPanel
                  metadata={metadata}
                  onChange={setMetadata}
                  existingCategories={Array.from(
                    new Set(blogs.map((b) => b.category).filter(Boolean) as string[])
                  )}
                  existingTags={Array.from(
                    new Set(blogs.flatMap((b) => b.tags || []).filter(Boolean))
                  )}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
