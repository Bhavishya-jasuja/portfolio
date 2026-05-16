"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxLayer() {
  const { scrollYProgress } = useScroll();

  // Different vertical speeds — some rush down, some drift up (depth illusion)
  const y1 = useTransform(scrollYProgress, [0, 1], ["0px", "560px"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0px", "1100px"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0px", "-420px"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0px", "1880px"]);
  const y5 = useTransform(scrollYProgress, [0, 1], ["0px", "760px"]);
  const y6 = useTransform(scrollYProgress, [0, 1], ["0px", "-290px"]);
  const y7 = useTransform(scrollYProgress, [0, 1], ["0px", "340px"]);
  const y8 = useTransform(scrollYProgress, [0, 1], ["0px", "1400px"]);
  const y9 = useTransform(scrollYProgress, [0, 1], ["0px", "-180px"]);

  // Rotation driven by scroll
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 115]);
  const r2 = useTransform(scrollYProgress, [0, 1], [0, -82]);
  const r3 = useTransform(scrollYProgress, [0, 1], [45, 230]);
  const r4 = useTransform(scrollYProgress, [0, 1], [0, 270]);

  // Scale shifts for cinematic zoom feeling
  const s1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.38, 0.72]);
  const s2 = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  // Opacity fades for fast elements
  const op1 = useTransform(scrollYProgress, [0, 0.35, 1], [0.11, 0.06, 0]);
  const op2 = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.09, 0.04]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* ── RINGS ── */}

      {/* Giant ring — slow drift down + clockwise spin */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700,
          top: "-18%", left: "-14%",
          border: "1px solid rgba(99,102,241,0.09)",
          y: y1, rotate: r1,
        }}
      />
      {/* Second giant ring — offset, thin */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 640, height: 640,
          top: "-14%", left: "-10%",
          border: "1px solid rgba(99,102,241,0.04)",
          y: y7, rotate: r2,
        }}
      />

      {/* Medium ring — fast down + counter-rotate */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 420, height: 420,
          top: "28%", right: "-12%",
          border: "1px solid rgba(124,58,237,0.11)",
          y: y2, rotate: r2,
        }}
      />

      {/* Small ring — moves UP (mind-bending counterscroll) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 230, height: 230,
          bottom: "12%", left: "18%",
          border: "1px solid rgba(59,130,246,0.09)",
          y: y3, rotate: r4,
        }}
      />

      {/* Tiny ring — very fast down */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 114, height: 114,
          top: "50%", right: "27%",
          border: "1px solid rgba(255,255,255,0.05)",
          y: y8, rotate: r1,
        }}
      />

      {/* Extra ring — medium far-right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280, height: 280,
          top: "70%", right: "-6%",
          border: "1px solid rgba(139,92,246,0.07)",
          y: y5, rotate: r2,
        }}
      />

      {/* ── GEOMETRIC SHAPES ── */}

      {/* Diamond — screaming fast + fade out */}
      <motion.div
        className="absolute"
        style={{
          width: 68, height: 68,
          top: "7%", left: "57%",
          border: "1px solid rgba(59,130,246,0.22)",
          y: y4, rotate: r3,
          opacity: op1,
        }}
      />

      {/* Diamond 2 — fast upward */}
      <motion.div
        className="absolute"
        style={{
          width: 44, height: 44,
          top: "68%", right: "21%",
          border: "1px solid rgba(139,92,246,0.17)",
          y: y6, rotate: r3,
        }}
      />

      {/* Diamond 3 — medium */}
      <motion.div
        className="absolute"
        style={{
          width: 28, height: 28,
          top: "85%", left: "38%",
          border: "1px solid rgba(99,102,241,0.13)",
          y: y9, rotate: r3,
        }}
      />

      {/* Cross — counter-scrolls upward */}
      <motion.div
        className="absolute"
        style={{ top: "42%", left: "5%", y: y3, rotate: r2 }}
      >
        <div className="relative w-10 h-10">
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            style={{ height: 1, background: "rgba(59,130,246,0.18)" }}
          />
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{ width: 1, background: "rgba(59,130,246,0.18)" }}
          />
        </div>
      </motion.div>

      {/* Cross 2 — fast down */}
      <motion.div
        className="absolute"
        style={{ top: "22%", right: "8%", y: y5, rotate: r1 }}
      >
        <div className="relative w-7 h-7">
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            style={{ height: 1, background: "rgba(124,58,237,0.16)" }}
          />
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{ width: 1, background: "rgba(124,58,237,0.16)" }}
          />
        </div>
      </motion.div>

      {/* ── DOT GRIDS ── */}

      {/* Dot grid 1 — medium fast */}
      <motion.div
        className="absolute"
        style={{ top: "15%", left: "70%", y: y5 }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 5, height: 5,
              background: "rgba(96,165,250,0.18)",
              left: (i % 4) * 26,
              top: Math.floor(i / 4) * 26,
            }}
          />
        ))}
      </motion.div>

      {/* Dot grid 2 — fast up */}
      <motion.div
        className="absolute"
        style={{ bottom: "30%", left: "44%", y: y6 }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4, height: 4,
              background: "rgba(167,139,250,0.14)",
              left: (i % 3) * 22,
              top: Math.floor(i / 3) * 22,
            }}
          />
        ))}
      </motion.div>

      {/* Dot grid 3 — very fast down, top area */}
      <motion.div
        className="absolute"
        style={{ top: "2%", left: "32%", y: y4, opacity: op1 }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3, height: 3,
              background: "rgba(99,102,241,0.25)",
              left: (i % 3) * 18,
              top: Math.floor(i / 3) * 18,
            }}
          />
        ))}
      </motion.div>

      {/* ── GLOW ORBS ── */}

      {/* Blue orb — slowest, grows */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 640, height: 320,
          top: "3%", left: "-10%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 68%)",
          y: y7, scale: s1,
        }}
      />

      {/* Violet orb — medium, fades in */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500, height: 260,
          top: "55%", right: "-7%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 68%)",
          y: y2, scale: s2,
          opacity: op2,
        }}
      />

      {/* Small accent orb — fast down */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200, height: 120,
          top: "36%", left: "55%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)",
          y: y8,
        }}
      />

      {/* ── HORIZONTAL LIGHT STREAKS ── */}
      <motion.div
        className="absolute"
        style={{
          top: "31%", left: "8%", right: "42%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.08), transparent)",
          y: y5,
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top: "63%", left: "52%", right: "4%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.07), transparent)",
          y: y3,
        }}
      />
      <motion.div
        className="absolute"
        style={{
          top: "78%", left: "15%", right: "55%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.06), transparent)",
          y: y9,
        }}
      />
    </div>
  );
}
