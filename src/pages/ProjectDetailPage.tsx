import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ExternalLink, Github, Tag as TagIcon } from "lucide-react";
import { projects, Project } from "../data/projects";
import { cn } from "../utils/cn";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the current project
    const currentProject = projects.find((p) => p.id === id);

    if (currentProject) {
      setProject(currentProject);
      document.title = `${currentProject.title} | Projects | Hitesh Parmar`;

      // Find related projects based on tags
      const related = projects
        .filter(
          (p) =>
            p.id !== id &&
            p.tags.some((tag) => currentProject.tags.includes(tag))
        )
        .slice(0, 3);

      setRelatedProjects(related);

      // Animations
      const ctx = gsap.context(() => {
        // Hero section
        gsap.from(".project-hero", {
          opacity: 0,
          duration: 1,
        });

        // Content sections with stagger
        gsap.utils
          .toArray<HTMLElement>(".animate-section")
          .forEach((section, i) => {
            gsap.from(section, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              delay: i * 0.2,
              scrollTrigger: {
                trigger: section,
                start: "top bottom-=100",
                toggleActions: "play none none reverse",
              },
            });
          });

        // Related projects
        gsap.utils
          .toArray<HTMLElement>(".related-project")
          .forEach((card, i) => {
            gsap.from(card, {
              y: 30,
              opacity: 0,
              duration: 0.6,
              delay: 0.2 + i * 0.1,
              scrollTrigger: {
                trigger: ".related-projects-section",
                start: "top bottom-=50",
                toggleActions: "play none none reverse",
              },
            });
          });
      }, sectionRef);

      return () => ctx.revert();
    } else {
      // Project not found, redirect to projects page
      navigate("/projects");
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="pt-24 pb-12 text-center">
        <div className="container-padding mx-auto">
          <p className="text-gray-700 dark:text-gray-300">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="pt-24">
      {/* Project hero */}
      <section className="project-hero pb-12">
        <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-padding mx-auto">
              <Link
                to="/projects"
                className="inline-flex items-center text-white bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                {project.title}
              </h1>

              <p className="text-gray-200 text-lg max-w-3xl mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project details */}
      <section className="section-padding animate-section">
        <div className="container-padding mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-2xl font-display font-bold mb-6">
                  Project Overview
                </h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">The Solution</h3>
                  <ul className="space-y-2">
                    {project.solution.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 dark:text-primary-400 mr-2">
                          •
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">The Result</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {project.outcome}
                  </p>
                </div>
              </div>

              {/* Project images */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.detailImages.map((image, index) => (
                  <div key={index} className="card p-0 overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} detail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Project info sidebar */}
              <div className="card sticky top-24">
                <h3 className="text-xl font-display font-semibold mb-4">
                  Project Info
                </h3>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Year
                  </h4>
                  <p className="text-gray-900 dark:text-gray-100">
                    {project.year}
                  </p>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Links
                  </h4>
                  <div className="flex flex-col space-y-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live Project
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline w-full justify-center"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-gray-50 dark:bg-gray-900 related-projects-section animate-section">
          <div className="container-padding mx-auto">
            <h2 className="text-2xl font-display font-bold mb-8">
              Related Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  to={`/projects/${relatedProject.id}`}
                  className={cn(
                    "related-project group card hover:shadow-lg transition-all duration-500 flex flex-col",
                    "hover:border-primary-200 dark:hover:border-primary-800 border border-transparent"
                  )}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                    <img
                      src={relatedProject.imageUrl}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {relatedProject.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="py-20 animate-section">
        <div className="container-padding mx-auto text-center">
          <h2 className="text-2xl font-display font-bold mb-6">
            Interested in working together?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            I'm currently available for freelance work. Let's build something
            amazing together.
          </p>
          <Link to="/contact" className="btn-primary px-8 py-3">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
