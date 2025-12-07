import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import type { BlogPost } from "../../lib/admin-api";

interface Props {
  metadata: Partial<BlogPost>;
  onChange: (metadata: Partial<BlogPost>) => void;
}

export function MetadataPanel({ metadata, onChange }: Props) {
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

  const updateTags = (tagsString: string) => {
    const tags = tagsString.split(",").map((t) => t.trim()).filter(Boolean);
    updateField("tags", tags);
  };

  return (
    <div className="h-full overflow-auto p-6 space-y-6">

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={metadata.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Blog post title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          value={metadata.subtitle || ""}
          onChange={(e) => updateField("subtitle", e.target.value)}
          placeholder="Optional subtitle"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author *</Label>
        <Input
          id="author"
          value={metadata.author || ""}
          onChange={(e) => updateField("author", e.target.value)}
          placeholder="Author name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Publish Date *</Label>
        <Input
          id="date"
          type="date"
          value={metadata.date ? new Date(metadata.date).toISOString().split("T")[0] : ""}
          onChange={(e) => updateField("date", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Input
          id="category"
          value={metadata.category || ""}
          onChange={(e) => updateField("category", e.target.value)}
          placeholder="Category"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          value={metadata.excerpt || ""}
          onChange={(e) => updateField("excerpt", e.target.value)}
          placeholder="Short description"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={metadata.image || ""}
          onChange={(e) => updateField("image", e.target.value)}
          placeholder="/assets/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={metadata.tags?.join(", ") || ""}
          onChange={(e) => updateTags(e.target.value)}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={metadata.featured || false}
          onCheckedChange={(checked) => updateField("featured", checked)}
        />
        <Label htmlFor="featured">Featured</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="pinned"
          checked={metadata.pinned || false}
          onCheckedChange={(checked) => updateField("pinned", checked)}
        />
        <Label htmlFor="pinned">Pinned</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="publish"
          checked={metadata.publish || false}
          onCheckedChange={(checked) => updateField("publish", checked)}
        />
        <Label htmlFor="publish">Published</Label>
      </div>

      <div className="border-t pt-4 mt-4">
        <h4 className="font-semibold mb-3">SEO Settings</h4>

        <div className="space-y-2 mb-3">
          <Label htmlFor="seo-title">SEO Title</Label>
          <Input
            id="seo-title"
            value={metadata.seo?.title || ""}
            onChange={(e) => updateSeoField("title", e.target.value)}
            placeholder="Custom SEO title"
          />
        </div>

        <div className="space-y-2 mb-3">
          <Label htmlFor="seo-description">SEO Description</Label>
          <Textarea
            id="seo-description"
            value={metadata.seo?.description || ""}
            onChange={(e) => updateSeoField("description", e.target.value)}
            placeholder="Custom SEO description"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo-keywords">SEO Keywords (comma-separated)</Label>
          <Input
            id="seo-keywords"
            value={metadata.seo?.keywords?.join(", ") || ""}
            onChange={(e) => {
              const keywords = e.target.value.split(",").map((k) => k.trim()).filter(Boolean);
              updateSeoField("keywords", keywords);
            }}
            placeholder="keyword1, keyword2"
          />
        </div>
      </div>
    </div>
  );
}

