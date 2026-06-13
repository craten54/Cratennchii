import React from "react";
import Link from "next/link";
import TechStackSection from "@/components/TechStackSection";

export default function TechStackPage() {
  return (
    <main className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-20 flex flex-col gap-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
        <Link href="/" className="hover:text-amber-400 transition-colors uppercase">
          {"// HOME"}
        </Link>
        <span className="text-zinc-700">/</span>
        <span className="text-amber-400 uppercase">TECH STACK</span>
      </nav>

      {/* Render the Tech Stack Section */}
      <TechStackSection />
    </main>
  );
}
