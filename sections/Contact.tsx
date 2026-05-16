"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, MessageSquare, ChevronDown, Check } from "lucide-react";
import { GithubIcon, XIcon, LinkedInIcon } from "@/components/SocialIcons";
import { SITE_CONFIG } from "@/constants";
import { fadeUpVariants, staggerContainer, staggerItem } from "@/animations/variants";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Business Website",
  "E-Commerce Store",
  "AI Application",
  "Custom Business Tool",
  "Not sure yet — let's talk",
];

const BUDGET_OPTIONS = [
  { value: "under-15k", label: "Under ₹15,000" },
  { value: "15k-40k",   label: "₹15,000 – ₹40,000" },
  { value: "40k-1l",    label: "₹40,000 – ₹1,00,000" },
  { value: "1l-3l",     label: "₹1,00,000 – ₹3,00,000" },
  { value: "3l+",       label: "₹3,00,000+" },
  { value: "discuss",   label: "Prefer to discuss" },
];

const CONTACT_LINKS = [
  { icon: Mail,   label: "Email",    value: SITE_CONFIG.email,    href: `mailto:${SITE_CONFIG.email}` },
  { icon: Phone,  label: "Phone",    value: SITE_CONFIG.phone,    href: `tel:${SITE_CONFIG.phone}` },
  { icon: MapPin, label: "Location", value: SITE_CONFIG.location, href: "#" },
];

function BudgetDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = BUDGET_OPTIONS.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between bg-white/[0.03] border rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 text-left",
          open
            ? "border-blue-500/50 bg-white/[0.05] shadow-[0_0_0_3px_rgba(59,130,246,0.08)] text-white"
            : "border-white/[0.08] hover:border-white/[0.16] text-white/60"
        )}
      >
        <span className={selected ? "text-white" : "text-white/25"}>
          {selected ? selected.label : "Select a range..."}
        </span>
        <ChevronDown
          size={14}
          className={cn("text-white/30 transition-transform duration-200 flex-shrink-0", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-[#111111] border border-white/[0.1] rounded-xl overflow-hidden shadow-2xl shadow-black/60"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors text-left",
                    value === opt.value
                      ? "bg-blue-600/15 text-blue-300"
                      : "text-white/55 hover:bg-white/[0.05] hover:text-white"
                  )}
                >
                  {opt.label}
                  {value === opt.value && <Check size={13} className="text-blue-400 flex-shrink-0" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  };

  const field = (name: string) =>
    cn(
      "w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-250",
      focused === name
        ? "border-blue-500/50 bg-white/[0.05] shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
        : "border-white/[0.08] hover:border-white/[0.16]"
    );

  return (
    <section id="contact" className="py-24 md:py-36 px-6 bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
          {/* Left — info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p variants={staggerItem} className="text-blue-400 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Get In Touch
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Let's build
              <br />
              something great
              <br />
              <span className="text-white/25">together.</span>
            </motion.h2>

            <motion.p variants={staggerItem} className="text-white/40 text-base leading-relaxed mb-10">
              Tell me about your project and I'll come back with a clear plan and price — usually within 24 hours.
              No obligation, no hard sell.
            </motion.p>

            {/* Contact details */}
            <motion.div variants={staggerItem} className="space-y-4 mb-10">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.07] group-hover:border-white/[0.15] transition-all">
                    <Icon size={14} className="text-white/40 group-hover:text-white/70 transition-colors" />
                  </div>
                  <div>
                    <p className="text-white/25 text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-white/60 text-sm group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Socials */}
            <motion.div variants={staggerItem} className="flex items-center gap-2.5">
              {[
                { icon: GithubIcon,   href: SITE_CONFIG.socials.github,   label: "GitHub" },
                { icon: XIcon,        href: SITE_CONFIG.socials.twitter,   label: "X" },
                { icon: LinkedInIcon, href: SITE_CONFIG.socials.linkedin,  label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/35 hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="glass-panel rounded-2xl p-8"
          >
            {status === "sent" ? (
              <motion.div
                className="h-full flex flex-col items-start justify-center py-12"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-6">
                  <MessageSquare size={24} className="text-emerald-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-3">Message sent!</h3>
                <p className="text-white/45 text-base leading-relaxed max-w-sm">
                  Thanks for reaching out. I'll review your project details and get back to you within 24 hours with a clear response.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/30 text-[11px] tracking-[0.15em] uppercase block mb-2">Your Name</label>
                    <input
                      type="text" required placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      className={field("name")}
                    />
                  </div>
                  <div>
                    <label className="text-white/30 text-[11px] tracking-[0.15em] uppercase block mb-2">Email Address</label>
                    <input
                      type="email" required placeholder="rahul@yourbusiness.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      className={field("email")}
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="text-white/30 text-[11px] tracking-[0.15em] uppercase block mb-2">I need help with...</label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm({ ...form, service: opt })}
                        className={cn(
                          "px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 border",
                          form.service === opt
                            ? "bg-blue-600/20 border-blue-500/40 text-blue-300"
                            : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget — custom dropdown */}
                <div>
                  <label className="text-white/30 text-[11px] tracking-[0.15em] uppercase block mb-2">Approx. Budget</label>
                  <BudgetDropdown
                    value={form.budget}
                    onChange={(v) => setForm({ ...form, budget: v })}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-white/30 text-[11px] tracking-[0.15em] uppercase block mb-2">Project Details</label>
                  <textarea
                    required rows={4}
                    placeholder="Tell me about your business and what you're looking to build..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    className={cn(field("message"), "resize-none")}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="skeuo-btn group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>

                <p className="text-white/20 text-[11px] text-center">
                  No spam. No obligations. I'll respond within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
