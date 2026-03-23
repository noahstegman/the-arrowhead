"use client";

import ScrollReveal from "./ScrollReveal";

export default function IntroSection() {
  return (
    <section id="discover" className="relative z-10 bg-surface">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-32 pb-40 md:pt-44 md:pb-52">
        {/* Generous 2-column split — heading left, body right with offset */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0">
          <ScrollReveal className="md:col-span-5" delay={0.05}>
            <p className="section-label mb-8">About the village</p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08]">
              A sanctuary
              <br />
              above the clouds
            </h2>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-5 md:col-start-8 md:pt-20" delay={0.2}>
            <p className="font-sans text-on-surface-muted text-[0.9375rem] md:text-base leading-[1.75] max-w-[52ch] font-light">
              Lake Arrowhead has been the mountain retreat of Southern California
              since 1922. A mile-high alpine lake surrounded by towering pines,
              it offers a rare escape from the sprawl below &mdash; a place where
              mornings start with mist on the water and evenings end with stars
              you forgot existed.
            </p>
            <p className="font-sans text-on-surface-muted text-[0.9375rem] md:text-base leading-[1.75] max-w-[52ch] mt-7 font-light">
              The village is a close-knit community of independent shops,
              locally-owned restaurants, and seasonal celebrations that bring
              families back year after year.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
