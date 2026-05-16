import { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Existing variants ──────────────────────────────────────────
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.8, ease } },
};

export const blurInVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease } },
};

export const loaderVariants: Variants = {
  initial: { scaleX: 0, transformOrigin: "left" },
  animate: { scaleX: 1, transition: { duration: 1.2, ease } },
  exit: {
    scaleX: 0,
    transformOrigin: "right",
    transition: { duration: 0.6, ease, delay: 0.2 },
  },
};

// ─── New premium motion variants ────────────────────────────────

/** Clip-path reveal left → right */
export const clipRevealVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease } },
};

/** Slide up from overflow clip — use inside an overflow:hidden wrapper */
export const wordRevealVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.75, ease } },
};

/** Spring pop in for badges, tags, icons */
export const springPopVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 24 },
  },
};

/** Quick slide up for small elements */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

/** Faster stagger for tags / pills */
export const fastStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/** Stagger container with longer delay */
export const delayedStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

/** Blur + fade for cinematic entrances */
export const cinematicReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)", scale: 0.96 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 1, ease },
  },
};
