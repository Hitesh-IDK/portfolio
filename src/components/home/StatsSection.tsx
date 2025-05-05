import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Coffee, Code, Rocket } from 'lucide-react';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.code-block').forEach((block, i) => {
        gsap.from(block, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: block,
            start: 'top bottom-=150',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20"
    >
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Code Editor Block 1 */}
          <div className="code-block card backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error-500"></div>
                <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                <div className="w-3 h-3 rounded-full bg-success-500"></div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">development.ts</span>
            </div>
            
            <div className="font-mono text-sm">
              <p className="text-gray-500 dark:text-gray-400">// Life of a developer</p>
              <p className="flex items-center gap-2 mt-2">
                <Coffee className="h-4 w-4 text-warning-500" />
                <span className="text-primary-500 dark:text-primary-400">const</span>
                <span className="text-accent-500">coffeeConsumed</span> = 
                <span className="text-success-500">'∞ cups'</span>;
              </p>
              <p className="flex items-center gap-2 mt-2">
                <Code className="h-4 w-4 text-primary-500" />
                <span className="text-primary-500 dark:text-primary-400">const</span>
                <span className="text-accent-500">linesOfCode</span> = 
                <span className="text-success-500">'lots && lots'</span>;
              </p>
              <p className="flex items-center gap-2 mt-2">
                <Terminal className="h-4 w-4 text-secondary-500" />
                <span className="text-primary-500 dark:text-primary-400">const</span>
                <span className="text-accent-500">debugTime</span> = 
                <span className="text-success-500">'24/7'</span>;
              </p>
            </div>
          </div>
          
          {/* Code Editor Block 2 */}
          <div className="code-block card backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-error-500"></div>
                <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                <div className="w-3 h-3 rounded-full bg-success-500"></div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">achievements.ts</span>
            </div>
            
            <div className="font-mono text-sm">
              <p className="text-gray-500 dark:text-gray-400">// Milestones reached</p>
              <p className="flex items-center gap-2 mt-2">
                <Rocket className="h-4 w-4 text-accent-500" />
                <span className="text-primary-500 dark:text-primary-400">const</span>
                <span className="text-accent-500">bugsSquashed</span> = 
                <span className="text-success-500">'countless'</span>;
              </p>
              <p className="flex items-center gap-2 mt-2">
                <span className="text-primary-500 dark:text-primary-400">if</span>
                (
                <span className="text-accent-500">code</span>
                .
                <span className="text-secondary-500">works</span>
                ) {
                <span className="ml-4 text-success-500">"Don't touch it! 🎉"</span>
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}