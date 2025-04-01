'use client';
// components/RealisticOcean.tsx
import React, { useEffect, useRef } from 'react';

const RealisticOcean: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas size with higher resolution for better quality
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // More realistic ocean constants
    const horizon = height * 0.65; // Horizon line position
    const waveColors = [
      { color: 'rgba(1, 4, 8, 0.9)', pos: 0.65 },  // Deep ocean
      { color: 'rgba(4, 13, 27, 0.9)', pos: 0.7 },  // Mid ocean
      { color: 'rgba(8, 21, 46, 0.91)', pos: 0.75 }, // Lighter ocean
      { color: 'rgba(12, 26, 52, 0.7)', pos: 0.8 }, // Surface ocean
      { color: 'rgba(18, 20, 25, 0.76)', pos: 0.85 } // Wave tops
    ];
    
    // Create stars
    const stars: {x: number; y: number; radius: number; opacity: number; twinkleSpeed: number}[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * horizon * 0.9, // Only in sky portion
        radius: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.005 + 0.001
      });
    }
    
    // Create a perlin-like noise function for more natural waves
    const noise = (function() {
      const permutation: number[] = [];
      const p: number[] = new Array(512);
      
      for (let i = 0; i < 256; i++) {
        permutation[i] = Math.floor(Math.random() * 256);
      }
      
      for (let i = 0; i < 512; i++) {
        p[i] = permutation[i & 255];
      }
      
      const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
      
      const lerp = (t: number, a: number, b: number) => a + t * (b - a);
      
      const grad = (hash: number, x: number) => {
        const h = hash & 15;
        const grad = 1 + (h & 7);
        return (h & 8 ? -grad : grad) * x;
      };
      
      return (x: number) => {
        const X = Math.floor(x) & 255;
        x -= Math.floor(x);
        const u = fade(x);
        return lerp(u, grad(p[X], x), grad(p[X + 1], x - 1)) * 0.5;
      };
    })();
    
    // Animation loop
    let animationId: number;
    const startTime = Date.now();
    
    const drawSky = (time: number) => {
      // Create deep space gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, horizon);
      skyGradient.addColorStop(0, '#0a1a40'); // Very dark blue at top
      skyGradient.addColorStop(0.5, '#102a63'); // Dark blue in middle
      skyGradient.addColorStop(1, '#1e3a8a'); // Lighter blue at horizon
      
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, horizon);
      
      // Draw stars with realistic twinkling
      ctx.save();
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 10 + star.x) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
        
        // Add subtle glow to brighter stars
        if (star.radius > 1) {
          const glow = ctx.createRadialGradient(
            star.x, star.y, star.radius,
            star.x, star.y, star.radius * 3
          );
          glow.addColorStop(0, `rgba(255, 255, 255, ${0.1 * twinkle})`);
          glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();
    };
    
    const drawMoon = (time: number) => {
      ctx.save();
      
      // Moon position (slightly moving to add realism)
      const moonX = width * 0.85 + Math.sin(time * 0.0002) * 5;
      const moonY = height * 0.3 + Math.cos(time * 0.0003) * 3;
      const moonRadius = width * 0.04; // Proportional to screen size
      
      // Draw moon glow
      const outerGlow = ctx.createRadialGradient(
        moonX, moonY, moonRadius,
        moonX, moonY, moonRadius * 4
      );
      outerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      outerGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Create moon gradient for realistic look
      const moonGradient = ctx.createRadialGradient(
        moonX - moonRadius * 0.3, moonY - moonRadius * 0.3, 0,
        moonX, moonY, moonRadius
      );
      moonGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      moonGradient.addColorStop(0.8, 'rgba(220, 220, 235, 1)');
      moonGradient.addColorStop(1, 'rgba(200, 205, 220, 1)');
      
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Subtle moon details
      ctx.fillStyle = 'rgba(200, 200, 220, 0.15)';
      ctx.beginPath();
      ctx.arc(moonX + moonRadius * 0.35, moonY - moonRadius * 0.25, moonRadius * 0.2, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(moonX - moonRadius * 0.25, moonY + moonRadius * 0.3, moonRadius * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Moon reflection on water
      const reflectionX = moonX;
      const reflectionWidth = moonRadius * 2 + Math.sin(time * 0.001) * moonRadius;
      const reflectionHeight = moonRadius * 10 + Math.cos(time * 0.002) * moonRadius * 2;
      
      const reflectionGradient = ctx.createLinearGradient(
        reflectionX, horizon,
        reflectionX, horizon + reflectionHeight
      );
      reflectionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      reflectionGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.4)');
      reflectionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.ellipse(
        reflectionX, 
        horizon + reflectionHeight / 2, 
        reflectionWidth / 2, 
        reflectionHeight / 2, 
        0, 0, Math.PI * 2
      );
      ctx.fillStyle = reflectionGradient;
      ctx.fill();
      ctx.restore();
      
      ctx.restore();
      
      return { moonX, moonY, moonRadius };
    };
    
    const drawOcean = (time: number, moon: { moonX: number, moonY: number, moonRadius: number }) => {
      ctx.save();
      
      // Base ocean fill
      const oceanGradient = ctx.createLinearGradient(0, horizon, 0, height);
      oceanGradient.addColorStop(0, '#1e3a8a'); // Horizon
      oceanGradient.addColorStop(1, '#0f2057'); // Deep water
      
      ctx.fillStyle = oceanGradient;
      ctx.fillRect(0, horizon, width, height - horizon);
      
      // Draw dynamic waves
      waveColors.forEach((wave, index) => {
        const wavePosition = height * wave.pos;
        const amplitude = 10 + index * 5; // Increasing amplitude for waves closer to viewer
        const frequency = 0.005 - index * 0.0005; // Decreasing frequency for distant waves
        const speed = 0.0004 + index * 0.00005; // Increasing speed for waves closer to viewer
        
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        // Use noise function for more natural waves
        for (let x = 0; x <= width; x += 2) {
          const noiseFactor = noise(x * 0.01 + time * speed) +
                            noise(x * 0.02 + time * speed * 1.5) * 0.5 +
                            noise(x * 0.04 + time * speed * 2) * 0.25;
                            
          const y = wavePosition + noiseFactor * amplitude * 2;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = wave.color;
        ctx.fill();
      });
      
      // Add shimmer/highlights on water surface
      const shimmerCount = 100 + Math.floor(Math.sin(time * 0.001) * 20);
      for (let i = 0; i < shimmerCount; i++) {
        const shimmerX = Math.random() * width;
        const shimmerY = horizon + Math.random() * (height - horizon) * 0.5; // Top half of ocean
        const shimmerSize = Math.random() * 2 + 0.5;
        
        // More shimmer near moon reflection
        const distanceToMoonReflection = Math.abs(shimmerX - moon.moonX);
        const moonInfluence = Math.max(0, 1 - distanceToMoonReflection / (width * 0.3));
        const shimmerOpacity = Math.random() * 0.15 * (moonInfluence + 0.2);
        
        ctx.beginPath();
        ctx.arc(shimmerX, shimmerY, shimmerSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${shimmerOpacity})`;
        ctx.fill();
      }
      
      ctx.restore();
    };
    
    const drawFog = () => {
      // Subtle fog layer near the horizon
      const fogGradient = ctx.createLinearGradient(0, horizon - 50, 0, horizon + 50);
      fogGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      fogGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      fogGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = fogGradient;
      ctx.fillRect(0, horizon - 50, width, 100);
    };
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw scene elements in correct order
      drawSky(elapsedTime);
      const moon = drawMoon(elapsedTime);
      drawOcean(elapsedTime, moon);
      drawFog();
      
      // Continue animation
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-[-1]"
      style={{ touchAction: 'none' }}
    />
  );
};

export default RealisticOcean;