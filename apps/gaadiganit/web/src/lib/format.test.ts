import { describe, expect, it } from 'vitest';
import { formatCompactINR, formatINR, formatRate, moneyInputText, parseMoney, parseNumber } from './format.ts';

describe('formatINR (UI-07)', () => {
  it('uses Indian digit grouping', () => {
    expect(formatINR(123_456_700)).toBe('₹12,34,567');
    expect(formatINR(1840, 'en', 1)).toBe('₹18.4');
  });
  it('keeps Latin digits in Hindi', () => {
    expect(formatINR(123_456_700, 'hi')).toBe('₹12,34,567');
  });
});

describe('formatCompactINR', () => {
  it('uses lakh and crore', () => {
    expect(formatCompactINR(1_234_000_00)).toBe('₹12.3 lakh');
    expect(formatCompactINR(1_25_00_000_00)).toBe('₹1.25 crore');
    expect(formatCompactINR(45_000_00)).toBe('₹45,000');
    expect(formatCompactINR(1_234_000_00, 'hi')).toBe('₹12.3 लाख');
  });
});

describe('parseMoney (IN-05)', () => {
  const lakh12_5 = 1_250_000_00;
  it.each([
    ['1250000'], ['12,50,000'], ['₹12,50,000'], ['12.5 lakh'], ['12.5L'], ['12.5 lac'], ['12.5 लाख'], ['Rs. 12,50,000'],
  ])('parses %s', (text) => {
    expect(parseMoney(text)).toBe(lakh12_5);
  });
  it('parses crore and thousand', () => {
    expect(parseMoney('1.25 cr')).toBe(1_25_00_000_00);
    expect(parseMoney('1.25 crore')).toBe(1_25_00_000_00);
    expect(parseMoney('45k')).toBe(45_000_00);
  });
  it('distinguishes empty from invalid', () => {
    expect(parseMoney('  ')).toBeUndefined();
    expect(parseMoney('twelve')).toBeNull();
    expect(parseMoney('12.5.3')).toBeNull();
  });
});

describe('other helpers', () => {
  it('parses plain numbers', () => {
    expect(parseNumber('1,500')).toBe(1500);
    expect(parseNumber('')).toBeUndefined();
    expect(parseNumber('abc')).toBeNull();
  });
  it('formats rates and input text', () => {
    expect(formatRate(0.075)).toBe('7.5%');
    expect(moneyInputText(1_250_000_00)).toBe('12,50,000');
    expect(moneyInputText(undefined)).toBe('');
  });
});
