import { useState, useEffect } from "react";
import { BlogList } from "./BlogList";
import { BlogEditor } from "./BlogEditor";
import { MediaManager } from "./MediaManager";
import type { BlogPost } from "../../lib/admin-api";
import { authApi, blogApi } from "../../lib/admin-api";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { FileText, Image, LogOut, Plus } from "lucide-react";
import { cn } from "../ui/utils";
import { Toaster } from "../ui/sonner";

type View = "blogs" | "editor" | "media";
type EditorMode = "new" | "edit";

export function DashboardLayout() {
  const [currentView, setCurrentView] = useState<View>("blogs");
  const [editorMode, setEditorMode] = useState<EditorMode>("new");
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      console.log("DashboardLayout: Loading blogs...");
      const result = await blogApi.list();
      console.log("DashboardLayout: Blog API result:", result);

      if (result.error) {
        console.error("DashboardLayout: Error loading blogs:", result.error);
        // Still set blogs to empty array and stop loading
        setBlogs([]);
      } else if (result.data) {
        console.log("DashboardLayout: Blogs loaded:", result.data.blogs?.length || 0, "blogs");
        setBlogs(result.data.blogs || []);
      } else {
        console.warn("DashboardLayout: No data or error in result");
        setBlogs([]);
      }
    } catch (error: any) {
      console.error("DashboardLayout: Exception loading blogs:", error);
      setBlogs([]);
    } finally {
      console.log("DashboardLayout: Setting loading to false");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load blogs on mount - authentication is already verified by AdminPageWrapper
    loadBlogs();
  }, []);

  const handleNewBlog = () => {
    setEditorMode("new");
    setSelectedBlogId(null);
    setCurrentView("editor");
  };

  const handleEditBlog = (id: string) => {
    setEditorMode("edit");
    setSelectedBlogId(id);
    setCurrentView("editor");
  };

  const handleBackToList = () => {
    setCurrentView("blogs");
    loadBlogs();
  };

  const handleLogout = async () => {
    await authApi.logout();
    window.location.href = "/admin/login";
  };

  // Show loading state only for blogs view
  // But still render the sidebar so users can navigate
  if (loading && currentView === "blogs") {
    return (
      <SidebarProvider>
        <div className="h-screen flex w-full overflow-hidden">
          <Sidebar>
            <SidebarHeader className="border-b h-16 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4">
                <h2 className="text-lg font-semibold">Admin Dashboard</h2>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={handleNewBlog}
                        tooltip="Create New Blog Post"
                        className="hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      >
                        <Plus className="size-4" />
                        <span>Create New Blog Post</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setCurrentView("blogs")}
                        isActive={true}
                        tooltip="View All Blogs"
                        className="bg-blue-50 text-blue-900 font-semibold hover:bg-blue-100 transition-colors"
                      >
                        <FileText className="size-4" />
                        <span>Blog Posts</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setCurrentView("media")}
                        tooltip="Media Library"
                        className="hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      >
                        <Image className="size-4" />
                        <span>Media</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-muted-foreground">Loading blogs...</div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="h-screen flex w-full overflow-hidden">
        <Sidebar>
          <SidebarHeader className="border-b h-16 flex items-center justify-center">
            <div className="flex items-center gap-2 px-4">
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={handleNewBlog}
                      isActive={currentView === "editor"}
                      tooltip="Create New Blog Post"
                      className={cn(
                        "hover:bg-slate-100 hover:text-slate-900 transition-colors",
                        currentView === "editor" &&
                          "bg-blue-50 text-blue-900 font-semibold hover:bg-blue-100"
                      )}
                    >
                      <Plus className="size-4" />
                      <span>Create New Blog Post</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setCurrentView("blogs")}
                      isActive={currentView === "blogs"}
                      tooltip="View All Blogs"
                      className={cn(
                        "hover:bg-slate-100 hover:text-slate-900 transition-colors",
                        currentView === "blogs" &&
                          "bg-blue-50 text-blue-900 font-semibold hover:bg-blue-100"
                      )}
                    >
                      <FileText className="size-4" />
                      <span>Blog Posts</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setCurrentView("media")}
                      isActive={currentView === "media"}
                      tooltip="Media Library"
                      className={cn(
                        "hover:bg-slate-100 hover:text-slate-900 transition-colors",
                        currentView === "media" &&
                          "bg-blue-50 text-blue-900 font-semibold hover:bg-blue-100"
                      )}
                    >
                      <Image className="size-4" />
                      <span>Media</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col h-full overflow-hidden">
          {currentView === "blogs" && (
            <>
              <div className="border-b bg-background h-16">
                <div className="flex h-16 items-center justify-between px-6">
                  <h1 className="text-2xl font-semibold">Blog Posts</h1>
                  <Button onClick={handleNewBlog}>
                    <Plus className="mr-2 size-4" />
                    New Blog Post
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <BlogList blogs={blogs} onEdit={handleEditBlog} onDelete={loadBlogs} />
              </div>
            </>
          )}

          {currentView === "editor" && (
            <BlogEditor
              mode={editorMode}
              blogId={selectedBlogId}
              onBack={handleBackToList}
              onSave={loadBlogs}
              blogs={blogs}
            />
          )}

          {currentView === "media" && <MediaManager />}
        </SidebarInset>
      </div>
      <Toaster position="top-right" />
    </SidebarProvider>
  );
}
