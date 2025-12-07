import { motion } from "motion/react";

interface Props {
  post: {
    id: string;
    data: {
      title: string;
      date: Date;
      author: string;
      category: string;
      excerpt: string;
      image?: string;
      pinned?: boolean;
    };
  };
  index: number;
}

export function BlogCard({ post, index }: Props) {
  const isEven = index % 2 === 0;
  const hasImage = !!post.data.image;

  return (
    <motion.a
      href={`/blog/${post.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`group flex flex-col ${
        hasImage ? (isEven ? "md:flex-row" : "md:flex-row-reverse") : ""
      } gap-3 sm:gap-6 p-3 sm:p-6 shadow-lg hover:shadow-xl border-2 sm:border-[3px] cursor-pointer block`}
      style={{
        backgroundColor: "white",
        borderColor: "#c9a050",
        borderRadius: "0.75rem",
        textDecoration: "none",
        // Safari iOS flickering fixes
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitPerspective: 1000,
        perspective: 1000,
        willChange: "opacity, transform",
      }}
    >
      {/* Image - only show if image exists */}
      {hasImage && (
        <div className="md:w-1/3 flex-shrink-0">
          <div
            className="relative overflow-hidden rounded-lg"
            style={{ border: "2px solid #c9a050" }}
          >
            <img
              src={post.data.image}
              alt={post.data.title}
              className="w-full h-40 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Corner Decorations */}
            <div
              className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2"
              style={{ borderColor: "#c9a050" }}
            />
            <div
              className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2"
              style={{ borderColor: "#c9a050" }}
            />
            <div
              className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2"
              style={{ borderColor: "#c9a050" }}
            />
            <div
              className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2"
              style={{ borderColor: "#c9a050" }}
            />
          </div>
        </div>
      )}

      {/* Content - full width when no image, 2/3 width when image exists */}
      <div
        className={`flex flex-col ${hasImage ? "md:w-2/3" : "w-full"} ${
          hasImage ? "justify-center" : "justify-start"
        }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
          <span
            className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs uppercase tracking-wider rounded w-fit"
            style={{ backgroundColor: "#c9a050", color: "#1c1917" }}
          >
            {post.data.category}
          </span>
          {post.data.pinned && (
            <span
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 text-xs uppercase tracking-wider rounded w-fit"
              style={{ backgroundColor: "#1c1917", color: "#c9a050" }}
              title="Pinned Post"
            >
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
              </svg>
              <span className="hidden sm:inline">Pinned</span>
            </span>
          )}
        </div>

        <h2
          className={`font-serif mb-2 sm:mb-3 ${
            hasImage ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
          }`}
          style={{ color: "#1c1917" }}
        >
          {post.data.title}
        </h2>

        <p
          className={`text-stone-600 mb-3 sm:mb-4 text-sm sm:text-base ${
            hasImage
              ? "line-clamp-2 sm:line-clamp-3"
              : "line-clamp-2 sm:line-clamp-4"
          }`}
        >
          {post.data.excerpt}
        </p>

        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-stone-500 mb-3 sm:mb-4">
          <span>
            {new Date(post.data.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>&bull;</span>
          <span>{post.data.author}</span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base transition-all group-hover:gap-2 sm:group-hover:gap-3"
          style={{ color: "#c9a050" }}
        >
          Read More
          <span className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </div>
    </motion.a>
  );
}
