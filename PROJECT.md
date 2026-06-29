# Frontend React Template

A production-ready React + Vite template with TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Query, Zustand, and React Hook Form.

---

## Tech Stack

| Layer         | Library                     |
| ------------- | --------------------------- |
| Framework     | React 19 + Vite 8           |
| Language      | TypeScript 6                |
| Styling       | Tailwind CSS v4 + shadcn/ui |
| Server state  | TanStack Query v5           |
| Client state  | Zustand v5                  |
| Forms         | React Hook Form + Zod       |
| Animations    | Motion                      |
| Notifications | Sonner                      |

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Scripts

| Script                 | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start dev server                 |
| `npm run build`        | Type-check + production build    |
| `npm run preview`      | Preview production build locally |
| `npm run lint`         | Run ESLint                       |
| `npm run lint:fix`     | Run ESLint and auto-fix          |
| `npm run format`       | Format all files with Prettier   |
| `npm run format:check` | Check formatting without writing |

---

## Project Structure

```
src/
├── app/                    # App bootstrap
│   ├── index.tsx           # Root component — mounts providers (QueryClient, Toaster)
│   └── router.tsx          # Route definitions — swap pages here
│
├── config/                 # Static app config
│   ├── env.ts              # Typed env vars (VITE_* values)
│   └── index.ts
│
├── features/               # Domain features (one folder per domain)
│   └── <feature>/
│       ├── api/            # API call functions / React Query hooks
│       ├── components/     # UI components scoped to this feature
│       ├── hooks/          # Feature-specific custom hooks
│       ├── store/          # Zustand slice for this feature
│       ├── types/          # TypeScript types / interfaces
│       └── index.ts        # Public barrel — only export what pages need
│
├── pages/                  # Route-level page components
│   └── <page>/
│       └── index.tsx       # Compose feature components here; keep logic-free
│
├── shared/                 # Truly cross-cutting code
│   ├── components/
│   │   └── ui/             # shadcn/ui primitives (Button, Dialog, Input, …)
│   ├── hooks/              # Generic hooks (useDebounce, useMediaQuery, …)
│   ├── lib/
│   │   └── utils.ts        # cn() utility and other helpers
│   ├── styles/
│   │   └── globals.css     # CSS variables, base resets, design tokens
│   └── types/              # Shared TypeScript utility types
│
├── store/                  # Global Zustand stores (auth, theme, …)
│
├── index.css               # Tailwind entry — imports globals.css
└── main.tsx                # React DOM entry point
```

---

## Adding a Feature

1. Create the folder: `src/features/<feature-name>/`
2. Add sub-folders as needed: `api/`, `components/`, `hooks/`, `store/`, `types/`
3. Keep each sub-folder's barrel (`index.ts`) as the only public surface
4. Export from `src/features/index.ts` when other features or pages need it

**Example structure for an `auth` feature:**

```
src/features/auth/
├── api/
│   └── auth.api.ts         # login(), logout(), getMe() — plain async functions
├── components/
│   ├── LoginForm.tsx
│   └── index.ts
├── hooks/
│   └── useAuth.ts          # wraps TanStack Query + Zustand slice
├── store/
│   └── auth.store.ts       # Zustand slice: user, token, isAuthenticated
├── types/
│   └── index.ts            # User, AuthPayload, etc.
└── index.ts                # export { LoginForm, useAuth } — nothing else
```

---

## Adding a Page

1. Create `src/pages/<page-name>/index.tsx`
2. Export it from `src/pages/index.ts`
3. Register the route in `src/app/router.tsx`

Pages should be thin — import from features, compose layout, pass props down.

---

## Adding a shadcn Component

```bash
npx shadcn add <component>
```

Components land in `src/shared/components/ui/<component>/`. Export them from `src/shared/components/ui/index.ts`.

---

## State Management

- **Server state** (API data, loading, errors) → TanStack Query inside `features/<name>/api/`
- **Client/UI state** (auth session, modals, theme) → Zustand inside `features/<name>/store/` or `src/store/` for globals

---

## Environment Variables

Add variables to `.env.local`. All must be prefixed with `VITE_`.

Access them through `src/config/env.ts` — never read `import.meta.env` directly in components.

```ts
// src/config/env.ts
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
} as const
```

---

## Code Quality

| Tool              | Trigger                                                           |
| ----------------- | ----------------------------------------------------------------- |
| ESLint + Prettier | `npm run lint:fix` / `npm run format`                             |
| Pre-commit hook   | Husky runs `lint-staged` on staged `*.ts/tsx` files automatically |
| TypeScript        | `npm run build` (or `tsc -b --noEmit`)                            |

The pre-commit hook will block commits that fail linting. Fix errors with `npm run lint:fix` before committing.

---

## Path Aliases

`@/` maps to `src/`. Use it everywhere — no relative `../../` chains.

```ts
import { cn } from '@/shared/lib/utils'
import { useAuth } from '@/features/auth'
```
