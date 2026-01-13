import { isEmpty } from './isEmpty.js';

export function calculateInterest(loan, options = {}) {
  if (isEmpty(loan)) return 0;

  const { amount, loanTermUpdated = false, term = {} } = loan;
  const { interestAmountOnly = false } = options;

  if (typeof amount !== 'number' || amount <= 0) return 0;
  if (isEmpty(term)) return 0;

  const { interest, interestPenalty } = term;
  const interestToUse = loanTermUpdated ? interestPenalty : interest;

  const rate = Number(interestToUse);
  if (!Number.isFinite(rate) || rate < 0) return 0;

  const interestValue = amount * (rate / 100);

  if (interestAmountOnly) return interestValue;

  return amount + interestValue;
}
