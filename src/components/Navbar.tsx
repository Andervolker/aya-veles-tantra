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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.6);
      setScrolled(y > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Закрываем меню при скролле
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const scrollToQuiz = () => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById("quiz");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <>
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

              <div className="flex items-center gap-3 flex-shrink-0">
                {/* CTA */}
                <button
                  onClick={scrollToQuiz}
                  className="flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-90 active:scale-95"
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

                {/* Burger button — visible only on mobile */}
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-sm transition-opacity hover:opacity-70"
                  aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                  aria-expanded={menuOpen}
                >
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="block w-5 h-px origin-center"
                    style={{ backgroundColor: "#F5EBE0" }}
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className="block w-5 h-px origin-center"
                    style={{ backgroundColor: "#F5EBE0" }}
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="block w-5 h-px origin-center"
                    style={{ backgroundColor: "#F5EBE0" }}
                  />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && visible && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-30 md:hidden"
              style={{ backgroundColor: "rgba(20,12,8,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              key="drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-14 left-0 right-0 z-40 md:hidden"
              style={{
                backgroundColor: "rgba(44,28,20,0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(212,175,55,0.18)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
              }}
            >
              <ul className="flex flex-col py-4">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="w-full text-left px-8 py-4 text-sm uppercase tracking-[0.2em] transition-colors duration-200 hover:text-[#D4AF37]"
                      style={{
                        color: "rgba(193,164,169,0.9)",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        borderBottom: "1px solid rgba(212,175,55,0.07)",
                      }}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + navLinks.length * 0.07, duration: 0.3 }}
                  className="px-8 pt-5 pb-6"
                >
                  <button
                    onClick={scrollToQuiz}
                    className="w-full py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-90 active:scale-95"
                    style={{
                      backgroundColor: "#D4AF37",
                      color: "#2C1C14",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Записаться
                  </button>
                </motion.li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
