import { isEmpty } from './isEmpty';

export function calculateInterest(loan) {
  if (isEmpty(loan)) return 0;

  const { amount, loanTermUpdated = false, term = {} } = loan;

  if (typeof amount !== 'number' || amount <= 0) return 0;

  const { interest, interestPenalty } = term;

  const interestToUse = loanTermUpdated ? interestPenalty : interest;

  if (typeof interestToUse !== 'number' || interestToUse < 0) return 0;

  return amount * (1 + interestToUse / 100);
}
