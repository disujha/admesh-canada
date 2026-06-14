'use client';

import React from 'react';

const Ticker = () => {
  const launches = [
    "AdMesh launched 500+ nodes in Mumbai · 4 min ago",
    "Digital Grid activated in Bengaluru · 12 min ago",
    "New Retail Partner added in Delhi NCR · 24 min ago",
    "Verification Agent synced in Hyderabad · 32 min ago",
    "Campaign Live across 200 stores in Pune · 45 min ago",
  ];

  return (
    <div className="ticker-container border-t border-white-5 mt-24">
      <div className="ticker-content mono text-[13px] text-dirty-white opacity-40 py-4" style={{ animationDuration: '40s' }}>
        {[...launches, ...launches, ...launches].map((text, i) => (
          <span key={i} className="mx-16">{text}</span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
