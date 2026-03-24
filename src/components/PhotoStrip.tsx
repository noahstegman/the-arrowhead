"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const photos = [
  { src: "/lake-boats.jpg", alt: "Turquoise lake waters with boats along the forested shore", aspect: "aspect-[4/5]" },
  { src: "/cabin-autumn.jpg", alt: "Modern cabin nestled among pine trees with autumn foliage", aspect: "aspect-[3/4]" },
  { src: "/winter-pines.jpg", alt: "Snow-laden evergreen trees in the San Bernardino Mountains", aspect: "aspect-[4/5]" },
  { src: "/village-clock.jpg", alt: "Tudor-style clock tower at Lake Arrowhead Village", aspect: "aspect-[3/4]" },
  { src: "/mountain-layers.jpg", alt: "Layered mountain ridges fading into morning mist", aspect: "aspect-[4/5]" },
  { src: "/trail-dog.jpg", alt: "Dog on a rocky mountain trail near Lake Arrowhead", aspect: "aspect-[3/4]" },
  { src: "/aerial-golden.jpg", alt: "Aerial view of forested lake islands at golden hour", aspect: "aspect-[4/5]" },
];

function ParallaxPhoto({ photo, index }: { photo: (typeof photos)[number]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${photo.aspect} w-[280px] md:w-[320px] shrink-0 overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ y }} className="absolute inset-[-8%] will-change-transform">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="320px"
        />
      </motion.div>
    </motion.div>
  );
}

export default function PhotoStrip() {
  return (
    <section className="relative z-10 bg-surface">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-24 pb-8 md:pt-32 md:pb-12">
        <ScrollReveal delay={0.05}>
          <p className="section-label mb-2">The mountain</p>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll gallery */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 md:gap-5 px-8 md:px-16 lg:px-24 pb-24 md:pb-32">
          {photos.map((photo, i) => (
            <ParallaxPhoto key={photo.src} photo={photo} index={i} />
          ))}
          {/* Spacer at end for padding */}
          <div className="w-8 md:w-16 lg:w-24 shrink-0" />
        </div>
      </div>
    </section>
  );
}
