/**
 * Format a number with commas and optional abbreviation (k, M, B)
 * @param {number} num - number to format
 * @param {Object} options
 * @param {number} options.decimal - number of decimals for abbreviated numbers (default 1)
 * @param {boolean} options.abbreviate - whether to abbreviate (k, M, B) (default false)
 * @returns {string}
 */
export function formatNumber(num, options = {}) {
  if (typeof num !== 'number') return '-';

  const { decimal = 1, abbreviate = false } = options;

  if (!abbreviate) {
    // normal comma formatting
    return num.toLocaleString('en-US');
  }

  // abbreviation logic
  const absNum = Math.abs(num);

  if (absNum >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(decimal).replace(/\.0+$/, '') + 'B';
  }

  if (absNum >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimal).replace(/\.0+$/, '') + 'M';
  }

  if (absNum >= 1_000) {
    return (num / 1_000).toFixed(decimal).replace(/\.0+$/, '') + 'K';
  }

  return num.toString();
}
