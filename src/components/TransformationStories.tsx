"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const stories = [
  {
    emoji: "🔥",
    name: "Анастасия, 34 года",
    format: "Личные сессии · 3 месяца",
    before: "Чувствовала себя «пустой». Секс превратился в обязанность, тело казалось чужим. Выгорание поглотило всё.",
    after: "Либидо вернулось само. Впервые за годы получаю удовольствие — от тела, от жизни, от отношений. Научилась хотеть.",
    accent: "#C1A4A9",
  },
  {
    emoji: "🌊",
    name: "Максим, 39 лет",
    format: "Ретрит ГРАНИ · 3 дня",
    before: "Зажат, не умел выражать эмоции. В отношениях — стена. Партнёрша говорила, что не чувствует меня рядом.",
    after: "На третий день ретрита разревелся — впервые за 10 лет. Вернулся другим. Жена говорит, что у неё появился новый муж.",
    accent: "#D4AF37",
  },
  {
    emoji: "🌺",
    name: "Ольга, 29 лет",
    format: "Тантрический массаж · 5 сессий",
    before: "Паническая атака при близости. Психолог помогал с мыслями, но тело всё равно сжималось. Боялась собственных желаний.",
    after: "Тело перестало быть источником страха. Появилась чувственность. Первый раз в жизни живу в своём теле, а не наблюдаю за ним со стороны.",
    accent: "#9B8FC0",
  },
  {
    emoji: "⚡",
    name: "Виктор и Татьяна",
    format: "Лаборатория отношений · 1 день",
    before: "7 лет вместе — и полная пустота. Жили как соседи. Уже думали о разводе, пришли «для галочки».",
    after: "За один день вскрылись вещи, о которых молчали годами. Сейчас строим отношения заново — осознанно. Это сложнее и в сто раз живее.",
    accent: "#A5B4A3",
  },
];

export default function TransformationStories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? stories.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === stories.length - 1 ? 0 : c + 1));

  const story = stories[current];

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#FAF4EE" }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgba(193,164,169,0.18) 0%, transparent 55%), radial-gradient(circle at 85% 30%, rgba(212,175,55,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            До и после
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              color: "#4A3F35",
            }}
          >
            История одного изменения
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 text-sm max-w-lg mx-auto"
            style={{ color: "#8B735B", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            Реальные слова участников — без купюр
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-0 overflow-hidden"
              style={{
                boxShadow:
                  "0 20px 60px rgba(74,63,53,0.1), 0 4px 16px rgba(74,63,53,0.06)",
              }}
            >
              {/* BEFORE */}
              <div
                className="relative p-8 lg:p-10"
                style={{
                  backgroundColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRight: "1px solid rgba(193,164,169,0.2)",
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs uppercase tracking-widest"
                  style={{
                    backgroundColor: "rgba(193,164,169,0.15)",
                    color: "#8B735B",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  До
                </div>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "#4A3F35",
                    lineHeight: 1.8,
                  }}
                >
                  «{story.before}»
                </p>
                {/* Decorative left border */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-0.5"
                  style={{ backgroundColor: "rgba(193,164,169,0.4)" }}
                />
              </div>

              {/* AFTER */}
              <div
                className="relative p-8 lg:p-10"
                style={{
                  backgroundColor: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs uppercase tracking-widest"
                  style={{
                    backgroundColor: `${story.accent}22`,
                    color: story.accent,
                    fontFamily: "'Inter', sans-serif",
                    border: `1px solid ${story.accent}44`,
                  }}
                >
                  После
                </div>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#2C1C14",
                    lineHeight: 1.8,
                  }}
                >
                  «{story.after}»
                </p>
                {/* Decorative left border */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-0.5"
                  style={{ backgroundColor: story.accent, opacity: 0.5 }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Author + controls */}
          <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 flex items-center justify-center text-lg select-none"
                  style={{
                    backgroundColor: `${story.accent}18`,
                    border: `1px solid ${story.accent}33`,
                  }}
                >
                  {story.emoji}
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif" }}
                  >
                    {story.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
                  >
                    {story.format}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:opacity-60"
                style={{ border: "1px solid rgba(74,63,53,0.2)" }}
                aria-label="Назад"
              >
                <ChevronLeft size={16} style={{ color: "#4A3F35" }} />
              </button>

              <div className="flex gap-1.5">
                {stories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`История ${i + 1}`}
                    className="transition-all duration-300"
                    style={{
                      width: i === current ? "22px" : "7px",
                      height: "7px",
                      borderRadius: "4px",
                      backgroundColor:
                        i === current ? story.accent : "rgba(74,63,53,0.2)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:opacity-60"
                style={{ border: "1px solid rgba(74,63,53,0.2)" }}
                aria-label="Далее"
              >
                <ChevronRight size={16} style={{ color: "#4A3F35" }} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <p
            className="text-sm mb-5"
            style={{ color: "#8B735B", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            Ваша история трансформации начинается здесь
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("quiz");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-3 px-8 py-3.5 text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#4A3F35",
              color: "#F5EBE0",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            Записаться сейчас
            <span
              className="w-4 h-px"
              style={{ backgroundColor: "#D4AF37", display: "inline-block" }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
