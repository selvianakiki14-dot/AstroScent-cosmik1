import { BespokeFormula, ZodiacElement, ZodiacSign } from '../types';
import { ZODIAC_PERFUMES } from '../data/zodiacData';

const ZODIAC_ORDER: ZodiacSign[] = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces'
];

export function getSunSign(month: number, day: number): ZodiacSign {
  // month: 1 = Jan, 12 = Dec
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}

export function getMoonSign(date: Date, timeStr?: string): ZodiacSign {
  // Approximate lunar position algorithm based on lunar cycle of 27.32 days
  const baseEpoch = new Date('2000-01-01T12:00:00Z').getTime();
  let targetTime = date.getTime();
  if (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      targetTime += (hours * 3600 + minutes * 60) * 1000;
    }
  }
  const daysSinceEpoch = (targetTime - baseEpoch) / (1000 * 60 * 60 * 24);
  // Moon mean longitude moves approx 13.176358 degrees per day
  const meanLongitude = (218.316 + 13.176396 * daysSinceEpoch) % 360;
  const normalizedLong = (meanLongitude + 360) % 360;
  const signIndex = Math.floor(normalizedLong / 30);
  return ZODIAC_ORDER[signIndex % 12];
}

export function getRisingSign(sunSign: ZodiacSign, birthTime?: string): ZodiacSign {
  const sunIndex = ZODIAC_ORDER.indexOf(sunSign);
  if (!birthTime) {
    // default to mid-morning if unspecified
    return ZODIAC_ORDER[(sunIndex + 2) % 12];
  }
  const [hours] = birthTime.split(':').map(Number);
  const hour = isNaN(hours) ? 12 : hours;
  // Ascendant advances roughly 1 sign every 2 hours, aligning with Sun around 06:00
  const hoursOffset = (hour - 6 + 24) % 24;
  const signOffset = Math.floor(hoursOffset / 2);
  return ZODIAC_ORDER[(sunIndex + signOffset) % 12];
}

export function getElementOfSign(sign: ZodiacSign): ZodiacElement {
  if (['aries', 'leo', 'sagittarius'].includes(sign)) return 'fire';
  if (['taurus', 'virgo', 'capricorn'].includes(sign)) return 'earth';
  if (['gemini', 'libra', 'aquarius'].includes(sign)) return 'air';
  return 'water';
}

export function generateBespokeFormula(
  recipientName: string,
  birthDateStr: string,
  birthTimeStr: string,
  birthCity: string
): BespokeFormula {
  const [yearStr, monthStr, dayStr] = birthDateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const dateObj = new Date(year, month - 1, day);

  const sunSign = getSunSign(month, day);
  const moonSign = getMoonSign(dateObj, birthTimeStr);
  const risingSign = getRisingSign(sunSign, birthTimeStr);

  const sunPerfume = ZODIAC_PERFUMES.find(p => p.zodiac === sunSign)!;
  const moonPerfume = ZODIAC_PERFUMES.find(p => p.zodiac === moonSign)!;
  const risingPerfume = ZODIAC_PERFUMES.find(p => p.zodiac === risingSign)!;

  // Calculate element distribution
  const elements = [
    getElementOfSign(sunSign),
    getElementOfSign(moonSign),
    getElementOfSign(risingSign)
  ];

  const counts: Record<ZodiacElement, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  elements.forEach(el => { counts[el] += 1; });
  
  let dominantElement: ZodiacElement = 'fire';
  let maxCount = -1;
  (Object.keys(counts) as ZodiacElement[]).forEach(el => {
    if (counts[el] > maxCount) {
      maxCount = counts[el];
      dominantElement = el;
    }
  });

  const elementPercentages = {
    fire: Math.round((counts.fire / 3) * 100),
    earth: Math.round((counts.earth / 3) * 100),
    air: Math.round((counts.air / 3) * 100),
    water: Math.round((counts.water / 3) * 100)
  };

  // Harmonize notes:
  // Rising Sign dictates Top Notes (initial projection & first impression)
  const topNotes = [risingPerfume.notes.top[0], sunPerfume.notes.top[1] || risingPerfume.notes.top[1], 'Cosmic Aldehydes'];
  // Sun Sign dictates Heart Notes (core soul identity & main accords)
  const heartNotes = [sunPerfume.notes.heart[0], moonPerfume.notes.heart[0] || sunPerfume.notes.heart[1], 'Astral Jasmine Absolu'];
  // Moon Sign dictates Base Notes (deepest emotional memory & sillage longevity)
  const baseNotes = [moonPerfume.notes.base[0], sunPerfume.notes.base[0], 'Sacred Golden Ambergris'];

  // Formulate unique code
  const hash = Math.abs(
    (recipientName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + day * 31 + month * 12 + year) % 9000
  ) + 1000;
  const serialNumber = `ASTRA-NATAL-${hash}`;

  const formulaName = `Bespoke Natal Flacon: ${sunPerfume.zodiacLabel}-${risingPerfume.zodiacLabel} Orbit`;

  const cosmicReading = `Berdasarkan peta langit kelahiranmu di ${birthCity}, jiwamu memancarkan keagungan Matahari di ${sunPerfume.zodiacLabel} (${sunPerfume.characterVibe}), dengan intuisi batin Bulan di ${moonPerfume.zodiacLabel}, serta aura awal Rising di ${risingPerfume.zodiacLabel}. Formula ini merangkai aroma pembuka ${topNotes[0]} yang mempesona pandangan pertama, beralih ke jantung ${heartNotes[0]} yang mencerminkan jati dirimu, dan berlabuh pada jejak abadi ${baseNotes[0]}.`;

  const astralAura = `${sunPerfume.elementLabel} × ${moonPerfume.elementLabel} Resonance`;

  return {
    recipientName,
    birthDate: birthDateStr,
    birthTime: birthTimeStr,
    birthCity,
    sunSign,
    moonSign,
    risingSign,
    dominantElement,
    elementPercentages,
    formulaName,
    serialNumber,
    topNotes,
    heartNotes,
    baseNotes,
    cosmicReading,
    astralAura,
    priceIdr: 1250000,
    priceUsd: 82
  };
}

export function formatPrice(idr: number, usd: number, currency: 'IDR' | 'USD'): string {
  if (currency === 'USD') {
    return `$${usd}`;
  }
  return `Rp ${idr.toLocaleString('id-ID')}`;
}
