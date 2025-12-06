"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "./utils";

interface CircularGalleryItem {
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  className?: string;
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

export function CircularGallery({
  items = [],
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  className,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef({ current: 0, target: 0, last: 0 });
  const isDownRef = useRef(false);
  const startRef = useRef(0);
  const positionRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const extraRef = useRef<number[]>([]); // Track extra offset for each item for wrapping
  const [itemWidth, setItemWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Calculate curved position for each item
  const calculatePosition = useCallback(
    (x: number, bendValue: number) => {
      if (bendValue === 0) {
        return { y: 0, rotation: 0 };
      }

      const H = viewportWidth / 2;
      const B_abs = Math.abs(bendValue);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);

      if (bendValue > 0) {
        return {
          y: -arc,
          rotation: -Math.sign(x) * Math.asin(effectiveX / R),
        };
      } else {
        return {
          y: arc,
          rotation: Math.sign(x) * Math.asin(effectiveX / R),
        };
      }
    },
    [viewportWidth]
  );

  // Update item positions
  const updateItems = useCallback(() => {
    if (!wrapperRef.current || itemRefs.current.length === 0 || itemWidth === 0)
      return;

    const scroll = scrollRef.current;
    const direction = scroll.current > scroll.last ? "right" : "left";
    const totalWidth = itemWidth * items.length;
    const viewportOffset = viewportWidth / 2;

    itemRefs.current.forEach((itemEl, index) => {
      if (!itemEl) return;

      // Initialize extra offset if needed
      if (extraRef.current[index] === undefined) {
        extraRef.current[index] = 0;
      }

      const baseX = itemWidth * index;
      const x = baseX - scroll.current + extraRef.current[index];
      const { y, rotation } = calculatePosition(x, bend);

      // Apply transform
      itemEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation}rad)`;

      // Check if item is out of viewport and wrap around
      const itemOffset = itemEl.offsetWidth / 2;

      if (direction === "right" && x + itemOffset < -viewportOffset) {
        // Move to end
        extraRef.current[index] += totalWidth;
      } else if (direction === "left" && x - itemOffset > viewportOffset) {
        // Move to beginning
        extraRef.current[index] -= totalWidth;
      }
    });

    scroll.last = scroll.current;
  }, [itemWidth, viewportWidth, bend, items.length, calculatePosition]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const scroll = scrollRef.current;
      scroll.current = lerp(scroll.current, scroll.target, scrollEase);
      updateItems();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollEase, updateItems]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      setViewportWidth(width);

      // Calculate item width based on viewport
      const calculatedWidth = Math.min(width * 0.7, 700);
      const newItemWidth = calculatedWidth + 2; // Add padding
      setItemWidth(newItemWidth);

      // Center items initially
      if (items.length > 0 && scrollRef.current.target === 0) {
        const totalWidth = newItemWidth * items.length;
        scrollRef.current.target = totalWidth / 2;
        scrollRef.current.current = totalWidth / 2;
      }
    };

    updateDimensions();
    const debouncedResize = debounce(updateDimensions, 200);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [items.length]);

  // Handle wheel scroll
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY || e.wheelDelta || e.detail;
      scrollRef.current.target +=
        (delta > 0 ? scrollSpeed : -scrollSpeed) * 0.2;

      // Snap to items
      const onCheck = debounce(() => {
        if (itemWidth === 0) return;
        const width = itemWidth;
        const itemIndex = Math.round(
          Math.abs(scrollRef.current.target) / width
        );
        const item = width * itemIndex;
        scrollRef.current.target = scrollRef.current.target < 0 ? -item : item;
      }, 200);
      onCheck();
    },
    [scrollSpeed, itemWidth]
  );

  // Handle drag
  const handleTouchDown = useCallback((e: MouseEvent | TouchEvent) => {
    isDownRef.current = true;
    positionRef.current = scrollRef.current.current;
    startRef.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  }, []);

  const handleTouchMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDownRef.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const distance = (startRef.current - x) * (scrollSpeed * 0.025);
      scrollRef.current.target = positionRef.current + distance;
    },
    [scrollSpeed]
  );

  const handleTouchUp = useCallback(() => {
    if (!isDownRef.current) return;
    isDownRef.current = false;

    // Snap to items
    if (itemWidth === 0) return;
    const width = itemWidth;
    const itemIndex = Math.round(Math.abs(scrollRef.current.target) / width);
    const item = width * itemIndex;
    scrollRef.current.target = scrollRef.current.target < 0 ? -item : item;
  }, [itemWidth]);

  // Add event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousedown", handleTouchDown);
    window.addEventListener("mousemove", handleTouchMove);
    window.addEventListener("mouseup", handleTouchUp);
    window.addEventListener("touchstart", handleTouchDown);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchUp);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleTouchDown);
      window.removeEventListener("mousemove", handleTouchMove);
      window.removeEventListener("mouseup", handleTouchUp);
      window.removeEventListener("touchstart", handleTouchDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchUp);
    };
  }, [handleWheel, handleTouchDown, handleTouchMove, handleTouchUp]);

  if (items.length === 0) {
    return null;
  }

  // Duplicate items for infinite scroll
  const duplicatedItems = [...items, ...items];

  // Initialize extra offsets when items change
  useEffect(() => {
    extraRef.current = new Array(duplicatedItems.length).fill(0);
  }, [duplicatedItems.length]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[600px] overflow-hidden cursor-grab",
        className
      )}
      style={{
        cursor: isDownRef.current ? "grabbing" : "grab",
      }}
    >
      <div
        ref={wrapperRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          willChange: "transform",
        }}
      >
        {duplicatedItems.map((item, index) => {
          // Initialize extra offset
          if (extraRef.current[index] === undefined) {
            extraRef.current[index] = 0;
          }

          const baseX = itemWidth * index;
          const extra = extraRef.current[index] || 0;
          const x =
            itemWidth > 0 ? baseX - scrollRef.current.current + extra : 0;
          const { y, rotation } =
            viewportWidth > 0
              ? calculatePosition(x, bend)
              : { y: 0, rotation: 0 };

          return (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="absolute"
              style={{
                width: `${Math.min(viewportWidth * 0.7 || 700, 700)}px`,
                height: `${
                  (Math.min(viewportWidth * 0.7 || 700, 700) * 900) / 700
                }px`,
                transform: `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation}rad)`,
                transformOrigin: "center center",
                willChange: "transform",
              }}
            >
              <div className="relative w-full h-full group">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{
                    borderRadius: `${borderRadius * 100}px`,
                    filter: "brightness(0.85) contrast(1.1)",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
                  style={{
                    borderBottomLeftRadius: `${borderRadius * 100}px`,
                    borderBottomRightRadius: `${borderRadius * 100}px`,
                  }}
                >
                  <p
                    className="text-sm font-medium text-center"
                    style={{ color: textColor }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
