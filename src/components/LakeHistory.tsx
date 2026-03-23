"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxBand({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative h-[45vh] md:h-[55vh] overflow-hidden my-20 md:my-28">
      <motion.div style={{ y }} className="absolute inset-[-10%] will-change-transform">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-[#1C1C18]/30" />
      {children}
    </div>
  );
}

const timeline = [
  {
    era: "2,000+ years ago",
    title: "People of the Pines",
    body: "The Yuhaaviatam, a Serrano clan, inhabited this territory for over two thousand years. They harvested pine nuts, hunted deer and small game, and built seasonal shelters among the old-growth forests. The mountain was not wilderness to them. It was home.",
  },
  {
    era: "1826 -- 1890s",
    title: "Timber and the first settlers",
    body: "Fur traders arrived around 1826, and by the 1850s American settlers followed for the timber. Sawmills processed pine and fir across what was then called Little Bear Valley. Cattle ranching supplemented logging. The forest gave what it could.",
  },
  {
    era: "1891",
    title: "The dam begins",
    body: "A group of Ohio businessmen formed the Arrowhead Reservoir Company and acquired roughly 6,000 acres with a plan to dam Little Bear Creek and store water for agricultural irrigation in the lowlands below. Construction began, incorporating early hydroelectric elements.",
  },
  {
    era: "1920",
    title: "A new vision",
    body: "A Los Angeles syndicate purchased the site for $625,000 and changed everything. Instead of irrigation, they saw recreation. They renamed Little Bear Lake to Lake Arrowhead and began building a village in the Norman architectural style -- shops, a lodge, a dance pavilion, and a boathouse on the water.",
  },
  {
    era: "1922",
    title: "The lake fills",
    body: "The concrete arch dam was completed and the lake reached full impoundment for the first time. At 780 acres with 14 miles of shoreline and a maximum depth of 185 feet, Lake Arrowhead became the largest private recreational lake in Southern California.",
  },
  {
    era: "1940s -- 1960s",
    title: "The Hollywood years",
    body: "After the war, gasoline rationing ended and tourism surged. Improved roads brought Los Angeles closer. Joan Crawford kept a retreat here. Film crews shot scenes for Now, Voyager at nearby lodges. An 18-hole golf course and clubhouse opened in 1960. The mountain had become a destination.",
  },
  {
    era: "2003",
    title: "The Old Fire",
    body: "In October 2003, the Old Fire scorched over 91,000 acres across the San Bernardino Mountains and destroyed roughly 300 homes in eastern Lake Arrowhead. The community rebuilt. The pines grew back. The mountain endured, as it always had.",
  },
  {
    era: "Today",
    title: "Still here, still quiet",
    body: "Lake Arrowhead remains an unincorporated community of about 10,700 year-round residents -- though summer holidays swell that number to nearly 40,000. The lake is still private, the architectural covenants from 1923 still enforced, and the view from the water has not changed in a century. Over 100 miles of trails thread through the surrounding national forest, and on a clear night the stars still outnumber the streetlights.",
  },
];

const facts = [
  { label: "Elevation", value: "5,174 ft" },
  { label: "Surface area", value: "780 acres" },
  { label: "Max depth", value: "185 ft" },
  { label: "Shoreline", value: "14 miles" },
  { label: "Dam completed", value: "1922" },
  { label: "Avg. sunshine", value: "287 days/yr" },
  { label: "Annual snowfall", value: "40--60 in" },
  { label: "Summer high", value: "84\u00B0F" },
];

export default function LakeHistory() {
  return (
    <>
      {/* Hero header */}
      <section className="relative z-10 bg-surface">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-8 pb-20 md:pt-12 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
            <ScrollReveal className="md:col-span-7" delay={0.05}>
              <p className="section-label mb-8">About Lake Arrowhead</p>
              <h1 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.06]">
                A hundred years of
                <br />
                mountain quiet
              </h1>
            </ScrollReveal>

            <ScrollReveal className="md:col-span-4 md:col-start-9 md:pt-20" delay={0.2}>
              <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.75] font-light">
                Ninety miles northeast of Los Angeles, at 5,174 feet in the
                San Bernardino Mountains, a private lake sits in a bowl of
                granite and pine. It has been many things to many people over
                the centuries. Here is how it got here.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Scenic image band */}
      <ParallaxBand
        src="/arrowhead-lake.jpg"
        alt="Aerial view of Lake Arrowhead at golden hour"
      />

      {/* Timeline */}
      <section className="relative z-10 bg-surface">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-20 md:py-32">
          <div className="flex flex-col">
            {timeline.map((entry, i) => (
              <ScrollReveal key={entry.era} delay={0.05}>
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 py-12 md:py-16 ${
                    i > 0 ? "border-t border-outline-variant/15" : ""
                  }`}
                >
                  {/* Era */}
                  <div className="md:col-span-3">
                    <span className="font-serif text-[clamp(1.25rem,2vw,1.5rem)] text-on-surface font-light leading-none">
                      {entry.era}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-7 md:col-start-5">
                    <h3 className="font-serif text-xl md:text-2xl text-on-surface font-light tracking-[-0.01em] mb-4">
                      {entry.title}
                    </h3>
                    <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.8] max-w-[55ch] font-light">
                      {entry.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page image break */}
      <ParallaxBand
        src="/aerial-golden.jpg"
        alt="Aerial view of Lake Arrowhead islands at golden hour"
      />

      {/* Facts grid */}
      <section className="relative z-10 bg-surface-low">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-24 md:py-36">
          <ScrollReveal delay={0.05}>
            <p className="section-label mb-14 md:mb-20">By the numbers</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-12 md:gap-y-16">
            {facts.map((fact, i) => (
              <ScrollReveal key={fact.label} delay={0.05 + i * 0.04}>
                <p className="section-label mb-3">{fact.label}</p>
                <p className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-on-surface font-light tracking-[-0.01em]">
                  {fact.value}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing quote */}
      <section className="relative z-10 bg-surface">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-24 md:py-36">
          <ScrollReveal delay={0.05}>
            <blockquote className="font-serif text-[clamp(1.5rem,3.5vw,2.75rem)] text-on-surface font-light leading-[1.2] max-w-2xl tracking-[-0.01em] md:ml-[12%]">
              &ldquo;The view from the water has not changed in a century.
              On a clear night the stars still outnumber the streetlights.&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
