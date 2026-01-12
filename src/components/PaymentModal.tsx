"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle, Loader2, CreditCard, Smartphone, Building, ShieldCheck } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

type PaymentMethod = "card" | "upi" | "netbanking";

export default function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [method, setMethod] = useState<PaymentMethod>("card");

  // FORM STATES
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");

  // --- FORMATTING LOGIC ---

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const truncated = rawValue.slice(0, 16);
    const formatted = truncated.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const truncated = rawValue.slice(0, 4);

    // Only adds slash if 3rd digit exists
    if (truncated.length > 2) {
      setExpiry(`${truncated.slice(0, 2)} / ${truncated.slice(2)}`);
    } else {
      setExpiry(truncated);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setCvc(rawValue.slice(0, 4));
  };

  // --- PAYMENT LOGIC ---

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onPaymentSuccess();
        setTimeout(() => {
            setStatus("idle");
            setCardNumber("");
            setExpiry("");
            setCvc("");
        }, 500);
      }, 1500);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
          >
            
            {/* SIDEBAR */}
            <div className="w-full md:w-1/3 bg-stone-50 border-r border-stone-200 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">Payment Method</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setMethod("card")}
                  className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all ${
                    method === "card" ? "bg-stone-900 text-white shadow-md" : "text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <CreditCard size={18} /> Card
                </button>
                <button 
                  onClick={() => setMethod("upi")}
                  className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all ${
                    method === "upi" ? "bg-stone-900 text-white shadow-md" : "text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <Smartphone size={18} /> UPI / GPay
                </button>
                <button 
                  onClick={() => setMethod("netbanking")}
                  className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all ${
                    method === "netbanking" ? "bg-stone-900 text-white shadow-md" : "text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <Building size={18} /> Net Banking
                </button>
              </div>

              <div className="mt-12 pt-6 border-t border-stone-200">
                <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} /> 100% Secure
                </div>
                <p className="text-[10px] text-stone-400 mt-2 leading-relaxed">
                  Your data is encrypted using 256-bit SSL technology. We do not store your card details.
                </p>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="w-full md:w-2/3 p-8 relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-red-500">
                <X size={20} />
              </button>

              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">Payment Approved</h3>
                  <p className="text-stone-500 mt-2">Redirecting to confirmation...</p>
                </div>
              ) : method === "card" ? (
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-8">
                      <h2 className="text-xl font-serif font-bold text-stone-900">Enter Card Details</h2>
                      <p className="text-xs text-stone-500 mt-1">Complete your purchase safely.</p>
                    </div>

                    <form id="payment-form" onSubmit={handlePay} className="space-y-5">
                      
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Name on Card</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="JOHN DOE" 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          className="w-full border border-stone-300 rounded-md p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Card Number</label>
                        <div className="relative">
                          <input 
                            required 
                            type="text" 
                            placeholder="0000 0000 0000 0000" 
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            className="w-full border border-stone-300 rounded-md p-3 pl-10 text-sm font-mono focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300"
                          />
                          <CreditCard className="absolute left-3 top-3.5 text-stone-400" size={18} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Expiry</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="MM / YY" 
                            value={expiry}
                            onChange={handleExpiryChange}
                            maxLength={7}
                            className="w-full border border-stone-300 rounded-md p-3 text-sm text-center font-mono focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-stone-500">CVC / CVV</label>
                          <div className="relative">
                            <input 
                              required 
                              type="password" 
                              placeholder="123" 
                              value={cvc}
                              onChange={handleCvcChange}
                              maxLength={4}
                              className="w-full border border-stone-300 rounded-md p-3 pl-10 text-sm font-mono focus:outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300"
                            />
                            <Lock className="absolute left-3 top-3.5 text-stone-400" size={14} />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <button 
                    form="payment-form"
                    disabled={status === "processing"}
                    className="w-full mt-6 bg-stone-900 text-white py-4 font-bold tracking-widest uppercase hover:bg-stone-800 transition-all rounded-md flex justify-center items-center gap-2"
                  >
                    {status === "processing" ? (
                      <><Loader2 className="animate-spin" /> Processing</>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-400">
                  <Smartphone size={48} className="mb-4 opacity-50" />
                  <p className="text-sm">UPI & Net Banking simulation not connected.</p>
                  <button 
                    onClick={() => setMethod("card")}
                    className="mt-4 text-xs font-bold text-stone-900 underline"
                  >
                    Switch to Card
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}