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
    dates: "1 мая",
    title: "АУМ. Первомайская перезагрузка",
    format: "Дыхательная практика",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "4 часа · 10:00–14:00",
    price: "1000–2300 ₽",
    priceNote: "1000₽ первые 10 · 1800₽ до 30.04 · 2300₽ с 1.05 · 4000₽ трое",
    category: "special",
    description:
      "Первомайская перезагрузка в формате АУМ. Мощная дыхательная практика для обновления, сброса накопленного напряжения и наполнения свежей энергией. Идеально, чтобы открыть май ресурсным и лёгким.",
  },
  {
    dates: "1 мая",
    title: "RELAX-PARTY «Пижамная вечеринка»",
    format: "Формат ГРАНИ 🔞 · Продвинутый уровень",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "5 часов · 18:00–23:00",
    price: "3900–4500 ₽",
    priceNote: "3900₽ до 27.04 · 4500₽ с 28.04 · 7500₽ для пары МЖ",
    category: "special",
    description:
      "Вечер с Айей Велес в атмосфере уюта и доверия. В программе: тантрические практики для знакомства и разогрева, МК по тантрическому массажу в парах, МК «Чувственный wax play» и массажная НЕОргия — свободные взаимодействия.",
  },
  {
    dates: "4, 11, 18, 25 мая",
    title: "Клуб ОбниМаГиЯ",
    format: "По понедельникам · 19:00–22:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "3 часа",
    price: "0 / от 1200 ₽",
    priceNote: "0₽ по клубной карте · 1200₽ разово · 3000₽/мес · 6000₽/3 мес",
    category: "free",
    description:
      "Тематические встречи клуба объятий и живого общения каждый понедельник. Приходи общаться, обниматься и чувствовать тепло живого контакта. Расписание тем — отдельно.",
  },
  {
    dates: "6, 13, 20, 27 мая",
    title: "Дыхание Жизни · Энергетическая среда",
    format: "Регулярные практики · Ср 19:30–21:30",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "2 часа",
    price: "1800 ₽",
    priceNote: "1800₽ разово · 6000₽ абонемент на 4 занятия",
    category: "special",
    description:
      "Транс-энергетическое «Дыхание Жизни» с Александром Галеевым (Шивананда) — регулярные практики каждую среду. После: Ритуал РАПЕ (медицина растений) 21:45–23:00 — 1000₽ (700₽ для участников Дыхания).",
  },
  {
    dates: "14 мая",
    title: "Лаборатория Отношений 5.0 — Запуск",
    format: "2-месячный живой курс · 19:00–23:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "Занятия по четвергам",
    price: "от 24 000 ₽",
    priceNote: "Поддержка Айи и группы 24/7",
    category: "special",
    description:
      "Старт живого офлайн-курса с Айей Велес. Глубинная работа с темой близости и отношений — для одиночных участников и пар. Занятия по четвергам, поддержка группы и Айи 24/7 на протяжении двух месяцев.",
  },
  {
    dates: "15 мая",
    title: "ГРАНИ в Темноте · Тайные Свидания 🔞",
    format: "Практика · 19:00–23:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "4 часа",
    price: "4900–5500 ₽",
    priceNote: "4900₽ до 5.05 · 5500₽ с 6.05 · Полная конфиденциальность",
    category: "retreat",
    description:
      "Практика в специально оборудованном помещении с полной темнотой и запретом на разговоры. Участники М и Ж не видят друг друга ни до, ни после и не знают, с кем взаимодействовали. Предполагает обнажение. Допуск только после других практик центра.",
  },
  {
    dates: "16–17 мая",
    title: "Исцеление Сексуальности · Тантрический массаж 2 модуль",
    format: "Курс 🔞 · 10:00–18:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "2 дня",
    price: "12 000–15 000 ₽",
    priceNote: "12000₽ полная оплата до 25.04 · 13000₽ до 30.04 · 15000₽ с 1.05",
    category: "tantra",
    description:
      "Второй модуль курса по тантрическому массажу с Айей Велес — продвинутый уровень. Исцеление сексуальности через телесные практики, работа с зажимами и раскрытие чувствительности.",
  },
  {
    dates: "23–24 мая",
    title: "12 Часов в Темноте · Выездной ретрит",
    format: "Ретрит с ночёвкой",
    location: "За городом",
    duration: "Заезд 23.05 в 9:00 · Выезд 24.05 в 12:00",
    price: "10 000–13 000 ₽",
    priceNote: "10000₽ только темнота (выезд 23.05) · 13000₽ темнота + баня + ночёвка + завтрак",
    category: "retreat",
    description:
      "Выездное погружение в темноту на 12 часов с Айей Велес. В программе: практики, обед, ужин, прогулки в темноте. 2 варианта участия: только темнота (14 мест) или темнота + баня, массаж, ночёвка и завтрак (10 мест). Подходит для новичков.",
  },
  {
    dates: "30–31 мая",
    title: "Тантра Энерджи · ЛЕТО ЖАРА",
    format: "2-дневный интенсив · 10:00–18:00",
    location: "Центр ВНЕ ИЗМЕРЕНИЙ",
    duration: "2 дня",
    price: "8888–9999 ₽",
    priceNote: "8888₽ первые 10 участников до 10.05 · 9999₽ для следующих",
    category: "tantra",
    description:
      "Городской 2-дневный интенсив с двумя мастерами — Айей Велес и Александром Галеевым (Шивананда). Поднимаем жизненную энергию и градус настроения, разжигаем страсть, пробуждаем сексуальность и чувствительность тела. Встречаем лето!",
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
            Май 2026
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
