// Shared Framer Motion animation variants.
// Import from here — do not redefine per-file.

export const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const gridItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
