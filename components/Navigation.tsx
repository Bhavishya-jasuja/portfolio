"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG } from "@/constants";
import { scrollTo } from "@/hooks/useSmoothScroll";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((i) => i.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(href), 80);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 inset-x-0 z-[100] transition-colors duration-500",
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-violet-500 to-blue-400 origin-left"
          style={{ scaleX }}
        />

        <nav className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
            <motion.span
              className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              A
            </motion.span>
            <span className="text-white font-semibold tracking-tight text-base group-hover:opacity-75 transition-opacity">
              {SITE_CONFIG.name}
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="relative px-4 py-2 text-sm transition-colors duration-200 group"
                  >
                    <span className={cn(
                      "relative z-10 transition-colors duration-200",
                      isActive ? "text-white" : "text-white/45 group-hover:text-white"
                    )}>
                      {item.label}
                    </span>
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-white/35 hover:text-white/70 text-sm transition-colors duration-200"
            >
              {SITE_CONFIG.email}
            </a>
            <motion.button
              onClick={() => scrollTo("#contact")}
              className="group flex items-center gap-1.5 text-sm bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Start a Project
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-white rounded-full"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col bg-[#080808]"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/[0.06] rounded-full blur-[100px] pointer-events-none" />

            <div className="flex-1 flex flex-col items-center justify-center gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: EASE }}
                >
                  <button
                    onClick={() => handleNav(item.href)}
                    className="group flex items-center gap-3 text-3xl font-semibold text-white/50 hover:text-white transition-colors duration-200 py-2.5 px-6"
                  >
                    <span className="text-white/15 text-sm font-mono">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="px-6 pb-12 flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, ease: EASE }}
            >
              <button
                onClick={() => handleNav("#contact")}
                className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold py-4 rounded-full text-center hover:opacity-90 transition-opacity"
              >
                Start a Project
              </button>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-white/25 text-sm">
                {SITE_CONFIG.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
