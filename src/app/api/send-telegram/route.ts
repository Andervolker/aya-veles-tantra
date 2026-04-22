import { NextRequest, NextResponse } from "next/server";

const CHAT_ID = "1308440096";

const SCHEDULE = `
📅 *РАСПИСАНИЕ ВНЕ🌌ИЗМЕРЕНИЙ — АПРЕЛЬ*

🗓 *1 АПРЕЛЯ*
18:30–19:45 🧘‍♀️ Кундалини-йога — 900₽
20:00–22:00 ⚡️ Транс-энерг. Дыхание жизни — 1800₽
_(с 9.04 — регулярно по четвергам)_

🗓 *4–5 АПРЕЛЯ* | 10:00–18:00
🙌 Курс по тантр. массажу (модуль 1) — 10 000₽

🗓 *6 АПРЕЛЯ* | 19:00–22:00
🤗 Открытие Клуба ОбниМаГии
💳 0₽ (по карте) · 1500₽ разово · 2500₽/мес · 5000₽/3 мес

🗓 *11 АПРЕЛЯ* | 12:00–18:00
🙌 День открытых дверей — вход свободный

🗓 *12 АПРЕЛЯ* | 10:00–20:00
⚡️ День Энерджи-перезагрузки с А. Галеевым
💳 4500₽ (до 31.03) · 5000₽ (с 1.04) · 8000₽ вдвоём

🗓 *17–19 АПРЕЛЯ*
❤️ Выездной тантр. ретрит ГРАНИ🔞
_Только 12 мест, осталось 8_
💳 16 000₽ (до 5.04) · 18 000₽ (с 6.04)

🗓 *24 АПРЕЛЯ* | 19:00–23:00
🧘 Тантра ⚖️ Баланс — тренинг с Айей Велес
💳 3000₽ (до 15.04) · 3500₽ (с 16.04)

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
