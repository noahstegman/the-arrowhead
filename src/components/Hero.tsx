"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const currentIndexRef = useRef(-1);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.55]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.4], ["0%", "30%"]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  /* ── Detect mobile / iOS ── */
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsMobile(mobile);

    // iOS Safari can't reliably seek video for frame extraction
    // Fall back to autoplay video on mobile
    if (isIOS || mobile) {
      setUseFallback(true);
      setLoaded(true);
    }
  }, []);

  /* ── Lock scroll during loading (desktop only) ── */
  useEffect(() => {
    if (useFallback) return;
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded, useFallback]);

  /* ── Frame extraction — desktop only ── */
  useEffect(() => {
    if (useFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const totalFrames = 120;

    const extract = async () => {
      try {
        const video = document.createElement("video");
        video.src = "/hero-video.mp4";
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.crossOrigin = "anonymous";

        await new Promise<void>((resolve, reject) => {
          video.onloadeddata = () => resolve();
          video.onerror = () => reject(new Error("Video load failed"));
          // Timeout after 10s
          setTimeout(() => reject(new Error("Video load timeout")), 10000);
        });

        const { videoWidth, videoHeight, duration } = video;

        canvas.width = videoWidth;
        canvas.height = videoHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";

        const offscreen = document.createElement("canvas");
        offscreen.width = videoWidth;
        offscreen.height = videoHeight;
        const offCtx = offscreen.getContext("2d")!;
        const frames: ImageBitmap[] = [];

        for (let i = 0; i < totalFrames; i++) {
          video.currentTime = (i / (totalFrames - 1)) * duration;
          await new Promise<void>((resolve, reject) => {
            video.onseeked = () => resolve();
            setTimeout(() => reject(new Error("Seek timeout")), 3000);
          });
          offCtx.drawImage(video, 0, 0);
          const bitmap = await createImageBitmap(offscreen);
          frames.push(bitmap);
          setProgress(Math.round(((i + 1) / totalFrames) * 100));
        }

        video.src = "";
        framesRef.current = frames;

        const ctx = canvas.getContext("2d");
        if (ctx && frames[0]) {
          ctx.drawImage(frames[0], 0, 0);
        }

        setLoaded(true);
      } catch {
        // If extraction fails for any reason, fall back to video
        setUseFallback(true);
        setLoaded(true);
      }
    };

    extract();

    return () => {
      framesRef.current.forEach((b) => b.close());
      framesRef.current = [];
    };
  }, [useFallback]);

  /* ── Scroll-driven frame drawing — desktop only ── */
  const drawFrame = useCallback(() => {
    if (useFallback) return;
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    const p = scrollYProgress.get();
    const index = Math.round(p * (frames.length - 1));

    if (index === currentIndexRef.current) return;
    currentIndexRef.current = index;

    const ctx = canvas.getContext("2d");
    if (ctx && frames[index]) {
      ctx.drawImage(frames[index], 0, 0);
    }
  }, [scrollYProgress, useFallback]);

  useEffect(() => {
    if (useFallback) return;
    const onScroll = () => {
      requestAnimationFrame(drawFrame);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drawFrame, useFallback]);

  return (
    <div
      ref={containerRef}
      style={{ height: useFallback ? "100dvh" : "300vh" }}
    >
      {/* ── Loading screen (desktop only) ── */}
      <AnimatePresence>
        {!loaded && !useFallback && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#1C1C18] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <NextImage
                src="/logo.png"
                alt="The Arrowhead"
                width={48}
                height={48}
                className="brightness-0 invert opacity-60"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-lg text-white/50 font-light tracking-[-0.01em] mb-8"
            >
              The Arrowhead
            </motion.p>

            <div className="w-48 h-px bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-white/50"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-4 font-sans text-[0.6875rem] text-white/25 tracking-[0.15em] uppercase"
            >
              {progress}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pinned viewport ── */}
      <div className={`${useFallback ? "relative" : "sticky top-0"} min-h-[100dvh] h-[100dvh] overflow-hidden`}>
        {/* Desktop: canvas */}
        {!useFallback && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Mobile / fallback: autoplay video */}
        {useFallback && (
          <video
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dynamic dark overlay */}
        <motion.div
          style={{ opacity: useFallback ? 0.3 : overlayOpacity }}
          className="absolute inset-0 bg-[#1C1C18]"
        />

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C18]/60 via-transparent to-[#1C1C18]/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-12 md:pb-20">
          <motion.p
            style={useFallback ? {} : { y: subtitleY, opacity: subtitleOpacity }}
            className="section-label text-white/60 mb-5 md:mb-7"
          >
            San Bernardino Mountains, California
          </motion.p>

          <motion.h1
            style={useFallback ? {} : { y: titleY, opacity: titleOpacity }}
            className="font-serif font-light text-white leading-[0.9] tracking-[-0.03em]"
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(3.5rem,12vw,10rem)]"
            >
              Lake
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(3.5rem,12vw,10rem)] italic"
            >
              Arrowhead
            </motion.span>
          </motion.h1>

          <motion.div
            style={useFallback ? {} : { opacity: ctaOpacity }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-white/55 font-sans text-sm md:text-base max-w-sm leading-relaxed font-light"
            >
              A mile-high alpine retreat where the pines meet the water and
              every season tells a different story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
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
                href="/events"
                className="inline-flex items-center border border-white/25 text-white/85 px-7 py-3.5 text-[0.8125rem] font-sans font-medium tracking-wide hover:bg-white/8 hover:border-white/40 transition-all duration-300 active:scale-[0.97]"
              >
                Upcoming events
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only */}
        {!useFallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
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
        )}
      </div>
    </div>
  );
}
