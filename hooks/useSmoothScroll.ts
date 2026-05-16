"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    // Use GSAP ticker so Lenis and ScrollTrigger stay perfectly in sync
    const gsapTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to update whenever Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTick);
      lenisInstance = null;
    };
  }, []);
}

export function scrollTo(target: string) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -80 });
  }
}
