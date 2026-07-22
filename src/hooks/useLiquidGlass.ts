import { useRef } from 'react';

/**
 * Backward compatibility hook for Liquid Glass ref attachment.
 * Migrated to pure CSS Liquid Design System primitives (LiquidSurface / LiquidCard).
 */
export function useLiquidGlass<T extends HTMLElement = HTMLDivElement>(
  _opts: { scale?: number; chroma?: number; blur?: number } = {}
) {
  const ref = useRef<T>(null);
  return ref;
}

export default useLiquidGlass;

