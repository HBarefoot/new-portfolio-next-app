import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button,
} from 'barefoot-digital-ds'

export function ServiceCard() {
  return (
    <Card style={{ maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>AI Readiness Audit</CardTitle>
        <CardDescription>
          A flat-fee diagnostic that maps where AI can help your operations — and where it can&apos;t yet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>
          You get a prioritized, actionable roadmap in two weeks — no slideware.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Get the Assessment</Button>
      </CardFooter>
    </Card>
  )
}

export function StatCard() {
  return (
    <Card style={{ maxWidth: 280 }}>
      <CardHeader>
        <CardDescription>Open-source memory SDK</CardDescription>
        <CardTitle style={{ fontSize: 28 }}>Engram</CardTitle>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
          Persistent memory for AI agents. Shipped on npm, MIT-licensed.
        </p>
      </CardContent>
    </Card>
  )
}
