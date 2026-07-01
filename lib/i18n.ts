import { cookies } from "next/headers";
import fr from "@/dictionaries/fr.json";
import en from "@/dictionaries/en.json";

export type Locale = "fr" | "en";

const dictionaries = { fr, en } as const;

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get("NEXT_LOCALE")?.value;
  return value === "en" ? "en" : "fr";
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
