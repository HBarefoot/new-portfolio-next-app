# design-sync NOTES — Barefoot Digital Design System

This repo is a **Next.js application, not a design-system library**. The design system is
**synthesized** from the app's own source and mirrors the **live** component set (49 components:
the `ui/` primitives + the brand's real page sections). There is no `dist/` or Storybook, so the
converter runs off a small standalone package we build, with a shim layer that swaps Next.js
framework primitives so the real components render in Claude Design's React-only runtime.

## Build pipeline (a re-sync must redo these before the converter)
1. **Standalone DS package** at `.design-sync/pkg/`:
   - `src/index.ts` re-exports every **live** component from `@/components/*` (see "Live-only" below).
   - `shims/*.tsx` — Next.js replacements aliased in the esbuild build: `next/link`→`<a>`,
     `next/image`→`<img>`, `next/dynamic`→`React.lazy`+Suspense, `next/navigation`→stubs,
     `next-themes`→`{theme:'light'}` stub. Wired via esbuild `alias` in `build.mjs`.
   - `dist/index.mjs` — esbuild bundle: `node .design-sync/pkg/build.mjs` (react/react-dom external;
     framer-motion, lucide, react-markdown, cva, radix all bundle natively).
   - `dist/index.d.ts` — **GENERATED** by `node .design-sync/pkg/gen-dts.mjs` (rich types for the 3
     primitives; loose `(props?: any)` for the sections). Re-run after editing `index.ts`.
2. **Standalone CSS** (`.design-sync/pkg/ds.css`): `node .design-sync/build-ds-css.mjs` (extracts the
   `@theme inline`/`:root`/`.dark` token blocks from `globals.css`, `@source`s the **whole**
   `src/components` tree + previews, safelists brand-token utilities), then
   `node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs -i dist-css/ds-input.css -o dist-css/ds.css`,
   then `cp dist-css/ds.css .design-sync/pkg/ds.css`.
3. **Fonts**: Inter + JetBrains Mono woff2 (OFL, `@fontsource`) via `.design-sync/pkg/fonts.css` + `fonts/`.
4. **Guidelines**: brand `Voice & Messaging` guide at `.design-sync/pkg/guides/voice-and-messaging.md`;
   `cfg.guidelinesGlob = ['guides/**/*.md']` ships it under `guidelines/` (kept separate from the
   per-component docs in `docs/`, which become each component's `.prompt.md`).
5. **Converter**: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry .design-sync/pkg/dist/index.mjs --out ./ds-bundle` then `package-validate.mjs ./ds-bundle --no-render-check`.

`pkg` (`barefoot-digital-ds`) is not installed in node_modules — the `--entry` flag makes PKG_DIR
resolve to `.design-sync/pkg`. Do **not** symlink `node_modules/barefoot-digital-ds` → repo root
(ts-morph recurses infinitely through nested `node_modules`, ENAMETOOLONG).

## Live-only membership
Members are the components actually reachable from `src/app/**` (the live routes). Re-derive with a
reachability crawl from `src/app` following `@/…` + relative imports into `src/components`; anything
not reached is **stale** and must NOT be synced. Removed this way: About/Experience/Skills/Projects/
HeroBackground (old pre-reposition homepage sections), FooterLight, SkeletonDemo.

**Excluded (renderable-but-not, by design):** server-action / data-fetch / async-server components
(lead-magnet, AssessmentReady, Contact, LeadMagnetModal, the audit/demos that call `submitAudit`,
blog/case-study/HomePageContent Strapi fetchers) and non-visual infra (ConsentBanner, PrivacyChoices,
ThemeProvider, CalendlyEmbed). `Hero` is excluded too — its `next/dynamic(() => import())` can't be
single-file bundled.

## Re-sync risks (watch-list)
- **Live-only pruning is manual** — re-run the reachability crawl each sync; a section that drops off
  the live site must be removed from `index.ts` (+ its preview/doc), and a new live section added.
- **Shimmed components are visually identical, not literally identical** — framework imports are swapped
  at bundle time. If a component starts importing a `next/*` we don't shim, add a shim.
- **Generated `index.d.ts`** carries loose `any` props for sections — fine for page sections, but real
  reusable components (CaseStudyCard, ScoreGauge, …) could get richer types if it matters.
- **Floor cards (no preview):** the 9 Landing Page sections + TimelineEvent + CaseStudyCard — they need
  real Strapi `section`/case-study objects to render; left as floor cards rather than fabricated data.
- **Images:** sections referencing `/public` assets show broken images off the bundle (the bundle can't
  serve `/public`); harmless to the design agent (host-app assets), noted for review.
- **Fonts substituted** from a public registry (`@fontsource`), same families (Inter, JetBrains Mono), OFL.

## Known render warns
- `[RENDER_SKIPPED]` — render check did NOT run (no Playwright/chromium; reviewed by human eyeball via
  `.review.html`). Previews are human-verified, not machine-verified. Expected on every no-browser run.
