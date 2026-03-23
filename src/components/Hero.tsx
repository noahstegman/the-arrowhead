"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Scroll-progress over the tall container drives video + parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.6, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.55]);

  /* Title parallax layers — different speeds for depth */
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "25%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "35%"]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  /* Scroll-driven video playback */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let unsubscribe: (() => void) | undefined;

    const bind = () => {
      unsubscribe = scrollYProgress.on("change", (v) => {
        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = v * video.duration;
        }
      });
    };

    if (video.readyState >= 1) {
      bind();
    } else {
      const onReady = () => bind();
      video.addEventListener("loadedmetadata", onReady, { once: true });
      return () => {
        video.removeEventListener("loadedmetadata", onReady);
        unsubscribe?.();
      };
    }

    return () => unsubscribe?.();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
      {/* Pinned viewport — stays visible while we scroll through 250vh */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Video layer */}
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            className="hero-video"
          />
        </motion.div>

        {/* Dynamic dark overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#1C1C18]"
        />

        {/* Bottom vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C18]/60 via-transparent to-[#1C1C18]/20" />

        {/* Content — left-aligned, bottom of viewport, massive type */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-12 md:pb-20">
          {/* Location tag */}
          <motion.p
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="section-label text-white/60 mb-5 md:mb-7"
          >
            San Bernardino Mountains, California
          </motion.p>

          {/* Main title — Jagerhof-scale drama */}
          <motion.h1
            style={{ y: titleY, opacity: titleOpacity }}
            className="font-serif font-light text-white leading-[0.9] tracking-[-0.03em]"
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(3.5rem,12vw,10rem)]"
            >
              Lake
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(3.5rem,12vw,10rem)] italic"
            >
              Arrowhead
            </motion.span>
          </motion.h1>

          {/* Subtitle + CTA row */}
          <motion.div
            style={{ opacity: ctaOpacity }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-white/55 font-sans text-sm md:text-base max-w-sm leading-relaxed font-light"
            >
              A mile-high alpine retreat where the pines meet the water and
              every season tells a different story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="flex gap-3"
            >
              <a
                href="#discover"
                className="inline-flex items-center bg-white/95 text-on-surface px-7 py-3.5 text-[0.8125rem] font-sans font-medium tracking-wide hover:bg-white transition-colors duration-300 active:scale-[0.97]"
              >
                Explore
              </a>
              <a
                href="#events"
                className="inline-flex items-center border border-white/25 text-white/85 px-7 py-3.5 text-[0.8125rem] font-sans font-medium tracking-wide hover:bg-white/8 hover:border-white/40 transition-all duration-300 active:scale-[0.97]"
              >
                Upcoming events
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ opacity: ctaOpacity }}
          className="absolute bottom-12 right-8 md:right-16 lg:right-24 hidden md:flex"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-white/35 text-[0.625rem] font-sans tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
