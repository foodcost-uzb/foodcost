"use client";

import { motion } from "framer-motion";
import { Star, Quote, Play, Youtube } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Алишер Каримов",
    role: "Владелец сети «Плов центр»",
    location: "Ташкент",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "Благодаря FOOD COST мы смогли снизить себестоимость блюд на 12% и увеличить прибыль на 25%. Профессиональный подход и глубокое понимание ресторанного бизнеса!",
    rating: 5,
  },
  {
    name: "Мадина Рахимова",
    role: "Управляющая кофейни",
    location: "Алматы",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    text: "Команда FOOD COST помогла нам полностью перестроить систему учёта. Теперь мы точно знаем себестоимость каждого напитка и можем принимать обоснованные решения.",
    rating: 5,
  },
  {
    name: "Бахтиёр Усманов",
    role: "Директор ресторана «Самарканд»",
    location: "Самарканд",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "Отличная работа! За 3 месяца food cost снизился с 38% до 28%. Рекомендую всем, кто хочет навести порядок в учёте своего заведения.",
    rating: 5,
  },
  {
    name: "Камила Назарова",
    role: "Совладелец сети кофеен",
    location: "Нур-Султан",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "Работаем с FOOD COST уже 2 года. Надёжные партнёры, всегда на связи, помогают решать любые вопросы по учёту. Очень довольны сотрудничеством!",
    rating: 5,
  },
  {
    name: "Рустам Ибрагимов",
    role: "Владелец ресторана",
    location: "Бухара",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    text: "Профессионалы своего дела. Провели полный аудит, выявили все проблемы и помогли их решить. Теперь бизнес работает как часы.",
    rating: 5,
  },
];

const videoTestimonials = [
  {
    title: "Как снизить food cost на 15%",
    thumbnail: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=225&fit=crop",
    videoId: "hc1IazKcsXo",
    client: "Сеть ресторанов «Плов Центр»",
  },
  {
    title: "Внедрение iiko за 2 недели",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=225&fit=crop",
    videoId: "hc1IazKcsXo",
    client: "Кафе «Самарканд»",
  },
  {
    title: "Автоматизация учёта в сети кофеен",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=225&fit=crop",
    videoId: "hc1IazKcsXo",
    client: "Brew & Bite Coffee",
  },
];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-[#1a1a2e] via-[#16162a] to-[#1a1a2e] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#c04880] font-semibold text-sm uppercase tracking-wider">
            Отзывы
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4">
            Что говорят наши{" "}
            <span className="bg-gradient-to-r from-[#5838a8] to-[#c04880] bg-clip-text text-transparent">
              клиенты
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Истории успеха от владельцев ресторанов и кафе
          </p>
        </motion.div>

        {/* Video Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Youtube className="text-red-500" />
            Видео-отзывы клиентов
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setActiveVideo(video.videoId)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
                    >
                      <Play size={28} className="text-[#5838a8] ml-1" fill="#5838a8" />
                    </motion.div>
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="font-semibold text-white">{video.title}</h4>
                  <p className="text-sm text-slate-300">{video.client}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Modal */}
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Video testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-2xl"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#c04880] transition-colors"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Text Testimonials Carousel */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[350px] sm:w-[400px] snap-center"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10 hover:border-[#5838a8]/30 transition-colors">
                  {/* Quote icon */}
                  <Quote className="w-10 h-10 text-[#5838a8]/30 mb-4" />

                  {/* Text */}
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-[#c04880] text-[#c04880]"
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#5838a8]/20"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-400">
                        {testimonial.role}, {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-[#1a1a2e] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-[#1a1a2e] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
