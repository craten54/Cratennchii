import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CyberParticleField from "@/components/CyberParticleField";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STAN FREDHERIC // Next-Gen Web Portfolio",
  description: "Explore advanced web architectures and interactive solar-system particle fields built with Next.js, React, and HTML5 Canvas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-zinc-100">
        {/* Shared Particle Background across all routes */}
        <CyberParticleField particleCount={110} themeColor="#10b981" maxLineDistance={180} />

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b border-zinc-900/60 bg-[#0a0a0a]/70 backdrop-blur-md px-6 py-4 transition-all">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-widest text-zinc-200 uppercase">
                STAN FREDHERIC
              </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-8 font-mono text-[11px] text-zinc-400 tracking-wider">
              <Link href="/" className="hover:text-emerald-400 transition-colors uppercase">{"// HOME"}</Link>
              <Link href="/projects" className="hover:text-emerald-400 transition-colors uppercase">{"// PROJECTS"}</Link>
              <Link href="/capabilities" className="hover:text-emerald-400 transition-colors uppercase">{"// CAPABILITIES"}</Link>
              <Link href="/techstack" className="hover:text-emerald-400 transition-colors uppercase">{"// TECH_STACK"}</Link>
            </nav>
          </div>
        </header>


        {/* Dynamic page container */}
        <div className="flex-1 flex flex-col relative z-10">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="border-t border-zinc-900/80 bg-zinc-950/40 py-12 relative z-10">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="font-mono text-[10px] text-zinc-600 tracking-wider uppercase">
              © {new Date().getFullYear()} STAN FREDHERIC. BUILT WITH NEXT.JS APP ROUTER & STRICT TYPES.
            </span>
            <div className="flex gap-6 font-mono text-[10px] text-zinc-500">
              <span className="text-zinc-700">STATUS: NO_CRITICAL_VULN</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}