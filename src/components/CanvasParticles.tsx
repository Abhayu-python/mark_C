import React, { useEffect, useRef } from 'react';
import { AmbienceMood } from '../types';

interface CanvasParticlesProps {
  mood: AmbienceMood;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  hue: number;
  pulseSpeed: number;
  pulseVal: number;
  type: 'mote' | 'sparkle' | 'leaf';
}

export const CanvasParticles: React.FC<CanvasParticlesProps> = ({ mood }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle count based on screen width
    const particleCount = width < 768 ? 25 : 55;
    const particles: Particle[] = [];

    const getMoodColors = () => {
      switch (mood) {
        case 'sunset':
          return { minHue: 15, maxHue: 45, lightRatio: 0.7 };
        case 'night':
          return { minHue: 180, maxHue: 270, lightRatio: 0.9 };
        case 'day':
        default:
          return { minHue: 40, maxHue: 55, lightRatio: 0.8 };
      }
    };

    for (let i = 0; i < particleCount; i++) {
      const config = getMoodColors();
      const typeRand = Math.random();
      const type: 'mote' | 'sparkle' | 'leaf' = 
        typeRand > 0.85 ? 'leaf' : typeRand > 0.4 ? 'sparkle' : 'mote';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'leaf' ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.4) * 0.6,
        speedY: type === 'leaf' ? Math.random() * 0.8 + 0.3 : -(Math.random() * 0.5 + 0.15),
        opacity: Math.random() * 0.5 + 0.2,
        baseOpacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * (config.maxHue - config.minHue) + config.minHue,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        pulseVal: Math.random() * Math.PI * 2,
        type
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseVal += p.pulseSpeed;

        // Wrap around screen edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const currentOpacity = p.baseOpacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        if (p.type === 'leaf' && mood !== 'night') {
          // Animated little windblown leaf / petal
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.pulseVal);
          ctx.fillStyle = mood === 'sunset' 
            ? `rgba(239, 68, 68, ${currentOpacity * 0.7})` 
            : `rgba(74, 222, 128, ${currentOpacity * 0.7})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'sparkle') {
          // 4-point magical sparkle
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.pulseVal * 0.5);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${currentOpacity})`;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 2);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size * 2);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else {
          // Soft ambient glowing light dust mote
          ctx.save();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          grad.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${currentOpacity})`);
          grad.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mood]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full opacity-75"
      aria-hidden="true"
    />
  );
};
