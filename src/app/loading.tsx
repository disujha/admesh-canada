export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute w-[360px] h-[360px] bg-amber/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="octa-loader" aria-label="Loading">
          <div className="octa-ring octa-ring-outer" />
          <div className="octa-ring octa-ring-mid" />
          <div className="octa-ring octa-ring-inner" />
          <div className="octa-core" />
        </div>
        <span className="mono text-[11px] tracking-[0.35em] text-amber/80 uppercase">Loading Grid</span>
      </div>
    </div>
  );
}

