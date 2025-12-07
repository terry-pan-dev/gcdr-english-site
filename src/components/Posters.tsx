import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry from "react-responsive-masonry";

const samplePosters = [
  {
    id: 1,
    image: "/assets/SM-2025-1.png",
    title: "Shurangama Dharma Retreat",
  },
  {
    id: 2,
    image: "/assets/GCM.jpg",
    title: "Great Compassion Mantra Recitation Program",
  },
  {
    id: 3,
    image: "/assets/Amitabha-Retreat.jpg",
    title: "Amitabha Recitation Retreat",
  },
  {
    id: 4,
    image: "/assets/Volunteer-Team.jpg",
    title: "Volunteer Team",
  },
  {
    id: 5,
    image: "/assets/Saturday-Lecture.jpg",
    title: "Saturday Lecture",
  },
  {
    id: 6,
    image: "/assets/GuanYin-Hall-Sponsorship.jpg",
    title: "Sponsorship for GuanYin Hall",
  },
];

export function Posters() {
  return (
    <section
      id="posters"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#78584a" }}
    >
      {/* Wooden texture overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Header */}
        <div className="text-center mb-16">
          {/* Top ornament */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-16 h-1 rounded-full"
              style={{ backgroundColor: "#c9a050" }}
            />
            <div className="mx-4 text-4xl">📌</div>
            <div
              className="w-16 h-1 rounded-full"
              style={{ backgroundColor: "#c9a050" }}
            />
          </div>

          <h2 className="text-4xl mb-4" style={{ color: "#EBE9CF" }}>
            Temple Notice Board
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: "#EBE9CF", opacity: 0.8 }}
          >
            Discover our upcoming events and special announcements
          </p>
        </div>

        {/* Mobile: Single Column Grid */}
        <div className="md:hidden grid grid-cols-1 gap-8">
          {samplePosters.map((poster) => (
            <div
              key={poster.id}
              className="group cursor-pointer relative mx-auto max-w-sm w-full"
            >
              {/* Pin at the top */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "#c9a050" }}
              >
                <div className="w-2 h-2 rounded-full bg-stone-800" />
              </div>

              {/* Poster Container */}
              <div
                className="relative overflow-hidden rounded-lg transition-all duration-300 shadow-xl"
                style={{
                  backgroundColor: "#EBE9CF",
                  border: "4px solid #c9a050",
                  transform: "none",
                }}
              >
                {/* Poster Image */}
                <div className="p-3">
                  <ImageWithFallback
                    src={poster.image}
                    alt={poster.title}
                    className="w-full h-auto object-cover rounded shadow-md"
                  />
                </div>

                {/* Title */}
                <div className="px-4 pb-4 text-center">
                  <h3 className="text-xl text-stone-900">{poster.title}</h3>
                </div>

                {/* Decorative corner elements */}
                <div
                  className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 rounded-tl"
                  style={{ borderColor: "#c9a050" }}
                />
                <div
                  className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 rounded-tr"
                  style={{ borderColor: "#c9a050" }}
                />
                <div
                  className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 rounded-bl"
                  style={{ borderColor: "#c9a050" }}
                />
                <div
                  className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 rounded-br"
                  style={{ borderColor: "#c9a050" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tablet: Two Column Masonry Grid */}
        <div className="hidden md:block lg:hidden">
          <Masonry columnsCount={2} gutter="24px">
            {samplePosters.map((poster) => (
              <div key={poster.id} className="group cursor-pointer relative">
                {/* Pin at the top */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#c9a050" }}
                >
                  <div className="w-2 h-2 rounded-full bg-stone-800" />
                </div>

                {/* Poster Container */}
                <div
                  className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 shadow-xl"
                  style={{
                    backgroundColor: "#EBE9CF",
                    border: "4px solid #c9a050",
                    transform: "rotate(-1deg)",
                  }}
                >
                  {/* Poster Image */}
                  <div className="p-3">
                    <ImageWithFallback
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-auto object-cover rounded shadow-md"
                    />
                  </div>

                  {/* Title */}
                  <div className="px-4 pb-4 text-center">
                    <h3 className="text-xl text-stone-900">{poster.title}</h3>
                  </div>

                  {/* Decorative corner elements */}
                  <div
                    className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 rounded-tl"
                    style={{ borderColor: "#c9a050" }}
                  />
                  <div
                    className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 rounded-tr"
                    style={{ borderColor: "#c9a050" }}
                  />
                  <div
                    className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 rounded-bl"
                    style={{ borderColor: "#c9a050" }}
                  />
                  <div
                    className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 rounded-br"
                    style={{ borderColor: "#c9a050" }}
                  />
                </div>
              </div>
            ))}
          </Masonry>
        </div>

        {/* Desktop: Three Column Masonry Grid */}
        <div className="hidden lg:block">
          <Masonry columnsCount={3} gutter="24px">
            {samplePosters.map((poster) => (
              <div key={poster.id} className="group cursor-pointer relative">
                {/* Pin at the top */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#c9a050" }}
                >
                  <div className="w-2 h-2 rounded-full bg-stone-800" />
                </div>

                {/* Poster Container */}
                <div
                  className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 shadow-xl"
                  style={{
                    backgroundColor: "#EBE9CF",
                    border: "4px solid #c9a050",
                    transform: "rotate(-1deg)",
                  }}
                >
                  {/* Poster Image */}
                  <div className="p-3">
                    <ImageWithFallback
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-auto object-cover rounded shadow-md"
                    />
                  </div>

                  {/* Title */}
                  <div className="px-4 pb-4 text-center">
                    <h3 className="text-xl text-stone-900">{poster.title}</h3>
                  </div>

                  {/* Decorative corner elements */}
                  <div
                    className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 rounded-tl"
                    style={{ borderColor: "#c9a050" }}
                  />
                  <div
                    className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 rounded-tr"
                    style={{ borderColor: "#c9a050" }}
                  />
                  <div
                    className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 rounded-bl"
                    style={{ borderColor: "#c9a050" }}
                  />
                  <div
                    className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 rounded-br"
                    style={{ borderColor: "#c9a050" }}
                  />
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
}
