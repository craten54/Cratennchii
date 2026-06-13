import React from "react";
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiPostgresql, 
  SiSupabase, 
  SiPrisma, 
  SiHtml5
} from "react-icons/si";
import { FaGitAlt, FaLinux, FaShieldAlt } from "react-icons/fa";
import { TbTerminal, TbSearch } from "react-icons/tb";

interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Security & Tools";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: "Next.js",
    category: "Frontend",
    icon: SiNextdotjs,
    description: "App Router, Server Actions, & static pre-rendering optimization."
  },
  {
    name: "React",
    category: "Frontend",
    icon: SiReact,
    description: "Interactive UI creation, custom hook development, and virtual DOM mapping."
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: SiTypescript,
    description: "Strict typing contracts, custom interface typing, and error mitigation."
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: SiTailwindcss,
    description: "Utility-first CSS styling frameworks & responsive grid spacing designs."
  },
  {
    name: "HTML5 Canvas",
    category: "Frontend",
    icon: SiHtml5,
    description: "Decoupled rendering loops, particle dynamics, and custom physics."
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: TbTerminal,
    description: "Event-driven asynchronous JS servers and environment configurations."
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    icon: SiPostgresql,
    description: "Relational database setup, performance queries, and strict indexing."
  },
  {
    name: "Supabase",
    category: "Backend",
    icon: SiSupabase,
    description: "Real-time client synchronization, OAuth setups, and serverless databases."
  },
  {
    name: "Prisma ORM",
    category: "Backend",
    icon: SiPrisma,
    description: "Type-safe database mapping, migration handling, and relationship validation."
  },
  {
    name: "Linux (Debian/Ubuntu)",
    category: "Security & Tools",
    icon: FaLinux,
    description: "Bash execution scripts, file systems permissions, and security hardening."
  },
  {
    name: "Nmap & SQLmap",
    category: "Security & Tools",
    icon: FaShieldAlt,
    description: "Active network scans, vulnerability probes, and database SQL injections detection."
  },
  {
    name: "Git & GitHub",
    category: "Security & Tools",
    icon: FaGitAlt,
    description: "Structured branch workflows, commit rollbacks, and team version control."
  },
  {
    name: "OSINT Techniques",
    category: "Security & Tools",
    icon: TbSearch,
    description: "Open-source intelligence investigations and target metadata reconnaissance."
  }
];

export default function TechStackSection() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
      case "Backend":
        return "text-cyan-400 border-cyan-500/20 bg-cyan-500/5";
      default:
        return "text-amber-400 border-amber-500/20 bg-amber-500/5";
    }
  };

  const getBorderColorClass = (category: string) => {
    switch (category) {
      case "Frontend":
        return "hover:border-emerald-500/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.06)]";
      case "Backend":
        return "hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.06)]";
      default:
        return "hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.06)]";
    }
  };

  return (
    <section id="techstack" className="flex flex-col gap-12 py-12 border-t border-zinc-900/60">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">
          {"// CORE TECHNOLOGICAL INDEX"}
        </span>
        <h2 className="text-3xl font-light tracking-tight text-white font-sans">
          Technical <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400">Weaponry & Stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECH_ITEMS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.name}
              className={`border border-zinc-800/60 bg-black/60 p-6 flex flex-col gap-4 transition-all duration-300 rounded-sm relative group overflow-hidden ${getBorderColorClass(
                item.category
              )}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[9px] px-2.5 py-0.5 border uppercase tracking-wider ${getCategoryColor(
                  item.category
                )}`}>
                  {item.category}
                </span>
                <IconComponent className="size-6 text-zinc-500 group-hover:text-zinc-100 transition-colors duration-300" />
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-zinc-100 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
