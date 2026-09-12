import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./session";

/**
 * Sesión de demo: una cookie firmada con expiración. El encargo pide un solo
 * login admin/admin, así que no hay tabla de usuarios ni hash de contraseña.
 * Antes de exponer esto a internet hay que cambiar credenciales, secreto y
 * agregar rate limiting real (ver README).
 */

export { SESSION_COOKIE };

const TTL_MS = 1000 * 60 * 60 * 8;

const ADMIN_USER = process.env.HIROPHONE_ADMIN_USER ?? "admin";
const ADMIN_PASS = process.env.HIROPHONE_ADMIN_PASS ?? "admin";
const SECRET = process.env.HIROPHONE_SESSION_SECRET ?? "hirophone-local-demo-secret";

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function createToken(user: string): string {
  const payload = `${user}.${Date.now() + TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [user, expiry, mac] = parts;
  const payload = `${user}.${expiry}`;
  const expected = sign(payload);
  if (
    mac.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
  ) {
    return null;
  }
  if (Number(expiry) < Date.now()) return null;
  return user;
}

export function checkCredentials(user: string, pass: string): boolean {
  return user === ADMIN_USER && pass === ADMIN_PASS;
}

/** Guardia del lado del servidor para páginas y rutas de API del admin. */
export async function getSessionUser(): Promise<string | null> {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}
