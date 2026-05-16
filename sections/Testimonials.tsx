"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { fadeUpVariants, staggerItem, staggerContainer } from "@/animations/variants";
import { Star } from "lucide-react";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="glass-card flex-shrink-0 w-[340px] sm:w-[400px] flex flex-col p-6 rounded-2xl hover:border-white/[0.18] transition-all duration-300 mx-2 cursor-default">
      {/* Stars */}
      <div className="flex items-center justify-between mb-5">
        <Stars count={t.rating} />
        <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/30 text-[10px] font-medium">
          {t.service}
        </span>
      </div>

      {/* Quote */}
      <p className="text-white/55 text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/30 to-violet-600/30 border border-white/[0.1] flex items-center justify-center text-white/70 text-xs font-bold flex-shrink-0">
          {t.avatar}
        </div>
        <div>
          <p className="text-white text-sm font-medium">{t.name}</p>
          <p className="text-white/35 text-xs">{t.role}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = 1 }: { items: typeof testimonials; direction?: 1 | -1 }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex flex-shrink-0"
        animate={{ x: direction === 1 ? ["0%", `-${100 / 3}%`] : [`-${100 / 3}%`, "0%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half + 1);
  const row2 = testimonials.slice(half - 1);

  return (
    <section className="py-24 md:py-36 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={staggerItem} className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
            Client Stories
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight"
            >
              Clients love
              <br />
              <span className="text-white/25">the results.</span>
            </motion.h2>
            <motion.div variants={staggerItem} className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <Stars count={5} />
                <span className="text-white/40 text-sm ml-1">5.0</span>
              </div>
              <span className="text-white/15">·</span>
              <span className="text-white/30 text-sm">{testimonials.length}+ reviews</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Dual marquee */}
      <div className="space-y-4">
        <MarqueeRow items={row1} direction={1} />
        <MarqueeRow items={row2} direction={-1} />
      </div>
    </section>
  );
}
