"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const problems = [
  {
    icon: "✦",
    text: "Сложности в проявлении чувств и желаний",
  },
  {
    icon: "✦",
    text: "Потеря связи с сексуальностью и телом",
  },
  {
    icon: "✦",
    text: "Потеря интереса к жизни, снижение либидо",
  },
  {
    icon: "✦",
    text: "Выгорание и нехватка жизненной энергии",
  },
];

export default function Problems() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#4A3F35" }}
    >
      {/* Decorative line */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-3 tracking-[0.35em] text-xs uppercase"
              style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
            >
              Узнаёте себя?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "#F5EBE0",
              }}
            >
              Когда тело замолчало, а жизнь потеряла{" "}
              <span style={{ fontStyle: "italic", color: "#D4AF37" }}>яркость</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm leading-relaxed"
              style={{ color: "#EDD9C8", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Эти состояния — не приговор. Они сигнал, что пришло время восстановить
              связь с собой. Именно с этим работает Айя Велес — более 30 лет.
            </motion.p>
          </div>

          {/* Right: problem cards */}
          <div className="space-y-4">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-4 p-5 group"
                style={{
                  backgroundColor: "rgba(245,235,224,0.06)",
                  borderLeft: "2px solid",
                  borderColor: "rgba(212,175,55,0.3)",
                  transition: "border-color 0.3s, background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#D4AF37";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(245,235,224,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.3)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(245,235,224,0.06)";
                }}
              >
                <span
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#D4AF37", fontSize: "0.6rem" }}
                >
                  {p.icon}
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#EDD9C8", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)" }}
      />
    </section>
  );
}
