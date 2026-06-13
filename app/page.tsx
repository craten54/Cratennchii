"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Import modern cyber-themed icons
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

interface TerminalLog {
  id: string;
  time: string;
  category: "info" | "warn" | "success" | "critical";
  message: string;
}

const formatInteger = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Home() {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: "1", time: "08:12:04", category: "info", message: "System initialized. Environment setup: Next.js + TypeScript." },
    { id: "2", time: "08:12:35", category: "success", message: "Secure anti-gravity canvas physics bound to main thread." },
    { id: "3", time: "08:14:12", category: "info", message: "Fetching localized infrastructure protocols for 'Panganesia'." },
    { id: "4", time: "08:15:00", category: "success", message: "Database relationship schemas successfully compiled via Prisma ORM." },
  ]);

  const [activeTab, setActiveTab] = useState<"terminal" | "skills" | "about">("terminal");
  const [visitorCount, setVisitorCount] = useState(1024);

  useEffect(() => {
    const visitorTimer = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 8000);

    const logPool = [
      { category: "info", message: "Exploring Next.js App Router performance optimizations & strict type isolation." },
      { category: "success", message: "Project 'Panganesia' database schemas finalized inside Supabase container." },
      { category: "warn", message: "Executing internal sandbox vulnerability assessments (SQLMap/Nmap simulations)." },
      { category: "info", message: "Refining data isolation states and cryptographic visualizations for 'CashMap'." },
      { category: "success", message: "Enforcing clean code compliance and strict layout responsive rules." },
    ] as const;

    const logTimer = setInterval(() => {
      const selected = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      setLogs((prev) => [
        ...prev.slice(1),
        {
          id: Math.random().toString(),
          time: timeStr,
          category: selected.category,
          message: selected.message,
        },
      ]);
    }, 6000);

    return () => {
      clearInterval(visitorTimer);
      clearInterval(logTimer);
    };
  }, []);

  const SOCIAL_LINKS = {
    github: "https://github.com/craten54",
    linkedin: "https://www.linkedin.com/in/stan-fredheric-tenszchii/",
    instagram: "https://www.instagram.com/unknown__t_e_n/",
    email: "mailto:standhric2024@gmail.com",
    discord: "https://discord.com/users/1439953365294514209"
  };

  return (
    <div className="relative w-full overflow-x-hidden text-zinc-900 dark:text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-20 flex flex-col gap-24">

        {/* Section 1: Overview & Welcome Landing (Home) */}
        <section id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-200px)]">

          {/* Left Column: Biodata & Main Headline */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-center">
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald-500 inline-block" /> COMPUTER SCIENCE STUDENT
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 leading-tight">
              Stan Fredheric
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Mahasiswa Teknik Informatika di Universitas Padjadjaran dengan focus mendalam pada full-stack web development, keamanan siber, dan manajemen ekosistem digital. Di satu sisi, saya aktif membangun aplikasi web interaktif berkinerja tinggi using Next.js, Tailwind CSS, dan Supabase. Di sisi lain, sebagai seorang cyber enthusiast, saya mendedikasikan waktu untuk mengeksplorasi tantangan CTF guna mengasah keahlian di bidang penetration testing, OSINT, dan analisis kerentanan sistem, sembari turut mengelola aspek operasional serta tata tertib komunitas digital. Melalui portofolio ini, saya mengintegrasikan prinsip keamanan siber ke dalam arsitektur kode modern to menciptakan solusi digital yang kokoh, fungsional, and production-ready.
            </p>

            {/* Social Media Connectors */}
            <div className="flex flex-wrap gap-3 items-center pt-2">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[11px] border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 py-2.5 transition-all shadow-sm dark:shadow-none"
              >
                <FiGithub className="size-4 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
                <span className="tracking-wider">GITHUB</span>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[11px] border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 py-2.5 transition-all shadow-sm dark:shadow-none"
              >
                <FiLinkedin className="size-4 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                <span className="tracking-wider">LINKEDIN</span>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[11px] border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 py-2.5 transition-all shadow-sm dark:shadow-none"
              >
                <FiInstagram className="size-4 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors" />
                <span className="tracking-wider">INSTAGRAM</span>
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[11px] border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 py-2.5 transition-all shadow-sm dark:shadow-none"
              >
                <FaDiscord className="size-4 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                <span className="tracking-wider">DISCORD</span>
              </a>
              <a
                href={SOCIAL_LINKS.email}
                className="group flex items-center gap-2 font-mono text-[11px] border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 py-2.5 transition-all shadow-sm dark:shadow-none"
              >
                <FiMail className="size-4 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" />
                <span className="tracking-wider">EMAIL</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/projects"
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-xs font-semibold px-6 py-3.5 transition-all tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              >
                GET TO KNOW ME MORE
              </Link>
            </div>
          </div>

          {/* Right Column: HUD Dashboard Monitor */}
          <div className="lg:col-span-5 border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-black/80 rounded-sm shadow-2xl p-6 flex flex-col justify-between min-h-[400px] backdrop-blur-sm shadow-zinc-200/50 dark:shadow-none">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="size-1.5 rounded-full bg-red-500/60" />
                    <span className="size-1.5 rounded-full bg-yellow-500/60" />
                    <span className="size-1.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 tracking-wider">CORE_MONITOR.SH</span>
                </div>
                <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  TELEMETRY: <span className="text-emerald-600 dark:text-emerald-400 font-medium">ONLINE</span>
                </div>
              </div>

              <div className="grid grid-cols-3 border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-950 p-1 rounded-sm">
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`font-mono text-[10px] py-1.5 transition-all text-center cursor-pointer ${
                    activeTab === "terminal" ? "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  LIVE_ACTIVITY
                </button>
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`font-mono text-[10px] py-1.5 transition-all text-center cursor-pointer ${
                    activeTab === "skills" ? "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  TECH_STACK
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={`font-mono text-[10px] py-1.5 transition-all text-center cursor-pointer ${
                    activeTab === "about" ? "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  SYSTEM_METRICS
                </button>
              </div>

              <div className="h-[180px] overflow-hidden">
                {activeTab === "terminal" && (
                  <div className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed text-zinc-650 dark:text-zinc-300 overflow-y-auto pr-1 h-full select-none">
                    <div className="text-zinc-400 dark:text-zinc-600 border-b border-zinc-100 dark:border-zinc-900/60 pb-1 mb-1">{"// Automated environment execution trace:"}</div>
                    {logs.map((log) => (
                      <div key={log.id} className="flex gap-2 items-start">
                        <span className="text-zinc-400 dark:text-zinc-600 shrink-0">[{log.time}]</span>
                        <span className={`shrink-0 uppercase text-[9px] px-1 font-bold ${
                          log.category === "success" ? "bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400" :
                          log.category === "warn" ? "bg-yellow-100 dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-500/30 text-yellow-800 dark:text-yellow-400" :
                          "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}>
                          {log.category}
                        </span>
                        <span className="text-zinc-700 dark:text-zinc-300 break-words">{log.message}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="grid grid-cols-1 gap-3 font-mono text-[11px] overflow-y-auto h-full">
                    <div>
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">{"[FRONTEND_INFRASTRUCTURE]"}</span>
                      <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">React, Next.js, TypeScript, Tailwind CSS, Astro</p>
                    </div>
                    <div>
                      <span className="text-cyan-600 dark:text-cyan-400 text-[10px]">{"[BACKEND_CONTAINERIZATION]"}</span>
                      <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">Node.js, Prisma ORM, Supabase, PostgreSQL</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 dark:text-zinc-400 text-[10px]">{"[SECURITY_AND_ENV_TOOLS]"}</span>
                      <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">Nmap, Sqlmap, OSINT Assessments, Git/GitHub, Linux</p>
                    </div>
                  </div>
                )}

                {activeTab === "about" && (
                  <div className="flex flex-col justify-center gap-4 h-full border border-zinc-100 dark:border-zinc-900 bg-zinc-50/40 dark:bg-zinc-950/40 p-4 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <span className="text-zinc-400 dark:text-zinc-500">ENGINE_RUNTIME</span>
                      <span className="text-zinc-700 dark:text-zinc-300">Next.js 16 (App Router)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-2">
                      <span className="text-zinc-400 dark:text-zinc-500">TYPE_CHECKING</span>
                      <span className="text-emerald-650 dark:text-emerald-400 font-medium">STRICT_TYPES // TRUE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 dark:text-zinc-500">SIMULATED_PEER_LOAD</span>
                      <span className="text-zinc-700 dark:text-zinc-300 animate-pulse">{formatInteger(visitorCount)} PKTS/s</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Connect Footer for Dashboard Panel */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between font-mono text-[10px] text-zinc-450 dark:text-zinc-500">
              <span>QUICK_CONNECT //</span>
              <div className="flex gap-4 text-zinc-600 dark:text-zinc-400">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"><FiGithub size={13} /></a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><FiLinkedin size={13} /></a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors"><FiInstagram size={13} /></a>
                <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"><FaDiscord size={13} /></a>
                <a href={SOCIAL_LINKS.email} className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"><FiMail size={13} /></a>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}