"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experience";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { MapPin, ChevronDown } from "lucide-react";

export default function Experience() {
  const [activeId, setActiveId] = useState<string | null>(experiences[0].id);

  return (
    <section id="experience" className="py-32 md:py-40 px-6 bg-[#080808] relative">
      {/* Subtle right glow */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-[500px] h-[500px] bg-blue-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-16"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase">03</span>
          <div className="h-px w-8 bg-white/20" />
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase">Experience</span>
        </motion.div>

        <motion.h2
          className="text-[clamp(2rem,5vw,4rem)] font-bold text-white leading-[1.05] tracking-tight mb-16"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Where I've{" "}
          <em className="text-white/20 not-italic">built.</em>
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline list */}
          <div className="flex flex-col gap-1">
            {experiences.map((exp) => (
              <motion.button
                key={exp.id}
                variants={staggerItem}
                onClick={() => setActiveId(activeId === exp.id ? null : exp.id)}
                className={cn(
                  "group text-left p-5 rounded-xl border transition-all duration-300",
                  activeId === exp.id
                    ? "border-white/15 bg-white/[0.04]"
                    : "border-transparent hover:border-white/[0.07] hover:bg-white/[0.02]"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {exp.current && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                    )}
                    <p className="text-white font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-white/25 text-xs">{exp.period.split("—")[0].trim()}</span>
                </div>
                <p className="text-white/40 text-xs mt-1 pl-0">{exp.role}</p>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {activeId && (() => {
              const exp = experiences.find((e) => e.id === activeId)!;
              return (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{exp.role}</h3>
                      <p className="text-violet-400 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white/30 text-xs mb-1">{exp.period}</p>
                      <div className="flex items-center gap-1 text-white/25 text-xs justify-end">
                        <MapPin size={10} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="space-y-2.5">
                    <p className="text-white/25 text-xs tracking-[0.15em] uppercase mb-3">
                      Highlights
                    </p>
                    {exp.achievements.map((a, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="w-1 h-1 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                        <p className="text-white/60 text-sm leading-relaxed">{a}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
