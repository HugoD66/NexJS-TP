import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { productId, quantity = 1 } = await request.json();

  const cookieStore = await cookies();
  const existingCartId = cookieStore.get("cartId")?.value;
  const cartId = existingCartId ?? crypto.randomUUID();

  await prisma.cart.upsert({
    where: { id: cartId },
    create: { id: cartId },
    update: {},
  });

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId, productId } },
    create: { cartId, productId, quantity },
    update: { quantity: { increment: quantity } },
  });

  const response = NextResponse.json({ success: true });

  if (!existingCartId) {
    response.cookies.set("cartId", cartId, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return response;
}
