import { useEffect } from "react";
import Hero from "../components/home/Hero";
import ProjectsHighlight from "../components/home/ProjectsHighlight";
import AboutPreview from "../components/home/AboutPreview";
import StatsSection from "../components/home/StatsSection";
import BlogPreview from "../components/home/BlogPreview";
import ContactCTA from "../components/home/ContactCTA";

export default function HomePage() {
  useEffect(() => {
    document.title = "Hitesh Parmar | FullStack Developer";
  }, []);

  return (
    <>
      <Hero />
      <ProjectsHighlight />
      <StatsSection />
      <AboutPreview />
      {/* <BlogPreview /> */}
      <ContactCTA />
    </>
  );
}
