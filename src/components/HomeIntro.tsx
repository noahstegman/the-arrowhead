"use client";

import ScrollReveal from "./ScrollReveal";

export default function HomeIntro() {
  return (
    <section id="discover" className="relative z-10 bg-surface">
      {/* Text block */}
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
          <ScrollReveal className="md:col-span-6" delay={0.05}>
            <p className="section-label mb-8">Welcome</p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08]">
              A mile high and a
              <br />
              world away
            </h2>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-4 md:col-start-8 md:pt-16" delay={0.2}>
            <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.75] max-w-[48ch] font-light">
              Lake Arrowhead has been Southern California's mountain retreat
              since 1922. An alpine lake surrounded by towering pines, independent
              shops, and a community that brings people back year after year.
            </p>
          </ScrollReveal>
        </div>
      </div>

    </section>
  );
}
