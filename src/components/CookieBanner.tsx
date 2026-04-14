"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const COOKIE_KEY = "aya_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 3200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-[9990] w-[calc(100%-2rem)] max-w-md"
          style={{ x: "-50%" }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            <p
              className="flex-1 text-xs leading-relaxed"
              style={{
                color: "rgba(250,244,238,0.75)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
              }}
            >
              Сайт использует cookies.{" "}
              <Link
                href="/privacy"
                className="underline-offset-2 hover:opacity-70 transition-opacity"
                style={{
                  color: "rgba(212,175,55,0.75)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(212,175,55,0.4)",
                }}
              >
                Подробнее
              </Link>
            </p>

            <button
              onClick={accept}
              className="flex-shrink-0 px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-200 hover:shadow-lg active:scale-95"
              style={{
                backgroundColor: "#D4AF37",
                color: "#2C1C14",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                borderRadius: "6px",
                boxShadow: "0 2px 12px rgba(212,175,55,0.45)",
                letterSpacing: "0.12em",
              }}
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
