import { NextRequest, NextResponse } from "next/server";

const CHAT_ID = "1308440096";

const SCHEDULE = `
📅 *РАСПИСАНИЕ ВНЕ🌌ИЗМЕРЕНИЙ — МАЙ*

🗓 *1 МАЯ* | 10:00–14:00
🔥 АУМ — Первомайская перезагрузка
💳 1000₽ первые 10 · 1800₽ до 30.04 · 2300₽ с 1.05 · 4000₽ трое

🗓 *1 МАЯ* | 18:00–23:00
💆‍♀️ RELAX-PARTY «Пижамная вечеринка» с Айей Велес
_Формат ГРАНИ🔞 · продвинутый уровень_
💳 3900₽ до 27.04 · 4500₽ с 28.04 · 7500₽ для пары МЖ

🗓 *4, 11, 18, 25 МАЯ* | 19:00–22:00
🤗 Клуб ОбниМаГиЯ по понедельникам
💳 1200₽ разово · 0₽ по клубной карте · 3000₽/мес · 6000₽/3 мес

🗓 *6, 13, 20, 27 МАЯ* | 19:30–21:30
⚡️ ДЫХАНИЕ ЖИЗНИ с А. Галеевым (Шивананда)
💳 1800₽ · 6000₽ абонемент на 4 занятия
_21:45–23:00 Ритуал РАПЕ — 1000₽ (700₽ для участников Дыхания)_

🗓 *14 МАЯ* | 19:00–23:00
🚀 ЛАБОРАТОРИЯ ОТНОШЕНИЙ 5.0 — запуск 2-месячного курса с Айей Велес
💳 от 24 000₽ за весь курс

🗓 *15 МАЯ* | 19:00–23:00
⚫️ ГРАНИ🔞 В ТЕМНОТЕ · Тайные свидания
💳 4900₽ до 5.05 · 5500₽ с 6.05

🗓 *16–17 МАЯ* | 10:00–18:00
🔥 Тантрический массаж 2 модуль — Исцеление Сексуальности🔞
💳 12000₽ до 25.04 · 13000₽ до 30.04 · 15000₽ с 1.05

🗓 *23–24 МАЯ*
⚫️ 12 ЧАСОВ В ТЕМНОТЕ с Айей Велес — выездной ретрит
💳 10000₽ только темнота · 13000₽ темнота + баня + ночёвка

🗓 *30–31 МАЯ* | 10:00–18:00
🔥 ТАНТРА ЭНЕРДЖИ · ЛЕТО ЖАРА — интенсив с Айей и Шиванандой
💳 8888₽ первые 10 до 10.05 · 9999₽ для следующих

Запись ⤵️ @ayaveles`.trim();

export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Bot token not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, reason, format, timing } = body as {
    name: string;
    phone: string;
    reason: string;
    format: string;
    timing: string;
  };

  const date = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Yekaterinburg" });

  const text = [
    `✨ Добро пожаловать в пространство Айи Велес! Ваша заявка принята.`,
    ``,
    `🌸 *Новая заявка — Айя Велес*`,
    ``,
    `👤 *Имя:* ${name}`,
    `📲 *Связь:* ${phone}`,
    ``,
    `💬 *Запрос:* ${reason}`,
    `📋 *Формат:* ${format}`,
    `⏰ *Сроки:* ${timing}`,
    ``,
    `🗓 _${date} · Екатеринбург_`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    SCHEDULE,
  ].join("\n");

  const reply_markup = {
    inline_keyboard: [
      [
        { text: "📅 Расписание", url: "https://t.me/ayaveles" },
        { text: "👥 Вступить в группу", url: "https://t.me/ayaveles" },
      ],
      [
        { text: "✍️ Написать Айе", url: "https://t.me/ayaveles" },
      ],
    ],
  };

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
          reply_markup,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Network error" }, { status: 502 });
  }
}
