"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const businesses = [
  {
    name: "The Grill at Antler's Inn",
    category: "Restaurant & Bar",
    location: "Twin Peaks",
    description:
      "A mountain lodge restaurant at the Antler's Inn in Twin Peaks. Steaks, burgers, and craft cocktails in a rustic setting where the fireplace is always going.",
    image: "/cabin-autumn.jpg",
    url: "https://www.thegrillattwinpeaks.com/",
  },
  {
    name: "Puglia",
    category: "Italian Restaurant",
    location: "Blue Jay",
    description:
      "Family-owned Italian cooking in nearby Blue Jay. Handmade pastas, classic entrees, and a wine list that takes the mountain seriously.",
    image: "/biz-puglia.jpg",
    url: "https://www.pugliaitalianrestaurant.com/",
  },
  {
    name: "Lake Arrowhead Village",
    category: "Shopping & Dining",
    description:
      "The lakefront commercial heart of the mountain -- boutique shops, waterfront restaurants, and a year-round events calendar including the Summer Concert Series and Oktoberfest.",
    image: "/village-clock.jpg",
    url: "https://www.thelakearrowheadvillage.com/",
  },
  {
    name: "SkyPark at Santa's Village",
    category: "Adventure Park",
    location: "Skyforest",
    description:
      "Originally opened in 1955, this reimagined mountain adventure park offers zip lines, rock climbing, mountain biking, archery, and seasonal visits with Santa.",
    image: "/biz-santas-village.jpg",
    url: "https://skyparksantasvillage.com/",
  },
  {
    name: "Jeannine's Home Furnishings",
    category: "Home & Decor",
    description:
      "A curated home furnishings shop with mountain-worthy decor, furniture, and gifts. The kind of store where you walk in for a candle and leave with a new dining table.",
    image: "/biz-jeannines.jpg",
    url: "https://savvymediapros.wixsite.com/jeannineshomefurnish",
  },
  {
    name: "The Standard Design Group",
    category: "Nursery & Landscape Design",
    description:
      "One of eight Southern California design centers offering plants, pottery, succulents, and full landscape design services. Over 100 acres of growing facilities.",
    image: "/lake-boats.jpg",
    url: "https://www.thestandarddesigngroup.com/",
  },
  {
    name: "Tudor House",
    category: "Live Entertainment",
    description:
      "A 1920s-era dinner theater and music hall hosting live performances, comedy nights, and community gatherings in one of the mountain's most storied buildings.",
    image: "/biz-tudor-house.jpg",
  },
];

function BusinessCard({
  biz,
  index,
}: {
  biz: (typeof businesses)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <ScrollReveal delay={0.05 + (index % 2) * 0.1}>
      <div ref={ref} className="group">
        <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-surface-high">
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-[-6%] will-change-transform"
          >
            <Image
              src={biz.image}
              alt={biz.name}
              fill
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </motion.div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <p className="section-label">{biz.category}</p>
          {biz.location && (
            <span className="text-on-surface-muted text-[0.6875rem] font-sans font-light">
              · {biz.location}
            </span>
          )}
        </div>
        <h3 className="font-serif text-xl md:text-[1.375rem] text-on-surface font-light mb-3 tracking-[-0.01em]">
          {biz.name}
        </h3>
        <p className="font-sans text-on-surface-muted text-[0.875rem] leading-[1.7] max-w-[40ch] font-light">
          {biz.description}
        </p>
        {biz.url && (
          <a
            href={biz.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-primary text-[0.8125rem] font-sans font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
          >
            <span>Visit website</span>
            <ArrowRight size={13} weight="bold" />
          </a>
        )}
      </div>
    </ScrollReveal>
  );
}

export default function BusinessesSection() {
  return (
    <section id="businesses" className="relative z-10 bg-surface">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-32 pb-40 md:pt-44 md:pb-56">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 mb-20 md:mb-28">
          <ScrollReveal className="md:col-span-5" delay={0.05}>
            <p className="section-label mb-8">Local businesses</p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08]">
              Some of the people
              <br />
              who make the mountain
            </h2>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-4 md:col-start-8 md:pt-16" delay={0.2}>
            <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.75] max-w-[44ch] font-light">
              Lake Arrowhead is full of independent businesses worth knowing.
              Here are a few of the families and founders who help make this
              mountain what it is.
            </p>
          </ScrollReveal>
        </div>

        {/* Clean 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-16 md:gap-y-24">
          {businesses.map((biz, i) => (
            <BusinessCard key={biz.name} biz={biz} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
