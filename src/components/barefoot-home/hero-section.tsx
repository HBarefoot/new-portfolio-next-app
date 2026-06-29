import Link from "next/link"

export function HeroSection() {
  return (
    <section className="heroA relative flex min-h-screen items-center overflow-hidden bg-background pt-24 text-foreground">
      {/* Background layers */}
      <div className="ha-grid-layer pointer-events-none absolute inset-0" />
      <div className="ha-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <p
          className="ha-rise text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          style={{ margin: "0 0 22px" }}
        >
          AI enablement &amp; engineering
        </p>

        <h1 className="ha-h1 ha-rise">Put AI to work in your organization.</h1>

        <p className="ha-sub ha-rise-2" style={{ marginTop: 26 }}>
          AI enablement for HR, L&amp;D, IT, and operations teams — strategy, training, and the
          systems to back it. Built by an engineer who ships real tools and real deployments, not
          slideware.
        </p>

        <div
          className="ha-cta ha-rise-2 flex items-center gap-[14px]"
          style={{ marginTop: 38 }}
        >
          <Link href="/strategy" className="ha-btn ha-primary h-[50px] px-[26px] text-base">
            Book a call <span className="ha-arrow">→</span>
          </Link>
          <Link href="#work" className="ha-btn ha-outline h-[50px] px-6 text-base">
            See what we&apos;ve built
          </Link>
        </div>

        <div
          className="ha-rise-3 flex flex-wrap items-center gap-x-3 gap-y-2.5 border-t border-border pt-[22px] text-[13.5px] text-muted-foreground"
          style={{ marginTop: "clamp(40px, 7vh, 64px)" }}
        >
          <span className="font-semibold tracking-[0.01em] text-foreground">Shipped &amp; in production</span>
          <span className="opacity-40">·</span>
          <span className="ha-mono text-[12.5px]">
            Engram <span style={{ color: "#16a34a" }}>npm, MIT</span>
          </span>
          <span className="opacity-40">·</span>
          <span className="ha-mono text-[12.5px]">Paw — agent framework</span>
          <span className="opacity-40">·</span>
          <span>Maritime automation live for Allied Yacht Transport</span>
        </div>
      </div>
    </section>
  )
}
