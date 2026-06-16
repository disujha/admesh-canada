'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, X } from 'lucide-react';

interface EarningCard {
  id: string;
  name: string;
  earningPotential: string;
  bestStoreType: string;
  visibilityCategory: string;
  benefit: string;
  colorClass: string;
}

const CARDS: EarningCard[] = [
  {
    id: 'stickers',
    name: 'Counter Stickers',
    earningPotential: '$35 - $60 / mo',
    bestStoreType: 'Convenience • Pharmacy • Cafe',
    visibilityCategory: 'Standard High-Frequency',
    benefit: 'Perfect for quick, zero-footprint monetization near billing cash counters.',
    colorClass: 'from-blue-600/10 to-transparent'
  },
  {
    id: 'banners',
    name: 'Flex Banners',
    earningPotential: '$75 - $125 / mo',
    bestStoreType: 'Corner Store • Cafe • Grocery',
    visibilityCategory: 'Premium Street-Facing',
    benefit: 'Monetize outer walls or overhead storefront headers with weatherproof branding.',
    colorClass: 'from-emerald-600/10 to-transparent'
  },
  {
    id: 'displays',
    name: 'Digital Displays',
    earningPotential: '$150 - $350 / mo',
    bestStoreType: 'Cafe • Pharmacy • Supermarket',
    visibilityCategory: 'Ultra Dynamic Video',
    benefit: 'Host a plug-and-play smart screen casting dynamic daily ads. Zero retail effort.',
    colorClass: 'from-blue-500/10 to-transparent'
  },
  {
    id: 'branding',
    name: 'Store Takeover',
    earningPotential: '$400 - $800 / mo',
    bestStoreType: 'Convenience Chains • Supermarkets',
    visibilityCategory: 'Dominant Takeover Network',
    benefit: 'Maximum payout. Branded wrapping including shutters, signs, counters, and stickers.',
    colorClass: 'from-purple-500/10 to-transparent'
  }
];

const RetailerEarnings = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [storeForm, setStoreForm] = useState({
    ownerName: '',
    phone: '',
    storeName: '',
    city: '',
    area: ''
  });

  const submitStoreForm = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Store registration request submitted. Our partner team will contact you shortly.');
    setIsRegisterOpen(false);
    setStoreForm({ ownerName: '', phone: '', storeName: '', city: '', area: '' });
  };

  return (
    <section id="retailer-earnings" className="relative py-32 bg-white overflow-hidden border-t border-slate-200">
      {/* Background glow dynamics */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

      <div className="container-full relative z-10">
        
        {/* Section Header */}
        <div className="max-w-5xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-blue-600/40" />
            <span className="mono text-blue-600 text-[11px] tracking-[0.5em] uppercase font-bold" style={{ fontFamily: 'var(--font-departure)' }}>
              14 // PARTNER NETWORK SUPPLY
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tighter leading-[0.95] uppercase mb-8">
            Retailers Earn From <br />
            <span className="italic font-serif text-blue-600 text-glow">Unused Store Visibility.</span>
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed font-light max-w-3xl">
            Turn your empty counter space, storefront banner rails, or shop windows into direct monthly passive payouts.
          </p>
        </div>

        {/* Premium Earning Cards 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch mb-20">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative group rounded-[18px] bg-slate-50/70 border border-slate-200/80 p-7 lg:p-8 min-h-[360px] flex flex-col overflow-hidden backdrop-blur-xl hover:border-blue-600/30 hover:bg-white transition-all duration-500 hover:shadow-sm cursor-pointer"
            >
              {/* Card ambient corner backglow */}
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${card.colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                
                {/* Visibility Tag & ID */}
                <div className="flex justify-between items-center mb-5">
                  <span className="mono text-[9px] text-blue-600 uppercase tracking-[0.25em] bg-blue-50 px-3 py-1 rounded border border-blue-100/50 font-bold">
                    {card.visibilityCategory}
                  </span>
                  <span className="text-[11px] mono text-slate-400 font-bold">#{i + 1}</span>
                </div>

                {/* Card Title */}
                <h3 className="text-[2rem] leading-none font-black text-slate-800 tracking-tight uppercase group-hover:text-blue-600 transition-colors duration-300 mb-4">
                  {card.name}
                </h3>

                {/* Target Store Tags */}
                <p className="text-xs mono text-slate-400 uppercase tracking-[0.2em] mb-5">
                  Best For: {card.bestStoreType}
                </p>

                {/* Passive Benefit Detail */}
                <p className="text-sm text-slate-600 leading-relaxed font-light font-sans">
                  {card.benefit}
                </p>

              </div>

              {/* Monthly Potential Payout */}
              <div className="border-t border-slate-200 pt-5 mt-7">
                <span className="text-[10px] mono text-slate-400 block uppercase tracking-[0.2em] mb-2">Earning Potential</span>
                <div className="text-[1.65rem] font-black text-blue-600 mono tracking-tight leading-none">
                  {card.earningPotential}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Partner Onboarding Panel */}
        <div className="relative rounded-[18px] overflow-hidden bg-slate-50 border border-slate-200 p-8 lg:p-11 shadow-sm">
          <div className="absolute inset-0 bg-glowing-grid opacity-[0.02] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Steps text */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-3">
                <span className="text-[10px] mono text-blue-600 font-bold uppercase tracking-widest block">Partner Onboarding Pipeline</span>
                <h4 className="text-3xl lg:text-[2.1rem] leading-tight font-bold text-slate-800 uppercase">Register and start earning in 3 steps</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans">
                {[
                  { num: '01', title: 'Register Shop', desc: 'Submit your store details and location profile.' },
                  { num: '02', title: 'Installation', desc: 'AdMesh partner team deploys and sets up visual/digital slots.' },
                  { num: '03', title: 'Direct Payouts', desc: 'Payments verified by photo logs and sent via Interac/Direct Deposit.' }
                ].map((step, idx) => (
                  <div key={idx} className="space-y-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                    <div className="flex items-center gap-2 text-blue-600 mono text-[11px] font-bold tracking-[0.12em]">
                      <span className="w-6 h-6 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px]">{step.num}</span>
                      {step.title}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className="w-full btn-molten h-[60px] flex items-center justify-center gap-3 bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 cursor-pointer"
              >
                <span>Register Store</span>
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] mono text-slate-400 uppercase tracking-[0.2em] font-bold">
                <Wallet size={10} className="text-blue-600" /> Direct Deposit / Interac e-Transfer monthly • 100% Free Setup
              </div>
            </div>

          </div>
        </div>

        {isRegisterOpen && (
          <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-2xl p-7 sm:p-10 relative">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                aria-label="Close register store modal"
              >
                <X size={18} />
              </button>

              <p className="mono text-[11px] text-blue-600 uppercase tracking-[0.35em] mb-3 font-bold">Partner Registration</p>
              <h5 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight mb-8">Register Your Store</h5>

              <form className="flex flex-col gap-6" onSubmit={submitStoreForm}>
                <div className="flex flex-col sm:flex-row gap-5">
                  <input
                    required
                    value={storeForm.ownerName}
                    onChange={(e) => setStoreForm((prev) => ({ ...prev, ownerName: e.target.value }))}
                    placeholder="Owner Name"
                    className="w-full sm:w-1/2 h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 text-base text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                    style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                  />
                  <input
                    required
                    value={storeForm.phone}
                    onChange={(e) => setStoreForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Phone Number"
                    className="w-full sm:w-1/2 h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 text-base text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                    style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                  />
                </div>

                <input
                  required
                  value={storeForm.storeName}
                  onChange={(e) => setStoreForm((prev) => ({ ...prev, storeName: e.target.value }))}
                  placeholder="Store Name"
                  className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 text-base text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                  style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                />

                <div className="flex flex-col sm:flex-row gap-5">
                  <input
                    required
                    value={storeForm.city}
                    onChange={(e) => setStoreForm((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    className="w-full sm:w-1/2 h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 text-base text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                    style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                  />
                  <input
                    required
                    value={storeForm.area}
                    onChange={(e) => setStoreForm((prev) => ({ ...prev, area: e.target.value }))}
                    placeholder="Neighborhood / Postal Code"
                    className="w-full sm:w-1/2 h-14 bg-slate-50 border border-slate-200 rounded-xl px-5 text-base text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                    style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                  />
                </div>

                <button type="submit" className="w-full btn-molten h-[62px] text-base font-bold uppercase tracking-[0.2em] cursor-pointer">
                  Submit Registration
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default RetailerEarnings;
