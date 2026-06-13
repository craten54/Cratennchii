"use client";

import React, { useEffect, useRef } from "react";

interface ThemeTransitionOverlayProps {
  theme: "dark" | "light"; // Ini merepresentasikan targetTheme
  clickPos: { x: number; y: number } | null;
  onMidpoint: () => void;
  onComplete: () => void;
}

interface FogWave {
  y: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
}

export default function ThemeTransitionOverlay({
  theme,
  onMidpoint,
  onComplete,
}: ThemeTransitionOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Menggunakan refs untuk mengunci fungsi callback agar tidak memicu eksekusi ganda saat re-render
  const onMidpointRef = useRef(onMidpoint);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onMidpointRef.current = onMidpoint;
    onCompleteRef.current = onComplete;
  }, [onMidpoint, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // KUNCI WARNA (Snapshot): Kita kunci warnanya dari awal masuk komponen.
    // Ini mencegah warna berubah di tengah jalan saat Next.js berganti tema.
    const finalTargetColor = theme === "dark" ? "#0a0a0a" : "#fafafa";
    const transitionAccent = theme === "dark" ? "rgba(16, 185, 129, 0.25)" : "rgba(6, 182, 212, 0.25)";

    // Konfigurasi 3 lapisan gelombang kabut
    const waves: FogWave[] = [
      { y: height + 60, speed: 5.5, amplitude: 30, frequency: 0.003, phase: 0 },
      { y: height + 120, speed: 6.0, amplitude: 20, frequency: 0.005, phase: Math.PI / 3 },
      { y: height + 180, speed: 5.0, amplitude: 15, frequency: 0.002, phase: Math.PI / 1.5 },
    ];

    let hasTriggeredMidpoint = false;

    const renderLoop = () => {
      // Selalu bersihkan seluruh layar canvas sebelum menggambar frame baru
      ctx.clearRect(0, 0, width, height);

      const leadWaveY = waves[0].y;

      // 1. Amankan pemicu Midpoint saat gelombang teratas menutup layar atas
      if (!hasTriggeredMidpoint && leadWaveY <= 0) {
        hasTriggeredMidpoint = true;
        onMidpointRef.current();
      }

      // 2. Akhiri total saat ekor gelombang paling belakang sudah keluar dari layar atas
      const trailingWaveY = waves[waves.length - 1].y;
      if (trailingWaveY < -100) {
        onCompleteRef.current();
        return;
      }

      // 3. Proses gambar gelombang kabut menggunakan warna snapshot yang terkunci
      waves.forEach((wave, idx) => {
        wave.y -= wave.speed;
        wave.phase += 0.012;

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          const sineY = Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          ctx.lineTo(x, wave.y + sineY);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        if (idx < waves.length - 1) {
          const grad = ctx.createLinearGradient(0, wave.y - 60, 0, height);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.2, transitionAccent);
          grad.addColorStop(1, finalTargetColor);
          ctx.fillStyle = grad;
        } else {
          const grad = ctx.createLinearGradient(0, wave.y - 100, 0, height);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.15, transitionAccent);
          grad.addColorStop(0.35, finalTargetColor);
          grad.addColorStop(1, finalTargetColor);
          ctx.fillStyle = grad;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Jalankan loop animasi
    animationFrameId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // CLEANUP BARRIER: Mematikan paksa loop lama jika komponen di-unmount atau di-render ulang
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]); // Hanya re-run jika target tema berubah murni dari tombol klik

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 999999 }}
    />
  );
}