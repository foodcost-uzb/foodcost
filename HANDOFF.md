# FOOD COST — Handoff документация

**Дата обновления:** 10 февраля 2026

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
| **Vercel** | Хостинг (Next.js) | Автодеплой через GitHub (push → main), serverless functions |
| **Supabase** | База данных + Storage | Проект `eiulmeuhwlfkowwtenli`, регион `eu-central-1` |
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
│   │       ├── content/         # CRUD: услуги, продукты, кейсы, отзывы, проекты
│   │       ├── leads/           # Управление заявками
│   │       ├── analytics/       # Просмотры, события, конверсия
│   │       └── settings/        # Настройки сайта по группам
│   └── api/
│       ├── auth/            # Login, logout, session check
│       ├── content/         # CRUD: services, products, cases, testimonials, projects
│       ├── leads/           # Приём заявок (public) + управление (admin)
│       ├── settings/        # Настройки сайта + калькулятора
│       ├── analytics/       # Трекинг просмотров/событий + агрегация
│       └── upload/          # Загрузка изображений в Supabase Storage
├── components/
│   ├── Header.tsx           # Навигация + телефон + Telegram
│   ├── Hero.tsx             # Hero-секция (props из настроек)
│   ├── Services.tsx         # Bento-grid услуг + модальные окна
│   ├── Products.tsx         # Тарифы + модальные окна
│   ├── About.tsx            # О компании (props из настроек)
│   ├── Cases.tsx            # Кейсы + модальные окна
│   ├── ProjectLogos.tsx     # Бегущая строка логотипов проектов (marquee)
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
│       ├── AdminHeader.tsx  # Шапка админки с breadcrumbs
│       └── ImageUpload.tsx  # Drag & drop загрузка изображений
├── lib/
│   ├── utils.ts             # Утилиты (cn для classnames)
│   ├── auth.ts              # JWT: verify, hash, cookies
│   ├── data.ts              # Серверные функции загрузки данных
│   ├── analytics.ts         # Клиентский trackPageView/trackEvent
│   ├── SettingsContext.tsx   # React Context для настроек сайта
│   └── supabase/
│       ├── client.ts        # Браузерный Supabase-клиент
│       ├── server.ts        # Серверный + admin клиент
│       └── types.ts         # TypeScript-типы для 11 таблиц
└── scripts/
    ├── schema.sql           # Схема БД (11 таблиц + RLS + индексы)
    └── seed.sql             # Начальные данные
```

---

## База данных (Supabase)

11 таблиц:

| Таблица | Описание | Записей |
|---------|----------|---------|
| `admin_users` | Администраторы | 1 |
| `services` | Услуги | 6 |
| `products` | Тарифы/продукты | 3 |
| `cases` | Кейсы | 3 |
| `testimonials` | Отзывы (текст + видео, YouTube Shorts) | 8 |
| `project_logos` | Логотипы проектов (marquee) | 36 |
| `leads` | Заявки с сайта | динамически |
| `site_settings` | Настройки сайта | 31 |
| `calculator_settings` | Настройки калькулятора | 1 |
| `page_views` | Просмотры страниц | динамически |
| `analytics_events` | Аналитические события | динамически |

### Supabase Storage

| Параметр | Значение |
|----------|----------|
| **Bucket** | `images` (public) |
| **Путь** | `{folder}/{timestamp}-{random}.{ext}` |
| **Папки** | `cases`, `testimonials`, `projects`, `general` |
| **Лимиты** | JPEG/PNG/WebP/AVIF, макс 4 МБ |
| **API** | `POST /api/upload` (multipart/form-data, admin only) |

### RLS и доступ
- Публичные INSERT (leads, analytics) — через service role в API routes
- Публичные SELECT (контент, настройки) — через anon key
- Админ-операции — через service role key
- Загрузка файлов — через service role (Supabase Storage)

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

# Деплой на Vercel (автодеплой не настроен, нужен ручной)
vercel deploy --prod --yes --token <VERCEL_TOKEN>
```

---

## Видео-отзывы (YouTube Shorts)

Видео-отзывы поддерживают формат YouTube Shorts (вертикальное видео 9:16).

| Параметр | Значение |
|----------|----------|
| **Определение формата** | Поле `role = 'short'` у видео-отзыва |
| **Отображение** | Портретные карточки (3:4), вертикальный плеер (9:16) |
| **Thumbnail** | Авто: `https://img.youtube.com/vi/{ID}/hqdefault.jpg` |
| **Админ-панель** | Тогл "YouTube Shorts" при создании/редактировании видео-отзыва |

Текущие видео-отзывы:
- `RMFF5yRB_JI` — Отзыв о работе с FOOD COST
- `eegQdfusD3c` — Результаты сотрудничества с FOOD COST
- `LtB-Y47p9vA` — Отзыв клиента о сотрудничестве (Владелец проектов OKO, OBLAKO LOUNGE, ВМЯСО)

---

## Цены на продуктах (пакетах)

Стоимость хранится в поле `tagline` через разделитель `|`:
- Формат: `"Подзаголовок|Цена"` (например: `"Базовый контроль|от 2 000 000 сум"`)
- Компонент `Products.tsx` парсит через `parseTagline()` → разделяет на tagline + price
- Админка показывает отдельные поля «Подзаголовок» и «Стоимость», при сохранении соединяет

Текущие цены:
- BASE CONTROL: от 2 000 000 сум
- PRO CONTROL: от 5 000 000 сум
- CONTROL HUB: Договорная

---

## Секция «Наши проекты» (бегущая строка логотипов)

Горизонтальный бесконечный marquee с логотипами клиентов/проектов. Расположена после секции «Кейсы», перед «Отзывами».

| Параметр | Значение |
|----------|----------|
| **Компонент** | `src/components/ProjectLogos.tsx` |
| **Таблица** | `project_logos` (11-я таблица) |
| **Анимация** | CSS `@keyframes marquee` с JS-измерением ширины трека |
| **Скорость** | ~200px/сек (динамически рассчитывается) |
| **Drag-to-scroll** | При наведении можно перетаскивать ленту мышью |
| **Админ-панель** | Контент → Проекты (CRUD + загрузка логотипов) |

Особенности реализации:
- Два дублированных набора логотипов для бесшовного цикла
- `useRef` измеряет реальную половину ширины трека → CSS-переменная `--marquee-distance`
- Pointer events API для drag-to-scroll (пауза анимации при перетаскивании)
- Градиентные маски по краям для плавного перехода

---

## Калькулятор

- Поле «Выручка» поддерживает форматирование чисел с разделителями (пробелы): `100 000 000`
- `type="text" inputMode="numeric"` для мобильной клавиатуры
- `formatNumber()` добавляет пробелы как разделители тысяч

---

## Деплой на Vercel

**Автодеплой настроен** — при `git push` в `main` Vercel автоматически собирает и деплоит.

```bash
# Обычный процесс деплоя:
git add . && git commit -m "описание" && git push
# Vercel подхватит автоматически
```

Главная страница использует `export const dynamic = "force-dynamic"` для SSR — данные из Supabase всегда актуальны.

---

## Статус: ПОЛНОСТЬЮ РЕАЛИЗОВАНО

- Лендинг с данными из Supabase (`force-dynamic` SSR)
- Админ-панель (CRUD, лиды, аналитика, настройки)
- Загрузка изображений в админке (drag & drop → Supabase Storage)
- Модальные окна для "Подробнее" (услуги, продукты, кейсы)
- Секция «Наши проекты» — marquee логотипов с drag-to-scroll
- 6 услуг (включая «Консультация»)
- Видео-отзывы с поддержкой YouTube Shorts
- Цены на карточках продуктов (пакетов)
- Калькулятор с форматированием чисел
- Формы заявок → Supabase leads
- Telegram-уведомления о новых заявках
- Аналитика просмотров и событий
- Задеплоено на Vercel, домен foodcost.uz привязан

---

*Обновлено: 10 февраля 2026*
