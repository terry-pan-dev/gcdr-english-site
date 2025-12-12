import { useState, useEffect, useRef } from "react";
import type { MediaAsset } from "../../lib/admin-api";
import { mediaApi } from "../../lib/admin-api";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Upload, Copy, Trash2, Image as ImageIcon, Video } from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

export function MediaManager() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const result = await mediaApi.list();
      if (result.data) {
        setMedia(result.data.media);
      }
    } catch (error) {
      console.error("Error loading media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate file sizes (max 1MB)
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
    const oversizedFiles: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE) {
        oversizedFiles.push(file.name);
      }
    }

    if (oversizedFiles.length > 0) {
      alert(
        `The following files exceed the 1MB size limit:\n${oversizedFiles.join(
          "\n"
        )}\n\nPlease select smaller files.`
      );
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const type = file.type.startsWith("image/") ? "image" : "video";
        const result = await mediaApi.upload(file.name, type, file.size);

        if (result.data) {
          // Upload file to S3 using presigned URL
          const uploadResponse = await fetch(result.data.uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload file to S3");
          }
        }
      }
      loadMedia();
    } catch (error: any) {
      console.error("Error uploading media:", error);
      alert(error.message || "Failed to upload media");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) {
      return;
    }

    try {
      const result = await mediaApi.delete(id);
      if (result.error) {
        alert(result.error);
      } else {
        loadMedia();
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    // Validate file sizes (max 1MB)
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
    const oversizedFiles: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE) {
        oversizedFiles.push(file.name);
      }
    }

    if (oversizedFiles.length > 0) {
      alert(
        `The following files exceed the 1MB size limit:\n${oversizedFiles.join(
          "\n"
        )}\n\nPlease select smaller files.`
      );
      return;
    }

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const type = file.type.startsWith("image/") ? "image" : "video";
        const result = await mediaApi.upload(file.name, type, file.size);

        if (result.data) {
          const uploadResponse = await fetch(result.data.uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          if (!uploadResponse.ok) {
            throw new Error("Failed to upload file to S3");
          }
        }
      }
      loadMedia();
    } catch (error: any) {
      console.error("Error uploading media:", error);
      alert(error.message || "Failed to upload media");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Upload Button */}
      <div className="border-b bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-2xl font-semibold">Media Library</h1>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="media-upload"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="mr-2 size-4" />
              {uploading ? "Uploading..." : "Upload Media"}
            </Button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <ScrollArea className="flex-1">
        <div
          className={`p-6 relative transition-all ${
            isDragging
              ? "bg-accent-gold/10 border-2 border-dashed border-accent-gold rounded-lg"
              : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/80 backdrop-blur-sm rounded-lg">
              <div className="text-center space-y-2">
                <Upload className="mx-auto size-12 text-accent-gold" />
                <p className="text-lg font-semibold">
                  Drop files here to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Maximum file size: 1MB
                </p>
              </div>
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <div className="text-muted-foreground">Loading media...</div>
            </div>
          ) : media.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <ImageIcon className="size-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      No media files
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop files here or click Upload Media to get
                      started
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Maximum file size: 1MB per file
                    </p>
                    <Button type="button" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 size-4" />
                      Upload Media
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Drag and drop files here to upload • Maximum file size: 1MB
                  per file
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {media.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video bg-muted">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="size-12 text-muted-foreground" />
                        </div>
                      )}
                      <Badge
                        variant="secondary"
                        className="absolute top-2 right-2"
                      >
                        {item.type === "image" ? (
                          <ImageIcon className="size-3 mr-1" />
                        ) : (
                          <Video className="size-3 mr-1" />
                        )}
                        {item.type}
                      </Badge>
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-medium truncate">
                        {item.filename}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {formatFileSize(item.size)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            navigator.clipboard.writeText(item.url);
                            // You could add a toast notification here
                          }}
                        >
                          <Copy className="mr-1 size-3" />
                          Copy URL
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
