import type { Metadata } from "next";
import PawLanding from "@/components/paw/PawLanding";

export const metadata: Metadata = {
  title: "Paw — Your AI Agent Framework",
  description: "Paw is a personal AI agent framework: multi-provider, MCP-native, with a live canvas, on-demand skills, vector memory, and a web UI. Built with Bun. Open source.",
  keywords: ["Paw", "AI agent framework", "MCP", "Bun", "Claude", "Ollama", "OpenAI", "Gemini", "vector memory", "skills", "plugins", "cron", "open source"],
  openGraph: {
    title: "Paw — Your AI Agent Framework",
    description: "Multi-provider. MCP-native. Skills on demand. Built with Bun.",
    images: ["https://cms.henrybarefoot.com/uploads/paw_logo_blue_border_1771467263800_1027fe5096.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paw — Your AI Agent Framework",
    description: "Multi-provider. MCP-native. Skills on demand. Built with Bun.",
  },
};

export default function PawPage() {
  return <PawLanding />;
}
