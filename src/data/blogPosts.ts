export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "why-gsap-animations",
    title: "Why I Switched from CSS to GSAP for Complex Animations",
    excerpt:
      "An exploration of how GSAP can simplify complex animation sequences and provide better control over timing and easing.",
    content: `
# Why I Switched from CSS to GSAP for Complex Animations

For years, I relied on CSS animations for most of my web projects. They're native to the browser, performant, and with the addition of CSS variables and keyframes, quite powerful. But as my projects grew more complex, I started hitting limitations.

## The Limitations of CSS Animations

When creating complex, coordinated sequences across multiple elements, CSS animations start to show their weaknesses:

- **Timeline management**: Coordinating multiple animations to work together is cumbersome
- **Precise control**: Fine-tuning easing, delays, and interaction between elements becomes difficult
- **Runtime control**: Pausing, reversing, or adjusting animations dynamically requires significant JavaScript intervention

## Enter GSAP (GreenSock Animation Platform)

After struggling with a particularly complex animation sequence for a client project, I decided to explore GSAP. The difference was immediately apparent:

\`\`\`javascript
// A simple GSAP timeline example
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(".hero-title", { opacity: 0, y: 100, duration: 1 })
  .from(".hero-subtitle", { opacity: 0, y: 50, duration: 0.8 }, "-=0.6")
  .from(".hero-cta", { opacity: 0, y: 25, duration: 0.6 }, "-=0.4");
\`\`\`

The ability to create timelines, precisely control overlapping animations, and modify animations at runtime transformed my workflow.

## Key Benefits I've Discovered

1. **Unified API**: One consistent way to animate DOM elements, SVGs, canvas, and more
2. **Performance**: GSAP is optimized for performance, often outperforming native CSS animations
3. **Cross-browser consistency**: Works reliably across all modern browsers without prefixes
4. **ScrollTrigger**: The ScrollTrigger plugin makes creating scroll-based animations trivial

## When to Use What

I still use CSS animations for:
- Simple hover states
- Basic transitions between UI states
- Loading indicators and simple loops

But I reach for GSAP when:
- Creating complex sequences with multiple elements
- Building interactive animations that respond to user input
- Implementing precise scroll-based animations
- Needing fine control over easing and timing

## Getting Started with GSAP

If you're considering making the switch, here's a quick guide to get started:

1. Install GSAP: \`npm install gsap\`
2. Import in your project: \`import { gsap } from "gsap";\`
3. Create your first animation:

\`\`\`javascript
gsap.to(".my-element", {
  x: 100,
  duration: 1,
  ease: "elastic.out(1, 0.3)"
});
\`\`\`

## Conclusion

While CSS animations still have their place, GSAP has become my go-to solution for creating rich, interactive experiences. The control, flexibility, and developer experience it provides simply can't be matched with CSS alone.

What's your experience with animation libraries? Let me know in the comments below!
    `,
    date: "May 15, 2023",
    coverImage:
      "https://images.pexels.com/photos/1054713/pexels-photo-1054713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: {
      name: "Hitesh Parmar",
      avatar:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    tags: ["Animation", "GSAP", "CSS", "Performance"],
    readTime: "6 min read",
  },
  {
    id: "react-performance-optimization",
    title: "Advanced React Performance Optimization Techniques",
    excerpt:
      "Learn how to identify and fix performance bottlenecks in your React applications with practical examples.",
    content: `
# Advanced React Performance Optimization Techniques

As React applications grow in complexity, performance optimization becomes increasingly important. This post explores advanced techniques beyond the basics of memoization and code splitting.

## Measuring First

Before optimizing, measure. React DevTools Profiler is your best friend:

1. Open React DevTools and switch to the Profiler tab
2. Click the record button and interact with your app
3. Analyze which components are rendering unnecessarily and how long they take

## 1. Virtualization for Long Lists

Rendering large lists can cause performance issues. Instead of rendering all items at once, virtualize them:

\`\`\`jsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}
\`\`\`

Libraries like \`react-window\` and \`react-virtualized\` render only visible items, dramatically reducing DOM nodes.

## 2. Optimizing Context

Context is powerful but can cause unnecessary re-renders. Split your context by purpose:

\`\`\`jsx
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationsProvider>
          <AppContent />
        </NotificationsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
\`\`\`

Each context should have a single responsibility, so updates to one context don't cause re-renders in components that depend on other contexts.

## 3. State Colocation

Keep state as close as possible to where it's used:

\`\`\`jsx
// ❌ Bad: State too high in the tree
function ParentComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Header />
      <Sidebar />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </>
  );
}

// ✅ Good: State colocated with its usage
function ParentComponent() {
  return (
    <>
      <Header />
      <Sidebar />
      <ModalContainer />
      <Footer />
    </>
  );
}

function ModalContainer() {
  const [isOpen, setIsOpen] = useState(false);
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen} />;
}
\`\`\`

This prevents unnecessary re-renders of sibling components.

## 4. Use Web Workers for CPU-Intensive Tasks

Move heavy computation off the main thread:

\`\`\`jsx
import { useWorker } from '@koale/useworker';

function DataProcessor() {
  const [processData, { error, result, status }] = useWorker(heavyComputationFn);
  
  const handleClick = async () => {
    const result = await processData(largeDataset);
    console.log(result);
  };
  
  return <button onClick={handleClick}>Process Data</button>;
}
\`\`\`

## 5. Optimize Bundle Size

Use code splitting not just for routes, but for features:

\`\`\`jsx
const ExpensiveChart = React.lazy(() => import('./ExpensiveChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(!showChart)}>
        {showChart ? 'Hide' : 'Show'} Chart
      </button>
      
      {showChart && (
        <React.Suspense fallback={<div>Loading chart...</div>}>
          <ExpensiveChart />
        </React.Suspense>
      )}
    </div>
  );
}
\`\`\`

## 6. Memoize Expensive Calculations

Use \`useMemo\` for expensive calculations:

\`\`\`jsx
function DataTable({ users, filter }) {
  // This will only recalculate when users or filter changes
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);
  
  return (
    <table>
      {/* Render table with filteredUsers */}
    </table>
  );
}
\`\`\`

## 7. Debounce Input Handlers

For inputs that trigger expensive operations:

\`\`\`jsx
import { useDebouncedCallback } from 'use-debounce';

function SearchComponent() {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  
  const debounced = useDebouncedCallback((value) => {
    setDebouncedValue(value);
  }, 500);
  
  return (
    <>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debounced(e.target.value);
        }}
      />
      <ExpensiveResultsList searchTerm={debouncedValue} />
    </>
  );
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. The key is to:

1. Measure first
2. Apply targeted optimizations
3. Measure again to validate improvements

React's rendering model is powerful, but using it effectively requires understanding how and when components re-render. By applying these techniques, you can ensure your React applications remain fast and responsive even as they grow in complexity.

What performance techniques have you found most effective? Share your experiences in the comments!
    `,
    date: "April 3, 2023",
    coverImage:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: {
      name: "Hitesh Parmar",
      avatar:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    tags: ["React", "Performance", "Optimization"],
    readTime: "8 min read",
  },
  {
    id: "threejs-webgl-intro",
    title: "Creating Immersive 3D Experiences with Three.js",
    excerpt:
      "An introduction to building interactive 3D environments for the web using Three.js and WebGL.",
    content: `
# Creating Immersive 3D Experiences with Three.js

The web has evolved far beyond static documents. With modern browsers supporting WebGL, we can now create rich, interactive 3D experiences directly in the browser. Three.js makes this accessible to web developers without deep graphics programming knowledge.

## What is Three.js?

Three.js is a JavaScript library that abstracts away much of the complexity of WebGL, providing a simpler API for creating and displaying 3D computer graphics in web browsers.

## Setting Up Your First Scene

Let's create a simple 3D scene with a rotating cube:

\`\`\`javascript
import * as THREE from 'three';

// 1. Create a scene
const scene = new THREE.Scene();

// 2. Create a camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5;

// 3. Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6366f1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 6. Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();

// 7. Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
\`\`\`

## Adding User Interaction

Let's make the scene interactive by allowing the user to rotate the scene with their mouse:

\`\`\`javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Add after creating the camera and renderer
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add smooth damping effect
controls.dampingFactor = 0.05;

// Update the animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update controls
  controls.update();
  
  renderer.render(scene, camera);
}
\`\`\`

## Loading 3D Models

For more complex objects, you'll want to load 3D models:

\`\`\`javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(
  'path/to/model.glb',
  (gltf) => {
    // Model loaded successfully
    scene.add(gltf.scene);
  },
  (progress) => {
    // Remove console.log for production
  },
  (error) => {
    console.error('Error loading model:', error);
  }
);
\`\`\`

## Creating Particles

Particle systems can create stunning visual effects:

\`\`\`javascript
function createParticles() {
  const particlesCount = 5000;
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    // Color
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });
  
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  return particles;
}

const particles = createParticles();

// Animate particles in the animation loop
function animate() {
  requestAnimationFrame(animate);
  
  particles.rotation.x += 0.001;
  particles.rotation.y += 0.002;
  
  controls.update();
  renderer.render(scene, camera);
}
\`\`\`

## Using Post-Processing Effects

Post-processing can add cinematic quality to your scenes:

\`\`\`javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Set up post-processing
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, // strength
  0.4, // radius
  0.85 // threshold
);
composer.addPass(bloomPass);

// Update render function to use composer
function animate() {
  requestAnimationFrame(animate);
  
  controls.update();
  composer.render();
}
\`\`\`

## Performance Considerations

3D graphics can be resource-intensive. Here are some optimization tips:

1. **Use appropriate geometry detail**: Lower poly models for less important elements
2. **Implement level of detail (LOD)**: Change model detail based on distance
3. **Object pooling**: Reuse objects instead of creating new ones
4. **Frustum culling**: Only render what's in the camera's view
5. **Use instances for repeated objects**: InstancedMesh for objects that appear multiple times

## Integrating with React

Three.js integrates well with React using libraries like react-three-fiber:

\`\`\`jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function RotatingCube() {
  const meshRef = useRef();
  
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  );
}

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingCube />
    </Canvas>
  );
}
\`\`\`

## Conclusion

Three.js opens up a world of possibilities for creating immersive 3D experiences on the web. From product configurators to data visualizations, interactive storytelling to games, the applications are limitless.

The key to success with Three.js is starting simple and incrementally adding complexity. Begin with basic shapes and interactions, then gradually incorporate more advanced features as you become comfortable with the API.

Have you created any Three.js projects? Share your experiences or questions in the comments below!
    `,
    date: "March 12, 2023",
    coverImage:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: {
      name: "Hitesh Parmar",
      avatar:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    tags: ["Three.js", "WebGL", "3D", "Animation"],
    readTime: "10 min read",
  },
  {
    id: "ux-motion-design",
    title: "The Psychology of Motion: Creating Meaningful UI Animations",
    excerpt:
      "Learn how thoughtful motion design can improve user experience and create emotional connections with your audience.",
    content: `
# The Psychology of Motion: Creating Meaningful UI Animations

In digital interfaces, animation is far more than decoration. When used intentionally, motion design can guide attention, communicate state changes, establish spatial relationships, and even evoke specific emotional responses. This article explores the psychological principles behind effective UI animation.

## The Psychological Impact of Motion

Humans are evolutionarily wired to notice motion. Our ancestors needed to quickly detect movement for survival, and this instinct remains hardwired in our brains. This makes animation an extremely powerful tool in UI design, but also one that demands careful consideration.

## Core Principles of Meaningful Motion

### 1. Purposeful Animation

Every animation should serve a clear purpose. Before adding motion to an interface, ask:

- Does it clarify functionality?
- Does it guide the user's attention?
- Does it communicate system status?
- Does it establish spatial relationships?

\`\`\`css
/* Example: Button animation that provides feedback */
.button {
  transition: transform 200ms ease, background-color 200ms ease;
}

.button:active {
  transform: scale(0.95);
  background-color: var(--color-primary-dark);
}
\`\`\`

### 2. Natural Movement

Objects in the physical world move according to natural laws of physics. Animations that respect these principles feel intuitive:

- **Easing**: Objects don't start or stop instantly
- **Mass**: Heavier objects move with more momentum
- **Tension and friction**: Movements have resistance

\`\`\`javascript
// Poor easing creates mechanical feeling
gsap.to(".element", { x: 100, duration: 1, ease: "none" });

// Natural easing mimics physical movement
gsap.to(".element", { x: 100, duration: 1, ease: "power2.out" });
\`\`\`

### 3. Hierarchy Through Motion

Just as visual hierarchy guides users through static interfaces, motion hierarchy guides attention in dynamic ones:

- Primary elements use more pronounced animations
- Secondary elements use subtler movements
- Background elements use minimal or no animation

## Functional Animation Patterns

### 1. Feedback Animations

Provide immediate feedback to user actions:

\`\`\`javascript
function ButtonWithFeedback() {
  return (
    <button onClick={() => {
      // Visual feedback
      gsap.to(".button", {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
      
      // Action
      submitForm();
    }}>
      Submit
    </button>
  );
}
\`\`\`

### 2. Transitional Animations

Help users maintain context during state changes:

\`\`\`javascript
// Page transition example with framer-motion
function PageTransition({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        key={router.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
\`\`\`

### 3. Status Indicators

Communicate system state visually:

\`\`\`jsx
function LoadingButton({ isLoading, children }) {
  return (
    <button disabled={isLoading}>
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        />
      ) : children}
    </button>
  );
}
\`\`\`

## Emotional Design Through Motion

Animation can establish a direct emotional connection with users:

- **Playful bounce**: Creates a sense of friendliness and approachability
- **Slow, gentle movements**: Evoke calmness and reliability
- **Quick, efficient motions**: Communicate speed and efficiency
- **Organic, natural flows**: Create a sense of harmony and elegance

## Real-World Application: A Form Submission Flow

Let's look at how motion transforms a standard form submission:

\`\`\`jsx
function EnhancedForm() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await submitFormData(formData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  }
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      layout // Automatically animate layout changes
    >
      {status === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Form fields */}
          <Button type="submit">Submit</Button>
        </motion.div>
      )}
      
      {status === 'submitting' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="loading-indicator"
        >
          <LoadingSpinner />
          <p>Submitting your information...</p>
        </motion.div>
      )}
      
      {status === 'success' && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { type: "spring", stiffness: 300 }
          }}
          className="success-message"
        >
          <CheckIcon />
          <h3>Thank you!</h3>
          <p>Your submission has been received.</p>
        </motion.div>
      )}
      
      {/* Error state handling */}
    </motion.form>
  );
}
\`\`\`

## Common Pitfalls to Avoid

1. **Overanimation**: Too much movement creates cognitive overload
2. **Inconsistent motion**: Different animation styles create confusion
3. **Slow animations**: Animations that delay task completion frustrate users
4. **Motion without purpose**: Decorative animations distract from content
5. **Inaccessible animation**: Motion that triggers vestibular disorders or doesn't respect reduced motion preferences

## Accessibility Considerations

Always respect user preferences for reduced motion:

\`\`\`css
/* Only apply animations if user hasn't requested reduced motion */
@media (prefers-reduced-motion: no-preference) {
  .animate-element {
    transition: transform 0.3s ease;
  }
}
\`\`\`

\`\`\`javascript
// In React with framer-motion
import { useReducedMotion } from "framer-motion";

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  const animationProps = prefersReducedMotion
    ? { initial: {}, animate: {} } // No animation
    : { 
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      };
  
  return <motion.div {...animationProps}>{children}</motion.div>;
}
\`\`\`

## Conclusion

Motion design is a powerful tool for enhancing user experience when applied thoughtfully. By focusing on purpose, natural movement, and appropriate timing, animations can transform a standard interface into an engaging, intuitive experience that guides users and creates emotional connections.

Remember that the best animations are often those that users don't consciously notice—they simply make the interface feel natural, responsive, and alive.

What are your favorite examples of meaningful UI animation? Share your thoughts in the comments!
    `,
    date: "February 28, 2023",
    coverImage:
      "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: {
      name: "Hitesh Parmar",
      avatar:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    tags: ["UX Design", "Animation", "Motion", "Psychology"],
    readTime: "7 min read",
  },
  {
    id: "responsive-design-mobile-first",
    title: "Beyond Media Queries: Modern Approaches to Responsive Design",
    excerpt:
      "Exploring advanced techniques for creating truly responsive interfaces using modern CSS and JavaScript.",
    content: `
# Beyond Media Queries: Modern Approaches to Responsive Design

Responsive web design has evolved significantly since Ethan Marcotte first coined the term in 2010. While media queries remain a cornerstone of responsive design, modern development offers many more tools and approaches. This article explores advanced techniques that go beyond basic media queries to create truly responsive experiences.

## The Evolution of Responsive Design

Early responsive design relied almost exclusively on media queries to adapt layouts at specific breakpoints:

\`\`\`css
/* Traditional approach */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
\`\`\`

This approach works, but it creates distinct "jump points" rather than truly fluid designs, and requires managing multiple breakpoints.

## Modern Approach #1: Intrinsic Design with Modern CSS

Intrinsic design leverages content size, available space, and modern CSS features to create naturally responsive layouts without explicit breakpoints.

### CSS Grid with auto-fill and minmax

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

This creates a responsive grid where columns automatically adjust based on available space, adding or removing columns as needed without media queries.

### Flexbox and flex-wrap

\`\`\`css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;
  max-width: 100%;
}
\`\`\`

Cards will automatically wrap to new rows as space becomes constrained, maintaining their minimum width.

### clamp() for Fluid Typography

\`\`\`css
:root {
  --fluid-type: clamp(1rem, 0.5rem + 1.5vw, 2rem);
}

h1 {
  font-size: var(--fluid-type);
}
\`\`\`

Text smoothly scales between minimum and maximum sizes based on viewport width, without breakpoints.

### Container Queries

The newest addition to responsive design, container queries allow elements to respond to their parent container's size rather than the viewport:

\`\`\`css
@container (min-width: 400px)
  .card-content {
    display: flex;
    align-items: center;
  }
  
  .card-image {
    width: 30%;
  }
}
\`\`\`

This is particularly useful for reusable components that might appear in different contexts.

## Modern Approach #2: Component-Level Responsiveness

Traditionally, responsiveness was handled at the page level. A more modular approach focuses on component-level responsiveness:

### React Hooks for Responsive Components

\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: undefined, height: undefined });
  
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return size;
}

function ResponsiveComponent() {
  const { width } = useWindowSize();
  
  return (
    <div className="component">
      {width < 768 ? <MobileView /> : <DesktopView />}
    </div>
  );
}
\`\`\`

### Intersection Observer for Viewport-Aware Components

\`\`\`jsx
function LazyLoadedImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef} className="image-container">
      {isVisible ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
}
\`\`\`

## Modern Approach #3: Responsive to User Preferences

Modern responsiveness also means adapting to user preferences and needs:

### Dark Mode Toggle

\`\`\`css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #121212;
    --text-color: #f0f0f0;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-color: #ffffff;
    --text-color: #121212;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
\`\`\`

### Reduced Motion for Accessibility

\`\`\`css
@media (prefers-reduced-motion: no-preference) {
  .animated {
    transition: transform 0.3s ease;
  }
}
\`\`\`

## Modern Approach #4: Content-Aware Responsiveness

### Content-Based Media Queries

\`\`\`css
/* Apply styles when content is wider than container */
@media (min-width: 0px) and (container-type: inline-size) {
  @container (min-width: 400px) {
    .card {
      padding: 2rem;
    }
  }
}
\`\`\`

### Dynamic Image Loading with srcset

\`\`\`html
<img 
  src="image-small.jpg"
  srcset="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Responsive image"
/>
\`\`\`

## Modern Approach #5: API-Based Responsiveness

For applications with complex layouts that need significant restructuring across devices:

\`\`\`jsx
import { useState, useEffect } from 'react';

function AppLayout() {
  const [layout, setLayout] = useState('desktop');
  
  useEffect(() => {
    function updateLayout() {
      if (window.innerWidth < 600) {
        setLayout('mobile');
      } else if (window.innerWidth < 1024) {
        setLayout('tablet');
      } else {
        setLayout('desktop');
      }
    }
    
    window.addEventListener('resize', updateLayout);
    updateLayout();
    
    return () => window.removeEventListener('resize', updateLayout);
  }, []);
  
  return (
    <LayoutContext.Provider value={layout}>
      <App />
    </LayoutContext.Provider>
  );
}
\`\`\`

Components can then consume this layout context and render appropriately.

## Case Study: Building a Truly Responsive Card Component

Let's apply these principles to a card component that adapts at multiple levels:

\`\`\`jsx
function ResponsiveCard({ title, content, image }) {
  const cardRef = useRef(null);
  const [isWide, setIsWide] = useState(false);
  const { prefersReducedMotion } = useAccessibilityPreferences();
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setIsWide(entry.contentRect.width >= 400);
      }
    });
    
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <article 
      ref={cardRef}
      className={'card ' + (isWide ? 'card--wide' : 'card--stacked')}
      style={{
        '--card-animation': prefersReducedMotion ? 'none' : 'fade-in 0.3s ease',
      }}
    >
      <div className="card__media">
        <img 
          src="image-small.jpg"
          srcset="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
          sizes={isWide ? '30vw' : '100vw'}
          alt="Responsive image"
        />
      </div>
      <div className="card__content">
        <h2 className="card__title" style={{ fontSize: 'clamp(1.2rem, 1rem + 1vw, 2rem)' }}>
          {title}
        </h2>
        <p className="card__text">{content}</p>
      </div>
    </article>
  );
}
\`\`\`

The CSS:

\`\`\`css
.card {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: var(--card-animation);
}

.card--wide {
  flex-direction: row;
}

.card--wide .card__media {
  width: 30%;
}

.card--stacked .card__media {
  width: 100%;
}

@container (min-width: 400px) {
  .card {
    padding: 1.5rem;
  }
}
\`\`\`

## Conclusion

Modern responsive design goes far beyond viewport-based media queries. By combining intrinsic design principles, component-level responsiveness, user preference adaptation, content-aware techniques, and thoughtful API usage, we can create interfaces that truly respond to every aspect of the user's context.

The most robust approach is often a combination of these techniques, using the right tool for each specific challenge. The goal remains the same: creating interfaces that feel natural and appropriate regardless of device, user preferences, or context.

What responsive techniques have you found most effective in your projects? Share your experiences in the comments!
    `,
    date: "January 15, 2023",
    coverImage:
      "https://images.pexels.com/photos/6456264/pexels-photo-6456264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    author: {
      name: "Hitesh Parmar",
      avatar:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    tags: ["Responsive Design", "CSS", "Mobile First", "Web Development"],
    readTime: "9 min read",
  },
];
