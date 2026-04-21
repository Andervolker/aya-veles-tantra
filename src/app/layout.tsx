import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Айя Велес — Тантра и телесные практики в Екатеринбурге. Пространство вне измерений",
  description:
    "Айя Велес — мастер телесных практик в Екатеринбурге. Тантра, ОШО медитации, телесная терапия, ретриты и коучинг. Пространство ВНЕ ИЗМЕРЕНИЙ на ул. Малышева 71А.",
  keywords:
    "тантра екатеринбург, медитации малышева, ошо медитации, телесная терапия екатеринбург, Айя Велес, ретриты, коучинг, сексология, тантрический массаж",
  openGraph: {
    title: "Айя Велес — Тантра и телесные практики в Екатеринбурге. Пространство вне измерений",
    description:
      "Мастер телесных практик с 30-летним опытом. Тантра, ОШО медитации, телесная терапия в Екатеринбурге.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
