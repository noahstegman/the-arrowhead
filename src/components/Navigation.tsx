"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CaretDown } from "@phosphor-icons/react";

const navLinks = [
  { label: "Businesses", href: "/businesses" },
  { label: "Events", href: "/events" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Lake Arrowhead", href: "/about/lake-arrowhead" },
      { label: "The Site", href: "/about/site" },
    ],
  },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 80));
    return () => unsubscribe();
  }, [scrollY]);

  // Close about dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileAboutOpen(false);
  }, [pathname]);

  const navBg = useTransform(
    scrollY,
    [0, 150],
    isHome
      ? ["rgba(252, 249, 243, 0)", "rgba(252, 249, 243, 0.92)"]
      : ["rgba(252, 249, 243, 0.92)", "rgba(252, 249, 243, 0.92)"]
  );

  const textColor = isHome && !scrolled ? "text-white/85" : "text-on-surface";
  const logoColor = isHome && !scrolled ? "text-white" : "text-on-surface";
  const showBlur = isHome ? scrolled : true;

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBg }}
        className={`fixed top-0 left-0 right-0 z-40 transition-[backdrop-filter] duration-500 ${
          showBlur ? "backdrop-blur-[14px]" : ""
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Link href="/" className="relative z-50 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Lake Arrowhead logo"
                width={36}
                height={36}
                className={`transition-all duration-500 ${
                  isHome && !scrolled ? "brightness-0 invert" : ""
                }`}
              />
              <span
                className={`font-serif text-lg md:text-xl font-normal tracking-[-0.01em] transition-colors duration-500 ${logoColor}`}
              >
                The Arrowhead
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link, i) =>
              link.children ? (
                <div key={link.label} ref={aboutRef} className="relative">
                  <motion.button
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                    onClick={() => setAboutOpen(!aboutOpen)}
                    className={`flex items-center gap-1 text-[0.8125rem] font-sans font-normal tracking-wide transition-colors duration-400 hover:opacity-60 ${textColor}`}
                  >
                    {link.label}
                    <CaretDown
                      size={11}
                      weight="bold"
                      className={`transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {aboutOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full right-0 mt-3 bg-surface/95 backdrop-blur-[14px] py-3 px-1 min-w-[180px] shadow-[0_8px_30px_rgba(28,28,24,0.08)]"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setAboutOpen(false)}
                            className="block px-4 py-2.5 text-[0.8125rem] font-sans font-normal text-on-surface hover:text-primary transition-colors duration-200"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`text-[0.8125rem] font-sans font-normal tracking-wide transition-colors duration-400 hover:opacity-60 ${textColor}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}

            {/* Contact button */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className={`text-[0.8125rem] font-sans font-medium tracking-wide px-5 py-2 transition-all duration-300 active:scale-[0.97] ${
                  isHome && !scrolled
                    ? "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
                    : "bg-primary text-white hover:bg-primary-light"
                }`}
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 3.5, backgroundColor: "#1C1C18" }
                  : { rotate: 0, y: 0, backgroundColor: isHome && !scrolled ? "#ffffff" : "#1C1C18" }
              }
              className="block w-5 h-px origin-center"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -3.5, backgroundColor: "#1C1C18" }
                  : { rotate: 0, y: 0, backgroundColor: isHome && !scrolled ? "#ffffff" : "#1C1C18" }
              }
              className="block w-5 h-px origin-center"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 bg-surface flex flex-col justify-center px-10"
          >
            {navLinks.map((link, i) =>
              link.children ? (
                <div key={link.label}>
                  <motion.button
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="font-serif text-[2.5rem] text-on-surface font-light leading-tight mb-4 flex items-center gap-3"
                  >
                    {link.label}
                    <CaretDown
                      size={20}
                      weight="light"
                      className={`transition-transform duration-300 ${mobileAboutOpen ? "rotate-180" : ""}`}
                    />
                  </motion.button>
                  <AnimatePresence>
                    {mobileAboutOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-4 pl-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block font-sans text-lg text-on-surface-muted font-light py-2 hover:text-primary transition-colors duration-200"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-serif text-[2.5rem] text-on-surface font-light leading-tight mb-6 block hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <Link
                href="/contact"
                className="inline-block font-sans text-base font-medium bg-primary text-white px-7 py-3.5 hover:bg-primary-light transition-colors duration-300"
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
