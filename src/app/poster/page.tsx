import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PosterAmbience from "@/components/poster/PosterAmbience";

export const metadata: Metadata = {
  title: "Афиша — Айя Велес",
  description: "Пространство ВНЕ ИЗМЕРЕНИЙ. Афиша и контакты.",
};

const SITE_URL = "https://ayaveles.ru";
const MAX_URL = "https://max.ru";

function qrSrc(data: string) {
  const params = new URLSearchParams({
    size: "140x140",
    margin: "8",
    color: "3A312A",
    bgcolor: "F5EBE0",
    data,
  });
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}

export default function PosterPage() {
  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundColor: "#F5EBE0",
        color: "#4A3F35",
        fontFamily: "'Inter', sans-serif",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      <PosterAmbience />

      <nav
        className="relative z-20 border-b px-6 py-4"
        style={{ borderColor: "rgba(193,164,169,0.25)", backgroundColor: "rgba(245,235,224,0.72)" }}
      >
        <div className="mx-auto flex max-w-3xl justify-center">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.28em] transition-opacity hover:opacity-65"
            style={{ color: "#8A7B72" }}
          >
            ← На главную
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-1 flex-col items-center px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="poster-sheet w-full max-w-lg flex flex-col items-center text-center">
          {/* Логотип */}
          <div
            className="mb-8 flex justify-center"
            style={{
              filter:
                "drop-shadow(0 0 14px rgba(193, 164, 169, 0.95)) drop-shadow(0 0 32px rgba(193, 164, 169, 0.55)) drop-shadow(0 0 48px rgba(193, 164, 169, 0.28))",
            }}
          >
            <Image
              src="/spiral-logo.png"
              alt="Логотип Айя Велес"
              width={136}
              height={136}
              className="h-auto w-[136px] max-w-[150px] object-contain"
              priority
            />
          </div>

          <h1
            className="mb-3 leading-[0.95] tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.75rem, 9vw, 4.25rem)",
              fontWeight: 400,
              color: "#3A312A",
              letterSpacing: "0.06em",
            }}
          >
            АЙЯ ВЕЛЕС
          </h1>

          <p
            className="mb-10 max-w-md text-balance"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.05rem, 2.8vw, 1.35rem)",
              fontWeight: 400,
              color: "#5C524A",
              letterSpacing: "0.22em",
            }}
          >
            Пространство{" "}
            <span style={{ color: "#3A312A", letterSpacing: "0.18em" }}>ВНЕ ИЗМЕРЕНИЙ</span>
          </p>

          {/* Портрет — мягкое растворение в фон */}
          <div className="mb-12 w-full max-w-[320px] sm:max-w-[360px]">
            <div
              className="relative mx-auto aspect-[3/4] w-full overflow-hidden"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 88% 86% at 50% 44%, #000 50%, transparent 100%)",
                maskImage: "radial-gradient(ellipse 88% 86% at 50% 44%, #000 50%, transparent 100%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <Image
                src="/aya-main.jpg"
                alt="Айя Велес"
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 640px) 90vw, 360px"
                priority
              />
            </div>
          </div>

          {/* QR и телефон */}
          <div
            className="w-full max-w-md rounded-2xl px-6 py-8 sm:px-10"
            style={{
              backgroundColor: "rgba(250, 244, 238, 0.65)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 48px -32px rgba(58,49,42,0.12)",
              border: "1px solid rgba(193, 164, 169, 0.35)",
            }}
          >
            <p
              className="mb-6 text-xs uppercase tracking-[0.35em]"
              style={{ color: "#9A8B82" }}
            >
              Сканируйте
            </p>
            <div className="flex flex-col items-stretch justify-center gap-8 sm:flex-row sm:items-start sm:gap-10">
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 transition-opacity hover:opacity-80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrSrc(SITE_URL)}
                  alt="QR: сайт"
                  width={140}
                  height={140}
                  className="rounded-lg bg-[#F5EBE0]"
                  style={{ border: "1px solid rgba(193,164,169,0.4)" }}
                />
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#5C524A" }}>
                  Сайт
                </span>
              </a>
              <a
                href={MAX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 transition-opacity hover:opacity-80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrSrc(MAX_URL)}
                  alt="QR: запись в Макс"
                  width={140}
                  height={140}
                  className="rounded-lg bg-[#F5EBE0]"
                  style={{ border: "1px solid rgba(193,164,169,0.4)" }}
                />
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#5C524A" }}>
                  Запись в Макс
                </span>
              </a>
            </div>
            <a
              href="tel:+79025002098"
              className="mt-8 block text-center text-lg transition-opacity hover:opacity-75 sm:text-xl"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "#3A312A",
                letterSpacing: "0.12em",
              }}
            >
              +7 (902) 500-20-98
            </a>
          </div>
        </div>
      </main>

      <footer
        className="relative z-20 mt-auto border-t px-6 py-8"
        style={{
          borderColor: "rgba(193,164,169,0.2)",
          backgroundColor: "rgba(237, 217, 200, 0.35)",
        }}
      >
        <div className="mx-auto max-w-lg text-center text-xs" style={{ color: "#8A7B72" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }}>Айя Велес · Москва</p>
          <Link href="/privacy" className="mt-2 inline-block underline decoration-[rgba(138,123,114,0.5)] underline-offset-4">
            Политика конфиденциальности
          </Link>
        </div>
      </footer>
    </div>
  );
}
