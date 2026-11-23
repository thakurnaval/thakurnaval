/**
 * The defaults pack as this user sees it: the bundled pack with their own
 * fuel prices from Settings laid over every city's prices (v2 "My prices").
 */
import { useMemo } from 'react';
import type { DefaultsPack } from '@gaadiganit/engine';
import { defaults } from './defaults.ts';
import { PRICE_KEYS, useSettings, type MyPrices } from './settings.ts';

/** Source label the UI shows as "your prices in Settings". */
export const MY_PRICES_SOURCE = 'MY_PRICES';

export function withMyPrices(pack: DefaultsPack, mine: MyPrices, asOf: string | undefined): DefaultsPack {
  const set = PRICE_KEYS.filter((k) => mine[k] !== undefined);
  if (set.length === 0) return pack;
  const cities = Object.fromEntries(Object.entries(pack.cities).map(([id, c]) => [id, {
    ...c,
    fuelPrices: {
      value: { ...c.fuelPrices.value, ...Object.fromEntries(set.map((k) => [k, mine[k]!])) },
      source: MY_PRICES_SOURCE,
      asOf: asOf ?? pack.asOf,
    },
  }]));
  return { ...pack, cities };
}

export function useDefaults(): DefaultsPack {
  const { myPrices, myPricesAsOf } = useSettings();
  return useMemo(() => withMyPrices(defaults, myPrices, myPricesAsOf), [myPrices, myPricesAsOf]);
}
