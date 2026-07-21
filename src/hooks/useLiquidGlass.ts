import { useRef, useEffect } from 'react';

/**
 * Hook that applies the liquid-glass refraction effect to a DOM element.
 * Returns a ref to attach to the card container.
 * 
 * Usage:
 *   const ref = useLiquidGlass();
 *   return <div ref={ref} className="goal-liquid-glass">...</div>
 */
export function useLiquidGlass<T extends HTMLElement = HTMLDivElement>(
  opts: { scale?: number; chroma?: number; blur?: number } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    // @ts-ignore
    if (typeof window !== 'undefined' && window.liquidGlass && el) {
      // @ts-ignore
      const glass = window.liquidGlass(el, { 
        scale: opts.scale ?? -112, 
        chroma: opts.chroma ?? 6 
      });
      return () => { if (glass && glass.destroy) glass.destroy(); };
    }
  }, [opts.scale, opts.chroma, opts.blur]);

  return ref;
}
