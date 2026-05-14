import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal<T extends HTMLElement>(
  options: UseRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const targets = entry.target.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
          );

          if (targets.length === 0) {
            entry.target.classList.add("visible");
          } else {
            targets.forEach((t) => t.classList.add("visible"));
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}