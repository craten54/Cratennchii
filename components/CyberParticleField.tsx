"use client";

import React, { useEffect, useRef } from "react";

interface CyberParticleFieldProps {
  particleCount?: number;
  themeColor?: string;
  maxLineDistance?: number;
}

interface MouseState {
  currentX: number;
  currentY: number;
  lastX: number;
  lastY: number;
  vx: number;
  vy: number;
  isActive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number; // Digunakan untuk menyimpan momentum tambahan saat kena tabrak mouse
  vy: number;
  radius: number;
  alpha: number;
  mass: number;
  orbitRadius: number;    // Jarak lintasan orbit unik masing-masing planet/bulan
  angle: number;          // Sudut putar saat ini dalam radian
  angularSpeed: number;   // Kecepatan rotasi (kita buat slow/santai)
}

export default function CyberParticleField({
  particleCount = 100,
  themeColor = "#10b981",
  maxLineDistance = 180,
}: CyberParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const particlesRef = useRef<Particle[]>([]);
  // Menyimpan posisi pusat gravitasi imajiner yang mengikuti mouse secara halus (smooth transition)
  const orbitCenterRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef<MouseState>({
    currentX: 0,
    currentY: 0,
    lastX: 0,
    lastY: 0,
    vx: 0,
    vy: 0,
    isActive: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set titik pusat awal di tengah layar sebelum mouse masuk
    orbitCenterRef.current = { x: width / 2, y: height / 2 };

    const scaleCanvasToDPR = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    scaleCanvasToDPR();

    // Menginisialisasi lintasan orbit Tata Surya yang tersebar proporsional
    const createSpaceParticle = (): Particle => {
      const radius = Math.random() * 2 + 1.5;

      // Jarak minimum orbit 40px, jarak maksimal 75% dari dimensi terbesar layar agar memenuhi seluruh viewport
      const maxOrbit = Math.max(width, height) * 0.75;
      const orbitRadius = Math.random() * (maxOrbit - 40) + 40;
      const angle = Math.random() * Math.PI * 2;

      // Kecepatan putar di-set super lambat dan rileks bagaikan angin mengalir (0.002 s.d 0.007 radian per frame)
      const angularSpeed = (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1);

      return {
        x: orbitCenterRef.current.x + Math.cos(angle) * orbitRadius,
        y: orbitCenterRef.current.y + Math.sin(angle) * orbitRadius,
        vx: 0,
        vy: 0,
        radius,
        alpha: Math.random() * 0.5 + 0.4,
        mass: radius * 1.5,
        orbitRadius,
        angle,
        angularSpeed,
      };
    };

    const initializeParticles = () => {
      const list: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        list.push(createSpaceParticle());
      }
      particlesRef.current = list;
    };

    initializeParticles();

    /**
     * SOLAR SYSTEM ORBIT & KINETIC IMPACT PHYSICS ENGINE
     */
    const updatePhysics = (particles: Particle[], mouse: MouseState, canvasWidth: number, canvasHeight: number) => {
      // 1. Geser pusat orbit imajiner secara bertahap menuju posisi mouse (Mekanisme perpindahan smooth)
      const targetCenterX = mouse.isActive ? mouse.currentX : canvasWidth / 2;
      const targetCenterY = mouse.isActive ? mouse.currentY : canvasHeight / 2;

      // Menggunakan teknik LERP (Linear Interpolation) 0.04 agar perpindahan pusat orbit terasa lambat dan anggun
      orbitCenterRef.current.x += (targetCenterX - orbitCenterRef.current.x) * 0.04;
      orbitCenterRef.current.y += (targetCenterY - orbitCenterRef.current.y) * 0.04;

      // 2. Hitung kecepatan fisik kursor mouse berdasarkan koordinat delta
      if (mouse.isActive) {
        mouse.vx = mouse.currentX - mouse.lastX;
        mouse.vy = mouse.currentY - mouse.lastY;
        
        // Simpan posisi terakhir untuk iterasi frame berikutnya
        mouse.lastX = mouse.currentX;
        mouse.lastY = mouse.currentY;
      } else {
        mouse.vx = 0;
        mouse.vy = 0;
      }

      const impactRadius = 70; // Jarak benturan kursor fisik (70px)

      // 3. Kalkulasi pergerakan masing-masing partikel (Planet/Bulan)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Jalankan rotasi sudut melingkar alaminya yang slow
        p.angle += p.angularSpeed;

        // Hitung koordinat tujuan ideal berdasarkan pusat orbit dinamis saat ini
        const idealTargetX = orbitCenterRef.current.x + Math.cos(p.angle) * p.orbitRadius;
        const idealTargetY = orbitCenterRef.current.y + Math.sin(p.angle) * p.orbitRadius;

        // Tarikan elastis lembut agar partikel mengikuti lintasan orbit barunya (membuat efek gravitasi elastis)
        const followForce = 0.02;
        const orbitVx = (idealTargetX - p.x) * followForce;
        const orbitVy = (idealTargetY - p.y) * followForce;

        // 4. EFEK REAKSI MOUSE (Tabrakan Kinetik & Dorongan Lembut)
        if (mouse.isActive) {
          const dx = p.x - mouse.currentX;
          const dy = p.y - mouse.currentY;
          const distanceToMouse = Math.hypot(dx, dy);

          if (distanceToMouse < impactRadius) {
            const force = (impactRadius - distanceToMouse) / impactRadius;
            const angleFromMouse = Math.atan2(dy, dx);
            const mouseSpeed = Math.hypot(mouse.vx, mouse.vy);

            // A. Dorongan konstan yang lembut agar partikel menyingkir dari kursor secara elegan (tidak menumpuk)
            p.vx += Math.cos(angleFromMouse) * force * 0.6;
            p.vy += Math.sin(angleFromMouse) * force * 0.6;

            // B. Transfer momentum kinetik dari kursor jika kursor digeser secara cepat (efek sabetan/lemparan)
            if (mouseSpeed > 0.5) {
              p.vx += mouse.vx * 0.25 * force;
              p.vy += mouse.vy * 0.25 * force;
            }
          }
        }

        // 5. Integrasikan velocity orbit alami dengan momentum sisa pengereman pasca kelempar
        p.x += orbitVx + p.vx;
        p.y += orbitVy + p.vy;

        // Reduksi momentum lemparan secara bertahap (gesekan udara) agar partikel kembali jinak ke orbit aslinya
        p.vx *= 0.88;
        p.vy *= 0.88;
      }
    };

    const draw = (canvasContext: CanvasRenderingContext2D, particles: Particle[], canvasWidth: number, canvasHeight: number) => {
      // Clear canvas background dynamically (transparent overlay on body CSS background)
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

      const isCyan = themeColor === "#06b6d4";
      const rgbString = isCyan ? "6, 182, 212" : "16, 185, 129";

      // Menggambar jaring konstelasi siber antar-titik orbit
      canvasContext.lineWidth = 0.45;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < maxLineDistance) {
            // Slightly higher line opacity in light mode for better visual definition
            const baseAlpha = isCyan ? 0.22 : 0.11;
            const alpha = (1.0 - dist / maxLineDistance) * baseAlpha;
            canvasContext.strokeStyle = `rgba(${rgbString}, ${alpha})`;
            canvasContext.beginPath();
            canvasContext.moveTo(p1.x, p1.y);
            canvasContext.lineTo(p2.x, p2.y);
            canvasContext.stroke();
          }
        }
      }

      // Menggambar bulatan core partikel
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        canvasContext.beginPath();
        canvasContext.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        canvasContext.fillStyle = `rgba(${rgbString}, ${p.alpha * 0.12})`;
        canvasContext.fill();

        canvasContext.beginPath();
        canvasContext.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        canvasContext.fillStyle = `rgba(${rgbString}, ${p.alpha})`;
        canvasContext.fill();
      }
    };

    const tick = () => {
      updatePhysics(particlesRef.current, mouseRef.current, width, height);
      draw(ctx, particlesRef.current, width, height);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      if (!mouse.isActive) {
        mouse.isActive = true;
        mouse.lastX = e.clientX;
        mouse.lastY = e.clientY;
      }
      mouse.currentX = e.clientX;
      mouse.currentY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    const handleResize = () => {
      scaleCanvasToDPR();
      initializeParticles();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, themeColor, maxLineDistance]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 h-full w-full overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <canvas ref={canvasRef} className="block h-full w-full pointer-events-none" />
    </div>
  );
}