import { Metadata } from 'next';
import PawLanding from '@/components/paw/PawLanding';

export const metadata: Metadata = {
  title: 'Paw — Your AI Agent Framework',
  description:
    'Paw is a personal AI assistant framework: multi-provider, MCP-native, with live canvas, skills ecosystem, vector memory, and a web UI. Built with Bun. Open source.',
  keywords: [
    'Paw',
    'AI agent framework',
    'MCP',
    'Bun',
    'Claude',
    'Ollama',
    'OpenAI',
    'Gemini',
    'vector memory',
    'skills',
    'plugins',
    'cron',
    'live canvas',
    'open source',
  ],
  openGraph: {
    title: 'Paw — Your AI Agent Framework',
    description:
      'Multi-provider. MCP-native. Skills on demand. Built with Bun.',
    images: ['/images/paw/paw-logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paw — Your AI Agent Framework',
    description:
      'Multi-provider. MCP-native. Skills on demand. Built with Bun.',
  },
};

export default function PawPage() {
  return <PawLanding />;
}
