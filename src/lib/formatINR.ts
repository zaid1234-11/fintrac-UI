/**
 * formatINR.ts — Currency formatting utility.
 * SOURCED from CONCEPT_V3.2 §3.3.
 * 
 * Uses Indian Rupee formatting with en-IN locale.
 * All financial display components use this for consistency.
 */

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const formatterWithDecimals = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

/**
 * Format a number as INR currency (no decimals).
 * Example: formatINR(24500) → "₹24,500"
 */
export function formatINR(amount: number): string {
  return formatter.format(amount);
}

/**
 * Format a number as INR currency (with decimals).
 * Example: formatINRPrecise(24500.50) → "₹24,500.50"
 */
export function formatINRPrecise(amount: number): string {
  return formatterWithDecimals.format(amount);
}

/**
 * Format a compact number (e.g., 1.2L, 24.5K) for tight UI spaces.
 */
export function formatINRCompact(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return formatINR(amount);
}
