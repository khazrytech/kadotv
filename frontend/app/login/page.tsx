'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Import hizi kutoka kwenye Firebase SDK
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Firebase Configuration yako
const firebaseConfig = {
  apiKey: "AIzaSyBYtV4TrOuq1EvsYPvA9r0rPN4sXvx8dtQ",
  authDomain: "kadotv-6a6a6.firebaseapp.com",
  projectId: "kadotv-6a6a6",
  storageBucket: "kadotv-6a6a6.appspot.com",
  messagingSenderId: "721335767307",
  appId: "1:721335767307:web:275a701df864e266f0120e"
//};

//const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
//const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Kazi ya Google Login
//  const handleGoogleLogin = async () => {
 //   setLoading(true);
  //  try {
    //  const result = await signInWithPopup(auth, provider);
    //  console.log("Karibu:", result.user.displayName);
     // router.push('/');
  //  } catch (err: any) {
     // setError('Google login imeshindikana. Jaribu tena.');
  //  } finally {
    //  setLoading(false);
    //}
//  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // ... (Kodi yako ya awali ya Email/Password ibaki hapa)
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] px-4 text-white relative overflow-hidden">
      {/* ... [Glow effects zako zibaki vilevile] */}
      
      <div className="w-full max-w-5xl grid md:grid-cols-12 gap-8 items-center z-10">
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Login to your elite streaming universe</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
             {/* ... [Email & Password Fields zako] */}
            
            <button type="submit" className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 font-bold hover:opacity-90 transition">
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </form>

          {/* Umeboreshwa: Social Logins */}
          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500 transition-all text-center text-sm font-semibold"
            >
              Continue with Google
            </button>
            {/* ... [Vitufe vingine] */}
          </div>
        </div>

        {/* ... [Upande wa Kulia uliokua nao] */}
      </div>
    </main>
  );
}
