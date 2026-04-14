"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

const taglineWords = ["Распакую", "твою", "сексуальность,", "верну", "яркость", "жизни!"];

function MagneticButton({
  children,
  href,
  className,
  style,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    btn.style.transition = "transform 0.1s ease";
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translate(0,0)";
      btnRef.current.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)";
    }
  };

  return (
    <a
      ref={btnRef}
      href={href || "#"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

/* Slowly floating ambient cloud */
function AmbientCloud({
  color,
  size,
  top,
  left,
  delay = 0,
  duration = 18,
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        top,
        left,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(200px)`,
        opacity: 0.35,
      }}
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.15, 0.92, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  /* Mouse parallax */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const contentX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const contentY = useTransform(smoothY, [-1, 1], [-8, 8]);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set((e.clientX / w) * 2 - 1);
      mouseY.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-bg.jpg"
          style={{ filter: "brightness(0.65) saturate(0.85)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(1.5px)",
            WebkitBackdropFilter: "blur(1.5px)",
            background:
              "linear-gradient(to bottom, rgba(44,28,20,0.5) 0%, rgba(44,28,20,0.2) 45%, rgba(44,28,20,0.75) 100%)",
          }}
        />
        <motion.div
          style={{ opacity: overlayOpacity, backgroundColor: "rgba(44,28,20,0.45)" }}
          className="absolute inset-0"
        />
      </div>

      {/* ── AMBIENT CLOUDS ── */}
      <AmbientCloud color="rgba(193,164,169,0.7)" size={600} top="5%" left="60%" delay={0} duration={20} />
      <AmbientCloud color="rgba(213,208,205,0.6)" size={450} top="55%" left="-5%" delay={5} duration={25} />
      <AmbientCloud color="rgba(193,164,169,0.5)" size={350} top="30%" left="30%" delay={10} duration={18} />

      {/* ── TEXT LAYER with mouse parallax ── */}
      <motion.div
        style={{ y: textY, x: contentX }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div style={{ y: contentY }} className="flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -200 }}
            animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex justify-center mb-7"
          >
            <Logo size={80} />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-5 tracking-[0.4em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Мастер телесных практик
          </motion.p>

          {/* Name — HUGE */}
          <div className="mb-5 overflow-hidden leading-none">
            {"Айя Велес".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "inline-block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3.8rem, 10vw, 9rem)",
                  fontWeight: 300,
                  color: "#FAF4EE",
                  letterSpacing: char === " " ? "0.15em" : "-0.02em",
                  whiteSpace: char === " " ? "pre" : undefined,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.9 }}
            className="mx-auto mb-6 h-px w-32 origin-center"
            style={{ backgroundColor: "#D4AF37", opacity: 0.65 }}
          />

          {/* Tagline — word by word with fog reveal */}
          <div
            className="mb-12 flex flex-wrap justify-center gap-x-3 gap-y-1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.3rem, 3vw, 2rem)",
              color: "#FAF4EE",
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.02em",
              lineHeight: 1.5,
            }}
          >
            {taglineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 1.0 + i * 0.12, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton
              href="#quiz"
              className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.18em] uppercase transition-all duration-300 group"
              style={{
                backgroundColor: "#D4AF37",
                color: "#2C1C14",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              <span>Начать трансформацию</span>
              <span
                className="w-5 h-px transition-all duration-300 group-hover:w-8"
                style={{ backgroundColor: "#2C1C14" }}
              />
            </MagneticButton>

            <MagneticButton
              href="#schedule"
              className="inline-flex items-center gap-3 px-10 py-4 text-sm tracking-[0.18em] uppercase transition-all duration-300"
              style={{
                backgroundColor: "rgba(250,244,238,0.08)",
                color: "#FAF4EE",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "inset 0 0 0 1px rgba(250,244,238,0.25), 0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              Расписание апреля
            </MagneticButton>
          </motion.div>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 2.2 }}
            className="mt-10 flex justify-center gap-6 text-xs tracking-widest uppercase"
            style={{ color: "rgba(193,164,169,0.75)", fontFamily: "'Inter', sans-serif" }}
          >
            <a href="https://t.me" target="_blank" rel="noopener" className="hover:text-[#FAF4EE] transition-colors">Telegram</a>
            <span style={{ color: "#D4AF37", opacity: 0.45 }}>·</span>
            <a href="https://vk.com" target="_blank" rel="noopener" className="hover:text-[#FAF4EE] transition-colors">VK</a>
            <span style={{ color: "#D4AF37", opacity: 0.45 }}>·</span>
            <a href="https://wa.me/79025002098" target="_blank" rel="noopener" className="hover:text-[#FAF4EE] transition-colors">WhatsApp</a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <ChevronDown size={22} style={{ color: "rgba(193,164,169,0.65)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
