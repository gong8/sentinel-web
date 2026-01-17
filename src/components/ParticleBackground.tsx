import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseInfluenceRadius?: number;
  className?: string;
}

export function ParticleBackground({
  particleCount = 50,
  connectionDistance = 150,
  mouseInfluenceRadius = 200,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
      particlesRef.current = particles;
    },
    [particleCount]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse influence
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseInfluenceRadius && distance > 0) {
        const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
        particle.vx -= (dx / distance) * force * 0.02;
        particle.vy -= (dy / distance) * force * 0.02;
      }

      // Apply velocity with damping
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const connDx = particle.x - other.x;
        const connDy = particle.y - other.y;
        const connDistance = Math.sqrt(connDx * connDx + connDy * connDy);

        if (connDistance < connectionDistance) {
          const opacity = (1 - connDistance / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [connectionDistance, mouseInfluenceRadius]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const { width, height } = parent.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setDimensions({ width, height });
        initParticles(width, height);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [initParticles]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, dimensions]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0.6 }}
    />
  );
}

// Subtle constellation background with gentle mouse interaction
interface Star {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    // Create a grid-based distribution for balanced placement
    const cols = 8;
    const rows = 6;
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Add some randomness within each cell, but skip some cells for organic feel
        if (Math.random() > 0.4) {
          const baseX = col * cellWidth + Math.random() * cellWidth * 0.8 + cellWidth * 0.1;
          const baseY = row * cellHeight + Math.random() * cellHeight * 0.8 + cellHeight * 0.1;
          stars.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            twinkleOffset: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    starsRef.current = stars;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const stars = starsRef.current;
    const mouse = mouseRef.current;
    timeRef.current += 1;

    // Update star positions based on mouse (gentle parallax effect)
    stars.forEach((star) => {
      const dx = mouse.x - star.baseX;
      const dy = mouse.y - star.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxInfluence = 300;

      if (distance < maxInfluence && distance > 0) {
        // Gentle shift away from mouse
        const influence = (1 - distance / maxInfluence) * 15;
        star.x = star.baseX - (dx / distance) * influence;
        star.y = star.baseY - (dy / distance) * influence;
      } else {
        // Slowly return to base position
        star.x += (star.baseX - star.x) * 0.05;
        star.y += (star.baseY - star.y) * 0.05;
      }
    });

    // Draw connections first (behind stars)
    const connectionDistance = 120;
    ctx.lineCap = 'round';

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      for (let j = i + 1; j < stars.length; j++) {
        const other = stars[j];
        const connDx = star.x - other.x;
        const connDy = star.y - other.y;
        const connDistance = Math.sqrt(connDx * connDx + connDy * connDy);

        if (connDistance < connectionDistance) {
          const baseOpacity = (1 - connDistance / connectionDistance) * 0.08;
          // Add subtle pulse to connections
          const pulse = Math.sin(timeRef.current * 0.01 + i * 0.5) * 0.02 + 1;
          const opacity = baseOpacity * pulse;

          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(120, 80, 200, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw stars with twinkle effect
    stars.forEach((star) => {
      const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
      const currentOpacity = star.opacity * twinkle;
      const currentSize = star.size * (twinkle * 0.3 + 0.7);

      // Outer glow
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, currentSize * 3);
      gradient.addColorStop(0, `rgba(140, 100, 220, ${currentOpacity * 0.8})`);
      gradient.addColorStop(0.5, `rgba(120, 80, 200, ${currentOpacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(120, 80, 200, 0)');

      ctx.beginPath();
      ctx.arc(star.x, star.y, currentSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 150, 255, ${currentOpacity})`;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const { width, height } = parent.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        initStars(width, height);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [initStars]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0.7 }}
    />
  );
}

interface MouseSpotlightProps {
  className?: string;
}

export function MouseSpotlight({ className = '' }: MouseSpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
        if (!isVisible) setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      ref={spotlightRef}
      className={`fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-brand-500/10 via-brand-500/5 to-transparent blur-3xl transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
