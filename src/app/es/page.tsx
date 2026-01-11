import { Metadata } from 'next';
import HomePageContent from '@/components/HomePageContent';

export const metadata: Metadata = {
  title: 'Henry Barefoot - Desarrollador Web Senior',
  description: 'Creando experiencias digitales excepcionales con tecnologías web modernas. Especializado en React, Next.js y desarrollo full-stack.',
};

export default function HomePageES() {
  return <HomePageContent locale="es" />;
}
