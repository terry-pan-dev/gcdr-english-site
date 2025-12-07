import { motion } from "motion/react";
import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

interface Props {
  previousPost: Post | null;
  nextPost: Post | null;
}

export function BlogNavigation({ previousPost, nextPost }: Props) {
  return (
    <div
      className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t"
      style={{ borderColor: "#c9a050" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        {/* Previous Post */}
        {previousPost ? (
          <motion.a
            href={`/blog/${previousPost.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-4 transition-all duration-300 hover:shadow-md border cursor-pointer"
            style={{
              backgroundColor: "white",
              borderColor: "#c9a050",
              borderRadius: "0.5rem",
              textDecoration: "none",
            }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#c9a050" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <div
                className="text-[10px] sm:text-xs uppercase tracking-wider mb-0 sm:mb-0.5"
                style={{ color: "#c9a050" }}
              >
                Previous
              </div>
              <h3
                className="font-serif text-sm sm:text-base mb-0.5 sm:mb-1 line-clamp-1"
                style={{
                  color: "#1c1917",
                  marginTop: "1rem",
                  lineHeight: "1.8rem",
                }}
              >
                {previousPost.data.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 line-clamp-1 sm:line-clamp-2">
                {previousPost.data.excerpt}
              </p>
            </div>
          </motion.a>
        ) : (
          <div />
        )}

        {/* Next Post */}
        {nextPost ? (
          <motion.a
            href={`/blog/${nextPost.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-4 transition-all duration-300 hover:shadow-md border cursor-pointer md:text-right"
            style={{
              backgroundColor: "white",
              borderColor: "#c9a050",
              borderRadius: "0.5rem",
              textDecoration: "none",
            }}
          >
            <div className="flex-1 min-w-0 md:order-2">
              <div
                className="text-[10px] sm:text-xs uppercase tracking-wider mb-0 sm:mb-0.5 md:text-right"
                style={{ color: "#c9a050" }}
              >
                Next
              </div>
              <h3
                className="font-serif text-sm sm:text-base mb-0.5 sm:mb-1 line-clamp-1"
                style={{
                  color: "#1c1917",
                  marginTop: "1rem",
                  lineHeight: "1.8rem",
                }}
              >
                {nextPost.data.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 line-clamp-1 sm:line-clamp-2">
                {nextPost.data.excerpt}
              </p>
            </div>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 md:order-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "#c9a050" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
