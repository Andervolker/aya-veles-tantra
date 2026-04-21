"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MapPin, Heart, Zap, Star } from "lucide-react";

const formats = [
  {
    icon: Users,
    tag: "Группы офлайн",
    title: "Тренинги и курсы",
    description:
      "Групповые офлайн-тренинги и курсы — от однодневных встреч до двухмесячных программ. Работа в группе даёт уникальную динамику и поддержку сообщества.",
    features: ["1 день — 2 месяца", "Екатеринбург, центр ВНЕ ИЗМЕРЕНИЙ", "До 20 участников"],
    accentColor: "#C1A4A9",
  },
  {
    icon: MapPin,
    tag: "Природа и погружение",
    title: "Ретриты",
    description:
      "Выездные трансформационные ретриты (2–5 дней) вдали от города. Тело раскрывается через природу, тишину, практики и групповое поле.",
    features: ["2–5 дней", "Екатеринбург, природные базы", "Малые группы"],
    accentColor: "#D4AF37",
    featured: true,
  },
  {
    icon: Heart,
    tag: "Личная работа",
    title: "Тантрические сессии",
    description:
      "Индивидуальные сессии, включая погружения до 3 дней. Глубокая работа один на один — с телом, энергией, историей и потенциалом.",
    features: ["Одиночные и длинные", "В т.ч. погружения 3 дня", "Конфиденциально"],
    accentColor: "#C1A4A9",
  },
  {
    icon: Zap,
    tag: "Сексуальность",
    title: "Индивидуальная практика",
    description:
      "Индивидуальная работа и коучинг для пар. Раскрытие сексуального потенциала, работа с блоками, улучшение близости и связи.",
    features: ["Индивидуально & для пар", "Онлайн & офлайн", "Сопровождение"],
    accentColor: "#A5B4A3",
  },
  {
    icon: Star,
    tag: "Интенсивы",
    title: "Специальные форматы",
    description:
      "Дыхательные практики, тантра-баланс, лаборатория отношений, энерджи-перезагрузка, клуб ОбниМаГии и другие авторские форматы.",
    features: ["Разная длительность", "Тематические встречи", "Для всех уровней"],
    accentColor: "#9B8FC0",
  },
];

export default function Formats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="formats"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#28201A" }}
    >
      {/* Ambient blurs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(193,164,169,0.15) 0%, transparent 70%)",
          filter: "blur(200px)",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)",
          filter: "blur(200px)",
        }}
        animate={{ x: [0, -30, 15, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 10 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-3 tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Форматы работы
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 300,
              color: "#FAF4EE",
              letterSpacing: "-0.02em",
            }}
          >
            Найди свой формат
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-sm"
            style={{ color: "rgba(237,217,200,0.6)", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            Работаю с людьми любых полов и возрастов. Основное направление —
            СЕКСУАЛЬНОСТЬ и сексуальная энергия как источник жизненной силы.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formats.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                className="relative p-8 group cursor-default transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: f.featured
                    ? "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)"
                    : "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: f.featured
                    ? "0 20px 60px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {f.featured && (
                  <div
                    className="absolute -top-3 left-8 px-3 py-1 text-xs tracking-widest uppercase"
                    style={{
                      backgroundColor: "#D4AF37",
                      color: "#28201A",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Флагман
                  </div>
                )}

                <div className="mb-5">
                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4 rounded-sm"
                    style={{ backgroundColor: `${f.accentColor}22`, border: `1px solid ${f.accentColor}44` }}
                  >
                    <Icon size={18} color={f.accentColor} />
                  </div>
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: f.accentColor, fontFamily: "'Inter', sans-serif" }}
                  >
                    {f.tag}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.65rem",
                      fontWeight: 300,
                      color: "#FAF4EE",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {f.title}
                  </h3>
                </div>

                <p
                  className="mb-5 text-sm leading-relaxed"
                  style={{ color: "rgba(237,217,200,0.7)", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  {f.description}
                </p>

                <ul className="space-y-1.5 mb-7">
                  {f.features.map((feat, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "rgba(237,217,200,0.5)", fontFamily: "'Inter', sans-serif" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: f.accentColor }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://max.ru/u/f9LHodD0cOKyBKlPXKXMzQGtLCEkTa__mY4zoVtVwGbS0mAInyO_1Obq598"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-all duration-300 group-hover:gap-3"
                  style={{ color: "#FAF4EE", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
                >
                  <span className="underline underline-offset-4" style={{ textDecorationColor: f.accentColor }}>
                    Записаться
                  </span>
                  <span>→</span>
                </a>

                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{ backgroundColor: f.accentColor, opacity: 0.5 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
