"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { processSteps } from "@/data/skills";
import { staggerContainer, staggerItem, fadeUpVariants } from "@/animations/variants";
import { ArrowRight } from "lucide-react";
import { scrollTo } from "@/hooks/useSmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  // GSAP scroll-scrub: connector line draws progressively with scroll
  useEffect(() => {
    if (!stepsRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 65%",
            end: "bottom 60%",
            scrub: 1.8,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-24 md:py-36 px-6 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={staggerItem} className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
            How I Work
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight mb-5"
            >
              Simple, clear, and
              <br />
              <span className="text-white/25">stress-free process.</span>
            </motion.h2>
          </div>
          <motion.p
            variants={staggerItem}
            className="text-white/38 text-base max-w-md mx-auto leading-relaxed"
          >
            From our first call to your live website — here's exactly what to expect.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* GSAP scroll-scrub connector line — draws as you scroll */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[26px] left-[12.5%] right-[12.5%] h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.25) 30%, rgba(124,58,237,0.25) 70%, transparent 100%)",
              transform: "scaleX(0)",
              transformOrigin: "left center",
            }}
          />

          <motion.div
            className="grid md:grid-cols-4 gap-8 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={staggerItem}
                className="relative flex flex-col items-center md:items-start text-center md:text-left group"
              >
                {/* Step circle */}
                <div className="relative z-10 mb-6">
                  <motion.div
                    className="skeuo-circle w-[52px] h-[52px] rounded-full flex items-center justify-center"
                    whileInView={{
                      boxShadow: [
                        "5px 5px 14px rgba(0,0,0,0.72), -2px -2px 5px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(99,102,241,0.14), inset 0 1px 0 rgba(255,255,255,0.07)",
                        "5px 5px 14px rgba(0,0,0,0.72), -2px -2px 5px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(99,102,241,0.14), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 8px rgba(99,102,241,0.07)",
                        "5px 5px 14px rgba(0,0,0,0.72), -2px -2px 5px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(99,102,241,0.14), inset 0 1px 0 rgba(255,255,255,0.07)",
                      ],
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.25, ease: "easeOut" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/25 to-violet-600/25 border border-white/[0.08] flex items-center justify-center group-hover:from-blue-600/40 group-hover:to-violet-600/40 transition-all duration-300">
                      <motion.span
                        className="text-white/55 text-xs font-bold tracking-wider"
                        whileInView={{ opacity: [0, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.25, duration: 0.5 }}
                      >
                        {step.number}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>

                <h3 className="text-white font-semibold text-base mb-2.5 group-hover:text-blue-200 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/38 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow between steps (desktop) */}
                {i < processSteps.length - 1 && (
                  <motion.div
                    className="hidden md:flex absolute top-[13px] -right-3 z-20 w-6 h-6 items-center justify-center"
                    initial={{ opacity: 0, x: -4 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.25, duration: 0.4 }}
                  >
                    <ArrowRight size={11} className="text-white/20" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => scrollTo("#contact")}
            className="group inline-flex items-center gap-2 border border-white/[0.12] hover:border-white/28 text-white/55 hover:text-white text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-white/[0.04]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Start with a free discovery call
            <motion.span
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
