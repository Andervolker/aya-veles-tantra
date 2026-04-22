"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Send, CheckCircle, AlertCircle } from "lucide-react";
import Logo from "./Logo";


type Step = 0 | 1 | 2 | 3;
type FormState = "idle" | "loading" | "success" | "error";

const step1Options = [
  { id: "feelings", label: "Трудно чувствовать и проявлять себя" },
  { id: "libido", label: "Снизилось либидо, нет интереса к жизни" },
  { id: "energy", label: "Выгорание, нехватка энергии" },
  { id: "body", label: "Потеря связи с телом и сексуальностью" },
  { id: "relation", label: "Сложности в отношениях или паре" },
  { id: "grow", label: "Хочу расти и раскрываться глубже" },
];

const step2Options = [
  { id: "group", label: "Групповые тренинги / события" },
  { id: "retreat", label: "Выездной ретрит" },
  { id: "personal", label: "Личная сессия или Индивидуальная практика" },
  { id: "tantra", label: "Тантрический массаж" },
  { id: "online", label: "Онлайн-формат" },
  { id: "any", label: "Подскажите сами" },
];

const step3Options = [
  { id: "now", label: "Время начать — уже сейчас" },
  { id: "month", label: "В течение месяца" },
  { id: "later", label: "Пока изучаю возможности" },
];

const stepTitles = [
  "Что привело вас сюда?",
  "Какой формат вам ближе?",
  "Когда готовы начать?",
  "Оставьте контакт",
];
const stepSubtitles = [
  "Выберите то, что откликается",
  "Можно выбрать несколько",
  "Это поможет мне предложить лучшее",
  "Я свяжусь с вами в течение дня",
];

export default function QuizContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState({ reason: "", format: "", timing: "" });
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const toggleOption = (field: keyof typeof answers, value: string) => {
    setAnswers((prev) => {
      const current = prev[field];
      const arr = current ? current.split(",").map((s) => s.trim()) : [];
      const idx = arr.indexOf(value);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(value);
      return { ...prev, [field]: arr.join(", ") };
    });
  };

  const isSelected = (field: keyof typeof answers, value: string) => {
    return answers[field].split(",").map((s) => s.trim()).includes(value);
  };

  const canContinue = (s: Step) => {
    if (s === 0) return answers.reason.length > 0;
    if (s === 1) return answers.format.length > 0;
    if (s === 2) return answers.timing.length > 0;
    return contact.name.trim().length > 0 && contact.phone.trim().length > 0;
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!contact.name.trim()) e.name = "Введите имя";
    if (!contact.phone.trim()) e.phone = "Введите телефон";
    else if (!/^\+?[\d\s\-()+]{7,}$/.test(contact.phone.trim())) e.phone = "Неверный формат";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setFormState("loading");
    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          reason: answers.reason,
          format: answers.format,
          timing: answers.timing,
        }),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const renderOptions = (
    options: { id: string; label: string }[],
    field: keyof typeof answers,
    single = false
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const selected = isSelected(field, opt.label);
        return (
          <button
            key={opt.id}
            onClick={() => {
              if (single) setAnswers((prev) => ({ ...prev, [field]: opt.label }));
              else toggleOption(field, opt.label);
            }}
            className="text-left px-4 py-3 text-sm transition-all duration-200"
            style={{
              border: "1px solid",
              borderColor: selected ? "#D4AF37" : "rgba(193,164,169,0.35)",
              backgroundColor: selected ? "rgba(212,175,55,0.15)" : "rgba(245,235,224,0.06)",
              color: selected ? "#FAF4EE" : "#EDD9C8",
              fontFamily: "'Inter', sans-serif",
              fontWeight: selected ? 500 : 300,
            }}
          >
            <span
              className="inline-block w-4 h-4 mr-2 rounded-sm border align-middle transition-all"
              style={{
                borderColor: selected ? "#D4AF37" : "#C1A4A9",
                backgroundColor: selected ? "#D4AF37" : "transparent",
                verticalAlign: "middle",
              }}
            />
            {opt.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      id="quiz"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#4A3F35" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 10% 50%, rgba(46,10,90,0.3) 0%, transparent 50%), radial-gradient(circle at 90% 50%, rgba(212,175,55,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Logo size={56} />
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
            Начните с трёх вопросов
          </h2>
        </motion.div>

        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <CheckCircle size={52} style={{ color: "#D4AF37", margin: "0 auto 1.5rem" }} />
            <h3
              className="mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 400,
                color: "#F5EBE0",
              }}
            >
              Запрос отправлен в пространство Айи
            </h3>
            <p
              className="text-sm mb-8"
              style={{ color: "#EDD9C8", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Айя свяжется с вами в течение дня через Telegram.
            </p>
            <a
              href="https://t.me/ayaveles_robot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-widest"
              style={{ backgroundColor: "#D4AF37", color: "#4A3F35", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
            >
              Написать в Telegram сейчас
            </a>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Progress */}
            <div className="flex gap-1.5 mb-8">
              {[0, 1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="flex-1 h-0.5 transition-all duration-500"
                  style={{
                    backgroundColor:
                      s < step ? "#D4AF37" : s === step ? "rgba(212,175,55,0.5)" : "rgba(193,164,169,0.2)",
                  }}
                />
              ))}
            </div>

            {/* Step content */}
            <div
              className="p-8 sm:p-10"
              style={{ backgroundColor: "rgba(245,235,224,0.06)", border: "1px solid rgba(193,164,169,0.15)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    className="mb-1 text-xs uppercase tracking-widest"
                    style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
                  >
                    Шаг {step + 1} из 4
                  </p>
                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.7rem",
                      fontWeight: 400,
                      color: "#F5EBE0",
                    }}
                  >
                    {stepTitles[step]}
                  </h3>
                  <p
                    className="mb-6 text-xs"
                    style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
                  >
                    {stepSubtitles[step]}
                  </p>

                  {step === 0 && renderOptions(step1Options, "reason")}
                  {step === 1 && renderOptions(step2Options, "format")}
                  {step === 2 && renderOptions(step3Options, "timing", true)}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Ваше имя *"
                          value={contact.name}
                          onChange={(e) => {
                            setContact((c) => ({ ...c, name: e.target.value }));
                            setErrors((er) => ({ ...er, name: undefined }));
                          }}
                          className="w-full px-4 py-3.5 text-sm outline-none transition-all"
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid",
                            borderColor: errors.name ? "#C1736A" : "rgba(193,164,169,0.5)",
                            color: "#F5EBE0",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                          onBlur={(e) =>
                            (e.target.style.borderColor = errors.name ? "#C1736A" : "rgba(193,164,169,0.5)")
                          }
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs" style={{ color: "#C1736A", fontFamily: "'Inter', sans-serif" }}>
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Телефон / Telegram *"
                          value={contact.phone}
                          onChange={(e) => {
                            setContact((c) => ({ ...c, phone: e.target.value }));
                            setErrors((er) => ({ ...er, phone: undefined }));
                          }}
                          className="w-full px-4 py-3.5 text-sm outline-none transition-all"
                          style={{
                            backgroundColor: "transparent",
                            border: "1px solid",
                            borderColor: errors.phone ? "#C1736A" : "rgba(193,164,169,0.5)",
                            color: "#F5EBE0",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                          onBlur={(e) =>
                            (e.target.style.borderColor = errors.phone ? "#C1736A" : "rgba(193,164,169,0.5)")
                          }
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs" style={{ color: "#C1736A", fontFamily: "'Inter', sans-serif" }}>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {formState === "error" && (
                        <div className="flex items-center gap-2">
                          <AlertCircle size={15} style={{ color: "#C1736A" }} />
                          <p className="text-xs" style={{ color: "#C1736A", fontFamily: "'Inter', sans-serif" }}>
                            Ошибка отправки. Напишите напрямую в Telegram.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                  style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
                >
                  ← Назад
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => canContinue(step) && setStep((s) => (s + 1) as Step)}
                  disabled={!canContinue(step)}
                  className="flex items-center gap-2 px-7 py-3 text-xs uppercase tracking-widest transition-all"
                  style={{
                    backgroundColor: canContinue(step) ? "#D4AF37" : "rgba(193,164,169,0.2)",
                    color: canContinue(step) ? "#4A3F35" : "rgba(193,164,169,0.5)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    cursor: canContinue(step) ? "pointer" : "not-allowed",
                  }}
                >
                  Далее
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canContinue(3) || formState === "loading"}
                  className="flex items-center gap-2 px-7 py-3 text-xs uppercase tracking-widest transition-all"
                  style={{
                    backgroundColor:
                      canContinue(3) && formState !== "loading"
                        ? "#D4AF37"
                        : "rgba(193,164,169,0.2)",
                    color:
                      canContinue(3) && formState !== "loading"
                        ? "#4A3F35"
                        : "rgba(193,164,169,0.5)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {formState === "loading" ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Отправить
                    </>
                  )}
                </button>
              )}
            </div>

            <p
              className="text-center text-xs mt-5 leading-relaxed"
              style={{ color: "rgba(193,164,169,0.45)", fontFamily: "'Inter', sans-serif", maxWidth: 360, margin: "20px auto 0" }}
            >
              Нажимая на кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь с{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C1A4A9", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Политикой конфиденциальности
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
