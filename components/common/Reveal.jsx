"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight scroll-in fade/slide wrapper — plain IntersectionObserver +
// Tailwind transition classes instead of adding Framer Motion, to keep the
// bundle small (this is a marketing site where load speed affects Ads
// Quality Score). Respects prefers-reduced-motion via the motion-safe variant.
export default function Reveal({ children, className = "", delayMs = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}
