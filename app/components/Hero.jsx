import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center px-6 md:px-10 lg:px-16 py-20 z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Dive Into The Sound
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10">
          Experience the power of innovation with our cutting-edge solutions 
          that transform the digital sound landscape.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/" 
            className="bg-white text-blue-800 px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-100 transition-colors text-center"
          >
            Get Started
          </Link>
          <Link 
            href="/" 
            className="bg-blue-700/40 text-white border border-white/30 px-8 py-3 rounded-md text-lg font-medium backdrop-blur-sm hover:bg-blue-700/60 transition-colors text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}