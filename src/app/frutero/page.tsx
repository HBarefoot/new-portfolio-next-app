import { Metadata } from 'next';
import FruteroLanding from '@/components/frutero/FruteroLanding';

export const metadata: Metadata = {
  title: 'Frutero — Mushroom Farm Controller',
  description:
    'Open-source Raspberry Pi controller for mushroom fruiting chambers. Local-first, no SaaS rent. AI contamination advisor, multi-chamber fleet management.',
  keywords: [
    'Frutero',
    'mushroom grow',
    'fruiting chamber',
    'Raspberry Pi',
    'automation',
    'hydroponics',
    'monotub',
    'AI advisor',
    'open source',
  ],
  openGraph: {
    title: 'Frutero — Mushroom Farm Controller',
    description: 'One dashboard for all your grow chambers. Local-first, no SaaS rent.',
    images: ['/images/frutero/frutero-og.png'],
    type: 'website',
    url: 'https://next.henrybarefoot.com/frutero',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frutero — Mushroom Farm Controller',
    description: 'Open-source Raspberry Pi controller for mushroom grows.',
  },
};

export default function FruteroPage() {
  return <FruteroLanding />;
}
