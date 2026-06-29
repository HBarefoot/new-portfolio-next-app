import { ScoreGauge } from 'barefoot-digital-ds'

export function Default() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <ScoreGauge score={0.92} label="Performance" />
      <ScoreGauge score={0.61} label="SEO" />
      <ScoreGauge score={0.34} label="Accessibility" />
    </div>
  )
}
