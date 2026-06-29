import { AuditForm } from 'barefoot-digital-ds'

export function Default() {
  return <AuditForm onAudit={() => {}} isLoading={false} />
}

export function Loading() {
  return <AuditForm onAudit={() => {}} isLoading={true} />
}
