import { BeforeAfterSlider } from 'barefoot-digital-ds'

const img = (label: string, bg: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='50%' fill='white' font-family='sans-serif' font-size='40' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`,
  )

export function Default() {
  return (
    <div style={{ maxWidth: 560 }}>
      <BeforeAfterSlider
        beforeImage={img('Before', '#64748b')}
        afterImage={img('After', '#2563eb')}
        beforeLabel="Manual"
        afterLabel="Automated"
      />
    </div>
  )
}
