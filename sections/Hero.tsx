"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SITE_CONFIG, STATS } from "@/constants";
import { scrollTo } from "@/hooks/useSmoothScroll";
import { heroMouse } from "@/components/Hero3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dynamic import — Three.js is SSR-incompatible
const Hero3DCanvas = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => null,
});

const SERVICES_PREVIEW = ["Business Websites", "AI Applications", "E-Commerce Stores", "Custom Tools"];
const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_LINES = [
  { content: "Premium Digital", delay: 0.18 },
  { content: "Solutions", delay: 0.30, shimmer: true, suffix: " for" },
  { content: "Growing Businesses.", delay: 0.42 },
];

// GSAP counter animation helpers
const STAT_META = [
  { target: 50,  suffix: "+",    label: "Projects delivered" },
  { target: 30,  suffix: "+",    label: "Happy clients" },
  { target: 5,   suffix: "★",   label: "Average rating" },
  { target: 24,  suffix: "hrs",  label: "Avg. response time" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  // 3D canvas opacity — fades as hero scrolls out
  const canvas3dOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const canvas3dY       = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  // Mouse tracking for 3D scene
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      heroMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      heroMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // GSAP stats counter on scroll entry
  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          STAT_META.forEach((meta, i) => {
            const el = statValueRefs.current[i];
            if (!el) return;
            const proxy = { value: 0 };
            gsap.to(proxy, {
              value: meta.target,
              duration: 2.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(proxy.value) + meta.suffix;
              },
            });
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Mouse-reactive orb parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 44,
        y: (e.clientY / window.innerHeight - 0.5) * 28,
      });
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* ── Cinematic animated gradient bg ────────────────────────── */}
      <div className="absolute inset-0 hero-cinematic-bg pointer-events-none" />

      {/* ── Background orbs (mouse-reactive) ─────────────────────── */}
      <motion.div
        className="absolute top-[-10%] left-[12%] w-[820px] h-[820px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 68%)" }}
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 38, damping: 18 }}
      />
      <motion.div
        className="absolute bottom-[-6%] right-[0%] w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 68%)" }}
        animate={{ x: -mouse.x * 0.6, y: -mouse.y * 0.6 }}
        transition={{ type: "spring", stiffness: 32, damping: 18 }}
      />
      <div
        className="absolute top-[58%] left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Fine grid overlay ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(ellipse 80% 75% at 50% 35%, black 5%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 35%, black 5%, transparent 100%)",
        }}
      />

      {/* ── Corner brackets ───────────────────────────────────────── */}
      <div className="absolute top-8 left-8  w-[52px] h-[52px] border-l-[1.5px] border-t-[1.5px] border-white/[0.08] pointer-events-none" />
      <div className="absolute top-8 right-8 w-[52px] h-[52px] border-r-[1.5px] border-t-[1.5px] border-white/[0.08] pointer-events-none" />
      <div className="absolute bottom-8 left-8  w-[52px] h-[52px] border-l-[1.5px] border-b-[1.5px] border-white/[0.08] pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-[52px] h-[52px] border-r-[1.5px] border-b-[1.5px] border-white/[0.08] pointer-events-none" />

      {/* ── 3D Canvas (desktop/tablet only, right half) ───────────── */}
      <motion.div
        className="absolute right-0 top-0 h-full pointer-events-none hidden md:block"
        style={{
          width: "54%",
          opacity: canvas3dOpacity,
          y: canvas3dY,
          zIndex: 5,
        }}
      >
        <Hero3DCanvas />
      </motion.div>

      {/* ── Main content (parallax) ───────────────────────────────── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-24"
        style={{ y, opacity, scale }}
      >
        {/* Availability badge */}
        <motion.div
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(14px) saturate(160%)",
            WebkitBackdropFilter: "blur(14px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs text-white/60 font-medium">Available for new projects</span>
        </motion.div>

        {/* ── Headline — each line slides up from overflow:hidden clip ── */}
        <div className="mb-9 space-y-[0.04em]">
          {HEADLINE_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className="text-[clamp(3rem,7.8vw,8rem)] font-bold leading-[1.02] tracking-[-0.025em]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: line.delay, ease: EASE }}
              >
                {line.shimmer ? (
                  <>
                    <span className="text-shimmer">{line.content}</span>
                    <span className="text-white">{line.suffix}</span>
                  </>
                ) : (
                  <span className="text-white">{line.content}</span>
                )}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* ── Service tags (stagger in) ─────────────────────────────── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-11"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.62 } },
          }}
        >
          {SERVICES_PREVIEW.map((s) => (
            <motion.span
              key={s}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/45 text-xs"
            >
              <CheckCircle size={11} className="text-blue-400 flex-shrink-0" />
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Subtext + CTAs + Stats ────────────────────────────────── */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-12"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.92, ease: EASE }}
        >
          <div className="max-w-lg">
            <p className="text-white/40 text-lg leading-relaxed mb-8">
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary CTA */}
              <button
                onClick={() => scrollTo("#contact")}
                className="skeuo-btn group relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold px-8 py-4 rounded-full overflow-hidden hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
              </button>

              <button
                onClick={() => scrollTo("#projects")}
                className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white border border-white/[0.1] hover:border-white/25 px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/[0.04]"
              >
                See My Work
              </button>
            </div>
          </div>

          {/* Stats grid — GSAP counter animates on scroll */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 flex-shrink-0"
          >
            {STAT_META.map((meta, i) => (
              <div
                key={meta.label}
                className="text-center lg:text-right px-4 py-3 rounded-xl"
                style={{
                  background: "linear-gradient(145deg, rgba(14,14,20,0.75) 0%, rgba(7,7,12,0.65) 100%)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow: "5px 5px 14px rgba(0,0,0,0.6), -1px -1px 4px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  ref={(el) => { statValueRefs.current[i] = el; }}
                  className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold text-white leading-none mb-1"
                >
                  0{meta.suffix}
                </p>
                <p className="text-white/28 text-xs">{meta.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Cinematic scroll indicator ────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="text-white/18 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="relative w-px h-14 overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-white/50 to-transparent"
            style={{ height: "55%" }}
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
