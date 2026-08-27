import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Masonry from "react-masonry-css";

// ---------------------------------------------------------------------------
// Lightbox constants
// ---------------------------------------------------------------------------
const LIGHTBOX_LANDSCAPE_SCALE = 1.65;
const LIGHTBOX_VERTICAL_RESERVE = "2rem";
const LIGHTBOX_ZOOM_LEVELS = [1, 2] as const;
const LIGHTBOX_WHEEL_ZOOM_STEP = 0.2;
const LIGHTBOX_MIN_ZOOM = 1;
const LIGHTBOX_MAX_ZOOM = 2;
const LIGHTBOX_DRAG_THRESHOLD = 5;

// ---------------------------------------------------------------------------
// Poster data
// ---------------------------------------------------------------------------
const today = new Date();
today.setHours(0, 0, 0, 0);

const allPosters = [
  {
    id: 16,
    image: "/assets/Guanyin Chinese 2026.jpeg",
    title: "Guanyin Dharma Assembly 2026",
    endDate: "2026-08-01",
  },
  {
    id: 17,
    image: "/assets/Chan 2026.jpeg",
    title: "Chan Session 2026",
    endDate: "2026-08-16",
  },
  {
    id: 22,
    image: "/assets/Celebration of Ullambana.png",
    title: "Celebration of Ullambana",
    endDate: "2026-08-23",
  },
  {
    id: 20,
    image: "/assets/49_earth_store_1.jpg",
    title: "Earth Store Dharma Assembly",
    endDate: "2026-09-08",
  },
  {
    id: 21,
    image: "/assets/49_earth_store_2.jpg",
    title: "Earth Store Dharma Assembly",
    endDate: "2026-09-08",
  },
  {
    id: 18,
    image: "/assets/SundayKidClass.jpg",
    title: "Sunday Kids Class",
    endDate: "2026-12-06",
  },
  { id: 19, image: "/assets/53Visits.jpg", title: "53 Visits" },
  {
    id: 1,
    image: "/assets/0_KIDS_CAMP_04182026.jpg",
    title: "Kids Camp",
    endDate: "2026-04-19",
  },
  {
    id: 2,
    image: "/assets/LHBC 2026.jpeg",
    title: "Emperor Liang Jeweled Repentance",
    endDate: "2026-05-09",
  },
  {
    id: 3,
    image: "/assets/05052026ThreeRefugesFivePrecepts.jpeg",
    title: "Transmission of the Three Refuges & Five Precepts",
    endDate: "2026-05-05",
  },
  {
    id: 4,
    image: "/assets/ShurangamaMantraDharmaAssembly.png",
    title: "Shurangama Mantra Dharma Assembly",
    endDate: "2026-05-17",
  },
  {
    id: 5,
    image: "/assets/3_CaptureLunarNewYearBlessingCeremony.jpg",
    title: "Lunar New Year Blessing Ceremony",
  },
  {
    id: 8,
    image: "/assets/2_new_2026Events.jpg",
    title: "2026 Events",
    endDate: "2027-01-01",
  },
  {
    id: 9,
    image: "/assets/5_PlaqueRegistration.jpg",
    title: "Plaque Registration",
  },
  { id: 10, image: "/assets/saturday_events.jpg", title: "Saturday Events" },
  { id: 11, image: "/assets/yoga.jpg", title: "Yoga & Meditation" },
  { id: 12, image: "/assets/Volunteer-Team.jpg", title: "Volunteer Team" },
  { id: 13, image: "/assets/Saturday-Lecture.jpg", title: "Saturday Lecture" },
  {
    id: 14,
    image: "/assets/GuanYin-Hall-Sponsorship.jpg",
    title: "Sponsorship for Guan Yin Hall",
  },
  {
    id: 15,
    image: "/assets/GCM.jpg",
    title: "Great Compassion Mantra Recitation Program",
  },
];

const breakpointColumns = {
  default: 3,
  1024: 2,
  768: 1,
};

function isVisible(poster: (typeof allPosters)[0]): boolean {
  if (!poster.endDate) return true;
  const end = new Date(poster.endDate);
  end.setHours(0, 0, 0, 0);
  return end >= today;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function Posters() {
  const [selectedPoster, setSelectedPoster] = useState<
    (typeof allPosters)[0] | null
  >(null);

  // Lightbox state
  const [lightboxNaturalSize, setLightboxNaturalSize] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
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
  const lightboxPointerStartedOnPosterRef = useRef(false);
  const lightboxZoomRef = useRef(1);

  useEffect(() => {
    lightboxZoomRef.current = lightboxZoom;
  }, [lightboxZoom]);

  const resetLightboxView = useCallback(() => {
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
  }, []);

  const closeLightbox = useCallback(() => {
    resetLightboxView();
    setSelectedPoster(null);
  }, [resetLightboxView]);

  // Reset view when poster changes
  useEffect(() => {
    setLightboxNaturalSize(null);
    resetLightboxView();
  }, [selectedPoster?.image, resetLightboxView]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (!selectedPoster) return;
    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;
    const prev = {
      overflow: bodyStyle.overflow,
      position: bodyStyle.position,
      top: bodyStyle.top,
      width: bodyStyle.width,
      paddingRight: bodyStyle.paddingRight,
    };
    const prevHtmlOverflow = htmlStyle.overflow;
    const prevHtmlScrollBehavior = htmlStyle.scrollBehavior;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    if (scrollbarWidth > 0) bodyStyle.paddingRight = `${scrollbarWidth}px`;
    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.overflow = prev.overflow;
      bodyStyle.position = prev.position;
      bodyStyle.top = prev.top;
      bodyStyle.width = prev.width;
      bodyStyle.paddingRight = prev.paddingRight;
      htmlStyle.overflow = prevHtmlOverflow;
      htmlStyle.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      htmlStyle.scrollBehavior = prevHtmlScrollBehavior;
    };
  }, [selectedPoster]);

  // Scroll-to-zoom
  useEffect(() => {
    if (!selectedPoster) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const direction = e.deltaY > 0 ? -1 : 1;
      const next = Math.min(
        LIGHTBOX_MAX_ZOOM,
        Math.max(
          LIGHTBOX_MIN_ZOOM,
          lightboxZoomRef.current + direction * LIGHTBOX_WHEEL_ZOOM_STEP,
        ),
      );
      setLightboxZoom(next);
      if (next === 1) setLightboxPan({ x: 0, y: 0 });
    };
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    return () =>
      window.removeEventListener("wheel", onWheel, { capture: true });
  }, [selectedPoster]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!selectedPoster) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxZoom > 1) {
          resetLightboxView();
          return;
        }
        closeLightbox();
        return;
      }
      if (e.key === "0" || e.key === "Home") {
        resetLightboxView();
        return;
      }
      if (e.key === "+" || e.key === "=") {
        setLightboxZoom((z) =>
          Math.min(LIGHTBOX_MAX_ZOOM, z + LIGHTBOX_WHEEL_ZOOM_STEP),
        );
        return;
      }
      if (e.key === "-") {
        const next = Math.max(
          LIGHTBOX_MIN_ZOOM,
          lightboxZoom - LIGHTBOX_WHEEL_ZOOM_STEP,
        );
        setLightboxZoom(next);
        if (next === 1) setLightboxPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPoster, lightboxZoom, resetLightboxView, closeLightbox]);

  // Image sizing based on orientation
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
    return { width: scaledW, height: "auto" as const, maxWidth: "95vw" };
  }, [lightboxNaturalSize]);

  // Backdrop click
  const handleLightboxBackdropClick = () => {
    closeLightbox();
  };

  // Image click cycles zoom levels
  const handleLightboxImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.target;
    const clickedPoster =
      (target instanceof Element &&
        Boolean(target.closest("[data-lightbox-poster]"))) ||
      lightboxPointerStartedOnPosterRef.current;
    lightboxPointerStartedOnPosterRef.current = false;
    if (!clickedPoster) {
      closeLightbox();
      return;
    }
    if (lightboxClickBlockedRef.current) return;
    const nextLevel = LIGHTBOX_ZOOM_LEVELS.find(
      (level) => level > lightboxZoom + 0.01,
    );
    if (nextLevel !== undefined) {
      setLightboxZoom(nextLevel);
      return;
    }
    resetLightboxView();
  };

  // Drag-to-pan handlers
  const handleLightboxPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (lightboxZoom <= 1) return;
    const target = e.target;
    const startedOnPoster =
      target instanceof Element &&
      Boolean(target.closest("[data-lightbox-poster]"));
    lightboxPointerStartedOnPosterRef.current = startedOnPoster;
    if (!startedOnPoster) return;
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
      (Math.abs(deltaX) > LIGHTBOX_DRAG_THRESHOLD ||
        Math.abs(deltaY) > LIGHTBOX_DRAG_THRESHOLD)
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
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    if (drag.moved) {
      lightboxClickBlockedRef.current = true;
      window.setTimeout(() => {
        lightboxClickBlockedRef.current = false;
      }, 0);
    }
    lightboxDragRef.current = null;
    setIsLightboxDragging(false);
  };

  const handleLightboxImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>,
  ) => {
    const el = e.currentTarget;
    setLightboxNaturalSize({ w: el.naturalWidth, h: el.naturalHeight });
  };

  const visiblePosters = allPosters.filter(isVisible);
  const hasNextZoomLevel = LIGHTBOX_ZOOM_LEVELS.some(
    (level) => level > lightboxZoom + 0.01,
  );

  return (
    <section
      id="posters"
      className="pt-nav py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--muted)" }}
    >
      {/* Lightbox */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-[100] flex cursor-default flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-4 overscroll-none"
          onClick={handleLightboxBackdropClick}
          role="presentation"
        >
          {/* X close button — always visible */}
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 z-[110] flex items-center justify-center w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Reset zoom button — only when zoomed */}
          {lightboxZoom > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetLightboxView();
              }}
              className="absolute top-4 right-16 z-[110] rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition-colors hover:bg-black/80 hover:text-white"
            >
              Reset zoom
            </button>
          )}

          {/* Hint text */}
          <p className="pointer-events-none absolute bottom-4 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-xs text-white/70 backdrop-blur-sm whitespace-nowrap">
            {lightboxZoom > 1
              ? "Drag to pan · Scroll or click to adjust · Esc to reset"
              : "Click image to zoom · Scroll to zoom · Esc to close"}
          </p>

          {/* Image wrapper */}
          <div className="relative flex min-h-0 w-full max-w-[95vw] flex-col items-center justify-center">
            <div
              className="flex max-h-[calc(100vh-2rem)] w-full items-center justify-center overflow-hidden"
              onClick={handleLightboxImageClick}
              onPointerDown={handleLightboxPointerDown}
              onPointerMove={handleLightboxPointerMove}
              onPointerUp={finishLightboxPointer}
              onPointerCancel={finishLightboxPointer}
              style={{
                cursor: "default",
                touchAction: lightboxZoom > 1 ? "none" : "auto",
              }}
            >
              <div
                data-lightbox-poster
                style={{
                  transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                  transformOrigin: "center center",
                  transition: isLightboxDragging
                    ? "none"
                    : "transform 0.2s ease-out",
                  cursor: isLightboxDragging
                    ? "grabbing"
                    : lightboxZoom > 1
                      ? "grab"
                      : hasNextZoomLevel
                        ? "zoom-in"
                        : "zoom-out",
                }}
              >
                <ImageWithFallback
                  src={selectedPoster.image}
                  alt={selectedPoster.title}
                  onLoad={handleLightboxImageLoad}
                  draggable={false}
                  className="mx-auto max-w-full object-contain rounded shadow-2xl max-h-[calc(100vh-2rem)] select-none"
                  style={{
                    borderColor: "transparent",
                    cursor: "inherit",
                    ...lightboxImageStyle,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-16 h-px"
              style={{ backgroundColor: "var(--color-accent-gold)" }}
            />
            <div
              className="mx-4 text-sm tracking-[0.3em] uppercase"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Notices
            </div>
            <div
              className="w-16 h-px"
              style={{ backgroundColor: "var(--color-accent-gold)" }}
            />
          </div>
          <h2
            className="type-section-title text-4xl mb-4"
            style={{ color: "var(--heading-foreground)" }}
          >
            Temple Notice Board
          </h2>
          <p
            className="type-body max-w-2xl mx-auto"
            style={{ color: "var(--foreground)" }}
          >
            Upcoming events and special announcements
          </p>
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex gap-5"
          columnClassName="flex flex-col gap-5"
        >
          {visiblePosters.map((poster, index) => (
            <PosterCard
              key={poster.id}
              poster={poster}
              onClick={setSelectedPoster}
              loading={index < 3 ? "eager" : "lazy"}
            />
          ))}
        </Masonry>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Poster card
// ---------------------------------------------------------------------------
function PosterCard({
  poster,
  onClick,
  loading,
}: {
  poster: (typeof allPosters)[0];
  onClick: (poster: (typeof allPosters)[0]) => void;
  loading?: "eager" | "lazy";
}) {
  return (
    <div
      className="poster-card cursor-pointer overflow-hidden rounded-sm"
      onClick={() => onClick(poster)}
    >
      <ImageWithFallback
        src={poster.image}
        alt={poster.title}
        className="w-full h-auto block"
        loading={loading ?? "lazy"}
      />
    </div>
  );
}
