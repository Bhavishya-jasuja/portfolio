"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  staggerDelay?: number;
}

/**
 * Splits text into words. Each word slides up from an overflow:hidden clip.
 * Use for section headings and large display text.
 */
export function AnimatedWords({
  text,
  className,
  delay = 0,
  once = true,
  staggerDelay = 0.06,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.1]">
          <motion.span
            className="inline-block"
            aria-hidden
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.78,
              delay: delay + i * staggerDelay,
              ease: EASE,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Splits text into individual characters. Each char slides up with tight stagger.
 * Use for short labels, eyebrow text, or numbers.
 */
export function AnimatedChars({
  text,
  className,
  delay = 0,
  once = true,
  staggerDelay = 0.028,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            aria-hidden
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + i * staggerDelay,
              ease: EASE,
            }}
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
