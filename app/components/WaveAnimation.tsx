'use client';
// components/WaveAnimation.tsx
import React, { useEffect, useRef } from 'react';

const WaveAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas size
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Wave properties
    const waves = [
      {
        y: height - 100,
        length: 0.005,
        amplitude: 40,
        speed: 0.001,
        color: 'rgba(30, 64, 175, 0.8)'  // blue-800 with opacity
      },
      {
        y: height - 70,
        length: 0.008,
        amplitude: 30,
        speed: 0.0015,
        color: 'rgba(37, 99, 235, 0.6)'  // blue-600 with opacity
      },
      {
        y: height - 40,
        length: 0.01,
        amplitude: 20,
        speed: 0.002,
        color: 'rgba(59, 130, 246, 0.4)'  // blue-500 with opacity
      }
    ];
    
    // Create stars for night sky effect
    const stars: {x: number; y: number; size: number; opacity: number}[] = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6, // Only in top 60% of screen
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    
    // Animation loop
    let animationId: number;
    let startTime = Date.now();
    
    const animate = () => {
      // Calculate elapsed time
      const time = Date.now();
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient for sky
      const skyGradient = ctx.createLinearGradient(width / 2, 0, width / 2, height * 0.8);
      skyGradient.addColorStop(0, '#0c1945'); // Very dark blue
      skyGradient.addColorStop(1, '#1e40af'); // blue-800
      
      // Fill sky
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw stars
      ctx.save();
      stars.forEach(star => {
        // Twinkle effect
        const twinkle = Math.sin(time * 0.001 + star.x) * 0.3 + 0.7;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
      
      // Draw moon
      ctx.save();
      const moonGradient = ctx.createRadialGradient(
        width * 0.8, height * 0.2, 0,
        width * 0.8, height * 0.2, 40
      );
      moonGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      moonGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.9)');
      moonGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.2, 40, 0, Math.PI * 2);
      ctx.fill();
      
      // Add moon glow
      const glowGradient = ctx.createRadialGradient(
        width * 0.8, height * 0.2, 40,
        width * 0.8, height * 0.2, 100
      );
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.2, 100, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Draw waves
      for (const wave of waves) {
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 5) {
          const dx = x * wave.length;
          const sine = Math.sin(dx + time * wave.speed);
          const y = wave.y + sine * wave.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = wave.color;
        ctx.fill();
      }
      
      // Add reflection on water
      ctx.save();
      const moonReflectionGradient = ctx.createRadialGradient(
        width * 0.8, height - 65, 0,
        width * 0.8, height - 65, 20
      );
      moonReflectionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      moonReflectionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = moonReflectionGradient;
      ctx.beginPath();
      ctx.ellipse(width * 0.8, height - 65, 30, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Shimmer on water surface
      ctx.save();
      for (let i = 0; i < 20; i++) {
        const shimmerX = Math.random() * width;
        const shimmerY = height - 60 - Math.random() * 40;
        const shimmerSize = Math.random() * 3 + 1;
        const shimmerOpacity = Math.random() * 0.3;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${shimmerOpacity})`;
        ctx.beginPath();
        ctx.arc(shimmerX, shimmerY, shimmerSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      
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
    />
  );
};

export default WaveAnimation;