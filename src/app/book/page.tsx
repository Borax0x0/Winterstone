"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Check } from "lucide-react";

// 1. Room Data (Must match your ID/slugs exactly)
const ROOMS = [
  { id: "skyline-haven", name: "Skyline Haven", price: 8500, image: "/skyline-main.jpg" },
  { id: "zen-nest", name: "Zen Nest", price: 6500, image: "/zen-main.jpg" },
  { id: "sunlit-studio", name: "Sunlit Studio", price: 7200, image: "/sunlit-main.jpg" },
];

function BookingContent() {
  const searchParams = useSearchParams();
  
  // 2. State
  const [selectedRoomId, setSelectedRoomId] = useState(ROOMS[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  // 3. Load Data from URL (Room + Dates)
  useEffect(() => {
    // Get params
    const roomParam = searchParams.get("room");
    const checkInParam = searchParams.get("checkin");
    const checkOutParam = searchParams.get("checkout");

    // Set Room
    if (roomParam) {
      const exists = ROOMS.find(r => r.id === roomParam);
      if (exists) setSelectedRoomId(roomParam);
    }

    // Set Dates (Format: YYYY-MM-DD)
    if (checkInParam) setCheckIn(checkInParam.split('T')[0]);
    if (checkOutParam) setCheckOut(checkOutParam.split('T')[0]);

  }, [searchParams]);

  // 4. Define 'selectedRoom' (THIS WAS LIKELY MISSING)
  const selectedRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];
  
  // 5. Calculate Totals
  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays * selectedRoom.price : 0;
  };

  const total = calculateTotal();
  const nights = total / selectedRoom.price || 0;

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT: BOOKING FORM */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center text-xs font-bold tracking-widest text-stone-500 hover:text-saffron mb-8 uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return Home
          </Link>
          
          <h1 className="font-serif text-4xl text-stone-900 mb-2">Confirm Your Stay</h1>
          <p className="text-stone-500 mb-10">You are just a few steps away from the mountains.</p>

          <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100 space-y-8">
            
            {/* Room Selection */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">Select Suite</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ROOMS.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-4 border text-left transition-all ${
                      selectedRoomId === room.id 
                        ? "border-saffron bg-stone-50 ring-1 ring-saffron" 
                        : "border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <div className="font-serif text-lg text-stone-900">{room.name}</div>
                    <div className="text-xs text-stone-500 mt-1">₹{room.price.toLocaleString()} / night</div>
                    {selectedRoomId === room.id && <Check className="w-4 h-4 text-saffron mt-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Dates & Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">Check In</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
                  <input 
                    type="date" 
                    value={checkIn} // Controlled input
                    className="w-full pl-12 pr-4 py-3 border border-stone-200 focus:outline-none focus:border-saffron text-sm bg-transparent"
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">Check Out</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
                  <input 
                    type="date" 
                    value={checkOut} // Controlled input
                    className="w-full pl-12 pr-4 py-3 border border-stone-200 focus:outline-none focus:border-saffron text-sm bg-transparent"
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">Guests</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
                  <select 
                    className="w-full pl-12 pr-4 py-3 border border-stone-200 focus:outline-none focus:border-saffron text-sm bg-transparent appearance-none"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div>
               <label className="block text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">Personal Details</label>
               <div className="grid grid-cols-1 gap-4">
                 <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-saffron text-sm" />
                 <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-stone-200 focus:outline-none focus:border-saffron text-sm" />
               </div>
            </div>

          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-1">
          <div className="bg-stone-900 text-stone-100 p-8 rounded-sm sticky top-32">
            <h3 className="font-serif text-2xl mb-6">Reservation Summary</h3>
            
            <div className="flex justify-between items-center pb-4 border-b border-stone-700 mb-4">
              <span className="text-sm opacity-80">Suite</span>
              {/* This is where your error was: selectedRoom needs to be defined above */}
              <span className="font-bold">{selectedRoom.name}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-stone-700 mb-4">
              <span className="text-sm opacity-80">Dates</span>
              <span className="text-sm text-right">
                {checkIn ? new Date(checkIn).toLocaleDateString() : "--"} <br/> to <br/> 
                {checkOut ? new Date(checkOut).toLocaleDateString() : "--"}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-stone-700 mb-8">
              <span className="text-sm opacity-80">Duration</span>
              <span>{nights > 0 ? `${nights} Nights` : "--"}</span>
            </div>

            <div className="flex justify-between items-center text-xl font-serif font-bold text-saffron mb-8">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <button className="w-full bg-saffron text-stone-900 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors">
              Confirm Booking
            </button>
            
            <p className="text-[10px] text-center mt-4 opacity-50 uppercase tracking-wider">
              Secure Payment • Free Cancellation
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Wrapper for Next.js Suspense
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}