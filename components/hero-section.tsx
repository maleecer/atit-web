"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CanvasParticles } from "./canvas-particles";
import { scrollToSection } from "./smooth-scroll-provider";
import { useEffect, useState } from "react";

interface HeroProps {
  logo: string | any;
  title: string;
  subtitle: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export function HeroSection({ title, subtitle, cta, logo }: HeroProps) {
  const [nodes, setNodes] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    const generatedNodes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setNodes(generatedNodes);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any,
    },
  };

  const handleScroll = () => {
    scrollToSection("#who-we-are");
  };

  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-black">
      <CanvasParticles />

      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 backdrop-blur-sm bg-white/5">
            <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-sm font-medium text-white">
              Welcome to the Future
            </span>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <img src={logo.src} alt="ATIT Logo" className="h-[150px] sm:h-[150px] lg:h-[300px] mx-auto" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={handleScroll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-white text-black font-semibold text-base hover:shadow-xl hover:shadow-white/40 transition-shadow"
          >
            {cta.primary}
          </motion.button>

        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          onClick={handleScroll}
          className="group relative mt-16 mx-auto flex flex-col items-center gap-3 focus-visible:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-gray-500 group-hover:text-white transition-colors">
            Scroll Down
          </span>


          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-white" />
          </motion.span>

        </motion.button>
      </motion.div>
    </section>
  );
}
