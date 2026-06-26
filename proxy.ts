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
  const session = await getSessionFromRequest(request);

  if (!session || session.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
