"use client";

import { motion } from "framer-motion";
import { Star, Quote, Play, Youtube } from "lucide-react";
import { useState } from "react";

interface TestimonialData {
  id: string;
  type: 'text' | 'video';
  name: string;
  role: string;
  location: string;
  avatar: string | null;
  text: string | null;
  rating: number;
  video_id: string | null;
  video_title: string | null;
  thumbnail: string | null;
  client_name: string | null;
}

interface TestimonialsProps {
  testimonials?: TestimonialData[];
}

const defaultTextTestimonials = [
  { id: "1", type: "text" as const, name: "Алишер Каримов", role: "Владелец сети «Плов центр»", location: "Ташкент", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", text: "Благодаря FOOD COST мы смогли снизить себестоимость блюд на 12% и увеличить прибыль на 25%. Профессиональный подход и глубокое понимание ресторанного бизнеса!", rating: 5, video_id: null, video_title: null, thumbnail: null, client_name: null },
  { id: "2", type: "text" as const, name: "Мадина Рахимова", role: "Управляющая кофейни", location: "Алматы", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", text: "Команда FOOD COST помогла нам полностью перестроить систему учёта. Теперь мы точно знаем себестоимость каждого напитка и можем принимать обоснованные решения.", rating: 5, video_id: null, video_title: null, thumbnail: null, client_name: null },
  { id: "3", type: "text" as const, name: "Бахтиёр Усманов", role: "Директор ресторана «Самарканд»", location: "Самарканд", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", text: "Отличная работа! За 3 месяца food cost снизился с 38% до 28%. Рекомендую всем, кто хочет навести порядок в учёте своего заведения.", rating: 5, video_id: null, video_title: null, thumbnail: null, client_name: null },
  { id: "4", type: "text" as const, name: "Камила Назарова", role: "Совладелец сети кофеен", location: "Нур-Султан", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", text: "Работаем с FOOD COST уже 2 года. Надёжные партнёры, всегда на связи, помогают решать любые вопросы по учёту. Очень довольны сотрудничеством!", rating: 5, video_id: null, video_title: null, thumbnail: null, client_name: null },
  { id: "5", type: "text" as const, name: "Рустам Ибрагимов", role: "Владелец ресторана", location: "Бухара", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", text: "Профессионалы своего дела. Провели полный аудит, выявили все проблемы и помогли их решить. Теперь бизнес работает как часы.", rating: 5, video_id: null, video_title: null, thumbnail: null, client_name: null },
];

const defaultVideoTestimonials = [
  { id: "v1", type: "video" as const, name: "Отзыв клиента #1", role: "short", location: "", avatar: null, text: null, rating: 5, video_id: "RMFF5yRB_JI", video_title: "Отзыв о работе с FOOD COST", thumbnail: "https://img.youtube.com/vi/RMFF5yRB_JI/hqdefault.jpg", client_name: "Клиент FOOD COST" },
  { id: "v2", type: "video" as const, name: "Отзыв клиента #2", role: "short", location: "", avatar: null, text: null, rating: 5, video_id: "eegQdfusD3c", video_title: "Результаты сотрудничества с FOOD COST", thumbnail: "https://img.youtube.com/vi/eegQdfusD3c/hqdefault.jpg", client_name: "Клиент FOOD COST" },
  { id: "v3", type: "video" as const, name: "Отзыв клиента #3", role: "short", location: "", avatar: null, text: null, rating: 5, video_id: "LtB-Y47p9vA", video_title: "Отзыв клиента о сотрудничестве", thumbnail: "https://img.youtube.com/vi/LtB-Y47p9vA/hqdefault.jpg", client_name: "Владелец проектов OKO, OBLAKO LOUNGE, ВМЯСО" },
];

export default function Testimonials({ testimonials: testimonialsProp }: TestimonialsProps) {
  const allTestimonials: TestimonialData[] = testimonialsProp || [...defaultTextTestimonials, ...defaultVideoTestimonials];
  const testimonials = allTestimonials.filter(t => t.type === 'text');
  const videoTestimonials = allTestimonials.filter(t => t.type === 'video');
  const [activeVideo, setActiveVideo] = useState<TestimonialData | null>(null);

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
        {videoTestimonials.length > 0 && (
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

            <div className={`grid gap-6 ${
              videoTestimonials.length <= 2
                ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {videoTestimonials.map((video, index) => (
                <motion.div
                  key={video.id || video.video_title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className={`relative ${video.role === 'short' ? 'aspect-[3/4]' : 'aspect-video'}`}>
                    <img
                      src={video.thumbnail || `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`}
                      alt={video.video_title || ""}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
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
                    <h4 className="font-semibold text-white">{video.video_title}</h4>
                    <p className="text-sm text-slate-300">{video.client_name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
              className={`relative ${
                activeVideo.role === 'short'
                  ? 'w-full max-w-[380px] aspect-[9/16] max-h-[85vh]'
                  : 'w-full max-w-4xl aspect-video'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.video_id}?autoplay=1`}
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
                key={testimonial.id || testimonial.name}
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
                    &ldquo;{testimonial.text}&rdquo;
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
                      src={testimonial.avatar || ""}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#5838a8]/20"
                      loading="lazy"
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
