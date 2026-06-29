import { Input } from 'barefoot-digital-ds'

const field = { display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 320 } as const
const label = { fontSize: 13, fontWeight: 500 } as const

export function Default() {
  return (
    <label style={field}>
      <span style={label}>Work email</span>
      <Input type="email" placeholder="Enter your email" />
    </label>
  )
}

export function Disabled() {
  return (
    <label style={field}>
      <span style={label}>Company (locked)</span>
      <Input defaultValue="Barefoot Digital" disabled />
    </label>
  )
}

export function Invalid() {
  return (
    <label style={field}>
      <span style={label}>Email</span>
      <Input type="email" defaultValue="not-an-email" aria-invalid="true" />
    </label>
  )
}
