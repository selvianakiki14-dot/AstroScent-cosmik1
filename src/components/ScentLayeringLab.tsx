import React, { useState, useMemo } from 'react';
import { Sparkles, Layers, Plus, ArrowRight, Check } from 'lucide-react';
import { ZODIAC_PERFUMES } from '../data/zodiacData';
import { Perfume } from '../types';
import { formatPrice } from '../utils/astrology';

interface ScentLayeringLabProps {
  onAddDuoToCart: (perfume1: Perfume, perfume2: Perfume) => void;
  currency: 'IDR' | 'USD';
}

export const ScentLayeringLab: React.FC<ScentLayeringLabProps> = ({
  onAddDuoToCart,
  currency,
}) => {
  const [firstId, setFirstId] = useState<string>('leo-solaris-regalis');
  const [secondId, setSecondId] = useState<string>('scorpio-nocturne-abyss');
  const [isAdded, setIsAdded] = useState(false);

  const perfume1 = useMemo(() => ZODIAC_PERFUMES.find((p) => p.id === firstId) || ZODIAC_PERFUMES[0], [firstId]);
  const perfume2 = useMemo(() => ZODIAC_PERFUMES.find((p) => p.id === secondId) || ZODIAC_PERFUMES[1], [secondId]);

  // Dynamic Layering Synthesis
  const alchemyReport = useMemo(() => {
    const isSameSign = perfume1.id === perfume2.id;
    if (isSameSign) {
      return {
        title: `Amplifikasi Murni ${perfume1.name}`,
        interactionType: 'Harmonisasi Resonansi Ganda',
        description: `Menerapkan ${perfume1.name} secara berlapis memperpanjang daya tahan aroma hingga lebih dari 18 jam dengan intensitas sillage yang tak tergoyahkan.`,
        dominantNotes: [...perfume1.notes.top.slice(0, 2), ...perfume1.notes.base.slice(0, 2)],
        applicationRule: 'Semprotkan lapisan pertama di pakaian dan lapisan kedua langsung pada titik nadi hangat leher.',
      };
    }

    const title = `${perfume1.name.split(' ')[0]} × ${perfume2.name.split(' ')[0]}: Eclipse Fusion`;
    const interactionType = `${perfume1.elementLabel.split(' ')[0]} + ${perfume2.elementLabel.split(' ')[0]} Alchemy`;

    const description = `Perpaduan memukau antara fondasi ${perfume1.notes.base[0]} dari ${perfume1.zodiacLabel} dengan kilau atas ${perfume2.notes.top[0]} dari ${perfume2.zodiacLabel}. Menghasilkan aroma baru yang tak bisa ditiru siapa pun.`;

    const dominantNotes = [
      perfume2.notes.top[0],
      perfume1.notes.heart[0],
      perfume2.notes.heart[0],
      perfume1.notes.base[0]
    ];

    const applicationRule = `Semprotkan 2 semprotan ${perfume1.name} sebagai lapisan dasar terlebih dahulu. Tunggu 60 detik, lalu semprotkan 2 semprotan ${perfume2.name} di atasnya untuk efek aroma multidimensi.`;

    return {
      title,
      interactionType,
      description,
      dominantNotes,
      applicationRule,
    };
  }, [perfume1, perfume2]);

  // Bundle pricing with 15% discount
  const bundlePriceIdr = Math.round((perfume1.priceIdr50ml + perfume2.priceIdr50ml) * 0.85);
  const bundlePriceUsd = Math.round((perfume1.priceUsd50ml + perfume2.priceUsd50ml) * 0.85);
  const normalPriceIdr = perfume1.priceIdr50ml + perfume2.priceIdr50ml;
  const normalPriceUsd = perfume1.priceUsd50ml + perfume2.priceUsd50ml;

  const handleAddBundle = () => {
    onAddDuoToCart(perfume1, perfume2);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="layering-lab" className="py-20 border-b border-[#1f2442] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300/90 mb-3">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Digital Scent Layering Lab</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#faf8f5] tracking-tight">
            Eksperimen Mencoba & Memadukan Dua Aroma Kosmik
          </h2>
          <p className="text-sm sm:text-base text-[#9ea8c8] mt-2">
            Dalam dunia haute perfumery, teknik layering menciptakan signature scent yang eksklusif. Padukan dua zodiak untuk meracik dimensi aroma baru yang unik.
          </p>
        </div>

        {/* Dual Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* First Perfume Select */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-[#0c0f24] border border-[#20274f]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Lapisan 1: Base Foundation
              </span>
              <span className="text-xs text-[#7882a4]">Aroma Dasar Bertahan Lama</span>
            </div>

            <div className="relative mb-4 h-48 rounded-xl overflow-hidden bg-[#070914] border border-[#242b52]">
              <img
                src={perfume1.image}
                alt={perfume1.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="font-cinzel text-lg font-bold text-white">{perfume1.name}</span>
                <span className="text-xs text-amber-300 block">{perfume1.zodiacLabel} ({perfume1.elementLabel})</span>
              </div>
            </div>

            <select
              value={firstId}
              onChange={(e) => setFirstId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#131733] border border-[#28305c] rounded-lg text-[#f0ede6] focus:outline-none focus:border-amber-400"
            >
              {ZODIAC_PERFUMES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.symbol} {p.zodiacLabel} — {p.name} ({p.elementLabel})
                </option>
              ))}
            </select>
          </div>

          {/* Plus Alchemy Center */}
          <div className="md:col-span-2 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500/20 to-indigo-500/30 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono text-[#8b95b8] uppercase tracking-widest mt-2">
              Alkimia
            </span>
          </div>

          {/* Second Perfume Select */}
          <div className="md:col-span-5 p-6 rounded-2xl bg-[#0c0f24] border border-[#20274f]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Lapisan 2: Top Veil
              </span>
              <span className="text-xs text-[#7882a4]">Kilau Atas & Sillage Pembuka</span>
            </div>

            <div className="relative mb-4 h-48 rounded-xl overflow-hidden bg-[#070914] border border-[#242b52]">
              <img
                src={perfume2.image}
                alt={perfume2.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="font-cinzel text-lg font-bold text-white">{perfume2.name}</span>
                <span className="text-xs text-amber-300 block">{perfume2.zodiacLabel} ({perfume2.elementLabel})</span>
              </div>
            </div>

            <select
              value={secondId}
              onChange={(e) => setSecondId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#131733] border border-[#28305c] rounded-lg text-[#f0ede6] focus:outline-none focus:border-amber-400"
            >
              {ZODIAC_PERFUMES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.symbol} {p.zodiacLabel} — {p.name} ({p.elementLabel})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Synthesized Result Crucible */}
        <div className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-[#0d1028] via-[#12163b] to-[#0d1028] border border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#212852]">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300">
                {alchemyReport.interactionType}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
                {alchemyReport.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#9ea8c8] mt-2 max-w-2xl leading-relaxed">
                {alchemyReport.description}
              </p>
            </div>

            {/* Bundle Price & Add CTA */}
            <div className="text-left md:text-right shrink-0">
              <div className="text-xs text-[#717b9c] line-through tabular-nums">
                {formatPrice(normalPriceIdr, normalPriceUsd, currency)}
              </div>
              <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300 tabular-nums">
                {formatPrice(bundlePriceIdr, bundlePriceUsd, currency)}
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold block">Hemat 15% Bundle Duo (2x 50ml)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-2">
                Harmoni Nada Utama:
              </span>
              <div className="flex flex-wrap gap-2">
                {alchemyReport.dominantNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-md bg-[#171c42] border border-[#2b3569] text-[#e0e5f5]"
                  >
                    ✦ {note}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-2">
                Metode Aplikasi yang Dianjurkan:
              </span>
              <p className="text-xs text-[#a9b3d4] leading-relaxed">
                {alchemyReport.applicationRule}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#202750] flex justify-end">
            <button
              onClick={handleAddBundle}
              className={`py-3 px-8 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-105 active:scale-[0.99] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Duo Layering Ditambahkan ke Keranjang!
                </>
              ) : (
                <>
                  Pesan Duo Layering Set (Hemat 15%)
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
