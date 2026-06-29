import * as React from 'react'
export default function Image({ src, alt = '', fill, width, height, sizes, priority, quality, placeholder, blurDataURL, loader, unoptimized, onLoadingComplete, ...rest }: any) {
  const url = typeof src === 'string' ? src : (src?.src ?? src?.default?.src ?? '')
  const { style, ...attrs } = rest
  const finalStyle = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...(style || {}) }
    : style
  return <img src={url} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} style={finalStyle} {...attrs} />
}
