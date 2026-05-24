"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Building2, Calendar, MapPin } from "lucide-react"

interface Experience {
  company: string
  role: string
  period: string
  location: string
  description: string
  responsibilities: string[]
  technologies?: string[]
}

const experiences: Experience[] = [
  {
    company: "Allied Yacht",
    role: "Director of Technology",
    period: "2025 - Present",
    location: "Remote / Global",
    description: "Leading architecture and development of an AI-powered yacht transport platform.",
    responsibilities: [
      "Led end-to-end architecture of AI-powered platform, reducing quote processing from days to minutes",
      "Architected pricing/routing engines across 15+ international ports with dynamic compliance logic",
      "Established modern standards using Next.js, TypeScript, Tailwind, and secure RESTful APIs"
    ],
    technologies: ["Next.js", "TypeScript", "AI/LLM", "REST APIs"]
  },
  {
    company: "Addigy",
    role: "Web Developer",
    period: "2023 - 2025",
    location: "Miami, FL",
    description: "Built scalable WordPress solutions and data dashboards for IT management platform.",
    responsibilities: [
      "Built and maintained scalable WordPress sites with custom plugins and reusable components",
      "Developed data dashboards in Looker Studio integrated with BigQuery",
      "Integrated third-party tools and APIs to streamline lead capture and marketing operations"
    ],
    technologies: ["WordPress", "PHP", "Looker Studio", "BigQuery"]
  },
  {
    company: "Vital Pharmaceuticals",
    role: "Sr. Web Developer",
    period: "2020 - 2023",
    location: "Miami, FL",
    description: "Led development team and delivered marketing solutions for fast-paced environment.",
    responsibilities: [
      "Led development team, managed workflows through task delegation and ticket creation",
      "Built landing pages and marketing features using PHP, Node.js, WordPress, and React",
      "Supported cross-functional teams and assisted with developer onboarding"
    ],
    technologies: ["React", "Node.js", "PHP", "WordPress"]
  },
  {
    company: "AARP",
    role: "Email Developer",
    period: "2022 - 2022",
    location: "Remote",
    description: "Developed email systems and automation workflows in Salesforce Marketing Cloud.",
    responsibilities: [
      "Designed and developed custom email templates within Salesforce Marketing Cloud",
      "Imported and segmented customer lists, set up automation workflows and performance metrics",
      "Ensured cross-client compatibility across major email platforms"
    ],
    technologies: ["Salesforce", "HTML Email", "Automation"]
  },
  {
    company: "Crystal Cruises",
    role: "Email Developer",
    period: "2018 - 2020",
    location: "Miami, FL",
    description: "Built automation tools and email systems for luxury cruise line.",
    responsibilities: [
      "Built custom Node.js tool using Cheerio, MongoDB, and Axios to automate HTML content creation",
      "Designed and coded responsive HTML emails optimized for all major clients",
      "Performed weekly website updates and collaborated with deployment/QA teams"
    ],
    technologies: ["Node.js", "MongoDB", "Cheerio", "Salesforce"]
  }
]

export function WorkExperienceSection() {
  return (
    <section id="experience" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Career Path
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Work Experience
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-pretty text-base text-muted-foreground">
            7+ years building production systems across maritime logistics, IT management, and marketing technology.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line - hidden on mobile */}
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%]"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-3 z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2">
                <div className="h-3.5 w-3.5 rounded-full border-2 border-background bg-muted-foreground" />
              </div>

              {/* Content Card */}
              <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}>
                <Card className="border-border/50 bg-card overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Building2 className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium uppercase tracking-wide">
                            {exp.company}
                          </span>
                        </div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </CardTitle>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li
                          key={respIndex}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.technologies && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
