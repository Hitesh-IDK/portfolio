import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag as TagIcon,
  Share2,
} from "lucide-react";
import { blogPosts, BlogPost } from "../data/blogPosts";
import { cn } from "../utils/cn";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find((p) => p.id === id);

    if (currentPost) {
      setPost(currentPost);
      document.title = `${currentPost.title} | Blog | Hitesh Parmar`;

      // Find related posts based on tags
      const related = blogPosts
        .filter(
          (p) =>
            p.id !== id && p.tags.some((tag) => currentPost.tags.includes(tag))
        )
        .slice(0, 3);

      setRelatedPosts(related);

      // Animations
      const ctx = gsap.context(() => {
        // Hero section
        gsap.from(".post-hero", {
          opacity: 0,
          duration: 1,
        });

        // Content with stagger
        gsap.from(".post-content", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
        });

        // Related posts
        gsap.utils.toArray<HTMLElement>(".related-post").forEach((card, i) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: 0.2 + i * 0.1,
            scrollTrigger: {
              trigger: ".related-posts-section",
              start: "top bottom-=50",
              toggleActions: "play none none reverse",
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    } else {
      // Post not found, redirect to blog page
      navigate("/blog");
    }
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="pt-24 pb-12 text-center">
        <div className="container-padding mx-auto">
          <p className="text-gray-700 dark:text-gray-300">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="pt-24">
      {/* Post hero */}
      <section className="post-hero pb-12">
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-padding mx-auto max-w-4xl">
              <Link
                to="/blog"
                className="inline-flex items-center text-white bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                {post.title}
              </h1>

              <div className="flex items-center text-white">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <div className="flex items-center text-sm text-gray-200">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post content */}
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main content */}
            <div className="lg:col-span-3">
              <article className="card post-content prose prose-lg dark:prose-invert max-w-none">
                {/* Convert markdown content to HTML (simplified for this example) */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtml(post.content),
                  }}
                />
              </article>

              {/* Author bio */}
              <div className="mt-12 card flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-24 h-24 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-xl font-display font-bold mb-2">
                    About {post.author.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Jane is a creative developer with 5+ years of experience
                    specializing in interactive web experiences and UI
                    animations. She writes about frontend development,
                    animation, and UX design.
                  </p>
                  <Link
                    to="/about"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    Learn more about Jane →
                  </Link>
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-700 dark:text-gray-300 mr-4">
                    Share this post:
                  </span>
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <Link
                  to="/blog"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to all posts
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="text-xl font-display font-semibold mb-4">
                  Table of Contents
                </h3>

                <nav className="space-y-2 mb-8">
                  <a
                    href="#"
                    className="block text-primary-500 dark:text-primary-400 font-medium"
                  >
                    Introduction
                  </a>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Key Concepts
                  </a>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Examples
                  </a>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Best Practices
                  </a>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    Conclusion
                  </a>
                </nav>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mb-4">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                  <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Published
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {post.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-50 dark:bg-gray-900 related-posts-section">
          <div className="container-padding mx-auto">
            <h2 className="text-2xl font-display font-bold mb-8">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className={cn(
                    "related-post group card hover:shadow-lg transition-all duration-500 flex flex-col",
                    "hover:border-primary-200 dark:hover:border-primary-800 border border-transparent"
                  )}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{relatedPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedPost.readTime}</span>
                  </div>

                  <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {relatedPost.title}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter section */}
      <section className="py-20">
        <div className="container-padding mx-auto max-w-3xl">
          <div className="card p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-4">
                Subscribe to My Newsletter
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Get notified when I publish new articles and resources. No spam,
                unsubscribe at any time.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple markdown to HTML converter (simplified for this example)
function markdownToHtml(markdown: string): string {
  // This is a very simplified version
  // In a real app, you'd use a proper markdown parser like marked.js
  let html = markdown
    // Convert headers
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    // Convert paragraphs
    .replace(/^\s*(\n)?(.+)/gm, function (m) {
      return /\<(\/)?(h\d|p|ul|ol|li|blockquote|pre|img)/.test(m)
        ? m
        : "<p>" + m + "</p>";
    })
    // Convert code blocks
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Convert inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Convert bold
    .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
    // Convert italic
    .replace(/\*(.*)\*/g, "<em>$1</em>")
    // Convert lists
    .replace(/^\s*\- (.*$)/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n)+/g, "<ul>$&</ul>");

  return html;
}
