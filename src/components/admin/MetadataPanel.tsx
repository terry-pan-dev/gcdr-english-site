import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";
import type { BlogPost } from "../../lib/admin-api";
import { CategoryCombobox } from "./CategoryCombobox";
import { TagsMultiSelect } from "./TagsMultiSelect";
import { ImageSelector } from "./ImageSelector";

interface Props {
  metadata: Partial<BlogPost>;
  onChange: (metadata: Partial<BlogPost>) => void;
  existingCategories?: string[];
  existingTags?: string[];
}

interface FieldInfo {
  important: boolean;
  whereShown: string;
  affectsPublish: boolean;
}

const fieldInfoMap: Record<string, FieldInfo> = {
  title: {
    important: true,
    whereShown: "Blog post header, blog listing page, SEO",
    affectsPublish: true,
  },
  subtitle: {
    important: false,
    whereShown: "Blog post header (optional)",
    affectsPublish: false,
  },
  author: {
    important: true,
    whereShown: "Blog post header, blog listing page",
    affectsPublish: true,
  },
  date: {
    important: true,
    whereShown: "Blog post header, blog listing page (sorted by date)",
    affectsPublish: true,
  },
  category: {
    important: true,
    whereShown: "Blog post header, category filtering",
    affectsPublish: true,
  },
  excerpt: {
    important: true,
    whereShown: "Blog listing page preview, SEO description",
    affectsPublish: true,
  },
  "blog-header-image": {
    important: false,
    whereShown: "Blog detail header background, blog card thumbnail",
    affectsPublish: false,
  },
  tags: {
    important: false,
    whereShown: "Blog post footer, tag filtering",
    affectsPublish: false,
  },
  featured: {
    important: false,
    whereShown: "Featured section on homepage",
    affectsPublish: false,
  },
  pinned: {
    important: false,
    whereShown: "Top of blog listing page",
    affectsPublish: false,
  },
  publish: {
    important: true,
    whereShown: "Controls visibility on public website",
    affectsPublish: true,
  },
  "seo-title": {
    important: false,
    whereShown: "Browser tab, search engine results",
    affectsPublish: false,
  },
  "seo-description": {
    important: false,
    whereShown: "Search engine results preview",
    affectsPublish: false,
  },
  "seo-keywords": {
    important: false,
    whereShown: "Search engine metadata",
    affectsPublish: false,
  },
};

function FieldLabel({
  htmlFor,
  children,
  fieldKey,
}: {
  htmlFor: string;
  children: React.ReactNode;
  fieldKey: string;
}) {
  const info = fieldInfoMap[fieldKey];
  const isRequired = info?.important || false;

  if (!info) {
    return <Label htmlFor={htmlFor}>{children}</Label>;
  }

  return (
    <div className="flex items-center gap-1.5">
      <Label htmlFor={htmlFor} className={isRequired ? "text-foreground" : ""}>
        {children}
      </Label>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Info className="size-3.5 text-muted-foreground hover:text-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-1.5 text-xs">
            <div>
              <span className="font-semibold">Importance: </span>
              <span>{info.important ? "Required" : "Optional"}</span>
            </div>
            <div>
              <span className="font-semibold">Shown in: </span>
              <span>{info.whereShown}</span>
            </div>
            <div>
              <span className="font-semibold">Affects publish: </span>
              <span>{info.affectsPublish ? "Yes - required to publish" : "No"}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function MetadataPanel({
  metadata,
  onChange,
  existingCategories = [],
  existingTags = [],
}: Props) {
  const updateField = (field: string, value: any) => {
    onChange({
      ...metadata,
      [field]: value,
    });
  };

  const updateSeoField = (field: string, value: any) => {
    onChange({
      ...metadata,
      seo: {
        ...metadata.seo,
        [field]: value,
      },
    });
  };

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <FieldLabel htmlFor="title" fieldKey="title">
            Title *
          </FieldLabel>
          <Input
            id="title"
            value={metadata.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Blog post title"
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="subtitle" fieldKey="subtitle">
            Subtitle
          </FieldLabel>
          <Input
            id="subtitle"
            value={metadata.subtitle || ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
            placeholder="Optional subtitle"
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="author" fieldKey="author">
            Author *
          </FieldLabel>
          <Input
            id="author"
            value={metadata.author || ""}
            onChange={(e) => updateField("author", e.target.value)}
            placeholder="Author name"
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="date" fieldKey="date">
            Publish Date *
          </FieldLabel>
          <Input
            id="date"
            type="date"
            value={metadata.date ? new Date(metadata.date).toISOString().split("T")[0] : ""}
            onChange={(e) => updateField("date", e.target.value)}
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="category" fieldKey="category">
            Category *
          </FieldLabel>
          <CategoryCombobox
            value={metadata.category || ""}
            onChange={(value) => updateField("category", value)}
            categories={existingCategories}
            placeholder="Select or create a category"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="excerpt" fieldKey="excerpt">
            Excerpt *
          </FieldLabel>
          <Textarea
            id="excerpt"
            value={metadata.excerpt || ""}
            onChange={(e) => updateField("excerpt", e.target.value)}
            placeholder="Short description"
            rows={3}
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all resize-none"
          />
        </div>
      </div>

      {/* Content Settings Section */}
      <div className="border-t pt-4 space-y-4">
        <div className="space-y-2">
          <FieldLabel htmlFor="image" fieldKey="blog-header-image">
            Blog Header Image
          </FieldLabel>
          <Input
            id="image"
            value={metadata.image || ""}
            onChange={(e) => updateField("image", e.target.value)}
            placeholder="Select or enter image URL"
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all"
          />
          <ImageSelector
            value={metadata.image || ""}
            onChange={(url) => updateField("image", url)}
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="tags" fieldKey="tags">
            Tags
          </FieldLabel>
          <TagsMultiSelect
            value={metadata.tags || []}
            onChange={(tags) => updateField("tags", tags)}
            existingTags={existingTags}
            placeholder="Add tags..."
          />
        </div>
      </div>

      {/* Publishing Options Section */}
      <div className="border-t pt-4 space-y-3">
        <div className="flex items-center gap-2 py-1">
          <Switch
            id="featured"
            checked={metadata.featured || false}
            onCheckedChange={(checked) => updateField("featured", checked)}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-400"
          />
          <div className="flex items-center gap-1.5">
            <Label htmlFor="featured" className="cursor-pointer">
              Featured
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Info className="size-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold">Importance: </span>
                    <span>Optional</span>
                  </div>
                  <div>
                    <span className="font-semibold">Shown in: </span>
                    <span>Featured section on homepage</span>
                  </div>
                  <div>
                    <span className="font-semibold">Affects publish: </span>
                    <span>No</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center gap-2 py-1">
          <Switch
            id="pinned"
            checked={metadata.pinned || false}
            onCheckedChange={(checked) => updateField("pinned", checked)}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-400"
          />
          <div className="flex items-center gap-1.5">
            <Label htmlFor="pinned" className="cursor-pointer">
              Pinned
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Info className="size-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold">Importance: </span>
                    <span>Optional</span>
                  </div>
                  <div>
                    <span className="font-semibold">Shown in: </span>
                    <span>Top of blog listing page</span>
                  </div>
                  <div>
                    <span className="font-semibold">Affects publish: </span>
                    <span>No</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center gap-2 py-1">
          <Switch
            id="publish"
            checked={metadata.publish || false}
            onCheckedChange={(checked) => updateField("publish", checked)}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-400"
          />
          <div className="flex items-center gap-1.5">
            <Label htmlFor="publish" className="cursor-pointer font-medium">
              Published
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Info className="size-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold">Importance: </span>
                    <span>Required</span>
                  </div>
                  <div>
                    <span className="font-semibold">Shown in: </span>
                    <span>Controls visibility on public website</span>
                  </div>
                  <div>
                    <span className="font-semibold">Affects publish: </span>
                    <span>Yes - required to publish</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* SEO Settings Section */}
      <div className="border-t pt-4 space-y-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm">SEO Settings</h4>

        <div className="space-y-2">
          <FieldLabel htmlFor="seo-title" fieldKey="seo-title">
            SEO Title
          </FieldLabel>
          <Input
            id="seo-title"
            value={metadata.seo?.title || ""}
            onChange={(e) => updateSeoField("title", e.target.value)}
            placeholder="Custom SEO title"
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="seo-description" fieldKey="seo-description">
            SEO Description
          </FieldLabel>
          <Textarea
            id="seo-description"
            value={metadata.seo?.description || ""}
            onChange={(e) => updateSeoField("description", e.target.value)}
            placeholder="Custom SEO description"
            rows={2}
            className="border-2 border-slate-300 bg-white shadow-sm hover:border-slate-400 hover:bg-slate-50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-md transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="seo-keywords" fieldKey="seo-keywords">
            SEO Keywords
          </FieldLabel>
          <TagsMultiSelect
            value={metadata.seo?.keywords || []}
            onChange={(keywords) => updateSeoField("keywords", keywords)}
            existingTags={[]}
            placeholder="Add keywords..."
          />
        </div>
      </div>
    </div>
  );
}
