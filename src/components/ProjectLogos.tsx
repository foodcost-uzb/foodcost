"use client";

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

  if (projects.length === 0) return null;

  const LogoItem = ({ project }: { project: ProjectLogoData }) => {
    const content = (
      <div className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center h-16 sm:h-20 w-[160px] sm:w-[200px] grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
        <img
          src={project.logo}
          alt={project.name}
          className="max-h-full max-w-full object-contain"
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

        <div className="flex animate-marquee">
          <div className="flex items-center">
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
