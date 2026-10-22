import React, { useState } from 'react';
import { Package, Check, Sparkles, X, Plus } from 'lucide-react';
import { ZODIAC_PERFUMES } from '../data/zodiacData';
import { Perfume } from '../types';
import { formatPrice } from '../utils/astrology';

interface DiscoverySetBuilderProps {
  onAddDiscoverySet: (selectedPerfumes: Perfume[]) => void;
  currency: 'IDR' | 'USD';
}

export const DiscoverySetBuilder: React.FC<DiscoverySetBuilderProps> = ({
  onAddDiscoverySet,
  currency,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'aries-ignis-sol',
    'leo-solaris-regalis',
    'scorpio-nocturne-abyss',
    'pisces-oceanus-dream',
  ]);
  const [isAdded, setIsAdded] = useState(false);

  const priceIdr = 649000;
  const priceUsd = 42;

  const handleTogglePerfume = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleRemoveSlot = (index: number) => {
    const updated = [...selectedIds];
    updated.splice(index, 1);
    setSelectedIds(updated);
  };

  const handleAddSet = () => {
    if (selectedIds.length !== 4) return;
    const selectedObjects = selectedIds.map(
      (id) => ZODIAC_PERFUMES.find((p) => p.id === id)!
    );
    onAddDiscoverySet(selectedObjects);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="discovery-set" className="py-20 border-b border-[#1f2442] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Opulent Box Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group bg-[#080b18]">
              <img
                src="/src/assets/images/discovery_sample_vault_1792500259529.jpg"
                alt="Celestial Discovery Sample Set Box Astra Scent"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#080b18]/90 border border-amber-400/30 backdrop-blur-md">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                  ASTRONOMICAL DISCOVERY VAULT
                </span>
                <h4 className="font-cinzel text-lg font-bold text-white mt-0.5">
                  The Constellations Set (4 × 5ml)
                </h4>
                <p className="text-xs text-[#a9b3d4] mt-1">
                  Kemasan beludru midnight navy dengan peta rasi bintang foil emas dan 4 botol vial mini bertutup emas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom 4-Slot Builder */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300/90 mb-3">
              <Package className="w-4 h-4 text-amber-400" />
              <span>Bespoke Discovery Set</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#faf8f5] tracking-tight mb-2">
              Rakit Kotak Discovery Sesuai Pilihanmu
            </h2>
            <p className="text-sm text-[#9ea8c8] mb-6">
              Pilih 4 aroma zodiak berbeda untuk dicoba secara mendalam sebelum memutuskan full bottle. Termasuk kartu tester aroma eksklusif.
            </p>

            {/* 4 Selected Slots Visualizer */}
            <div className="mb-6 p-4 rounded-xl bg-[#0b0e24] border border-[#23294c]">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-semibold text-[#cfd6eb]">
                  Slot Terisi: {selectedIds.length} / 4 Botol Mini (5ml)
                </span>
                <span className="text-[11px] text-amber-300">
                  {selectedIds.length === 4 ? 'Siap Dipesan' : `Pilih ${4 - selectedIds.length} aroma lagi`}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0, 1, 2, 3].map((idx) => {
                  const id = selectedIds[idx];
                  const item = id ? ZODIAC_PERFUMES.find((p) => p.id === id) : null;
                  return (
                    <div
                      key={idx}
                      className={`relative p-3 rounded-lg border text-center transition-all min-h-[90px] flex flex-col items-center justify-center ${
                        item
                          ? 'border-amber-400/50 bg-[#121738] text-white'
                          : 'border-dashed border-[#293159] bg-[#0c0f24] text-[#636c8f]'
                      }`}
                    >
                      {item ? (
                        <>
                          <button
                            onClick={() => handleRemoveSlot(idx)}
                            className="absolute top-1.5 right-1.5 text-[#8691b8] hover:text-white"
                            title="Hapus slot"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-base text-amber-300 font-bold">{item.symbol}</span>
                          <span className="text-xs font-cinzel font-semibold mt-1 truncate w-full">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#939dbf] truncate w-full">
                            {item.zodiacLabel} (5ml)
                          </span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-[#556087]">
                          <Plus className="w-4 h-4 mb-1" />
                          <span className="text-[11px]">Slot {idx + 1} Kosong</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Picker from 12 Signs */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#8f99ba] uppercase tracking-wider mb-2">
                Pilih Dari 12 Konstelasi Zodiak:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {ZODIAC_PERFUMES.map((perfume) => {
                  const isSelected = selectedIds.includes(perfume.id);
                  return (
                    <button
                      key={perfume.id}
                      onClick={() => handleTogglePerfume(perfume.id)}
                      className={`p-2 rounded-lg text-left border text-xs transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/20 text-white font-medium'
                          : 'border-[#20274f] bg-[#0d1028] text-[#9da6c7] hover:border-[#3a4478]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span>{perfume.symbol}</span>
                        {isSelected && <Check className="w-3 h-3 text-amber-300" />}
                      </div>
                      <div className="font-semibold truncate mt-1 text-[#f0ede6]">
                        {perfume.zodiacLabel}
                      </div>
                      <div className="text-[9px] text-[#717b9e] truncate">{perfume.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Checkout strip */}
            <div className="pt-4 border-t border-[#1d2347] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#7882a4]">Harga Set Lengkap 4 × 5ml Extrait</span>
                <div className="font-cinzel text-2xl font-bold text-amber-300 tabular-nums">
                  {formatPrice(priceIdr, priceUsd, currency)}
                </div>
              </div>

              <button
                disabled={selectedIds.length !== 4}
                onClick={handleAddSet}
                className={`w-full sm:w-auto py-3 px-8 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  selectedIds.length !== 4
                    ? 'opacity-40 cursor-not-allowed bg-[#181d3d] text-[#7882a4]'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-105 active:scale-[0.99] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Discovery Set Ditambahkan!
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Pesan Discovery Vault Set
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
