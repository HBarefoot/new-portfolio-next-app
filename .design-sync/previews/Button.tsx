import { Button } from 'barefoot-digital-ds'

const row = { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' } as const

export function Variants() {
  return (
    <div style={row}>
      <Button>Book a Strategy Call</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Learn more</Button>
    </div>
  )
}

export function Sizes() {
  return (
    <div style={row}>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function States() {
  return (
    <div style={row}>
      <Button>Enabled</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>Disabled outline</Button>
    </div>
  )
}
