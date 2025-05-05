import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ExternalLink, Github, Search } from "lucide-react";
import { projects, Project } from "../data/projects";
import { cn } from "../utils/cn";

gsap.registerPlugin(ScrollTrigger);

// Unique tags from all projects
const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort();

export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeTag, setActiveTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Projects | Hitesh Parmar";

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".projects-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
      });

      // Filter animation
      gsap.from(".filter-container", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      });

      // Project cards animation with stagger
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: 0.1 + i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter projects when tag or search changes
  useEffect(() => {
    let result = [...projects];

    // Filter by tag
    if (activeTag !== "All") {
      result = result.filter((project) => project.tags.includes(activeTag));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);

    // Animate new cards
    if (result.length > 0) {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: i * 0.05,
            ease: "power2.out",
          }
        );
      });
    }
  }, [activeTag, searchQuery]);

  return (
    <div ref={sectionRef} className="pt-24">
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 projects-heading">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              My <span className="title-gradient">Projects</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              A selection of my recent work, showcasing innovative solutions and
              creative designs.
            </p>
          </div>

          <div className="filter-container mb-12 space-y-6">
            {/* Search input */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring"
                />
              </div>
            </div>

            {/* Tag filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTag("All")}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                  activeTag === "All"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                All
              </button>

              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                    activeTag === tag
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="project-card group card hover:shadow-lg glow transition-all duration-500 flex flex-col"
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
                          {project.tags.map((tag) => (
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
                    {project.title}{" "}
                    <span className="text-gray-400 dark:text-gray-500 text-sm font-normal">
                      {project.year}
                    </span>
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
                      {project.techStack.slice(0, 3).map((tech) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveTag("All");
                  setSearchQuery("");
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20">
        <div className="container-padding mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            I'm currently available for freelance work. Let's build something
            amazing together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary px-8 py-3">
              Get In Touch
            </Link>
            <a
              href="https://github.com/Hitesh-IDK"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-8 py-3 flex items-center justify-center"
            >
              <Github className="mr-2 h-5 w-5" />
              View GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
