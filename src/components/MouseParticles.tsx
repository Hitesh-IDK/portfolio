import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export default function MouseParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
      particle.style.background = `hsl(${Math.random() * 360}, 70%, 70%)`;
      containerRef.current?.appendChild(particle);

      return {
        element: particle,
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        life: 1,
      };
    };

    const updateParticles = () => {
      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;

        if (particle.life <= 0) {
          particle.element.remove();
          particlesRef.current.splice(i, 1);
          return;
        }

        gsap.set(particle.element, {
          x: particle.x,
          y: particle.y,
          scale: particle.life,
          opacity: particle.life,
        });
      });

      frameRef.current = requestAnimationFrame(updateParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (Math.random() > 0.5) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(updateParticles);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      particlesRef.current.forEach(p => p.element.remove());
      particlesRef.current = [];
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
}