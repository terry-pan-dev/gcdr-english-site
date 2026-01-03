"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "./utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const scrollRevealRef = useRef<HTMLDivElement>(null);
  const imageTrackRef = useRef<HTMLDivElement>(null);
  const textSectionsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const currentImageIndexRef = useRef<number>(0);
  const imageSlideRefs = useRef<(HTMLDivElement | null)[]>(new Array(content.length).fill(null));

  // Check if desktop layout
  const isDesktop = () => typeof window !== "undefined" && window.innerWidth >= 768;

  // Check if mobile (not tablet) - typically < 640px for mobile, 640-768px is tablet
  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 640;

  // Animate to specific image based on section index
  const animateToImage = useCallback(
    (index: number) => {
      if (!imageTrackRef.current) return;

      const track = imageTrackRef.current;
      const percentPerImage = 100 / content.length;

      // Animate track position (like the reference implementation)
      if (isDesktop()) {
        // Desktop: vertical movement (yPercent)
        gsap.to(track, {
          yPercent: -percentPerImage * index,
          xPercent: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Mobile: horizontal movement (xPercent)
        gsap.to(track, {
          xPercent: -percentPerImage * index,
          yPercent: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      currentImageIndexRef.current = index;
    },
    [content.length]
  );

  // Setup scroll triggers for each section
  const setupScrollTriggers = useCallback(() => {
    if (!textSectionsRef.current || !imageTrackRef.current || !scrollRevealRef.current) return;

    // Clear existing triggers
    triggersRef.current.forEach((trigger) => trigger.kill());
    triggersRef.current = [];

    // Pin the image container using GSAP ScrollTrigger (more reliable than CSS sticky)
    const imageContainer = scrollRevealRef.current.querySelector(".image-container") as HTMLElement;
    if (imageContainer) {
      // On mobile, account for navigation bar height (80px = h-20)
      const navBarHeight = isMobile() ? 80 : 0;
      const startPosition = navBarHeight > 0 ? `top ${navBarHeight}px` : "top top";

      // End pinning when the text sections container's bottom reaches the bottom of the viewport
      // This allows the image to scroll away with the text after all sections have passed
      // Use endTrigger with text sections container for reliable calculation
      const pinTrigger = ScrollTrigger.create({
        trigger: scrollRevealRef.current,
        start: startPosition,
        endTrigger: textSectionsRef.current,
        end: "bottom bottom",
        pin: imageContainer,
        pinSpacing: false, // Don't add spacing since we're handling layout manually
        markers: false,
        invalidateOnRefresh: true, // Recalculate on refresh
      });
      triggersRef.current.push(pinTrigger);
    }

    const sections = textSectionsRef.current.querySelectorAll(".text-section");

    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section as HTMLElement,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          animateToImage(index);
        },
        onEnterBack: () => {
          animateToImage(index);
        },
        markers: false, // Set to true for debugging
      });
      triggersRef.current.push(trigger);
    });
  }, [animateToImage]);

  useGSAP(
    () => {
      setupScrollTriggers();
      ScrollTrigger.refresh();

      // Cleanup on unmount
      return () => {
        triggersRef.current.forEach((trigger) => trigger.kill());
        triggersRef.current = [];
      };
    },
    { scope: scrollRevealRef, dependencies: [content.length] }
  );

  // Handle resize
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (imageTrackRef.current) {
          // Reset position
          gsap.set(imageTrackRef.current, { xPercent: 0, yPercent: 0 });
        }
        setupScrollTriggers();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [setupScrollTriggers]);

  return (
    <div
      ref={scrollRevealRef}
      className="scroll-reveal relative flex flex-col lg:flex-row"
      style={{
        position: "relative",
        overflow: "visible",
        minHeight: "100vh", // Ensure container has enough height for sticky
      }}
    >
      {/* Sticky image container - top on mobile, right side on desktop */}
      <div
        className={cn(
          "image-container w-full lg:w-1/2 h-[40vh] lg:h-screen overflow-hidden bg-[#111] z-10 order-1 lg:order-2",
          contentClassName
        )}
        style={{
          // Remove CSS sticky - using GSAP pin instead
          alignSelf: "flex-start", // Important for flex containers
        }}
      >
        <div
          ref={imageTrackRef}
          className="image-track flex flex-row lg:flex-col h-full lg:h-auto"
          style={
            {
              "--item-count": content.length,
              "--track-size": `${content.length * 100}%`,
              "--item-size": `${100 / content.length}%`,
              width: "var(--track-size)",
            } as React.CSSProperties
          }
        >
          <style>{`
            @media (min-width: 1024px) {
              .image-track {
                width: 100% !important;
                height: var(--track-size) !important;
              }
              .image-slide {
                width: 100% !important;
                height: var(--item-size) !important;
              }
            }
          `}</style>
          {content.map((item, index) => (
            <div
              key={`image-${index}`}
              ref={(el) => {
                imageSlideRefs.current[index] = el;
              }}
              className="image-slide h-full flex-shrink-0 flex items-center justify-center"
              style={{
                width: `${100 / content.length}%`,
              }}
            >
              <div className="h-full w-full flex items-center justify-center bg-black">
                {item.content ?? null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable text sections - below image on mobile, left side on desktop */}
      <div
        ref={textSectionsRef}
        className="text-sections relative z-[5] w-full lg:w-1/2 order-2 lg:order-1"
      >
        {content.map((item, index) => (
          <div
            key={`text-${index}`}
            className="text-section min-h-[55vh] lg:min-h-screen py-8 px-6 lg:py-16 lg:px-12 flex flex-col justify-center border-b border-[#222] bg-black"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">{item.title}</h2>
            <p className="text-base lg:text-lg leading-relaxed text-[#aaa] mb-4">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
