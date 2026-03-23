"use client";

import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "@phosphor-icons/react";

const events = [
  {
    date: "Apr 12",
    day: "Saturday",
    title: "Mountain Makers Market",
    location: "Lake Arrowhead Village",
    description:
      "Local artisans, live music, and mountain-made goods. Over 40 vendors showcase handcrafted ceramics, woodwork, and seasonal produce.",
    tag: "Market",
  },
  {
    date: "Apr 26",
    day: "Saturday",
    title: "Wildflower Trail Walk",
    location: "Heaps Peak Arboretum",
    description:
      "Guided nature walk through blooming mountain meadows with local botanists. Family friendly, dogs welcome.",
    tag: "Nature",
  },
  {
    date: "May 3",
    day: "Saturday",
    title: "Lakeside Jazz Evening",
    location: "The Tavern Bay",
    description:
      "Live jazz on the water as the sun goes down. Bring blankets and chairs. Food trucks and local wine on site.",
    tag: "Music",
  },
  {
    date: "May 24",
    day: "Saturday",
    title: "Memorial Weekend Regatta",
    location: "Lake Arrowhead Yacht Club",
    description:
      "Annual sailing regatta kicking off the summer season. Spectator viewing from the village boardwalk.",
    tag: "Festival",
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="relative z-10 bg-surface-low">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-32 pb-40 md:pt-44 md:pb-56">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 mb-20 md:mb-32">
          <ScrollReveal className="md:col-span-6" delay={0.05}>
            <p className="section-label mb-8">What&apos;s happening</p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08]">
              Gatherings on
              <br />
              the mountain
            </h2>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-4 md:col-start-9 md:pt-16" delay={0.2}>
            <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.75] font-light">
              From farmers markets to regattas, the mountain calendar stays
              full. Here is what is coming up.
            </p>
          </ScrollReveal>
        </div>

        {/* Events list — separated by background color shifts, no borders */}
        <div className="flex flex-col">
          {events.map((event, i) => (
            <ScrollReveal key={event.title} delay={0.05 + i * 0.06}>
              <div
                className={`group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start cursor-pointer py-10 md:py-14 transition-colors duration-400 hover:bg-surface-high/50 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 ${
                  i > 0 ? "border-t border-outline-variant/20" : ""
                }`}
              >
                {/* Date */}
                <div className="md:col-span-2">
                  <span className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-on-surface font-light leading-none block">
                    {event.date}
                  </span>
                  <span className="text-on-surface-muted text-[0.8125rem] font-sans font-light mt-1 block">
                    {event.day}
                  </span>
                </div>

                {/* Details */}
                <div className="md:col-span-5 md:col-start-4">
                  <span className="section-label text-primary mb-3 block">
                    {event.tag}
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-on-surface font-light mb-3 tracking-[-0.01em] group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="font-sans text-on-surface-muted text-[0.875rem] leading-[1.7] max-w-[48ch] font-light">
                    {event.description}
                  </p>
                </div>

                {/* Location */}
                <div className="md:col-span-3 md:col-start-10 md:text-right md:pt-6">
                  <span className="text-on-surface-muted text-[0.8125rem] font-sans font-light">
                    {event.location}
                  </span>
                  <div className="flex md:justify-end items-center gap-1.5 text-primary text-[0.8125rem] font-sans font-medium mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>Details</span>
                    <ArrowRight size={13} weight="bold" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* View all */}
        <ScrollReveal className="mt-20 md:mt-28" delay={0.1}>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 text-on-surface font-sans text-[0.8125rem] font-medium tracking-wide group/btn hover:text-primary transition-colors duration-300"
          >
            <span>View all upcoming events</span>
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
