import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ZodiacCollection } from './components/ZodiacCollection';
import { PerfumeDetailModal } from './components/PerfumeDetailModal';
import { NatalPerfumeCrafter } from './components/NatalPerfumeCrafter';
import { ScentMoodQuiz } from './components/ScentMoodQuiz';
import { ScentLayeringLab } from './components/ScentLayeringLab';
import { DiscoverySetBuilder } from './components/DiscoverySetBuilder';
import { CelestialHoroscopeReview } from './components/CelestialHoroscopeReview';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { BespokeFormula, CartItem, Perfume, ZodiacSign } from './types';
import { ZODIAC_PERFUMES } from './data/zodiacData';

export default function App() {
  const [currency, setCurrency] = useState<'IDR' | 'USD'>('IDR');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPerfumeForModal, setSelectedPerfumeForModal] = useState<Perfume | null>(null);
  const [selectedZodiacFilter, setSelectedZodiacFilter] = useState<string | null>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'IDR' ? 'USD' : 'IDR'));
  };

  const handleSelectZodiacFromHero = (sign: ZodiacSign) => {
    const targetPerfume = ZODIAC_PERFUMES.find((p) => p.zodiac === sign);
    if (targetPerfume) {
      setSelectedPerfumeForModal(targetPerfume);
    }
  };

  const handleNavigateToNatal = () => {
    const el = document.getElementById('natal-crafter');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateToCollection = () => {
    setSelectedZodiacFilter(null);
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (perfume: Perfume, size: '5ml' | '50ml' | '100ml', engraving?: string) => {
    const priceIdr =
      size === '100ml'
        ? perfume.priceIdr100ml
        : size === '5ml'
        ? perfume.priceIdr5ml
        : perfume.priceIdr50ml;

    const priceUsd =
      size === '100ml'
        ? perfume.priceUsd100ml
        : size === '5ml'
        ? perfume.priceUsd5ml
        : perfume.priceUsd50ml;

    const itemId = `${perfume.id}-${size}-${engraving || 'plain'}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: itemId,
          perfumeId: perfume.id,
          name: perfume.name,
          zodiacSign: perfume.zodiac,
          size,
          priceIdr,
          priceUsd,
          quantity: 1,
          engraving,
          image: perfume.image,
        },
      ];
    });
  };

  const handleAddBespokeToCart = (formula: BespokeFormula) => {
    const itemId = `bespoke-${formula.serialNumber}`;
    setCartItems((prev) => [
      ...prev,
      {
        id: itemId,
        perfumeId: 'bespoke-natal',
        name: `Bespoke Natal: ${formula.recipientName}`,
        size: '50ml',
        priceIdr: formula.priceIdr,
        priceUsd: formula.priceUsd,
        quantity: 1,
        engraving: formula.recipientName.toUpperCase(),
        image: '/src/assets/images/hero_celestial_perfume_1792500257257.jpg',
        isBespoke: true,
        bespokeDetails: {
          sunSign: formula.sunSign,
          moonSign: formula.moonSign,
          risingSign: formula.risingSign,
          recipientName: formula.recipientName,
          serialCode: formula.serialNumber,
        },
      },
    ]);
    setIsCartOpen(true);
  };

  const handleAddDuoToCart = (p1: Perfume, p2: Perfume) => {
    // 15% discount bundle
    const duoId = `duo-${p1.id}-${p2.id}`;
    const priceIdr = Math.round((p1.priceIdr50ml + p2.priceIdr50ml) * 0.85);
    const priceUsd = Math.round((p1.priceUsd50ml + p2.priceUsd50ml) * 0.85);

    setCartItems((prev) => [
      ...prev,
      {
        id: duoId,
        perfumeId: duoId,
        name: `Layering Duo: ${p1.name} & ${p2.name}`,
        size: '50ml',
        priceIdr,
        priceUsd,
        quantity: 1,
        image: p1.image,
      },
    ]);
    setIsCartOpen(true);
  };

  const handleAddDiscoverySet = (selectedPerfumes: Perfume[]) => {
    const names = selectedPerfumes.map((p) => p.name).join(', ');
    const setId = `discovery-${Date.now()}`;
    setCartItems((prev) => [
      ...prev,
      {
        id: setId,
        perfumeId: 'discovery-set-4x5ml',
        name: 'The Constellations Discovery Vault (4 × 5ml)',
        size: 'discovery-set',
        priceIdr: 649000,
        priceUsd: 42,
        quantity: 1,
        image: '/src/assets/images/discovery_sample_vault_1792500259529.jpg',
        discoveryItems: selectedPerfumes.map((p) => `${p.zodiacLabel}: ${p.name}`),
      },
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#06070e] text-[#e8e6e0] flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-[#fdfcf7]">
      {/* Top Bar Contract Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Main Experience Flow */}
      <main className="flex-grow">
        {/* Campaign Hero with 12-Zodiac Wheel */}
        <Hero
          onSelectZodiac={handleSelectZodiacFromHero}
          onNavigateToNatal={handleNavigateToNatal}
          onNavigateToCollection={handleNavigateToCollection}
        />

        {/* 12 Zodiac Perfume Collection */}
        <ZodiacCollection
          onSelectPerfume={(perfume) => setSelectedPerfumeForModal(perfume)}
          currency={currency}
          selectedZodiacFilter={selectedZodiacFilter}
          onClearZodiacFilter={() => setSelectedZodiacFilter(null)}
        />

        {/* Natal Perfume Crafter (Personal Birthdate Generator) */}
        <NatalPerfumeCrafter
          onAddBespokeToCart={handleAddBespokeToCart}
          currency={currency}
        />

        {/* Scent Mood & Aura Quiz */}
        <ScentMoodQuiz
          onSelectPerfume={(perfume) => setSelectedPerfumeForModal(perfume)}
        />

        {/* Digital Scent Layering Lab */}
        <ScentLayeringLab
          onAddDuoToCart={handleAddDuoToCart}
          currency={currency}
        />

        {/* Discovery Sample Set Vault Builder */}
        <DiscoverySetBuilder
          onAddDiscoverySet={handleAddDiscoverySet}
          currency={currency}
        />

        {/* Celestial Horoscope & Community Reviews */}
        <CelestialHoroscopeReview />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <PerfumeDetailModal
        perfume={selectedPerfumeForModal}
        onClose={() => setSelectedPerfumeForModal(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        currency={currency}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
        currency={currency}
      />
    </div>
  );
}
