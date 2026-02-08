"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface ProjectLogoData {
  id: string;
  name: string;
  logo: string;
  website: string | null;
}

interface ProjectLogosProps {
  projects?: ProjectLogoData[];
}

const defaultProjects: ProjectLogoData[] = [
  { id: "1", name: "Плов центр", logo: "https://via.placeholder.com/200x80/f8f9fa/5838a8?text=Плов+центр", website: null },
  { id: "2", name: "Brew & Bite", logo: "https://via.placeholder.com/200x80/f8f9fa/5838a8?text=Brew+%26+Bite", website: null },
  { id: "3", name: "Самарканд", logo: "https://via.placeholder.com/200x80/f8f9fa/5838a8?text=Самарканд", website: null },
  { id: "4", name: "Dastarkhan", logo: "https://via.placeholder.com/200x80/f8f9fa/5838a8?text=Dastarkhan", website: null },
  { id: "5", name: "Silk Road", logo: "https://via.placeholder.com/200x80/f8f9fa/5838a8?text=Silk+Road", website: null },
  { id: "6", name: "Oasis Café", logo: "https://via.placeholder.com/200x80/f8f9fa/5838a8?text=Oasis+Café", website: null },
];

export default function ProjectLogos({ projects: projectsProp }: ProjectLogosProps) {
  const projects = projectsProp || defaultProjects;
  const trackRef = useRef<HTMLDivElement>(null);
  const firstHalfRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragMoved = useRef(false);
  const [halfWidth, setHalfWidth] = useState(0);

  // Measure the width of the first set of logos
  useEffect(() => {
    const measure = () => {
      if (firstHalfRef.current) {
        setHalfWidth(firstHalfRef.current.scrollWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects]);

  if (projects.length === 0) return null;

  // Speed: ~200px per second
  const duration = halfWidth > 0 ? halfWidth / 200 : 30;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    dragMoved.current = false;
    el.setPointerCapture(e.pointerId);
    setStartX(e.clientX);
    const style = getComputedStyle(el);
    const matrix = new DOMMatrix(style.transform);
    setScrollLeft(matrix.m41);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) dragMoved.current = true;
    trackRef.current.style.transform = `translateX(${scrollLeft + dx}px)`;
  }, [isDragging, startX, scrollLeft]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.transform = "";
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (dragMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const LogoItem = ({ project }: { project: ProjectLogoData }) => {
    const content = (
      <div className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center h-16 sm:h-20 w-[160px] sm:w-[200px] hover:scale-110 transition-transform duration-300">
        <img
          src={project.logo}
          alt={project.name}
          className="max-h-full max-w-full object-contain pointer-events-none select-none"
          draggable={false}
        />
      </div>
    );

    if (project.website) {
      return (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          title={project.name}
          onClick={handleClick}
          draggable={false}
        >
          {content}
        </a>
      );
    }

    return <div title={project.name}>{content}</div>;
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-[#5838a8] font-semibold text-sm uppercase tracking-wider">
            Наши клиенты
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
            Нам <span className="gradient-text">доверяют</span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden"
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-50/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-50/80 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className={`flex marquee-track ${isDragging ? "paused" : ""}`}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y",
            animationDuration: `${duration}s`,
            ["--marquee-distance" as string]: `-${halfWidth}px`,
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="flex items-center" ref={firstHalfRef}>
            {projects.map((project) => (
              <LogoItem key={project.id} project={project} />
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {projects.map((project) => (
              <LogoItem key={`dup-${project.id}`} project={project} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
