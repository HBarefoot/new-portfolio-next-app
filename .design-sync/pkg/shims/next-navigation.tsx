export function usePathname() { return '/' }
export function useRouter() {
  return { push() {}, replace() {}, back() {}, forward() {}, prefetch() {}, refresh() {} }
}
export function useSearchParams() { return new URLSearchParams() }
export function useParams() { return {} as Record<string, string> }
export function redirect(_url?: string) {}
export function notFound() {}
