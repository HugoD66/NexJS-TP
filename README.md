# Pixel Palace

Boutique e-commerce rétro gaming — TP Next.js Master 2.

## Stack

- **Next.js** 16.2.9 — App Router
- **React** 19 / **TypeScript** 5
- **Tailwind CSS** v4
- **Prisma** 7.8.0 + **SQLite**
- **pnpm** comme package manager

---

## Prérequis

**Node 22 obligatoire** — Node 26 est incompatible avec `better-sqlite3`.

```bash
nvm install 22
nvm use 22
node -v  # v22.x.x
```

---

## Installation

```bash
pnpm install
```

Si `better-sqlite3` remonte une erreur de version native après un changement de Node :

```bash
pnpm rebuild better-sqlite3
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="file:./dev.db"
```

---

## Base de données

### Appliquer les migrations

```bash
pnpm migrate
# équivalent : pnpm exec prisma migrate dev
```

### Peupler la base (seed)

```bash
pnpm seed
```

Insère les 15 produits définis dans `lib/products.json` (6 consoles, 5 jeux, 4 accessoires).

### Régénérer le client Prisma

```bash
pnpm exec prisma generate
```

### Interface visuelle de la DB

```bash
pnpm exec prisma studio
```

---

## Lancer le projet

```bash
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `pnpm dev` | Serveur de développement (Turbopack) |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur de production |
| `pnpm seed` | Peuple la base de données |
| `pnpm migrate` | Applique les migrations Prisma |
| `pnpm lint` | Lint ESLint |

---

## Routes principales

| URL | Description |
|---|---|
| `/` | Accueil — catalogue avec filtres par catégorie |
| `/products` | Liste complète des produits |
| `/products/[slug]` | Fiche produit avec onglets description / spécifications |
| `/admin/products` | Interface d'administration (layout distinct) |
| `/api/products` | Endpoint JSON — liste des produits |
