import { useEffect, useRef, RefObject } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal<T extends HTMLElement>(
  options: UseRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);
  const { threshold = 0.12, rootMargin = "0px 0px -60px 0px" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // add visible to all reveal children
            const targets = entry.target.querySelectorAll(
              ".reveal, .reveal-left, .reveal-right"
            );
            if (targets.length === 0) {
              entry.target.classList.add("visible");
            } else {
              targets.forEach((t) => t.classList.add("visible"));
            }
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

// Counter animation hook
export function useCountUp(
  target: number,
  duration: number = 2000,
  isVisible: boolean = false
): number {
  const [count, setCount] = useRefState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

function useRefState(initial: number): [number, (v: number) => void] {
  const [state, setState] = useStateRef(initial);
  return [state, setState];
}

function useStateRef(initial: number) {
  const { useState } = require("react");
  return useState(initial);
}