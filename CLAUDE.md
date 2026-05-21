# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check (`tsc -b`) then production build
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint on the project

## Tech Stack

- **React 19** + **TypeScript** (ES2023 target, bundler module resolution)
- **Vite 8** (rolldown bundler) with `@vitejs/plugin-react`
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no config file)
- **Framer Motion** — page/component animations
- **React Router v7** — client-side routing (BrowserRouter)
- **Leaflet + react-leaflet** — interactive map on `/map`

## Architecture

### Pages & Routes

All routes defined in `src/App.tsx`:

| Route | File | Purpose |
|---|---|---|
| `/` | `pages/Home.tsx` | Hero, announcements, character grid, region cards |
| `/characters` | `pages/CharacterList.tsx` | Character gallery with element/weapon filters |
| `/character/:id` | `pages/CharacterDetail.tsx` | Talents, constellations, materials, teams, story |
| `/map` | `pages/MapPage.tsx` | Interactive Leaflet map with layer-filtered pins |
| `/weapons` | `pages/Weapons.tsx` | Weapon list with type filter |
| `/artifacts` | `pages/Artifacts.tsx` | Artifact set list with piece-count filter |
| `/reactions` | `pages/ElementalReactions.tsx` | 14 elemental reactions with diagrams/formulas |
| `/abyss` | `pages/SpiralAbyss.tsx` | Spiral Abyss floor analysis + team recommendations |
| `/search` | `pages/Search.tsx` | Cross-category search (characters/weapons/artifacts) |

### Data Layer

Static typed data modules in `src/data/` (no API calls):

- `types.ts` — Shared type definitions (Character, Talent, Constellation, etc.)
- `characters.ts` — ~15 characters with full talent/constellation/material/team data
- `weapons.ts` — ~22 weapons
- `artifacts.ts` — ~15 artifact sets
- `regions.ts` — 6 regions + map pin data

### State

- `context/ThemeContext.tsx` — Dynamic theme color/gradient (default: fiery red `#FF4B4B`). Characters set this on detail view.

### Shared Components

- `components/Navbar.tsx` — Fixed top nav with 7 route links, desktop/mobile search, mobile hamburger menu
- `components/CharacterAvatar.tsx` — Circular avatar with fallback initial-letter display

### Styling

- Tailwind v4 utility classes + custom `.page-container`, `.glass`, `.hover-card` CSS in `src/index.css`
- Theme via CSS custom properties on `:root`
- Dark theme (black/deep purple background)

### Data Conventions

- Character `id` fields use Chinese names (e.g. `'可莉'`, `'班尼特'`)
- Character images expected at `/images/characters/{id}.png`, loaded by `CharacterAvatar.tsx` with error fallback
- Element mapping (`elementIcons`, `elementColors`) exported from `characters.ts`
