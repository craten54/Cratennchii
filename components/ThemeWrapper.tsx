"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSun, FiMoon } from "react-icons/fi";
import CyberParticleField from "./CyberParticleField";
import ThemeTransitionOverlay from "./ThemeTransitionOverlay";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"dark" | "light">("dark");
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light";
    if (saved) {
      setTimeout(() => {
        setTheme(saved);
      }, 0);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(saved);
    }
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      document.documentElement.classList.add("theme-transitioning");
    } else {
      document.documentElement.classList.remove("theme-transitioning");
    }
    return () => {
      document.documentElement.classList.remove("theme-transitioning");
    };
  }, [isTransitioning]);

  useEffect(() => {
    const handleThemeTrigger = () => {
      if (isTransitioning) return;
      const next = theme === "dark" ? "light" : "dark";
      setClickPos(null);
      setTargetTheme(next);
      setIsTransitioning(true);
    };
    window.addEventListener("trigger-theme-toggle", handleThemeTrigger);
    return () => {
      window.removeEventListener("trigger-theme-toggle", handleThemeTrigger);
    };
  }, [theme, isTransitioning]);

  const handleToggleTheme = (e?: React.MouseEvent) => {
    if (isTransitioning) return;
    const next = theme === "dark" ? "light" : "dark";
    if (e) {
      setClickPos({ x: e.clientX, y: e.clientY });
    } else {
      setClickPos(null);
    }
    setTargetTheme(next);
    setIsTransitioning(true);
  };

  const handleMidpoint = () => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(targetTheme);
    localStorage.setItem("theme", targetTheme);
    setTheme(targetTheme);
  };

  const handleComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <>
      {/* Shared Particle Background across all routes */}
      <CyberParticleField
        particleCount={110}
        themeColor={theme === "dark" ? "#10b981" : "#06b6d4"}
        maxLineDistance={180}
      />

      {/* Transition Overlay */}
      {isTransitioning && (
        <ThemeTransitionOverlay
          theme={targetTheme}
          clickPos={clickPos}
          onMidpoint={handleMidpoint}
          onComplete={handleComplete}
        />
      )}

      {/* Global Navigation Header */}
      <header className="sticky top-0 z-50 w-full flex justify-center px-4 py-4 pointer-events-none">
        <div className="w-full max-w-5xl flex items-center justify-between border border-zinc-200/40 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg dark:shadow-none pointer-events-auto transition-all">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-widest text-zinc-900 dark:text-zinc-200 uppercase">
              Cratennchii
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] tracking-wider">
              <Link 
                href="/" 
                className={`transition-all rounded-full px-3.5 py-1.5 uppercase ${
                  pathname === "/" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/15" 
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                }`}
              >
                {"// HOME"}
              </Link>
              <Link 
                href="/projects" 
                className={`transition-all rounded-full px-3.5 py-1.5 uppercase ${
                  pathname === "/projects" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/15" 
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                }`}
              >
                {"// PROJECTS"}
              </Link>
              <Link 
                href="/capabilities" 
                className={`transition-all rounded-full px-3.5 py-1.5 uppercase ${
                  pathname === "/capabilities" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/15" 
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                }`}
              >
                {"// CAPABILITIES"}
              </Link>
              <Link 
                href="/techstack" 
                className={`transition-all rounded-full px-3.5 py-1.5 uppercase ${
                  pathname === "/techstack" 
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/15" 
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                }`}
              >
                {"// TECH_STACK"}
              </Link>
            </nav>

            {/* Dark/Light mode button */}
            <button
              onClick={handleToggleTheme}
              className="p-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all rounded-full cursor-pointer flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun className="size-4" /> : <FiMoon className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic page container */}
      <div className="flex-1 flex flex-col relative z-10">
        {children}
      </div>

      {/* Global Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900/80 bg-zinc-50/40 dark:bg-zinc-950/40 py-4 relative z-10 shrink-0">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-600 tracking-wider uppercase">
            © {new Date().getFullYear()} Cratennchii. BUILT WITH NEXT.JS APP ROUTER & STRICT TYPES.
          </span>
          <div className="flex gap-6 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
            <span className="text-zinc-500 dark:text-zinc-700">STATUS: NO_CRITICAL_VULN</span>
          </div>
        </div>
      </footer>
    </>
  );
}
