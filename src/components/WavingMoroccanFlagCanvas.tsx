import React, { useEffect, useRef } from 'react';

export const WavingMoroccanFlagCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let phase = 0;

    // Offscreen pre-rendered flat Moroccan flag for smooth cloth displacement sampling
    const flagW = 480;
    const flagH = 320;
    const offscreen = document.createElement('canvas');
    offscreen.width = flagW;
    offscreen.height = flagH;
    const octx = offscreen.getContext('2d');

    if (octx) {
      // Crimson Moroccan field
      octx.fillStyle = '#B81D27';
      octx.fillRect(0, 0, flagW, flagH);

      // Authentic Green Pentagram (Interlaced five-pointed Moroccan star)
      const cx = flagW / 2;
      const cy = flagH / 2;
      const outerR = 72;

      const pts: Array<[number, number]> = [];
      for (let i = 0; i < 5; i++) {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
        pts.push([cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR]);
      }

      octx.strokeStyle = '#006233';
      octx.lineWidth = 10;
      octx.lineJoin = 'miter';
      octx.beginPath();
      // Draw traditional pentagram sequence: 0 -> 2 -> 4 -> 1 -> 3 -> 0
      const order = [0, 2, 4, 1, 3];
      octx.moveTo(pts[order[0]][0], pts[order[0]][1]);
      for (let i = 1; i < order.length; i++) {
        octx.lineTo(pts[order[i]][0], pts[order[i]][1]);
      }
      octx.closePath();
      octx.stroke();
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawFlagFrame = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Cover-fit flag dimensions across stage background
      const drawW = Math.min(w * 0.88, 920);
      const drawH = drawW * (flagH / flagW);
      const startX = (w - drawW) / 2;
      const startY = (h - drawH) / 2;

      const stripCount = 96;
      const srcSliceW = flagW / stripCount;
      const dstSliceW = drawW / stripCount + 1;

      ctx.save();
      ctx.globalAlpha = 0.32;

      for (let i = 0; i < stripCount; i++) {
        const t = i / stripCount;
        // Traveling wave along cloth width
        const wave1 = Math.sin(t * 7.5 - phase) * 14 * (0.35 + t * 0.65);
        const wave2 = Math.cos(t * 13.0 - phase * 1.4) * 5 * t;
        const dy = wave1 + wave2;

        // Subtle silk shading highlight/shadow from wave slope
        const slope = Math.cos(t * 7.5 - phase);
        const sx = i * srcSliceW;
        const dx = startX + i * (drawW / stripCount);

        ctx.drawImage(
          offscreen,
          sx,
          0,
          srcSliceW,
          flagH,
          dx,
          startY + dy,
          dstSliceW,
          drawH
        );

        if (slope > 0.15) {
          ctx.fillStyle = `rgba(255, 240, 220, ${(slope - 0.15) * 0.16})`;
          ctx.fillRect(dx, startY + dy, dstSliceW, drawH);
        } else if (slope < -0.15) {
          ctx.fillStyle = `rgba(30, 8, 10, ${(-slope - 0.15) * 0.22})`;
          ctx.fillRect(dx, startY + dy, dstSliceW, drawH);
        }
      }

      ctx.restore();

      if (!prefersReducedMotion) {
        phase += 0.045;
        animationFrameId = window.requestAnimationFrame(drawFlagFrame);
      }
    };

    drawFlagFrame();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
