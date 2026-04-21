"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const SHEETBEST_API = "https://api.sheetbest.com/sheets/YOUR_SHEET_ID";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Введите имя";
    if (!form.phone.trim()) e.phone = "Введите телефон";
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone.trim())) e.phone = "Неверный формат";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("loading");

    try {
      const response = await fetch(SHEETBEST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Дата: new Date().toLocaleString("ru-RU"),
          Имя: form.name,
          Телефон: form.phone,
          Сообщение: form.message,
        }),
      });

      if (!response.ok) throw new Error("API error");

      setFormState("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const inputStyle = (field: keyof typeof form) => ({
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "transparent",
    border: "1px solid",
    borderColor: errors[field] ? "#C1736A" : "#C1A4A9",
    color: "#4A3F35",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#4A3F35" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: "#C1A4A9" }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-3 tracking-[0.35em] text-xs uppercase"
              style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif" }}
            >
              Начать путь
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#F5EBE0",
              }}
            >
              Оставьте заявку — я свяжусь с вами в течение дня
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-10 text-sm leading-relaxed"
              style={{ color: "#EDD9C8", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Расскажите немного о себе и о том, что вас привело сюда. Я выслушаю и предложу
              подходящий формат работы.
            </motion.p>

            {/* Contact links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-4"
            >
              <a
                href="https://t.me/ayaveles"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ border: "1px solid rgba(193,164,169,0.3)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                      fill="#2CA5E0"
                    />
                  </svg>
                </div>
                <span
                  className="text-sm transition-colors duration-200 group-hover:text-white"
                  style={{ color: "#EDD9C8", fontFamily: "'Inter', sans-serif" }}
                >
                  Написать в Telegram
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} style={{ color: "#D4AF37" }} className="mb-4" />
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                    color: "#F5EBE0",
                  }}
                >
                  Заявка отправлена!
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "#EDD9C8", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  Я свяжусь с вами в течение дня.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-8 text-xs uppercase tracking-widest underline underline-offset-4 decoration-[#D4AF37]"
                  style={{ color: "#EDD9C8", fontFamily: "'Inter', sans-serif" }}
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя *"
                    value={form.name}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, name: e.target.value }));
                      setErrors((er) => ({ ...er, name: undefined }));
                    }}
                    style={inputStyle("name")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = errors.name ? "#C1736A" : "#D4AF37")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.name ? "#C1736A" : "#C1A4A9")
                    }
                  />
                  {errors.name && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "#C1736A", fontFamily: "'Inter', sans-serif" }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Телефон / Telegram *"
                    value={form.phone}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, phone: e.target.value }));
                      setErrors((er) => ({ ...er, phone: undefined }));
                    }}
                    style={inputStyle("phone")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = errors.phone ? "#C1736A" : "#D4AF37")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.phone ? "#C1736A" : "#C1A4A9")
                    }
                  />
                  {errors.phone && (
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "#C1736A", fontFamily: "'Inter', sans-serif" }}
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    placeholder="Расскажите о себе и своём запросе..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{
                      ...inputStyle("message"),
                      resize: "vertical",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                    onBlur={(e) => (e.target.style.borderColor = "#C1A4A9")}
                  />
                </div>

                {formState === "error" && (
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} style={{ color: "#C1736A" }} />
                    <p
                      className="text-xs"
                      style={{ color: "#C1736A", fontFamily: "'Inter', sans-serif" }}
                    >
                      Ошибка отправки. Пожалуйста, попробуйте позже или напишите в Telegram.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full flex items-center justify-center gap-3 py-4 text-sm uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "#4A3F35",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    opacity: formState === "loading" ? 0.7 : 1,
                  }}
                >
                  {formState === "loading" ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Отправить заявку
                    </>
                  )}
                </button>

                <p
                  className="text-center text-xs"
                  style={{ color: "rgba(237,217,200,0.5)", fontFamily: "'Inter', sans-serif" }}
                >
                  Нажимая «Отправить», вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
