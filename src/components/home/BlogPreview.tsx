import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "../../data/blogPosts";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      // Blog post cards animation
      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card, i) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Just display a few recent blog posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gray-50 dark:bg-gray-900"
    >
      <div className="container-padding mx-auto">
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Latest <span className="title-gradient">Insights</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Thoughts, insights, and perspectives on web development, design, and
            technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="blog-card group card hover:shadow-lg transition-all duration-500 flex flex-col"
            >
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-video">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm flex-grow">
                {post.excerpt}
              </p>

              <Link
                to={`/blog/${post.id}`}
                className="mt-auto inline-flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
              >
                Read More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog" className="btn-outline">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
