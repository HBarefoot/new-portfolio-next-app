import * as React from 'react'
export default function Link({ href, children, prefetch, replace, scroll, shallow, locale, ...rest }: any) {
  const h = typeof href === 'string' ? href : (href?.pathname ?? href?.href ?? '#')
  return <a href={h} {...rest}>{children}</a>
}
