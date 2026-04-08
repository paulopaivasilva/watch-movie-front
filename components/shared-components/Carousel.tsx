"use client";

import { useEffect, useRef } from "react";

interface CarouselProps {
  children: React.ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scroll = (dir: "left" | "right", amount = 300, smooth = true) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const startHoldScroll = (dir: "left" | "right") => {
    if (!ref.current) return;

    stopHoldScroll();

    holdIntervalRef.current = setInterval(() => {
      const el = ref.current;
      if (!el) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const isAtStart = el.scrollLeft <= 0;
      const isAtEnd = el.scrollLeft >= maxScrollLeft - 1;

      if ((dir === "left" && isAtStart) || (dir === "right" && isAtEnd)) {
        stopHoldScroll();
        return;
      }

      scroll(dir, 120, false);
    }, 80);
  };

  const stopHoldScroll = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopHoldScroll();
  }, []);

  return (
    <div className="relative group w-full overflow-hidden">
      <button
        onClick={() => scroll("left")}
        onMouseDown={() => startHoldScroll("left")}
        onMouseUp={stopHoldScroll}
        onMouseLeave={stopHoldScroll}
        onTouchStart={() => startHoldScroll("left")}
        onTouchEnd={stopHoldScroll}
        className="opacity-0 group-hover:opacity-100 transition absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white px-3 py-2 rounded-full"
      >
        ←
      </button>

      <button
        onClick={() => scroll("right")}
        onMouseDown={() => startHoldScroll("right")}
        onMouseUp={stopHoldScroll}
        onMouseLeave={stopHoldScroll}
        onTouchStart={() => startHoldScroll("right")}
        onTouchEnd={stopHoldScroll}
        className="opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black text-white px-3 py-2 rounded-full"
      >
        →
      </button>

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}