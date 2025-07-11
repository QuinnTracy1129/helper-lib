import { isEmpty } from './isEmpty.js';

export function fetchLocalStorage(storageKey, fallbackValue) {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = JSON.parse(raw);

    if (isEmpty(parsed)) return fallbackValue;

    return parsed;
  } catch (error) {
    console.warn(`Error parsing localStorage [${storageKey}]:`, error);
    return fallbackValue;
  }
}
