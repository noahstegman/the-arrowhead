"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const facts = [
  { label: "Elevation", value: "5,174 ft" },
  { label: "Surface area", value: "184 acres" },
  { label: "Max depth", value: "185 ft" },
  { label: "Shoreline", value: "14 miles" },
  { label: "Established", value: "1922" },
  { label: "Avg. summer", value: "78\u00B0F" },
];

function ParallaxImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative aspect-[3/4] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-12%] will-change-transform">
        <Image
          src="/mountain-layers.jpg"
          alt="Layered mountain landscape with misty valleys near Lake Arrowhead"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 42vw"
        />
      </motion.div>
    </div>
  );
}

function ScenicBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className="relative h-[55vh] md:h-[65vh] overflow-hidden mt-32 md:mt-44">
      <motion.div style={{ y: imgY }} className="absolute inset-[-8%] will-change-transform">
        <Image
          src="/aerial-golden.jpg"
          alt="Aerial view of Lake Arrowhead islands at golden hour"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      {/* Top fade to surface color */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface to-transparent" />
      {/* Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1C1C18]/50 to-transparent" />
    </div>
  );
}

export default function LakeInfoSection() {
  return (
    <section id="lake" className="relative z-10 bg-surface">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-32 pb-0 md:pt-44">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">
          {/* Image — left 5 cols */}
          <ScrollReveal className="md:col-span-5" delay={0.1}>
            <ParallaxImage />
          </ScrollReveal>

          {/* Text + facts — right side with generous left gutter */}
          <div className="md:col-span-5 md:col-start-8 flex flex-col justify-center">
            <ScrollReveal delay={0.15}>
              <p className="section-label mb-8">The lake</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08] mb-10">
                A reservoir of
                <br />
                wonder
              </h2>
              <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.75] max-w-[46ch] font-light mb-16">
                Created by a dam on Little Bear Creek in 1922, Lake Arrowhead
                was originally known as Little Bear Lake. Today it is a private
                lake, meaning its waters remain pristine &mdash; no public boat
                launches, no jet skis, just the quiet lap of water against the
                hull of a sailboat and the occasional eagle overhead.
              </p>
            </ScrollReveal>

            {/* Facts — 2x3 grid with generous spacing */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
              {facts.map((fact, i) => (
                <ScrollReveal key={fact.label} delay={0.2 + i * 0.05}>
                  <p className="section-label mb-2.5">{fact.label}</p>
                  <p className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] text-on-surface font-light tracking-[-0.01em]">
                    {fact.value}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed scenic band */}
      <ScenicBand />
    </section>
  );
}
