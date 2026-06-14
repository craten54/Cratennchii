import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { FaJava } from "react-icons/fa";
import { 
  SiPhp, 
  SiPython, 
  SiNextdotjs, 
  SiHtml5, 
  SiUnity, 
  SiGooglechrome, 
  SiAstro
} from "react-icons/si";

interface ProjectItem {
  title: string;
  description: string;
  github?: string;
  tech: string[];
  techIcon: React.ComponentType<{ className?: string }>;
  status?: string;
}

const PROJECTS_BY_YEAR: Record<string, ProjectItem[]> = {
  "2024": [
    {
      title: "Expense Tracker",
      description: "Web application project engineered for the Pemrograman Web course at Universitas Padjadjaran.",
      github: "https://github.com/praktikum-tiunpad-2023/project-pemrograman-web-b-bangsawan-cina-b.git",
      tech: ["PHP", "JavaScript", "HTML5", "CSS3"],
      techIcon: SiPhp,
    },
    {
      title: "Tetris Game",
      description: "A simple offline Tetris game built in Java with a graphical user interface.",
      tech: ["Java", "Swing", "AWT"],
      techIcon: FaJava,
    }
  ],
  "2025": [
    {
      title: "K-Means Color Picker",
      description: "A machine learning color palette extractor that segmentizes and identifies primary colors from images using the K-Means clustering algorithm.",
      github: "https://github.com/craten54/Kmeans-color-picker",
      tech: ["Python", "K-Means", "OpenCV", "NumPy"],
      techIcon: SiPython,
    },
    {
      title: "micin.life",
      description: "Personal web application spaces and interactive online community platform.",
      github: "https://github.com/azukashi/micin.life",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      techIcon: SiNextdotjs,
    },
    {
      title: "Anniversary Gummy",
      description: "A creative, interactive digital anniversary gift landing page with personalized vectors and animations.",
      github: "https://github.com/craten54/Anniversary_Gummy.git",
      tech: ["Astro", "CSS", "JavaScript"],
      techIcon: SiAstro,
    }
  ],
  "2026": [
    {
      title: "Youtube-timestamp-extension",
      description: "A Chrome Extension designed to seamlessly capture, catalog, and navigate custom YouTube video timestamps.",
      github: "https://github.com/craten54/Yt-timestamp-extension",
      tech: ["TypeScript", "Chrome Extension API", "HTML5", "CSS"],
      techIcon: SiGooglechrome,
      status: "onprogress"
    },
    {
      title: "Panganesia",
      description: "Core frontend application interface engineered for Kelompok-7-PPL-I software engineering coursework.",
      github: "https://github.com/Kelompok-7-PPL-I/ppl-frontend",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      techIcon: SiNextdotjs,
    },
    {
      title: "Infiltra-VR",
      description: "An immersive virtual reality infiltration and tactical stealth simulation built using 3D physics.",
      github: "https://github.com/luthfiarsd/Infiltra-VR",
      tech: ["Unity", "C#", "SteamVR", "3D Physics"],
      techIcon: SiUnity,
    }
  ]
};

export default function ProjectSection() {
  return (
    <section className="flex flex-col gap-16 py-12">
      {/* Centered Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900 dark:text-white font-sans">
          Projects
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
          Projects that I created or maintaining.
        </p>
      </div>

      {/* Timeline of Projects */}
      <div className="flex flex-col gap-16">
        {Object.entries(PROJECTS_BY_YEAR).reverse().map(([year, projects]) => (
          <div key={year} className="flex flex-col gap-6">
            {/* Year Heading */}
            <h2 className="text-outline-cyber text-6xl md:text-8xl font-black select-none tracking-widest font-mono">
              {year}
            </h2>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const Icon = project.techIcon;
                return (
                  <a
                    key={idx}
                    href={project.github || "#"}
                    target={project.github ? "_blank" : undefined}
                    rel={project.github ? "noopener noreferrer" : undefined}
                    className="border border-zinc-200 dark:border-zinc-900/80 bg-white/60 dark:bg-black/60 hover:bg-zinc-50 dark:hover:bg-black/80 hover:border-emerald-500/30 p-6 rounded-sm flex gap-4 transition-all duration-300 group cursor-pointer shadow-sm dark:shadow-none"
                  >
                    {/* Tech Icon */}
                    <div className="shrink-0 flex items-start pt-1">
                      <Icon className="size-6 text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300" />
                    </div>

                    {/* Project Info */}
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight group-hover:text-zinc-950 dark:group-hover:text-white transition-colors flex items-center gap-1.5 flex-wrap">
                          {project.title}
                          {project.status && (
                            <span className="text-[9px] font-mono uppercase bg-amber-100 dark:bg-yellow-950/60 border border-amber-300 dark:border-yellow-500/20 text-amber-800 dark:text-yellow-400 px-1.5 py-0.5 rounded-sm shrink-0">
                              {project.status}
                            </span>
                          )}
                        </h3>
                        {project.github && (
                          <FiExternalLink className="size-3 text-zinc-400 dark:text-zinc-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors shrink-0" />
                        )}
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                        {project.description}
                      </p>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tech.map((techItem) => (
                          <span
                            key={techItem}
                            className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 text-zinc-600 dark:text-zinc-500 font-mono text-[9px] px-2 py-0.5"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}