import { motion } from "motion/react";

export function Hero() {
  return (
    <section id="home" className="relative h-screen">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload="auto"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

        {/* Mesh Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64, 64, 64, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 64, 64, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "2px 2px",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-48 md:mt-0 lg:mt-[25%]">
          <div className="mb-6">
            <span className="text-6xl"></span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl mb-6 tracking-wide font-serif italic"
            style={{ color: "#EBE9CF" }}
          >
            A quiet Chan temple nestled in a hushed forest.
          </motion.h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#visit"
              className="px-8 py-3 rounded transition-colors"
              style={{ backgroundColor: "#c9a050", color: "#1c1917" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b8944a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#c9a050")}
            >
              Plan Your Visit
            </a>
            <a
              href="#teachings"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white rounded hover:bg-white/20 transition-colors"
              style={{ color: "#EBE9CF" }}
            >
              Explore Teachings
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator-wrapper">
        <div className="animate-bounce-centered">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
