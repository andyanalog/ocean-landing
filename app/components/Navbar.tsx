// components/Navbar.jsx
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center z-10 relative">
      <div className="text-white text-2xl font-bold">
        <Link href="/">OceanSound</Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-8 text-white">
        <Link href="/" className="hover:text-blue-200 transition-colors">
          Features
        </Link>
        <Link href="/" className="hover:text-blue-200 transition-colors">
          About
        </Link>
        <Link href="/" className="hover:text-blue-200 transition-colors">
          Pricing
        </Link>
        <Link href="/" className="hover:text-blue-200 transition-colors">
          Contact
        </Link>
      </div>
      
      {/* Mobile menu button - you would implement toggle functionality */}
      <button className="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}