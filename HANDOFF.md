# FOOD COST — Handoff документация

**Дата обновления:** 7 февраля 2026

---

## Обзор проекта

**FOOD COST** — лендинг + админ-панель для компании, предоставляющей услуги управленческого учёта в сфере HoReCa (рестораны, кафе, общепит).

| Параметр | Значение |
|----------|----------|
| **Продакшн** | https://foodcost.uz (Vercel) |
| **Vercel URL** | https://foodcost-three.vercel.app |
| **GitHub** | https://github.com/foodcost-uzb/foodcost |
| **Админ-панель** | https://foodcost.uz/admin/login |
| **Админ логин** | admin / admin123 |

---

## Технологический стек

| Технология | Версия | Назначение |
|------------|--------|------------|
| Next.js | 16.1.6 | React-фреймворк (App Router) |
| React | 19.2.3 | UI библиотека |
| TypeScript | 5.x | Типизация |
| Tailwind CSS | 4.x | Стилизация |
| Framer Motion | 12.x | Анимации |
| Lucide React | 0.563 | Иконки |
| Supabase | PostgreSQL | База данных + RLS |
| bcryptjs | — | Хеширование паролей |
| jsonwebtoken | — | JWT авторизация |

---

## Хостинг и инфраструктура

| Сервис | Назначение | Детали |
|--------|------------|--------|
| **Vercel** | Хостинг (Next.js) | Автодеплой, serverless functions |
| **Supabase** | База данных | Проект `eiulmeuhwlfkowwtenli`, регион `eu-central-1` |
| **GitHub** | Репозиторий | `foodcost-uzb/foodcost` |
| **Tomas.uz** | DNS | NS: `ns1.tomas.uz` |

### DNS-записи для foodcost.uz

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

---

## Переменные окружения

```
NEXT_PUBLIC_SUPABASE_URL=https://eiulmeuhwlfkowwtenli.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
JWT_SECRET=<random 48+ chars>
TELEGRAM_BOT_TOKEN=<bot token from @BotFather>
TELEGRAM_CHAT_ID=<chat id for notifications>
```

Настроены в Vercel (production) и в `.env.local` (локально).

---

## Структура проекта

```
src/
├── app/
│   ├── globals.css          # Глобальные стили, CSS-переменные
│   ├── layout.tsx           # Корневой layout с метаданными
│   ├── page.tsx             # Главная (async server component → Supabase)
│   ├── admin/
│   │   ├── login/           # Страница входа (минимальный layout)
│   │   └── (protected)/     # Защищённые страницы админки
│   │       ├── page.tsx         # Дашборд (KPI, график, лиды)
│   │       ├── content/         # CRUD: услуги, продукты, кейсы, отзывы
│   │       ├── leads/           # Управление заявками
│   │       ├── analytics/       # Просмотры, события, конверсия
│   │       └── settings/        # Настройки сайта по группам
│   └── api/
│       ├── auth/            # Login, logout, session check
│       ├── content/         # CRUD: services, products, cases, testimonials
│       ├── leads/           # Приём заявок (public) + управление (admin)
│       ├── settings/        # Настройки сайта + калькулятора
│       └── analytics/       # Трекинг просмотров/событий + агрегация
├── components/
│   ├── Header.tsx           # Навигация + телефон + Telegram
│   ├── Hero.tsx             # Hero-секция (props из настроек)
│   ├── Services.tsx         # Bento-grid услуг + модальные окна
│   ├── Products.tsx         # Тарифы + модальные окна
│   ├── About.tsx            # О компании (props из настроек)
│   ├── Cases.tsx            # Кейсы + модальные окна
│   ├── Calculator.tsx       # Интерактивный калькулятор food cost
│   ├── Testimonials.tsx     # Отзывы: текст + видео
│   ├── Podcast.tsx          # Подкаст (YouTube embed)
│   ├── ContactForm.tsx      # Форма → POST /api/leads
│   ├── CallbackModal.tsx    # Модалка обратного звонка → POST /api/leads
│   ├── Footer.tsx           # Подвал (контакты, соцсети)
│   ├── FloatingButtons.tsx  # Плавающие кнопки: звонок, телефон, Telegram
│   ├── AnalyticsTracker.tsx # Автотрекинг просмотров
│   └── admin/
│       ├── AdminSidebar.tsx # Боковая навигация админки
│       └── AdminHeader.tsx  # Шапка админки с breadcrumbs
├── lib/
│   ├── utils.ts             # Утилиты (cn для classnames)
│   ├── auth.ts              # JWT: verify, hash, cookies
│   ├── data.ts              # Серверные функции загрузки данных
│   ├── analytics.ts         # Клиентский trackPageView/trackEvent
│   ├── SettingsContext.tsx   # React Context для настроек сайта
│   └── supabase/
│       ├── client.ts        # Браузерный Supabase-клиент
│       ├── server.ts        # Серверный + admin клиент
│       └── types.ts         # TypeScript-типы для 10 таблиц
└── scripts/
    ├── schema.sql           # Схема БД (10 таблиц + RLS + индексы)
    └── seed.sql             # Начальные данные
```

---

## База данных (Supabase)

10 таблиц:

| Таблица | Описание | Записей |
|---------|----------|---------|
| `admin_users` | Администраторы | 1 |
| `services` | Услуги | 5 |
| `products` | Тарифы/продукты | 3 |
| `cases` | Кейсы | 3 |
| `testimonials` | Отзывы (текст + видео) | 8 |
| `leads` | Заявки с сайта | динамически |
| `site_settings` | Настройки сайта | 31 |
| `calculator_settings` | Настройки калькулятора | 1 |
| `page_views` | Просмотры страниц | динамически |
| `analytics_events` | Аналитические события | динамически |

### RLS и доступ
- Публичные INSERT (leads, analytics) — через service role в API routes
- Публичные SELECT (контент, настройки) — через anon key
- Админ-операции — через service role key

---

## Авторизация

- **Логин:** username + password → bcrypt → JWT в httpOnly cookie (`admin_session`, 24h)
- **Защита:** `verifyAdmin()` в protected layout и API routes
- **Дефолтный аккаунт:** admin / admin123

---

## Цветовая палитра

| Название | HEX | Использование |
|----------|-----|---------------|
| Primary Purple | #5838a8 | Акцентный цвет |
| Primary Pink | #c04880 | Градиент, CTA |
| Dark Background | #1a1a2e | Футер, тёмные элементы |
| Accent Amber | #fbbf24 | Акцент |

### Градиенты
- **CTA кнопки:** #5838a8 → #c04880
- **Gradient text:** #5838a8 → #c04880

---

## Контакты на сайте

| Канал | Значение |
|-------|----------|
| Телефон | +998998551110 |
| Telegram | https://t.me/foodcost_uzb |
| YouTube | https://www.youtube.com/@FoodCostGroup |
| Email | info@foodcost.uz |

WhatsApp убран — используется только Telegram.

---

## Telegram-уведомления

При каждой новой заявке (форма контактов, обратный звонок, калькулятор) отправляется уведомление в Telegram.

| Параметр | Значение |
|----------|----------|
| **Бот** | @callback_fo_bot ("FOOD COST ЗАЯВКИ") |
| **Получатель** | Рустам Рахманбердиев (@rustam_foodcost, chat_id: 278977157) |
| **Формат** | HTML: имя, телефон, email, сообщение, источник |
| **Реализация** | `src/app/api/leads/route.ts` — non-blocking fetch после сохранения в БД |

Для смены получателя: обновить `TELEGRAM_CHAT_ID` в `.env.local` и Vercel.

---

## Запуск

```bash
# Установка
npm install

# Разработка
npm run dev          # http://localhost:3000

# Сборка
npm run build

# Продакшн
npm start

# Деплой на Vercel
npx vercel --prod
```

---

## Статус: ПОЛНОСТЬЮ РЕАЛИЗОВАНО

- Лендинг с данными из Supabase
- Админ-панель (CRUD, лиды, аналитика, настройки)
- Модальные окна для "Подробнее" (услуги, продукты, кейсы)
- Формы заявок → Supabase leads
- Telegram-уведомления о новых заявках
- Аналитика просмотров и событий
- Задеплоено на Vercel, домен foodcost.uz привязан

---

*Обновлено: 7 февраля 2026*
