import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NODE_COUNT = 22;
const LINK_DISTANCE = 170;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const SchematicCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frameId = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(201,168,124,${0.14 * (1 - dist / LINK_DISTANCE)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(212,184,150,0.55)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) frameId = requestAnimationFrame(draw);
    };

    resize();
    makeNodes();
    draw();

    const handleResize = () => {
      resize();
      makeNodes();
      if (reduced) draw();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] opacity-70" />;
};

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-stone-900">
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/services-hero.webp" type="image/webp" />
          <img
            src="/images/services-hero.jpg"
            alt="Engineering workspace representing Khosha Systems services"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 overlay-bronze" />
      </div>
      <SchematicCanvas />
      <div className="absolute z-[2] -top-24 -right-16 w-[560px] h-[560px] rounded-full bg-bronze-400/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-3 sm:mb-4"
          >
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-5 sm:mb-6 leading-[1.05]"
          >
            Systems built to <span className="bronze-gradient-text">compound.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            Web apps, websites, AI transformation, mobile apps, and full digital services — built for scale and designed for impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-8 sm:gap-10 mt-10 sm:mt-14"
          >
            {[
              { n: '15+', l: 'Years Engineering' },
              { n: '7', l: 'Industries Served' },
              { n: '3', l: 'Delivery Phases' },
            ].map((stat) => (
              <div key={stat.l} className="border-l-2 border-bronze-800 pl-3 sm:pl-4">
                <div className="font-serif font-extrabold text-xl sm:text-2xl text-white">{stat.n}</div>
                <div className="text-[11px] sm:text-xs text-white/40 mt-0.5">{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
