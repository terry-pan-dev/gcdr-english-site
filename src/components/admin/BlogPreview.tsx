// Styles are now shared via src/styles/blog-content.css
// This ensures consistency between admin preview and blog detail page
import "../../styles/blog-content.css";

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

  return (
    <div className="blog-preview-wrapper bg-dark-text">
      {/* Hero Section */}
      <div className="relative pb-12 bg-dark-bg">
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
                  className="w-64 h-64 opacity-5 text-accent-gold"
                  viewBox="0 0 100 100"
                  fill="none"
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
              <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider rounded bg-accent-gold text-dark-bg">
                {frontmatter.category}
              </span>
            </div>
          )}

          {/* Title */}
          {frontmatter.title && (
            <h1
              className="text-3xl md:text-4xl mb-4 leading-tight font-serif text-dark-text"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              {frontmatter.title}
            </h1>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-dark-text/70">
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
            className="blog-content prose prose-lg prose-stone max-w-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Back to Blog Link */}
          <div className="mt-8 pt-8 border-t border-accent-gold">
            <div className="inline-flex items-center gap-2 text-accent-gold">
              <span>&larr;</span>
              Back to Dharma Insights
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

