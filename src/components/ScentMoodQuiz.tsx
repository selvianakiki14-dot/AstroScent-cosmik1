import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { ZODIAC_PERFUMES } from '../data/zodiacData';
import { Perfume, ZodiacSign } from '../types';

interface ScentMoodQuizProps {
  onSelectPerfume: (perfume: Perfume) => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    signWeight: ZodiacSign;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Bagaimana suasana hati atau getaran energimu saat ini?',
    subtitle: 'Dengarkan bisikan batin terdalam tanpa ragu.',
    options: [
      {
        label: 'Membara & Penuh Tekad Ambisi',
        description: 'Siap menaklukkan tantangan dan memimpin langkah.',
        signWeight: 'aries'
      },
      {
        label: 'Menginginkan Ketenangan & Kehangatan Intim',
        description: 'Mencari kenyamanan damai dan rasa aman batin.',
        signWeight: 'cancer'
      },
      {
        label: 'Bercahaya, Penuh Ide & Ingin Bergaul',
        description: 'Pikiran aktif mencari inspirasi dan percakapan cerdas.',
        signWeight: 'gemini'
      },
      {
        label: 'Misterius, Intens & Menghanyutkan',
        description: 'Menyimpan misteri mendalam dengan pesona magnetis.',
        signWeight: 'scorpio'
      }
    ]
  },
  {
    id: 2,
    question: 'Energi kosmik apa yang ingin kamu pancarkan ke sekeliling?',
    subtitle: 'Aura yang akan dirasakan orang saat kamu melangkah masuk ke ruangan.',
    options: [
      {
        label: 'Keagungan Matahari & Daya Tarik Megah',
        description: 'Memukau perhatian dengan wibawa dan aura emas hangat.',
        signWeight: 'leo'
      },
      {
        label: 'Keanggunan Sutra Romantis & Harmoni',
        description: 'Lembut menggoda, estetis, dan membuat orang terpikat.',
        signWeight: 'libra'
      },
      {
        label: 'Kewibawaan Abadi & Keteguhan Elegan',
        description: 'Kokoh, dewasa, profesional, dan berwawasan masa depan.',
        signWeight: 'capricorn'
      },
      {
        label: 'Sentuhan Mistik Samudra & Kedalaman Jiwa',
        description: 'Puitis, menyejukkan, dan sarat intuisi emosional tinggi.',
        signWeight: 'pisces'
      }
    ]
  },
  {
    id: 3,
    question: 'Nuansa aroma alami mana yang paling memanggil indramu?',
    subtitle: 'Pilih aroma yang membuatmu spontan menarik napas panjang.',
    options: [
      {
        label: 'Rempah Hangat, Saffron & Kayu Berasap',
        description: 'Kombinasi amber, lada eksotis, dan kayu cedar megah.',
        signWeight: 'sagittarius'
      },
      {
        label: 'Vetiver Bersih, Kapulaga & Linen Segar',
        description: 'Aroma bersih murni, presisi, dan elegan tanpa cela.',
        signWeight: 'virgo'
      },
      {
        label: 'Florentine Orris, Daun Ara & Vanilla Bourbon',
        description: 'Sensual, gurih mewah, dan terasa kaya di kulit.',
        signWeight: 'taurus'
      },
      {
        label: 'Ozonik Dingin, Iris Perak & White Amber',
        description: 'Avant-garde, segar seperti atmosfer bintang, sangat unik.',
        signWeight: 'aquarius'
      }
    ]
  }
];

export const ScentMoodQuiz: React.FC<ScentMoodQuizProps> = ({ onSelectPerfume }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSigns, setSelectedSigns] = useState<ZodiacSign[]>([]);
  const [matchedPerfume, setMatchedPerfume] = useState<Perfume | null>(null);

  const handleSelectOption = (sign: ZodiacSign) => {
    const updated = [...selectedSigns, sign];
    setSelectedSigns(updated);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Pick the strongest matching sign or last choice
      const recommendedSign = updated[updated.length - 1];
      const match = ZODIAC_PERFUMES.find((p) => p.zodiac === recommendedSign) || ZODIAC_PERFUMES[0];
      setMatchedPerfume(match);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedSigns([]);
    setMatchedPerfume(null);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <section id="aura-quiz" className="py-20 border-b border-[#1f2442] relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300/90 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Scent Mood & Aura Alchemist</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#faf8f5] tracking-tight">
            Temukan Aroma Berdasarkan Suasana Hati & Karakter
          </h2>
          <p className="text-sm sm:text-base text-[#9ea8c8] mt-2 max-w-xl mx-auto">
            Hanya butuh 3 pertanyaan intuitif untuk mendeteksi frekuensi energi batinmu hari ini dan menemukan aroma kosmik yang tepat.
          </p>
        </div>

        {!matchedPerfume ? (
          <div className="rounded-2xl bg-[#0c0f24] border border-[#20274f] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            {/* Step Indicator */}
            <div className="flex items-center justify-between text-xs text-[#7e88ab] mb-6 pb-4 border-b border-[#1b2042]">
              <span>Pertanyaan {currentStep + 1} dari {QUIZ_QUESTIONS.length}</span>
              <span className="font-mono text-amber-300">
                {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Resonansi
              </span>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
              {currentQuestion.question}
            </h3>
            <p className="text-xs sm:text-sm text-[#8f99ba] mb-8">
              {currentQuestion.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.signWeight)}
                  className="p-5 rounded-xl bg-[#111533] hover:bg-[#181e47] border border-[#232b57] hover:border-amber-400/70 text-left transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#f0ede6] group-hover:text-amber-200 transition-colors">
                      {option.label}
                    </div>
                    <p className="text-xs text-[#8d96b5] mt-1.5 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <span className="text-[11px] font-medium text-amber-300/80 group-hover:text-amber-200 flex items-center gap-1">
                      Pilih getaran ini
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Matched Result Card */
          <div className="rounded-2xl bg-[#0b0e26] border border-amber-400/60 p-6 sm:p-10 shadow-[0_25px_60px_rgba(212,175,55,0.15)] text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-48 h-56 rounded-xl overflow-hidden border border-amber-400/40 shrink-0 bg-[#070914]">
                <img
                  src={matchedPerfume.image}
                  alt={matchedPerfume.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-amber-300 uppercase tracking-widest mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Resonansi Kosmik 98.4% Cocok</span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {matchedPerfume.name} · {matchedPerfume.zodiacLabel} {matchedPerfume.symbol}
                </h3>
                <p className="text-xs font-serif italic text-amber-200 mb-3">
                  "{matchedPerfume.tagline}"
                </p>

                <p className="text-xs sm:text-sm text-[#a4adcb] leading-relaxed mb-4">
                  {matchedPerfume.description}
                </p>

                <div className="p-3 rounded-lg bg-[#111638] border border-[#212954] text-xs text-[#ccd3ea] mb-6">
                  <strong>Ritual Pemakaian:</strong> {matchedPerfume.ritualText}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectPerfume(matchedPerfume)}
                    className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:brightness-105 transition-all shadow-md"
                  >
                    Buka Flacon & Pesan
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-lg text-xs font-medium text-[#9ba4c4] hover:text-white border border-[#273059] flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Ulangi Kuis
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
