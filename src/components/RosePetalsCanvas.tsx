import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swayPhase: number;
  swaySpeed: number;
  rotation: number;
  rotationSpeed: number;
  flipPhase: number;
  flipSpeed: number;
  color: string;
  highlight: string;
  opacity: number;
}

interface RosePetalsCanvasProps {
  enabled: boolean;
}

const PETAL_PALETTES = [
  { color: '#9E1B28', highlight: '#C92A3B' }, // Royal Moroccan Crimson
  { color: '#7D111C', highlight: '#B01E2E' }, // Deep Velvet Rose
  { color: '#0E5A3E', highlight: '#177E58' }, // Moroccan Emerald Green
  { color: '#09442E', highlight: '#126B4A' }, // Deep Atlas Green
];

export const RosePetalsCanvas: React.FC<RosePetalsCanvasProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalCount = width < 768 ? 22 : 38;
    const createPetal = (startFromTop = false): Petal => {
      const palette = PETAL_PALETTES[Math.floor(Math.random() * PETAL_PALETTES.length)];
      return {
        x: Math.random() * width,
        y: startFromTop ? -30 - Math.random() * 80 : Math.random() * height,
        size: 7 + Math.random() * 7,
        speedY: 0.45 + Math.random() * 0.65,
        speedX: (Math.random() - 0.5) * 0.35,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.008 + Math.random() * 0.012,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        flipPhase: Math.random() * Math.PI * 2,
        flipSpeed: 0.015 + Math.random() * 0.02,
        color: palette.color,
        highlight: palette.highlight,
        opacity: 0.42 + Math.random() * 0.32,
      };
    };

    const petals: Petal[] = Array.from({ length: petalCount }, () => createPetal(false));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const scaleY = 0.55 + 0.45 * Math.sin(p.flipPhase);
      ctx.scale(1, scaleY);
      ctx.globalAlpha = p.opacity;

      const s = p.size;
      const grad = ctx.createRadialGradient(-s * 0.2, -s * 0.2, s * 0.1, 0, 0, s);
      grad.addColorStop(0, p.highlight);
      grad.addColorStop(1, p.color);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.95, -s * 0.65, s * 0.85, s * 0.65, 0, s * 0.9);
      ctx.bezierCurveTo(-s * 0.85, s * 0.65, -s * 0.95, -s * 0.65, 0, -s);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayPhase += p.swaySpeed;
        p.flipPhase += p.flipSpeed;
        p.rotation += p.rotationSpeed;
        p.x += p.speedX + Math.sin(p.swayPhase) * 0.48;
        p.y += p.speedY;

        if (p.y > height + 30 || p.x < -40 || p.x > width + 40) {
          petals[i] = createPetal(true);
        }

        drawPetal(petals[i]);
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-20"
    />
  );
};
