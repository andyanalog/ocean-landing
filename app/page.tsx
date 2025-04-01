'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app//components/Hero';
import Features from '@/app//components/Features';
import RealisticOcean from '@/app/components/RealisticOcean';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ocean Animation Background */}
      {isMounted && <RealisticOcean />}
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
      </div>
    </main>
  );
}