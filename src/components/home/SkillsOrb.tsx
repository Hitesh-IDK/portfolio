import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

// Define skills that will appear on the orb
const skills = [
  'React', 'Next.js', 'TypeScript', 
  'Express.js', 'Go', 'AWS', 
  'Redis', 'PostgreSQL', 'Node.js',
  'GraphQL', 'Docker', 'Kubernetes',
  'CI/CD', 'REST APIs', 'MongoDB',
  'Redux', 'Jest', 'WebSockets',
  'Microservices', 'System Design'
];

export default function SkillsOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Container for all text elements
    const group = new THREE.Group();
    scene.add(group);
    
    // Create text sprites for each skill
    skills.forEach((skill, i) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;
      
      canvas.width = 256;
      canvas.height = 128;
      
      // Background - transparent
      context.fillStyle = 'rgba(0, 0, 0, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Text
      context.font = 'bold 28px Inter, system-ui, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Color based on theme
      const textColor = theme === 'dark' ? '#ffffff' : '#1e1b4b';
      context.fillStyle = textColor;
      context.fillText(skill, canvas.width / 2, canvas.height / 2);
      
      // Create texture
      const texture = new THREE.CanvasTexture(canvas);
      
      // Create material
      const material = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
      });
      
      // Create sprite
      const sprite = new THREE.Sprite(material);
      
      // Position on a sphere with larger radius for more spread
      const radius = 2.5;
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      
      sprite.position.x = radius * Math.sin(phi) * Math.cos(theta);
      sprite.position.y = radius * Math.sin(phi) * Math.sin(theta);
      sprite.position.z = radius * Math.cos(phi);
      
      // Scale - adjusted for better visibility
      sprite.scale.set(0.4, 0.2, 1);
      
      group.add(sprite);
    });
    
    // Mouse movement effect
    const mouse = new THREE.Vector2();
    
    function onMouseMove(event: MouseEvent) {
      // Calculate mouse position relative to the container
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Check if mouse is within the container bounds
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    }
    
    window.addEventListener('mousemove', onMouseMove);
    
    // Animation
    const animate = () => {
      // Rotate the group around Y axis slowly
      group.rotation.y += 0.001;
      
      // Influence rotation based on mouse position
      group.rotation.x += (mouse.y * 0.01 - group.rotation.x) * 0.1;
      group.rotation.y += (mouse.x * 0.01 - group.rotation.y) * 0.1;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    function handleResize() {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
      
      // Dispose of resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
      
      renderer.dispose();
    };
  }, [theme]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  );
}