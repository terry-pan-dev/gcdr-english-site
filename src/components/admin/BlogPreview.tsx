import { useEffect } from "react";

interface Props {
  content: string;
  frontmatter: Record<string, any>;
}

export function BlogPreview({ content, frontmatter }: Props) {
  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    // Apply the custom blog styles when component mounts
    const style = document.createElement("style");
    style.id = "blog-preview-styles";
    style.textContent = `
      /* Custom prose styles for blog preview */
      .blog-preview-content h2 {
        color: #1c1917;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        font-size: 1.75rem;
        font-weight: 500;
        border-bottom: 2px solid #c9a050;
        padding-bottom: 0.5rem;
      }

      .blog-preview-content h3 {
        color: #1c1917;
        margin-top: 2rem;
        margin-bottom: 0.75rem;
        font-size: 1.5rem;
        font-weight: 500;
      }

      .blog-preview-content p {
        color: #44403c;
        line-height: 1.8;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
      }

      .blog-preview-content p:first-child {
        margin-top: 0;
      }

      .blog-preview-content p:last-child {
        margin-bottom: 0;
      }

      .blog-preview-content strong {
        color: #1c1917;
        font-weight: 600;
      }

      .blog-preview-content ul,
      .blog-preview-content ol {
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
      }

      .blog-preview-content li {
        color: #44403c;
        margin-bottom: 0.5rem;
        line-height: 1.7;
      }

      .blog-preview-content a {
        color: #c9a050;
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      .blog-preview-content a:hover {
        color: #b8944a;
      }

      .blog-preview-content table {
        width: 100%;
        margin: 1.5rem 0;
        border-collapse: collapse;
      }

      .blog-preview-content th,
      .blog-preview-content td {
        padding: 0.75rem 1rem;
        text-align: left;
        border-bottom: 1px solid #d6d3d1;
      }

      .blog-preview-content th {
        background-color: rgba(201, 160, 80, 0.1);
        font-weight: 600;
        color: #1c1917;
      }

      .blog-preview-content img {
        border-radius: 0.5rem;
        overflow: hidden;
        max-width: 100%;
      }

      .blog-preview-content blockquote {
        border-left: 4px solid #c9a050;
        padding-left: 1.5rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: #57534e;
      }

      /* Custom Quote Component */
      .blog-preview-content div[data-component="quote"] {
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 1rem 1.5rem;
        border-left: 4px solid #c9a050;
        background-color: rgba(201, 160, 80, 0.04);
        border-radius: 0.5rem;
        font-style: normal;
      }

      .blog-preview-content div[data-component="quote"] p {
        font-size: 1.25rem;
        line-height: 1.625;
        font-style: italic;
        color: #1c1917;
        margin: 0;
      }

      .blog-preview-content div[data-component="quote"] cite {
        display: block;
        margin-top: 1rem;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        color: #c9a050;
      }

      /* Custom Callout Component */
      .blog-preview-content div[data-component="callout"] {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        padding: 0.75rem 1rem;
        border-left: 4px solid #c9a050;
        background-color: rgba(201, 160, 80, 0.1);
        border-radius: 0.5rem;
      }

      .blog-preview-content div[data-component="callout"] p {
        margin: 0;
        line-height: 1.625;
      }
    `;
    
    // Only add if not already added
    if (!document.getElementById("blog-preview-styles")) {
      document.head.appendChild(style);
    }

    return () => {
      // Cleanup on unmount
      const existingStyle = document.getElementById("blog-preview-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="blog-preview-wrapper" style={{ backgroundColor: "#EBE9CF" }}>
      {/* Hero Section */}
      <div className="relative pb-12" style={{ backgroundColor: "#1c1917" }}>
        {/* Background Image with Overlay or Decorative Pattern */}
        <div className="absolute inset-0">
          {frontmatter.image ? (
            <>
              <img
                src={frontmatter.image}
                alt={frontmatter.title || "Blog post image"}
                className="w-full h-full object-cover opacity-30"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.6), #1c1917)",
                }}
              ></div>
            </>
          ) : (
            <>
              {/* Decorative pattern when no image */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #c9a050 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
              {/* Dharma wheel decoration */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <svg
                  className="w-64 h-64 opacity-5"
                  viewBox="0 0 100 100"
                  fill="none"
                  style={{ color: "#c9a050" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                  <line
                    x1="50"
                    y1="5"
                    x2="50"
                    y2="95"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="5"
                    y1="50"
                    x2="95"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="18"
                    y1="18"
                    x2="82"
                    y2="82"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <line
                    x1="82"
                    y1="18"
                    x2="18"
                    y2="82"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent, #1c1917)",
                }}
              ></div>
            </>
          )}
        </div>

        <div className="relative px-6 pt-8">
          {/* Category Badge */}
          {frontmatter.category && (
            <div className="mb-3">
              <span
                className="inline-block px-3 py-1 text-xs uppercase tracking-wider rounded"
                style={{ backgroundColor: "#c9a050", color: "#1c1917" }}
              >
                {frontmatter.category}
              </span>
            </div>
          )}

          {/* Title */}
          {frontmatter.title && (
            <h1
              className="text-3xl md:text-4xl mb-4 leading-tight font-serif"
              style={{
                color: "#EBE9CF",
                fontFamily: "'Noto Serif', serif",
              }}
            >
              {frontmatter.title}
            </h1>
          )}

          {/* Meta */}
          <div
            className="flex items-center gap-3 text-sm"
            style={{ color: "rgba(235, 233, 207, 0.7)" }}
          >
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && frontmatter.author && <span>&bull;</span>}
            {frontmatter.author && <span>{frontmatter.author}</span>}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-8">
        <div className="px-6">
          <div
            className="blog-preview-content prose prose-lg prose-stone max-w-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Back to Blog Link */}
          <div
            className="mt-8 pt-8 border-t"
            style={{ borderColor: "#c9a050" }}
          >
            <div
              className="inline-flex items-center gap-2"
              style={{ color: "#c9a050" }}
            >
              <span>&larr;</span>
              Back to Dharma Insights
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

