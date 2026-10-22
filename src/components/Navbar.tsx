import React from 'react';
import { ShoppingBag, Sparkles, Moon } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: 'IDR' | 'USD';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onToggleCurrency,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070914]/90 backdrop-blur-md border-b border-[#232742]/80 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-amber-200/30 border border-amber-300/40 flex items-center justify-center text-amber-200 group-hover:border-amber-300 transition-colors">
            <Sparkles className="w-4 h-4 text-amber-200" />
          </div>
          <span className="font-cinzel text-xl font-bold tracking-[0.25em] text-[#f2efe9] group-hover:text-amber-200 transition-colors">
            ASTRA SCENT
          </span>
        </a>

        {/* Zone 2: Single-line Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#b3b9cf]">
          <a 
            href="#collection" 
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Koleksi Zodiak
          </a>
          <a 
            href="#natal-crafter" 
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Moon className="w-3.5 h-3.5 text-amber-400/80" />
            Racik Natal
          </a>
          <a 
            href="#aura-quiz" 
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Kuis Aura
          </a>
          <a 
            href="#layering-lab" 
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Layering Lab
          </a>
          <a 
            href="#discovery-set" 
            className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            Discovery Set
          </a>
        </nav>

        {/* Zone 3: Primary Action & Bag */}
        <div className="flex items-center gap-3.5 shrink-0">
          <button
            onClick={onToggleCurrency}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-md border border-[#2b3052] bg-[#0f1224] text-[#cfd4e6] hover:border-amber-400/50 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 focus-visible:ring-1 focus-visible:ring-amber-300"
            title="Ubah Mata Uang"
          >
            {currency}
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-gradient-to-r from-[#171b36] to-[#1e2347] border border-amber-400/30 text-[#f0ede6] hover:border-amber-300 hover:text-amber-200 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all whitespace-nowrap shrink-0 focus-visible:ring-1 focus-visible:ring-amber-300"
            aria-label="Buka Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
