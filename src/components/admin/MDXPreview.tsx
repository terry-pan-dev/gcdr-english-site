import { useEffect, useState } from "react";

interface Props {
  content: string;
  frontmatter: Record<string, any>;
}

export function MDXPreview({ content, frontmatter }: Props) {
  const [previewHtml, setPreviewHtml] = useState("");

  useEffect(() => {
    // Display the HTML content directly
    setPreviewHtml(content);
  }, [content]);

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {frontmatter.title && (
        <div className="mb-6 pb-6 border-b">
          <h1 className="text-3xl font-bold mb-2">{frontmatter.title}</h1>
          {frontmatter.subtitle && (
            <p className="text-lg text-muted-foreground">{frontmatter.subtitle}</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            {frontmatter.author && <span>By {frontmatter.author}</span>}
            {frontmatter.date && (
              <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
    </div>
  );
}

