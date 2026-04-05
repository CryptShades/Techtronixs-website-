import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  duration?: number;   // ms
  easingFn?: (t: number) => number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp(target: number, options: UseCountUpOptions = {}) {
  const { duration = 1800, easingFn = easeOutCubic } = options;
  const [count, setCount]         = useState(0);
  const [hasStarted, setStarted]  = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Trigger when the element scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run the counter once started
  useEffect(() => {
    if (!hasStarted) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easingFn(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [hasStarted, target, duration, easingFn]);

  return { count, ref };
}
