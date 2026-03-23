"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react";

export default function CallToAction() {
  return (
    <section className="relative z-10 bg-surface-high">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-start">
          <ScrollReveal className="md:col-span-6" delay={0.05}>
            <p className="section-label mb-7">Join the community</p>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.12]">
              Want to add your business
              <br className="hidden md:block" /> or event?
            </h2>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-4 md:col-start-8 md:pt-8" delay={0.15}>
            <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.75] font-light mb-8">
              We feature local businesses and community events at no cost.
              If you are part of the Lake Arrowhead community, we want to
              help people find you.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 text-[0.8125rem] font-sans font-medium tracking-wide hover:bg-primary-light transition-colors duration-300 active:scale-[0.97] w-fit"
              >
                <span>Get in touch</span>
                <ArrowRight size={14} weight="bold" />
              </Link>

              <a
                href="mailto:hello@thearrowhead.co"
                className="inline-flex items-center gap-2 text-on-surface-muted hover:text-primary text-[0.8125rem] font-sans font-light transition-colors duration-300"
              >
                <EnvelopeSimple size={15} weight="regular" />
                <span>hello@thearrowhead.co</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
