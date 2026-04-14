import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Айя Велес",
  description: "Политика конфиденциальности и обработки персональных данных",
};

export default function PrivacyPage() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div
      className="min-h-screen py-20 px-6"
      style={{ backgroundColor: "#F5EBE0", color: "#4A3F35", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-12 hover:opacity-70 transition-opacity"
          style={{ color: "#C1A4A9" }}
        >
          ← На главную
        </Link>

        {/* Title */}
        <h1
          className="mb-3 leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
          }}
        >
          Политика конфиденциальности
        </h1>
        <p className="text-xs mb-12" style={{ color: "#C1A4A9" }}>
          Последнее обновление: {dateStr}
        </p>

        <div className="space-y-8 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика конфиденциальности регулирует порядок обработки и использования
              персональных данных пользователей сайта <strong>ayaveles.ru</strong>, принадлежащего
              самозанятому специалисту Айя Велес (далее — «Оператор»).
            </p>
            <p className="mt-3">
              Используя сайт и заполняя формы обратной связи, вы подтверждаете своё согласие с
              условиями настоящей Политики.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              2. Какие данные мы собираем
            </h2>
            <p>Оператор собирает следующие персональные данные, которые вы предоставляете добровольно:</p>
            <ul className="mt-3 space-y-1.5 ml-4">
              <li>• <strong>Имя</strong> — для обращения к вам при связи;</li>
              <li>• <strong>Номер телефона</strong> — для записи на консультацию или мероприятие;</li>
              <li>• <strong>Комментарий / запрос</strong> — при заполнении формы заявки.</li>
            </ul>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              3. Цели обработки данных
            </h2>
            <p>Собранные данные используются исключительно для:</p>
            <ul className="mt-3 space-y-1.5 ml-4">
              <li>• Связи с вами для записи на сессии, тренинги и мероприятия;</li>
              <li>• Ответа на ваши вопросы;</li>
              <li>• Направления информации о предстоящих событиях (при вашем согласии).</li>
            </ul>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              4. Передача данных третьим лицам
            </h2>
            <p>
              Оператор не продаёт, не передаёт и не раскрывает ваши персональные данные третьим
              лицам без вашего согласия, за исключением случаев, предусмотренных действующим
              законодательством Российской Федерации.
            </p>
            <p className="mt-3">
              Данные из формы заявки могут передаваться в сервис хранения таблиц (Google Sheets /
              SheetBest) исключительно для внутреннего учёта заявок.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              5. Cookies
            </h2>
            <p>
              Сайт использует файлы cookie — небольшие текстовые файлы, сохраняемые в вашем браузере.
              Cookies не содержат персональных данных и применяются для корректной работы сайта
              и улучшения пользовательского опыта.
            </p>
            <p className="mt-3">
              Вы можете отключить cookies в настройках браузера. Это не повлияет на возможность
              просмотра сайта.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              6. Хранение и защита данных
            </h2>
            <p>
              Оператор принимает технические и организационные меры для защиты ваших персональных
              данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
              Данные хранятся в течение срока, необходимого для выполнения целей сбора.
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              7. Ваши права
            </h2>
            <p>Вы вправе в любой момент:</p>
            <ul className="mt-3 space-y-1.5 ml-4">
              <li>• Запросить уточнение, обновление или удаление своих персональных данных;</li>
              <li>• Отозвать согласие на обработку данных;</li>
              <li>• Получить информацию о том, какие данные о вас хранятся.</li>
            </ul>
            <p className="mt-3">
              Для реализации прав обратитесь по телефону:{" "}
              <a href="tel:+79025002098" style={{ color: "#C1A4A9" }}>
                +7 902 500-20-98
              </a>{" "}
              или в WhatsApp:{" "}
              <a href="https://wa.me/79025002098" style={{ color: "#C1A4A9" }}>
                написать
              </a>
              .
            </p>
          </section>

          <section>
            <h2
              className="mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}
            >
              8. Изменения в Политике
            </h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику
              конфиденциальности. Актуальная версия всегда доступна на этой странице.
            </p>
          </section>

          <div
            className="pt-8 mt-8"
            style={{ boxShadow: "0 -1px 0 rgba(193,164,169,0.2)" }}
          >
            <p style={{ color: "#C1A4A9" }}>
              Айя Велес · Пространство ВНЕ ИЗМЕРЕНИЙ
            </p>
            <p className="mt-1">
              По вопросам:{" "}
              <a href="tel:+79025002098" style={{ color: "#C1A4A9" }}>
                +7 902 500-20-98
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
