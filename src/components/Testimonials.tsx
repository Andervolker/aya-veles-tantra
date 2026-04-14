"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Марина, 38 лет",
    location: "Москва",
    format: "Ретрит ГРАНИ",
    text: "После ретрита что-то внутри перещёлкнуло. Снова чувствую своё тело — не как помеху, а как дом. Энергия вернулась, и стало понятно, как долго жил(а) в «выключенном» режиме. Айе — благодарность за безопасное пространство.",
    rating: 5,
  },
  {
    name: "Андрей, 42 года",
    location: "Санкт-Петербург",
    format: "СЕКС-коучинг",
    text: "Пришёл скептиком — ушёл с полностью изменившимся взглядом на сексуальность. Работа затронула не только интимную сферу, но и отношения, самооценку, вообще отношение к жизни. Этот опыт бесценен.",
    rating: 5,
  },
  {
    name: "Екатерина, 31 год",
    location: "Москва",
    format: "Личные сессии",
    text: "Потеряла интерес к жизни. Телесные практики с Айей вернули ощущение себя. Три месяца работы — и открываю себя с новой стороны. Либидо вернулось, энергии стало в разы больше.",
    rating: 5,
  },
  {
    name: "Игорь, 45 лет",
    location: "Казань",
    format: "Тантрический массаж",
    text: "Профессионализм и чуткость Айи — это то, что поразило сразу. Никакого давления, только мягкое сопровождение. После сессии впервые за годы тело ощутилось живым и откликающимся.",
    rating: 5,
  },
  {
    name: "Дмитрий и Анна",
    location: "Москва",
    format: "Лаборатория отношений",
    text: "Пришли в кризисе. Лаборатория отношений стала точкой сборки: наконец поняли, чего хотим друг от друга. Рекомендуем парам, которые чувствуют, что потеряли связь.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section
      ref={ref}
      id="reviews"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#4A3F35" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(193,164,169,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)",
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
            Отзывы участников
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              color: "#F5EBE0",
            }}
          >
            Истории трансформаций
          </motion.h2>
        </div>

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="p-10 lg:p-14 text-center"
              style={{ backgroundColor: "rgba(245,235,224,0.06)", border: "1px solid rgba(193,164,169,0.15)" }}
            >
              <Quote size={28} style={{ color: "#D4AF37", margin: "0 auto 1.5rem", opacity: 0.6 }} />

              <p
                className="mb-8 leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "#F5EBE0",
                  lineHeight: 1.75,
                }}
              >
                «{testimonials[current].text}»
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <span key={i} style={{ color: "#D4AF37", fontSize: "0.75rem" }}>★</span>
                ))}
              </div>

              <div>
                <p
                  className="font-medium"
                  style={{ color: "#F5EBE0", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                >
                  {testimonials[current].name}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
                >
                  {testimonials[current].location} · {testimonials[current].format}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 flex items-center justify-center transition-all duration-300 hover:opacity-70"
              style={{ border: "1px solid rgba(193,164,169,0.3)" }}
            >
              <ChevronLeft size={18} style={{ color: "#C1A4A9" }} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: i === current ? "#D4AF37" : "rgba(193,164,169,0.4)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 flex items-center justify-center transition-all duration-300 hover:opacity-70"
              style={{ border: "1px solid rgba(193,164,169,0.3)" }}
            >
              <ChevronRight size={18} style={{ color: "#C1A4A9" }} />
            </button>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#quiz"
            className="inline-flex items-center gap-3 px-8 py-3.5 text-sm uppercase tracking-widest transition-all hover:opacity-90"
            style={{
              backgroundColor: "#D4AF37",
              color: "#4A3F35",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            Начать свою трансформацию
          </a>
        </motion.div>
      </div>
    </section>
  );
}
