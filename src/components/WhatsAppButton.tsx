"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 16 });
  const y = useSpring(rawY, { stiffness: 180, damping: 16 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 120;
      if (dist < maxDist) {
        const pull = (1 - dist / maxDist) * 0.4;
        rawX.set(dx * pull);
        rawY.set(dy * pull);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [rawX, rawY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const scrollToQuiz = () => {
    const el = document.getElementById("quiz");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          ref={btnRef}
          onClick={scrollToQuiz}
          aria-label="Записаться"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          style={{ x, y, bottom: 28, right: 28 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="fixed z-50 flex items-center gap-2.5 rounded-full group cursor-pointer"
          whileTap={{ scale: 0.93 }}
        >
          {/* Glass pill */}
          <div
            className="relative flex items-center gap-2.5 px-5 py-3 rounded-full overflow-hidden"
            style={{
              backgroundColor: "#D4AF37",
              boxShadow:
                "0 0 0 1px rgba(212,175,55,0.3), 0 8px 32px rgba(212,175,55,0.35), 0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 70%)",
              }}
            />

            <Sparkles
              size={16}
              className="relative z-10 flex-shrink-0"
              style={{ color: "#2C1C14" }}
            />
            <span
              className="relative z-10 text-xs tracking-[0.18em] uppercase whitespace-nowrap"
              style={{
                color: "#2C1C14",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Записаться
            </span>
          </div>

          {/* Soft pulse ring */}
          <span
            className="absolute inset-0 rounded-full animate-ping pointer-events-none"
            style={{ backgroundColor: "rgba(212,175,55,0.2)" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
