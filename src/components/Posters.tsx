import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry from "react-responsive-masonry";

/** 横图（含正方形）在全屏预览时相对原始像素的宽度放大倍数，并受视口宽度限制 */
const LIGHTBOX_LANDSCAPE_SCALE = 1.65;
/** 全屏层含 p-4 等边距时，竖图可用高度需从 100vh 减去的量（不再预留标题区） */
const LIGHTBOX_VERTICAL_RESERVE = "2rem";
/** 全屏预览内点击逐级放大的倍数 */
const LIGHTBOX_ZOOM_LEVELS = [1, 2, 3] as const;
/** 滚轮缩放步进与上下限 */
const LIGHTBOX_WHEEL_ZOOM_STEP = 0.2;
const LIGHTBOX_MIN_ZOOM = 1;
const LIGHTBOX_MAX_ZOOM = 4;
/** 判定为拖拽而非点击的最小位移（px） */
const LIGHTBOX_DRAG_THRESHOLD = 5;

const samplePosters = [
  {
    id: 1,
    image: "/assets/2_new_2026Events.jpg",
    title: "2026 Events",
  },

  {
    id: 4,
    image: "/assets/2026AvatamsakaDharmaAssembly.jpg",
    title: "Flower Garland Dhara Assembly",
  },

  {
    id: 5,
    image: "/assets/2026AvatamsakaDharmaAssembly_1.jpg",
    title:
      "19-DayThe Buddha's Flower Garland Sutra of Great Expansive Teachings Recitation Retreat",
  },

  {
    id: 13,
    image: "/assets/Saturday-Lecture.jpg",
    title: "Saturday Lecture",
  },

  {
    id: 2,
    image: "/assets/53Visits.jpg",
    title: "Sunday Lecture: Avatamsaka Dharma Assembly Sudhana's Fifty-Three Visits",
  },

  {
    id: 3,
    image: "/assets/SundayKidClass.jpg",
    title: "Sunday Kids Classes 2026",
  },

  // {
  //   id: 4,
  //   image: "/assets/LHBC 2026.jpeg",
  //   title: "Emperor Liang Jeweled Repentance",
  // },

  // {
  //   id: 5,
  //   image: "/assets/05052026ThreeRefugesFivePrecepts.jpeg",
  //   title: "Transmission of the Three refuges & Five precepts",
  // },

  // {
  //   id: 6,
  //   image: "/assets/ShurangamaMantraDharmaAssembly.png",
  //   title: "Shurangama Mantra Recitation Retreat",
  // },

  {
    id: 7,
    image: "/assets/3_CaptureLunarNewYearBlessingCeremony.jpg",
    title: "Lunar New Year Blessing Ceremony",
  },

  {
    id: 8,
    image: "/assets/2_NewSundayClasses.jpg",
    title: "Sunday Classes: Calligraphy & Chinese Culture",
  },

  {
    id: 9,
    image: "/assets/4_RecitationAidTeamMonthly.jpg",
    title: "Recitation Aid Team monthly online layperson",
  },

  {
    id: 10,
    image: "/assets/5_PlaqueRegistration.jpg",
    title: "Plaque Registration",
  },

  {
    id: 11,
    image: "/assets/saturday_events.jpg",
    title: "Saturday Events",
  },
  {
    id: 12,
    image: "/assets/yoga.jpg",
    title: "Yoga & Meditation",
  },
  // {
  //   id: 11,
  //   image: "/assets/Volunteer-Team.jpg",
  //   title: "Volunteer Team",
  // },

  {
    id: 14,
    image: "/assets/GuanYin-Hall-Sponsorship.jpg",
    title: "Sponsorship for GuanYin Hall",
  },
  {
    id: 15,
    image: "/assets/GCM.jpg",
    title: "Great Compassion Mantra Recitation Program",
  },
];

export function Posters() {
  // 存储当前选中的海报对象
  const [selectedPoster, setSelectedPoster] = useState<(typeof samplePosters)[0] | null>(null);
  /** 全屏预览图加载完成后的原始宽高，用于区分竖图 / 横图并计算尺寸 */
  const [lightboxNaturalSize, setLightboxNaturalSize] = useState<{
    w: number;
    h: number;
  } | null>(null);
  /** 全屏预览内的额外缩放（在 fit 尺寸基础上） */
  const [lightboxZoom, setLightboxZoom] = useState(1);
  /** 放大后的平移偏移 */
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isLightboxDragging, setIsLightboxDragging] = useState(false);
  const lightboxDragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originPanX: number;
    originPanY: number;
    moved: boolean;
  } | null>(null);
  const lightboxClickBlockedRef = useRef(false);
  const lightboxZoomRef = useRef(1);

  useEffect(() => {
    lightboxZoomRef.current = lightboxZoom;
  }, [lightboxZoom]);

  const resetLightboxView = useCallback(() => {
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    setLightboxNaturalSize(null);
    resetLightboxView();
  }, [selectedPoster?.image, resetLightboxView]);

  useEffect(() => {
    if (!selectedPoster) return;

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const previousBody = {
      overflow: bodyStyle.overflow,
      position: bodyStyle.position,
      top: bodyStyle.top,
      width: bodyStyle.width,
      paddingRight: bodyStyle.paddingRight,
    };
    const previousHtmlOverflow = htmlStyle.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    if (scrollbarWidth > 0) {
      bodyStyle.paddingRight = `${scrollbarWidth}px`;
    }
    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.overflow = previousBody.overflow;
      bodyStyle.position = previousBody.position;
      bodyStyle.top = previousBody.top;
      bodyStyle.width = previousBody.width;
      bodyStyle.paddingRight = previousBody.paddingRight;
      htmlStyle.overflow = previousHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [selectedPoster]);

  useEffect(() => {
    if (!selectedPoster) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const direction = e.deltaY > 0 ? -1 : 1;
      const currentZoom = lightboxZoomRef.current;
      const nextZoom = Math.min(
        LIGHTBOX_MAX_ZOOM,
        Math.max(LIGHTBOX_MIN_ZOOM, currentZoom + direction * LIGHTBOX_WHEEL_ZOOM_STEP)
      );
      setLightboxZoom(nextZoom);
      if (nextZoom === 1) setLightboxPan({ x: 0, y: 0 });
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
    };
  }, [selectedPoster]);

  useEffect(() => {
    if (!selectedPoster) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxZoom > 1) {
          resetLightboxView();
          return;
        }
        setSelectedPoster(null);
        return;
      }
      if (e.key === "0" || e.key === "Home") {
        resetLightboxView();
        return;
      }
      if (e.key === "+" || e.key === "=") {
        setLightboxZoom((z) => Math.min(LIGHTBOX_MAX_ZOOM, z + LIGHTBOX_WHEEL_ZOOM_STEP));
        return;
      }
      if (e.key === "-") {
        const next = Math.max(LIGHTBOX_MIN_ZOOM, lightboxZoom - LIGHTBOX_WHEEL_ZOOM_STEP);
        setLightboxZoom(next);
        if (next === 1) setLightboxPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPoster, lightboxZoom, resetLightboxView]);

  const lightboxImageStyle = useMemo(() => {
    if (!lightboxNaturalSize) return undefined;
    const { w: nw, h: nh } = lightboxNaturalSize;
    if (nh > nw) {
      return {
        height: `calc(100vh - ${LIGHTBOX_VERTICAL_RESERVE})`,
        width: "auto" as const,
        maxWidth: "min(100vw - 2rem, 100%)",
      };
    }
    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
    const scaledW = Math.min(nw * LIGHTBOX_LANDSCAPE_SCALE, vw * 0.95);
    return {
      width: scaledW,
      height: "auto" as const,
      maxWidth: "95vw",
    };
  }, [lightboxNaturalSize]);

  const handlePosterClick = (poster: (typeof samplePosters)[0]) => {
    setSelectedPoster(poster);
  };

  const closeFullscreen = () => {
    resetLightboxView();
    setSelectedPoster(null);
  };

  const handleLightboxBackdropClick = () => {
    if (lightboxZoom > 1) {
      resetLightboxView();
      return;
    }
    closeFullscreen();
  };

  const handleLightboxImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (lightboxClickBlockedRef.current) return;

    const nextLevel = LIGHTBOX_ZOOM_LEVELS.find((level) => level > lightboxZoom + 0.01);
    if (nextLevel !== undefined) {
      setLightboxZoom(nextLevel);
      return;
    }
    resetLightboxView();
  };

  const handleLightboxPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (lightboxZoom <= 1) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    lightboxDragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originPanX: lightboxPan.x,
      originPanY: lightboxPan.y,
      moved: false,
    };
    setIsLightboxDragging(true);
  };

  const handleLightboxPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = lightboxDragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const deltaX = e.clientX - drag.startX;
    const deltaY = e.clientY - drag.startY;
    if (
      !drag.moved &&
      (Math.abs(deltaX) > LIGHTBOX_DRAG_THRESHOLD || Math.abs(deltaY) > LIGHTBOX_DRAG_THRESHOLD)
    ) {
      drag.moved = true;
    }
    if (!drag.moved) return;

    setLightboxPan({
      x: drag.originPanX + deltaX,
      y: drag.originPanY + deltaY,
    });
  };

  const finishLightboxPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = lightboxDragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (drag.moved) {
      lightboxClickBlockedRef.current = true;
      window.setTimeout(() => {
        lightboxClickBlockedRef.current = false;
      }, 0);
    }
    lightboxDragRef.current = null;
    setIsLightboxDragging(false);
  };

  const handleLightboxImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    setLightboxNaturalSize({ w: el.naturalWidth, h: el.naturalHeight });
  };

  return (
    <section
      id="posters"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#78584a" }}
    >
      {/* 4. 全屏放大模态框 */}
      {selectedPoster && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-4 overscroll-none ${
            lightboxZoom > 1 ? "cursor-default" : "cursor-zoom-out"
          }`}
          onClick={handleLightboxBackdropClick}
          role="presentation"
        >
          {lightboxZoom > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetLightboxView();
              }}
              className="absolute top-4 right-4 z-[110] rounded-full border border-accent-gold/40 bg-black/60 px-4 py-2 text-sm text-dark-text backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              Reset zoom
            </button>
          )}

          <p className="pointer-events-none absolute bottom-4 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-xs text-dark-text/80 backdrop-blur-sm">
            {lightboxZoom > 1
              ? "Drag to pan · Scroll or click to adjust · Esc to reset"
              : "Click image to zoom · Scroll to zoom · Esc to close"}
          </p>

          <div className="relative flex min-h-0 w-full max-w-[95vw] animate-in fade-in zoom-in flex-col items-center justify-center duration-300">
            <div
              className="flex max-h-[calc(100vh-2rem)] w-full items-center justify-center overflow-hidden"
              onClick={handleLightboxImageClick}
              onPointerDown={handleLightboxPointerDown}
              onPointerMove={handleLightboxPointerMove}
              onPointerUp={finishLightboxPointer}
              onPointerCancel={finishLightboxPointer}
              style={{
                cursor: lightboxZoom > 1 ? (isLightboxDragging ? "grabbing" : "grab") : "zoom-in",
                touchAction: lightboxZoom > 1 ? "none" : "auto",
              }}
            >
              <div
                style={{
                  transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                  transformOrigin: "center center",
                  transition: isLightboxDragging ? "none" : "transform 0.2s ease-out",
                }}
              >
                <ImageWithFallback
                  src={selectedPoster.image}
                  alt={selectedPoster.title}
                  onLoad={handleLightboxImageLoad}
                  draggable={false}
                  className="mx-auto max-w-full object-contain rounded-lg shadow-2xl border-4 max-h-[calc(100vh-2rem)] select-none"
                  style={{
                    borderColor: "transparent",
                    ...lightboxImageStyle,
                  }}
                />
              </div>
            </div>
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
