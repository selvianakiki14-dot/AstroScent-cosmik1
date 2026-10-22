import React, { useState } from 'react';
import { Compass, Sparkles, Moon, Sun, Award, Printer, ShoppingBag, Check, RotateCcw } from 'lucide-react';
import { generateBespokeFormula, formatPrice } from '../utils/astrology';
import { BespokeFormula, ZodiacSign } from '../types';
import { ZODIAC_PERFUMES, ZODIAC_ELEMENT_INFO } from '../data/zodiacData';

interface NatalPerfumeCrafterProps {
  onAddBespokeToCart: (formula: BespokeFormula) => void;
  currency: 'IDR' | 'USD';
}

export const NatalPerfumeCrafter: React.FC<NatalPerfumeCrafterProps> = ({
  onAddBespokeToCart,
  currency,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [birthDate, setBirthDate] = useState('1998-07-28');
  const [birthTime, setBirthTime] = useState('08:30');
  const [birthCity, setBirthCity] = useState('Jakarta');
  const [scentPreference, setScentPreference] = useState<'all' | 'feminine' | 'masculine' | 'unisex'>('unisex');

  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedFormula, setCalculatedFormula] = useState<BespokeFormula | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !birthDate) return;

    setIsCalculating(true);
    setTimeout(() => {
      const formula = generateBespokeFormula(recipientName.trim(), birthDate, birthTime, birthCity || 'Indonesia');
      setCalculatedFormula(formula);
      setIsCalculating(false);
    }, 1200);
  };

  const handleAddToCart = () => {
    if (!calculatedFormula) return;
    onAddBespokeToCart(calculatedFormula);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <section id="natal-crafter" className="py-20 border-b border-[#1f2442] relative overflow-hidden">
      {/* Background starlight */}
      <div className="absolute inset-0 pointer-events-none cosmic-radial-bg opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-amber-300/90 mb-3">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Laboratorium Alkimia Natal</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#faf8f5] tracking-tight">
            Racik Parfum Personal Berdasarkan Tanggal Lahir
          </h2>
          <p className="text-sm sm:text-base text-[#9ea8c8] mt-3 leading-relaxed">
            Astrologi kuno dan perfumery modern bersatu. Masukkan data kelahiranmu untuk membedah posisi Matahari (Sun Sign), Bulan (Moon Sign), dan Titik Terbit (Rising Sign) menjadi satu botol wewangian bespoke khusus untukmu.
          </p>
        </div>

        {!calculatedFormula ? (
          /* Input Form Card */
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#0b0e24] border border-[#23294e] shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#8f99ba] uppercase tracking-wider mb-2">
                  Nama Pemilik / Penerima
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Selviana Kiki"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121630] border border-[#2b325c] rounded-lg text-[#f0ede6] placeholder-[#5e6687] text-sm focus:outline-none focus:border-amber-400/80"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase tracking-wider mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#121630] border border-[#2b325c] rounded-lg text-[#f0ede6] text-sm focus:outline-none focus:border-amber-400/80"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase tracking-wider mb-2">
                    Waktu Lahir (Opsional)
                  </label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#121630] border border-[#2b325c] rounded-lg text-[#f0ede6] text-sm focus:outline-none focus:border-amber-400/80"
                  />
                  <span className="text-[10px] text-[#6d7699] mt-1 block">Untuk menghitung Rising Sign secara presisi</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase tracking-wider mb-2">
                    Kota Kelahiran
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jakarta, Surabaya, Tokyo..."
                    value={birthCity}
                    onChange={(e) => setBirthCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#121630] border border-[#2b325c] rounded-lg text-[#f0ede6] text-sm placeholder-[#5e6687] focus:outline-none focus:border-amber-400/80"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase tracking-wider mb-2">
                    Karakter Aroma yang Diinginkan
                  </label>
                  <select
                    value={scentPreference}
                    onChange={(e) => setScentPreference(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-[#121630] border border-[#2b325c] rounded-lg text-[#f0ede6] text-sm focus:outline-none focus:border-amber-400/80"
                  >
                    <option value="unisex">Celestial Unisex (Seimbang & Mewah)</option>
                    <option value="feminine">Aura Feminin (Bunga & Manis Lembut)</option>
                    <option value="masculine">Aura Maskulin (Kayu & Rempah Gelap)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full py-3.5 px-6 rounded-xl font-cinzel font-semibold text-sm tracking-wider uppercase bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-105 active:scale-[0.99] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCalculating ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-black" />
                      Mengkalkulasi Peta Langit & Menyelaraskan Piramida Aroma...
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4" />
                      Hitung & Racik Formula Bespoke Saya
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Calculated Bespoke Result View */
          <div className="max-w-5xl mx-auto rounded-2xl bg-[#0a0d21] border border-amber-400/50 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#111636] via-[#1a214d] to-[#111636] p-6 sm:p-8 border-b border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-amber-300 uppercase">
                  REGISTRASI RESMI BESPOKE NATAL NO. {calculatedFormula.serialNumber}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#faf8f5] mt-1">
                  Formula Khusus: {calculatedFormula.recipientName}
                </h3>
                <p className="text-xs text-[#9ba6c7] mt-1">
                  Kelahiran {calculatedFormula.birthCity} · {calculatedFormula.birthDate} ({calculatedFormula.birthTime || '12:00'})
                </p>
              </div>

              <button
                onClick={() => setCalculatedFormula(null)}
                className="flex items-center gap-1.5 text-xs text-[#9aa4c4] hover:text-white px-3 py-1.5 rounded-lg border border-[#2b3359] bg-[#0c0f24]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Hitung Ulang
              </button>
            </div>

            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Simulated Bottle with Bespoke Engraving */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[280px] h-[360px] rounded-2xl overflow-hidden border border-amber-400/40 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-[#070914]">
                  <img
                    src="/src/assets/images/hero_celestial_perfume_1792500257257.jpg"
                    alt="Bespoke Natal Flacon"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Custom Engraved Plaque Simulator */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[86%] bg-[#080b18]/95 border border-amber-400/80 rounded-lg p-2.5 text-center backdrop-blur-md shadow-2xl">
                    <div className="text-[9px] uppercase tracking-[0.25em] text-amber-300/90 font-mono">
                      ASTRA BESPOKE NATAL
                    </div>
                    <div className="font-cinzel text-sm font-bold text-amber-100 tracking-wider truncate mt-0.5">
                      {calculatedFormula.recipientName.toUpperCase()}
                    </div>
                    <div className="text-[10px] text-amber-300/80 font-mono mt-0.5">
                      {calculatedFormula.serialNumber}
                    </div>
                    <div className="text-[9px] text-[#8e98b8] mt-1 pt-1 border-t border-amber-500/20">
                      Sun in {calculatedFormula.sunSign.toUpperCase()} · 50ml Extrait
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#14193d] border border-amber-400/40 text-amber-200 hover:border-amber-300 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    Lihat Sertifikat Astral
                  </button>
                </div>
              </div>

              {/* Right Column: Astrological Trinity & Scent Breakdown */}
              <div className="lg:col-span-7 space-y-6">
                {/* 3 Trinity Cards: Sun, Moon, Rising */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#0f1430] border border-[#262f59]">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                      <Sun className="w-3.5 h-3.5" /> Sun Sign
                    </div>
                    <div className="font-cinzel text-base font-bold text-white capitalize">
                      {calculatedFormula.sunSign}
                    </div>
                    <div className="text-[11px] text-[#8692b8] mt-0.5">
                      Jantung Aroma (Heart Notes)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0f1430] border border-[#262f59]">
                    <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-semibold mb-1">
                      <Moon className="w-3.5 h-3.5" /> Moon Sign
                    </div>
                    <div className="font-cinzel text-base font-bold text-white capitalize">
                      {calculatedFormula.moonSign}
                    </div>
                    <div className="text-[11px] text-[#8692b8] mt-0.5">
                      Jejak Jiwa Batin (Base Notes)
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0f1430] border border-[#262f59]">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> Rising Sign
                    </div>
                    <div className="font-cinzel text-base font-bold text-white capitalize">
                      {calculatedFormula.risingSign}
                    </div>
                    <div className="text-[11px] text-[#8692b8] mt-0.5">
                      Pancaran Luar (Top Notes)
                    </div>
                  </div>
                </div>

                {/* Poetic Cosmic Reading */}
                <div className="p-4 rounded-xl bg-[#0e122b] border border-[#1f264d] text-xs sm:text-sm text-[#c0c8e2] leading-relaxed">
                  <p>{calculatedFormula.cosmicReading}</p>
                </div>

                {/* Bespoke Olfactory Pyramid */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-[#0c0f24] border border-[#1d2347]">
                    <span className="text-emerald-300 font-semibold block mb-0.5">
                      Top Notes (Dipengaruhi Rising {calculatedFormula.risingSign.toUpperCase()}):
                    </span>
                    <span className="text-[#e2e6f5]">{calculatedFormula.topNotes.join(' · ')}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0c0f24] border border-[#1d2347]">
                    <span className="text-amber-300 font-semibold block mb-0.5">
                      Heart Notes (Dipengaruhi Sun {calculatedFormula.sunSign.toUpperCase()}):
                    </span>
                    <span className="text-[#e2e6f5]">{calculatedFormula.heartNotes.join(' · ')}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0c0f24] border border-[#1d2347]">
                    <span className="text-indigo-300 font-semibold block mb-0.5">
                      Base Notes (Dipengaruhi Moon {calculatedFormula.moonSign.toUpperCase()}):
                    </span>
                    <span className="text-[#e2e6f5]">{calculatedFormula.baseNotes.join(' · ')}</span>
                  </div>
                </div>

                {/* Purchase Action Box */}
                <div className="pt-4 border-t border-[#1d2347] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-[#7d87a8]">Bespoke Flacon 50ml Extrait + Box Beludru</div>
                    <div className="font-cinzel text-xl font-bold text-amber-300 tabular-nums">
                      {formatPrice(calculatedFormula.priceIdr, calculatedFormula.priceUsd, currency)}
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`w-full sm:w-auto py-3 px-8 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-105 active:scale-[0.99] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Telah Ditambahkan ke Keranjang!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Pesan Botol Natal Bespoke Saya
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Certificate of Authenticity */}
        {showCertificate && calculatedFormula && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#080b18] border-2 border-amber-400/80 rounded-2xl p-8 sm:p-12 shadow-[0_0_60px_rgba(212,175,55,0.25)] text-[#f0ede6] my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#141836] border border-[#2d355c] hover:text-white"
              >
                Tutup (Esc)
              </button>

              <div className="text-center border-b border-amber-400/40 pb-6 mb-6">
                <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-amber-300">
                  ASTRA SCENT HAUTE PARFUMERIE
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-100 tracking-wide mt-1">
                  CERTIFICATE OF ASTRAL FORMULATION
                </h3>
                <p className="text-[11px] font-mono text-[#8b96ba] mt-1">
                  SERIAL ID: {calculatedFormula.serialNumber}
                </p>
              </div>

              <div className="text-xs sm:text-sm text-[#b8bfdc] space-y-4 leading-relaxed text-center sm:text-left">
                <p>
                  Dengan ini disahkan bahwa formula parfum personal ini diracik secara eksklusif untuk:
                </p>
                <div className="text-center py-2">
                  <span className="font-cinzel text-2xl font-bold text-amber-300 underline underline-offset-8">
                    {calculatedFormula.recipientName}
                  </span>
                </div>
                <p>
                  Berdasarkan konstelasi langit kelahiran di <strong>{calculatedFormula.birthCity}</strong> pada tanggal <strong>{calculatedFormula.birthDate}</strong>:
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#21274f] text-center">
                  <div>
                    <span className="text-[10px] text-[#7a84a6] uppercase block">Sun Essence</span>
                    <strong className="text-white text-xs">{calculatedFormula.sunSign.toUpperCase()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7a84a6] uppercase block">Moon Subconscious</span>
                    <strong className="text-white text-xs">{calculatedFormula.moonSign.toUpperCase()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7a84a6] uppercase block">Rising Aura</span>
                    <strong className="text-white text-xs">{calculatedFormula.risingSign.toUpperCase()}</strong>
                  </div>
                </div>

                <div className="text-xs space-y-1 pt-2">
                  <div><strong>Top Notes:</strong> {calculatedFormula.topNotes.join(' · ')}</div>
                  <div><strong>Heart Notes:</strong> {calculatedFormula.heartNotes.join(' · ')}</div>
                  <div><strong>Base Notes:</strong> {calculatedFormula.baseNotes.join(' · ')}</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-400/40 flex items-center justify-between text-xs text-[#717b9c]">
                <div>
                  <div>Master Astrological Perfumer</div>
                  <div className="font-serif italic text-amber-200 text-sm mt-0.5">Astra Scent Paris & Grasse</div>
                </div>

                <button
                  onClick={handlePrintCertificate}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-black font-semibold hover:bg-amber-300 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Cetak / Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
