"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const results = [
  {
    number: "01",
    title: "Новый уровень чувствительности",
    text: "Сексуальность и принятие себя раскрываются как природная сила, а не как проблема",
  },
  {
    number: "02",
    title: "Интимное здоровье",
    text: "Повышение либидо, яркость ощущений, восстановление чувственности тела",
  },
  {
    number: "03",
    title: "Энергия жизни",
    text: "Увеличение внутренней энергоёмкости — больше сил, вдохновения, радости",
  },
  {
    number: "04",
    title: "Управление энергией",
    text: "Умение сознательно направлять свою сексуальную энергию в творчество и отношения",
  },
  {
    number: "05",
    title: "Выход из застоя",
    text: "Из состояния депрессии и выгорания — в новую, сочную, экстатичную жизнь",
  },
];

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="results"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#F5EBE0" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "url('/aya-main.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Результаты трансформации
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#4A3F35",
            }}
          >
            Что вы{" "}
            <span style={{ fontStyle: "italic", color: "#D4AF37" }}>почувствуете</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className={`p-8 group relative overflow-hidden transition-transform duration-400 hover:-translate-y-1 ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ backgroundColor: "#FAF4EE" }}
            >
              {/* Number */}
              <div
                className="mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.5rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "rgba(212,175,55,0.2)",
                }}
              >
                {r.number}
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  color: "#4A3F35",
                }}
              >
                {r.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                {r.text}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: "#D4AF37" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <blockquote
            className="max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#4A3F35",
              lineHeight: 1.6,
            }}
          >
            «Раскрытие сексуального потенциала — это ключ к улучшению качества
            и продолжительности жизни»
          </blockquote>
          <div
            className="mt-4 text-xs uppercase tracking-widest"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            — Айя Велес
          </div>
        </motion.div>
      </div>
    </section>
  );
}
