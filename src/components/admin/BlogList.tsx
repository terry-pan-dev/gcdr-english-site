import type { BlogPost } from "../../lib/admin-api";
import { blogApi } from "../../lib/admin-api";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Edit, Trash2 } from "lucide-react";

interface Props {
  blogs: BlogPost[];
  onEdit: (id: string) => void;
  onDelete: () => void;
}

export function BlogList({ blogs, onEdit, onDelete }: Props) {
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
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground text-center">No blog posts found. Create your first post!</p>
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
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
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
                  {blog.publish ? (
                    <Badge className="bg-green-100 text-green-700 border-green-200">Published</Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(blog.id)}
                    >
                      <Edit className="mr-2 size-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(blog.id)}
                    >
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

