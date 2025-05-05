import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".social-icons",
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 dark:bg-accent-900/20 rounded-full translate-x-1/2 translate-y-1/2 filter blur-3xl opacity-50"></div>

      <div className="container-padding mx-auto relative">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center card dark:bg-gray-900/80 backdrop-blur-sm"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Let's <span className="title-gradient">Connect</span>
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg md:text-xl">
            Have a project in mind? I'm currently available for freelance work.
            <br />
            Let's build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/contact" className="btn-primary px-8 py-3 text-base">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Link>
            <a
              href="mailto:10hiteshparmar@gmail.com"
              className="btn-outline px-8 py-3 text-base"
            >
              10hiteshparmar@gmail.com
            </a>
          </div>

          <div className="social-icons flex justify-center space-x-6">
            {[
              {
                icon: <Github className="h-5 w-5" />,
                url: "https://github.com/Hitesh-IDK",
                label: "GitHub",
              },
              {
                icon: <Linkedin className="h-5 w-5" />,
                url: "https://www.linkedin.com/in/hitesh-parmar-47190022b/",
                label: "LinkedIn",
              },
              // { icon: <Instagram className="h-5 w-5" />, url: 'https://instagram.com', label: 'Instagram' },
              {
                icon: <Mail className="h-5 w-5" />,
                url: "mailto:10hiteshparmar@gmail.com",
                label: "Email",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
