"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import ParallaxLayer from "@/components/ParallaxLayer";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Process from "@/sections/Process";
import Skills from "@/sections/Skills";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  useSmoothScroll();

  const handleLoadComplete = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      <AnimatePresence>
        {!loaderDone && <Loader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <main>
        <ParallaxLayer />
        <Navigation />
        <Hero />
        <Services />
        <About />
        <Projects />
        <Process />
        <Skills />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
