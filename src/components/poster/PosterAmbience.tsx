"use client";

import { motion } from "framer-motion";

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
        filter: "blur(200px)",
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

export default function PosterAmbience() {
  return (
    <div
      className="poster-ambience pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <AmbientCloud color="rgba(193,164,169,0.7)" size={600} top="5%" left="60%" delay={0} duration={20} />
      <AmbientCloud color="rgba(213,208,205,0.6)" size={450} top="55%" left="-5%" delay={5} duration={25} />
      <AmbientCloud color="rgba(193,164,169,0.5)" size={350} top="30%" left="30%" delay={10} duration={18} />
      <AmbientCloud color="rgba(237,217,200,0.55)" size={400} top="70%" left="45%" delay={2} duration={22} />
    </div>
  );
}
