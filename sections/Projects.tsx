"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp, ExternalLink } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import type { Project } from "@/data/projects";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/animations/variants";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      variants={staggerItem}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden cursor-default",
        featured ? "md:col-span-2 md:flex-row" : ""
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ borderColor: "rgba(255,255,255,0.16)" }}
      transition={{ duration: 0.25 }}
    >
      {/* Gradient accent overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        project.accentColor
      )} />

      {/* Visual header */}
      <div className={cn(
        "relative flex items-end p-5 overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex-shrink-0",
        featured ? "md:h-full md:min-h-[220px] md:w-[45%] h-52" : "h-48"
      )}>
        {/* Large letter bg */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <motion.span
            className="text-[9rem] font-black text-white leading-none"
            style={{ opacity: 0.03 }}
            animate={hovered ? { scale: 1.08, opacity: 0.05 } : { scale: 1, opacity: 0.03 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {project.title.charAt(0)}
          </motion.span>
        </div>

        {/* Hover reveal overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(124,58,237,0.12))",
          }}
          initial={{ opacity: 0 }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border border-white/20 bg-white/[0.08] flex items-center justify-center backdrop-blur-sm"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <ArrowUpRight size={18} className="text-white" />
          </motion.div>
        </motion.div>

        {/* Category + year */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <span className="px-3 py-1.5 rounded-full border border-white/[0.1] bg-black/40 backdrop-blur-sm text-white/50 text-[11px] font-medium">
            {project.categoryLabel}
          </span>
          <span className="text-white/25 text-xs">{project.year}</span>
        </div>

        {/* Live link */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.08] backdrop-blur border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.18] transition-all opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-5 pt-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-white font-semibold text-base leading-snug">{project.title}</h3>
          <motion.div
            animate={hovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0 mt-0.5" />
          </motion.div>
        </div>

        <p className="text-white/30 text-xs mb-1">{project.client}</p>
        <p className="text-white/48 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Result badge */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/[0.07] border border-emerald-400/[0.12] mt-auto mb-4">
          <TrendingUp size={13} className="text-emerald-400 flex-shrink-0" />
          <span className="text-emerald-300/80 text-xs font-medium">{project.result}</span>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/28 text-[11px] group-hover:text-white/40 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 md:py-36 px-6 bg-[#080808] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={staggerItem} className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Client Work
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                variants={staggerItem}
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight"
              >
                Real projects.
                <br />
                <span className="text-white/25">Real results.</span>
              </motion.h2>
            </div>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projectCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "border border-white/[0.1] text-white/38 hover:text-white hover:border-white/30"
                )}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={i === 0 && activeCategory === "All"}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-14"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-white/28 text-sm mb-4">Want to see how I can help your business?</p>
          <motion.button
            onClick={() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold px-8 py-4 rounded-full hover:opacity-90 hover:shadow-xl hover:shadow-blue-500/20 transition-all"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Discuss Your Project
            <ArrowUpRight size={15} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
