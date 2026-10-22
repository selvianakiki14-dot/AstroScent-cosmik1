export type ZodiacSign = 
  | 'aries' 
  | 'taurus' 
  | 'gemini' 
  | 'cancer' 
  | 'leo' 
  | 'virgo' 
  | 'libra' 
  | 'scorpio' 
  | 'sagittarius' 
  | 'capricorn' 
  | 'aquarius' 
  | 'pisces';

export type ZodiacElement = 'fire' | 'earth' | 'air' | 'water';

export interface ScentNote {
  name: string;
  category: 'citrus' | 'floral' | 'woody' | 'spicy' | 'amber' | 'aquatic' | 'gourmand' | 'green';
  description: string;
}

export interface OlfactoryPyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ScentAccord {
  name: string;
  percentage: number;
  color: string;
}

export interface Perfume {
  id: string;
  name: string;
  zodiac: ZodiacSign;
  zodiacLabel: string;
  zodiacDateRange: string;
  element: ZodiacElement;
  elementLabel: string;
  rulingPlanet: string;
  celestialStone: string;
  tagline: string;
  description: string;
  characterVibe: string;
  auraColor: string;
  notes: OlfactoryPyramid;
  accords: ScentAccord[];
  longevity: string;
  sillage: string;
  bestSeason: string;
  priceIdr50ml: number;
  priceIdr100ml: number;
  priceIdr5ml: number;
  priceUsd50ml: number;
  priceUsd100ml: number;
  priceUsd5ml: number;
  rating: number;
  reviewCount: number;
  image: string;
  symbol: string;
  constellation: string;
  moodKeywords: string[];
  ritualText: string;
}

export interface CartItem {
  id: string;
  perfumeId: string;
  name: string;
  zodiacSign?: ZodiacSign;
  size: '5ml' | '50ml' | '100ml' | 'discovery-set';
  priceIdr: number;
  priceUsd: number;
  quantity: number;
  engraving?: string;
  image: string;
  isBespoke?: boolean;
  bespokeDetails?: {
    sunSign: ZodiacSign;
    moonSign: ZodiacSign;
    risingSign: ZodiacSign;
    recipientName: string;
    serialCode: string;
  };
  discoveryItems?: string[];
}

export interface BespokeFormula {
  recipientName: string;
  birthDate: string;
  birthTime?: string;
  birthCity: string;
  sunSign: ZodiacSign;
  moonSign: ZodiacSign;
  risingSign: ZodiacSign;
  dominantElement: ZodiacElement;
  elementPercentages: {
    fire: number;
    earth: number;
    air: number;
    water: number;
  };
  formulaName: string;
  serialNumber: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  cosmicReading: string;
  astralAura: string;
  priceIdr: number;
  priceUsd: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  zodiacSign: ZodiacSign;
  perfumeId: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  favoriteNote: string;
  verifiedPurchase: boolean;
}
