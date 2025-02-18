// num = currency that needs to be foratted
// decimal = how many decimal should be shown
// currency = currency value

const currencyMultiplier = {
  USD: 58.15,
};

export function formatCurrency({ num = 0, decimal = 2, currency = 'PHP' }) {
  if (typeof num !== 'number') return '-';

  const multiplier = currencyMultiplier[currency];

  if (multiplier) num *= multiplier;

  return num.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
}
