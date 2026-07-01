import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "pixel-palace-dev-secret-change-in-prod"
);

async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get("pp_session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return { userId: Number(payload.sub), role: payload.role as string };
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Protection admin ──────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const session = await getSessionFromRequest(request);
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ── A/B testing prefetch ──────────────────────────────────────────────────
  const response = NextResponse.next();

  // Forçage via query param (?ab_prefetch=A ou ?ab_prefetch=B)
  const forced = searchParams.get("ab_prefetch");
  if (forced === "A" || forced === "B") {
    response.cookies.set("ab_prefetch", forced, { path: "/", sameSite: "lax" });
    return response;
  }

  // Tirage aléatoire si le cookie n'existe pas encore
  if (!request.cookies.get("ab_prefetch")) {
    const group = Math.random() < 0.5 ? "A" : "B";
    response.cookies.set("ab_prefetch", group, { path: "/", sameSite: "lax" });
  }

  // ── i18n : bootstrap de la locale depuis Accept-Language ───────────────────
  if (!request.cookies.get("NEXT_LOCALE")) {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const locale = acceptLanguage.toLowerCase().startsWith("en") ? "en" : "fr";
    response.cookies.set("NEXT_LOCALE", locale, { path: "/", sameSite: "lax" });
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
