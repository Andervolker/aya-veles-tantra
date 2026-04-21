"use client";

import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-16" style={{ backgroundColor: "#3A312A" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={40} />
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 300,
                  color: "#F5EBE0",
                  letterSpacing: "-0.01em",
                }}
              >
                Айя Велес
              </h3>
            </div>
            <p
              className="text-xs leading-relaxed mb-6"
              style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
            >
              Мастер телесных практик, инструктор ОШО, сексолог.
              Пространство ВНЕ ИЗМЕРЕНИЙ — место настоящих изменений.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                {
                  href: "https://t.me",
                  label: "TG",
                  path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
                },
                {
                  href: "https://vk.com",
                  label: "VK",
                  path: "M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.727-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202C4.591 11.16 4 8.952 4 8.562c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.405 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.202 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.711-.576.711z",
                },
                {
                  href: "https://max.ru/u/f9LHodD0cOKyBKlPXKXMzQGtLCEkTa__mY4zoVtVwGbS0mAInyO_1Obq598",
                  label: "Записаться",
                  path: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.5 7.5c-.1.5-.4.6-.8.4l-2.2-1.6-1.1 1c-.1.1-.3.2-.5.2l.2-2.3 4.4-4c.2-.2 0-.3-.3-.1L7.5 14.3l-2.2-.7c-.5-.1-.5-.5.1-.7l8.6-3.3c.4-.1.8.1.5.9z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-opacity hover:opacity-60"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    style={{ border: "1px solid rgba(193,164,169,0.25)" }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d={s.path} fill="#C1A4A9" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p
              className="mb-5 text-xs uppercase tracking-widest"
              style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}
            >
              Навигация
            </p>
            <nav className="space-y-2.5">
              {[
                ["#about", "О мастере", false],
                ["#formats", "Форматы", false],
                ["#schedule", "Расписание", false],
                ["#reviews", "Отзывы", false],
                ["#team", "Команда", false],
                ["#faq", "Вопросы", false],
                ["https://max.ru/u/f9LHodD0cOKyBKlPXKXMzQGtLCEkTa__mY4zoVtVwGbS0mAInyO_1Obq598", "Записаться", true],
              ].map(([href, label, external], i) => (
                <a
                  key={i}
                  href={href as string}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="block text-sm transition-colors duration-200 hover:text-[#F5EBE0]"
                  style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              className="mb-5 text-xs uppercase tracking-widest"
              style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}
            >
              Контакты
            </p>
            <div className="space-y-3">
              <a
                href="tel:+79025002098"
                className="block text-sm hover:text-[#F5EBE0] transition-colors"
                style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                +7 (902) 500-20-98
              </a>
              <a
                href="https://t.me/ayaveles"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:text-[#F5EBE0] transition-colors"
                style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
              >
                Telegram
              </a>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid rgba(193,164,169,0.15)" }}
              >
                <p
                  className="mb-2 text-xs uppercase tracking-widest"
                  style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}
                >
                  Адрес
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  г. Екатеринбург
                  <span className="mx-1.5" style={{ color: "rgba(212,175,55,0.4)" }}>·</span>
                  ул. Малышева 71А
                  <span className="mx-1.5" style={{ color: "rgba(212,175,55,0.4)" }}>·</span>
                  офис 304
                </p>
              </div>
              <div
                className="mt-4 pt-4"
                style={{ borderTop: "1px solid rgba(193,164,169,0.1)" }}
              >
                <p
                  className="mb-2 text-xs uppercase tracking-widest"
                  style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}
                >
                  Пространство практик
                </p>
                <a
                  href="https://max.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[#F5EBE0] transition-colors"
                  style={{ color: "#C1A4A9", fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                >
                  ВНЕ ИЗМЕРЕНИЙ →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(193,164,169,0.12)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(193,164,169,0.4)", fontFamily: "'Inter', sans-serif" }}
          >
            © {year} Айя Велес. Все права защищены.
          </p>
          <a
            href="/privacy"
            className="text-xs hover:opacity-70 transition-opacity"
            style={{ color: "rgba(193,164,169,0.4)", fontFamily: "'Inter', sans-serif", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Политика конфиденциальности
          </a>
          <p
            className="text-xs"
            style={{ color: "rgba(193,164,169,0.4)", fontFamily: "'Inter', sans-serif" }}
          >
            Пространство ВНЕ ИЗМЕРЕНИЙ · Екатеринбург
          </p>
        </div>
      </div>
    </footer>
  );
}
