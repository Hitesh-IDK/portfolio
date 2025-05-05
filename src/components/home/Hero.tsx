import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';
import SkillsOrb from './SkillsOrb';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
        .from(
          subheadingRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.2'
        );

      // Interactive animations
      const buttons = gsap.utils.toArray<HTMLElement>('.btn-primary, .btn-outline');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
        });
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
        });
      });

      // Scroll indicator animation
      gsap.to('.scroll-indicator', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
      });

      // Parallax effect on scroll
      gsap.to('.parallax-bg', {
        y: '30%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between"
    >
      <ParticleBackground />
      
      <div className="absolute inset-0 z-0 pointer-events-none parallax-bg">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square">
          <SkillsOrb />
        </div>
      </div>

      <div className="container-padding mx-auto relative z-10 flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 hover:scale-105 transition-transform duration-300"
          >
            Hi, I'm <span className="title-gradient">Hitesh Parmar</span>.<br />
            I build <span className="text-primary-500 dark:text-primary-400">full stack solutions</span>.
          </h1>
          
          <p
            ref={subheadingRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto hover:scale-105 transition-transform duration-300"
          >
            Full Stack Developer specializing in React, Next.js, Express.js, Go, AWS, Redis, PostgreSQL and modern web technologies.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/projects" className="btn-primary px-8 py-3 text-base transform hover:translate-y-[-2px] transition-transform">
              Explore My Work
            </Link>
            <Link to="/about" className="btn-outline px-8 py-3 text-base transform hover:translate-y-[-2px] transition-transform">
              Learn About Me
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-70 scroll-indicator cursor-pointer hover:opacity-100 transition-opacity">
          <span className="text-sm text-gray-700 dark:text-gray-300">Scroll Down</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}