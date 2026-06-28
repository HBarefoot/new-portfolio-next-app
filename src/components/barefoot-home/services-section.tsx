"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Brain, Code2, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Search,
    title: "AI Readiness Audit",
    description:
      "A flat-fee diagnostic that maps where AI can help your operations — and where it can't yet — with a prioritized, actionable roadmap.",
  },
  {
    icon: Brain,
    title: "Custom AI & Automation Systems",
    description:
      "RAG, AI agents, and automation built into your stack — document processing, internal tools, and workflows that run in production.",
  },
  {
    icon: Code2,
    title: "Full-Stack AI Engineering",
    description:
      "Production applications and infrastructure — Next.js, FastAPI, and modern tooling — built to scale.",
  },
  {
    icon: GraduationCap,
    title: "AI Enablement & Training",
    description:
      "Workshops and hands-on guidance that get your team confidently using AI — practical, role-specific, grounded in real tools.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What I Do
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Productized Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Productized engagements that take you from AI strategy to systems running in production.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="group h-full border-border/50 bg-card transition-colors hover:border-border hover:bg-secondary/30">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <service.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
