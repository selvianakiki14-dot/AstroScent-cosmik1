import React from 'react';
import { Sparkles, Moon, Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1a1f3d] bg-[#05060d] text-[#8690af] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#161a33]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-300/40 flex items-center justify-center text-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <span className="font-cinzel text-lg font-bold tracking-[0.25em] text-[#faf8f5]">
                ASTRA SCENT
              </span>
            </div>

            <p className="text-xs text-[#959ebc] leading-relaxed max-w-sm">
              Your Zodiac, Your Signature Scent. Menggabungkan kemurnian seni perfumery Prancis dengan kearifan peta kosmik langit untuk menciptakan identitas aroma yang abadi.
            </p>

            <div className="flex items-center gap-3 text-[11px] text-[#717b9c] pt-2">
              <span>Haute Parfumerie</span>
              <span aria-hidden="true">·</span>
              <span>Grasse & Jakarta</span>
              <span aria-hidden="true">·</span>
              <span>32% Extrait de Parfum</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="font-cinzel text-xs font-semibold uppercase tracking-wider text-white">
              Eksplorasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#collection" className="hover:text-amber-200 transition-colors">
                  12 Koleksi Zodiak
                </a>
              </li>
              <li>
                <a href="#natal-crafter" className="hover:text-amber-200 transition-colors">
                  Racik Natal Lahir
                </a>
              </li>
              <li>
                <a href="#aura-quiz" className="hover:text-amber-200 transition-colors">
                  Kuis Mood & Aura
                </a>
              </li>
              <li>
                <a href="#layering-lab" className="hover:text-amber-200 transition-colors">
                  Layering Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Sanctuary */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="font-cinzel text-xs font-semibold uppercase tracking-wider text-white">
              Layanan Eksklusif
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#discovery-set" className="hover:text-amber-200 transition-colors">
                  Discovery Sample Set
                </a>
              </li>
              <li>
                <span className="text-[#6d7798]">Gratis Custom Engraving</span>
              </li>
              <li>
                <span className="text-[#6d7798]">Sertifikat Keaslian Astral</span>
              </li>
              <li>
                <span className="text-[#6d7798]">Garansi Kemurnian Ekstrak</span>
              </li>
            </ul>
          </div>

          {/* Scent Care & Contact */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-cinzel text-xs font-semibold uppercase tracking-wider text-white">
              Sanctuarium Pelanggan
            </h4>
            <p className="text-xs text-[#8c96b8] leading-relaxed">
              Konsultasi formula astrologi personal & layanan korporat:
            </p>
            <div className="text-xs font-mono text-amber-300">concierge@astrascent.id</div>
            <div className="text-[11px] text-[#6d7798] pt-1">
              Boutique: Pacific Place Level 3, Jakarta Selatan
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5d6787]">
          <div>
            © 2026 ASTRA SCENT. All celestial rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privasi Kosmik</span>
            <span>Syarat Layanan</span>
            <span>Etika Perfumery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
