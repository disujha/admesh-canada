'use client';

import React, { useState } from 'react';

/* ─────────────────────────────────────────
   Retail type icon set — minimal SVGs
───────────────────────────────────────── */
type RetailType =
  | 'Convenience'
  | 'Pharmacy'
  | 'Cafe'
  | 'Grocery'
  | 'Electronics'
  | 'Barber'
  | 'Supermarket'
  | 'Coffee Shop';

const RetailIcon = ({ type }: { type: RetailType }) => {
  const props = {
    width: 10,
    height: 10,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (type) {
    case 'Convenience':
      return (
        <svg {...props}>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      );
    case 'Pharmacy':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      );
    case 'Cafe':
    case 'Coffee Shop':
      return (
        <svg {...props}>
          <path d="M18 8h1a4 4 0 010 8h-1" />
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        </svg>
      );
    case 'Grocery':
    case 'Supermarket':
      return (
        <svg {...props}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57L18 7H6" />
        </svg>
      );
    case 'Electronics':
      return (
        <svg {...props}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case 'Barber':
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
        </svg>
      );
    default:
      return null;
  }
};

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
interface AdFormat {
  id: string;
  name: string;
  description: string;
  retailTypes: RetailType[];
  visibilityScore: string;
  startingPrice: string;
  imageUrl: string;
  advantage: string;
  specs: string;
  dimensions: string;
}

// Hero 4: highest-margin / most-booked, shown in landscape featured layout
const HERO_FORMATS: AdFormat[] = [
  {
    id: 'store-takeover',
    name: 'Full Store Takeover',
    description: '100% brand dominance across the entire store interior and exterior — every surface, every touchpoint.',
    retailTypes: ['Convenience', 'Pharmacy', 'Grocery'],
    visibilityScore: '9.8',
    startingPrice: '$120/store',
    imageUrl: '/images/admesh-store-takeover.jpeg',
    advantage: 'Maximum impact — the entire local store becomes your brand asset.',
    specs: 'Multi-asset complete wrap package including window graphics, signs, counters, and stickers.',
    dimensions: 'Multi-Asset Wrap Package',
  },
  {
    id: 'digital-display',
    name: 'Digital Display Screen',
    description: 'Smart connected screens running automated video ads with remote scheduling and live campaign updates.',
    retailTypes: ['Cafe', 'Pharmacy', 'Supermarket'],
    visibilityScore: '9.5',
    startingPrice: '$45/store',
    imageUrl: '/images/admesh-smart-digital-screen.jpeg',
    advantage: 'Dynamic scheduling, remote updates, and movement capture.',
    specs: 'Plug-and-play smart media terminal',
    dimensions: '32-inch Slim LCD Panel',
  },
  {
    id: 'shutter-branding',
    name: 'Full Window Wrap',
    description: 'Massive outdoor storefront adhesive vinyl wrapping for total street-level brand dominance.',
    retailTypes: ['Convenience', 'Pharmacy', 'Cafe'],
    visibilityScore: '9.3',
    startingPrice: '$29/store',
    imageUrl: '/images/admesh-shutter-branding.jpeg',
    advantage: 'Dominates neighborhood streets with maximum visual coverage.',
    specs: 'Industrial flexible adhesive vinyl',
    dimensions: '2400mm × 2100mm',
  },
  {
    id: 'flex-banner',
    name: 'Storefront Banner',
    description: 'Weatherproof heavy-duty outdoor banners mounted on building facades — capturing foot traffic 24/7.',
    retailTypes: ['Convenience', 'Electronics', 'Cafe'],
    visibilityScore: '9.1',
    startingPrice: '$19/store',
    imageUrl: '/images/admesh-exterior-shelf-banner.jpeg',
    advantage: 'Deep street exposure capturing neighborhood foot traffic around the clock.',
    specs: '440 GSM frontlit matte flex sheet',
    dimensions: '1800mm × 900mm',
  },
];

// Compact 5: remaining formats shown in 3-col grid
const COMPACT_FORMATS: AdFormat[] = [
  {
    id: 'shelf-branding',
    name: 'Shelf Divider',
    description: 'Category dividers and shelf highlight strips for in-aisle brand dominance.',
    retailTypes: ['Convenience', 'Pharmacy', 'Grocery'],
    visibilityScore: '8.9',
    startingPrice: '$12/store',
    imageUrl: '/images/admesh-shelf-edge-branding.jpeg',
    advantage: 'Drives instant in-category brand recognition and impulse buys.',
    specs: 'Scratch-proof rigid PVC strips',
    dimensions: '900mm × 40mm',
  },
  {
    id: 'wall-poster',
    name: 'Window Poster',
    description: 'Premium indoor posters in high-dwell spaces aligned to seating and social areas.',
    retailTypes: ['Cafe', 'Coffee Shop', 'Barber'],
    visibilityScore: '8.7',
    startingPrice: '$8/store',
    imageUrl: '/images/admesh-instore-poster-display.jpeg',
    advantage: 'High-contrast branding aligned to seating spots and social areas.',
    specs: '220 GSM gloss poster paper',
    dimensions: '594mm × 420mm (A2)',
  },
  {
    id: 'countertop-display',
    name: 'Countertop Display',
    description: 'Premium acrylic units adjacent to cash registers for 3D eye-level brand presence.',
    retailTypes: ['Convenience', 'Pharmacy', 'Cafe'],
    visibilityScore: '8.6',
    startingPrice: '$9/store',
    imageUrl: '/images/admesh-countertop-display-unit.jpeg',
    advantage: '3D structural placement ensures active eye-level gaze tracking.',
    specs: 'Premium 3mm gloss acrylic',
    dimensions: '210mm × 148mm × 80mm',
  },
  {
    id: 'dangler',
    name: 'Hanging Dangler',
    description: 'Double-sided suspended cards creating overhead visual loops directly above product aisles.',
    retailTypes: ['Convenience', 'Cafe', 'Grocery'],
    visibilityScore: '8.4',
    startingPrice: '$7/store',
    imageUrl: '/images/admesh-aisle-dangler.jpeg',
    advantage: 'Extended dwell visibility hanging directly above product aisles.',
    specs: '350 GSM double-side printed card',
    dimensions: '300mm × 300mm',
  },
  {
    id: 'counter-sticker',
    name: 'Counter Sticker',
    description: 'High-tac adhesive stickers near checkout counters — premium placement at the point of sale.',
    retailTypes: ['Convenience', 'Pharmacy', 'Cafe'],
    visibilityScore: '8.2',
    startingPrice: '$5/store',
    imageUrl: '/images/admesh-counter-promo-card.jpeg',
    advantage: 'Captures attention at point of sale during transaction checkout.',
    specs: 'Pre-laminated high-tac vinyl',
    dimensions: '297mm × 210mm',
  },
];

const ALL_FORMATS = [...HERO_FORMATS, ...COMPACT_FORMATS];

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

// Amber price chip — the primary commercial signal on every card
const PriceChip = ({ price, size = 'sm' }: { price: string; size?: 'sm' | 'lg' }) => (
  <div
    className={`bg-[#FFB300] text-[#0A1A2C] font-mono font-black uppercase tracking-wide leading-none shrink-0 ${
      size === 'lg' ? 'px-4 py-2.5 text-base' : 'px-2.5 py-1.5 text-xs'
    }`}
  >
    {price}
  </div>
);

// Subtle rounded pill/chip for retail types: label only, background #0A2540 at 8% opacity
const RetailTag = ({ type }: { type: RetailType }) => (
  <span className="inline-flex items-center bg-[#0A2540]/[0.08] px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider text-[#0A2540] font-bold leading-none">
    {type}
  </span>
);

// Expanded specs drawer — dark navy panel
const SpecsDrawer = ({ format, index }: { format: AdFormat; index: number }) => (
  <div className="border-t border-[#FFB300]/20 bg-[#0A1A2C] p-5">
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <p className="os-label-muted text-[#52617A] mb-1.5">Strategic Edge</p>
        <p className="text-xs text-[#F1EFE6]/75 font-light leading-relaxed">{format.advantage}</p>
      </div>
      <div>
        <p className="os-label-muted text-[#52617A] mb-1.5">Material Specs</p>
        <p className="text-xs text-[#F1EFE6]/75 font-light leading-relaxed">{format.specs}</p>
      </div>
      <div>
        <p className="os-label-muted text-[#52617A] mb-1.5">Dimensions</p>
        <p className="text-xs text-[#F1EFE6]/75 font-mono">{format.dimensions}</p>
      </div>
      <div>
        <p className="os-label-muted text-[#52617A] mb-1.5">System Reference</p>
        <p className="text-xs text-[#FFB300] font-mono leading-none">
          VID: {String(index + 1).padStart(2, '0')} <span className="text-[#52617A] mx-1">|</span> VIS SCORE: {format.visibilityScore}/10
        </p>
      </div>
    </div>
  </div>
);

// Unified format card anatomy (shared by both featured and standard grids)
const AdFormatCard = ({
  format,
  index,
  expanded,
  onToggle,
}: {
  format: AdFormat;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) => (
  <div className="bg-[#F1EFE6] border border-[#11233B]/10 group flex flex-col h-full justify-between">
    {/* Large Image — full card width, 16:9 aspect ratio */}
    <div className="relative overflow-hidden shrink-0 aspect-[16/10]">
      <img
        src={format.imageUrl}
        alt={format.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {/* Price chip — top-right, always visible */}
      <div className="absolute top-3 right-3 z-10">
        <PriceChip price={format.startingPrice} size="sm" />
      </div>
    </div>

    {/* Content Area */}
    <div className="flex flex-col flex-1 justify-between" style={{ padding: 'var(--space-sm) var(--space-sm) var(--space-sm) var(--space-sm)' }}>
      <div>
        {/* Title — bold, larger with --space-xs spacing below */}
        <h3 className="font-sans font-black text-[#11233B] text-lg lg:text-xl tracking-tight uppercase leading-tight group-hover:text-[#0A1A2C] transition-colors duration-300" style={{ marginBottom: 'var(--space-xs)' }}>
          {format.name}
        </h3>

        {/* One-line description — generous 1.5 line-height, --space-sm bottom margin */}
        <p className="text-xs text-[#52617A] font-light leading-relaxed line-clamp-2 h-10" style={{ marginBottom: 'var(--space-sm)' }}>
          {format.description}
        </p>

        {/* Tags as solid soft fill pills with --space-sm bottom margin */}
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 'var(--space-sm)' }}>
          {format.retailTypes.map((t) => (
            <RetailTag key={t} type={t} />
          ))}
        </div>
      </div>

      {/* Details Toggle Link */}
      <div className="border-t border-[#11233B]/10" style={{ paddingTop: 'var(--space-sm)' }}>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#52617A] hover:text-[#11233B] transition-colors cursor-pointer"
        >
          <span
            className="inline-block transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            +
          </span>
          {expanded ? 'Hide Specs' : 'View Specs'}
        </button>
      </div>
    </div>

    {/* Expandable specs drawer */}
    <div
      style={{
        maxHeight: expanded ? '300px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <SpecsDrawer format={format} index={index} />
    </div>
  </div>
);

// Compare table — full inventory, side-by-side spec comparison
const CompareTable = () => (
  <div className="overflow-x-auto border border-[#11233B]/10">
    <table className="w-full border-collapse text-left" style={{ minWidth: '760px' }}>
      <thead>
        <tr className="bg-[#0A1A2C]">
          {['Format', 'Starting Price', 'Visibility', 'Dimensions', 'Material', 'Target Retail'].map((col, i) => (
            <th
              key={col}
              className={`px-4 py-3 font-mono text-[9px] uppercase tracking-widest font-bold border-r border-[#F1EFE6]/10 last:border-r-0 ${
                i === 1 ? 'text-[#FFB300]' : 'text-[#F1EFE6]/60'
              }`}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ALL_FORMATS.map((f, i) => (
          <tr
            key={f.id}
            className="border-b border-[#11233B]/10 hover:bg-[#FFB300]/5 transition-colors group"
            style={{ background: i % 2 === 0 ? '#F1EFE6' : '#E7E5DB' }}
          >
            {/* Format name + thumbnail */}
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={f.imageUrl}
                  alt={f.name}
                  className="w-12 h-8 object-cover border border-[#11233B]/10 shrink-0"
                />
                <span className="font-sans font-black text-[#11233B] text-xs uppercase tracking-tight leading-tight">
                  {f.name}
                </span>
              </div>
            </td>
            {/* Price — amber chip */}
            <td className="px-4 py-3">
              <span className="bg-[#FFB300] text-[#0A1A2C] font-mono font-black px-2.5 py-1 text-xs uppercase tracking-wide inline-block">
                {f.startingPrice}
              </span>
            </td>
            {/* Visibility */}
            <td className="px-4 py-3 font-mono font-bold text-[#11233B] text-sm">
              {f.visibilityScore}
              <span className="text-[#52617A] font-normal text-[10px]">/10</span>
            </td>
            {/* Dimensions */}
            <td className="px-4 py-3 font-mono text-[10px] text-[#52617A]">{f.dimensions}</td>
            {/* Material */}
            <td className="px-4 py-3 text-xs text-[#52617A] font-light max-w-[160px]">{f.specs}</td>
            {/* Retail tags */}
            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-1">
                {f.retailTypes.map((t) => (
                  <RetailTag key={t} type={t} />
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
type ViewMode = 'grid' | 'compare';

const RetailAdFormats = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id="ad-formats"
      className="enterprise-section w-full bg-[#E7E5DB] border-t border-[#11233B]/10"
    >
      <div className="container-full">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-[64px]">
          <div className="max-w-2xl">
            <span className="os-label mb-4 block text-[#FFB300]">[ MEDIA INVENTORY ]</span>
            <h2 className="font-sans font-bold text-[#11233B] text-2xl lg:text-3xl tracking-tight leading-snug uppercase">
              Ad formats for every retail space.
            </h2>
            <p className="text-base text-[#52617A] font-light leading-relaxed mt-3">
              9 verified placement types. Every format tracked and reported in real time.
            </p>
          </div>

          {/* Grid / Compare toggle */}
          <div className="flex items-center shrink-0 border border-[#11233B]/15 self-start sm:self-end">
            <button
              id="view-toggle-grid"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#11233B] text-[#F1EFE6]'
                  : 'text-[#52617A] hover:text-[#11233B] hover:bg-[#11233B]/5'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="6" height="6" />
                <rect x="10" y="0" width="6" height="6" />
                <rect x="0" y="10" width="6" height="6" />
                <rect x="10" y="10" width="6" height="6" />
              </svg>
              Grid
            </button>
            <button
              id="view-toggle-compare"
              onClick={() => setViewMode('compare')}
              className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest font-bold border-l border-[#11233B]/15 transition-colors cursor-pointer ${
                viewMode === 'compare'
                  ? 'bg-[#11233B] text-[#F1EFE6]'
                  : 'text-[#52617A] hover:text-[#11233B] hover:bg-[#11233B]/5'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="1" width="16" height="2" />
                <rect x="0" y="6" width="16" height="2" />
                <rect x="0" y="11" width="16" height="2" />
              </svg>
              Compare
            </button>
          </div>
        </div>

        {/* ── Grid view ────────────────────────────────────────────── */}
        {viewMode === 'grid' && (
          <div>
            {/* FEATURED FORMATS — 2×2 landscape hero cards */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-px bg-[#FFB300]" />
              <span className="os-label-muted">Featured Formats</span>
              <div className="flex-1 h-px bg-[#11233B]/10" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#52617A]">04 / 09</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
              {HERO_FORMATS.map((format, i) => (
                <AdFormatCard
                  key={format.id}
                  format={format}
                  index={i}
                  expanded={expandedCards.has(format.id)}
                  onToggle={() => toggleCard(format.id)}
                />
              ))}
            </div>

            {/* ALL FORMATS — 3-col grid */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-px bg-[#11233B]/30" />
              <span className="os-label-muted">All Formats</span>
              <div className="flex-1 h-px bg-[#11233B]/10" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#52617A]">05 / 09</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPACT_FORMATS.map((format, i) => (
                <AdFormatCard
                  key={format.id}
                  format={format}
                  index={i + HERO_FORMATS.length}
                  expanded={expandedCards.has(format.id)}
                  onToggle={() => toggleCard(format.id)}
                />
              ))}

              {/* 6th Slot Placeholder CTA to balance the 3-column grid */}
              <div className="bg-[#F1EFE6] border border-[#11233B]/10 flex flex-col justify-between group min-h-[300px]">
                {/* 16:10 aspect ratio dark navy matching header banner container */}
                <div className="relative shrink-0 aspect-[16/10] bg-[#0A1A2C] flex items-center justify-center overflow-hidden">
                  {/* Subtle decorative grid background */}
                  <div className="absolute inset-0 opacity-15">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFB300" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#FFB300] bg-[#0A1A2C] px-2.5 py-1 border border-[#FFB300]/25 font-bold z-10">
                    CUSTOM SETUP
                  </span>
                </div>

                {/* Content Area styled exactly like AdFormatCard content */}
                <div className="flex flex-col flex-1 justify-between" style={{ padding: 'var(--space-sm)' }}>
                  <div>
                    {/* Title — bold, larger with --space-xs spacing below */}
                    <h3 className="font-sans font-black text-[#11233B] text-lg lg:text-xl tracking-tight uppercase leading-tight group-hover:text-[#0A1A2C] transition-colors duration-300" style={{ marginBottom: 'var(--space-xs)' }}>
                      Need a custom ad format?
                    </h3>
                    
                    {/* One-line description — generous 1.5 line-height, --space-sm bottom margin */}
                    <p className="text-xs text-[#52617A] font-light leading-relaxed line-clamp-2 h-10" style={{ marginBottom: 'var(--space-sm)' }}>
                      We design, manufacture, and install custom experiential setups, shelf endcaps, or non-standard banner dimensions.
                    </p>

                    {/* Empty placeholder pill layout area representing tags space */}
                    <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 'var(--space-sm)' }}>
                      <span className="inline-flex items-center bg-[#FFB300]/[0.08] px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider text-[#FFB300] font-bold leading-none">
                        Tailored Specs
                      </span>
                      <span className="inline-flex items-center bg-[#0A2540]/[0.08] px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider text-[#0A2540] font-bold leading-none">
                        On-Demand
                      </span>
                    </div>
                  </div>

                  {/* Action Link Details Toggle equivalent block */}
                  <div className="border-t border-[#11233B]/10" style={{ paddingTop: 'var(--space-sm)' }}>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-[#52617A] hover:text-[#11233B] transition-colors duration-200"
                    >
                      Talk to our Media Team →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Compare table view ───────────────────────────────────── */}
        {viewMode === 'compare' && (
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-6 h-px bg-[#FFB300]" />
              <span className="os-label-muted">Full Inventory Comparison</span>
              <div className="flex-1 h-px bg-[#11233B]/10" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#52617A]">09 FORMATS</span>
            </div>
            <CompareTable />
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#52617A] mt-4">
              * All prices are per store per month. Minimum campaign runs may apply. Contact for volume pricing.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default RetailAdFormats;
