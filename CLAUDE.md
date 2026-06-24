@AGENTS.md

# Instructions pour Claude

## À lire en début de chaque session

Lire impérativement `../doc/CONTEXT.md` avant toute action. Ce fichier contient :
- Description du projet et stack technique
- Structure des fichiers
- Conventions de développement
- Direction artistique et variables CSS
- Pièges connus (Prisma 7, Node 22, Next.js 16)

Ensuite, lire le fichier TP en cours (ex: `../doc/TP2-etapes.md`) pour connaître les étapes à accomplir.

## Règles impératives

- Ne jamais mentionner git, commits ou push — Hugo gère seul
- Toujours utiliser pnpm (jamais npm ou yarn)
- Node 22 obligatoire (nvm use 22) — Node 26 casse better-sqlite3
- Server Components par défaut, "use client" uniquement si indispensable
