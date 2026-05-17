"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, NAV_ITEMS } from "@/constants";
import { fadeUpVariants } from "@/animations/variants";
import { GithubIcon, XIcon, LinkedInIcon, DribbbleIcon } from "@/components/SocialIcons";
import { scrollTo } from "@/hooks/useSmoothScroll";
import { NexarcMark } from "@/components/NexarcLogo";

const socials = [
  { icon: GithubIcon, href: SITE_CONFIG.socials.github, label: "GitHub" },
  { icon: XIcon, href: SITE_CONFIG.socials.twitter, label: "X" },
  { icon: LinkedInIcon, href: SITE_CONFIG.socials.linkedin, label: "LinkedIn" },
  { icon: DribbbleIcon, href: SITE_CONFIG.socials.dribbble, label: "Dribbble" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] pt-14 pb-10 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-[1fr_auto_auto] gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <NexarcMark size={28} />
              <span className="text-white font-semibold text-base">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              Premium websites, AI tools, and e-commerce solutions for businesses that want to grow.
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="group inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
            >
              {SITE_CONFIG.email}
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-4">Navigation</p>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-white/40 text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase mb-4">Services</p>
            <ul className="space-y-3">
              {["Business Websites", "AI Applications", "E-Commerce", "Custom Tools"].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-white/40 text-sm hover:text-white transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} {SITE_CONFIG.fullName}. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 transition-all duration-200"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
