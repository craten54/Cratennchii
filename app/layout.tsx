import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";

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
      className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-emerald-500/30 selection:text-emerald-400`}
      suppressHydrationWarning
    >
      <head>
        {/* Synchronous inline script to prevent dark/light flash during initial render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.remove('dark', 'light');
                  document.documentElement.classList.add(saved);
                } catch(e) {}
              })()
            `,
          }}
        />
      </head>
      {/* Diatur agar tingginya pas satu layar penuh */}
      <body className="w-full h-screen flex flex-col bg-[#0a0a0a] text-zinc-100 overflow-x-hidden">
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}