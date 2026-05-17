"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/constants";
import { staggerContainer, staggerItem, scaleInVariants, fadeUpVariants } from "@/animations/variants";
import { AnimatedWords } from "@/components/AnimatedText";
import { ShieldCheck, Clock, Zap, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const WHY_ME = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every project includes thorough testing, revisions, and post-launch support.",
  },
  {
    icon: Clock,
    title: "On Time, Every Time",
    description: "Clear timelines, regular updates, and no nasty surprises on delivery day.",
  },
  {
    icon: Zap,
    title: "Fast & Optimised",
    description: "Your site loads fast, ranks on Google, and works perfectly on every device.",
  },
  {
    icon: HeartHandshake,
    title: "Real Partnership",
    description: "Your business goals guide every design and technical decision I make.",
  },
];

const INDUSTRIES = [
  "Clinics & Healthcare", "Economics & Education", "Supply Chain", "Restaurants & Cafés",
  "HR & Leadership", "Real Estate", "Retail & Fashion", "SaaS & Startups",
  "Law Firms", "Agencies",
];

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setRot({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
  };

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={ref}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={() => setRot({ x: 0, y: 0 })}
        animate={{ rotateX: rot.x, rotateY: rot.y }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{ transformStyle: "preserve-3d", ...style }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, scale: 0.982, filter: "blur(5px)" },
        {
          autoAlpha: 1, scale: 1, filter: "blur(0px)",
          duration: 1.0, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-36 px-6 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={staggerItem} className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-5">
              About Me
            </motion.p>

            {/* Heading with word-reveal */}
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight mb-7">
              <AnimatedWords
                text="A developer who thinks like a"
                delay={0.1}
                staggerDelay={0.055}
              />
              {" "}
              <span className="text-white/25">
                <AnimatedWords text="business owner." delay={0.55} staggerDelay={0.07} />
              </span>
            </h2>

            <motion.div variants={staggerItem} className="space-y-4 text-white/48 text-base leading-relaxed mb-8">
              <p>
                I'm Bhavishya Jasuja — a full-stack developer based in Muzaffarnagar, India,
                with 3+ years of experience building websites, digital tools, and web
                applications for businesses across India and worldwide.
              </p>
              <p>
                From dental clinics and economics platforms to supply chain tools and coaching
                institutes, I bring a commercial mindset to every project. I don't just write
                code — I think about your customers, your conversions, and what your business
                actually needs to grow.
              </p>
            </motion.div>

            {/* Industries */}
            <motion.div variants={staggerItem}>
              <p className="text-white/22 text-[10px] tracking-[0.22em] uppercase mb-3">
                Industries I've worked in
              </p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((ind, i) => (
                  <motion.span
                    key={ind}
                    className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/38 text-xs hover:text-white/70 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 cursor-default"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: EASE }}
                    whileHover={{ y: -2 }}
                  >
                    {ind}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — Why choose me cards with tilt */}
          <div>
            <motion.p
              className="text-white/22 text-[10px] tracking-[0.22em] uppercase mb-6"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Why clients choose me
            </motion.p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {WHY_ME.map((item, i) => (
                <motion.div key={item.title} variants={scaleInVariants}>
                  <TiltCard
          className="group p-5 rounded-2xl transition-all duration-300 h-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(14px) saturate(180%)",
            WebkitBackdropFilter: "blur(14px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 group-hover:bg-blue-500/12 group-hover:border group-hover:border-blue-400/20 transition-all duration-300">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                      >
                        <item.icon size={16} className="text-white/45 group-hover:text-blue-400 transition-colors" />
                      </motion.div>
                    </div>
                    <h3 className="text-white text-sm font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/38 text-xs leading-relaxed">{item.description}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
