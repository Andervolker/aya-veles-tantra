"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { href: "#about",    label: "О мастере" },
  { href: "#formats",  label: "Форматы" },
  { href: "#schedule", label: "Расписание" },
  { href: "#reviews",  label: "Отзывы" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.6);
      setScrolled(y > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToQuiz = () => {
    const el = document.getElementById("quiz");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-40"
          style={{
            backgroundColor: scrolled
              ? "rgba(44,28,20,0.92)"
              : "rgba(44,28,20,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(212,175,55,0.12)",
            boxShadow: scrolled
              ? "0 4px 32px rgba(0,0,0,0.25)"
              : "0 2px 16px rgba(0,0,0,0.12)",
            transition: "background-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between gap-6">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 flex-shrink-0 group"
              aria-label="На главную"
            >
              <Logo size={28} />
              <span
                className="hidden sm:block text-sm tracking-wide group-hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  color: "#F5EBE0",
                  letterSpacing: "0.04em",
                }}
              >
                Айя Велес
              </span>
            </button>

            {/* Nav links — hidden on small screens */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[#D4AF37]"
                  style={{
                    color: "rgba(193,164,169,0.8)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <button
              onClick={scrollToQuiz}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{
                backgroundColor: "#D4AF37",
                color: "#2C1C14",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              <span className="hidden xs:inline">Записаться</span>
              <span className="xs:hidden">✦</span>
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
