'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Map as MapIcon,
  Download,
  Zap,
  Target,
} from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="db-page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="db-heading">Analytics & Insights</h1>
          <p className="text-muted-foreground">Deep dive into your campaign performance and reach metrics.</p>
        </div>
        <button className="db-btn-primary flex items-center gap-2">
          <Download size={18} /> Export Report
        </button>
      </div>

      <div className="relative overflow-hidden db-card p-8 lg:p-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,rgba(201,115,32,0.25),transparent_70%)] opacity-60 blur-[90px]" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Total Impressions</p>
            <h2 className="text-6xl font-black mb-2">2.4M</h2>
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <TrendingUp size={20} /> +24% from last month
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="h-24 flex items-end gap-2 mb-4">
              {[40, 60, 45, 90, 65, 80, 100].map((h, i) => (
                <div key={i} className="flex-grow bg-amber-500/30 rounded-t-lg transition-all hover:bg-amber-500/70" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="text-slate-400 text-sm font-medium">Daily Engagement Growth</p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs text-slate-400 font-bold mb-1 uppercase">Average CPC</p>
              <p className="text-2xl font-bold">$0.12</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs text-slate-400 font-bold mb-1 uppercase">Store Coverage</p>
              <p className="text-2xl font-bold">1,284 <span className="text-sm font-normal text-slate-400">stores</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="db-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MapIcon className="db-accent" size={20} /> Geographic Reach
            </h2>
            <select className="db-input border-0 rounded-lg text-sm font-bold p-2 max-w-[140px]">
              <option>Top Cities</option>
              <option>By State</option>
            </select>
          </div>

          <div className="space-y-6">
            {[
              { city: 'Mumbai', percentage: 35, count: 422 },
              { city: 'Delhi NCR', percentage: 25, count: 310 },
              { city: 'Bangalore', percentage: 15, count: 185 },
              { city: 'Hyderabad', percentage: 12, count: 148 },
              { city: 'Chennai', percentage: 13, count: 219 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{item.city}</span>
                  <span className="text-muted-foreground">{item.count} stores - {item.percentage}%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="db-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="db-accent" size={20} /> Store Type Distribution
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="#FF5C00" strokeWidth="32" fill="transparent" strokeDasharray="502.6" strokeDashoffset="150" />
                <circle cx="96" cy="96" r="80" stroke="#121212" strokeWidth="32" fill="transparent" strokeDasharray="502.6" strokeDashoffset="350" />
                <circle cx="96" cy="96" r="80" stroke="#F1F5F9" strokeWidth="32" fill="transparent" strokeDasharray="502.6" strokeDashoffset="450" />
              </svg>
            </div>

            <div className="flex-grow space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm font-bold">Kirana Stores</span>
                </div>
                <span className="font-bold">62%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-300" />
                  <span className="text-sm font-bold">Pharmacies</span>
                </div>
                <span className="font-bold">24%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="text-sm font-bold">Other Retail</span>
                </div>
                <span className="font-bold">14%</span>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-4 db-accent">
              <Zap size={20} />
              <h4 className="font-bold">Optimization Tip</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your campaigns in <strong>Kirana Stores</strong> have 15% higher engagement compared to other formats. We recommend shifting 10% of your budget to this category for next month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
