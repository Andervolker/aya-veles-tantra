"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";

type Event = {
  dates: string;
  title: string;
  format: string;
  location: string;
  duration: string;
  price: string;
  priceNote?: string;
  category: "tantra" | "retreat" | "special" | "free";
  description: string;
};

const events: Event[] = [
  {
    dates: "1, 8, 15, 22, 29 июня",
    title: "Клуб ОбниМаГиЯ",
    format: "По понедельникам · 19:00–22:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "3 часа",
    price: "от 500 / 1200 ₽",
    priceNote: "500₽ по клубной карте · 1200₽ разово · вступи в клуб @ObnimagiyaEKB",
    category: "free",
    description:
      "Тематические встречи клуба объятий и живого общения каждый понедельник во ВНЕ ИЗМЕРЕНИЙ. Приходи общаться, обниматься и чувствовать тепло живого контакта — хоть каждый понедельник.",
  },
  {
    dates: "3, 10, 17, 24 июня",
    title: "Дыхание Жизни · Энергетическая среда",
    format: "Регулярные практики · Ср 19:30–21:30",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "2 часа",
    price: "3600 ₽",
    priceNote: "3600₽ разово · 10000₽ абонемент на 4 занятия · РАПЕ 21:45–23:00 — 1000₽ (700₽ для участников Дыхания)",
    category: "special",
    description:
      "⚡️ Энергетическая среда — регулярные практики по средам с Александром Галеевым (Шивананда). Транс-энергетическое «Дыхание Жизни». После: Ритуал РАПЕ (медицина растений) 21:45–23:00.",
  },
  {
    dates: "6 июня",
    title: "ЛИЛА на большом поле",
    format: "С Иваном Малковым (Казань) · 12:00–20:30",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "8,5 часов",
    price: "7000 ₽",
    priceNote: "Магическая дата 06.06.2026 · осталось 5 мест из 7",
    category: "special",
    description:
      "В магическую дату 06.06.2026 играем в магическую игру ЛИЛА на большом поле с Иваном Малковым из Казани. Количество мест ограничено.",
  },
  {
    dates: "9 июня",
    title: "Тантра · Дегустация",
    format: "Открытый вечер · 19:00–22:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "3 часа",
    price: "1500–3000 ₽",
    priceNote: "1500₽ до 31.05 · 2000₽ с 1.06 · 3000₽ для пары МЖ",
    category: "tantra",
    description:
      "Попробуй тантру на вкус — открытый вечер тантрических практик с Айей Велес. Для знакомства с пространством и мягкого погружения.",
  },
  {
    dates: "19 июня",
    title: "DREAM-PARTY «Пижамная вечеринка»",
    format: "Формат ГРАНИ 🔞 · 19:00–23:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "4 часа",
    price: "2500–5000 ₽",
    priceNote: "2500₽ до 10.06 · 3000₽ с 11.06 · 5000₽ для пары МЖ",
    category: "special",
    description:
      "«Пижамная вечеринка» с Айей Велес. В программе: тантрические практики для знакомства и разогрева, массажная НЕОргия (свободные взаимодействия), тантрический шиповник.",
  },
  {
    dates: "25 июня",
    title: "Мужчина · Женщина. Любовь. Секс. Деньги",
    format: "Тантрический тренинг · 19:00–23:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "4 часа",
    price: "3000–3500 ₽",
    priceNote: "Продвинутый уровень",
    category: "tantra",
    description:
      "Тантрический тренинг с Айей Велес — продвинутый уровень. Глубинная работа с темами любви, сексуальности и денежного потока в паре и в себе.",
  },
  {
    dates: "26–28 июня",
    title: "СОЗЕРЦАЯ ЛЮБОВЬ · Выездной ретрит",
    format: "Тантрический ретрит · 3 дня",
    location: "Ретритный центр «Изумрудный Город»",
    duration: "Заезд 26.06 в 16:00 · Выезд 28.06 в 16:00",
    price: "от 15 555 ₽",
    priceNote: "15555₽ до 5.06 · бронь 5555₽ (невозвратная) · 18000₽ с 6.06",
    category: "retreat",
    description:
      "Выездной тантрический ретрит с Айей Велес в сказочном лесу. Большой зал с видом на водоём, баня на сваях в воде, вкусное питание, комфортное проживание. Мягкие и глубокие практики на исцеление сердца и соединение со своей природной сексуальностью.",
  },
];

const catColors: Record<string, string> = {
  tantra: "#2E0A5A",
  retreat: "#C1A4A9",
  special: "#D4AF37",
  free: "#8B9E8A",
};
const catLabels: Record<string, string> = {
  tantra: "Тантра",
  retreat: "Ретрит",
  special: "Событие",
  free: "Бесплатно",
};

export default function Schedule() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = filter === "all" ? events : events.filter((e) => e.category === filter);
  const filters = ["all", "tantra", "retreat", "special", "free"];
  const filterLabels: Record<string, string> = {
    all: "Все",
    tantra: "Тантра",
    retreat: "Ретриты",
    special: "События",
    free: "Бесплатно",
  };

  return (
    <section id="schedule" ref={ref} className="relative py-28" style={{ backgroundColor: "#F5EBE0" }}>
      <div
        className="absolute top-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Июнь 2026
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
            Расписание мероприятий
          </motion.h2>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setExpanded(null); }}
              className="px-5 py-2 text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: filter === f ? "#4A3F35" : "transparent",
                color: filter === f ? "#F5EBE0" : "#4A3F35",
                border: "1px solid",
                borderColor: filter === f ? "#4A3F35" : "#C1A4A9",
              }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </motion.div>

        {/* Events */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((ev, i) => (
              <motion.div
                key={ev.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <div
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: expanded === i
                      ? "rgba(255,255,255,0.72)"
                      : "rgba(255,255,255,0.48)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: expanded === i
                      ? `0 8px 40px rgba(74,63,53,0.1), 0 2px 8px rgba(74,63,53,0.06), inset 0 1px 0 rgba(255,255,255,0.9)`
                      : "0 4px 20px rgba(74,63,53,0.06), 0 1px 4px rgba(74,63,53,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
                  }}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {/* Row */}
                  <div className="flex items-center gap-3 sm:gap-5 p-4 sm:p-5">
                    {/* Date */}
                    <div
                      className="flex-shrink-0 text-center min-w-[52px]"
                      style={{ borderRight: "1px solid rgba(193,164,169,0.25)", paddingRight: "1rem" }}
                    >
                      <Calendar size={13} style={{ color: "#C1A4A9", margin: "0 auto 4px" }} />
                      <span
                        className="block text-xs font-medium leading-tight"
                        style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif" }}
                      >
                        {ev.dates.includes("–") ? ev.dates.split("–")[0] + "–" : ev.dates.split(" ")[0]}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span
                          className="px-2 py-0.5 text-xs"
                          style={{
                            backgroundColor: catColors[ev.category],
                            color: "#FAF4EE",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {catLabels[ev.category]}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.15rem",
                          fontWeight: 500,
                          color: "#4A3F35",
                        }}
                      >
                        {ev.title}
                      </h3>
                    </div>

                    <div className="hidden sm:block flex-shrink-0 text-right">
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.2rem",
                          fontWeight: 500,
                          color: "#4A3F35",
                        }}
                      >
                        {ev.price}
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      style={{
                        color: "#C1A4A9",
                        transform: expanded === i ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Expanded */}
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 pb-5 pt-3"
                          style={{ borderTop: "1px solid rgba(193,164,169,0.2)" }}
                        >
                          <p
                            className="text-sm leading-relaxed mb-4"
                            style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                          >
                            {ev.description}
                          </p>
                          <div className="flex flex-wrap gap-4 mb-4 text-xs" style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}>
                            <span className="flex items-center gap-1">
                              <MapPin size={11} />
                              {ev.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} />
                              {ev.duration}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="sm:hidden">
                              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#4A3F35", fontWeight: 500 }}>
                                {ev.price}
                              </span>
                              {ev.priceNote && (
                                <span className="ml-2 text-xs" style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}>
                                  {ev.priceNote}
                                </span>
                              )}
                            </div>
                            {ev.priceNote && (
                              <span className="hidden sm:inline text-xs" style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}>
                                {ev.priceNote}
                              </span>
                            )}
                            <a
                              href="#contacts"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center px-6 py-2.5 text-xs uppercase tracking-widest transition-all hover:opacity-90"
                              style={{
                                backgroundColor: "#4A3F35",
                                color: "#F5EBE0",
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              Записаться
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
