"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Logo from "./Logo";

const TelegramIcon = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="12" fill="url(#tg-grad)" />
    <defs>
      <linearGradient id="tg-grad" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#40B3E0" />
        <stop offset="1" stopColor="#1A8FC1" />
      </linearGradient>
    </defs>
    {/* Paper plane */}
    <path
      d="M10.5 21.8L32 13.5l-3.8 17.2-5.6-4.1-2.7 2.6.5-5.8 9.5-9-11.2 7.7-4.3-1.3z"
      fill="white"
      opacity="0.95"
    />
  </svg>
);

const VKIcon = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="12" fill="url(#vk-grad)" />
    <defs>
      <linearGradient id="vk-grad" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5181B8" />
        <stop offset="1" stopColor="#3A6499" />
      </linearGradient>
    </defs>
    {/* VK logo path */}
    <path
      d="M23.1 28.5h1.9c0 0 .6-.1.9-.4.3-.3.3-.8.3-.8s0-2.4 1.1-2.8c1.1-.3 2.5 2.3 4 3.3.4.3.7.4.7.4l3.5-.1s1.8-.1.9-1.5c-.1-.1-.5-.9-2.5-2.8-2.1-1.9-1.8-1.6.7-5 1.6-2.1 2.2-3.4 2-4-.2-.5-1.4-.4-1.4-.4l-3.9.1s-.3 0-.5.1c-.2.1-.3.4-.3.4s-.6 1.5-1.3 2.8c-1.6 2.7-2.2 2.9-2.5 2.7-.6-.4-.4-1.7-.4-2.6 0-2.8.4-4-.8-4.3-.4-.1-.7-.2-1.8-.2-1.4 0-2.5.1-3.2.4-.4.2-.8.6-.6.7.3 0 .9.2 1.2.6.4.6.4 1.9.4 1.9s.2 3.3-.6 3.7c-.5.3-1.3-.3-2.9-2.9-.7-1.3-1.3-2.7-1.3-2.7s-.1-.3-.3-.5c-.2-.2-.6-.2-.6-.2l-3.7.1s-.6 0-.8.3c-.2.2 0 .7 0 .7s2.9 6.8 6.2 10.3c3 3.1 6.5 2.9 6.5 2.9z"
      fill="white"
    />
  </svg>
);

const MaxIcon = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="12" fill="url(#max-grad)" />
    <defs>
      <linearGradient id="max-grad" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A78BFA" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    {/* Chat bubble with M */}
    <path
      d="M22 11c-6.1 0-11 4.4-11 9.8 0 2.8 1.2 5.3 3.2 7.1L13 31.5l4.5-1.8c1.4.5 3 .8 4.5.8 6.1 0 11-4.4 11-9.8S28.1 11 22 11z"
      fill="white"
      opacity="0.95"
    />
    <path
      d="M17 18.5v5l1.8-2.2 1.8 1.8 1.8-1.8 1.8 2.2v-5l-1.8 2.2-1.8-1.8-1.8 1.8-1.8-2.2z"
      fill="#7C3AED"
    />
  </svg>
);

const communities = [
  {
    id: "tg-channel",
    platform: "Telegram",
    label: "Вступить в Telegram",
    description: "Канал ВНЕ ИЗМЕРЕНИЙ",
    handle: "@VNEIZMERENIY",
    href: "https://t.me/VNEIZMERENIY",
    icon: TelegramIcon,
    accent: "#2CA5E0",
  },
  {
    id: "max-channel",
    platform: "Max",
    label: "Вступить в Max",
    description: "Канал Айи Велес",
    handle: "@ayaveles",
    href: "https://max.ru/u/f9LHodD0cOKyBKlPXKXMzQGtLCEkTa__mY4zoVtVwGbS0mAInyO_1Obq598",
    icon: MaxIcon,
    accent: "#8B5CF6",
  },
  {
    id: "vk-channel",
    platform: "ВКонтакте",
    label: "Вступить ВКонтакте",
    description: "Сообщество Айи Велес",
    handle: "vk.com/ayaveles",
    href: "https://vk.com/ayaveles",
    icon: VKIcon,
    accent: "#5181B8",
  },
];

const personal = [
  {
    id: "tg-dm",
    platform: "Telegram",
    label: "Написать в Telegram",
    description: "Личные сообщения",
    handle: "@ayaveles",
    href: "https://t.me/ayaveles",
    icon: TelegramIcon,
    accent: "#2CA5E0",
  },
  {
    id: "max-dm",
    platform: "Max",
    label: "Написать в Max",
    description: "Личные сообщения",
    handle: "@ayaveles",
    href: "https://max.ru/u/f9LHodD0cOKyBKlPXKXMzQGtLCEkTa__mY4zoVtVwGbS0mAInyO_1Obq598",
    icon: MaxIcon,
    accent: "#8B5CF6",
  },
  {
    id: "vk-dm",
    platform: "ВКонтакте",
    label: "Написать ВКонтакте",
    description: "Личные сообщения",
    handle: "ayaveles",
    href: "https://vk.com/im?sel=ayaveles",
    icon: VKIcon,
    accent: "#5181B8",
  },
];

function ContactCard({
  item,
  delay,
}: {
  item: (typeof communities)[number];
  delay: number;
}) {
  const Icon = item.icon;
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-4 px-5 py-4 group transition-all duration-300"
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(193,164,169,0.1)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = `${item.accent}12`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)";
      }}
    >
      {/* App-style icon */}
      <div className="flex-shrink-0 drop-shadow-md">
        <Icon size={44} />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm leading-tight mb-0.5"
          style={{ color: "#F5EBE0", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
        >
          {item.label}
        </p>
        <p
          className="text-xs"
          style={{ color: "rgba(193,164,169,0.65)", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
        >
          {item.handle}
        </p>
      </div>

      <div
        className="flex-shrink-0 flex items-center justify-center w-8 h-8 transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${item.accent}22`,
          border: `1px solid ${item.accent}44`,
        }}
      >
        <span style={{ color: item.accent, fontSize: "13px", lineHeight: 1 }}>→</span>
      </div>
    </motion.a>
  );
}

export default function Contacts() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="contacts"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#4A3F35" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 10% 50%, rgba(46,10,90,0.25) 0%, transparent 50%), radial-gradient(circle at 90% 50%, rgba(212,175,55,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-6">
            <Logo size={52} />
          </div>
          <p
            className="mb-3 tracking-[0.35em] text-xs uppercase"
            style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
          >
            Записаться
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "#F5EBE0",
            }}
          >
            Выберите удобный способ связи
          </h2>
          <p
            className="mt-4 text-sm"
            style={{
              color: "rgba(237,217,200,0.6)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            Айя ответит в течение дня
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Communities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p
              className="mb-4 text-xs uppercase tracking-[0.3em]"
              style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
            >
              Сообщества
            </p>
            <div
              style={{
                border: "1px solid rgba(212,175,55,0.18)",
                backgroundColor: "rgba(30,20,14,0.3)",
                overflow: "hidden",
              }}
            >
              {communities.map((item, i) => (
                <ContactCard key={item.id} item={item} delay={0.2 + i * 0.08} />
              ))}
            </div>
          </motion.div>

          {/* Personal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <p
              className="mb-4 text-xs uppercase tracking-[0.3em]"
              style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
            >
              Написать лично
            </p>
            <div
              style={{
                border: "1px solid rgba(193,164,169,0.18)",
                backgroundColor: "rgba(30,20,14,0.3)",
                overflow: "hidden",
              }}
            >
              {personal.map((item, i) => (
                <ContactCard key={item.id} item={item} delay={0.3 + i * 0.08} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-1"
            style={{ color: "rgba(193,164,169,0.5)", fontFamily: "'Inter', sans-serif" }}
          >
            Адрес пространства
          </p>
          <p
            className="text-sm"
            style={{ color: "rgba(237,217,200,0.65)", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            Екатеринбург · ул. Малышева 71а
          </p>
        </motion.div>
      </div>
    </section>
  );
}
