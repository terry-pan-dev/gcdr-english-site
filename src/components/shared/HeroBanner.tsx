import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "motion/react";

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  author?: string;
  backgroundImage?: string;
  height?: "default" | "tall";
  className?: string;
}

export function HeroBanner({
  title,
  subtitle,
  author,
  backgroundImage = "/assets/hero-bg.png",
  height = "default",
  className = "",
}: HeroBannerProps) {
  const heightClass = height === "tall" ? "h-[70vh] min-h-[600px]" : "h-[50vh] min-h-[400px]";

  return (
    <div className={`relative ${heightClass} w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Background Texture"
          className="w-full h-full object-cover opacity-50 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-dark-bg/60 to-dark-bg" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-serif italic mb-4 tracking-wide text-accent-gold">
            {title}
          </h1>
          <div className="h-1 w-24 bg-accent-gold mx-auto mb-6" />
          {subtitle && (
            <p className="text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
              {subtitle}
            </p>
          )}
          {author && (
            <p className="text-lg md:text-xl font-serif italic text-accent-gold/80 mt-4">
              {author}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
