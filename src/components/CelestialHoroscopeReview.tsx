import React, { useState } from 'react';
import { Sparkles, MessageSquare, Star, ShieldCheck, Moon, Plus, Check } from 'lucide-react';
import { CELESTIAL_REVIEWS, CELESTIAL_TRANSIT_HOROSCOPE, ZODIAC_PERFUMES } from '../data/zodiacData';
import { Review, ZodiacSign } from '../types';

export const CelestialHoroscopeReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(CELESTIAL_REVIEWS);
  const [selectedZodiacFilter, setSelectedZodiacFilter] = useState<string>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Review Form state
  const [authorName, setAuthorName] = useState('');
  const [city, setCity] = useState('');
  const [userZodiac, setUserZodiac] = useState<ZodiacSign>('scorpio');
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(ZODIAC_PERFUMES[0].id);
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [favoriteNote, setFavoriteNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (selectedZodiacFilter === 'all') return true;
    return r.zodiacSign === selectedZodiacFilter;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      city: city.trim() || 'Indonesia',
      zodiacSign: userZodiac,
      perfumeId: selectedPerfumeId,
      rating,
      date: 'Hari ini',
      headline: headline.trim() || 'Aroma Bintang yang Luar Biasa',
      comment: comment.trim(),
      favoriteNote: favoriteNote.trim() || 'Elemen Kosmik Murni',
      verifiedPurchase: true,
    };

    setReviews([newRev, ...reviews]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowReviewModal(false);
      // Reset form
      setAuthorName('');
      setHeadline('');
      setComment('');
      setFavoriteNote('');
    }, 1500);
  };

  return (
    <section className="py-20 border-b border-[#1f2442] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Celestial Transit Horoscope Banner */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-[#111538] via-[#1a2052] to-[#111538] border border-amber-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-amber-300/90 mb-2">
                <Moon className="w-4 h-4 text-amber-400" />
                <span>Horoskop & Transit Wewangian Kosmik</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                {CELESTIAL_TRANSIT_HOROSCOPE.currentPeriod}
              </h3>
              <p className="text-xs sm:text-sm text-[#b8c2e0] mt-1">
                Aspek Kosmik: <strong className="text-amber-200">{CELESTIAL_TRANSIT_HOROSCOPE.celestialAspect}</strong>
              </p>
              <p className="text-xs sm:text-sm text-[#a3aeca] mt-2 max-w-2xl leading-relaxed">
                {CELESTIAL_TRANSIT_HOROSCOPE.scentRecommendation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0d24]/90 border border-[#2b3569] max-w-sm shrink-0">
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block">
                Rekomendasi Duo Musim Ini:
              </span>
              <div className="font-cinzel text-sm font-bold text-white mt-1">
                {CELESTIAL_TRANSIT_HOROSCOPE.recommendedPairing.alchemyTitle}
              </div>
              <p className="text-[11px] text-[#939ebf] mt-1">
                {CELESTIAL_TRANSIT_HOROSCOPE.recommendedPairing.description}
              </p>
            </div>
          </div>
        </div>

        {/* Community Reviews Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300/90 mb-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Komunitas & Suara Penikmat Aroma</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#faf8f5] tracking-tight">
              Testimoni Resonansi Astral
            </h2>
            <p className="text-sm text-[#9ea8c8] mt-1">
              Pengalaman nyata dari para pecinta wewangian yang telah menemukan signature scent zodiak mereka.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#14193d] border border-amber-400/50 text-amber-200 hover:border-amber-300 hover:text-white transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            Tulis Pengalaman Parfum
          </button>
        </div>

        {/* Zodiac Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedZodiacFilter('all')}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedZodiacFilter === 'all'
                ? 'bg-amber-400/20 text-amber-200 border border-amber-400/50 font-medium'
                : 'text-[#8b95b8] hover:text-white bg-[#0d1028] border border-[#20274f]'
            }`}
          >
            Semua Zodiak ({reviews.length})
          </button>
          {['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].map((z) => {
            const count = reviews.filter((r) => r.zodiacSign === z).length;
            if (count === 0) return null;
            return (
              <button
                key={z}
                onClick={() => setSelectedZodiacFilter(z)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 capitalize ${
                  selectedZodiacFilter === z
                    ? 'bg-amber-400/20 text-amber-200 border border-amber-400/50 font-medium'
                    : 'text-[#8b95b8] hover:text-white bg-[#0d1028] border border-[#20274f]'
                }`}
              >
                {z} ({count})
              </button>
            );
          })}
        </div>

        {/* Reviews 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#0c0f24] border border-[#20274f] hover:border-amber-400/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#f0ede6]">{rev.author}</span>
                    <span className="text-xs text-[#717b9e]">· {rev.city}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#8691b5] mb-3">
                  <span className="capitalize text-amber-200 font-medium">Zodiak {rev.zodiacSign}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Pembelian Terverifikasi
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{rev.date}</span>
                </div>

                <h4 className="font-cinzel text-base font-semibold text-white mb-2">
                  "{rev.headline}"
                </h4>
                <p className="text-xs text-[#a9b3d4] leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1b2144] flex items-center justify-between text-[11px] text-[#717c9e]">
                <span>Nada Favorit: <strong className="text-amber-200/90">{rev.favoriteNote}</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Submit Review */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-[#090c21] border border-amber-400/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#f0ede6]">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#141836] border border-[#2d355c] hover:text-white"
              >
                ✕
              </button>

              <h3 className="font-cinzel text-xl font-bold text-white mb-1">
                Tulis Pengalaman Aroma Astral
              </h3>
              <p className="text-xs text-[#8c97ba] mb-6">
                Bagikan bagaimana wewangian ASTRA SCENT beresonansi dengan zodiak dan kepribadianmu.
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#8b96ba] uppercase mb-1">Nama</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap / panggilan"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#121630] border border-[#2b335c] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#8b96ba] uppercase mb-1">Kota</label>
                    <input
                      type="text"
                      placeholder="Contoh: Jakarta"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-[#121630] border border-[#2b335c] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#8b96ba] uppercase mb-1">Zodiakmu</label>
                    <select
                      value={userZodiac}
                      onChange={(e) => setUserZodiac(e.target.value as ZodiacSign)}
                      className="w-full px-3 py-2 bg-[#121630] border border-[#2b335c] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 capitalize"
                    >
                      {ZODIAC_PERFUMES.map((p) => (
                        <option key={p.zodiac} value={p.zodiac}>
                          {p.zodiacLabel} ({p.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#8b96ba] uppercase mb-1">Rating Bintang</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#121630] border border-[#2b335c] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={5}>★★★★★ (5/5) Sempurna</option>
                      <option value={4}>★★★★☆ (4/5) Sangat Bagus</option>
                      <option value={3}>★★★☆☆ (3/5) Cukup</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#8b96ba] uppercase mb-1">Judul Review</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Aroma paling mewah yang pernah saya pakai"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121630] border border-[#2b335c] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8b96ba] uppercase mb-1">Ulasan Pengalaman</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ceritakan sillage, ketahanan, respon orang lain, dan kecocokannya dengan energimu..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121630] border border-[#2b335c] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8b96ba] uppercase mb-1">Nada Aroma Favoritmu</label>
                  <input
                    type="text"
                    placeholder="Contoh: Saffron & Damask Rose"
                    value={favoriteNote}
                    onChange={(e) => setFavoriteNote(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121630] border border-[#2b335c] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-105 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-4 h-4" />
                        Ulasan Berhasil Dipublikasikan!
                      </>
                    ) : (
                      'Kirimkan Ulasan Kosmik'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
