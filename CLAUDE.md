@AGENTS.md

# Instructions pour Claude

## À lire en début de chaque session

Lire impérativement `../doc/projet/CONTEXT.md` avant toute action. Ce fichier contient :
- Description du projet et stack technique
- Structure des fichiers
- Conventions de développement
- Direction artistique et variables CSS
- Pièges connus (Prisma 7, Node 22, Next.js 16)

Ensuite, lire le fichier TP en cours (ex: `../doc/tp/TP3-etapes.md`) pour connaître les étapes à accomplir.

## Structure du dossier doc/

```
doc/
├── cours/     ← PDFs de formation (Formation-Nextjs-Jour-*.pdf)
├── tp/        ← Fichiers d'étapes TP (TP1-etapes.md, TP2-etapes.md, TP3-etapes.md)
└── projet/    ← Documentation projet (CONTEXT.md, bonnes-pratiques.md, fiche-projet.md, direction-artistique.md)
```

## Règles impératives

- Ne jamais mentionner git, commits ou push — Hugo gère seul
- Toujours utiliser pnpm (jamais npm ou yarn)
- Node 22 obligatoire (nvm use 22) — Node 26 casse better-sqlite3
- Server Components par défaut, "use client" uniquement si indispensable
