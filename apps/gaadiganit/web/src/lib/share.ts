/**
 * Share links (SHR-02): the scenario travels in the URL fragment, compressed,
 * so no server is involved and nothing is sent anywhere until the user shares.
 */
import type { ScenarioInputs, Vehicle } from '@gaadiganit/engine';
import type { StoredScenario } from './scenario.ts';

export interface SharedPayload {
  v: 1;
  name: string;
  vehicle: Vehicle;
  inputs: ScenarioInputs;
}

const toB64Url = (bytes: Uint8Array) => {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64Url = (s: string) => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream): Promise<Uint8Array> {
  const out = new Response(bytes as BodyInit).body!.pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

const canCompress = () => typeof CompressionStream !== 'undefined';

/** "z" prefix = deflate-raw compressed; "j" = plain JSON (older browsers). */
export async function encodeShare(s: StoredScenario): Promise<string> {
  const payload: SharedPayload = { v: 1, name: s.name, vehicle: s.vehicle, inputs: s.inputs };
  const json = new TextEncoder().encode(JSON.stringify(payload));
  if (canCompress()) return `z${toB64Url(await pipe(json, new CompressionStream('deflate-raw')))}`;
  return `j${toB64Url(json)}`;
}

export async function decodeShare(code: string): Promise<SharedPayload | null> {
  try {
    const body = fromB64Url(code.slice(1));
    const bytes = code[0] === 'z' ? await pipe(body, new DecompressionStream('deflate-raw')) : code[0] === 'j' ? body : null;
    if (!bytes) return null;
    const p = JSON.parse(new TextDecoder().decode(bytes)) as SharedPayload;
    return p && p.v === 1 && p.vehicle && p.inputs ? p : null;
  } catch {
    return null;
  }
}

export async function shareUrl(s: StoredScenario): Promise<string> {
  return `${location.origin}/shared#s=${await encodeShare(s)}`;
}

/** Trigger a browser download for a Blob. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** File-name-safe slug. */
export function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'gaadiganit';
}
