"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#F5EBE0" }}
        >
          {/* Logo with spin-in animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -270 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Logo size={100} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-6 tracking-[0.35em] text-sm uppercase"
            style={{ color: "#4A3F35", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Айя Велес
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 1.0, ease: "easeInOut" }}
            className="mt-4 h-px w-20 origin-left"
            style={{ backgroundColor: "#D4AF37", opacity: 0.6 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-3 tracking-[0.25em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Пространство ВНЕ ИЗМЕРЕНИЙ
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
