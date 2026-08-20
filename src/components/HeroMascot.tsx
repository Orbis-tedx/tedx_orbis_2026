import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import mascotImage from "../image_assets/Hero_mascot.png";

type Vec2 = { x: number; y: number };

export default function HeroMascot() {
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement | null>(null);
  const mascot = useRef<HTMLDivElement | null>(null);
  const shadow = useRef<HTMLDivElement | null>(null);
  const glow = useRef<HTMLDivElement | null>(null);

  const [pointer, setPointer] = useState<Vec2>({ x: 0.5, y: 0.5 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Smooth animation loop
  useEffect(() => {
    let raf = 0;
    const loop = (_now: number) => {
      // ease toward target pointer
      const t = 0.09;
      const cx = pointer.x;
      const cy = pointer.y;
      const rx = (0.5 - cy) * 10; // rotateX
      const ry = (cx - 0.5) * 10; // rotateY
      setTilt((s) => ({ rx: s.rx + (rx - s.rx) * t, ry: s.ry + (ry - s.ry) * t }));

      // apply transforms
      if (mascot.current) {
        const rxs = Math.max(-10, Math.min(10, tilt.rx));
        const rys = Math.max(-10, Math.min(10, tilt.ry));
        mascot.current.style.transform = `perspective(1000px) translateZ(0) rotateX(${rxs}deg) rotateY(${rys}deg) translateY(${(0.5 - cy) * 8}px)`;
      }
      if (shadow.current) {
        // shadow moves slower and scales slightly
        const sx = (pointer.x - 0.5) * 8;
        const sy = (pointer.y - 0.5) * 6;
        shadow.current.style.transform = `translate3d(${sx * 0.4}px, ${Math.abs(sy) * 0.6}px, 0) scale(${1 - Math.abs(pointer.y - 0.5) * 0.06})`;
      }
      if (glow.current) {
        const gx = (pointer.x) * 100 + '%';
        const gy = (pointer.y) * 100 + '%';
        glow.current.style.background = `radial-gradient(closest-side at ${gx} ${gy}, rgba(255,240,220,0.14), rgba(0,0,0,0))`;
        glow.current.style.opacity = reduced ? '0' : '0.85';
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointer, reduced, tilt.rx, tilt.ry]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      setPointer({ x: Math.max(0, Math.min(1, px)), y: Math.max(0, Math.min(1, py)) });
    };

    const handleLeave = () => setPointer({ x: 0.5, y: 0.5 });

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);

    // device orientation for mobile (graceful, respects reduced motion)
    const handleDevice = (ev: DeviceOrientationEvent) => {
      if (ev.beta == null || ev.gamma == null) return;
      // beta: front/back tilt [-180,180], gamma: left/right [-90,90]
      const px = 0.5 + (ev.gamma / 90) * 0.35; // small range
      const py = 0.5 - (ev.beta / 180) * 0.35;
      setPointer({ x: Math.max(0, Math.min(1, px)), y: Math.max(0, Math.min(1, py)) });
    };

    if (window && 'DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleDevice as EventListener);
    }

    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
      if (window && 'DeviceOrientationEvent' in window) {
        window.removeEventListener('deviceorientation', handleDevice as EventListener);
      }
    };
  }, []);

  // scroll-based motion: slight parallax on mascot
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '6%', '12%']);

  return (
    <div ref={container} className="relative w-full h-full flex items-center justify-center">
      <div ref={glow} className="pointer-events-none absolute inset-0 z-10 will-change-transform transition-opacity" style={{ opacity: reduced ? 0 : 0.85 }} />

      <motion.div style={{ y }} className="relative z-20 flex items-end justify-center w-full h-full">
        <div ref={shadow} className="absolute bottom-8 w-56 md:w-80 lg:w-96 h-10 rounded-full bg-black/40 blur-3xl opacity-60 will-change-transform" style={{ filter: 'blur(28px)' }} />

        <div ref={mascot} className="relative will-change-transform" style={{ transformStyle: 'preserve-3d', transition: reduced ? 'none' : 'transform 0.12s linear' }}>
          <img src={mascotImage} alt="Mascot" className="block max-h-[420px] w-auto select-none pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
