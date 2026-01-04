export type SuitabilityStatus = "rojo" | "amarillo" | "verde";

export type PremiseKey = "suma" | "centro" | "historico";

export interface PremiseResult {
  key: PremiseKey;
  label: string;
  satisfied: boolean;
  detail: string;
}

export interface HistoryCheck {
  matches: number;
  total: number;
  matchedPositions: number[];
  isIdeal: boolean;
}

export interface SuitabilityResult {
  status: SuitabilityStatus;
  message: string;
  sum: number;
  variance: number;
  centralThreshold: number | null;
  satisfiedCount: number;
  totalPremises: number;
  premises: PremiseResult[];
  history?: HistoryCheck;
}

export interface EvaluationOptions {
  useHistory: boolean;
}

export interface GeneratedNumber {
  value: string;
  status: SuitabilityStatus;
  satisfiedCount: number;
  totalPremises: number;
}

const REQUIRED_HISTORY_MATCHES = 2;

export const HISTORICAL_BIASES = [
  {
    position: 0,
    label: "Decena de millar",
    favorites: [0, 1, 2, 3, 4],
    note: "Los numeros bajos dominan el historico."
  },
  {
    position: 3,
    label: "Decenas",
    favorites: [2],
    note: "La terminacion 20 se repite con frecuencia."
  },
  {
    position: 4,
    label: "Unidades",
    favorites: [0, 7, 9, 4],
    note: "El 0 lidera, 7/9/4 destacan."
  }
] as const;

export const HISTORICAL_NEUTRALS = [
  {
    position: 1,
    label: "Unidades de millar",
    note: "Sin sesgo claro en el historico."
  },
  {
    position: 2,
    label: "Centenas",
    note: "Sin sesgo claro en el historico."
  }
] as const;

const IDEAL_SUMS = new Set([22, 23]);
let cachedCentralThreshold: number | null = null;

export const normalizeInput = (value: string) =>
  value.replace(/\D/g, "").slice(0, 5);

export const formatNumber = (value: string) => value.padStart(5, "0");

export const digitsFromString = (value: string) => {
  if (!/^\d{5}$/.test(value)) return null;
  return value.split("").map(Number);
};

export const digitsFromNumber = (value: number) => {
  const d1 = Math.floor(value / 10000) % 10;
  const d2 = Math.floor(value / 1000) % 10;
  const d3 = Math.floor(value / 100) % 10;
  const d4 = Math.floor(value / 10) % 10;
  const d5 = value % 10;
  return [d1, d2, d3, d4, d5];
};

export const sumDigits = (digits: number[]) =>
  digits.reduce((acc, digit) => acc + digit, 0);

export const varianceFromDigits = (digits: number[]) => {
  const mean = 4.5;
  const total = digits.reduce((acc, digit) => acc + (digit - mean) ** 2, 0);
  return total / digits.length;
};

export const getCentralVarianceThreshold = () => {
  if (cachedCentralThreshold !== null) return cachedCentralThreshold;

  const variances: number[] = [];
  for (let i = 0; i < 100000; i += 1) {
    const digits = digitsFromNumber(i);
    const sum = sumDigits(digits);
    if (IDEAL_SUMS.has(sum)) {
      variances.push(varianceFromDigits(digits));
    }
  }
  variances.sort((a, b) => a - b);
  cachedCentralThreshold = variances[5999] ?? 0;
  return cachedCentralThreshold;
};

export const isCentralNumber = (digits: number[]) => {
  const sum = sumDigits(digits);
  if (!IDEAL_SUMS.has(sum)) return false;
  const threshold = getCentralVarianceThreshold();
  return varianceFromDigits(digits) <= threshold;
};

export const getHistoryCheck = (digits: number[]): HistoryCheck => {
  const matchedPositions: number[] = [];
  HISTORICAL_BIASES.forEach((bias) => {
    if (bias.favorites.includes(digits[bias.position])) {
      matchedPositions.push(bias.position);
    }
  });

  const matches = matchedPositions.length;
  const total = HISTORICAL_BIASES.length;
  return {
    matches,
    total,
    matchedPositions,
    isIdeal: matches >= REQUIRED_HISTORY_MATCHES
  };
};

const statusMessageMap: Record<SuitabilityStatus, string> = {
  verde: "Perfecto: cumple todas las premisas activas.",
  amarillo: "Interesante: cumple parte de las premisas.",
  rojo: "Poco favorable: no cumple las premisas."
};

export const evaluateNumber = (
  rawValue: string,
  options: EvaluationOptions
): SuitabilityResult | null => {
  const digits = digitsFromString(rawValue);
  if (!digits) return null;

  const sum = sumDigits(digits);
  const variance = varianceFromDigits(digits);
  const isSumIdeal = IDEAL_SUMS.has(sum);
  const centralThreshold = isSumIdeal ? getCentralVarianceThreshold() : null;
  const isCentral = isSumIdeal && centralThreshold !== null && variance <= centralThreshold;
  const history = options.useHistory ? getHistoryCheck(digits) : undefined;

  const premises: PremiseResult[] = [
    {
      key: "suma",
      label: "Suma 22/23",
      satisfied: isSumIdeal,
      detail: `Suma ${sum}`
    },
    {
      key: "centro",
      label: "Centro de los 6.000",
      satisfied: isCentral,
      detail: isSumIdeal
        ? `Varianza ${variance.toFixed(2)} - Umbral ${centralThreshold?.toFixed(2)}`
        : "Necesita sumar 22 o 23"
    }
  ];

  if (options.useHistory && history) {
    premises.push({
      key: "historico",
      label: "Sesgo historico",
      satisfied: history.isIdeal,
      detail: `${history.matches}/${history.total} posiciones con sesgo`
    });
  }

  const satisfiedCount = premises.filter((premise) => premise.satisfied).length;
  const totalPremises = premises.length;
  const status: SuitabilityStatus =
    satisfiedCount === totalPremises
      ? "verde"
      : satisfiedCount === 0
      ? "rojo"
      : "amarillo";

  return {
    status,
    message: statusMessageMap[status],
    sum,
    variance,
    centralThreshold,
    satisfiedCount,
    totalPremises,
    premises,
    history
  };
};

export const generateSuggestedNumbers = (
  count: number,
  options: EvaluationOptions,
  rng: () => number = Math.random
): GeneratedNumber[] => {
  const poolSize = Math.max(240, count * 80);
  const pool = new Map<string, GeneratedNumber>();

  for (let i = 0; i < poolSize; i += 1) {
    const value = Math.floor(rng() * 100000);
    const formatted = formatNumber(value.toString());
    if (pool.has(formatted)) continue;

    const evaluation = evaluateNumber(formatted, options);
    if (!evaluation) continue;

    pool.set(formatted, {
      value: formatted,
      status: evaluation.status,
      satisfiedCount: evaluation.satisfiedCount,
      totalPremises: evaluation.totalPremises
    });
  }

  return Array.from(pool.values())
    .sort((a, b) => {
      if (a.satisfiedCount !== b.satisfiedCount) {
        return b.satisfiedCount - a.satisfiedCount;
      }
      return a.value.localeCompare(b.value);
    })
    .slice(0, count);
};
