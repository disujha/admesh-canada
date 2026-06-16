'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'brand_account' | 'admin' | 'retailer';
  brandId?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth || !auth.app) {
      console.warn("Firebase Auth is not initialized. Please configure NEXT_PUBLIC_FIREBASE_API_KEY.");
      setLoading(false);
      if (pathname.startsWith('/dashboard')) {
        router.push('/login');
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        if (db && db.app) {
          // Fetch user profile for role-based access
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as UserProfile;
              setProfile(userData);

              // If on dashboard and not a brand, redirect or handle accordingly
              if (pathname.startsWith('/dashboard') && userData.role !== 'brand_account') {
                router.push('/');
              }
            } else {
              // If profile doesn't exist, might be a new user or handled during signup
              setProfile(null);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
      } else {
        setProfile(null);
        if (pathname.startsWith('/dashboard')) {
          router.push('/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const loginWithGoogle = async () => {
    if (!auth || !auth.app) {
      console.error("Firebase Auth is not initialized.");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const logout = async () => {
    if (!auth || !auth.app) {
      console.error("Firebase Auth is not initialized.");
      return;
    }
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const refreshProfile = async () => {
    if (!auth || !auth.app || !db || !db.app) return;
    if (auth.currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        }
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginWithGoogle, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
