"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { techCategories, marqueeSkills } from "@/data/skills";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/animations/variants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function MarqueeTrack({ items, direction = 1 }: { items: string[]; direction?: 1 | -1 }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden mask-marquee">
      <motion.div
        className="flex gap-3 flex-shrink-0 py-2"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.02] text-white/35 text-sm whitespace-nowrap hover:text-white/60 hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.85, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-36 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      {/* Animated data-grid background */}
      <div className="absolute inset-0 skills-data-grid pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <motion.p variants={staggerItem} className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Tech Stack
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight"
            >
              Built with the tools
              <br />
              <span className="text-white/25">that perform.</span>
            </motion.h2>
          </div>
          <motion.p
            variants={staggerItem}
            className="text-white/35 text-sm leading-relaxed max-w-xs"
          >
            Every tool in my stack is chosen for reliability, performance, and business value — not just trend-following.
          </motion.p>
        </motion.div>

        {/* Tech category grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {techCategories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={staggerItem}
              className="group p-5 rounded-2xl hover:border-white/[0.18] transition-all duration-300 glass-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  <p className="text-white/25 text-xs mt-0.5">{cat.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 text-xs group-hover:text-white/55 group-hover:border-white/10 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee strips */}
      <div className="space-y-3">
        <MarqueeTrack items={marqueeSkills} direction={1} />
        <MarqueeTrack items={[...marqueeSkills].reverse()} direction={-1} />
      </div>
    </section>
  );
}
