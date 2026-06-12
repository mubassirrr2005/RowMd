"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut as firebaseSignOut
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { initializeFirebase, getFirebaseServices } from "@/lib/firebase";

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  plan: "free" | "pro";
  dailyConversions: number;
  monthlyConversions: number;
  lastConversionDate: any;
  createdAt: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  isFirebaseInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const response = await fetch("/api/firebase-config");
        const config = await response.json();
        
        if (config.apiKey && config.apiKey !== "your-api-key") {
          initializeFirebase(config);
          setIsFirebaseInitialized(true);
        } else {
          console.warn("Firebase not configured properly yet.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch Firebase config:", error);
        setLoading(false);
      }
    };

    initApp();
  }, []);

  useEffect(() => {
    if (!isFirebaseInitialized) return;

    const { auth, db } = getFirebaseServices();

    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && db) {
        // Fetch or create user profile in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            plan: "free",
            dailyConversions: 0,
            monthlyConversions: 0,
            lastConversionDate: null,
            createdAt: serverTimestamp(),
          };
          await setDoc(userDocRef, newProfile);
          setProfile(newProfile);
        } else {
          setProfile(userDoc.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isFirebaseInitialized]);

  const signInWithGoogle = async () => {
    const { auth } = getFirebaseServices();
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithGithub = async () => {
    const { auth } = getFirebaseServices();
    if (!auth) return;
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    const { auth } = getFirebaseServices();
    if (!auth) return;
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signInWithGithub, logout, isFirebaseInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
