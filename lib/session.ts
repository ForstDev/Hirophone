/**
 * El nombre de la cookie vive solo, para que el middleware la pueda leer sin
 * importar lib/auth.ts (que usa node:crypto).
 */
export const SESSION_COOKIE = "hirophone_admin";
