interface Props {
  categories: string[];
  recentPosts: Array<{
    id: string;
    data: {
      title: string;
      date: Date;
      image?: string;
    };
  }>;
  currentCategory?: string | null;
  onCategoryChange?: (category: string | null) => void;
}

// Small placeholder for sidebar thumbnails
function SmallPlaceholder() {
  return (
    <div
      className="w-16 h-16 flex items-center justify-center rounded flex-shrink-0"
      style={{ backgroundColor: "#1c1917" }}
    >
      <svg
        className="w-8 h-8 opacity-60"
        viewBox="0 0 100 100"
        fill="none"
        style={{ color: "#c9a050" }}
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="50"
            x2={50 + 35 * Math.cos((angle * Math.PI) / 180)}
            y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}

export function BlogSidebar({
  categories,
  recentPosts,
  currentCategory,
  onCategoryChange,
}: Props) {
  const handleCategoryClick = (category: string | null, e: React.MouseEvent) => {
    if (onCategoryChange) {
      e.preventDefault();
      onCategoryChange(category);
    }
  };

  return (
    <aside className="sticky top-24 space-y-8">
      {/* Categories */}
      <div
        className="p-6 rounded-lg"
        style={{ backgroundColor: "white", border: "2px solid #c9a050" }}
      >
        <h3 className="text-lg font-serif mb-4" style={{ color: "#1c1917" }}>
          Categories
        </h3>
        <ul className="space-y-2">
          <li>
            <a
              href="/blog"
              onClick={(e) => handleCategoryClick(null, e)}
              className={`block px-3 py-2 rounded transition-colors cursor-pointer ${
                !currentCategory ? "font-semibold" : "hover:bg-stone-100"
              }`}
              style={
                !currentCategory
                  ? { backgroundColor: "#c9a050", color: "#1c1917" }
                  : { color: "#1c1917" }
              }
            >
              All
            </a>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <a
                href={`/blog?category=${encodeURIComponent(category)}`}
                onClick={(e) => handleCategoryClick(category, e)}
                className={`block px-3 py-2 rounded transition-colors cursor-pointer ${
                  currentCategory === category
                    ? "font-semibold"
                    : "hover:bg-stone-100"
                }`}
                style={
                  currentCategory === category
                    ? { backgroundColor: "#c9a050", color: "#1c1917" }
                    : { color: "#1c1917" }
                }
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div
        className="p-6 rounded-lg"
        style={{ backgroundColor: "white", border: "2px solid #c9a050" }}
      >
        <h3 className="text-lg font-serif mb-4" style={{ color: "#1c1917" }}>
          Recent Posts
        </h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <a href={`/blog/${post.id}`} className="flex gap-3 group">
                {post.data.image ? (
                  <img
                    src={post.data.image}
                    alt={post.data.title}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <SmallPlaceholder />
                )}
                <div className="min-w-0">
                  <h4
                    className="text-sm font-medium line-clamp-2 group-hover:underline"
                    style={{ color: "#1c1917" }}
                  >
                    {post.data.title}
                  </h4>
                  <span className="text-xs text-stone-500">
                    {new Date(post.data.date).toLocaleDateString()}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
