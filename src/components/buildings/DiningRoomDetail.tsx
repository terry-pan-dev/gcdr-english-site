import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BuildingImage {
  src: string;
  alt: string;
}

interface RelatedBuilding {
  slug: string;
  name?: string;
  nameChinese?: string;
  description?: string;
  image: string;
}

interface Props {
  name: string;
  nameChinese?: string;
  description: string;
  featuredImage: BuildingImage;
  galleryImages: BuildingImage[];
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  relatedBuildings?: RelatedBuilding[];
}

export function DiningRoomDetail({
  featuredImage,
  galleryImages,
  leftContent,
  rightContent,
  relatedBuildings = [],
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /* ================= Carousel logic（单张） ================= */
  useEffect(() => {
    if (!isAutoPlaying || galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev >= galleryImages.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  const nextImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev >= galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= 主内容 + Sticky（方案 B 核心） ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* ===== 左列：正文 + Gallery（同一滚动上下文） ===== */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* ================= Featured Image ================= */}
                <div className="mt-24 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-lg max-w-4xl"
                    style={{ border: "2px solid #c9a050" }}
                  >
                    <img
                      src={featuredImage.src}
                      alt={featuredImage.alt}
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                </div>

                {/* Left Content */}
                <div className="prose prose-lg max-w-none text-stone-700 leading-relaxed">
                  {leftContent}
                </div>

                {/* Mobile Right Content */}
                <div className="lg:hidden mt-8">{rightContent}</div>

                {/* ================= Gallery（单张，与左列同宽） ================= */}
                {galleryImages.length > 0 && (
                  <div className="mt-10">
                    <div className="relative">
                      <div className="overflow-hidden rounded-lg">
                        <motion.div
                          className="flex"
                          animate={{ x: `-${currentImageIndex * 100}%` }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          {galleryImages.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                              <div
                                className="relative overflow-hidden rounded-lg"
                                style={{ border: "2px solid #c9a050" }}
                              >
                                <img
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Navigation */}
                      {galleryImages.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* ===== 右列：Sticky（一直跟到 Gallery 结束） ===== */}
            <div className="hidden lg:block">
              <aside className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {rightContent}
                </motion.div>
              </aside>
            </div>
          </div>

          {/* ================= You May Also Like（全宽） ================= */}
          {/* ================= You May Also Like（无框、左对齐） ================= */}
          {relatedBuildings.length > 0 && (
            <div className="mt-12 pt-10 border-t border-stone-200">
              <h2 className="text-3xl font-serif mb-4 text-stone-900 font-bold">
                You May Also Like
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBuildings.map((building, index) => (
                  <motion.a
                    key={building.slug}
                    href={`/buildings/${building.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group block"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={building.image}
                        alt={building.name}
                        // className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-3">
                      <h3 className="font-serif text-lg text-stone-900 mb-1">{building.name}</h3>
                      <p className="text-sm text-stone-600 line-clamp-2">{building.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
