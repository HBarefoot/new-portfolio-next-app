import { Metadata } from 'next';
import EngramLanding from '@/components/engram/EngramLanding';

export const metadata: Metadata = {
  title: 'Engram — Persistent Memory for AI Agents',
  description:
    'Give your AI agents cross-session memory. Works with Claude, Cursor, ChatGPT. Local-first, offline, open source.',
  keywords: [
    'AI memory',
    'Claude',
    'MCP',
    'AI agents',
    'persistent memory',
    'developer tools',
    'engram',
    'SQLite',
  ],
  openGraph: {
    title: 'Engram — Persistent Memory for AI Agents',
    description: 'SQLite for agent state. Your AI finally remembers you.',
    images: ['/images/engram/engram-og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engram — Persistent Memory for AI Agents',
    description: 'SQLite for agent state. Your AI finally remembers you.',
    images: ['/images/engram/engram-og.png'],
  },
};

export default function EngramPage() {
  return <EngramLanding />;
}
