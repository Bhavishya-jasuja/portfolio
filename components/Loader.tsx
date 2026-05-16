"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 1800;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out progress curve — fast start, slows near 100
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(Math.min(100, eased * 100)));

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 180);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col bg-[#080808] overflow-hidden"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {/* Corner brackets */}
          <div className="absolute top-7 left-7 w-6 h-6 border-l border-t border-white/[0.15]" />
          <div className="absolute top-7 right-7 w-6 h-6 border-r border-t border-white/[0.15]" />
          <div className="absolute bottom-7 left-7 w-6 h-6 border-l border-b border-white/[0.15]" />
          <div className="absolute bottom-7 right-7 w-6 h-6 border-r border-b border-white/[0.15]" />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/[0.07] rounded-full blur-[120px]" />
          </div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Brand name — letters reveal */}
            <div className="mb-12 overflow-hidden">
              <motion.p
                className="text-white/90 text-xs tracking-[0.5em] uppercase font-light"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                {SITE_CONFIG.name}
              </motion.p>
            </div>

            {/* Large counter */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            >
              <span className="text-[5.5rem] sm:text-[7rem] font-bold text-white/[0.06] leading-none tabular-nums select-none">
                {String(progress).padStart(3, "0")}
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-[280px] sm:w-[360px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            >
              {/* Track */}
              <div className="w-full h-px bg-white/[0.08] relative overflow-hidden rounded-full mb-4">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0 }}
                />
              </div>
              {/* Percentage label */}
              <div className="flex justify-between items-center">
                <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase">Loading</span>
                <span className="text-white/30 text-[11px] tabular-nums">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            className="pb-10 text-center overflow-hidden"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase">
              Premium Digital Solutions
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
