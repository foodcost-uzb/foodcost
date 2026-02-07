-- =============================================
-- FOODCOST Seed Data
-- =============================================

-- Admin user (password: admin123 — change in production!)
-- bcrypt hash of 'admin123'
INSERT INTO admin_users (username, password_hash) VALUES
('admin', '$2b$10$tO140s2uEuX0TX22T1r7r.EP6xAAjxr5m8BcNaU92z/FuFuyRzxuG');

-- =============================================
-- Services
-- =============================================
INSERT INTO services (icon, title, short_desc, description, features, color, sort_order) VALUES
('ClipboardCheck', 'Аудит', 'Полная диагностика учёта', 'Комплексная проверка всех процессов учёта на предприятии. Выявляем слабые места, потери и зоны роста.', ARRAY['Анализ текущих процессов', 'Выявление потерь и хищений', 'Проверка документооборота', 'Рекомендации по оптимизации'], 'from-[#5838a8] to-[#7c5cc9]', 1),
('Settings', 'Настройка', 'Внедрение iiko и систем учёта', 'Профессиональная настройка систем автоматизации: iiko, справочники, ТТК, калькуляционные карты.', ARRAY['Настройка iiko с нуля', 'Создание справочников', 'Разработка ТТК', 'Настройка отчётности'], 'from-[#6b4fad] to-[#9b6fb3]', 2),
('Rocket', 'Внедрение', 'Запуск учёта с нуля', 'Полный цикл внедрения товарного и финансового учёта. От нуля до работающей системы.', ARRAY['Товарный учёт', 'Финансовый учёт', 'Складская логистика', 'Интеграции с поставщиками'], 'from-[#8560b5] to-[#b278b8]', 3),
('GraduationCap', 'Обучение', 'Тренинги для команды', 'Практические тренинги для вашей команды по работе с системами учёта и контроля.', ARRAY['Работа с iiko', 'Инвентаризации', 'Работа с отчётами', 'Контроль себестоимости'], 'from-[#9e71bc] to-[#c487be]', 4),
('HeadphonesIcon', 'Сопровождение', 'Ежемесячное ведение учёта', 'Постоянная поддержка и ведение учёта на аутсорсинге. Пакеты BASE и PRO CONTROL.', ARRAY['Ежедневный контроль', 'Еженедельные отчёты', 'Оперативная поддержка', 'Анализ показателей'], 'from-[#b782c0] to-[#c04880]', 5);

-- =============================================
-- Products
-- =============================================
INSERT INTO products (name, tagline, description, icon, features, is_popular, badge, color, bg_color, border_color, sort_order) VALUES
('BASE CONTROL', 'Базовый контроль и отчётность', 'Идеальный старт для тех, кто хочет навести порядок в учёте и получать регулярные отчёты о состоянии бизнеса.', 'Zap', ARRAY['Ежемесячные отчёты по food cost', 'Контроль остатков', 'Базовая аналитика', 'Консультации по запросу', 'Telegram-поддержка'], false, NULL, 'from-slate-600 to-slate-700', 'bg-slate-50', 'border-slate-200', 1),
('PRO CONTROL', 'Углублённый учёт + аналитика', 'Для тех, кто серьёзно относится к контролю. Полный цикл управления учётом с глубокой аналитикой.', 'Sparkles', ARRAY['Всё из BASE CONTROL', 'Еженедельная аналитика', 'Контроль отклонений', 'Работа с поставщиками', 'Оптимизация закупок', 'Приоритетная поддержка', 'Ежемесячные встречи'], true, NULL, 'from-[#5838a8] to-[#c04880]', 'bg-gradient-to-br from-[#5838a8]/5 to-[#c04880]/5', 'border-[#5838a8]/20', 2),
('CONTROL HUB', 'Цифровая платформа контроля', 'Наша собственная платформа для автоматизированного контроля всех процессов в реальном времени.', 'Crown', ARRAY['Всё из PRO CONTROL', 'Доступ к платформе 24/7', 'Дашборды в реальном времени', 'Автоматические уведомления', 'API-интеграции', 'Кастомные отчёты', 'Персональный менеджер', 'SLA 99.9%'], false, 'Скоро', 'from-amber-500 to-orange-500', 'bg-amber-50', 'border-amber-200', 3);

-- =============================================
-- Cases
-- =============================================
INSERT INTO cases (title, location, image, results, description, sort_order) VALUES
('Сеть ресторанов «Плов центр»', 'Ташкент, Узбекистан', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', '[{"label": "Снижение food cost", "value": "-12%", "positive": true}, {"label": "Рост выручки", "value": "+25%", "positive": true}, {"label": "Сокращение потерь", "value": "-45%", "positive": true}]', 'Комплексный аудит и постановка учёта для сети из 5 ресторанов.', 1),
('Кофейня «Brew & Bite»', 'Алматы, Казахстан', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop', '[{"label": "Оптимизация меню", "value": "+30%", "positive": true}, {"label": "Маржинальность", "value": "+18%", "positive": true}, {"label": "Время учёта", "value": "-60%", "positive": true}]', 'Внедрение системы управленческого учёта и калькуляция меню.', 2),
('Ресторан «Самарканд»', 'Самарканд, Узбекистан', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop', '[{"label": "Food cost", "value": "28%", "positive": true}, {"label": "Прибыль", "value": "+35%", "positive": true}, {"label": "ROI проекта", "value": "340%", "positive": true}]', 'Полный цикл: от аудита до внедрения автоматизированной системы учёта.', 3);

-- =============================================
-- Testimonials - Text
-- =============================================
INSERT INTO testimonials (type, name, role, location, avatar, text, rating, sort_order) VALUES
('text', 'Алишер Каримов', 'Владелец сети «Плов центр»', 'Ташкент', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 'Благодаря FOOD COST мы смогли снизить себестоимость блюд на 12% и увеличить прибыль на 25%. Профессиональный подход и глубокое понимание ресторанного бизнеса!', 5, 1),
('text', 'Мадина Рахимова', 'Управляющая кофейни', 'Алматы', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', 'Команда FOOD COST помогла нам полностью перестроить систему учёта. Теперь мы точно знаем себестоимость каждого напитка и можем принимать обоснованные решения.', 5, 2),
('text', 'Бахтиёр Усманов', 'Директор ресторана «Самарканд»', 'Самарканд', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 'Отличная работа! За 3 месяца food cost снизился с 38% до 28%. Рекомендую всем, кто хочет навести порядок в учёте своего заведения.', 5, 3),
('text', 'Камила Назарова', 'Совладелец сети кофеен', 'Нур-Султан', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', 'Работаем с FOOD COST уже 2 года. Надёжные партнёры, всегда на связи, помогают решать любые вопросы по учёту. Очень довольны сотрудничеством!', 5, 4),
('text', 'Рустам Ибрагимов', 'Владелец ресторана', 'Бухара', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', 'Профессионалы своего дела. Провели полный аудит, выявили все проблемы и помогли их решить. Теперь бизнес работает как часы.', 5, 5);

-- Testimonials - Video
INSERT INTO testimonials (type, name, role, video_id, video_title, thumbnail, client_name, sort_order) VALUES
('video', 'Сеть ресторанов «Плов Центр»', '', 'hc1IazKcsXo', 'Как снизить food cost на 15%', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=225&fit=crop', 'Сеть ресторанов «Плов Центр»', 10),
('video', 'Кафе «Самарканд»', '', 'hc1IazKcsXo', 'Внедрение iiko за 2 недели', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=225&fit=crop', 'Кафе «Самарканд»', 11),
('video', 'Brew & Bite Coffee', '', 'hc1IazKcsXo', 'Автоматизация учёта в сети кофеен', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=225&fit=crop', 'Brew & Bite Coffee', 12);

-- =============================================
-- Site Settings
-- =============================================
INSERT INTO site_settings (key, value, "group", label, type) VALUES
-- Hero
('hero_badge', '50+ лет общего стажа команды в HoReCa', 'hero', 'Бейдж', 'text'),
('hero_title_1', 'Избавьте ваш бизнес', 'hero', 'Заголовок (строка 1)', 'text'),
('hero_title_2', 'хаоса в управлении', 'hero', 'Заголовок (строка 2, градиент)', 'text'),
('hero_subtitle', 'Делаем владельцев ресторанов успешными и свободными через системный учёт и контроль', 'hero', 'Подзаголовок', 'textarea'),
('hero_stat_1_value', '50+', 'hero', 'Статистика 1 — значение', 'text'),
('hero_stat_1_label', 'Лет общего стажа команды', 'hero', 'Статистика 1 — подпись', 'text'),
('hero_stat_2_value', '100+', 'hero', 'Статистика 2 — значение', 'text'),
('hero_stat_2_label', 'Успешных проектов', 'hero', 'Статистика 2 — подпись', 'text'),
('hero_stat_3_value', '24/7', 'hero', 'Статистика 3 — значение', 'text'),
('hero_stat_3_label', 'Поддержка клиентов', 'hero', 'Статистика 3 — подпись', 'text'),

-- About
('about_mission', '«Избавить ресторанный бизнес от хаоса в управлении, учёте и финансах, делая владельцев успешными и свободными»', 'about', 'Миссия', 'textarea'),
('about_description', 'FOOD COST — команда экспертов с суммарным опытом более 50 лет в индустрии HoReCa. Мы помогаем ресторанам, кафе и отелям выстроить системный учёт и контроль, который освобождает владельцев от операционной рутины.', 'about', 'Описание', 'textarea'),
('about_stat_1_value', '50+', 'about', 'Стат 1 — значение', 'text'),
('about_stat_1_label', 'лет общего стажа', 'about', 'Стат 1 — подпись', 'text'),
('about_stat_2_value', '100+', 'about', 'Стат 2 — значение', 'text'),
('about_stat_2_label', 'довольных клиентов', 'about', 'Стат 2 — подпись', 'text'),
('about_stat_3_value', '5', 'about', 'Стат 3 — значение', 'text'),
('about_stat_3_label', 'стран СНГ', 'about', 'Стат 3 — подпись', 'text'),

-- Contacts
('contact_phone', '+998901234567', 'contacts', 'Телефон', 'phone'),
('contact_phone_display', '+998 90 123 45 67', 'contacts', 'Телефон (отображение)', 'text'),
('contact_email', 'info@foodcost.uz', 'contacts', 'Email', 'email'),
('contact_address', 'Ташкент, Узбекистан', 'contacts', 'Адрес', 'text'),
('contact_whatsapp', 'https://wa.me/998901234567', 'contacts', 'WhatsApp', 'url'),
('contact_telegram', 'https://t.me/foodcost', 'contacts', 'Telegram', 'url'),
('contact_youtube', 'https://www.youtube.com/@FoodCostGroup', 'contacts', 'YouTube', 'url'),

-- Podcast
('podcast_title', 'Бизнес на цифрах', 'podcast', 'Название подкаста', 'text'),
('podcast_description', 'Подкаст о финансах, учёте и управлении в ресторанном бизнесе от команды FOOD COST', 'podcast', 'Описание', 'textarea'),
('podcast_video_id', 'hc1IazKcsXo', 'podcast', 'YouTube Video ID', 'text'),
('podcast_youtube_url', 'https://www.youtube.com/@FoodCostGroup', 'podcast', 'YouTube канал', 'url'),

-- SEO
('seo_title', 'FOODCOST — Консалтинг для ресторанного бизнеса', 'seo', 'Title', 'text'),
('seo_description', 'Избавляем ресторанный бизнес от хаоса в управлении, учёте и финансах, делая владельцев успешными и свободными. 50+ лет общего стажа команды в HoReCa.', 'seo', 'Description', 'textarea'),
('seo_url', 'https://foodcost.uz', 'seo', 'URL сайта', 'url');

-- =============================================
-- Calculator Settings
-- =============================================
INSERT INTO calculator_settings (default_revenue, default_current_fc, default_target_fc, currency_label) VALUES
(100000000, 35, 28, 'сум');
