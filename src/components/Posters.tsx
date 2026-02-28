import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry from "react-responsive-masonry";

const samplePosters = [
  // {
  //   id: 1,
  //   image: "/assets/shirangama.jpg",
  //   title: "Shurangama Dharma Retreat",
  // },

  {
    id: 1,
    image: "/assets/3_CaptureLunarNewYearBlessingCeremony.jpg",
    title: "Lunar New Year Blessing Ceremony",
  },

  {
    id: 2,
    image: "/assets/2_NewSundayClasses.jpg",
    title: "Sunday Classes: Calligraphy & Chinese Culture",
  },

  {
    id: 3,
    image: "/assets/4_RecitationAidTeamMonthly.jpg",
    title: "Recitation Aid Team monthly online layperson",
  },

  {
    id: 4,
    image: "/assets/1_new_2026Events.PNG",
    title: "2026 Events",
  },

  {
    id: 5,
    image: "/assets/5_PlaqueRegistration.jpg",
    title: "Plaque Registration",
  },

  {
    id: 6,
    image: "/assets/saturday_events.jpg",
    title: "Saturday Events",
  },
  {
    id: 7,
    image: "/assets/yoga.jpg",
    title: "Yoga & Meditation",
  },
  {
    id: 8,
    image: "/assets/Volunteer-Team.jpg",
    title: "Volunteer Team",
  },
  {
    id: 9,
    image: "/assets/Saturday-Lecture.jpg",
    title: "Saturday Lecture",
  },
  {
    id: 10,
    image: "/assets/GuanYin-Hall-Sponsorship.jpg",
    title: "Sponsorship for GuanYin Hall",
  },
  {
    id: 11,
    image: "/assets/GCM.jpg",
    title: "Great Compassion Mantra Recitation Program",
  },
];

export function Posters() {
  // 存储当前选中的海报对象
  const [selectedPoster, setSelectedPoster] = useState<(typeof samplePosters)[0] | null>(null);
  // 添加
  const handlePosterClick = (poster: (typeof samplePosters)[0]) => {
    setSelectedPoster(poster);
  };
  // 添加
  const closeFullscreen = () => {
    setSelectedPoster(null);
  };

  return (
    <section
      id="posters"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#78584a" }}
    >
      {/* 全屏放大模态框 */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-zoom-out p-4"
          onClick={closeFullscreen}
        >
          <div
            className="max-w-4xl w-full relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={selectedPoster.image}
              alt={selectedPoster.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl border-4"
              //style={{ borderColor: "#c9a050" }}
              style={{ borderColor: "transparent" }}
            />
            <h3 className="text-[#EBE9CF] text-center mt-4 text-2xl">{selectedPoster.title}</h3>
            <p className="text-[#EBE9CF]/60 text-center text-sm mt-2">Click anywhere to close</p>
          </div>
        </div>
      )}

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
            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: "#c9a050" }} />
            <div className="mx-4 text-4xl">📌</div>
            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: "#c9a050" }} />
          </div>

          <h2 className="text-4xl mb-4" style={{ color: "#EBE9CF" }}>
            Temple Notice Board
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: "#EBE9CF", opacity: 0.8 }}>
            Discover our upcoming events and special announcements
          </p>
        </div>

        {/* Mobile: Single Column Grid */}
        <div className="md:hidden grid grid-cols-1 gap-8">
          {samplePosters.map((poster) => (
            <div
              key={poster.id}
              className="group cursor-pointer relative mx-auto max-w-sm w-full"
              onClick={() => handlePosterClick(poster)}
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
              <div
                key={poster.id}
                className="group cursor-pointer relative"
                onClick={() => handlePosterClick(poster)}
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
              <div
                key={poster.id}
                className="group cursor-pointer relative"
                onClick={() => handlePosterClick(poster)}
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
