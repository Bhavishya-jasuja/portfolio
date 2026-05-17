"use client";

import { motion } from "framer-motion";

interface LogoMarkProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function NexarcMark({ size = 28, animated = false, className }: LogoMarkProps) {
  const Wrapper = animated ? motion.div : "div";
  const animProps = animated
    ? {
        whileHover: { scale: 1.1, rotate: 5 },
        transition: { type: "spring", stiffness: 400, damping: 14 },
      }
    : {};

  return (
    <Wrapper className={className} {...(animProps as object)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Nexarc logo"
      >
        <defs>
          <linearGradient id="na-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect width="40" height="40" rx="9" fill="url(#na-bg)" />

        {/*
          Mark: gateway arch (∩) on the left + diagonal + right vertical = stylised N
          — Left wall rises from the bottom, arcs over the top, right wall descends to mid-height
          — Diagonal flows from arch-right-bottom down to bottom-right corner
          — Right vertical runs full height on the far right
        */}

        {/* Gateway arch: left wall → semicircular top → right wall (ends at diagonal start) */}
        <path
          d="M 7 33 L 7 16 A 8 8 0 0 1 23 16 L 23 23"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Diagonal: arch-right-bottom → N bottom-right */}
        <line
          x1="23" y1="23"
          x2="33" y2="33"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Right vertical: full height */}
        <line
          x1="33" y1="8"
          x2="33" y2="33"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </Wrapper>
  );
}

export function NexarcLockup({
  size = 28,
  textSize = "text-base",
  animated = false,
}: {
  size?: number;
  textSize?: string;
  animated?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <NexarcMark size={size} animated={animated} />
      <span className={`text-white font-semibold tracking-tight ${textSize}`}>
        Nexarc
      </span>
    </div>
  );
}

export default NexarcMark;
