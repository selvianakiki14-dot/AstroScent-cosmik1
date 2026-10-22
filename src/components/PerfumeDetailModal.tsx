import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Clock, Wind, Moon, Check } from 'lucide-react';
import { Perfume } from '../types';
import { ZODIAC_ELEMENT_INFO } from '../data/zodiacData';
import { formatPrice } from '../utils/astrology';

interface PerfumeDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: '5ml' | '50ml' | '100ml', engraving?: string) => void;
  currency: 'IDR' | 'USD';
}

export const PerfumeDetailModal: React.FC<PerfumeDetailModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
  currency,
}) => {
  if (!perfume) return null;

  const [selectedSize, setSelectedSize] = useState<'5ml' | '50ml' | '100ml'>('50ml');
  const [engravingText, setEngravingText] = useState('');
  const [activeTab, setActiveTab] = useState<'pyramid' | 'accords' | 'ritual'>('pyramid');
  const [isAdded, setIsAdded] = useState(false);

  const elementInfo = ZODIAC_ELEMENT_INFO[perfume.element];

  const currentPriceIdr =
    selectedSize === '100ml'
      ? perfume.priceIdr100ml
      : selectedSize === '5ml'
      ? perfume.priceIdr5ml
      : perfume.priceIdr50ml;

  const currentPriceUsd =
    selectedSize === '100ml'
      ? perfume.priceUsd100ml
      : selectedSize === '5ml'
      ? perfume.priceUsd5ml
      : perfume.priceUsd50ml;

  const handleAdd = () => {
    onAddToCart(perfume, selectedSize, engravingText.trim() ? engravingText.trim().toUpperCase() : undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-[#090b1c] border border-amber-400/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden text-[#edebe6] my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#121630] border border-[#262c54] text-[#a1abd0] hover:text-white hover:border-amber-400/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300"
          aria-label="Tutup Detail"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual & Live Engraved Flacon Simulation */}
          <div className="md:col-span-5 relative bg-[#060814] p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#1e2344]">
            <div className="w-full text-center mb-4">
              <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
                Konstelasi {perfume.zodiacLabel} {perfume.symbol}
              </span>
              <p className="text-[11px] text-[#7d87a8] mt-0.5">
                {perfume.zodiacDateRange} · {elementInfo.label} · {perfume.rulingPlanet}
              </p>
            </div>

            {/* Bottle Image with Plaque simulator */}
            <div className="relative w-full max-w-[280px] h-[340px] rounded-xl overflow-hidden border border-[#272e59] shadow-inner group">
              <img
                src={perfume.image}
                alt={perfume.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Real-time simulated engraved gold plaque on the bottle */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[84%] bg-[#080b18]/90 border border-amber-400/60 rounded-md p-2 text-center backdrop-blur-sm shadow-[0_0_12px_rgba(212,175,55,0.2)]">
                <div className="text-[9px] uppercase tracking-[0.2em] text-amber-300/80">
                  ASTRA SCENT · {perfume.zodiacLabel.toUpperCase()}
                </div>
                <div className="font-cinzel text-xs font-bold text-amber-200 tracking-wider truncate">
                  {perfume.name}
                </div>
                {engravingText.trim() && (
                  <div className="mt-1 pt-1 border-t border-amber-500/30 text-[10px] text-amber-100 tracking-[0.15em] font-serif uppercase truncate">
                    ✦ {engravingText.trim().toUpperCase()} ✦
                  </div>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#1a1f3d] text-center text-xs">
              <div className="p-2 rounded-lg bg-[#0e122b]">
                <div className="text-[10px] text-[#717b9c] flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> Longevity
                </div>
                <div className="font-medium text-[#dce1f2] mt-0.5 truncate">{perfume.longevity}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#0e122b]">
                <div className="text-[10px] text-[#717b9c] flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3 text-amber-400" /> Sillage
                </div>
                <div className="font-medium text-[#dce1f2] mt-0.5 truncate">{perfume.sillage.split('(')[0]}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Olfactory Detail */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Product Title & Price */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#faf8f5]">
                  {perfume.name}
                </h2>
                <div className="font-cinzel text-xl font-bold text-amber-300 tabular-nums">
                  {formatPrice(currentPriceIdr, currentPriceUsd, currency)}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-amber-200/90 italic mb-3">
                "{perfume.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-[#9ea8c8] leading-relaxed mb-6">
                {perfume.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#8f99ba] uppercase tracking-wider mb-2">
                  Pilih Ukuran Botol
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setSelectedSize('5ml')}
                    className={`p-2.5 rounded-lg text-left border transition-all ${
                      selectedSize === '5ml'
                        ? 'border-amber-400 bg-amber-400/15 text-white'
                        : 'border-[#23294c] bg-[#0d1127] text-[#9ea8c8] hover:border-[#384175]'
                    }`}
                  >
                    <div className="text-xs font-semibold">5ml Astral</div>
                    <div className="text-[11px] text-amber-300 tabular-nums mt-0.5">
                      {formatPrice(perfume.priceIdr5ml, perfume.priceUsd5ml, currency)}
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedSize('50ml')}
                    className={`p-2.5 rounded-lg text-left border transition-all ${
                      selectedSize === '50ml'
                        ? 'border-amber-400 bg-amber-400/15 text-white'
                        : 'border-[#23294c] bg-[#0d1127] text-[#9ea8c8] hover:border-[#384175]'
                    }`}
                  >
                    <div className="text-xs font-semibold">50ml Flacon</div>
                    <div className="text-[11px] text-amber-300 tabular-nums mt-0.5">
                      {formatPrice(perfume.priceIdr50ml, perfume.priceUsd50ml, currency)}
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedSize('100ml')}
                    className={`p-2.5 rounded-lg text-left border transition-all ${
                      selectedSize === '100ml'
                        ? 'border-amber-400 bg-amber-400/15 text-white'
                        : 'border-[#23294c] bg-[#0d1127] text-[#9ea8c8] hover:border-[#384175]'
                    }`}
                  >
                    <div className="text-xs font-semibold">100ml Extrait</div>
                    <div className="text-[11px] text-amber-300 tabular-nums mt-0.5">
                      {formatPrice(perfume.priceIdr100ml, perfume.priceUsd100ml, currency)}
                    </div>
                  </button>
                </div>
              </div>

              {/* Free Custom Engraving Simulator Input */}
              <div className="mb-6 p-3.5 rounded-xl bg-[#0b0e21] border border-[#22274b]">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#c4cbe2] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Gratis Custom Engraving Nama / Inisial
                  </label>
                  <span className="text-[10px] text-[#717b9c]">Maks. 16 Karakter</span>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="Contoh: SELVIANA / ASTRA-AURA"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-[#121630] border border-[#2b325c] rounded-lg text-amber-200 placeholder-[#5e6687] uppercase tracking-widest focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Interactive Tabs: Olfactory Pyramid, Accords, Ritual */}
              <div className="border-t border-[#1b203e] pt-4 mb-6">
                <div className="flex items-center gap-4 text-xs font-medium border-b border-[#1f2445] pb-2 mb-3">
                  <button
                    onClick={() => setActiveTab('pyramid')}
                    className={`transition-colors pb-1 ${
                      activeTab === 'pyramid'
                        ? 'text-amber-300 border-b-2 border-amber-300 font-semibold'
                        : 'text-[#8b95b8] hover:text-white'
                    }`}
                  >
                    Piramida Aroma
                  </button>
                  <button
                    onClick={() => setActiveTab('accords')}
                    className={`transition-colors pb-1 ${
                      activeTab === 'accords'
                        ? 'text-amber-300 border-b-2 border-amber-300 font-semibold'
                        : 'text-[#8b95b8] hover:text-white'
                    }`}
                  >
                    Spektrum Accord
                  </button>
                  <button
                    onClick={() => setActiveTab('ritual')}
                    className={`transition-colors pb-1 ${
                      activeTab === 'ritual'
                        ? 'text-amber-300 border-b-2 border-amber-300 font-semibold'
                        : 'text-[#8b95b8] hover:text-white'
                    }`}
                  >
                    Ritual Kosmik
                  </button>
                </div>

                {activeTab === 'pyramid' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[#6d7699] font-medium block">Top Notes (Awal Semprotan):</span>
                      <p className="text-[#dde2f4] font-medium">{perfume.notes.top.join(' · ')}</p>
                    </div>
                    <div>
                      <span className="text-[#6d7699] font-medium block">Heart Notes (Jiwa Inti):</span>
                      <p className="text-[#dde2f4] font-medium">{perfume.notes.heart.join(' · ')}</p>
                    </div>
                    <div>
                      <span className="text-[#6d7699] font-medium block">Base Notes (Jejak Abadi):</span>
                      <p className="text-[#dde2f4] font-medium">{perfume.notes.base.join(' · ')}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'accords' && (
                  <div className="space-y-2 text-xs">
                    {perfume.accords.map((accord) => (
                      <div key={accord.name} className="flex items-center gap-3">
                        <span className="w-32 text-[#b0b9d8] truncate">{accord.name}</span>
                        <div className="flex-grow h-2 rounded-full bg-[#161a38] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${accord.percentage}%`,
                              backgroundColor: accord.color,
                            }}
                          />
                        </div>
                        <span className="w-9 text-right text-[#7d87a8] tabular-nums font-mono text-[11px]">
                          {accord.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ritual' && (
                  <div className="text-xs text-[#b8bfd8] leading-relaxed space-y-2">
                    <p>{perfume.ritualText}</p>
                    <div className="pt-2 text-[11px] text-[#717b9c]">
                      Batu Kristal Penjaga: <strong className="text-amber-200">{perfume.celestialStone}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="pt-4 border-t border-[#1e2344] flex items-center gap-4">
              <button
                onClick={handleAdd}
                className={`flex-grow py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-105 active:scale-[0.99] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Berhasil Ditambahkan ke Keranjang!
                  </>
                ) : (
                  <>
                    Tambahkan ke Keranjang · {formatPrice(currentPriceIdr, currentPriceUsd, currency)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
