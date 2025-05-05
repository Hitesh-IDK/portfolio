import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import my_story from "../public/images/my-story.png";
import {
  Code,
  Database,
  Cloud,
  Server,
  Globe,
  Terminal,
  Gauge,
  Sparkles,
  Rocket,
  Coffee,
  Brain,
  Lock,
  Laptop,
  Palette,
  Lightbulb,
  Heart,
  Star,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: "Frontend Development",
    icon: <Code />,
    skills: [
      { name: "React & Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Redux & State Management", level: 85 },
      { name: "Modern CSS & Tailwind", level: 70 },
    ],
  },
  {
    name: "Backend Development",
    icon: <Server />,
    skills: [
      { name: "Node.js & Express", level: 90 },
      { name: "Go & Microservices", level: 85 },
      { name: "RESTful APIs", level: 95 },
      { name: "GraphQL", level: 60 },
    ],
  },
  {
    name: "Database & Cache",
    icon: <Database />,
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 85 },
      { name: "Database Design", level: 90 },
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: <Cloud />,
    skills: [
      { name: "AWS Services", level: 85 },
      { name: "Docker & Kubernetes", level: 65 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Infrastructure as Code", level: 80 },
    ],
  },
  {
    name: "System Design",
    icon: <Globe />,
    skills: [
      { name: "Distributed Systems", level: 85 },
      { name: "Scalable Architecture", level: 90 },
      { name: "System Integration", level: 85 },
      { name: "Performance Optimization", level: 90 },
    ],
  },
  {
    name: "Security & Best Practices",
    icon: <Lock />,
    skills: [
      { name: "Web Security", level: 75 },
      { name: "Authentication & Authorization", level: 90 },
      { name: "Code Quality", level: 95 },
      { name: "Testing & TDD", level: 85 },
    ],
  },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "About | Hitesh Parmar";

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".animate-in").forEach((element, i) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Animate skill cards with stagger and hover effect
      const skillCards = gsap.utils.toArray(".skill-category");
      skillCards.forEach((card: Element) => {
        const bars = card.querySelectorAll(".skill-bar");

        // Initial animation
        gsap.from(bars, {
          width: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
          },
        });

        // Hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Timeline animation
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="pt-24">
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 dark:bg-secondary-500/20 rounded-full translate-x-1/2 translate-y-1/2 filter blur-3xl"></div>

        <div className="container-padding mx-auto relative">
          <div className="max-w-3xl mx-auto text-center animate-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              About <span className="title-gradient">Me</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
              Full Stack Developer crafting scalable solutions and exceptional
              digital experiences
            </p>
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="section-padding animate-in relative overflow-hidden">
        <div className="container-padding mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={my_story}
                  alt="Hitesh Parmar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/20 rounded-full filter blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary-500/20 rounded-full filter blur-xl animate-pulse delay-300"></div>

              {/* Code snippet overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-xs transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    developer.ts
                  </span>
                </div>
                <div className="font-mono text-xs">
                  <p>
                    <span className="text-purple-500">const</span>{" "}
                    <span className="text-blue-500">developer</span> = {`{`}
                  </p>
                  <p className="pl-4">
                    <span className="text-green-500">name</span>:{" "}
                    <span className="text-orange-500">'Hitesh Parmar'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-green-500">passion</span>:{" "}
                    <span className="text-orange-500">
                      'Building scalable solutions'
                    </span>
                  </p>
                  <p>{`}`};</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent-500/10 rounded-full filter blur-xl"></div>

              <h2 className="text-3xl font-display font-bold mb-6">
                My <span className="title-gradient">Story</span>
              </h2>

              <div className="space-y-6 relative">
                <div className="card p-6 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary-500" />
                    The Beginning
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    My journey in tech began with a deep curiosity about how
                    things work. From building simple websites to developing
                    complex distributed systems, every step has been a learning
                    experience.
                  </p>
                </div>

                <div className="card p-6 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-secondary-500" />
                    The Evolution
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    As technology evolved, so did my skills. I've embraced
                    modern frameworks, cloud technologies, and best practices in
                    software development, always staying at the forefront of
                    innovation.
                  </p>
                </div>

                <div className="card p-6 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent-500" />
                    Today
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Now, I specialize in building scalable web applications
                    using modern technologies like React, Next.js, Go, and cloud
                    services. I focus on creating solutions that make a real
                    impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional journey */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900 animate-in">
        <div className="container-padding mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            Professional <span className="title-gradient">Journey</span>
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-100 dark:bg-primary-900"></div>

            {/* Timeline items */}
            <div className="space-y-16">
              {/* Item 1 */}
              <div className="timeline-item relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white z-10">
                    <Laptop className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1">
                    2021 - 2025
                  </span>
                </div>

                <div className="card max-w-lg mx-auto">
                  <h3 className="text-xl font-display font-bold mb-2">
                    BE in Information Science and Engineering
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    Visveswaraya Technological University
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Currently pursuing a BE in Information Science, with a
                    strong academic performance (8.45 CGPA)
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="timeline-item relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white z-10">
                    <Code className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1">
                    2022 - 2024
                  </span>
                </div>

                <div className="card max-w-lg mx-auto">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Software Development Intern
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    InnovateLab
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    My foundational experience in backend and frontend
                    development began here, where I contributed to
                    production-level systems. I built scalable UIs and APIs for
                    workflow management and developed a real-time cloud cost
                    dashboard integrating AWS, Azure, and GCP services — laying
                    the groundwork for my full-stack expertise.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="timeline-item relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white z-10">
                    <Database className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1">
                    2024 - PRESENT
                  </span>
                </div>

                <div className="card max-w-lg mx-auto">
                  <h3 className="text-xl font-display font-bold mb-2">
                    Medicause & XS Parking
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    Freelance Developer
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Led the backend development of a unified healthcare API
                    platform using Express.js and PostgreSQL. Enabled seamless
                    digital operations across labs, pharmacies, and a hospital
                    network. The system was deployed on AWS EC2 with persistent
                    storage on S3. Tackling India’s tourist-area parking chaos,
                    I’m building a Go-powered backend API integrated with AWS
                    and PhonePe payments.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="timeline-item relative">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white z-10">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1">
                    2025 - PRESENT
                  </span>
                </div>

                <div className="card max-w-lg mx-auto">
                  <h3 className="text-xl font-display font-bold mb-2">
                    GenAI Cohort Member
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    Tech University
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Active participation in the 100xEngineer's GenAI cohort,
                    which sharpened my AI fundamentals and product-building
                    mindset.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section className="section-padding animate-in bg-gray-50 dark:bg-gray-900">
        <div className="container-padding mx-auto">
          <h2 className="text-3xl font-display font-bold mb-4 text-center">
            Technical <span className="title-gradient">Skills</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
            A comprehensive overview of my technical expertise across the full
            stack development spectrum.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={category.name}
                className="skill-category card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold">
                    {category.name}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="skill-bar h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-900 about-section">
        <div className="container-padding mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            My <span className="title-gradient">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Excellence",
                description:
                  "I believe in writing clean, maintainable code and following best practices. Every line of code should be purposeful and efficient.",
                icon: <Terminal className="h-8 w-8" />,
              },
              {
                title: "Continuous Learning",
                description:
                  "Technology evolves rapidly, and I am committed to staying current with the latest tools and practices in software development.",
                icon: <Brain className="h-8 w-8" />,
              },
              {
                title: "Problem Solving",
                description:
                  "I approach each challenge methodically, breaking down complex problems into manageable solutions.",
                icon: <Rocket className="h-8 w-8" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="card hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center p-6">
                  <div className="text-primary-500 dark:text-primary-400 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal section */}
      <section className="section-padding about-section relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 dark:bg-secondary-500/20 rounded-full translate-x-1/2 translate-y-1/2 filter blur-3xl"></div>

        <div className="container-padding mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Life <span className="title-gradient">Beyond Code</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              While coding is my profession, I believe in maintaining a rich and
              balanced life that fuels creativity and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Content side */}
            <div className="space-y-8">
              {/* Interactive cards */}
              <div className="card p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400">
                      Building Beyond Work
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Outside of my professional projects, I enjoy exploring
                      emerging technologies and building small, experimental
                      tools or automations that solve everyday problems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 group-hover:scale-110 transition-transform">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary-500 dark:group-hover:text-secondary-400">
                      Continuous Learning
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Regularly attend tech conferences, workshops, and online
                      courses to stay updated with the latest technologies and
                      best practices in software development.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 group-hover:scale-110 transition-transform">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-500 dark:group-hover:text-accent-400">
                      Selfcare and Wellness
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Routines help me stay grounded, manage stress, and
                      maintain the focus needed for deep, creative
                      problem-solving in tech.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image grid with hover effects */}
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Speaking at a conference"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">
                    Attending a Tech Conference 2023
                  </p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Working on a laptop"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">Remote Work Setup</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/1122868/pexels-photo-1122868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Mountain hiking"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">Long Trip Adventures</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/3585236/pexels-photo-3585236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Photography"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">Tech Meetup Organization</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full filter blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary-500/20 rounded-full filter blur-xl"></div>
            </div>
          </div>

          {/* Stats grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "Open Source Contributions", value: "50+" },
              { label: "Tech Talks Given", value: "15+" },
              { label: "Developers Mentored", value: "20+" },
              { label: "Community Events", value: "30+" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="card p-6 text-center transform hover:scale-105 transition-all duration-300"
              >
                <p className="text-3xl font-display font-bold text-primary-500 dark:text-primary-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20 about-section">
        <div className="container-padding mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            Let's Work <span className="title-gradient">Together</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            I am always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Link to="/contact" className="btn-primary px-8 py-3">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
