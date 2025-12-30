import type { Metadata } from "next";
import { Inter, Playfair_Display, Jost } from "next/font/google";
import "./main.css"; 

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. Configure JOST (Your Luxury Footer Font)
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

// 2. Configure INTER (Your Main Text Font)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // ✅ Essential for your Tailwind config
  display: "swap",
});

// 3. Configure PLAYFAIR (Your Headings Font)
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: "swap",
});

export const metadata: Metadata = {
  title: "Winterstone | Alpine Luxury",
  description: "A luxury escape in the Himalayas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 4. Inject all variables into the body */}
      <body className={`${inter.variable} ${playfair.variable} ${jost.variable} font-sans antialiased`}>
        
        <Navbar />

        {children}

        <Footer />
        
      </body>
    </html>
  );
}