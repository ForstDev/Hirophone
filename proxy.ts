import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

/**
 * Portero del área admin. Next 16 le llama "proxy" a lo que antes era
 * middleware. Solo revisa que exista la cookie de sesión, porque el runtime
 * de edge no puede cargar el verificador de firma (usa node:crypto); la
 * comprobación real de la firma corre de nuevo en cada ruta de API del admin,
 * que es donde se lee o escribe algo de verdad.
 *
 * Sin esto, cualquiera podía entrar directo a /admin/productos o a los
 * indicadores sin loguearse — el layout solo ocultaba el sidebar, nunca
 * bloqueaba la página.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const hasCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);
  if (hasCookie) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = pathname === "/admin" ? "" : "?next=" + encodeURIComponent(pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
