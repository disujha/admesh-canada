'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, ShieldCheck, User, Mail, Building2, CheckCircle2, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const LoginPage = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', company: '' });
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useAuth();
  const router = useRouter();
  const getErrorMessage = (err: unknown, fallback: string) => {
    if (err instanceof Error && err.message) return err.message;
    return fallback;
  };

  const initRecaptcha = () => {
    if (typeof window === 'undefined') return null;
    const recaptchaWindow = window as Window & { recaptchaVerifier?: RecaptchaVerifier };
    const existingVerifier = recaptchaWindow.recaptchaVerifier;
    if (existingVerifier) return existingVerifier;
    try {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container-login', {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => setError('reCAPTCHA expired. Please try again.'),
      });
      recaptchaWindow.recaptchaVerifier = verifier;
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
      formattedNumber = `+91${formattedNumber}`;
    }
    if (formattedNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }
    try {
      const verifier = initRecaptcha();
      if (!verifier) throw new Error('reCAPTCHA could not be initialized.');
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, verifier);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to send OTP. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (otpCode.length !== 6) {
      setError('Enter the 6-digit code.');
      setLoading(false);
      return;
    }
    try {
      if (!confirmationResult) throw new Error('Please request a new OTP and try again.');
      const result = await confirmationResult.confirm(otpCode);
      const verifiedUser = result.user;
      setCurrentUser(verifiedUser);

      const userDoc = await getDoc(doc(db, 'users', verifiedUser.uid));
      if (userDoc.exists()) {
        await refreshProfile();
        setStep('success');
        setTimeout(() => router.push('/dashboard'), 1200);
      } else {
        setStep('profile');
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Verification failed. Check the code and try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!registerForm.name.trim() || !registerForm.email.trim() || !registerForm.company.trim()) {
      setError('Name, work email, and organization are required.');
      setLoading(false);
      return;
    }
    try {
      if (!currentUser) throw new Error('Session expired. Please verify OTP again.');
      await setDoc(doc(db, 'users', currentUser.uid), {
        uid: currentUser.uid,
        email: registerForm.email.trim(),
        displayName: registerForm.name.trim(),
        companyName: registerForm.company.trim(),
        phoneNumber: currentUser.phoneNumber || '',
        role: 'brand_account',
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await refreshProfile();
      setStep('success');
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Failed to create profile. Please retry.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-dirty-white flex flex-col md:flex-row overflow-hidden selection:bg-amber selection:text-obsidian">
      <div className="hidden md:flex md:w-1/2 bg-obsidian-odd p-12 lg:p-20 flex-col justify-between relative overflow-hidden border-r border-white-5" style={{ paddingLeft: '5rem' }}>
        <div className="relative z-20 w-full flex flex-col gap-10">
          <Link href="/" className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-[rgba(240,237,230,0.4)] hover:text-[#C97320] transition-colors mono uppercase font-bold w-fit relative z-30">
            <ArrowLeft size={14} /> RETURN TO GRID
          </Link>
        </div>

        <div className="relative z-10 w-full mt-auto mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <img src="/icon_transparent.png" alt="AdMesh Logo" className="object-contain mix-blend-lighten" style={{ width: '42px', height: '42px' }} />
              <span className="mono text-[22px] tracking-[0.2em] text-amber leading-none font-bold">ADMESH</span>
            </div>
            <h1 className="hero-title text-[49px] lg:text-[61px] leading-[0.95] tracking-tight m-0">
              MANAGE YOUR <br />
              <span className="text-amber italic">CAMPAIGNS.</span>
            </h1>
          </div>

          <p className="text-[13px] lg:text-[15px] text-[rgba(240,237,230,0.6)] font-light max-w-sm tracking-wide leading-relaxed mt-8">Sign in once with phone OTP. New users complete onboarding in the same flow.</p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-6 text-[10px] font-bold tracking-[0.2em] uppercase mono">
          <span className="animate-word-fade-1 text-dirty-white">OTP</span>
          <span className="text-[#C97320]/40">/</span>
          <span className="animate-word-fade-2 text-dirty-white">Profile</span>
          <span className="text-[#C97320]/40">/</span>
          <span className="animate-word-fade-3 text-dirty-white">Dashboard</span>
        </div>
      </div>

      <div className="flex-grow md:flex-none md:w-1/2 flex items-center justify-center p-8 md:p-24 relative bg-obsidian">
        <div className="absolute top-8 left-8 md:hidden z-30">
          <Link href="/" className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-[rgba(240,237,230,0.4)] hover:text-amber transition-colors mono uppercase font-bold w-fit">
            <ArrowLeft size={14} /> BACK
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
          <div id="recaptcha-container-login" className="absolute pointer-events-none opacity-0" />
          <div className="mb-12">
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-amber/60 mb-3">
              {step === 'phone' ? '01 / IDENTIFY' : step === 'otp' ? '02 / VERIFY' : step === 'profile' ? '03 / ONBOARD' : 'COMPLETE'}
            </p>
            <h2 className="section-title text-4xl mb-4">
              {step === 'phone' ? 'SIGN IN WITH OTP' : step === 'otp' ? 'VERIFY CODE' : step === 'profile' ? 'COMPLETE PROFILE' : 'ACCESS GRANTED'}
            </h2>
            <p className="text-slate-500 font-light">
              {step === 'phone' ? 'Enter your phone number to get OTP.' : step === 'otp' ? 'Enter the 6-digit code sent to your phone.' : step === 'profile' ? 'New account detected. Add details to continue.' : 'Redirecting to dashboard...'}
            </p>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 mb-6 text-xs font-bold">{error}</div>}

          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-8">
              <div className="space-y-3 group">
                <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Mobile Number</label>
                <div className="flex items-center h-20 rounded-xl border border-white/10 bg-[#111114] focus-within:border-amber/50 transition-colors">
                  <span className="mono text-base font-bold text-amber/80 select-none px-4 h-full flex items-center border-r border-white/10">+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    required
                    maxLength={10}
                    className="w-full h-full px-4 bg-transparent text-dirty-white text-base placeholder:text-white/20 font-bold tracking-widest outline-none"
                    placeholder="98765 43210"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading || phoneNumber.length < 10} className="btn-molten group w-full h-64 text-[15px] tracking-[0.15em] mt-8 flex justify-between items-center px-8 relative overflow-hidden disabled:opacity-40">
                <span className="relative z-10">{loading ? 'SENDING CODE...' : 'SEND OTP'}</span>
                <ArrowRight size={20} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent -translate-x-full group-hover:animate-shimmer z-0" />
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-8">
              <div className="space-y-3 group">
                <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Verification Code</label>
                <input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))} required maxLength={6} className="w-full py-4 px-4 input-molten text-center text-2xl font-black tracking-[0.5em] placeholder:text-white/20 placeholder:tracking-widest" placeholder="000000" />
              </div>

              <button type="submit" disabled={loading || otpCode.length !== 6} className="btn-molten group w-full h-64 text-[15px] tracking-[0.15em] mt-8 flex justify-between items-center px-8 relative overflow-hidden disabled:opacity-40">
                <span className="relative z-10">{loading ? 'VERIFYING...' : 'CONFIRM CODE'}</span>
                <ShieldCheck size={20} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent -translate-x-full group-hover:animate-shimmer z-0" />
              </button>

              <button type="button" onClick={() => { setStep('phone'); setOtpCode(''); }} className="flex items-center gap-2 text-[10px] mono text-white/30 hover:text-amber uppercase tracking-wider transition-colors mx-auto">
                <RefreshCw size={10} /> Change Number
              </button>
            </form>
          )}

          {step === 'profile' && (
            <form onSubmit={handleRegisterProfile} className="space-y-6">
              <div className="space-y-3 group">
                <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber transition-colors" size={14} />
                  <input type="text" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} required className="w-full py-4 pl-11 pr-4 input-molten text-sm placeholder:text-white/20" placeholder="e.g. Rahul Sharma" />
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Work Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber transition-colors" size={14} />
                  <input type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} required className="w-full py-4 pl-11 pr-4 input-molten text-sm placeholder:text-white/20" placeholder="name@company.com" />
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="mono text-[10px] uppercase tracking-[0.2em] text-amber opacity-60 group-focus-within:opacity-100 transition-opacity block">Organization *</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-amber transition-colors" size={14} />
                  <input type="text" value={registerForm.company} onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })} required className="w-full py-4 pl-11 pr-4 input-molten text-sm placeholder:text-white/20" placeholder="e.g. Acme Brands Ltd." />
                </div>
              </div>

              <button type="submit" disabled={loading || !registerForm.name.trim() || !registerForm.email.trim() || !registerForm.company.trim()} className="btn-molten group w-full h-64 text-[15px] tracking-[0.15em] mt-8 flex justify-between items-center px-8 relative overflow-hidden disabled:opacity-40">
                <span className="relative z-10">{loading ? 'SETTING UP...' : 'COMPLETE SETUP'}</span>
                <ArrowRight size={20} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent -translate-x-full group-hover:animate-shimmer z-0" />
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-signal-green/10 border border-signal-green/20 flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} className="text-signal-green" />
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight text-dirty-white">You&apos;re In.</h3>
                <p className="text-white/40 text-sm mt-2 font-light">Taking you to your dashboard...</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
