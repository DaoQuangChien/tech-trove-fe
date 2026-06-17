# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repository.

## Overview

Tech Trove FE is a Next.js storefront frontend backed by a Strapi headless CMS. It renders a landing page, product catalog (with category-based browsing), and content blocks driven by Strapi's dynamic-zone data.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4, `tailwindcss-animate`, `class-variance-authority`, `tailwind-merge`
- **UI components**: shadcn/ui ("new-york" style) on top of Radix UI primitives (accordion, dialog, dropdown-menu, navigation-menu, separator, collapsible)
- **Icons**: lucide-react
- **Data fetching**: Axios (configured client in `lib/api/axios.ts`) + TanStack React Query v5
- **CMS / backend**: Strapi (REST API consumed via `qs`-serialized query params)
- **Maps**: `@react-google-maps/api`
- **Utilities**: lodash
- **Tooling**: ESLint 9 (flat config, Next + import-order + Prettier), Prettier (with Tailwind class sorting and import organization), Husky + lint-staged for pre-commit hooks

## Project Structure

```
app/
  (site)/            Route group for the main site (layout.tsx, page.tsx)
  providers/         App-wide React context providers
    index.tsx          Composes all providers
    react-query.tsx     TanStack QueryClient provider
    global-config.tsx   Context for Strapi global config, categories, locales
  layout.tsx          Root layout
  globals.css         Tailwind base styles / CSS variables

components/
  layout/             Page-level/layout components (Header, Footer, ProductCard,
                      ProductGrid, DynamicZone, header menus, homepage sections)
  ui/                 shadcn/ui primitives + custom UI components (Grid, Map,
                      RichTextBlock, TextCollapse, etc.)

lib/
  api/                Axios instance + Strapi data-fetching functions
                      (getCategories, getProducts, getGlobalConfig, getLandingPage,
                      getLocales, normalize, buildParams)
  constants/          Shared constants (e.g. query keys)
  queries/            React Query hooks (e.g. useProducts)
  utils.ts            Shared helper functions (e.g. `cn` for class merging)

types/                TypeScript types mirroring Strapi content models
                      (blocks, category, globalConfig, landingPage, link, locale,
                      location, media, menu, products, richtextBlock, sections, strapi)

public/                Static assets
```

## Key Architectural Notes

- **Strapi integration**: All API calls go through the shared Axios client in `lib/api/axios.ts`, which points at `NEXT_PUBLIC_STRAPI_URL` (default `http://localhost:1337`) and serializes query params with `qs`. Strapi-specific response shapes are normalized via `lib/api/normalize.ts`.
- **Global config**: Site-wide data (global config, categories, locales) is fetched server-side and passed into `GlobalConfigProvider`, then consumed anywhere via the `useGlobalConfig()` hook.
- **Data fetching pattern**: Server-side fetch functions in `lib/api/` are wrapped as React Query hooks in `lib/queries/` for client-side use (e.g. `useProducts`, which returns the full Strapi response `{ data, meta }` so callers needing pagination metadata — like `components/layout/ProductsContent.tsx` — have access to `meta.pagination`).
- **Dynamic content**: Landing page / CMS-driven sections are rendered through `DynamicZone`, which maps Strapi block types to React components.
- **Path alias**: `@/*` maps to the project root (see `tsconfig.json`); shadcn aliases (`@/components`, `@/lib`, `@/components/ui`, `@/hooks`) are configured in `components.json`.

## Rendering Strategy (SSG / ISR)

Data fetching uses the `axios` client, not Next's native `fetch`, so Next's per-fetch Data Cache (`fetch(..., { cache, next: { revalidate } })`) never applies. Caching/revalidation must instead be done at the **route segment level** via `export const revalidate = <seconds>`, which works regardless of how the data was fetched — Next re-runs the whole page function (including axios calls) after the interval elapses.

A route is statically rendered (SSG/ISR) by default **unless** it reads a Dynamic API (`searchParams`, `cookies()`, `headers()`, `draftMode()`) or sets `export const dynamic = "force-dynamic"`. Reading `searchParams` in a server component forces that entire route to dynamic (SSR-per-request).

Current status per route:

- `app/layout.tsx` — fetches global config/categories/locales, no dynamic APIs. Static + ISR via `revalidate = 300`.
- `app/(site)/page.tsx` (home) — fetches the landing page, no dynamic APIs. Static + ISR via `revalidate = 300`.
- `app/(site)/contact/page.tsx` — fetches nothing itself (reads `useGlobalConfig()` client context populated by the root layout). Trivially static.
- `app/(site)/products/[slug]/page.tsx` — uses `generateStaticParams` (paginates through `getProducts` to collect every slug) so all product pages are pre-rendered at build. New slugs added later still work on first request (`dynamicParams` defaults to `true`) and get cached. ISR via `revalidate = 300`.
- `app/(site)/products/page.tsx` — does **not** read `searchParams` on the server (this is the key fix), so it stays static + ISR via `revalidate = 300`. It only fetches `categories` server-side and renders `<ProductsContent>` inside a `<Suspense>` boundary.

**Client-side searchParams pattern**: when a page's content depends on query params (e.g. `/products?category=...&page=...`), don't read `searchParams` in the server component — that forces the whole route dynamic. Instead, push everything that depends on the URL into a `"use client"` component that calls `useSearchParams()` and fetches via a React Query hook (e.g. `components/layout/ProductsContent.tsx` + `useProducts`), so it fetches straight from the Strapi REST API in the browser. The server component stays static and only supplies data that doesn't vary per request (e.g. the category list). Any component using `useSearchParams()` must be wrapped in `<Suspense>` by its parent.

## Environment Variables

Defined in `.env.local` (not committed):

- `NEXT_PUBLIC_STRAPI_URL` — base URL of the Strapi backend
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY` — API key for Google Maps embeds

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # start production server
npm run lint     # run ESLint
```

Husky + lint-staged run linting/formatting automatically on commit.

## Conventions

- Import order is enforced by ESLint (`import/order`): builtin → external → internal (`@/**`) → relative, alphabetized.
- Prettier auto-sorts Tailwind classes and organizes imports (`prettier-plugin-tailwindcss`, `prettier-plugin-organize-imports`).
- New UI primitives should be added via shadcn/ui conventions into `components/ui/`; page/feature-specific components go in `components/layout/`.
- Strapi content types should have a corresponding type definition added to `types/`.
