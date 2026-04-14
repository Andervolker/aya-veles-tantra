import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Айя Велес — Распакую твою сексуальность, верну яркость жизни",
  description:
    "Айя Велес — мастер телесных практик, тантра, ретриты и коучинг. Более 30 лет трансформационных практик. Запишитесь на сессию.",
  keywords: "Айя Велес, тантра, ретриты, коучинг, телесные практики, сексуальность, трансформация",
  openGraph: {
    title: "Айя Велес — Распакую твою сексуальность, верну яркость жизни",
    description: "Мастер телесных практик с 30-летним опытом. Ретриты, тантра, коучинг.",
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
