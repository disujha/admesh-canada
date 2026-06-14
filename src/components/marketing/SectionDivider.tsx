import React from 'react';
import Icosahedron from './Icosahedron';

const SectionDivider = () => {
  return (
    <div className="relative w-full h-[1px] flex items-center justify-between my-24 overflow-hidden px-8 lg:px-24">
      <div className="absolute inset-0 bg-white/5 opacity-30" />
      <div className="mono text-[8px] text-white/20 uppercase tracking-[0.5em] hidden lg:block">Grid_Status // NOMINAL</div>
      <div className="relative flex items-center gap-6">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber/30" />
        <Icosahedron className="w-4 h-4 text-amber opacity-40 animate-spin-slow" />
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber/30" />
      </div>
      <div className="mono text-[8px] text-white/20 uppercase tracking-[0.5em] hidden lg:block">LAT_28.61 // LONG_77.20</div>
    </div>
  );
};

export default SectionDivider;
