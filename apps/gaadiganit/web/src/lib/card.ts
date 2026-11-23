/**
 * WhatsApp card (SHR-03): a 1080 × 1080 PNG with the headline numbers,
 * drawn on a canvas on the device.
 */
import type { CalculationResult } from '@gaadiganit/engine';
import { formatCompactINR, formatINR, type Lang } from './format.ts';

export interface CardText {
  name: string;
  perMonthLabel: string;
  perKmLabel: string;
  over: string;
  footer: string;
  breakdown: { label: string; value: number }[];
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

export async function drawCard(r: CalculationResult, text: CardText, lang: Lang): Promise<Blob | null> {
  const S = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const font = (w: number, px: number) => `${w} ${px}px system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", "Noto Sans Devanagari", sans-serif`;

  ctx.fillStyle = '#0f766e';
  ctx.fillRect(0, 0, S, S);
  ctx.fillStyle = '#f0fdfa';
  ctx.fillRect(48, 48, S - 96, S - 96);

  const x = 104;
  let y = 170;
  ctx.fillStyle = '#134e4a';
  ctx.font = font(700, 44);
  for (const line of wrap(ctx, text.name, S - 2 * x).slice(0, 2)) {
    ctx.fillText(line, x, y);
    y += 56;
  }

  y += 70;
  ctx.fillStyle = '#0f766e';
  ctx.font = font(800, 150);
  const perMonth = formatINR(Math.round(r.costPerMonth / 10_000) * 10_000, lang);
  ctx.fillText(perMonth, x, y);
  y += 64;
  ctx.fillStyle = '#334155';
  ctx.font = font(500, 44);
  ctx.fillText(`${text.perMonthLabel} · ${text.over}`, x, y);

  if (r.costPerKm !== null) {
    y += 110;
    ctx.fillStyle = '#0f766e';
    ctx.font = font(800, 84);
    ctx.fillText(formatINR(Math.round(r.costPerKm / 10) * 10, lang, 1), x, y);
    ctx.fillStyle = '#334155';
    ctx.font = font(500, 44);
    ctx.fillText(text.perKmLabel, x + ctx.measureText(' ').width + measure(ctx, formatINR(Math.round(r.costPerKm / 10) * 10, lang, 1), font(800, 84)) + 24, y);
  }

  y += 90;
  ctx.font = font(500, 34);
  const top = text.breakdown.filter((b) => b.value > 0).sort((a, b) => b.value - a.value).slice(0, 4);
  for (const b of top) {
    ctx.fillStyle = '#334155';
    ctx.fillText(b.label, x, y);
    ctx.fillStyle = '#134e4a';
    const v = formatCompactINR(b.value, lang);
    ctx.fillText(v, S - x - ctx.measureText(v).width, y);
    y += 52;
  }

  ctx.fillStyle = '#64748b';
  ctx.font = font(500, 30);
  ctx.fillText(text.footer, x, S - 100);

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'));
}

function measure(ctx: CanvasRenderingContext2D, s: string, f: string): number {
  const prev = ctx.font;
  ctx.font = f;
  const w = ctx.measureText(s).width;
  ctx.font = prev;
  return w;
}
