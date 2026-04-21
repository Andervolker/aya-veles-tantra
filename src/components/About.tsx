"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timeline = [
  { year: "С 15 лет", text: "Открылся дар исцеления через прикосновения и общение" },
  { year: "С 28 лет", text: "После клинической смерти — переосмысление жизни, работа через телесные практики, интуитивный массаж, дыхание и ТАРО" },
  { year: "Март 2021", text: "В жизнь пришла ТАНТРА. В мае — первая групповая тантрическая встреча. Появляется имя Айя Велес" },
  { year: "Сент. 2021", text: "Обучение на инструктора ОШО-практик" },
  { year: "Дек. 2021", text: "Создание пространства телесных и духовных практик ВНЕ ИЗМЕРЕНИЙ" },
  { year: "2022", text: "Освоение метода ТОП — телесно-ориентированной психотерапии" },
  { year: "2023", text: "Обучение интегративной сексологии" },
];

const stats = [
  { value: "30+", label: "лет телесных практик" },
  { value: "5+", label: "лет в ТАНТРЕ" },
  { value: "500+", label: "трансформаций" },
];

function FogReveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const tlInView = useInView(tlRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF4EE" }}
    >
      {/* Ambient clouds */}
      <motion.div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(193,164,169,0.45) 0%, transparent 70%)",
          filter: "blur(200px)",
        }}
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(213,208,205,0.4) 0%, transparent 70%)",
          filter: "blur(200px)",
        }}
        animate={{ x: [0, -20, 25, 0], y: [0, 20, -10, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
          filter: "blur(200px)",
        }}
        animate={{ x: [0, 15, -25, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 12 }}
      />

      {/* ── TOP SECTION: big overlapping title + photo ── */}
      <div className="relative pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            О мастере
          </motion.p>
        </div>

        {/* EDITORIAL OVERLAP LAYOUT */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-0 items-start">
            {/* ── PHOTO COLUMN ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative z-10"
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", maxWidth: 460 }}
              >
                <img
                  src="/aya-main.jpg"
                  alt="Айя Велес — мастер телесных практик"
                  className="w-full h-full object-cover object-top"
                  style={{
                    filter: "saturate(0.9) contrast(1.04)",
                    maskImage:
                      "radial-gradient(circle, black 40%, rgba(0,0,0,0) 80%)",
                    WebkitMaskImage:
                      "radial-gradient(circle, black 40%, rgba(0,0,0,0) 80%)",
                  }}
                />
                {/* Bottom vignette + name tag */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(74,63,53,0.5) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="w-8 h-px mb-3" style={{ backgroundColor: "#D4AF37" }} />
                  <p
                    className="text-xs uppercase tracking-[0.3em]"
                    style={{ color: "rgba(237,217,200,0.9)", fontFamily: "'Inter', sans-serif" }}
                  >
                    Мастер практик
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mt-7 max-w-[460px]"
              >
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="text-center py-4"
                    style={{ boxShadow: "0 -1px 0 rgba(212,175,55,0.2)" }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "2rem",
                        fontWeight: 300,
                        color: "#D4AF37",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="mt-1 text-xs uppercase tracking-widest leading-tight"
                      style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── TEXT COLUMN with overlapping big name ── */}
            <div className="lg:pl-8 lg:-ml-16 z-20 relative pt-12 lg:pt-24">
              {/* BIG overlapping name — editorial centrepiece */}
              <motion.div
                initial={{ opacity: 0, x: 40, filter: "blur(16px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="leading-none mb-6 select-none"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                  fontWeight: 300,
                  color: "#4A3F35",
                  letterSpacing: "-0.03em",
                }}
              >
                Айя
                <br />
                <span style={{ color: "#C1A4A9", fontStyle: "italic" }}>Велес</span>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mb-7 tracking-[0.3em] text-xs uppercase"
                style={{ color: "#8B735B", fontFamily: "'Inter', sans-serif" }}
              >
                Мастер телесных практик · Тантра · ОШО · Сексология
              </motion.p>

              <FogReveal delay={0.4}>
                <div
                  className="space-y-4 text-sm leading-loose"
                  style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  <p>
                    Я Айя Велес — мастер телесных практик с тантрическим уклоном, инструктор
                    ОШО, интегративный сексолог. Работаю с людьми{" "}
                    <strong style={{ fontWeight: 500 }}>любого пола и возраста</strong> — потому
                    что сексуальность и жизненная энергия универсальны.
                  </p>
                  <p>
                    В 15 лет открылся дар исцеления через прикосновения. В 28 — клиническая смерть
                    открыла связь с тонкими мирами и дала новое понимание тела и сознания.
                  </p>
                  <p>
                    В 2021 году в практику пришла ТАНТРА — и всё изменилось. Сегодня пространство{" "}
                    <strong style={{ fontWeight: 500, color: "#C1A4A9" }}>ВНЕ ИЗМЕРЕНИЙ</strong>{" "}
                    соединяет тантру, ТОП, ОШО-практики, дыхательные техники и интегративную
                    сексологию в единую систему трансформации.
                  </p>
                  <p>
                    Основное направление:{" "}
                    <strong style={{ fontWeight: 500 }}>
                      СЕКСУАЛЬНОСТЬ и сексуальная энергия как источник жизненной силы
                    </strong>
                    . Раскрытие потенциала для улучшения качества и продолжительности жизни.
                  </p>
                </div>

                <div className="mt-9 flex items-center gap-5">
                  <a
                    href="https://max.ru/u/f9LHodD0cOKyBKlPXKXMzQGtLCEkTa__mY4zoVtVwGbS0mAInyO_1Obq598"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 text-sm group"
                    style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="underline underline-offset-4 decoration-[#D4AF37]">
                      Записаться на личную сессию
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(193,164,169,0.5)" }} />
                  <a
                    href="https://wa.me/79025002098"
                    target="_blank"
                    rel="noopener"
                    className="hidden sm:inline-flex items-center gap-2 text-sm"
                    style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="hover:text-[#4A3F35] transition-colors">WhatsApp</span>
                  </a>
                </div>
              </FogReveal>
            </div>
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div ref={tlRef} className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={tlInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />
          <p
            className="tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Путь
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(212,175,55,0.2)" }} />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={tlInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="p-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 4px 24px rgba(74,63,53,0.06), 0 1px 4px rgba(74,63,53,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
                borderLeft: "2px solid rgba(212,175,55,0.35)",
              }}
            >
              <span
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}
              >
                {item.year}
              </span>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#4A3F35", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
