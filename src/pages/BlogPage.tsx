import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Clock, Search, Tag as TagIcon, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { cn } from '../utils/cn';

// Extract all unique tags from blog posts
const allTags = Array.from(
  new Set(blogPosts.flatMap(post => post.tags))
).sort();

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.title = 'Blog | Hitesh Parmar';
    
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from('.blog-heading', {
        y: 50,
        opacity: 0,
        duration: 0.8,
      });
      
      // Filter animation
      gsap.from('.filter-container', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      });
      
      // Blog post cards animation with stagger
      gsap.utils.toArray<HTMLElement>('.blog-card').forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: 0.1 + (i * 0.1),
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  // Filter posts when tag or search changes
  useEffect(() => {
    let result = [...blogPosts];
    
    // Filter by tag
    if (activeTag !== 'All') {
      result = result.filter(post => 
        post.tags.includes(activeTag)
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(result);
    
    // Animate new cards
    if (result.length > 0) {
      gsap.utils.toArray<HTMLElement>('.blog-card').forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4, 
            delay: i * 0.05,
            ease: 'power2.out'
          }
        );
      });
    }
  }, [activeTag, searchQuery]);
  
  return (
    <div ref={sectionRef} className="pt-24">
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12 blog-heading">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Blog & <span className="title-gradient">Insights</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Thoughts, insights, and perspectives on web development, design, and technology.
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
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring"
                />
              </div>
            </div>
            
            {/* Tag filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTag('All')}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                  activeTag === 'All'
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                All
              </button>
              
              {allTags.map(tag => (
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
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
                  
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="flex items-center text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        <TagIcon className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveTag('All');
                  setSearchQuery('');
                }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20">
        <div className="container-padding mx-auto max-w-3xl">
          <div className="card p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-4">
                Subscribe to My Newsletter
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Get notified when I publish new articles and resources.
                No spam, unsubscribe at any time.
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