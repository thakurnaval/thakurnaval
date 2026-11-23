import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import QuickEstimate from './QuickEstimate.tsx';

function setup() {
  render(<MemoryRouter><QuickEstimate /></MemoryRouter>);
  return userEvent.setup();
}

describe('Quick estimate (IN-01, UI-02)', () => {
  it('shows a headline from the five fields alone', async () => {
    setup();
    expect(await screen.findByText(/This car costs you ₹[\d,]+ a month, or ₹[\d.]+ per km, over 5 years\./)).toBeTruthy();
  });

  it('updates live when the price changes, accepting lakh', async () => {
    const user = setup();
    const before = (await screen.findByText(/This car costs you/)).textContent;
    const price = screen.getByLabelText('Ex-showroom price');
    await user.clear(price);
    await user.type(price, '15 lakh');
    const after = screen.getByText(/This car costs you/).textContent;
    expect(after).not.toBe(before);
  });

  it('flags an impossible price and keeps the last result', async () => {
    const user = setup();
    await screen.findByText(/This car costs you/);
    const price = screen.getByLabelText('Ex-showroom price');
    await user.clear(price);
    await user.type(price, '50000');
    expect(screen.getByRole('alert').textContent).toMatch(/at least ₹1 lakh/);
    expect(screen.getByText(/Showing the last valid result/)).toBeTruthy();
  });

  it('renders the breakdown and assumptions', async () => {
    setup();
    expect(await screen.findByText('Where the money goes')).toBeTruthy();
    expect(screen.getByText('What we assumed')).toBeTruthy();
    expect(screen.getAllByText(/estimate, to be verified/).length).toBeGreaterThan(0);
  });
});
