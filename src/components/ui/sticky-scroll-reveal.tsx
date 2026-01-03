"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "./utils";

export interface StickyScrollContent {
  title: string;
  description: string;
  content?: React.ReactNode | any;
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyScrollContent[];
  contentClassName?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [stickyState, setStickyState] = useState<"before" | "sticky" | "after">("before");

  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textPanelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const checkMobile = useCallback(() => {
    return typeof window !== "undefined" && window.innerWidth <= 768;
  }, []);

  // Handle scroll to determine sticky state and active panel
  useEffect(() => {
    const mobile = checkMobile();
    setIsMobile(mobile);

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    const handleScroll = () => {
      if (!sectionRef.current || !imageContainerRef.current) return;

      const section = sectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const navHeight = 80;
      const viewportHeight = window.innerHeight;
      const imageHeight = mobile ? viewportHeight * 0.45 : viewportHeight;

      // Calculate sticky state based on section position
      if (sectionRect.top > navHeight) {
        // Section hasn't reached top yet
        setStickyState("before");
      } else if (sectionRect.bottom < imageHeight + navHeight) {
        // Section has scrolled past
        setStickyState("after");
      } else {
        // Section is in sticky range
        setStickyState("sticky");
      }

      // Calculate active panel based on text panel positions
      const triggerPoint = mobile ? navHeight + viewportHeight * 0.45 : viewportHeight / 2;

      let newActiveIndex = 0;
      textPanelsRef.current.forEach((panel, index) => {
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          newActiveIndex = index;
        }
      });

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, checkMobile]);

  // Update image wrapper transform when activeIndex changes
  useEffect(() => {
    if (!imageWrapperRef.current) return;

    if (isMobile) {
      const translateX = -activeIndex * (100 / content.length);
      imageWrapperRef.current.style.transform = `translateX(${translateX}%)`;
    } else {
      const translateY = -activeIndex * 100;
      imageWrapperRef.current.style.transform = `translateY(${translateY}vh)`;
    }
  }, [activeIndex, isMobile, content.length]);

  // Calculate image container style based on sticky state
  const getImageContainerStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      overflow: "hidden",
      backgroundColor: "#1c1917", // Match navbar background (stone-900)
      zIndex: 10,
    };

    if (isMobile) {
      return {
        ...baseStyle,
        position: stickyState === "sticky" ? "fixed" : "absolute",
        top: stickyState === "sticky" ? "80px" : stickyState === "before" ? "0" : "auto",
        bottom: stickyState === "after" ? "0" : "auto",
        left: 0,
        right: 0,
        height: "45vh",
        width: "100%",
      };
    } else {
      return {
        ...baseStyle,
        position: stickyState === "sticky" ? "fixed" : "absolute",
        top: stickyState === "sticky" ? "0" : stickyState === "before" ? "0" : "auto",
        bottom: stickyState === "after" ? "0" : "auto",
        right: 0,
        height: "100vh",
        width: "50%",
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="sticky-section relative"
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Text Panels Container */}
      <div
        className="sticky-section__text-container relative z-[2]"
        style={{
          width: isMobile ? "100%" : "50%",
          order: isMobile ? 2 : 1,
          paddingTop: isMobile ? "45vh" : 0,
        }}
      >
        {content.map((item, index) => (
          <div
            key={`text-${index}`}
            ref={(el) => {
              textPanelsRef.current[index] = el;
            }}
            data-index={index}
            className={cn(
              "sticky-section__text-panel relative flex flex-col justify-center",
              "min-h-[50vh] md:min-h-screen py-10 px-6 md:py-16 md:px-12 lg:px-16 pt-12",
              index === content.length - 1 && "pb-24 md:pb-16"
            )}
          >
            {/* Active indicator bar (desktop only) */}
            <div
              className={cn(
                "absolute left-8 top-1/2 -translate-y-1/2 w-[3px] bg-[#e8c547] transition-all duration-500 ease-out",
                "hidden md:block",
                activeIndex === index ? "h-20 opacity-100" : "h-0 opacity-0"
              )}
            />

            {/* Section number */}
            <span
              className={cn(
                "font-serif text-sm tracking-widest text-[#e8c547] mb-4",
                "transition-opacity duration-400 ease-out",
                activeIndex === index ? "opacity-100" : "opacity-60"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Title */}
            <h2
              className={cn(
                "font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white mb-6",
                "transition-all duration-500 ease-out",
                activeIndex === index ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-5"
              )}
            >
              {item.title}
            </h2>

            {/* Description */}
            <p
              className={cn(
                "text-base md:text-lg font-light leading-relaxed text-[#888]",
                "transition-all duration-500 ease-out delay-100",
                activeIndex === index ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-5"
              )}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Image Container - uses JS-controlled positioning */}
      <div
        ref={imageContainerRef}
        className={cn("sticky-section__image-container", contentClassName)}
        style={getImageContainerStyle()}
      >
        <div
          ref={imageWrapperRef}
          className="sticky-section__image-wrapper absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            width: isMobile ? `${100 * content.length}%` : "100%",
          }}
        >
          {content.map((item, index) => (
            <div
              key={`image-${index}`}
              data-index={index}
              className="sticky-section__image relative overflow-hidden flex-shrink-0"
              style={{
                width: isMobile ? `${100 / content.length}%` : "100%",
                height: isMobile ? "100%" : "100vh",
              }}
            >
              {/* Image content with zoom effect */}
              <div
                className={cn(
                  "w-full h-full transition-transform duration-1000 ease-out",
                  activeIndex === index ? "scale-100" : "scale-110"
                )}
              >
                {item.content ?? null}
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(10,10,10,0.3)] via-transparent to-transparent pointer-events-none" />

              {/* Large number overlay */}
              <span className="absolute bottom-6 right-6 md:bottom-12 md:right-12 font-serif text-6xl md:text-8xl font-bold text-white/[0.08] leading-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile Progress Dots */}
        {isMobile && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {content.map((_, index) => (
              <div
                key={`dot-${index}`}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-[#e8c547] scale-125" : "bg-white/30"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
