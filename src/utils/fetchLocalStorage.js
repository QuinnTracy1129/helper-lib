import { isEmpty } from './isEmpty.js';

export function fetchLocalStorage(storageKey, fallbackValue) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (isEmpty(raw)) return fallbackValue;

    let value;

    // Try JSON parsing only if it looks like JSON
    if (
      (raw.startsWith('{') && raw.endsWith('}')) ||
      (raw.startsWith('[') && raw.endsWith(']')) ||
      (raw.startsWith('"') && raw.endsWith('"')) ||
      raw === 'true' ||
      raw === 'false' ||
      !isNaN(raw)
    ) {
      value = JSON.parse(raw);
    } else {
      value = raw;
    }

    if (isEmpty(value)) return fallbackValue;

    return value;
  } catch (error) {
    console.warn(`Error parsing localStorage [${storageKey}]:`, error);
    return fallbackValue;
  }
}
