import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseShopParams, withShopParams } from '../lib/catalog';
import type { ShopParam } from '../lib/catalog';

/**
 * Shop search, filters and sort, stored in the URL (e.g. /?roast=light&brew=espresso)
 * so they survive a refresh, can be shared, and work with Back/Forward.
 */
export function useShopFilters() {
  const [params, setParams] = useSearchParams();
  const { filters, sort } = useMemo(() => parseShopParams(params), [params]);

  const update = useCallback(
    (changes: Partial<Record<ShopParam, string | null>>) => setParams(prev => withShopParams(prev, changes)),
    [setParams]
  );

  const clearFilters = useCallback(
    () => update({ q: null, roast: null, brew: null, process: null, taste: null }),
    [update]
  );

  return { filters, sort, update, clearFilters };
}
