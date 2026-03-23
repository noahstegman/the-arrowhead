"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxImage({
  src,
  alt,
  aspect,
  sizes,
  priority = false,
  children,
}: {
  src: string;
  alt: string;
  aspect: string;
  sizes: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className={`relative ${aspect} overflow-hidden`}>
      <motion.div style={{ y }} className="absolute inset-[-10%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
      {children}
    </div>
  );
}

export default function DiscoverSection() {
  return (
    <section className="relative z-10 bg-surface-low">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-32 pb-40 md:pt-44 md:pb-56">
        <ScrollReveal delay={0.05}>
          <p className="section-label mb-20 md:mb-28">Discover</p>
        </ScrollReveal>

        {/* Editorial masonry — staggered Y offsets, varied aspect ratios */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
          {/* Hero image — tall portrait, takes 7 cols */}
          <ScrollReveal className="md:col-span-7" delay={0.1}>
            <ParallaxImage
              src="/arrowhead-lake.jpg"
              alt="Aerial view of Lake Arrowhead at golden hour with pine-covered shores and boats dotting the marina"
              aspect="aspect-[3/4]"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C18]/50 via-[#1C1C18]/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                <p className="section-label text-white/50 mb-2">The lake</p>
                <h3 className="font-serif text-lg md:text-xl text-white/90 font-light leading-snug">
                  A mile-high mirror in the pines
                </h3>
              </div>
            </ParallaxImage>
          </ScrollReveal>

          {/* Right column — pushed down with large offset */}
          <div className="md:col-span-5 flex flex-col gap-5 md:gap-6 md:pt-32">
            <ScrollReveal delay={0.2}>
              <ParallaxImage
                src="/village-clock.jpg"
                alt="Tudor-style clock tower at Lake Arrowhead Village"
                aspect="aspect-[5/4]"
                sizes="(max-width: 768px) 100vw, 40vw"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C18]/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="section-label text-white/50 mb-1.5">Village</p>
                  <h3 className="font-serif text-base md:text-lg text-white/90 font-light">
                    Lakeside shopping and dining
                  </h3>
                </div>
              </ParallaxImage>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <ParallaxImage
                src="/trail-dog.jpg"
                alt="Dog exploring a mountain trail near Lake Arrowhead"
                aspect="aspect-[4/5]"
                sizes="(max-width: 768px) 100vw, 40vw"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C18]/45 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="section-label text-white/50 mb-1.5">Trails</p>
                  <h3 className="font-serif text-base md:text-lg text-white/90 font-light">
                    Miles of mountain paths
                  </h3>
                </div>
              </ParallaxImage>
            </ScrollReveal>
          </div>
        </div>

        {/* Pull-quote between image rows */}
        <ScrollReveal className="my-20 md:my-32 md:ml-[16%]" delay={0.1}>
          <blockquote className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-on-surface font-light leading-[1.25] max-w-xl tracking-[-0.01em]">
            &ldquo;The lake does not ask
            <br className="hidden md:block" /> you to hurry.&rdquo;
          </blockquote>
        </ScrollReveal>

        {/* Wide cinematic landscape */}
        <ScrollReveal delay={0.1}>
          <ParallaxImage
            src="/winter-lakefront.jpg"
            alt="Snow-covered lakefront cabins and pines at Lake Arrowhead in winter"
            aspect="aspect-[2.4/1]"
            sizes="100vw"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C18]/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
              <p className="section-label text-white/50 mb-2">Four seasons</p>
              <h3 className="font-serif text-lg md:text-xl text-white/90 font-light">
                Every season, a different story
              </h3>
            </div>
          </ParallaxImage>
        </ScrollReveal>
      </div>
    </section>
  );
}
