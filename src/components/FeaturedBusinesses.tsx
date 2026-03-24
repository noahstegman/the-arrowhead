"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const featured = [
  {
    name: "Puglia",
    category: "Italian Restaurant",
    location: "Blue Jay",
    image: "/biz-puglia.jpg",
    url: "https://www.pugliaitalianrestaurant.com/",
  },
  {
    name: "SkyPark at Santa's Village",
    category: "Adventure Park",
    location: "Skyforest",
    image: "/biz-santas-village.jpg",
    url: "https://skyparksantasvillage.com/",
  },
  {
    name: "Lake Arrowhead Village",
    category: "Shopping & Dining",
    image: "/village-clock.jpg",
    url: "https://www.thelakearrowheadvillage.com/",
  },
];

function BizCard({ biz, index }: { biz: (typeof featured)[number]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <ScrollReveal delay={0.05 + index * 0.1}>
      <a
        ref={ref}
        href={biz.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-surface-high">
          <motion.div style={{ y: imgY }} className="absolute inset-[-6%] will-change-transform">
            <Image
              src={biz.image}
              alt={biz.name}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <p className="section-label">{biz.category}</p>
          {biz.location && (
            <span className="text-on-surface-muted text-[0.6875rem] font-sans font-light">
              · {biz.location}
            </span>
          )}
        </div>
        <h3 className="font-serif text-lg text-on-surface font-light tracking-[-0.01em] group-hover:text-primary transition-colors duration-300">
          {biz.name}
        </h3>
      </a>
    </ScrollReveal>
  );
}

export default function FeaturedBusinesses() {
  return (
    <section className="relative z-10 bg-surface">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-24 md:py-36">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <ScrollReveal delay={0.05}>
            <p className="section-label mb-6">Local favorites</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08]">
              Worth knowing
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2.5 text-on-surface font-sans text-[0.8125rem] font-medium tracking-wide group hover:text-primary transition-colors duration-300"
            >
              <span>View all businesses</span>
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </ScrollReveal>
        </div>

        {/* 3-up grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {featured.map((biz, i) => (
            <BizCard key={biz.name} biz={biz} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
