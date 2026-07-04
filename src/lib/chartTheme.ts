/**
 * chartTheme.ts — Central design tokens for all chart components.
 * 
 * SOURCED from CONCEPT_V3.2 §3.2 — Season colors, scoreToSeason(),
 * TOOLTIP_STYLE, AXIS_STYLE, GRID_STYLE.
 * 
 * All chart components import from here to ensure visual consistency
 * across DashboardPreview, ForecastForkChart, and any future chart usage.
 */

// ──────────────────────────────────────────────
// Season Color System — the core financial-health color language
// ──────────────────────────────────────────────

export const SEASON = {
  growth:   "#8FA876",  // Muted sage green — healthy, on-track
  harvest:  "#C9A23E",  // Earthy gold — actual spend, "aging" data
  drought:  "#A9714F",  // Terracotta/bark — at-risk, disconnected
  recovery: "#7F9070",  // Mid-health recovery state
  dormancy: "#6B6D62",  // Quiet/neutral — labels, axis text
} as const;

export type SeasonKey = keyof typeof SEASON;

// ──────────────────────────────────────────────
// Score-to-Season Mapping
// ──────────────────────────────────────────────

export function scoreToSeason(score: number): SeasonKey {
  if (score >= 80) return "growth";
  if (score >= 60) return "harvest";
  if (score >= 40) return "recovery";
  if (score >= 20) return "drought";
  return "dormancy";
}

export function scoreToColor(score: number): string {
  return SEASON[scoreToSeason(score)];
}

export function scoreToLabel(score: number): string {
  const key = scoreToSeason(score);
  return key.charAt(0).toUpperCase() + key.slice(1);
}

// ──────────────────────────────────────────────
// Recharts Shared Styles
// ──────────────────────────────────────────────

/** Glass-panel-matching tooltip config */
export const TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: "#3F4138",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    padding: "10px 14px",
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: "12px",
    color: "#EAEAEA",
  },
  labelStyle: {
    color: "#6B6D62",
    fontSize: "10px",
    fontFamily: "var(--font-geist-mono), monospace",
    marginBottom: "4px",
  },
  itemStyle: {
    color: "#EAEAEA",
    fontSize: "12px",
    padding: "2px 0",
  },
  cursor: {
    stroke: "rgba(255, 255, 255, 0.1)",
    strokeWidth: 1,
  },
} as const;

/** Axis label styling — dormancy color, mono font */
export const AXIS_STYLE = {
  fontSize: 10,
  fontFamily: "var(--font-geist-mono), monospace",
  fill: "#6B6D62",
} as const;

/** CartesianGrid styling — subtle white lines */
export const GRID_STYLE = {
  stroke: "rgba(255, 255, 255, 0.04)",
  strokeDasharray: "3 3",
} as const;

// ──────────────────────────────────────────────
// Animation Constants (reused across all sections)
// ──────────────────────────────────────────────

/** Canonical ease curve used site-wide for whileInView animations */
export const EASE_REVEAL = [0.22, 1, 0.36, 1] as const;

/** Standard whileInView fade-up configuration */
export const FADE_UP = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.9, ease: EASE_REVEAL },
} as const;

/** Stagger delay between items in a row */
export const STAGGER_DELAY = 0.08;
