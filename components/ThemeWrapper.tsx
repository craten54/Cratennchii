"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiSun, FiMoon } from "react-icons/fi";
import CyberParticleField from "./CyberParticleField";
import ThemeTransitionOverlay from "./ThemeTransitionOverlay";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"dark" | "light">("dark");
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);

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
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-900/60 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md px-6 py-4 transition-all">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-widest text-zinc-900 dark:text-zinc-200 uppercase">
              STAN FREDHERIC
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex items-center gap-8 font-mono text-[11px] text-zinc-600 dark:text-zinc-400 tracking-wider">
              <Link href="/" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase">{"// HOME"}</Link>
              <Link href="/projects" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase">{"// PROJECTS"}</Link>
              <Link href="/capabilities" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase">{"// CAPABILITIES"}</Link>
              <Link href="/techstack" className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase">{"// TECH_STACK"}</Link>
            </nav>

            {/* Dark/Light mode button */}
            <button
              onClick={handleToggleTheme}
              className="p-2 border border-zinc-200 dark:border-zinc-855 bg-zinc-50 dark:bg-zinc-950/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all rounded-sm cursor-pointer flex items-center justify-center"
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
      <footer className="border-t border-zinc-200 dark:border-zinc-900/80 bg-zinc-50/40 dark:bg-zinc-950/40 py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-mono text-[10px] text-zinc-500 dark:text-zinc-600 tracking-wider uppercase">
            © {new Date().getFullYear()} STAN FREDHERIC. BUILT WITH NEXT.JS APP ROUTER & STRICT TYPES.
          </span>
          <div className="flex gap-6 font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
            <span className="text-zinc-500 dark:text-zinc-700">STATUS: NO_CRITICAL_VULN</span>
          </div>
        </div>
      </footer>
    </>
  );
}
