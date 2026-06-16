'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Phone, ShieldCheck, User, Mail, Building2, CheckCircle2, RefreshCw } from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

interface PhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhoneAuthModal({ isOpen, onClose }: PhoneAuthModalProps) {
  const router = useRouter();
  const { refreshProfile } = useAuth();

  const [step, setStep] = useState<'phone' | 'otp' | 'profile' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', company: '' });
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('phone');
      setPhoneNumber('');
      setOtpCode('');
      setRegisterForm({ name: '', email: '', company: '' });
      setError('');
      setLoading(false);
      setCurrentUser(null);
      setConfirmationResult(null);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const initRecaptcha = () => {
    if (recaptchaVerifierRef.current) return recaptchaVerifierRef.current;
    try {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container-modal', {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => setError('reCAPTCHA expired. Please try again.'),
      });
      recaptchaVerifierRef.current = verifier;
      return verifier;
    } catch {
      return null;
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let formattedNumber = phoneNumber.trim();
    if (!formattedNumber.startsWith('+')) {
      if (formattedNumber.startsWith('0')) formattedNumber = formattedNumber.substring(1);
      formattedNumber = `+1${formattedNumber}`;
    }
    if (formattedNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }
    try {
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        setTimeout(() => { setStep('otp'); setLoading(false); }, 1000);
        return;
      }
      const verifier = initRecaptcha();
      if (!verifier) throw new Error('reCAPTCHA could not be initialized.');
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, verifier);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (otpCode.length !== 6) { setError('Enter the 6-digit code.'); setLoading(false); return; }
    try {
      let verifiedUser: any = null;
      if (!confirmationResult || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        verifiedUser = { uid: 'mock_uid_' + Math.random().toString(36).substring(7), phoneNumber: `+1${phoneNumber}` };
      } else {
        const result = await confirmationResult.confirm(otpCode);
        verifiedUser = result.user;
      }
      setCurrentUser(verifiedUser);
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const userDoc = await getDoc(doc(db, 'users', verifiedUser.uid));
        if (userDoc.exists()) {
          await refreshProfile();
          setStep('success');
          setTimeout(() => { onClose(); router.push('/dashboard'); }, 1500);
        } else {
          setStep('profile');
        }
      } else {
        setStep('profile');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!registerForm.name.trim() || !registerForm.email.trim()) {
      setError('Name and email are required.');
      setLoading(false);
      return;
    }
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && currentUser) {
        await setDoc(doc(db, 'users', currentUser.uid), {
          uid: currentUser.uid,
          email: registerForm.email.trim(),
          displayName: registerForm.name.trim(),
          companyName: registerForm.company.trim() || '',
          phoneNumber: currentUser.phoneNumber || '',
          role: 'brand_account',
          createdAt: new Date().toISOString(),
        });
        await refreshProfile();
      }
      setStep('success');
      setTimeout(() => { onClose(); router.push('/dashboard'); }, 1500);
    } catch (err: any) {
      setError('Failed to create profile. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Step meta for the right panel header
  const stepMeta = {
    phone:   { title: 'CONNECT YOUR BRAND',     sub: 'Enter your mobile number to receive a secure OTP.' },
    otp:     { title: 'VERIFY YOUR NUMBER',      sub: 'Enter the 6-digit code sent to your phone.' },
    profile: { title: 'SET UP YOUR WORKSPACE',   sub: 'Tell us a bit about yourself to complete onboarding.' },
    success: { title: 'ACCESS GRANTED',          sub: 'Redirecting you to your brand dashboard...' },
  };

  return (
    <div
      className="fixed inset-0 bg-obsidian text-dirty-white flex flex-col md:flex-row overflow-hidden selection:bg-amber selection:text-obsidian"
      style={{ zIndex: 99999 }}
    >
      {/* Invisible reCAPTCHA anchor */}
      <div id="recaptcha-container-modal" className="absolute pointer-events-none opacity-0" />

      {/* ── LEFT VISUAL PANEL ── */}
      <div className="hidden md:flex md:w-5/12 bg-[#0A0A0C] p-12 lg:p-20 flex-col justify-between relative overflow-hidden border-r border-white/5">

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Top: Close / Back */}
        <div className="relative z-20 flex flex-col gap-10">
          <button
            onClick={onClose}
            className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/40 hover:text-amber transition-colors mono uppercase font-bold w-fit"
          >
            <ArrowLeft size={14} /> Return to Site
          </button>
        </div>

        {/* Center: Hero Copy */}
        <div className="relative z-10 w-full mt-auto mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <img src="/icon_transparent.png" alt="AdMesh" className="w-9 h-9 object-contain mix-blend-lighten" />
              <span className="mono text-[18px] tracking-[0.25em] text-amber font-bold">ADMESH</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-dirty-white">
              GROW YOUR <span className="text-amber italic font-serif">BRAND.</span>
            </h1>
          </div>
          <p className="text-[13px] text-white/50 font-light max-w-xs tracking-wide leading-relaxed mt-6">
            Canada's premium retail media infrastructure. Reach verified storefronts with programmatic precision.
          </p>
        </div>

        {/* Bottom: Keyword Tags */}
        <div className="relative z-10 flex flex-wrap gap-4 text-[10px] font-bold tracking-[0.2em] uppercase mono">
          <span className="text-dirty-white/60">Hyperlocal</span>
          <span className="text-amber/30">/</span>
          <span className="text-dirty-white/60">Verified</span>
          <span className="text-amber/30">/</span>
          <span className="text-dirty-white/60">Programmatic</span>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-grow flex items-center justify-center p-8 md:p-16 relative bg-obsidian">

        {/* Mobile close */}
        <div className="absolute top-6 left-6 md:hidden z-30">
          <button onClick={onClose} className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-slate-400 hover:text-amber transition-colors mono uppercase font-bold">
            <ArrowLeft size={14} /> Back
          </button>
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Step Header */}
          <div className="mb-10">
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-amber/60 mb-3">
              {step === 'phone' ? '01 / IDENTIFY' : step === 'otp' ? '02 / VERIFY' : step === 'profile' ? '03 / ONBOARD' : '✓ COMPLETE'}
            </p>
            <h2 className="text-4xl font-black tracking-tight text-dirty-white mb-3">{stepMeta[step].title}</h2>
            <p className="text-slate-500 font-light text-sm">{stepMeta[step].sub}</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 mb-6 text-[11px] mono uppercase tracking-wider rounded-xl">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* PHONE STEP */}
            {step === 'phone' && (
              <motion.form key="phone" onSubmit={handleSendOTP} className="space-y-8">
                <div className="space-y-3 group">
                  <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center w-full h-16 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-amber/50 transition-colors">
                    <span className="absolute left-4 mono text-sm font-bold text-amber/80 select-none">+1</span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      required
                      maxLength={10}
                      className="w-full h-full py-4 pl-14 pr-4 bg-transparent text-sm placeholder:text-slate-400 text-slate-900 font-bold tracking-widest outline-none"
                      placeholder="416 555 0199"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length < 10}
                  className="btn-molten group w-full h-14 text-[13px] tracking-[0.15em] mt-4 flex justify-between items-center px-8 relative overflow-hidden disabled:opacity-40"
                >
                  <span className="relative z-10">{loading ? 'SENDING CODE...' : 'SEND OTP'}</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </motion.form>
            )}

            {/* OTP STEP */}
            {step === 'otp' && (
              <motion.form key="otp" onSubmit={handleVerifyOTP} className="space-y-8">
                <div className="space-y-3 group">
                  <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    required
                    maxLength={6}
                    className="w-full py-4 px-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl font-black tracking-[0.5em] text-slate-900 placeholder:text-slate-400 placeholder:tracking-widest focus:border-amber/50 outline-none"
                    placeholder="000000"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || otpCode.length !== 6}
                  className="btn-molten group w-full h-14 text-[13px] tracking-[0.15em] flex justify-between items-center px-8 relative overflow-hidden disabled:opacity-40"
                >
                  <span className="relative z-10">{loading ? 'VERIFYING...' : 'CONFIRM CODE'}</span>
                  <ShieldCheck size={16} className="relative z-10" />
                </button>

                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex items-center gap-2 text-[10px] mono text-slate-400 hover:text-amber uppercase tracking-wider transition-colors mx-auto"
                >
                  <RefreshCw size={10} /> Change Number
                </button>
              </motion.form>
            )}

            {/* PROFILE STEP */}
            {step === 'profile' && (
              <motion.form key="profile" onSubmit={handleRegisterProfile} className="space-y-6">
                <div className="space-y-3 group">
                  <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Full Name *</label>
                  <div className="relative flex items-center h-14 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-amber/50 transition-colors">
                    <User className="absolute left-4 text-slate-400 group-focus-within:text-amber transition-colors" size={14} />
                    <input
                      type="text"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      required
                      className="w-full h-full pl-11 pr-4 bg-transparent text-sm placeholder:text-slate-400 text-slate-900 outline-none"
                      placeholder="e.g. Alex Tremblay"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Work Email *</label>
                  <div className="relative flex items-center h-14 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-amber/50 transition-colors">
                    <Mail className="absolute left-4 text-slate-400 group-focus-within:text-amber transition-colors" size={14} />
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                      className="w-full h-full pl-11 pr-4 bg-transparent text-sm placeholder:text-slate-400 text-slate-900 outline-none"
                      placeholder="alex@company.ca"
                    />
                  </div>
                </div>

                <div className="space-y-3 group">
                  <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Company Name <span className="text-slate-400 normal-case tracking-normal">(optional)</span></label>
                  <div className="relative flex items-center h-14 rounded-xl border border-slate-200 bg-slate-50 focus-within:border-amber/50 transition-colors">
                    <Building2 className="absolute left-4 text-slate-400 group-focus-within:text-amber transition-colors" size={14} />
                    <input
                      type="text"
                      value={registerForm.company}
                      onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })}
                      className="w-full h-full pl-11 pr-4 bg-transparent text-sm placeholder:text-slate-400 text-slate-900 outline-none"
                      placeholder="e.g. Shopify Inc."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !registerForm.name.trim() || !registerForm.email.trim()}
                  className="btn-molten group w-full h-14 text-[13px] tracking-[0.15em] mt-2 flex justify-between items-center px-8 relative overflow-hidden disabled:opacity-40"
                >
                  <span className="relative z-10">{loading ? 'SETTING UP...' : 'COMPLETE SETUP'}</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </motion.form>
            )}

            {/* SUCCESS STEP */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-signal-green/10 border border-signal-green/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} className="text-signal-green" />
                </div>
                <div>
                  <p className="mono text-[10px] uppercase tracking-[0.3em] text-signal-green mb-2">Session Active</p>
                  <h3 className="text-3xl font-black tracking-tight text-dirty-white">You're In.</h3>
                  <p className="text-slate-500 text-sm mt-2 font-light">Taking you to your brand dashboard...</p>
                </div>
                <div className="flex justify-center pt-2">
                  <div className="w-6 h-6 rounded-full border-2 border-amber border-t-transparent animate-spin" />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
