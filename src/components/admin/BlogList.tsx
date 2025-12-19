import type { BlogPost } from "../../lib/admin-api";
import { blogApi } from "../../lib/admin-api";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Edit, Trash2, FileText, Pin } from "lucide-react";

interface Props {
  blogs: BlogPost[];
  onEdit: (id: string) => void;
  onDelete: () => void;
}

function getPublishStatus(blog: BlogPost): {
  status: "published" | "planned" | "draft";
  label: string;
} {
  if (!blog.publish) {
    return { status: "draft", label: "Draft" };
  }

  const publishDate = new Date(blog.date);
  const today = new Date();
  // Reset time to compare dates only
  today.setHours(0, 0, 0, 0);
  publishDate.setHours(0, 0, 0, 0);

  if (publishDate > today) {
    return { status: "planned", label: "Planned" };
  }

  return { status: "published", label: "Published" };
}

export function BlogList({ blogs, onEdit, onDelete }: Props) {
  // Sort blogs: pinned first, then by date (latest first)
  const sortedBlogs = [...blogs].sort((a, b) => {
    // First sort by pinned status (pinned posts first)
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    // Then sort by date (latest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      const result = await blogApi.delete(id);
      if (result.error) {
        alert(result.error);
      } else {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog post");
    }
  };

  if (blogs.length === 0) {
    return (
      <Card className="border-2 border-dashed border-slate-200">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <FileText className="size-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Get started by creating your first blog post. Click the "New Blog Post" button above to
            begin.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Excerpt</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBlogs.map((blog, index) => (
              <TableRow
                key={blog.id}
                className={`hover:bg-blue-50/30 transition-colors cursor-pointer ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                }`}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {blog.pinned && (
                      <Pin className="size-4 text-amber-500 fill-amber-500 shrink-0" />
                    )}
                    <span>{blog.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {blog.excerpt || "No excerpt provided"}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {(() => {
                    const { status, label } = getPublishStatus(blog);
                    if (status === "published") {
                      return (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          {label}
                        </Badge>
                      );
                    } else if (status === "planned") {
                      return (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">{label}</Badge>
                      );
                    } else {
                      return (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          {label}
                        </Badge>
                      );
                    }
                  })()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(blog.id)}>
                      <Edit className="mr-2 size-4" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(blog.id)}>
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
