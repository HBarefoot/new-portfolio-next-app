---
category: Primitives
---

# Button

Primary action control. Choose a `variant` for emphasis and a `size` for density.

- `variant`: `default` (solid, primary action) · `secondary` · `outline` · `ghost` · `destructive` · `link`
- `size`: `sm` · `default` · `lg`, plus `icon` / `icon-sm` / `icon-lg` for icon-only buttons
- `asChild`: render as the child element (e.g. wrap a link) instead of a `<button>`

```tsx
<Button>Book a Strategy Call</Button>
<Button variant="outline" size="lg">See What We've Built</Button>
<Button asChild><a href="/strategy">Contact</a></Button>
```
