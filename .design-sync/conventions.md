# Barefoot Digital Design System — conventions

The Barefoot Digital component library, mirrored from the live site: the styled primitives
(`Button`, `Card`, `Input`) plus the brand's real page sections — Home, Paw, Engram, Landing
Page, Audit, and Demos — grouped in the pane. Built with Tailwind CSS v4 + CSS-variable design
tokens (shadcn-style). Build with the primitives for controls and use the page sections as
on-brand references; style your own surfaces with the tokens below, and every screen stays
on-brand in both light and dark.

A separate **Voice & Messaging** guide ships under guidelines — consult it for copy/tone (how
the brand sounds: honest, operator-to-operator, concrete over claimed).

## Setup & theming
- **No provider/wrapper needed.** Components are styled by the shipped stylesheet; the tokens
  live on `:root`. Just import the design system's `styles.css` (it pulls in the fonts, the
  compiled component CSS, and the token utilities).
- **Dark mode:** add `class="dark"` to any ancestor (e.g. `<html>` or a section). Every token
  flips automatically — you do **not** write separate dark styles; the same `bg-card` /
  `text-foreground` classes re-resolve.
- **Fonts** ship with the bundle: `font-sans` = Inter, `font-mono` = JetBrains Mono.

## Styling idiom — use these utility classes (do not invent color names)
Style with Tailwind utilities backed by the brand tokens. The palette is semantic — pick by
role, not by hue. These classes are guaranteed to ship:

| Role | Utilities |
|---|---|
| Page / surfaces | `bg-background`, `bg-card`, `bg-popover`, `bg-muted` |
| Primary action | `bg-primary` + `text-primary-foreground` |
| Secondary / subtle | `bg-secondary` + `text-secondary-foreground`, `bg-accent` + `text-accent-foreground` |
| Text | `text-foreground` (body), `text-muted-foreground` (secondary), `text-card-foreground` |
| Danger | `bg-destructive`, `text-destructive` |
| Borders / focus | `border-border`, `border-input`, `ring-ring` |
| Radius | `rounded-sm` · `rounded-md` · `rounded-lg` · `rounded-xl` · `rounded-full` |
| Type | `font-sans`, `font-mono` |

Underlying tokens (use `var(--…)` only for cases no utility covers): `--background`,
`--foreground`, `--card`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`,
`--muted-foreground`, `--accent`, `--destructive`, `--border`, `--ring`, `--radius`.

**Components carry their own styling — drive them with props, never re-skin them:**
`Button` takes `variant` (`default` · `secondary` · `outline` · `ghost` · `destructive` ·
`link`) and `size` (`sm` · `default` · `lg` · `icon`); `Input` takes native props plus
`aria-invalid` for the error state; `Card` composes with `CardHeader` / `CardTitle` /
`CardDescription` / `CardContent` / `CardFooter`.

## Where the truth lives
- The stylesheet (`styles.css` and the `_ds_bundle.css` it imports) — the authoritative token
  values and the utilities that exist.
- Per-component usage docs: `components/primitives/<Name>/<Name>.prompt.md`.

## Build snippet
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from '<pkg>'

// Components via props; token utilities for your own layout/surfaces.
<section className="bg-background text-foreground font-sans">
  <Card className="max-w-sm">
    <CardHeader>
      <CardTitle>AI Readiness Audit</CardTitle>
      <CardDescription>A flat-fee diagnostic — a prioritized roadmap in two weeks.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">No slideware. Real systems in production.</p>
    </CardContent>
    <CardFooter>
      <Button>Get the Assessment</Button>
    </CardFooter>
  </Card>
</section>
```
