'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FormatCard {
  id: string;
  name: string;
  description: string;
  retailType: string;
  visibilityScore: string;
  startingPrice: string;
  imageUrl: string;
  advantage: string;
  specs: string;
  dimensions: string;
}

const FORMATS: FormatCard[] = [
  {
    id: 'counter-sticker',
    name: 'Counter Sticker',
    description: 'High visibility adhesive stickers placed near checkout counters.',
    retailType: 'Convenience • Pharmacy • Cafe',
    visibilityScore: '8.2',
    startingPrice: '$5/store',
    imageUrl: '/images/admesh-counter-promo-card.png',
    advantage: 'Captures attention at the point of sale during transaction checkout.',
    specs: 'Pre-laminated high-tac vinyl',
    dimensions: '297mm × 210mm'
  },
  {
    id: 'countertop-display',
    name: 'Countertop Display',
    description: 'Premium acrylic and board units placed adjacent to cash registers.',
    retailType: 'Convenience • Pharmacy • Cafe',
    visibilityScore: '8.6',
    startingPrice: '$9/store',
    imageUrl: '/images/admesh-countertop-display-unit.png',
    advantage: '3D structural placement ensures active eye-level gaze tracking.',
    specs: 'Premium 3mm gloss acrylic',
    dimensions: '210mm × 148mm × 80mm'
  },
  {
    id: 'dangler',
    name: 'Hanging Dangler',
    description: 'Double-sided suspended cards creating overhead visual loops.',
    retailType: 'Convenience • Cafe • Grocery',
    visibilityScore: '8.4',
    startingPrice: '$7/store',
    imageUrl: '/images/admesh-aisle-dangler.png',
    advantage: 'Extended dwell visibility hanging directly above product aisles.',
    specs: '350 GSM double-side printed card',
    dimensions: '300mm × 300mm'
  },
  {
    id: 'shelf-branding',
    name: 'Shelf Divider',
    description: 'High-yield category dividers and horizontal shelf highlight strips.',
    retailType: 'Convenience • Pharmacy • Grocery',
    visibilityScore: '8.9',
    startingPrice: '$12/store',
    imageUrl: '/images/admesh-shelf-edge-branding.png',
    advantage: 'Drives instant in-category brand recognition and impulse buys.',
    specs: 'Scratch-proof rigid PVC strips',
    dimensions: '900mm × 40mm'
  },
  {
    id: 'wall-poster',
    name: 'Window Poster',
    description: 'Sleek premium indoor posters positioned in high-dwell spaces.',
    retailType: 'Cafe • Coffee Shop • Barber',
    visibilityScore: '8.7',
    startingPrice: '$8/store',
    imageUrl: '/images/admesh-instore-poster-display.png',
    advantage: 'High-contrast branding aligned to seating spots and social areas.',
    specs: '220 GSM gloss poster paper',
    dimensions: '594mm × 420mm (A2)'
  },
  {
    id: 'flex-banner',
    name: 'Storefront Banner',
    description: 'Weatherproof heavy-duty outdoor banners mounted on facades.',
    retailType: 'Convenience • Electronics • Cafe',
    visibilityScore: '9.1',
    startingPrice: '$19/store',
    imageUrl: '/images/admesh-exterior-shelf-banner.png',
    advantage: 'Deep street exposure capturing neighborhood foot traffic 24/7.',
    specs: '440 GSM frontlit matte flex sheet',
    dimensions: '1800mm × 900mm'
  },
  {
    id: 'shutter-branding',
    name: 'Full Window Wrap',
    description: 'Massive outdoor storefront adhesive vinyl wrapping.',
    retailType: 'Convenience • Pharmacy • Cafe',
    visibilityScore: '9.3',
    startingPrice: '$29/store',
    imageUrl: '/images/admesh-shutter-branding.png',
    advantage: 'Dominates neighborhood streets with high visual coverage.',
    specs: 'Industrial flexible adhesive vinyl',
    dimensions: '2400mm × 2100mm'
  },
  {
    id: 'digital-display',
    name: 'Digital Display Screen',
    description: 'Smart connected display screens running automated video ads.',
    retailType: 'Cafe • Pharmacy • Supermarket',
    visibilityScore: '9.5',
    startingPrice: '$45/store',
    imageUrl: '/images/admesh-smart-digital-screen.png',
    advantage: 'Dynamic digital scheduling, remote updates, and movement capture.',
    specs: 'Plug-and-play smart media terminal',
    dimensions: '32-inch Slim LCD Panel'
  },
  {
    id: 'store-takeover',
    name: 'Full Store Takeover',
    description: '100% brand dominance wrapping the shop exterior and interior.',
    retailType: 'Convenience • Pharmacy • Grocery',
    visibilityScore: '9.8',
    startingPrice: '$120/store',
    imageUrl: '/images/admesh-store-takeover.png',
    advantage: 'Maximum impact, turns the entire local store into your brand billboard.',
    specs: 'Multi-asset complete wrap package including window graphics, signs, counters, and stickers.',
    dimensions: 'Multi-Asset Wrap Package'
  }
];

const RetailAdFormats = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0.35, y: 70 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              end: 'top 48%',
              scrub: 0.7
            }
          }
        );

        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i)
        });
      });
    }, cardsWrapRef);

    return () => ctx.revert();
  }, []);

  const activeFormat = useMemo(() => FORMATS[activeIndex] ?? FORMATS[0], [activeIndex]);
  const progressLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(FORMATS.length).padStart(2, '0')}`;

  return (
    <section id="formats" className="relative py-32 bg-white overflow-visible border-t border-slate-200">
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-full relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.35fr)] gap-8 lg:gap-10 items-start pt-10 lg:pt-12 pb-24">
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] flex flex-col justify-start lg:justify-between border border-slate-200 bg-slate-50/90 backdrop-blur-sm px-5 py-6 sm:px-7 sm:py-8 rounded-2xl shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-blue-600/40" />
                <span className="mono text-blue-600 text-[11px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>
                  01 // MEDIA INVENTORY
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tighter uppercase leading-[1.02] mb-6">
                Ad Formats
                <br />
                For Every
                <br />
                <span className="text-blue-600 italic font-serif text-glow">Retail Space</span>
              </h2>
              <div className="border-t border-slate-200 pt-5">
                <p className="mono text-[10px] tracking-[0.2em] text-blue-600 uppercase mb-2 font-bold">Now Showing</p>
                <h3 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight uppercase leading-tight mb-3">{activeFormat.name}</h3>
                <p className="text-sm lg:text-base text-slate-500 leading-relaxed">{activeFormat.description}</p>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="flex items-center justify-between mb-2">
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Scroll Sequence</span>
                <span className="mono text-xs uppercase tracking-[0.2em] text-blue-600 font-bold">{progressLabel}</span>
              </div>
              <div className="h-1 bg-slate-200 overflow-hidden rounded-full">
                <div
                  className="h-full bg-blue-600"
                  style={{
                    width: `${((activeIndex + 1) / FORMATS.length) * 100}%`,
                    transition: 'width 300ms ease-out'
                  }}
                />
              </div>
            </div>
          </aside>

          <div ref={cardsWrapRef} className="flex flex-col gap-12 lg:gap-16">
            {FORMATS.map((format, i) => {
              const isCustomPrice = format.startingPrice.toLowerCase().includes('custom');

              return (
                <article
                  key={format.id}
                  ref={(node) => {
                    cardRefs.current[i] = node;
                  }}
                  data-index={i}
                  className="relative rounded-[14px] overflow-hidden border border-slate-200 hover:border-blue-600/40 group transition-all duration-500 hover:shadow-md min-h-[400px] lg:min-h-[500px]"
                >
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-slate-200 group-hover:border-blue-600/40 transition-colors z-20" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-slate-200 group-hover:border-blue-600/40 transition-colors z-20" />

                  <img
                    src={format.imageUrl}
                    alt={format.name}
                    className="absolute inset-0 w-full h-full object-cover object-center grayscale-[8%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out brightness-[1.02] contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 scanlines opacity-[0.02] pointer-events-none" />

                  <div className="absolute inset-0 z-10 p-5 sm:p-6 lg:p-8 flex items-end justify-start">
                    <div className="w-full max-w-[560px] bg-white border border-slate-200 p-6 sm:p-7 lg:p-8 shadow-sm backdrop-blur-[2px] rounded-xl">
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <span className="mono text-[10px] text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded border border-blue-100 font-bold">
                          VISIBILITY: {format.visibilityScore} / 10
                        </span>
                        <span className="text-[10px] mono text-slate-400 uppercase shrink-0 font-bold">FORMAT_0{i + 1}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight uppercase group-hover:text-blue-600 transition-colors duration-300 mb-3 leading-tight">
                        {format.name}
                      </h3>

                      <p className="text-sm sm:text-base lg:text-lg text-slate-500 leading-relaxed font-light mb-5">{format.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div>
                          <span className="text-[10px] mono text-blue-600 uppercase tracking-wider block mb-1.5 font-bold">Strategic Edge</span>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">{format.advantage}</p>
                        </div>
                        <div>
                          <span className="text-[10px] mono text-blue-600 uppercase tracking-wider block mb-1.5 font-bold">Material Specs</span>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">{format.specs}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex flex-wrap justify-between items-end gap-4">
                        <div className="min-w-[180px]">
                          <span className="text-[10px] mono uppercase tracking-widest text-slate-400 block mb-1 font-bold">Target Retail</span>
                          <span className="text-sm sm:text-base text-slate-800 font-semibold leading-snug">{format.retailType}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] mono uppercase tracking-widest text-slate-400 block mb-1 font-bold">Starting</span>
                          <span
                            className="text-blue-600 font-bold text-sm sm:text-base bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg inline-block"
                          >
                            {format.startingPrice}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 text-[10px] mono uppercase tracking-[0.18em] text-slate-400 font-bold">Size: {format.dimensions}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetailAdFormats;
