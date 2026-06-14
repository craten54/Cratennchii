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
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const [visitorCount, setVisitorCount] = useState(1024);
  const [commandInput, setCommandInput] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [imageError, setImageError] = useState(false);
  const logEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logs.length === 0) {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      setLogs([
        { id: "init-1", time: timeStr, category: "info", message: "System core trace initialized successfully." },
        { id: "init-2", time: timeStr, category: "info", message: "Type 'help' to fetch active environment command console." }
      ]);
    }
  }, [logs]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    const visitorTimer = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 8000);

    return () => {
      clearInterval(visitorTimer);
    };
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setTimeout(() => {
      if (logEndRef.current) {
        logEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);

    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];

    const args = trimmed.split(" ");
    const commandName = args[0].toLowerCase();

    if (commandName === "gacha" || commandName === "coin" || commandName === "roll") {
      if (isRolling) {
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            time: timeStr,
            category: "critical",
            message: "⚠️ PROCESS_LOCKED: Gacha spin is already in progress!"
          }
        ]);
        setCommandInput("");
        return;
      }

      setIsRolling(true);
      const gachaSymbols = ["🪙", "💎", "🍀", "💀", "⚡", "🔥"];
      const rollDuration = 1800; // ms
      const intervalTime = 150; // ms

      const inputLog: TerminalLog = {
        id: Math.random().toString(),
        time: timeStr,
        category: "info",
        message: `visitor@stan-os:~$ ${trimmed}`
      };

      setLogs((prev) => [
        ...prev,
        inputLog,
        {
          id: Math.random().toString(),
          time: timeStr,
          category: "info",
          message: "🪙 Inserting credit... Initializing Slot Machine..."
        }
      ]);

      let elapsed = 0;
      const rollTimer = setInterval(() => {
        elapsed += intervalTime;
        const sym1 = gachaSymbols[Math.floor(Math.random() * gachaSymbols.length)];
        const sym2 = gachaSymbols[Math.floor(Math.random() * gachaSymbols.length)];
        const sym3 = gachaSymbols[Math.floor(Math.random() * gachaSymbols.length)];

        setLogs((prev) => {
          const withoutLast = prev.filter(l => l.id !== "spinning-gacha");
          return [
            ...withoutLast,
            {
              id: "spinning-gacha",
              time: new Date().toTimeString().split(" ")[0],
              category: "info",
              message: `🎰 SPINNING: [ ${sym1} ] [ ${sym2} ] [ ${sym3} ]`
            }
          ];
        });

        if (elapsed >= rollDuration) {
          clearInterval(rollTimer);
          setIsRolling(false);

          const s1 = gachaSymbols[Math.floor(Math.random() * gachaSymbols.length)];
          const s2 = gachaSymbols[Math.floor(Math.random() * gachaSymbols.length)];
          const s3 = gachaSymbols[Math.floor(Math.random() * gachaSymbols.length)];

          let winMessage = "";
          let winCategory: TerminalLog["category"] = "warn";

          if (s1 === s2 && s2 === s3) {
            if (s1 === "💀") {
              winMessage = `🎰 RESULT: [ 💀 ] [ 💀 ] [ 💀 ] - TRIPLE DEATH! You got cursed... 💀`;
              winCategory = "critical";
            } else if (s1 === "🪙" || s1 === "💎") {
              winMessage = `🎰 RESULT: [ ${s1} ] [ ${s1} ] [ ${s1} ] - JACKPOT! 🎉 You won the grand treasure!`;
              winCategory = "success";
            } else {
              winMessage = `🎰 RESULT: [ ${s1} ] [ ${s1} ] [ ${s1} ] - TRIPLE MATCH! Super lucky! 🍀`;
              winCategory = "success";
            }
          } else if (s1 === s2 || s2 === s3 || s1 === s3) {
            winMessage = `🎰 RESULT: [ ${s1} ] [ ${s2} ] [ ${s3} ] - Double match! Good spin! 🍀`;
            winCategory = "success";
          } else {
            winMessage = `🎰 RESULT: [ ${s1} ] [ ${s2} ] [ ${s3} ] - No match. Try again! 🪙`;
            winCategory = "warn";
          }

          setLogs((prev) => {
            const withoutLast = prev.filter(l => l.id !== "spinning-gacha");
            return [
              ...withoutLast,
              {
                id: Math.random().toString(),
                time: new Date().toTimeString().split(" ")[0],
                category: winCategory,
                message: winMessage
              }
            ];
          });

          setTimeout(() => {
            if (logEndRef.current) {
              logEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }, 50);
        }
      }, intervalTime);

      setCommandInput("");
      return;
    }

    const inputLog: TerminalLog = {
      id: Math.random().toString(),
      time: timeStr,
      category: "info",
      message: `visitor@stan-os:~$ ${trimmed}`
    };

    let outputs: { category: TerminalLog["category"]; message: string }[] = [];

    switch (commandName) {
      case "help":
        outputs = [
          { category: "info", message: "Available Commands:" },
          { category: "info", message: "  help      - Show this command reference list" },
          { category: "info", message: "  about     - Retrieve developer bio & profile data" },
          { category: "info", message: "  neofetch  - Output system status & ASCII brand logo" },
          { category: "info", message: "  skills    - Print key technical capabilities" },
          { category: "info", message: "  theme     - Trigger light/dark mode site transition" },
          { category: "info", message: "  gacha     - Spin the interactive coin gacha slot" },
          { category: "info", message: "  clear     - Clean/wipe the terminal workspace" },
          { category: "info", message: "  sudo      - Attempt superuser command injection" }
        ];
        break;
      case "about":
        outputs = [
          { category: "success", message: "STAN FREDHERIC // Computer Science Student at Universitas Padjadjaran." },
          { category: "info", message: "Focus: Full-stack Web Development, Cyber Security, Digital Ecosystem Management." },
          { category: "info", message: "Special interest in CTF challenges, penetration testing, and OSINT analysis." }
        ];
        break;
      case "skills":
        outputs = [
          { category: "success", message: "[FRONTEND] React, Next.js, TypeScript, Tailwind CSS, Astro" },
          { category: "success", message: "[BACKEND] Node.js, Prisma ORM, Supabase, PostgreSQL" },
          { category: "success", message: "[SECURITY] Nmap, Sqlmap, OSINT, Linux Scripting" }
        ];
        break;
      case "theme":
        outputs = [
          { category: "success", message: "Initiating transition sequence..." }
        ];
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("trigger-theme-toggle"));
        }
        break;
      case "clear":
        setLogs([]);
        setCommandInput("");
        return;
      case "sudo":
        outputs = [
          { category: "critical", message: "Permission Denied: Nice try, hacker! 😉" }
        ];
        break;
      case "neofetch":
        outputs = [
          { category: "success", message: "   _____ _                 " },
          { category: "success", message: "  / ____| |                " },
          { category: "success", message: " | (___ | |_ __ _ _ __     " },
          { category: "success", message: "  \\___ \\| __/ _` | '_ \\    " },
          { category: "success", message: "  ____) | || (_| | | | |   " },
          { category: "success", message: " |_____/ \\__\\__,_|_| |_|   " },
          { category: "info", message: "------------------------" },
          { category: "info", message: "OS: Stan-OS v1.0.4 (Next.js)" },
          { category: "info", message: "SHELL: sh/bash (Telemetry Mode)" },
          { category: "info", message: "STATUS: Online & building." }
        ];
        break;
      default:
        outputs = [
          { category: "critical", message: `Command not found: '${commandName}'. Type 'help' for options.` }
        ];
        break;
    }

    const newLogsToAppend = [
      inputLog,
      ...outputs.map((out) => ({
        id: Math.random().toString(),
        time: timeStr,
        category: out.category,
        message: out.message
      }))
    ];

    setLogs((prev) => {
      const combined = [...prev, ...newLogsToAppend];
      if (combined.length > 30) {
        return combined.slice(combined.length - 30);
      }
      return combined;
    });

    setCommandInput("");
  };

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
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-[1px] bg-emerald-500 inline-block" /> COMPUTER SCIENCE STUDENT
            </span>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 leading-tight">
              Stan Fredheric
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
              Mahasiswa Computer Science di Universitas Padjadjaran dengan fokus mendalam pada <em>full-stack web development</em>, keamanan siber, dan manajemen ekosistem digital. Di satu sisi, saya aktif membangun aplikasi web interaktif berkinerja tinggi menggunakan Next.js, Tailwind CSS, dan Supabase. Di sisi lain, sebagai seorang <em>cyber enthusiast</em>, saya mendedikasikan waktu untuk mengeksplorasi tantangan CTF guna mengasah keahlian di bidang <em>penetration testing</em>, OSINT, dan analisis kerentanan sistem, sembari turut mengelola aspek operasional serta tata tertib komunitas digital. Melalui portofolio ini, saya mengintegrasikan prinsip keamanan siber ke dalam arsitektur kode modern untuk menciptakan solusi digital yang kokoh, fungsional, dan <em>production-ready</em>.
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
          <div className="lg:col-span-7 border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-black/80 rounded-sm shadow-2xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-zinc-200/50 dark:shadow-none">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-900">
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

              {/* Flex Layout yang Menyeimbangkan Kiri & Kanan */}
              <div className="flex flex-col md:flex-row gap-5 items-stretch">

                {/* Left Side: Profile Picture Box (Pas Lebar & Tinggi) */}
                <div className="w-full md:w-[150px] shrink-0 flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-950/20 p-3.5 rounded-sm self-start">
                  <div className="relative size-24 border border-emerald-500/30 dark:border-emerald-500/20 p-1 bg-zinc-950/20 shadow-[0_0_15px_rgba(16,185,129,0.08)] overflow-hidden group rounded-sm flex items-center justify-center">
                    {/* Glowing scanning overlay line */}
                    <div className="absolute inset-x-0 h-[1.5px] bg-emerald-500/60 shadow-[0_0_8px_#10b981] animate-scan z-10 pointer-events-none" />

                    {!imageError ? (
                      <img
                        src="/profile.png"
                        alt="Profile Picture"
                        onError={() => setImageError(true)}
                        className="size-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="size-full flex flex-col items-center justify-center bg-zinc-900/40 dark:bg-zinc-955/50 border border-dashed border-zinc-800 text-[8px] font-mono text-zinc-500 text-center gap-1 select-none">
                        <span className="text-emerald-500 text-lg">👽</span>
                        <span>[NO_PHOTO]</span>
                        <span>public/profile.png</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-0.5 text-center mt-3 w-full">
                    <span className="font-mono text-[10px] text-zinc-800 dark:text-zinc-100 font-semibold tracking-wider truncate w-full">
                      craten@stan-os
                    </span>

                    {/* Hyperlink Kredit Art Aktif */}
                    <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 tracking-wide mt-0.5">
                      Art by{" "}
                      <a
                        href="https://www.youtube.com/@PoffieHunni"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium transition-all"
                      >
                        poffie hunnie
                      </a>
                    </span>

                    <span className="font-mono text-[8px] text-zinc-400 dark:text-zinc-500 animate-pulse uppercase mt-1">
                      TLM: {formatInteger(visitorCount)} PKTS
                    </span>
                  </div>
                </div>

                {/* Right Side: Terminal CLI (LIVE_ACTIVITY) */}
                <div className="w-full md:flex-1 flex flex-col justify-between h-[175px]">
                  <div className="flex flex-col gap-1.5 font-mono text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300 overflow-y-auto pr-1 h-[145px] custom-scrollbar">
                    {logs.length === 0 ? null : (
                      logs.map((log) => (
                        <div key={log.id} className="flex gap-2 items-start">
                          <span className="text-zinc-400 dark:text-zinc-600 shrink-0">[{log.time}]</span>
                          <span className={`shrink-0 uppercase text-[8px] px-1 font-bold rounded-xs leading-4 ${log.category === "success" ? "bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400" :
                            log.category === "warn" ? "bg-yellow-100 dark:bg-yellow-950 border border-yellow-300 dark:border-yellow-500/30 text-yellow-800 dark:text-yellow-400" :
                              log.category === "critical" ? "bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-500/30 text-red-800 dark:text-red-400" :
                                "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                            }`}>
                            {log.category}
                          </span>
                          <span className="text-zinc-700 dark:text-zinc-300 break-words whitespace-pre-wrap flex-1">{log.message}</span>
                        </div>
                      ))
                    )}
                    <div ref={logEndRef} />
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommand(commandInput);
                    }}
                    className="flex gap-2 items-center border-t border-zinc-100 dark:border-zinc-900/60 pt-2 shrink-0"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[11px] shrink-0">visitor@stan-os:~$</span>
                    <input
                      type="text"
                      value={commandInput}
                      onChange={(e) => setCommandInput(e.target.value)}
                      className="bg-transparent text-zinc-800 dark:text-zinc-100 focus:outline-none flex-grow font-mono text-[11px] border-none outline-none p-0 focus:ring-0"
                      placeholder="type 'help'..."
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </form>
                </div>

              </div>
            </div>

            {/* Quick Connect Footer for Dashboard Panel */}
            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
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