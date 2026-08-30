import crypto from 'crypto';
import { cookies } from 'next/headers';
import { getAdmin, saveAdmin } from './store';

const COOKIE_NAME = 'lp_admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

function getSecret() {
  // Wajib diset via env SESSION_SECRET saat deploy produksi.
  return process.env.SESSION_SECRET || 'dev-only-insecure-secret-change-me';
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(check, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function unsign(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', getSecret()).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, 'base64url').toString());
  } catch {
    return null;
  }
}

// Bootstrap admin pertama kali dari env var, jika belum ada data admin tersimpan.
export function ensureAdminBootstrap() {
  const existing = getAdmin();
  if (existing) return existing;
  const username = process.env.ADMIN_USERNAME || 'admin';
  const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  if (!bootstrapPassword) return null; // belum bisa bootstrap tanpa password awal
  const admin = { username, passwordHash: hashPassword(bootstrapPassword) };
  saveAdmin(admin);
  return admin;
}

export function createSessionToken(username) {
  return sign({ u: username, exp: Date.now() + SESSION_TTL_MS });
}

export function verifySessionToken(token) {
  const payload = unsign(token);
  if (!payload) return null;
  if (Date.now() > payload.exp) return null;
  return payload;
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function setSessionCookie(token) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, '', { httpOnly: true, secure: true, path: '/', maxAge: 0 });
}
