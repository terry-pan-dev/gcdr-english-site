import { useState, useEffect, useRef, useMemo } from "react";
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
import {
  Upload,
  Copy,
  Trash2,
  Image as ImageIcon,
  Video,
  Search,
  MoreVertical,
  Grid3X3,
  List,
  Download,
  ExternalLink,
  Eye,
  X,
  AlertTriangle,
  Check,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "name" | "size";
type TypeFilter = "all" | "image" | "video";

export function MediaManager() {
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [previewMedia, setPreviewMedia] = useState<MediaAsset | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<MediaAsset | null>(null);
  const [deleting, setDeleting] = useState(false);
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
      toast.error("Failed to load media library");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort media
  const filteredMedia = useMemo(() => {
    let result = [...media];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.filename.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((item) => item.type === typeFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return (
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
          );
        case "name":
          return a.filename.localeCompare(b.filename);
        case "size":
          return b.size - a.size;
        default:
          return 0;
      }
    });

    return result;
  }, [media, searchQuery, typeFilter, sortOption]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await uploadFiles(Array.from(files));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFiles = async (files: File[]) => {
    // Validate file sizes (max 1MB)
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
    const oversizedFiles: string[] = [];
    const validFiles: File[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        oversizedFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    }

    if (oversizedFiles.length > 0) {
      toast.error(`Files exceed 1MB limit`, {
        description: oversizedFiles.join(", "),
      });
      if (validFiles.length === 0) return;
    }

    setUploading(true);
    setUploadProgress(validFiles.map((f) => f.name));

    let successCount = 0;
    let failCount = 0;

    try {
      for (const file of validFiles) {
        try {
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
              throw new Error("Failed to upload to storage");
            }
            successCount++;
          } else {
            failCount++;
          }
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          failCount++;
        }
        // Remove from progress as each completes
        setUploadProgress((prev) => prev.filter((name) => name !== file.name));
      }

      if (successCount > 0) {
        toast.success(
          `${successCount} file${successCount > 1 ? "s" : ""} uploaded`,
          {
            icon: <Check className="size-4 text-green-500" />,
          }
        );
        loadMedia();
      }
      if (failCount > 0) {
        toast.error(`${failCount} file${failCount > 1 ? "s" : ""} failed`);
      }
    } finally {
      setUploading(false);
      setUploadProgress([]);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;

    setDeleting(true);
    try {
      const result = await mediaApi.delete(deleteConfirm.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Media deleted successfully");
        loadMedia();
      }
    } catch (error) {
      console.error("Error deleting media:", error);
      toast.error("Failed to delete media");
    } finally {
      setDeleting(false);
      setDeleteConfirm(null);
    }
  };

  const handleCopyUrl = (url: string, filename: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard", {
      description: filename,
    });
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

    await uploadFiles(Array.from(files));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  // Skeleton loading cards
  const SkeletonCard = () => (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </Card>
  );

  // Media card for grid view
  const MediaCard = ({ item }: { item: MediaAsset }) => (
    <Card className="group overflow-hidden border border-stone-200 dark:border-stone-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <div
        className="relative aspect-square bg-stone-100 dark:bg-stone-800 cursor-pointer overflow-hidden"
        onClick={() => setPreviewMedia(item)}
      >
        {item.type === "image" ? (
          <img
            src={item.url}
            alt={item.filename}
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Video className="size-16 text-stone-400" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Eye className="text-white size-8" />
        </div>

        {/* Type badge with gradient overlay */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-white/90 dark:bg-stone-900/90 text-xs"
        >
          {item.type === "image" ? (
            <ImageIcon className="size-3 mr-1" />
          ) : (
            <Video className="size-3 mr-1" />
          )}
          {item.type}
        </Badge>

        {/* Quick actions on hover */}
        <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-8 bg-white/90 hover:bg-white dark:bg-stone-900/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUrl(item.url, item.filename);
                  }}
                >
                  <Copy className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy URL</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <CardHeader className="p-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className="text-sm font-medium truncate flex-1"
            title={item.filename}
          >
            {item.filename}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 shrink-0 -mr-1"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPreviewMedia(item)}>
                <Eye className="size-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCopyUrl(item.url, item.filename)}
              >
                <Copy className="size-4 mr-2" />
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="size-4 mr-2" />
                  Open in new tab
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={item.url}
                  download={item.filename}
                  className="flex items-center"
                >
                  <Download className="size-4 mr-2" />
                  Download
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteConfirm(item)}
              >
                <Trash2 className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatFileSize(item.size)}</span>
          <span>•</span>
          <span>{formatRelativeDate(item.uploadedAt)}</span>
        </div>
      </CardHeader>
    </Card>
  );

  // Media row for list view
  const MediaRow = ({ item }: { item: MediaAsset }) => (
    <div className="group flex items-center gap-4 p-3 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
      {/* Thumbnail */}
      <div
        className="relative size-16 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer"
        onClick={() => setPreviewMedia(item)}
      >
        {item.type === "image" ? (
          <img
            src={item.url}
            alt={item.filename}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Video className="size-8 text-stone-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Eye className="text-white size-5" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate" title={item.filename}>
          {item.filename}
        </p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
          <span className="flex items-center gap-1">
            {item.type === "image" ? (
              <ImageIcon className="size-3" />
            ) : (
              <Video className="size-3" />
            )}
            {item.type}
          </span>
          <span>{formatFileSize(item.size)}</span>
          <span>{formatRelativeDate(item.uploadedAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                onClick={() => handleCopyUrl(item.url, item.filename)}
              >
                <Copy className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy URL</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                onClick={() => setPreviewMedia(item)}
              >
                <Eye className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <ExternalLink className="size-4 mr-2" />
                Open in new tab
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href={item.url}
                download={item.filename}
                className="flex items-center"
              >
                <Download className="size-4 mr-2" />
                Download
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteConfirm(item)}
            >
              <Trash2 className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Toast notifications */}
      <Toaster position="top-right" richColors closeButton />

      {/* Header */}
      <div className="border-b bg-background">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-semibold">Media Library</h1>
            <p className="text-sm text-muted-foreground">
              {media.length} file{media.length !== 1 ? "s" : ""} •{" "}
              {filteredMedia.length} shown
            </p>
          </div>
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

      {/* Toolbar - Search, Filter, Sort, View Toggle */}
      <div className="border-b bg-background px-6 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-auto sm:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={typeFilter}
              onValueChange={(v) => setTypeFilter(v as TypeFilter)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortOption}
              onValueChange={(v) => setSortOption(v as SortOption)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="size">Largest First</SelectItem>
              </SelectContent>
            </Select>

            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(v) => v && setViewMode(v as ViewMode)}
              variant="outline"
            >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid3X3 className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
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
          {/* Drag overlay */}
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/80 backdrop-blur-sm rounded-lg">
              <div className="text-center space-y-2">
                <Upload className="mx-auto size-12 text-accent-gold" />
                <p className="text-lg font-semibold">Drop files here to upload</p>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG, GIF, WebP up to 1MB
                </p>
              </div>
            </div>
          )}

          {/* Upload progress */}
          {uploadProgress.length > 0 && (
            <div className="mb-4 p-4 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
              <p className="text-sm font-medium mb-2">
                Uploading {uploadProgress.length} file
                {uploadProgress.length > 1 ? "s" : ""}...
              </p>
              <div className="space-y-1">
                {uploadProgress.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="size-3 rounded-full border-2 border-accent-gold border-t-transparent animate-spin" />
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            // Skeleton loading
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3">
                    <Skeleton className="size-16 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : media.length === 0 ? (
            // Empty state
            <Card className="border-2 border-dashed border-stone-300 dark:border-stone-600">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <ImageIcon className="size-8 text-stone-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      No media files yet
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                      Drag and drop files here, or click the button below to
                      upload your first media
                    </p>
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      size="lg"
                    >
                      <Upload className="mr-2 size-4" />
                      Upload Media
                    </Button>
                    <p className="text-xs text-muted-foreground mt-3">
                      Supports PNG, JPG, GIF, WebP • Max 1MB per file
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : filteredMedia.length === 0 ? (
            // No results state
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <Search className="mx-auto size-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      No matching media
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setTypeFilter("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Upload zone hint */}
              <div
                className="mb-6 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-xl p-6 
                           hover:border-accent-gold hover:bg-accent-gold/5 transition-all cursor-pointer text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto size-8 text-stone-400 mb-2" />
                <p className="font-medium text-sm">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, GIF, WebP up to 1MB
                </p>
              </div>

              {/* Grid/List view */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredMedia.map((item) => (
                    <MediaCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMedia.map((item) => (
                    <MediaRow key={item.id} item={item} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Preview Modal */}
      <Dialog open={!!previewMedia} onOpenChange={() => setPreviewMedia(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {previewMedia && (
            <>
              {/* Image/Video preview */}
              <div className="relative bg-stone-950 flex items-center justify-center min-h-[300px] max-h-[70vh]">
                {previewMedia.type === "image" ? (
                  <img
                    src={previewMedia.url}
                    alt={previewMedia.filename}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <video
                    src={previewMedia.url}
                    controls
                    className="max-w-full max-h-[70vh]"
                  />
                )}
              </div>

              {/* Info footer */}
              <div className="p-4 border-t">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {previewMedia.filename}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(previewMedia.size)} •{" "}
                      {formatRelativeDate(previewMedia.uploadedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopyUrl(previewMedia.url, previewMedia.filename)
                      }
                    >
                      <Copy className="size-4 mr-2" />
                      Copy URL
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={previewMedia.url}
                        download={previewMedia.filename}
                      >
                        <Download className="size-4 mr-2" />
                        Download
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setPreviewMedia(null);
                        setDeleteConfirm(previewMedia);
                      }}
                    >
                      <Trash2 className="size-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" />
              Delete Media
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this file? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          {deleteConfirm && (
            <div className="flex items-center gap-4 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50">
              {/* Thumbnail */}
              <div className="size-16 shrink-0 rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-700">
                {deleteConfirm.type === "image" ? (
                  <img
                    src={deleteConfirm.url}
                    alt={deleteConfirm.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video className="size-8 text-stone-400" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{deleteConfirm.filename}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(deleteConfirm.size)}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
