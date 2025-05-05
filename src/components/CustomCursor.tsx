import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isHovering) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out',
        });
      }
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleInteractiveElement = (e: MouseEvent, isEntering: boolean) => {
      const target = e.currentTarget as HTMLElement;
      
      // Only handle buttons and links
      if (!target.matches('a, button, .btn-primary, .btn-outline')) {
        return;
      }

      const rect = target.getBoundingClientRect();
      isHovering = isEntering;

      if (isEntering) {
        const borderRadius = rect.height / 2 + 'px';
        const bgColor = 'rgba(99, 102, 241, 0.3)';
        const width = rect.width + 20;
        const height = rect.height + 20;
        const scale = 1.05;

        gsap.to(cursor, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width,
          height,
          scale,
          borderRadius,
          backgroundColor: bgColor,
          borderColor: 'rgba(99, 102, 241, 0.5)',
          duration: 0.2,
          ease: 'power2.out',
        });

        gsap.to(cursorDot, {
          opacity: 0,
          duration: 0.2,
        });
      } else {
        gsap.to(cursor, {
          width: '40px',
          height: '40px',
          scale: 1,
          borderRadius: '50%',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          duration: 0.2,
          ease: 'power2.out',
        });

        gsap.to(cursorDot, {
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, .btn-primary, .btn-outline'
      );

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => handleInteractiveElement(e, true));
        element.addEventListener('mouseleave', (e) => handleInteractiveElement(e, false));
      });
    };

    // Initial setup
    document.addEventListener('mousemove', onMouseMove);
    addInteractiveListeners();

    // Setup MutationObserver to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          addInteractiveListeners();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-10 h-10 border-2 border-primary-500/30 bg-primary-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200 ease-out"
        style={{ willChange: 'transform, width, height' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-primary-500/50 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}