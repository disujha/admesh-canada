'use client';

import React, { useEffect, useRef, useState } from 'react';

type CityData = {
  name: string;
  x: number; // normalized coordinate 0 to 1
  y: number; // normalized coordinate 0 to 1
  stores: string;
  population: string;
  reach: string;
  val: string;
  trend: string;
  color: string;
};

const CITIES_DATA: CityData[] = [
  { name: 'Toronto (GTA)', x: 0.58, y: 0.74, stores: '1,245', population: '6.8M', reach: '4.2M', val: '$34,500', trend: 'Dense', color: '#3B82F6' },
  { name: 'Montreal', x: 0.65, y: 0.72, stores: '820', population: '4.3M', reach: '2.9M', val: '$28,200', trend: 'Active', color: '#818CF8' },
  { name: 'Vancouver', x: 0.18, y: 0.63, stores: '610', population: '2.6M', reach: '1.8M', val: '$22,800', trend: 'Growing', color: '#10B981' },
  { name: 'Calgary', x: 0.28, y: 0.62, stores: '450', population: '1.4M', reach: '1.1M', val: '$18,500', trend: 'Dense', color: '#FFB300' },
  { name: 'Edmonton', x: 0.29, y: 0.57, stores: '380', population: '1.2M', reach: '0.9M', val: '$15,200', trend: 'Steady', color: '#F472B6' },
  { name: 'Winnipeg', x: 0.44, y: 0.64, stores: '240', population: '0.8M', reach: '0.6M', val: '$11,000', trend: 'Emerging', color: '#A78BFA' },
  { name: 'Halifax', x: 0.78, y: 0.71, stores: '190', population: '0.4M', reach: '0.3M', val: '$8,400', trend: 'Expanding', color: '#06B6D4' },
];

const NetworkMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCity, setActiveCity] = useState<CityData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let dots: any[] = [];
    const dotCount = 600;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // Canada shape approximation (normalized coordinates 0-1)
        const nx = x / canvas.width;
        const ny = y / canvas.height;
        
        // Simplified Canada boundary logic
        const isInCanada = (nx: number, ny: number) => {
          if (nx < 0.12 || nx > 0.88) return false;
          if (ny < 0.15 || ny > 0.85) return false;
          
          // Alaska Cutout (US)
          if (nx < 0.22 && ny < 0.5) return false;
          // Greenland Cutout
          if (nx > 0.78 && ny < 0.42) return false;
          // Hudson Bay Cutout
          if (nx > 0.46 && nx < 0.62 && ny > 0.28 && ny < 0.52) return false;
          // Southern flat border (Prairies / West)
          if (nx < 0.5 && ny > 0.68) return false;
          // Southern Great Lakes Cutout (Ontario border)
          if (nx >= 0.5 && nx < 0.68 && ny > 0.82) return false;
          
          return true;
        };

        if (isInCanada(nx, ny)) {
          dots.push({
            x,
            y,
            size: Math.random() * 1.8 + 0.8,
            pulse: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.03 + 0.01,
            type: Math.random() > 0.35 ? 'verified' : 'pending'
          });
        }
      }
    };

    // Helper to draw clean curves
    const drawCurve = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2 - 40; // curve control height
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -Date.now() * 0.01;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(mx, my, x2, y2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset
    };

    const drawHeatmap = (cx: number, cy: number, r: number, color: string) => {
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      
      // 1. Draw Province Heatmaps
      drawHeatmap(0.58 * w, 0.74 * h, w * 0.12, 'rgba(37, 99, 235, 0.06)'); // Ontario
      drawHeatmap(0.65 * w, 0.72 * h, w * 0.09, 'rgba(99, 102, 241, 0.06)'); // Quebec
      drawHeatmap(0.18 * w, 0.63 * h, w * 0.08, 'rgba(16, 185, 129, 0.06)'); // BC
      drawHeatmap(0.285 * w, 0.60 * h, w * 0.10, 'rgba(245, 158, 11, 0.05)'); // Alberta
      
      // 2. Draw Grid Dots (Canada Shape)
      dots.forEach(dot => {
        dot.pulse += dot.speed;
        const opacity = 0.15 + Math.sin(dot.pulse) * 0.15;
        const color = dot.type === 'verified' ? '#cbd5e1' : '#e2e8f0';
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 3. Draw Connection Lines between Cities
      const Toronto = { x: 0.58 * w, y: 0.74 * h };
      const Montreal = { x: 0.65 * w, y: 0.72 * h };
      const Vancouver = { x: 0.18 * w, y: 0.63 * h };
      const Calgary = { x: 0.28 * w, y: 0.62 * h };
      const Edmonton = { x: 0.29 * w, y: 0.57 * h };
      const Winnipeg = { x: 0.44 * w, y: 0.64 * h };
      const Halifax = { x: 0.78 * w, y: 0.71 * h };

      drawCurve(Vancouver.x, Vancouver.y, Calgary.x, Calgary.y, 'rgba(16, 185, 129, 0.2)');
      drawCurve(Calgary.x, Calgary.y, Edmonton.x, Edmonton.y, 'rgba(245, 158, 11, 0.2)');
      drawCurve(Calgary.x, Calgary.y, Winnipeg.x, Winnipeg.y, 'rgba(245, 158, 11, 0.2)');
      drawCurve(Winnipeg.x, Winnipeg.y, Toronto.x, Toronto.y, 'rgba(37, 99, 235, 0.2)');
      drawCurve(Toronto.x, Toronto.y, Montreal.x, Montreal.y, 'rgba(99, 102, 241, 0.2)');
      drawCurve(Montreal.x, Montreal.y, Halifax.x, Halifax.y, 'rgba(6, 182, 212, 0.2)');

      // 4. Draw City Hubs and Pulsing Active Campaigns
      CITIES_DATA.forEach((city, index) => {
        const cx = city.x * w;
        const cy = city.y * h;
        
        // Pulsating outer ring
        const timeFactor = Date.now() * 0.002 + index;
        const pulseFactor = Math.sin(timeFactor) * 0.5 + 0.5; // 0 to 1
        const pulseSize = 6 + pulseFactor * 10;
        
        ctx.beginPath();
        ctx.arc(cx, cy, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `${city.color}15`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(cx, cy, pulseSize - 4, 0, Math.PI * 2);
        ctx.strokeStyle = `${city.color}30`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner glowing dot
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = city.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = city.color;
        ctx.fill();
        
        ctx.shadowBlur = 0; // Reset
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

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full opacity-90 block" />
      
      {/* 5. Interactive HTML Hover Overlays */}
      {CITIES_DATA.map((city, idx) => (
        <div 
          key={idx}
          style={{ left: `${city.x * 100}%`, top: `${city.y * 100}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 group z-25"
          onMouseEnter={() => setActiveCity(city)}
          onMouseLeave={() => setActiveCity(null)}
        >
          {/* Hover Target Circle */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer select-none">
            <span className="w-3.5 h-3.5 rounded-full border border-white/60 bg-transparent group-hover:scale-125 transition-transform duration-300 relative flex items-center justify-center">
              <span 
                className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-150" 
                style={{ backgroundColor: city.color }} 
              />
            </span>
          </div>

          {/* Hover Card */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 bg-[#0A1A2C]/95 backdrop-blur-md text-[#F1EFE6] rounded-none p-4 shadow-2xl border border-[#FFB300]/35 pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50 font-mono">
            <div className="flex items-center justify-between border-b border-[#F1EFE6]/10 pb-2 mb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-[#F1EFE6]">{city.name}</span>
              <span 
                className="text-[8px] font-bold uppercase px-1.5 py-0.5 border"
                style={{ 
                  color: '#FFB300', 
                  borderColor: 'rgba(255, 179, 0, 0.4)', 
                  backgroundColor: 'rgba(255, 179, 0, 0.08)' 
                }}
              >
                {city.trend}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-[10px]">
              <div>
                <span className="block text-[8px] text-[#52617A] uppercase tracking-wider mb-0.5">Retail Stores</span>
                <span className="text-[#F1EFE6] font-medium">{city.stores}</span>
              </div>
              <div>
                <span className="block text-[8px] text-[#52617A] uppercase tracking-wider mb-0.5">Population</span>
                <span className="text-[#F1EFE6] font-medium">{city.population}</span>
              </div>
              <div>
                <span className="block text-[8px] text-[#52617A] uppercase tracking-wider mb-0.5">Est. Reach</span>
                <span className="text-[#F1EFE6] font-medium">{city.reach}</span>
              </div>
              <div>
                <span className="block text-[8px] text-[#52617A] uppercase tracking-wider mb-0.5">Avg Value</span>
                <span className="text-[#FFB300] font-medium">{city.val}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NetworkMap;
