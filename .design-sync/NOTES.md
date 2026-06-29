# design-sync NOTES — Barefoot Digital Design System

This repo is a **Next.js application, not a design-system library**. The design system is
**synthesized** from the app's own source: the three shadcn primitives in
`src/components/ui/` (`Button`, `Card`, `Input`) + the brand tokens in `src/app/globals.css`.
There is no `dist/` or Storybook, so the converter runs off a small standalone package we build.

## Build pipeline (a re-sync must redo these before the converter)
1. **Standalone DS package** at `.design-sync/pkg/`:
   - `src/index.ts` re-exports `Button`/`buttonVariants`, the `Card*` parts, and `Input` from `@/components/ui/*`.
   - `dist/index.mjs` — esbuild bundle: `node .design-sync/pkg/build.mjs` (react/react-dom external, tsconfig path `@/*`).
   - `dist/index.d.ts` — **HAND-WRITTEN** (tsc nested the re-exported sources). If the primitives' props change in `src/`, edit this file by hand.
2. **Standalone CSS** (`.design-sync/pkg/ds.css`): `node .design-sync/build-ds-css.mjs` (extracts the `@theme inline` / `:root` / `.dark` token blocks from `globals.css`, disables Tailwind auto-detection, `@source`s the ui components + previews, and **safelists the brand-token utilities** via `@source inline(...)`), then `node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs -i dist-css/ds-input.css -o dist-css/ds.css`, then `cp dist-css/ds.css .design-sync/pkg/ds.css`.
3. **Fonts**: Inter + JetBrains Mono woff2 (OFL, from `@fontsource`) shipped via `.design-sync/pkg/fonts.css` + `.design-sync/pkg/fonts/`. A few weights only (Inter 400/500/600/700, JetBrains 400/500).
4. **Converter**: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry .design-sync/pkg/dist/index.mjs --out ./ds-bundle` then `package-validate.mjs ./ds-bundle --no-render-check`.

`pkg` (`barefoot-digital-ds`) is not installed in node_modules — the `--entry` flag is what makes PKG_DIR resolve to `.design-sync/pkg`. Do **not** symlink `node_modules/barefoot-digital-ds` → repo root: it makes ts-morph recurse infinitely through nested `node_modules` (ENAMETOOLONG).

## Re-sync risks (watch-list)
- **Hand-written `dist/index.d.ts`** is the API contract — it can drift from the real component props. Re-check it against `src/components/ui/*.tsx` on every sync.
- **CSS is compiled from `globals.css`** — token or component changes require re-running step 2. The shipped utilities are component classes + the safelist only (not all of Tailwind); if the design agent needs a utility outside that set, extend the safelist in `.design-sync/build-ds-css.mjs`.
- `Card` subparts (`CardHeader`…`CardAction`) are bundle exports but excluded from cards via `componentSrcMap: null`.
- **Fonts substituted from a public registry** (`@fontsource`), not the app's next/font pipeline — same families (Inter, JetBrains Mono), OFL-licensed. Recorded as accepted.

## Known render warns
- `[RENDER_SKIPPED]` — render check did NOT run (no Playwright/chromium; user chose to eyeball `.review.html`). Previews are human-verified, not machine-verified. This warn is expected on every no-browser run.
