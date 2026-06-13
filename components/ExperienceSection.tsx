import React from "react";
import { FiShield, FiUsers, FiExternalLink, FiActivity, FiLock, FiTrendingUp } from "react-icons/fi";

interface CapabilityItem {
  title: string;
  description: string;
  link?: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  status?: string;
}

const CYLAB_ITEM: CapabilityItem = {
  title: "CyLab Academy Training Profile",
  link: "https://learn.cylabacademy.org/profile",
  description: "Intense skill acquisition in cybersecurity defense, offensive systems, and server management pipelines (grinding continuously from 2024 - 2026).",
  tags: ["CyLab Academy", "Security Grinding", "Network Probes"],
  icon: FiLock,
};

const CAPABILITIES_BY_YEAR: Record<string, CapabilityItem[]> = {
  "2024": [
    { ...CYLAB_ITEM },
    {
      title: "Capture The Flag (CTF) Competitions",
      description: "Participating in cybersecurity CTF tournaments, solving complex jeopardy-style challenges in web exploitation, cryptography, and network forensics.",
      tags: ["Cybersecurity", "CTF Challenges", "Infosec"],
      icon: FiShield,
    },
    {
      title: "Community Moderation & Management",
      description: "Active moderator for high-traffic digital communities, setting safety guidelines and building interaction policies.",
      tags: ["Moderation", "Community Management", "Rules Enforcement"],
      icon: FiUsers,
    }
  ],
  "2025": [
    { ...CYLAB_ITEM }
  ],
  "2026": [
    { ...CYLAB_ITEM, status: "onprogress" },
    {
      title: "Digital Asset & Event Logistics",
      description: "Orchestrated digital asset logistics, physical community pipelines, cross-border pre-order systems, and scaled operational workflows.",
      tags: ["Event Logistics", "Community Operations"],
      icon: FiActivity,
    },
    {
      title: "Crisis & Moderation Handling",
      description: "Designed robust community safety frameworks, permission structures, and moderation pipelines to counter structural community threats.",
      tags: ["Crisis Operations", "Interaction Architecture", "Security Rules"],
      icon: FiLock,
    },
    {
      title: "Talent Management Operations",
      description: "Serving as a talent manager coordinating career opportunities, scheduler synchronizations, contract negotiations, and strategic brand positioning.",
      tags: ["Talent Operations", "Leadership", "Coordination"],
      icon: FiTrendingUp,
    }
  ]
};

export default function ExperienceSection() {
  return (
    <section className="flex flex-col gap-16 py-12">
      {/* Centered Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <span className="font-mono text-xs text-cyan-500 dark:text-cyan-400 tracking-widest uppercase">
          {"// CAPABILITIES TIMELINE"}
        </span>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900 dark:text-white font-sans">
          Capabilities
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
          My skills, experiences, and community milestones over the years.
        </p>
      </div>

      {/* Timeline of Capabilities */}
      <div className="flex flex-col gap-16">
        {Object.entries(CAPABILITIES_BY_YEAR).reverse().map(([year, items]) => (
          <div key={year} className="flex flex-col gap-6">
            {/* Year Heading */}
            <h2 className="text-outline-cyber text-6xl md:text-8xl font-black select-none tracking-widest font-mono">
              {year}
            </h2>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.link || "#"}
                    target={item.link ? "_blank" : undefined}
                    rel={item.link ? "noopener noreferrer" : undefined}
                    className={`border border-zinc-200 dark:border-zinc-900/80 bg-white/60 dark:bg-black/60 hover:bg-zinc-50 dark:hover:bg-black/80 hover:border-cyan-500/30 p-6 rounded-sm flex flex-col gap-4 transition-all duration-300 group shadow-sm dark:shadow-none ${
                      item.link ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {/* Header: Icon & External Link */}
                    <div className="flex items-center justify-between">
                      <Icon className="size-6 text-zinc-400 dark:text-zinc-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300" />
                      {item.link && (
                        <FiExternalLink className="size-3 text-zinc-400 dark:text-zinc-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors shrink-0" />
                      )}
                    </div>

                    {/* Information */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight group-hover:text-zinc-955 dark:group-hover:text-white transition-colors flex items-center gap-1.5 flex-wrap">
                        {item.title}
                        {item.status && (
                          <span className="text-[9px] font-mono uppercase bg-amber-100 dark:bg-yellow-950/60 border border-amber-300 dark:border-yellow-500/20 text-amber-800 dark:text-yellow-400 px-1.5 py-0.5 rounded-sm shrink-0">
                            {item.status}
                          </span>
                        )}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-950">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 text-zinc-600 dark:text-zinc-550 font-mono text-[9px] px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
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