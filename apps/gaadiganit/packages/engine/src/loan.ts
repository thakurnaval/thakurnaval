import { roundPaise } from './money.ts';
import type { Paise, Rate } from './schemas.ts';

export interface LoanMonth {
  payment: Paise;
  interest: Paise;
  principal: Paise;
  /** Balance after this month's payment. */
  balance: Paise;
}

export interface Amortisation {
  emi: Paise;
  months: LoanMonth[];
}

/** Standard reducing-balance EMI, rounded to paise. r = 0 → P ÷ n (SPEC §4.3). */
export function emi(principal: Paise, annualRate: Rate, tenureMonths: number): Paise {
  if (principal === 0) return 0;
  const r = annualRate / 12;
  if (r === 0) return roundPaise(principal / tenureMonths);
  const f = (1 + r) ** tenureMonths;
  return roundPaise((principal * r * f) / (f - 1));
}

/**
 * Month-by-month schedule. Interest is rounded each month; the final
 * instalment absorbs rounding so principal parts sum to the loan exactly.
 */
export function amortise(principal: Paise, annualRate: Rate, tenureMonths: number): Amortisation {
  const r = annualRate / 12;
  const instalment = emi(principal, annualRate, tenureMonths);
  const months: LoanMonth[] = [];
  let balance = principal;
  for (let m = 1; m <= tenureMonths; m++) {
    const interest = roundPaise(balance * r);
    const isLast = m === tenureMonths;
    const principalPart = isLast ? balance : Math.min(balance, instalment - interest);
    balance -= principalPart;
    months.push({ payment: principalPart + interest, interest, principal: principalPart, balance });
  }
  return { emi: instalment, months };
}
