import { parseDefaults } from '@gaadiganit/engine';
import raw from '../../../defaults/india.json';

/** The bundled defaults pack, validated once at startup (NFR-07). */
export const defaults = parseDefaults(raw);

export const cityIds = Object.keys(defaults.cities);
