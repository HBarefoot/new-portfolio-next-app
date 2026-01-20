"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Database, Globe, Wrench } from "lucide-react"
import { motion } from "framer-motion"

// Data ported from ProjectsGallery
const projects = [
  {
    title: "Yacht Transport AI Platform",
    description: "A comprehensive B2B maritime shipping platform that transforms yacht transportation. Built for Allied Yacht Transport, this production-ready application converts a traditionally manual, multi-day quote process into an instant, AI-powered experience.",
    image: "/yachttransport.webp",
    link: "https://yachttransport.ai",
    technologies: ["Next.js", "OpenAI", "Prisma", "Mapbox"],
    category: "Full-Stack Platform"
  },
  {
    title: "RAG AI Workflow",
    description: "Advanced n8n workflow implementing RAG architecture for intelligent document processing and AI-powered responses. Features real-time data retrieval and vector embeddings.",
    image: "/rag-project.webp",
    link: null, // No public link
    technologies: ["n8n", "Vector DB", "OpenAI", "Telegram"],
    category: "AI Automation"
  },
  {
    title: "Social Media Automation",
    description: "Comprehensive n8n workflow for automated social media content management. Integrates Google Sheets, AI content generation, and multi-platform posting.",
    image: "/social-media-workflow.webp",
    link: null,
    technologies: ["n8n", "Google Sheets", "GPT-4"],
    category: "Marketing Automation"
  }
]

export function FeaturedWorkSection() {
  return (
    <section id="work" className="bg-secondary/20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Featured Work
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Proof of Impact
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Featured Project - Yacht Transport */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-full overflow-hidden border-border/50 bg-card flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden bg-secondary group">
                <Image
                  src={projects[0].image}
                  alt={projects[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {projects[0].link && (
                    <a href={projects[0].link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-background/90 text-foreground rounded-full text-sm font-medium">
                      <Globe size={16} /> Visit Live Site
                    </a>
                  )}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-foreground">
                    {projects[0].title}
                  </CardTitle>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Flagship
                  </span>
                </div>
                <CardDescription className="text-muted-foreground line-clamp-3">
                  {projects[0].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="mb-6 flex flex-wrap gap-2">
                  {projects[0].technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5"
                    >
                      <Code className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{tech}</span>
                    </div>
                  ))}
                </div>
                {projects[0].link && (
                  <Button asChild className="group border-0">
                    <Link href="/case-studies/yacht-transport">
                      Read Case Study
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Secondary Projects Column */}
          <div className="flex flex-col gap-6">
            {projects.slice(1).map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                className="flex-1"
              >
                <Card className="h-full border-border/50 bg-card flex flex-col">
                  <div className="relative aspect-[2/1] w-full overflow-hidden bg-secondary group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <div key={tech} className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-1">
                          <span className="text-[10px] font-medium text-foreground">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
