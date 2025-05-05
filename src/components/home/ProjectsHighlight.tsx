import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsHighlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.4,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      });
      
      // Project cards animation
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  // Just display a few featured projects
  const featuredProjects = projects.slice(0, 3);
  
  return (
    <section ref={containerRef} className="section-padding bg-white dark:bg-gray-950">
      <div className="container-padding mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Featured <span className="title-gradient">Projects</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            A selection of my recent work, showcasing innovative solutions and creative designs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={cn(
                "project-card group card hover:shadow-lg glow transition-all duration-500 flex flex-col"
              )}
            >
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-video">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs font-medium bg-black/30 text-white rounded-full backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-display font-bold mb-2">
                {project.title} <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">{project.year}</span>
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm flex-grow">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm flex items-center"
                >
                  View Details
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
                
                <div className="flex space-x-2">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs font-medium text-gray-500 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/projects" className="btn-outline">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}