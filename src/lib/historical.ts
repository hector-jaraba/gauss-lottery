import data from "@/data/historical-numbers.json";

export interface HistoryCheck {
  matches: number;
  total: number;
  matchedPositions: number[];
  requiredMatches: number;
  hasData: boolean;
  isIdeal: boolean;
}

export interface HistoricalBias {
  position: number;
  label: string;
  favorites: number[];
  note: string;
}

export interface HistoricalNeutral {
  position: number;
  label: string;
  note: string;
}

export interface HistoricalInsights {
  totalDraws: number;
  yearRange: { min: number; max: number } | null;
  requiredMatches: number;
  biases: HistoricalBias[];
  neutrals: HistoricalNeutral[];
}

type HistoricalNumberInput = {
  number: string | number;
  year: number;
  prize: number;
};

type HistoricalEntry = {
  number: string;
  digits: number[];
  year: number;
  prize: number;
};

const POSITION_LABELS = [
  "Decena de millar",
  "Unidad de millar",
  "Centenas",
  "Decenas",
  "Unidades"
];

const MIN_HISTORY_COUNT = 5;
const REQUIRED_MATCHES_DEFAULT = 2;

const formatHistoricalNumber = (value: string | number) => {
  const raw = typeof value === "number" ? value.toString() : value;
  const cleaned = raw.replace(/\D/g, "");
  if (!cleaned) return null;
  const padded = cleaned.padStart(5, "0").slice(-5);
  return /^\d{5}$/.test(padded) ? padded : null;
};

const parseHistoricalData = (input: HistoricalNumberInput[]): HistoricalEntry[] =>
  input
    .map((item) => {
      const formatted = formatHistoricalNumber(item.number);
      if (!formatted) return null;
      return {
        number: formatted,
        digits: formatted.split("").map(Number),
        year: item.year,
        prize: item.prize
      };
    })
    .filter((item): item is HistoricalEntry => Boolean(item));

const selectFavorites = (counts: number[], total: number) => {
  if (total < MIN_HISTORY_COUNT) return [] as number[];
  const mean = total / counts.length;
  const variance =
    counts.reduce((acc, count) => acc + (count - mean) ** 2, 0) / counts.length;
  const std = Math.sqrt(variance);
  if (std === 0) return [] as number[];
  const threshold = mean + std * 0.6;
  const favorites = counts
    .map((count, index) => (count >= threshold ? index : -1))
    .filter((value) => value >= 0);
  if (favorites.length) return favorites;
  const max = Math.max(...counts);
  return counts
    .map((count, index) => (count === max ? index : -1))
    .filter((value) => value >= 0);
};

const buildInsights = () => {
  const entries = parseHistoricalData(data as HistoricalNumberInput[]);
  const totalDraws = entries.length;
  const years = entries.map((entry) => entry.year).filter((year) => Number.isFinite(year));
  const yearRange = years.length
    ? { min: Math.min(...years), max: Math.max(...years) }
    : null;

  const positionCounts = Array.from({ length: 5 }, () => Array(10).fill(0));
  entries.forEach((entry) => {
    entry.digits.forEach((digit, index) => {
      positionCounts[index][digit] += 1;
    });
  });

  const favoritesByPosition = positionCounts.map((counts) =>
    selectFavorites(counts, totalDraws)
  );

  const biases: HistoricalBias[] = [];
  const neutrals: HistoricalNeutral[] = [];

  favoritesByPosition.forEach((favorites, position) => {
    if (favorites.length) {
      biases.push({
        position,
        label: POSITION_LABELS[position],
        favorites,
        note: "Sesgo calculado por frecuencia historica."
      });
    } else {
      neutrals.push({
        position,
        label: POSITION_LABELS[position],
        note: "Sin sesgo claro en la muestra."
      });
    }
  });

  const requiredMatches = biases.length
    ? Math.min(REQUIRED_MATCHES_DEFAULT, biases.length)
    : 0;

  return {
    totalDraws,
    yearRange,
    requiredMatches,
    biases,
    neutrals,
    favoritesByPosition,
    positionCounts
  };
};

const cachedInsights = buildInsights();

export const getHistoricalInsights = (): HistoricalInsights => ({
  totalDraws: cachedInsights.totalDraws,
  yearRange: cachedInsights.yearRange,
  requiredMatches: cachedInsights.requiredMatches,
  biases: cachedInsights.biases,
  neutrals: cachedInsights.neutrals
});

export const getHistoryCheck = (digits: number[]): HistoryCheck => {
  const matchedPositions: number[] = [];
  cachedInsights.biases.forEach((bias) => {
    if (bias.favorites.includes(digits[bias.position])) {
      matchedPositions.push(bias.position);
    }
  });

  const matches = matchedPositions.length;
  const total = cachedInsights.biases.length;
  const requiredMatches = cachedInsights.requiredMatches;
  const hasData = cachedInsights.totalDraws > 0;
  const isIdeal = total > 0 && matches >= requiredMatches;

  return {
    matches,
    total,
    matchedPositions,
    requiredMatches,
    hasData,
    isIdeal
  };
};
