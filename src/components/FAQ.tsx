"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Что взять с собой на практику? Нужна специальная одежда?",
    a: "Возьмите с собой удобную одежду, в которой вам комфортно двигаться — подойдут любые лёгкие штаны и футболка. Ничего специального покупать не нужно. Главное — не пить и плотно не есть за 2 часа до начала. Ковёр, плед и подушку для медитации можно взять или воспользоваться нашими.",
  },
  {
    q: "Я первый раз. Мне нужна специальная подготовка?",
    a: "Никакой специальной подготовки не требуется. Приходите такими, какие вы есть. На каждом мероприятии я провожу введение для новых участников. Важно лишь одно условие: открытость и желание исследовать себя.",
  },
  {
    q: "Могу ли я уйти, если мне не понравится?",
    a: "Да, абсолютно. Пространство ВНЕ ИЗМЕРЕНИЙ строится на принципе добровольности. Вы всегда можете взять паузу, выйти или покинуть практику без каких-либо объяснений. Ваше состояние — ваш выбор.",
  },
  {
    q: "Мне обязательно участвовать во всех практиках или я могу просто посмотреть?",
    a: "Вы сами решаете, в каких практиках участвовать. Никто не будет принуждать вас к чему-либо. Наблюдение — тоже опыт. Со временем, когда почувствуете готовность, вы включитесь сами.",
  },
  {
    q: "Найдётся ли мне пара для практик или нужно прийти со своей?",
    a: "На большинство событий можно прийти одному — пары для упражнений формируются на месте. Я всегда создаю комфортные условия для всех участников. На практики для пар вы можете прийти как со своим партнёром, так и без него — это оговаривается заранее.",
  },
  {
    q: "Как мне вас найти?",
    a: "Пространство ВНЕ ИЗМЕРЕНИЙ находится в Екатеринбурге, ул. Малышева 71А, офис 304. Точный адрес также отправляется после записи. Написать напрямую можно в Telegram: @ayaveles.",
  },
  {
    q: "Работаете ли вы только с женщинами?",
    a: "Нет. Я работаю с людьми любых полов и возрастов. Сексуальность и жизненная энергия — универсальная сила, и мои практики открыты для всех, кто чувствует готовность к трансформации.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="relative py-28" style={{ backgroundColor: "#FAF4EE" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Часто спрашивают
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 400,
              color: "#4A3F35",
            }}
          >
            Вопросы и ответы
          </motion.h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.07 }}
              style={{ boxShadow: "0 1px 0 rgba(212,175,55,0.15)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span
                  className="pr-4 leading-snug group-hover:opacity-70 transition-opacity duration-200"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "#4A3F35",
                  }}
                >
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: open === i ? "#4A3F35" : "rgba(193,164,169,0.15)",
                    boxShadow: open === i
                      ? "0 2px 8px rgba(74,63,53,0.2)"
                      : "inset 0 0 0 1px rgba(193,164,169,0.3)",
                  }}
                >
                  {open === i ? (
                    <Minus size={12} color="#F5EBE0" />
                  ) : (
                    <Plus size={12} color="#C1A4A9" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-5 leading-relaxed text-sm"
                      style={{
                        color: "#4A3F35",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        lineHeight: 1.8,
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-sm mb-4" style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
            Остался вопрос?
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("quiz");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 text-sm group cursor-pointer"
            style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif" }}
          >
            <span className="underline underline-offset-4 decoration-[#D4AF37] group-hover:opacity-70 transition-opacity">
              Записаться сейчас
            </span>
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
