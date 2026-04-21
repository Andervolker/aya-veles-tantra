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
    dates: "1 апреля",
    title: "Йога + Дыхание жизни",
    format: "Два события",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "Утро и вечер",
    price: "900 / 1800 ₽",
    priceNote: "Йога 900₽ · Дыхание 1800₽",
    category: "special",
    description:
      "Утреннее занятие по йоге для восстановления тела и вечерняя дыхательная практика «Дыхание жизни» — погружение в ресурсное состояние через работу с дыханием.",
  },
  {
    dates: "4–5 апреля",
    title: "Тантрический массаж",
    format: "Личная сессия",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "2 дня",
    price: "от 10 000 ₽",
    category: "tantra",
    description:
      "Индивидуальные сессии тантрического массажа — работа с телесными зажимами, восстановление чувствительности, раскрытие сексуальной энергии.",
  },
  {
    dates: "6 апреля",
    title: "Клуб ОбниМаГии",
    format: "Групповая встреча",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "3 часа",
    price: "0–5000 ₽",
    priceNote: "Свободное пожертвование",
    category: "special",
    description:
      "Особенное пространство тактильной близости и тепла. Практики объятий, контакта и присутствия. Подходит для всех — вне зависимости от опыта.",
  },
  {
    dates: "11 апреля",
    title: "День открытых дверей",
    format: "Бесплатное событие",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "4 часа",
    price: "Бесплатно",
    category: "free",
    description:
      "Открытое знакомство с пространством и практиками. Узнайте, как проходят занятия, задайте вопросы, почувствуйте атмосферу ВНЕ ИЗМЕРЕНИЙ.",
  },
  {
    dates: "12 апреля",
    title: "Энерджи-перезагрузка",
    format: "Интенсив",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "5 часов",
    price: "4500–8000 ₽",
    priceNote: "В зависимости от формата",
    category: "special",
    description:
      "Интенсивная программа восстановления жизненной энергии. Дыхание, телесные практики, медитация. Выход из состояния усталости и выгорания.",
  },
  {
    dates: "15 апреля",
    title: "Лаборатория отношений",
    format: "Тренинг",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "1 день",
    price: "от 24 000 ₽",
    category: "special",
    description:
      "Глубинная работа с темой близости и отношений. Для одиночных участников и пар. Работа с паттернами, страхами, желаниями и новыми возможностями.",
  },
  {
    dates: "17–19 апреля",
    title: "Ретрит ГРАНИ",
    format: "Выездной ретрит",
    location: "За городом",
    duration: "3 дня / 2 ночи",
    price: "16 000–18 000 ₽",
    priceNote: "Проживание включено",
    category: "retreat",
    description:
      "Трансформационный ретрит «ГРАНИ» — три дня практик на природе. Исследование границ: тела, чувств, себя. Тантра, ОШО-практики, дыхание и групповая работа.",
  },
  {
    dates: "24 апреля",
    title: "Тантра Баланс",
    format: "Практикум",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "4 часа",
    price: "3000–3500 ₽",
    category: "tantra",
    description:
      "Практика балансировки мужской и женской энергии внутри себя. Подходит для всех полов. Восстановление внутреннего равновесия и гармонии.",
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
            Апрель 2025
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
                              href="https://max.ru/u/f9LHodD0cOKyBKlPXKXMzQGtLCEkTa__mY4zoVtVwGbS0mAInyO_1Obq598"
                              target="_blank"
                              rel="noopener noreferrer"
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
