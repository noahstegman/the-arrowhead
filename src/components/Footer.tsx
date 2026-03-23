"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { ArrowUp } from "@phosphor-icons/react";

const footerLinks = [
  {
    heading: "Explore",
    links: [
      { label: "Businesses", href: "/businesses" },
      { label: "Events", href: "/events" },
      { label: "About the Lake", href: "/about/lake-arrowhead" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "The Site", href: "/about/site" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#1C1C18]">
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-24 pb-16 md:pt-32 md:pb-20">
        {/* Brand */}
        <ScrollReveal delay={0.05}>
          <Link href="/">
            <h3 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] text-[#FCF9F3] font-light tracking-[-0.01em] mb-5">
              The Arrowhead
            </h3>
          </Link>
          <p className="font-sans text-[#FCF9F3]/40 text-[0.875rem] leading-[1.7] max-w-[40ch] font-light mb-20 md:mb-28">
            A community-driven guide to the mountain village and everything
            that makes it worth the drive.
          </p>
        </ScrollReveal>

        {/* Link groups */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 mb-24 md:mb-32">
          {footerLinks.map((group, gi) => (
            <ScrollReveal
              key={group.heading}
              className={gi === 0 ? "md:col-span-2" : "md:col-span-2 md:col-start-4"}
              delay={0.1 + gi * 0.05}
            >
              <p className="section-label !text-[#FCF9F3]/25 mb-5">{group.heading}</p>
              <ul className="flex flex-col gap-3.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-[#FCF9F3]/55 text-[0.8125rem] font-light hover:text-[#FCF9F3] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-[#FCF9F3]/8">
          <p className="font-sans text-[#FCF9F3]/20 text-xs font-light">
            The Arrowhead. A community project.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[#FCF9F3]/30 hover:text-[#FCF9F3]/70 transition-colors duration-300 group"
          >
            <span className="font-sans text-xs tracking-[0.12em] uppercase">
              Back to top
            </span>
            <ArrowUp
              size={12}
              weight="bold"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
