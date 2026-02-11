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
| **Админ логин** | admin / (пароль изменён, не дефолтный) |

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
│   ├── layout.tsx           # Корневой layout с метаданными, JSON-LD, skip-to-content
│   ├── page.tsx             # Главная (ISR revalidate=60, server component → Supabase)
│   ├── not-found.tsx        # Кастомная 404 страница
│   ├── error.tsx            # Error boundary с кнопкой retry
│   ├── robots.ts            # robots.txt (Disallow /admin/, Sitemap)
│   ├── sitemap.ts           # sitemap.xml
│   ├── opengraph-image.tsx  # OG-картинка 1200x630 (edge runtime)
│   ├── admin/
│   │   ├── login/           # Страница входа (минимальный layout)
│   │   └── (protected)/     # Защищённые страницы админки
│   │       ├── page.tsx         # Дашборд (KPI, график, лиды)
│   │       ├── loading.tsx      # Спиннер загрузки для роутов
│   │       ├── content/         # CRUD: услуги, продукты, кейсы, отзывы, проекты
│   │       ├── leads/           # Управление заявками
│   │       ├── analytics/       # Просмотры, события, конверсия
│   │       └── settings/        # Настройки сайта по группам
│   └── api/
│       ├── auth/            # Login, logout, session check
│       ├── content/         # CRUD: services, products, cases, testimonials, projects
│       ├── leads/           # Приём заявок (public, с валидацией) + управление (admin)
│       ├── settings/        # Настройки сайта + калькулятора
│       ├── analytics/       # Трекинг просмотров/событий (anon client) + агрегация
│       └── upload/          # Загрузка изображений в Supabase Storage
├── components/
│   ├── Header.tsx           # Навигация + телефон + Telegram (aria-label на burger)
│   ├── Hero.tsx             # Hero-секция (props из настроек)
│   ├── Services.tsx         # Bento-grid услуг + модальные окна
│   ├── Products.tsx         # Тарифы + модальные окна
│   ├── About.tsx            # О компании (props из настроек)
│   ├── Cases.tsx            # Кейсы + модальные окна (lazy loading images)
│   ├── ProjectLogos.tsx     # Бегущая строка логотипов проектов (marquee)
│   ├── Calculator.tsx       # Интерактивный калькулятор food cost (валидация target < current)
│   ├── Testimonials.tsx     # Отзывы: текст + видео (lazy loading)
│   ├── Podcast.tsx          # Подкаст (YouTube embed)
│   ├── ContactForm.tsx      # Форма → POST /api/leads (показывает ошибку при сбое)
│   ├── CallbackModal.tsx    # Модалка обратного звонка (scroll lock, ошибки, aria-label)
│   ├── Footer.tsx           # Подвал (контакты, соцсети)
│   ├── FloatingButtons.tsx  # Плавающие кнопки: звонок, телефон, Telegram (aria-labels)
│   ├── Logo.tsx             # Лого (priority только для header, lazy для footer)
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
| `cases` | Кейсы | 8 (active) |
| `testimonials` | Отзывы (текст + видео, YouTube Shorts) | 3 |
| `project_logos` | Логотипы проектов (marquee) | 35 |
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
- Публичные INSERT (leads, analytics) — через anon client в API routes
- Публичные SELECT (контент, настройки) — через anon key
- Админ-операции — через service role key
- Загрузка файлов — через service role (Supabase Storage)

---

## Авторизация

- **Логин:** username + password → bcrypt → JWT в httpOnly cookie (`admin_session`, 24h)
- **Защита:** `verifyAdmin()` в protected layout и API routes
- **Пароль изменён** с дефолтного (seed) на пользовательский

---

## SEO и метаданные

| Элемент | Реализация |
|---------|------------|
| **metadataBase** | `https://foodcost.uz` |
| **Canonical URL** | `alternates.canonical` в layout.tsx |
| **OG Image** | `opengraph-image.tsx` (edge runtime, 1200x630, брендовые цвета) |
| **Twitter Card** | `summary_large_image` |
| **JSON-LD** | Organization + LocalBusiness Schema.org в `<head>` |
| **Apple Touch Icon** | `/logo-icon.svg` |
| **robots.txt** | `Disallow: /admin/`, `Sitemap: .../sitemap.xml` |
| **sitemap.xml** | Только главная страница (SPA с hash-секциями) |
| **Skip-to-content** | `<a href="#main-content">` (sr-only) |

---

## Безопасность

| Мера | Реализация |
|------|------------|
| **Security headers** | X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (camera, mic, geo = none) |
| **X-Powered-By** | Отключён (`poweredByHeader: false`) |
| **Input validation** | Лимиты длины (name 200, phone 30, email 200, message 2000), whitelist source |
| **SQL injection** | Sanitized search в leads GET (удаление спецсимволов PostgREST) |
| **HTML injection** | Экранирование `<>&` в Telegram-уведомлениях |
| **Analytics** | Использует anon client (не service role) |

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
| Телефон | +998 99 855 11 10 |
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
| **Формат** | HTML: имя, телефон, email, сообщение, источник (с экранированием) |
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

# Ручной деплой на Vercel
npx vercel --prod
```

---

## Кэширование и производительность

| Аспект | Реализация |
|--------|------------|
| **ISR** | Главная страница: `revalidate = 60` (обновление раз в 60 сек) |
| **Lazy loading** | Все изображения ниже фолда: `loading="lazy"` |
| **Image priority** | Только header-лого (`Logo` horizontal variant) |
| **Static pages** | robots.txt, sitemap.xml, 404, admin/login — статические |

---

## Обработка ошибок

| Элемент | Файл | Описание |
|---------|------|----------|
| **Error boundary** | `src/app/error.tsx` | Ловит ошибки рендера, кнопка «Попробовать снова» |
| **404 страница** | `src/app/not-found.tsx` | Кастомная 404 с брендовым дизайном |
| **Admin loading** | `src/app/admin/(protected)/loading.tsx` | Спиннер при переходе между страницами |
| **ContactForm** | Показывает ошибку при сбое API (не молча «Спасибо») |
| **CallbackModal** | Показывает ошибку при сбое API + scroll lock |

---

## Accessibility (a11y)

| Элемент | Реализация |
|---------|------------|
| **Skip-to-content** | `<a href="#main-content">` в layout (sr-only, видима при фокусе) |
| **aria-label** | Hamburger menu, scroll-to-top, callback, phone, telegram, close buttons |
| **aria-expanded** | Mobile menu toggle |
| **Form labels** | `htmlFor`/`id` связь label↔input, `autoComplete` атрибуты |
| **Scroll lock** | `document.body.style.overflow = "hidden"` при открытом CallbackModal |
| **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |

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

---

## Калькулятор

- Поле «Выручка» поддерживает форматирование чисел с разделителями (пробелы): `100 000 000`
- `type="text" inputMode="numeric"` для мобильной клавиатуры
- `formatNumber()` добавляет пробелы как разделители тысяч
- Валидация: целевой food cost должен быть ниже текущего (иначе подсказка)

---

## Деплой на Vercel

**Автодеплой настроен** — при `git push` в `main` Vercel автоматически собирает и деплоит.

```bash
# Обычный процесс деплоя:
git add . && git commit -m "описание" && git push
# Vercel подхватит автоматически

# Или ручной деплой:
npx vercel --prod
```

Главная страница использует ISR (`revalidate = 60`) — данные из Supabase обновляются раз в минуту.

---

## Favicon

- SVG-иконка вкладки браузера: `/logo-icon.svg` (буквы F и C)
- Apple touch icon: `/logo-icon.svg`
- Старый `favicon.ico` удалён

---

## Статус: ПОЛНОСТЬЮ РЕАЛИЗОВАНО

- Лендинг с данными из Supabase (ISR, revalidate=60)
- Админ-панель (CRUD, лиды, аналитика, настройки)
- Загрузка изображений в админке (drag & drop → Supabase Storage)
- Модальные окна для "Подробнее" (услуги, продукты, кейсы)
- Секция «Наши проекты» — marquee логотипов с drag-to-scroll
- 6 услуг (включая «Консультация»)
- Видео-отзывы с поддержкой YouTube Shorts
- Цены на карточках продуктов (пакетов)
- Калькулятор с форматированием чисел и валидацией
- Формы заявок → Supabase leads (с показом ошибок)
- Telegram-уведомления о новых заявках (с экранированием HTML)
- Аналитика просмотров и событий
- SVG favicon с логотипом FoodCost
- SEO: OG image, JSON-LD, canonical, robots.txt, sitemap.xml
- Security headers (X-Frame-Options, CSP-lite, etc.)
- Accessibility: skip-to-content, aria-labels, form labels, scroll lock
- Error boundary, кастомная 404, loading states
- Input validation и sanitization на API routes
- Задеплоено на Vercel, домен foodcost.uz привязан

---

*Обновлено: 10 февраля 2026*
