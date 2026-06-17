import { motion } from "motion/react";

interface Props {
  building: {
    slug: string;
    name: string;
    nameChinese?: string;
    description: string;
    image: string;
  };
  index: number;
}

export function BuildingCard({ building, index }: Props) {
  return (
    <motion.a
      href={`/buildings/${building.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group flex flex-col gap-4 p-6 shadow-lg hover:shadow-xl border-2 cursor-pointer block rounded-lg bg-white"
      style={{
        borderColor: "#c9a050",
        textDecoration: "none",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg" style={{ border: "2px solid #c9a050" }}>
        <img
          src={building.image}
          alt={building.name}
          className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Corner Decorations */}
        <div
          className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2"
          style={{ borderColor: "#c9a050" }}
        />
        <div
          className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2"
          style={{ borderColor: "#c9a050" }}
        />
        <div
          className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2"
          style={{ borderColor: "#c9a050" }}
        />
        <div
          className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2"
          style={{ borderColor: "#c9a050" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-start">
        <h2 className="font-serif mb-2 text-2xl sm:text-3xl" style={{ color: "#1c1917" }}>
          {building.name}
        </h2>
        {building.nameChinese && (
          <p className="text-stone-500 mb-2 text-lg">{building.nameChinese}</p>
        )}
        <p className="text-stone-600 mb-4 text-sm sm:text-base line-clamp-3">
          {building.description}
        </p>

        <div
          className="inline-flex items-center gap-2 text-sm sm:text-base transition-all group-hover:gap-3"
          style={{ color: "#c9a050" }}
        >
          Learn More
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </div>
      </div>
    </motion.a>
  );
}
