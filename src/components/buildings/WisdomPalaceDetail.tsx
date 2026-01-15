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
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  relatedBuildings?: RelatedBuilding[];
}

export function WisdomPalaceDetail({
  featuredImage,
  leftContent,
  rightContent,
  relatedBuildings = [],
}: Props) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= 主内容 + Sticky ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* ===== 左列：正文 ===== */}
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

                {/* Mobile Right Content (仅在移动端显示) */}
                <div className="lg:hidden mt-8">{rightContent}</div>
              </motion.div>
            </div>

            {/* ===== 右列：Sticky ===== */}
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

          {/* ================= You May Also Like (全宽) ================= */}
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
