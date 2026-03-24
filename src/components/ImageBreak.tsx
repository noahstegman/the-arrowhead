"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ImageBreak() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative z-10 h-[40vh] md:h-[55vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-10%] will-change-transform">
        <Image
          src="/winter-lakefront.jpg"
          alt="Snow-covered lakefront cabins and pines at Lake Arrowhead"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#1C1C18]/25" />
    </section>
  );
}
