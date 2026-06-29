# FractalHive Frontend Template

An opinionated React + TypeScript starter template used across all FractalHive projects. Clone this before starting any new frontend — the architecture, tooling, and component library are already wired up.

---

## Tech Stack

| Layer         | Library                         | Version |
| ------------- | ------------------------------- | ------- |
| Framework     | React                           | 19      |
| Language      | TypeScript                      | 6       |
| Build tool    | Vite                            | 8       |
| Routing       | React Router DOM                | 7       |
| Server state  | TanStack Query (React Query)    | 5       |
| Client state  | Zustand                         | 5       |
| Forms         | React Hook Form + Zod           | 7 / 4   |
| HTTP client   | Axios                           | 1       |
| Table         | TanStack Table                  | 8       |
| UI components | shadcn/ui (Radix UI primitives) | —       |
| Styling       | Tailwind CSS                    | 4       |
| Icons         | Lucide React                    | —       |
| Animations    | Motion                          | 12      |
| Notifications | Sonner                          | 2       |
| Font          | Geist Variable                  | —       |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & run

```bash
# 1. Clone the template
git clone <repo-url> my-new-project
cd my-new-project

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL

# 4. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Scripts

| Script                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start Vite dev server with HMR             |
| `npm run build`        | Type-check then produce a production build |
| `npm run preview`      | Preview the production build locally       |
| `npm run lint`         | Run ESLint across all files                |
| `npm run lint:fix`     | Run ESLint and auto-fix violations         |
| `npm run format`       | Format all files with Prettier             |
| `npm run format:check` | Check formatting without writing           |

---

## Project Structure

```
src/
├── app/
│   ├── index.tsx          # App root — QueryClientProvider + Toaster
│   └── router.tsx         # BrowserRouter + lazy page routes + Suspense
├── assets/                # Static assets (logo, images)
├── components/
│   ├── layout/            # Layout shell — Layout, Sidebar, TopBar
│   └── common/            # Reusable UI — DataTable, PageHeader, StatusBadge,
│                          #   EmptyState, ConfirmDialog, SlideOver, etc.
├── constants/             # App-wide constant values
├── features/              # Feature modules (add per-feature code here)
├── hooks/                 # Custom React hooks
├── pages/                 # Page-level components (lazy-loaded via router)
│   └── login/             # Login page (renders outside Layout)
├── services/              # API service modules (axios-based)
├── shared/
│   ├── components/ui/     # shadcn/ui primitives (Button, Card, Dialog, etc.)
│   ├── hooks/             # Shared low-level hooks
│   ├── lib/               # cn() utility and other helpers
│   ├── styles/            # globals.css — Tailwind base + CSS variables
│   └── types/             # Shared TypeScript types
├── store/
│   └── appStore.ts        # Zustand store with localStorage persistence
├── types/                 # Domain-level TypeScript interfaces
└── utils/                 # Pure utility functions
```

---

## Architecture Conventions

### Routing

Routes are defined in `src/app/router.tsx`. All pages are lazy-loaded with `React.lazy()` and wrapped in a `<Suspense>` fallback. The `Layout` route wraps all authenticated pages (sidebar + topbar). Public pages like `/login` are declared outside the `Layout` route.

```tsx
const MyPage = lazy(() => import('@/pages/my-page'))

<Route path="/my-page" element={<MyPage />} />
```

### State management

- **Server state** (API data): use TanStack Query hooks inside `src/hooks/`
- **Client/global state**: use Zustand stores inside `src/store/`

The `appStore.ts` skeleton uses `persist` middleware to keep `selectedItemId` in localStorage. Extend it or create additional stores per domain.

### Services

Create one file per API resource in `src/services/`. Use the shared axios instance (add it as `src/services/api.ts`). Export a plain object of async functions — no classes.

```ts
// src/services/api.ts
import axios from 'axios'
import { env } from '@/config'

const api = axios.create({ baseURL: env.apiBaseUrl })
export default api
```

### Forms

Use React Hook Form + Zod everywhere. Define a `z.object()` schema, infer the type with `z.infer<>`, and pass `zodResolver(schema)` to `useForm`.

### Path aliases

`@/` maps to `src/`. Always use it for imports — never use relative `../../` paths.

---

## UI Components

shadcn/ui components live in `src/shared/components/ui/`. Add new ones with:

```bash
npx shadcn add <component-name>
```

The `components.json` config points shadcn at the correct output directories automatically.

---

## Code Quality

### Husky git hooks

| Hook         | Runs            | What it does                                      |
| ------------ | --------------- | ------------------------------------------------- |
| `pre-commit` | On every commit | `lint-staged` — ESLint + Prettier on staged files |
| `pre-push`   | On every push   | `npm run build` — blocks push if build fails      |

### ESLint + Prettier

- ESLint enforces TypeScript rules, React hooks rules, and import consistency.
- Prettier handles formatting. Run `npm run format` to auto-fix.
- Both run automatically on staged files via `lint-staged`.

---

## Environment Variables

| Variable            | Description                   |
| ------------------- | ----------------------------- |
| `VITE_API_BASE_URL` | Base URL for all API requests |

Copy `.env.example` to `.env` and fill in values. Vite only exposes variables prefixed with `VITE_`.

---

## Adding a New Page

1. Create `src/pages/my-page/index.tsx` with a default export.
2. Add the lazy import and route in `src/app/router.tsx`.
3. Add a nav item in `src/components/layout/Sidebar.tsx` if it needs a sidebar link.
