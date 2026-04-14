"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const team = [
  {
    name: "Айя Велес",
    role: "Основатель · Мастер практик",
    experience: "30+ лет",
    specialty: "Тантра, телесные практики, ретриты",
    image: "/aya-main.jpg",
    accent: "#2E0A5A",
  },
  {
    name: "Место в команде",
    role: "Ведущий ретритов",
    experience: "10+ лет",
    specialty: "Телесные практики",
    image: "/team-plaseholder.jpg",
    accent: "#C1A4A9",
  },
  {
    name: "Место в команде",
    role: "Коуч",
    experience: "8+ лет",
    specialty: "Нейросоматика, ТОП",
    image: "/team-plaseholder.jpg",
    accent: "#D4AF37",
  },
  {
    name: "Место в команде",
    role: "Куратор программ",
    experience: "6+ лет",
    specialty: "Дыхательные практики",
    image: "/team-plaseholder.jpg",
    accent: "#C1A4A9",
  },
  {
    name: "Место в команде",
    role: "Ассистент мастера",
    experience: "5+ лет",
    specialty: "Энергетические практики",
    image: "/team-plaseholder.jpg",
    accent: "#2E0A5A",
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#F5EBE0" }}
    >
      {/* Subtle bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(46,10,90,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-3 tracking-[0.35em] text-xs uppercase"
          style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
        >
          Наша команда
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
          Проводники на пути
        </motion.h2>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-4 overflow-x-auto pb-6 px-6 lg:px-12 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {team.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
            className="flex-shrink-0 snap-start group cursor-default"
            style={{ width: i === 0 ? "320px" : "260px" }}
          >
            {/* Photo card */}
            <div
              className="relative overflow-hidden mb-4"
              style={{
                aspectRatio: i === 0 ? "3/4" : "4/5",
                borderRadius: "4px",
              }}
            >
              {/* Photo */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: i === 0 ? "saturate(0.95)" : `hue-rotate(${i * 20}deg) saturate(0.7)`,
                  maskImage:
                    "radial-gradient(ellipse 86% 90% at 50% 46%, black 50%, rgba(0,0,0,0.55) 70%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 86% 90% at 50% 46%, black 50%, rgba(0,0,0,0.55) 70%, transparent 100%)",
                }}
              />

              {/* Permanent gradient at bottom for text readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(74,63,53,0.85) 0%, rgba(74,63,53,0.2) 40%, transparent 65%)",
                }}
              />

              {/* Accent top border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: member.accent }}
              />

              {/* Info overlay — always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "rgba(212,175,55,0.9)", fontFamily: "'Inter', sans-serif" }}
                >
                  {member.experience}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: i === 0 ? "1.5rem" : "1.25rem",
                    fontWeight: 400,
                    color: "#FAF4EE",
                    lineHeight: 1.2,
                  }}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "rgba(237,217,200,0.8)", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  {member.role}
                </p>
              </div>

              {/* Specialty — shows on hover */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6"
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  backgroundColor: "rgba(46,10,90,0.6)",
                }}
              >
                <div className="text-center">
                  <div
                    className="w-10 h-px mx-auto mb-4"
                    style={{ backgroundColor: "#D4AF37" }}
                  />
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.1rem",
                      fontStyle: "italic",
                      color: "#FAF4EE",
                      lineHeight: 1.5,
                    }}
                  >
                    {member.specialty}
                  </p>
                  <div
                    className="w-10 h-px mx-auto mt-4"
                    style={{ backgroundColor: "#D4AF37" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-3 mt-6"
      >
        <div className="w-8 h-px" style={{ backgroundColor: "rgba(193,164,169,0.5)" }} />
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
        >
          Листайте
        </p>
        <div className="w-8 h-px" style={{ backgroundColor: "rgba(193,164,169,0.5)" }} />
      </motion.div>
    </section>
  );
}
