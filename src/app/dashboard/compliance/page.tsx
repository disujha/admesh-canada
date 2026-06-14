'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { motion } from 'framer-motion';
import {
  FileCheck,
  MapPin,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
} from 'lucide-react';

type ComplianceLog = {
  id: string;
  status?: string;
  offerTitle?: string;
  retailerName?: string;
  locationName?: string;
  timestamp?: { seconds?: number };
  photoUrls?: string[];
  verifiedBy?: string;
  verificationType?: string;
};

const ComplianceView = () => {
  const { profile, user } = useAuth();
  const [logs, setLogs] = useState<ComplianceLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const brandId = profile?.brandId || user?.uid;
      if (!brandId) return;

      try {
        const q = query(
          collection(db, 'compliance_logs'),
          where('brandId', '==', brandId),
          orderBy('timestamp', 'desc'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const fetchedLogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ComplianceLog[];
        setLogs(fetchedLogs);
      } catch (error) {
        console.error('Error fetching compliance logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [profile, user]);

  return (
    <div className="db-page">
      <div>
        <h1 className="db-heading">Compliance & Proof</h1>
        <p className="text-muted-foreground">Monitor real-time verification logs and proof images for your campaigns.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="db-card p-8">
            <h2 className="text-xl font-bold mb-6">Live Verification Feed</h2>

            {loading ? (
              <div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>
            ) : logs.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <FileCheck size={48} className="mx-auto mb-4 opacity-10" />
                <p>No compliance logs available yet.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {logs.map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-6 pb-8 border-b border-white/5 last:border-0"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        log.status === 'verified' ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-300'
                      }`}>
                        {log.status === 'verified' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                      </div>
                    </div>
                    <div className="flex-grow space-y-4">
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-lg">{log.offerTitle || 'Campaign Update'}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <MapPin size={14} /> {log.retailerName} - {log.locationName}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar size={14} /> {log.timestamp?.seconds ? new Date(log.timestamp.seconds * 1000).toLocaleString() : 'N/A'}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {log.photoUrls?.map((url: string, idx: number) => (
                          <div key={idx} className="aspect-square bg-[#17181B] rounded-2xl overflow-hidden relative group cursor-pointer">
                            <img src={url} alt="Proof" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye className="text-white" size={24} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-bold">
                        <div className="flex items-center gap-1 text-slate-500">
                          <User size={14} /> Verified by: {log.verifiedBy || 'System AI'}
                        </div>
                        <div className={`px-2 py-0.5 rounded-md ${
                          log.verificationType === 'agent' ? 'bg-amber-500/15 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {log.verificationType?.toUpperCase() || 'SELF'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="db-card p-8">
            <h2 className="text-xl font-bold mb-6">Compliance Health</h2>

            <div className="flex flex-col items-center py-6">
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/10" />
                  <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="502.6" strokeDashoffset={502.6 * (1 - 0.942)} className="text-amber-400" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black">94.2%</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Average Rate</span>
                </div>
              </div>

              <div className="w-full space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-400" size={20} />
                    <span className="font-semibold text-sm">Verified Placements</span>
                  </div>
                  <span className="font-bold">1,120</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-amber-300" size={20} />
                    <span className="font-semibold text-sm">Pending Verification</span>
                  </div>
                  <span className="font-bold">164</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-red-400" size={20} />
                    <span className="font-semibold text-sm">Non-Compliant</span>
                  </div>
                  <span className="font-bold">42</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceView;
