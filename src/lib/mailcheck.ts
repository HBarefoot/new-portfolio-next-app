/**
 * Lightweight "did you mean?" email typo correction — a small, dependency-free
 * equivalent of the Kicksend mailcheck pattern. Front-end only; advisory.
 *
 * Strategy:
 *  1. If the whole domain is a near-miss (Damerau distance 1) of a popular
 *     provider domain, suggest that provider — catches gmial.com → gmail.com,
 *     outlok.com → outlook.com, gmail.con → gmail.com, gmail.co → gmail.com.
 *  2. Otherwise, if only the TLD looks like a typo (e.g. a custom company
 *     domain with ".con"), correct just the TLD and keep the domain — catches
 *     mycompany.con → mycompany.com.
 *
 * Returns the corrected full email, or null when nothing looks wrong. It never
 * blocks submission; the caller treats the result as a suggestion only.
 */

const POPULAR_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'comcast.net',
  'verizon.net',
  'att.net',
  'proton.me',
  'protonmail.com',
];

const POPULAR_TLDS = [
  'com',
  'com.au',
  'co.uk',
  'co.nz',
  'co',
  'net',
  'org',
  'io',
  'dev',
  'edu',
  'gov',
  'us',
  'ca',
  'uk',
  'de',
  'fr',
  'info',
  'biz',
  'me',
];

/** Optimal string alignment (Damerau–Levenshtein) — counts an adjacent
 *  transposition as a single edit, so "gmial" → "gmail" is distance 1. */
function damerau(a: string, b: string): number {
  const al = a.length;
  const bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;

  const d: number[][] = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) d[i][0] = i;
  for (let j = 0; j <= bl; j++) d[0][j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost, // substitution
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // transposition
      }
    }
  }
  return d[al][bl];
}

/** Closest candidate within `max` edits, excluding an exact match. */
function closest(value: string, candidates: string[], max: number): string | null {
  let best: string | null = null;
  let bestDist = max + 1;
  for (const candidate of candidates) {
    if (candidate === value) return null; // already valid → no suggestion
    const dist = damerau(value, candidate);
    if (dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }
  return bestDist <= max ? best : null;
}

export function suggestEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf('@');
  if (at < 1) return null;

  const local = email.trim().slice(0, email.trim().lastIndexOf('@')); // preserve original-case local part
  const domain = trimmed.slice(at + 1);
  if (!domain || !domain.includes('.')) return null;
  if (POPULAR_DOMAINS.includes(domain)) return null;

  // 1) Whole-domain near-miss of a popular provider.
  const domainMatch = closest(domain, POPULAR_DOMAINS, 1);
  if (domainMatch && domainMatch !== domain) {
    return `${local}@${domainMatch}`;
  }

  // 2) TLD-only typo on an otherwise-custom domain.
  const firstDot = domain.indexOf('.');
  const sld = domain.slice(0, firstDot);
  const tld = domain.slice(firstDot + 1);
  if (sld && !POPULAR_TLDS.includes(tld)) {
    const tldMatch = closest(tld, POPULAR_TLDS, 1);
    if (tldMatch && tldMatch !== tld) {
      return `${local}@${sld}.${tldMatch}`;
    }
  }

  return null;
}
