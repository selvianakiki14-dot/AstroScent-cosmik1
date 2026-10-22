import React, { useState, useMemo } from 'react';
import { Search, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { ZODIAC_PERFUMES, ZODIAC_ELEMENT_INFO } from '../data/zodiacData';
import { Perfume, ZodiacElement } from '../types';
import { formatPrice } from '../utils/astrology';

interface ZodiacCollectionProps {
  onSelectPerfume: (perfume: Perfume) => void;
  currency: 'IDR' | 'USD';
  selectedZodiacFilter?: string | null;
  onClearZodiacFilter?: () => void;
}

export const ZodiacCollection: React.FC<ZodiacCollectionProps> = ({
  onSelectPerfume,
  currency,
  selectedZodiacFilter,
  onClearZodiacFilter,
}) => {
  const [activeElement, setActiveElement] = useState<ZodiacElement | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPerfumes = useMemo(() => {
    return ZODIAC_PERFUMES.filter((perfume) => {
      // Element filter
      if (activeElement !== 'all' && perfume.element !== activeElement) {
        return false;
      }
      // Direct Zodiac filter if selected from hero
      if (selectedZodiacFilter && perfume.zodiac !== selectedZodiacFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = perfume.name.toLowerCase().includes(query);
        const matchesZodiac = perfume.zodiacLabel.toLowerCase().includes(query);
        const matchesElement = perfume.elementLabel.toLowerCase().includes(query);
        const matchesNotes = [
          ...perfume.notes.top,
          ...perfume.notes.heart,
          ...perfume.notes.base,
        ].some((note) => note.toLowerCase().includes(query));
        const matchesTagline = perfume.tagline.toLowerCase().includes(query);
        return matchesName || matchesZodiac || matchesElement || matchesNotes || matchesTagline;
      }
      return true;
    });
  }, [activeElement, selectedZodiacFilter, searchQuery]);

  return (
    <section id="collection" className="py-20 border-b border-[#1f2442] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300/90 mb-3">
              <span>Koleksi 12 Konstelasi Zodiak</span>
              <span aria-hidden="true" className="text-amber-500/60">·</span>
              <span>Signature Flacons</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#faf8f5] tracking-tight">
              Karya Seni Wewangian Langit
            </h2>
            <p className="text-sm sm:text-base text-[#9ea8c8] max-w-2xl mt-2">
              Setiap botol diformulasikan berdasarkan elemen alami zodiak—mengharmoniskan karakter psikologis, kristal planet penguasa, dan piramida aroma mewah.
            </p>
          </div>

          {/* Active direct Zodiac reset badge if applicable */}
          {selectedZodiacFilter && (
            <div className="flex items-center gap-2 text-xs text-amber-200 bg-[#161a38] border border-amber-400/40 px-3 py-1.5 rounded-md">
              <span>Menampilkan: <strong>{selectedZodiacFilter.toUpperCase()}</strong></span>
              <button
                onClick={onClearZodiacFilter}
                className="text-amber-400 hover:text-amber-200 ml-1 underline underline-offset-2"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-xl bg-[#0d1024] border border-[#23284a] mb-10">
          {/* Element segmented control */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 scrollbar-none">
            <button
              onClick={() => { setActiveElement('all'); onClearZodiacFilter?.(); }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeElement === 'all'
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/50'
                  : 'text-[#9ea8c8] hover:text-[#f0ede6]'
              }`}
            >
              Semua Elemen (12)
            </button>
            {(['fire', 'earth', 'air', 'water'] as ZodiacElement[]).map((el) => {
              const info = ZODIAC_ELEMENT_INFO[el];
              const isActive = activeElement === el;
              return (
                <button
                  key={el}
                  onClick={() => { setActiveElement(el); onClearZodiacFilter?.(); }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-200 border border-amber-400/50'
                      : 'text-[#9ea8c8] hover:text-[#f0ede6]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }} />
                  {info.label} ({info.enLabel})
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-[#727c9e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari zodiak, aroma (saffron, rose...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#131733] border border-[#252b52] rounded-lg text-[#f0ede6] placeholder-[#6e779b] focus:outline-none focus:border-amber-400/70 transition-colors"
            />
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredPerfumes.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#0c0f24] border border-[#202547]">
            <p className="text-sm text-[#9ea8c8] mb-3">Tidak ada parfum yang cocok dengan pencarianmu.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveElement('all'); onClearZodiacFilter?.(); }}
              className="text-xs text-amber-300 underline underline-offset-4 hover:text-amber-100"
            >
              Reset semua filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPerfumes.map((perfume) => {
              const elementData = ZODIAC_ELEMENT_INFO[perfume.element];
              return (
                <div
                  key={perfume.id}
                  onClick={() => onSelectPerfume(perfume)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0c0f24] border border-[#20264a] hover:border-amber-400/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image container: 65-70% visual prominence */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-[#070915]">
                    <img
                      src={perfume.image}
                      alt={`${perfume.name} - Parfum Zodiak ${perfume.zodiacLabel}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f24] via-transparent to-transparent opacity-90" />

                    {/* Quiet Element & Ruler Metadata (unboxed, no pill badges) */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#070914]/80 backdrop-blur-md border border-[#2b3052] text-[#dcdfe9]">
                        <span className="text-amber-300 font-bold">{perfume.symbol}</span>
                        <span>{perfume.zodiacLabel}</span>
                        <span aria-hidden="true" className="text-[#555e80]">·</span>
                        <span style={{ color: elementData.color }}>{elementData.label}</span>
                      </div>
                      <span className="text-[11px] text-[#b3bad4] px-2 py-0.5 rounded bg-[#070914]/70 backdrop-blur-md">
                        {perfume.rulingPlanet}
                      </span>
                    </div>

                    {/* Scent Accord preview tag */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[11px] font-medium tracking-wide text-amber-200/90">
                        {perfume.characterVibe}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h3 className="font-cinzel text-xl font-bold text-[#faf8f5] group-hover:text-amber-200 transition-colors">
                          {perfume.name}
                        </h3>
                        <div className="font-cinzel text-sm font-semibold text-amber-300 tabular-nums">
                          {formatPrice(perfume.priceIdr50ml, perfume.priceUsd50ml, currency)}
                        </div>
                      </div>

                      <p className="text-xs text-[#8c96b8] line-clamp-2 mb-4">
                        {perfume.description}
                      </p>

                      {/* Quiet Notes Pyramid summary */}
                      <div className="space-y-1.5 py-3 border-y border-[#1c2242] text-xs">
                        <div className="flex items-center text-[#7e87a6]">
                          <span className="w-16 shrink-0 text-[#616b8c]">Top:</span>
                          <span className="text-[#cfd5e8] truncate">{perfume.notes.top.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-[#7e87a6]">
                          <span className="w-16 shrink-0 text-[#616b8c]">Heart:</span>
                          <span className="text-[#cfd5e8] truncate">{perfume.notes.heart.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-[#7e87a6]">
                          <span className="w-16 shrink-0 text-[#616b8c]">Base:</span>
                          <span className="text-[#cfd5e8] truncate">{perfume.notes.base.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Card Actions */}
                    <div className="mt-5 pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#919bbd]">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="tabular-nums">★ {perfume.rating}</span>
                        <span>({perfume.reviewCount})</span>
                      </div>

                      <span className="flex items-center gap-1 text-amber-300 font-medium group-hover:translate-x-1 transition-transform">
                        Detail & Ukir Botol
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
