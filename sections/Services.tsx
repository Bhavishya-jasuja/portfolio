"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Brain, ShoppingBag, Layers, CheckCircle, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { staggerContainer, staggerItem, fadeUpVariants } from "@/animations/variants";
import { scrollTo } from "@/hooks/useSmoothScroll";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe, Brain, ShoppingBag, Layers,
};

const EASE = [0.22, 1, 0.36, 1] as const;

interface TiltState { x: number; y: number; glowX: number; glowY: number }

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[service.icon];

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10, glowX: x * 100, glowY: y * 100 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
    setHovered(false);
  };

  return (
    <motion.div
      variants={staggerItem}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={ref}
        className="group relative flex flex-col p-6 rounded-2xl overflow-hidden cursor-default h-full"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)",
          backdropFilter: "blur(14px) saturate(180%)",
          WebkitBackdropFilter: "blur(14px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
          transformStyle: "preserve-3d",
        }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.5 }}
        whileHover={{ borderColor: "rgba(255,255,255,0.14)" }}
      >
        {/* Hover gradient bg */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            service.accent
          )}
        />

        {/* Mouse-tracking glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(99,102,241,0.16) 0%, transparent 62%)`,
          }}
        />

        {/* Popular badge */}
        {service.highlight && (
          <motion.div
            className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/25 text-blue-300 text-[10px] font-medium tracking-wide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 400, damping: 20 }}
          >
            {service.highlight}
          </motion.div>
        )}

        <div className="relative z-10 flex flex-col flex-1">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:bg-white/[0.12] group-hover:border-white/[0.15] transition-all duration-300">
            {Icon && (
              <motion.div
                animate={hovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Icon size={19} className="text-white/65" />
              </motion.div>
            )}
          </div>

          <h3 className="text-white font-semibold text-base mb-3">{service.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((f, fi) => (
              <motion.li
                key={f}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -8 }}
                animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.6, x: 0 }}
                transition={{ delay: fi * 0.04, duration: 0.25 }}
              >
                <CheckCircle size={12} className="text-blue-400 flex-shrink-0" />
                <span className="text-white/50 text-xs">{f}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-1.5 text-xs font-medium text-white/35 group-hover:text-white/80 transition-colors mt-auto"
          >
            Get a quote
            <motion.span
              animate={hovered ? { x: 4 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ArrowRight size={12} />
            </motion.span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP entrance: subtle scale-up + blur clear as section enters viewport
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, scale: 0.985, filter: "blur(4px)" },
        {
          autoAlpha: 1, scale: 1, filter: "blur(0px)",
          duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-36 px-6 relative bg-[#080808]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={staggerItem}
              className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4"
            >
              What I Build
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                variants={staggerItem}
                className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight"
              >
                Services designed to
                <br />
                <span className="text-white/25">grow your business.</span>
              </motion.h2>
            </div>
          </motion.div>

          <motion.p
            className="text-white/38 text-sm leading-relaxed max-w-xs md:text-right"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Every project is built with your business goals at the centre — not just aesthetics.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          className="mt-8 p-6 rounded-2xl border border-white/[0.07] bg-gradient-to-r from-blue-600/[0.07] to-violet-600/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />
          <div>
            <p className="text-white font-semibold mb-1">Not sure what you need?</p>
            <p className="text-white/38 text-sm">Book a free 30-min discovery call — I'll figure it out with you.</p>
          </div>
          <motion.button
            onClick={() => scrollTo("#contact")}
            className="flex-shrink-0 flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 16px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)",
          }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Book Free Call
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
