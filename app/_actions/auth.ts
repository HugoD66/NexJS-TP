"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, createSession, deleteSession } from "@/lib/auth";

export type AuthState = {
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    global?: string[];
  };
};

export async function register(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: AuthState["errors"] = {};

  if (!name || name.trim().length < 2)
    errors.name = ["Le nom doit contenir au moins 2 caractères."];
  if (!email || !email.includes("@"))
    errors.email = ["Adresse e-mail invalide."];
  if (!password || password.length < 6)
    errors.password = ["Le mot de passe doit contenir au moins 6 caractères."];

  if (Object.keys(errors).length > 0) return { errors };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { errors: { email: ["Cette adresse e-mail est déjà utilisée."] } };
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name: name.trim(), email, password: hashed },
  });

  await createSession(user.id, user.role);
  redirect("/");
}

export async function login(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: AuthState["errors"] = {};

  if (!email || !email.includes("@"))
    errors.email = ["Adresse e-mail invalide."];
  if (!password || password.length < 1)
    errors.password = ["Mot de passe requis."];

  if (Object.keys(errors).length > 0) return { errors };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return { errors: { global: ["E-mail ou mot de passe incorrect."] } };
  }

  await createSession(user.id, user.role);
  redirect("/");
}

export async function signout() {
  await deleteSession();
  redirect("/");
}
