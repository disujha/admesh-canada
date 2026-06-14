'use client';

import React, { useEffect, useRef } from 'react';

const NetworkMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let dots: any[] = [];
    const dotCount = 400;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
      initDots();
    };

    const initDots = () => {
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // India shape approximation (normalized coordinates 0-1)
        const nx = x / canvas.width;
        const ny = y / canvas.height;
        
        // Simplified India boundary logic
        const isInIndia = (nx: number, ny: number) => {
          // Main diamond shape for the peninsula and central India
          const centerX = 0.5;
          const centerY = 0.5;
          const dx = Math.abs(nx - centerX);
          const dy = Math.abs(ny - centerY);
          
          // North (Kashmir/Himalayas)
          if (ny < 0.25 && dx < (ny * 0.8)) return true;
          // Central Body
          if (ny >= 0.25 && ny < 0.65 && dx < 0.3) return true;
          // South (Deccan/Kanyakumari)
          if (ny >= 0.65 && ny < 0.95 && dx < (0.95 - ny) * 0.8) return true;
          // North East (Seven Sisters)
          if (nx > 0.7 && ny > 0.25 && ny < 0.45 && (nx - 0.7) < (0.45 - ny)) return true;
          // West (Gujarat bulge)
          if (nx < 0.25 && ny > 0.4 && ny < 0.55 && (0.25 - nx) < (ny - 0.4)) return true;
          
          return false;
        };

        if (isInIndia(nx, ny)) {
          dots.push({
            x,
            y,
            size: Math.random() * 2 + 1,
            pulse: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.05 + 0.02,
            type: Math.random() > 0.3 ? 'verified' : 'pending'
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach(dot => {
        dot.pulse += dot.speed;
        const opacity = 0.3 + Math.sin(dot.pulse) * 0.3;
        const color = dot.type === 'verified' ? '#00FF85' : '#C97320';
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        
        // Subtle glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.stroke();
      });
      
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60" />;
};

export default NetworkMap;
