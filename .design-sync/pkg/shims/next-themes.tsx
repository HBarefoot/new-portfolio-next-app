import * as React from 'react'
export function useTheme() {
  return { theme: 'light', setTheme: (_t?: string) => {}, resolvedTheme: 'light', themes: ['light', 'dark'], systemTheme: 'light' as const }
}
export function ThemeProvider({ children }: any) { return <>{children}</> }
