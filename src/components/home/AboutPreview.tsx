import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import my_pic from "../../public/images/my-pic.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // Content animation - staggered children
      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.from(contentElements, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gray-50 dark:bg-gray-900"
    >
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={imageRef}
            className="relative max-w-md mx-auto lg:max-w-full"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src={my_pic}
                alt="Hitesh Parmar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-xs">
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                "I believe great software is about solving real problems while
                creating experiences that make a difference."
              </p>
            </div>

            <div className="absolute -top-6 -left-6 bg-primary-500 p-3 rounded-lg shadow-xl text-white font-display font-bold">
              2+ Years of Experience
            </div>
          </div>

          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              About <span className="title-gradient">Me</span>
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a full stack developer with a passion for building scalable
              web applications. With over 2 years of experience, I specialize in
              creating robust solutions using modern technologies and best
              practices.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-8">
              My journey began in web development, and I've since expanded my
              expertise to cover the entire stack. I've worked with startups and
              clients across various sectors, helping them build and scale their
              applications.
            </p>

            <h3 className="text-xl font-semibold mb-4">Core Expertise</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                "React & Next.js",
                "Node.js & Express",
                "Go & Microservices",
                "AWS & DevOps",
                "Redis & PostgreSQL",
                "System Design",
              ].map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn-primary">
              More About Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
