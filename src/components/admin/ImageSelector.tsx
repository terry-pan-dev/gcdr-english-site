import { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";
import {
  Check,
  Image as ImageIcon,
  Loader2,
  Cloud,
  FolderOpen,
} from "lucide-react";
import { mediaApi, type MediaAsset } from "../../lib/admin-api";

// Available images from /public/assets folder
const STATIC_IMAGES = [
  "/assets/hero-bg.png",
  "/assets/dharma-realm-temple.jpg",
  "/assets/temple-1.jpg",
  "/assets/temple-2.jpg",
  "/assets/temple-3.png",
  "/assets/temple-4.jpg",
  "/assets/temple-5.jpg",
  "/assets/temple-6.jpg",
  "/assets/master-hua.png",
  "/assets/master_hua.jpeg",
  "/assets/master-hua-giving-smile.jpg",
  "/assets/basic-teachings-of-buddha.jpg",
  "/assets/introduction-to-buddhism.jpg",
  "/assets/four-noble-truths.jpg",
  "/assets/noble-eightfold-path.jpg",
  "/assets/white-universe-snow.jpg",
  "/assets/Amitabha-Retreat.jpg",
  "/assets/Saturday-Lecture.jpg",
  "/assets/GuanYin-Hall-Sponsorship.jpg",
  "/assets/GCM.jpg",
  "/assets/Volunteer-Team.jpg",
  "/assets/SM-2025-1.png",
  // Chan meditation images
  "/assets/chan-meditation/DSC_0152-1-scaled.jpg",
  "/assets/chan-meditation/DSC_0186-scaled.jpg",
  "/assets/chan-meditation/DSC_0296-scaled.jpg",
  "/assets/chan-meditation/DSC_1462-scaled.jpg",
  "/assets/chan-meditation/DSC_1466-scaled.jpg",
  "/assets/chan-meditation/DSC_1470-scaled.jpg",
  "/assets/chan-meditation/DSC_1475-scaled.jpg",
  "/assets/chan-meditation/DSC_1480-scaled.jpg",
  "/assets/chan-meditation/DSC_1495-scaled.jpg",
  "/assets/chan-meditation/DSC_1630-scaled.jpg",
  "/assets/chan-meditation/DSC2188-scaled.jpg",
  "/assets/chan-meditation/mmexport1697577214414.jpg",
  "/assets/chan-meditation/mmexport1697577219970.jpg",
];

interface ImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
}

interface ImageItem {
  url: string;
  name: string;
  source: "static" | "s3";
}

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
  const [loadErrors, setLoadErrors] = useState<Set<string>>(new Set());
  const [s3Images, setS3Images] = useState<MediaAsset[]>([]);
  const [loadingS3, setLoadingS3] = useState(true);

  // Load S3 images on mount
  useEffect(() => {
    loadS3Images();
  }, []);

  const loadS3Images = async () => {
    setLoadingS3(true);
    try {
      const result = await mediaApi.list();
      if (result.data) {
        // Filter only images (not videos)
        const images = result.data.media.filter((m) => m.type === "image");
        setS3Images(images);
      }
    } catch (error) {
      console.error("Error loading S3 images:", error);
    } finally {
      setLoadingS3(false);
    }
  };

  const handleImageError = (src: string) => {
    setLoadErrors((prev) => new Set(prev).add(src));
  };

  const handleSelect = (url: string) => {
    onChange(url);
  };

  // Combine static and S3 images
  const allImages: ImageItem[] = [
    // S3 uploaded images first (newest uploads)
    ...s3Images.map((img) => ({
      url: img.url,
      name: img.filename,
      source: "s3" as const,
    })),
    // Static assets
    ...STATIC_IMAGES.filter((src) => !loadErrors.has(src)).map((src) => ({
      url: src,
      name: src.split("/").pop() || "Image",
      source: "static" as const,
    })),
  ];

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground flex items-center gap-2">
        Select an image or enter URL above
        {loadingS3 && (
          <span className="flex items-center gap-1 text-primary">
            <Loader2 className="size-3 animate-spin" />
            Loading...
          </span>
        )}
      </div>
      <ScrollArea className="h-[200px] w-full rounded-md border border-slate-300 bg-slate-50">
        <div className="p-2">
          {/* S3 Images Section */}
          {s3Images.length > 0 && (
            <>
              <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
                <Cloud className="size-3" />
                <span>Uploaded Images ({s3Images.length})</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {s3Images.map((img) => {
                  const isSelected = value === img.url;
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => handleSelect(img.url)}
                      className={cn(
                        "relative aspect-video w-full overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50",
                        isSelected
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-transparent hover:border-slate-400"
                      )}
                    >
                      <img
                        src={img.url}
                        alt={img.filename}
                        className="h-full w-full object-cover"
                        onError={() => handleImageError(img.url)}
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                          <div className="rounded-full bg-primary p-1">
                            <Check className="size-3 text-white" />
                          </div>
                        </div>
                      )}
                      {/* S3 badge */}
                      <div className="absolute top-1 right-1">
                        <Cloud className="size-3 text-white drop-shadow-md" />
                      </div>
                      {/* Image name on hover */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1 opacity-0 transition-opacity hover:opacity-100">
                        <span className="text-[10px] text-white truncate block">
                          {img.filename}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Static Assets Section */}
          <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
            <FolderOpen className="size-3" />
            <span>
              Static Assets (
              {STATIC_IMAGES.filter((src) => !loadErrors.has(src)).length})
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {STATIC_IMAGES.filter((src) => !loadErrors.has(src)).map((src) => {
              const isSelected = value === src;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => handleSelect(src)}
                  className={cn(
                    "relative aspect-video w-full overflow-hidden rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50",
                    isSelected
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent hover:border-slate-400"
                  )}
                >
                  <img
                    src={src}
                    alt={src.split("/").pop() || "Image"}
                    className="h-full w-full object-cover"
                    onError={() => handleImageError(src)}
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                      <div className="rounded-full bg-primary p-1">
                        <Check className="size-3 text-white" />
                      </div>
                    </div>
                  )}
                  {/* Image name on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1 opacity-0 transition-opacity hover:opacity-100">
                    <span className="text-[10px] text-white truncate block">
                      {src.split("/").pop()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {allImages.length === 0 && !loadingS3 && (
            <div className="flex flex-col items-center justify-center h-[160px] text-muted-foreground">
              <ImageIcon className="size-8 mb-2" />
              <span className="text-sm">No images available</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
