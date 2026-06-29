import * as React from 'react'
export default function dynamic(loader: any, options: any = {}) {
  const Lazy = React.lazy(() =>
    Promise.resolve(typeof loader === 'function' ? loader() : loader).then((m: any) => ({ default: m?.default ?? m })),
  )
  const Loading = options?.loading
  return function DynamicShim(props: any) {
    return (
      <React.Suspense fallback={Loading ? React.createElement(Loading, { isLoading: true, pastDelay: true, error: null }) : null}>
        <Lazy {...props} />
      </React.Suspense>
    )
  }
}
