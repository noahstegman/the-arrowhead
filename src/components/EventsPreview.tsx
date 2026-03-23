"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "@phosphor-icons/react";

const upcomingEvents = [
  {
    date: "Apr 12",
    title: "Mountain Makers Market",
    location: "Lake Arrowhead Village",
    tag: "Market",
  },
  {
    date: "Apr 26",
    title: "Wildflower Trail Walk",
    location: "Heaps Peak Arboretum",
    tag: "Nature",
  },
  {
    date: "May 3",
    title: "Lakeside Jazz Evening",
    location: "The Tavern Bay",
    tag: "Music",
  },
];

export default function EventsPreview() {
  return (
    <section className="relative z-10 bg-surface-low">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-28 md:py-36">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <ScrollReveal delay={0.05}>
            <p className="section-label mb-6">Coming up</p>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08]">
              On the mountain
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 text-on-surface font-sans text-[0.8125rem] font-medium tracking-wide group hover:text-primary transition-colors duration-300"
            >
              <span>View all events</span>
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </ScrollReveal>
        </div>

        {/* Event rows */}
        <div className="flex flex-col">
          {upcomingEvents.map((event, i) => (
            <ScrollReveal key={event.title} delay={0.05 + i * 0.06}>
              <Link
                href="/events"
                className={`group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline cursor-pointer py-8 md:py-10 transition-colors duration-400 hover:bg-surface-high/40 -mx-8 md:-mx-16 lg:-mx-24 px-8 md:px-16 lg:px-24 ${
                  i > 0 ? "border-t border-outline-variant/15" : ""
                }`}
              >
                {/* Date */}
                <div className="md:col-span-2">
                  <span className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] text-on-surface font-light leading-none">
                    {event.date}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-5 md:col-start-4">
                  <span className="section-label text-primary mb-1.5 block">{event.tag}</span>
                  <h3 className="font-serif text-lg md:text-xl text-on-surface font-light tracking-[-0.01em] group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                </div>

                {/* Location */}
                <div className="md:col-span-3 md:col-start-10 md:text-right">
                  <span className="text-on-surface-muted text-[0.8125rem] font-sans font-light">
                    {event.location}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
