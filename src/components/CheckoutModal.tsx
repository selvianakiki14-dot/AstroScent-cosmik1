import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, QrCode, Building, Printer, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/astrology';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
  currency: 'IDR' | 'USD';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  currency,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va' | 'card'>('qris');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    trackingId: string;
    date: string;
    totalIdr: number;
    totalUsd: number;
  } | null>(null);

  if (!isOpen) return null;

  const totalIdr = items.reduce((acc, i) => acc + i.priceIdr * i.quantity, 0);
  const totalUsd = items.reduce((acc, i) => acc + i.priceUsd * i.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const orderNum = Math.floor(1000 + Math.random() * 9000);
      const tracking = `ASTRA-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrder({
        orderId: `ORD-${orderNum}`,
        trackingId: tracking,
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
        totalIdr,
        totalUsd,
      });
      setIsProcessing(false);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090b1e] border border-amber-400/50 rounded-2xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-[#f0ede6] my-8">
        {!confirmedOrder ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#121633] border border-[#262e59] text-[#939ebd] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-[#1f264d] pb-4 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                Layanan Pengiriman Haute Parfumerie
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-white mt-1">
                Checkout Pesanan Eksklusif
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase mb-1.5">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#121633] border border-[#2b3563] rounded-lg text-xs text-white placeholder-[#5e678a] focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase mb-1.5">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#121633] border border-[#2b3563] rounded-lg text-xs text-white placeholder-[#5e678a] focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8f99ba] uppercase mb-1.5">
                  Email Notifikasi
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#121633] border border-[#2b3563] rounded-lg text-xs text-white placeholder-[#5e678a] focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase mb-1.5">
                    Alamat Lengkap Pengiriman
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jalan, No Rumah, RT/RW, Kecamatan"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#121633] border border-[#2b3563] rounded-lg text-xs text-white placeholder-[#5e678a] focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8f99ba] uppercase mb-1.5">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#121633] border border-[#2b3563] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-semibold text-[#8f99ba] uppercase mb-2">
                  Metode Pembayaran Aman
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'qris'
                        ? 'border-amber-400 bg-amber-400/20 text-white'
                        : 'border-[#262f59] bg-[#0f132e] text-[#8e98b8] hover:border-[#384378]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-amber-300" />
                    <span className="text-xs font-semibold block">QRIS</span>
                    <span className="text-[10px] text-[#8691b5]">GoPay / OVO / Dana</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('va')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'va'
                        ? 'border-amber-400 bg-amber-400/20 text-white'
                        : 'border-[#262f59] bg-[#0f132e] text-[#8e98b8] hover:border-[#384378]'
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1 text-amber-300" />
                    <span className="text-xs font-semibold block">Virtual Account</span>
                    <span className="text-[10px] text-[#8691b5]">BCA / Mandiri / BNI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-amber-400 bg-amber-400/20 text-white'
                        : 'border-[#262f59] bg-[#0f132e] text-[#8e98b8] hover:border-[#384378]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-300" />
                    <span className="text-xs font-semibold block">Kartu Kredit</span>
                    <span className="text-[10px] text-[#8691b5]">Visa / Mastercard</span>
                  </button>
                </div>
              </div>

              {/* Total Summary */}
              <div className="p-4 rounded-xl bg-[#0e122b] border border-[#212852] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#828cae]">Total Tagihan ({items.length} jenis item)</span>
                  <div className="font-cinzel text-xl font-bold text-amber-300 tabular-nums">
                    {formatPrice(totalIdr, totalUsd, currency)}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="py-3 px-6 rounded-xl font-cinzel font-semibold text-xs tracking-wider uppercase bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:brightness-105 active:scale-[0.99] transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? 'Memproses Pesanan...' : 'Konfirmasi & Bayar'}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
              PESANAN TELAH BERHASIL DIKONFIRMASI
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1 mb-2">
              Terima Kasih, {fullName}
            </h2>
            <p className="text-xs sm:text-sm text-[#a3aec9] max-w-md mx-auto mb-6">
              Botol parfum kosmikmu sedang dipersiapkan oleh master perfumer kami dengan presisi astronomis dan pengukiran nama pada plakat emas botol.
            </p>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-[#0c1029] border border-[#242b57] text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-[#7d87a8]">ID Pesanan:</span>
                <span className="font-mono text-white font-semibold">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7d87a8]">Resi Kurir Astral:</span>
                <span className="font-mono text-amber-300 font-semibold">{confirmedOrder.trackingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7d87a8]">Alamat Pengiriman:</span>
                <span className="text-white truncate max-w-[200px]">{address}, {city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7d87a8]">Total Pembayaran:</span>
                <span className="text-amber-200 font-semibold font-mono">
                  {formatPrice(confirmedOrder.totalIdr, confirmedOrder.totalUsd, currency)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#141838] border border-amber-400/40 text-amber-200 hover:text-white flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak Invoice & Sertifikat
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-amber-300 to-amber-500 text-black hover:brightness-105"
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
