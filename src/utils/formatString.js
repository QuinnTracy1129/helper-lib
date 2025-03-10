export function formatString(val = '', options = {}) {
  // make sure to parse the val, to make sure we are handling a string
  const str = String(val);

  const { uppercase, lowercase, capitalize, capitalizeAll, kebabCase } = options;

  if (kebabCase) return str.toLowerCase().split(' ').join('-');
  if (uppercase) return str.toUpperCase();
  if (lowercase) return str.toLowerCase();
  if (capitalize) return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  if (capitalizeAll)
    return str
      .split(' ')
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(' ');

  return str;
}
