import { MarkdownContent } from 'barefoot-digital-ds'

const md = `# AI Readiness Assessment

A **short, practical** assessment to find where AI can help your team.

- Score the fifteen statements
- Total them
- Focus on the weakest dimension first

> No slideware. Real systems in production.`

export function Default() {
  return <div style={{ maxWidth: 560 }}><MarkdownContent content={md} /></div>
}
