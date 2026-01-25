import { productCategories } from '../constants/index.js';

/**
 * Fetch product categories.
 * @param {boolean} status - filter by active (true) or inactive (false). Default: true
 * @returns {Array<{ key: string, label: string }>}
 */
export function getProductCategories(status = true) {
  return Object.entries(productCategories)
    .filter(([_, value]) => value.active === status)
    .map(([key, value]) => ({ key, label: value.label }));
}
