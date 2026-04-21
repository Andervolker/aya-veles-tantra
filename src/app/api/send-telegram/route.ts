import { NextRequest, NextResponse } from "next/server";

const CHAT_ID = "1308440096";

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
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "Markdown" }),
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
