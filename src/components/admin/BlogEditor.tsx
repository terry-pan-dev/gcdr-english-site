import { useState, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { EditorContent } from "@tiptap/react";
import { MetadataPanel } from "./MetadataPanel";
import { MDXPreview } from "./MDXPreview";
import { Button } from "../ui/button";
import type { BlogPost } from "../../lib/admin-api";
import { blogApi } from "../../lib/admin-api";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  ArrowLeft,
  Save,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface Props {
  mode: "new" | "edit";
  blogId: string | null;
  onBack: () => void;
  onSave: () => void;
}

export function BlogEditor({ mode, blogId, onBack, onSave }: Props) {
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
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-lg",
        },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-6",
      },
    },
  });

  useEffect(() => {
    if (mode === "edit" && blogId) {
      loadBlog();
    }
  }, [mode, blogId]);

  const loadBlog = async () => {
    if (!blogId) return;
    setLoading(true);
    try {
      const result = await blogApi.get(blogId);
      if (result.data) {
        setMetadata(result.data);
        setContent(result.data.content || "");
        if (editor) {
          editor.commands.setContent(result.data.content || "");
        }
      }
    } catch (error) {
      console.error("Error loading blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!metadata.title || !metadata.author || !metadata.category || !metadata.excerpt) {
      alert("Please fill in all required fields (title, author, category, excerpt)");
      return;
    }

    setSaving(true);
    try {
      if (mode === "new") {
        const result = await blogApi.create({
          ...metadata,
          content,
        } as any);
        if (result.error) {
          alert(result.error);
        } else {
          onSave();
          onBack();
        }
      } else if (blogId) {
        const result = await blogApi.update(blogId, {
          ...metadata,
          content,
        } as any);
        if (result.error) {
          alert(result.error);
        } else {
          onSave();
          onBack();
        }
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post");
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
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
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
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
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <Card className="h-full flex flex-col rounded-none border-0 border-r">
              <CardHeader className="border-b pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {editor && (
                    <>
                      <Button
                        variant={editor.isActive("bold") ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                      >
                        <Bold className="size-4" />
                      </Button>
                      <Button
                        variant={editor.isActive("italic") ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                      >
                        <Italic className="size-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6" />
                      <Button
                        variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                      >
                        <Heading1 className="size-4" />
                      </Button>
                      <Button
                        variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      >
                        <Heading2 className="size-4" />
                      </Button>
                      <Button
                        variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                      >
                        <Heading3 className="size-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6" />
                      <Button
                        variant={editor.isActive("bulletList") ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                      >
                        <List className="size-4" />
                      </Button>
                      <Button
                        variant={editor.isActive("orderedList") ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      >
                        <ListOrdered className="size-4" />
                      </Button>
                      <Button
                        variant={editor.isActive("blockquote") ? "default" : "ghost"}
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                      >
                        <Quote className="size-4" />
                      </Button>
                      <Separator orientation="vertical" className="h-6" />
                      <Button variant="ghost" size="sm" onClick={addLink}>
                        <LinkIcon className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={addImage}>
                        <ImageIcon className="size-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    {editor && <EditorContent editor={editor} />}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={35} minSize={25}>
            <Card className="h-full flex flex-col rounded-none border-0 border-r">
              <CardHeader className="border-b">
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <MDXPreview content={content} frontmatter={metadata} />
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Metadata Panel */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Card className="h-full flex flex-col rounded-none border-0">
              <CardHeader className="border-b">
                <CardTitle className="text-base">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                  <MetadataPanel metadata={metadata} onChange={setMetadata} />
                </ScrollArea>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
