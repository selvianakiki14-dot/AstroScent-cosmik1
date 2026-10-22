import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Tag, ArrowRight, Gift } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/astrology';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  currency: 'IDR' | 'USD';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency,
}) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [voucherError, setVoucherError] = useState('');

  if (!isOpen) return null;

  const rawSubtotalIdr = items.reduce((acc, item) => acc + item.priceIdr * item.quantity, 0);
  const rawSubtotalUsd = items.reduce((acc, item) => acc + item.priceUsd * item.quantity, 0);

  const discountIdr = Math.round(rawSubtotalIdr * appliedDiscount);
  const discountUsd = Math.round(rawSubtotalUsd * appliedDiscount);

  const totalIdr = Math.max(0, rawSubtotalIdr - discountIdr);
  const totalUsd = Math.max(0, rawSubtotalUsd - discountUsd);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherCode.trim().toUpperCase();
    if (code === 'COSMIC10') {
      setAppliedDiscount(0.1);
      setVoucherError('');
    } else if (code === 'ASTRAVIP') {
      setAppliedDiscount(0.15);
      setVoucherError('');
    } else {
      setVoucherError('Kode voucher tidak valid. Coba: COSMIC10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090b1c] border-l border-[#222952] text-[#edebe6] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-[#1b2144] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-cinzel text-lg font-bold text-white tracking-wider">
                Keranjang Kosmik ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#141838] border border-[#262e59] text-[#939ebd] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#121633] border border-[#27305c] flex items-center justify-center text-[#6e779b] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-base font-semibold text-white">
                  Keranjangmu Masih Kosong
                </h3>
                <p className="text-xs text-[#8c97ba] max-w-xs mx-auto mt-1 mb-6">
                  Pilih salah satu dari 12 aroma zodiak atau racik wewangian natal bespoke sesuai tanggal lahirmu.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:brightness-105"
                >
                  Mulai Jelajahi Aroma
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#0e122b] border border-[#20274f] flex gap-3 relative"
                  >
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-[#070914] shrink-0 border border-[#232b57]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#6d779b] hover:text-red-400 p-0.5"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-amber-300/90 font-medium">
                          {item.size.toUpperCase()} {item.isBespoke && '· NATAL BESPOKE'}
                        </div>

                        {item.engraving && (
                          <div className="text-[10px] text-amber-200/80 font-mono truncate">
                            Grafir: "{item.engraving}"
                          </div>
                        )}
                        {item.bespokeDetails && (
                          <div className="text-[9px] text-[#8692b8] truncate">
                            Sun: {item.bespokeDetails.sunSign.toUpperCase()} · ID: {item.bespokeDetails.serialCode}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1b2247]">
                        <div className="flex items-center gap-2 bg-[#141838] border border-[#28325e] rounded-md px-1.5 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-[#9ea8c8] hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold tabular-nums px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-[#9ea8c8] hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-cinzel text-xs font-bold text-amber-300 tabular-nums">
                          {formatPrice(item.priceIdr * item.quantity, item.priceUsd * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Complimentary Perks Banner */}
                <div className="p-3 rounded-xl bg-[#11173d] border border-amber-400/30 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-400/20 text-amber-300 shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Bonus Sampel Astral Misteri (2ml)</span>
                    <span className="text-[10px] text-[#9ba5c7]">Gratis disertakan bersama setiap pesananmu.</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#1c2247] bg-[#070917] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kode voucher (cth: COSMIC10)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-[#121633] border border-[#29325c] rounded-lg text-white placeholder-[#606a8f] uppercase tracking-wider focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#1a204d] text-amber-200 border border-[#323d75] hover:border-amber-400"
                >
                  Terapkan
                </button>
              </form>
              {voucherError && <p className="text-[11px] text-red-400">{voucherError}</p>}
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  ✦ Voucher berhasil: Diskon {appliedDiscount * 100}% aktif!
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#9aa4c4]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-mono">
                    {formatPrice(rawSubtotalIdr, rawSubtotalUsd, currency)}
                  </span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Diskon Voucher</span>
                    <span className="tabular-nums font-mono">
                      -{formatPrice(discountIdr, discountUsd, currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pengiriman Beludru Mewah</span>
                  <span className="text-emerald-400 font-semibold">GRATIS</span>
                </div>
                <div className="pt-2 border-t border-[#1d2449] flex justify-between text-sm font-bold text-white">
                  <span>Total Pembayaran</span>
                  <span className="font-cinzel text-base text-amber-300 tabular-nums">
                    {formatPrice(totalIdr, totalUsd, currency)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-xl font-cinzel font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black hover:brightness-105 active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2"
              >
                <span>Lanjutkan ke Checkout Eksklusif</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
