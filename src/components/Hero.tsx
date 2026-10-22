import React from 'react';
import { Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { ZODIAC_PERFUMES } from '../data/zodiacData';
import { ZodiacSign } from '../types';
import { heroCelestialPerfume } from '../assets/images';

interface HeroProps {
  onSelectZodiac: (sign: ZodiacSign) => void;
  onNavigateToNatal: () => void;
  onNavigateToCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectZodiac,
  onNavigateToNatal,
  onNavigateToCollection
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#1f2442]">
      {/* Subtle celestial cosmic glow backdrop */}
      <div className="absolute inset-0 pointer-events-none cosmic-radial-bg opacity-70" />
      <div className="absolute inset-0 pointer-events-none starlight-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Split Screen Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Brand & Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Quiet text kicker - zero pill */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300/90 mb-4">
              <span>Haute Parfumerie Astrologique</span>
              <span aria-hidden="true" className="text-amber-500/60">·</span>
              <span>Celestial Signature</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#faf8f5] leading-[1.15] tracking-tight mb-6 max-w-2xl [text-wrap:balance]">
              Your Zodiac, <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Your Signature Scent.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#b8bfd6] leading-relaxed mb-8 max-w-xl">
              Bayangkan parfum yang bukan sekadar harum, namun diciptakan selaras dengan posisi bintang, zodiak, dan energi kosmik jiwamu. Diformulasikan dari bahan-bahan langka dunia untuk menghasilkan aroma yang sepenuhnya mewakili dirimu.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onNavigateToCollection}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:brightness-105 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
              >
                Jelajahi 12 Zodiak
              </button>
              <button
                onClick={onNavigateToNatal}
                className="px-6 py-3.5 text-xs sm:text-sm font-medium tracking-wider uppercase text-amber-200 bg-[#12162e]/80 border border-amber-400/40 rounded-lg hover:border-amber-300 hover:bg-[#1a1f42] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                Racik Sesuai Tanggal Lahir
              </button>
            </div>

            {/* Micro Trust Indicators (Quiet metadata without pills) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#8f98b5]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400/80" />
                Pure Extrait Concentration
              </span>
              <span aria-hidden="true">·</span>
              <span>Gratis Custom Engraving Botol</span>
              <span aria-hidden="true">·</span>
              <span>Sertifikat Astral Resmi</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#2b3154] bg-[#0c0f21] shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <img
                src={heroCelestialPerfume}
                alt="Flacon ASTRA SCENT Celestial Aether Eau de Parfum di atas batu meteorit berlatar bintang kosmik"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070914] via-transparent to-transparent opacity-80" />

              {/* Quiet overlay caption */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#090c1f]/85 backdrop-blur-md border border-amber-400/20">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-cinzel text-amber-200 font-semibold tracking-wider">AURA BESPOKE EDITION</span>
                  <span className="text-[#a4adcb] tabular-nums">32% Pure Perfume Oil</span>
                </div>
                <p className="text-xs text-[#b8bfd6] line-clamp-2">
                  "Aroma kosmik yang diracik khusus menyelaraskan Sun, Moon, dan Rising sign dalam harmoni piramida olfaktori."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 12 Zodiac Quick Access Wheel / Strip */}
        <div className="mt-14 pt-8 border-t border-[#1a1f3b]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9da6c4]">
              Pilih Zodiakmu untuk Menemukan Signature Scent
            </span>
            <span className="text-xs text-amber-400/80 hidden sm:inline">12 Konstelasi Lengkap</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2.5">
            {ZODIAC_PERFUMES.map((perfume) => (
              <button
                key={perfume.id}
                onClick={() => onSelectZodiac(perfume.zodiac)}
                className="group p-2.5 rounded-xl bg-[#0e1227] hover:bg-[#181d3d] border border-[#23294c] hover:border-amber-400/60 transition-all text-center flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300"
                title={`${perfume.zodiacLabel} (${perfume.name})`}
              >
                <span className="text-lg text-amber-300/80 group-hover:scale-110 transition-transform">
                  {perfume.symbol}
                </span>
                <span className="text-[11px] font-medium text-[#c8d0e7] group-hover:text-amber-200 transition-colors mt-1">
                  {perfume.zodiacLabel}
                </span>
                <span className="text-[9px] text-[#6e779b] truncate w-full mt-0.5">
                  {perfume.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column KPI Trust Strip below hero */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl bg-[#0a0d1f] border border-[#1d2240]">
          <div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200 tabular-nums">12 Rasi</div>
            <div className="text-xs text-[#8c96b8] mt-1">Formula Khusus Zodiak</div>
          </div>
          <div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200 tabular-nums">32% Extrait</div>
            <div className="text-xs text-[#8c96b8] mt-1">Konsentrasi Minyak Murni</div>
          </div>
          <div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200 tabular-nums">100% Natal</div>
            <div className="text-xs text-[#8c96b8] mt-1">Algoritma Posisi Bintang</div>
          </div>
          <div>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200 tabular-nums">Bespoke Gold</div>
            <div className="text-xs text-[#8c96b8] mt-1">Gratis Grafir Nama Botol</div>
          </div>
        </div>
      </div>
    </section>
  );
};
