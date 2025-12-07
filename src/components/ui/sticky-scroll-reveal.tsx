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
  const imageSlideRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(content.length).fill(null)
  );

  // Check if desktop layout
  const isDesktop = () =>
    typeof window !== "undefined" && window.innerWidth >= 768;

  // Animate to specific image based on section index
  const animateToImage = useCallback(
    (index: number) => {
      if (!imageTrackRef.current) return;

      const track = imageTrackRef.current;
      const percentPerImage = 100 / content.length;
      const previousIndex = currentImageIndexRef.current;

      // Fade out previous image
      if (previousIndex !== index && imageSlideRefs.current[previousIndex]) {
        gsap.to(imageSlideRefs.current[previousIndex], {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // Fade in new image
      if (imageSlideRefs.current[index]) {
        // Set initial opacity to 0 if it's a new image
        if (previousIndex !== index) {
          gsap.set(imageSlideRefs.current[index], { opacity: 0 });
        }
        gsap.to(imageSlideRefs.current[index], {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Animate track position
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
    if (!textSectionsRef.current || !imageTrackRef.current) return;

    // Clear existing triggers
    triggersRef.current.forEach((trigger) => trigger.kill());
    triggersRef.current = [];

    const sections = textSectionsRef.current.querySelectorAll(".text-section");

    sections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section as HTMLElement,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => animateToImage(index),
        onEnterBack: () => animateToImage(index),
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
        // Reset opacity states
        imageSlideRefs.current.forEach((slide, index) => {
          if (slide) {
            gsap.set(slide, {
              opacity: index === currentImageIndexRef.current ? 1 : 0,
            });
          }
        });
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
    >
      {/* Sticky image container - top on mobile, right side on desktop */}
      <div
        className={cn(
          "image-container sticky top-20 lg:top-0 w-full lg:w-1/2 h-[40vh] lg:h-screen overflow-hidden bg-[#111] z-10 order-1 lg:order-2",
          contentClassName
        )}
      >
        <div
          ref={imageTrackRef}
          className="image-track flex flex-row lg:flex-col w-[300%] lg:w-full h-full lg:h-[300%]"
        >
          {content.map((item, index) => (
            <div
              key={`image-${index}`}
              ref={(el) => {
                imageSlideRefs.current[index] = el;
              }}
              className="image-slide w-1/3 lg:w-full h-full lg:h-1/3 flex-shrink-0 flex items-center justify-center"
              style={{ opacity: index === 0 ? 1 : 0 }}
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
        className="text-sections relative z-5 w-full lg:w-1/2 order-2 lg:order-1"
      >
        {content.map((item, index) => (
          <div
            key={`text-${index}`}
            className="text-section min-h-[55vh] lg:min-h-screen py-8 px-6 lg:py-16 lg:px-12 flex flex-col justify-center border-b border-[#222] bg-black"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
              {item.title}
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-[#aaa] mb-4">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
