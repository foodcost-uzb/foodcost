-- =============================================
-- Migration: Replace placeholder video testimonials with real YouTube Shorts
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Remove old placeholder video testimonials
DELETE FROM testimonials WHERE type = 'video' AND video_id = 'hc1IazKcsXo';

-- 2. Insert real YouTube Shorts testimonials (role='short' marks vertical format)
INSERT INTO testimonials (type, name, role, video_id, video_title, thumbnail, client_name, sort_order) VALUES
('video', 'Отзыв клиента #1', 'short', 'RMFF5yRB_JI', 'Отзыв о работе с FOOD COST', 'https://img.youtube.com/vi/RMFF5yRB_JI/hqdefault.jpg', 'Клиент FOOD COST', 10),
('video', 'Отзыв клиента #2', 'short', 'eegQdfusD3c', 'Результаты сотрудничества с FOOD COST', 'https://img.youtube.com/vi/eegQdfusD3c/hqdefault.jpg', 'Клиент FOOD COST', 11);
