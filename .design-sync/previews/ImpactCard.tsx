import { ImpactCard } from 'barefoot-digital-ds'

export function Default() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <ImpactCard score={0.34} />
      <ImpactCard score={0.88} />
    </div>
  )
}
