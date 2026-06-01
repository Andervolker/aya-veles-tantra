import { NextRequest, NextResponse } from "next/server";

const CHAT_ID = "1308440096";

const SCHEDULE = `
📅 *РАСПИСАНИЕ ВНЕ🌌ИЗМЕРЕНИЙ — ИЮНЬ*

🗓 *1, 8, 15, 22, 29 ИЮНЯ* | 19:00–22:00
🤗 Клуб ОбниМаГиЯ по понедельникам
💳 от 1200₽ разово · от 500₽ по клубной карте

🗓 *3, 10, 17, 24 ИЮНЯ* | 19:30–21:30
⚡️ ДЫХАНИЕ ЖИЗНИ с А. Галеевым (Шивананда)
💳 3600₽ · 10000₽ абонемент на 4 занятия
_21:45–23:00 Ритуал РАПЕ — 1000₽ (700₽ для участников Дыхания)_

🗓 *6 ИЮНЯ* | 12:00–20:30
🎲 ЛИЛА на большом поле с Иваном Малковым (Казань)
💳 7000₽ · осталось 5 мест из 7

🗓 *9 ИЮНЯ* | 19:00–22:00
❣️ ТАНТРА · ДЕГУСТАЦИЯ с Айей Велес
💳 1500₽ до 31.05 · 2000₽ с 1.06 · 3000₽ для пары МЖ

🗓 *19 ИЮНЯ* | 19:00–23:00
💆‍♀️ DREAM-PARTY «Пижамная вечеринка» · ГРАНИ🔞 с Айей Велес
💳 2500₽ до 10.06 · 3000₽ с 11.06 · 5000₽ для пары МЖ

🗓 *25 ИЮНЯ* | 19:00–23:00
👩‍❤️‍💋‍👨 МУЖЧИНА · ЖЕНЩИНА. Любовь. Секс. Деньги — продвинутый уровень
💳 3000₽ · 3500₽

🗓 *26–28 ИЮНЯ*
💚 СОЗЕРЦАЯ ЛЮБОВЬ — выездной тантрический ретрит с Айей Велес
_Заезд 26.06 в 16:00 · Выезд 28.06 в 16:00 · Изумрудный Город_
💳 от 15555₽ до 5.06 · бронь 5555₽ · от 18000₽ с 6.06

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
