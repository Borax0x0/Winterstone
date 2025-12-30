"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Logic (Kept this as it's needed for the color change)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#1a2e26] py-4 shadow-md" // Scrolled: Dark Green
          : "bg-transparent py-6"         // Top: Transparent
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
        
        {/* LOGO (Your Original Design) */}
        <Link href="/" className="text-2xl font-serif font-bold tracking-widest cursor-pointer">
          WINTERSTONE
        </Link>
        
        {/* CENTER LINKS (Your Original Design) */}
        <div className="hidden md:flex space-x-12 text-xs tracking-[0.2em] uppercase font-medium">
          <Link href="/#sanctuary" className="hover:text-saffron transition-colors cursor-pointer">
            Sanctuary
          </Link>
          <Link href="/#rooms" className="hover:text-saffron transition-colors cursor-pointer">
            Rooms
          </Link>
          <Link href="/#journal" className="hover:text-saffron transition-colors cursor-pointer">
            Journal
          </Link>
        </div>

        {/* BOOK BUTTON (Your Original Saffron Button) */}
        <Link href="/book" className="bg-white text-[#1A2F25] px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-saffron hover:text-white transition-colors ml-2">
          Book Now
        </Link>

      </div>
    </nav>
  );
}