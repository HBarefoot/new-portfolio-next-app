import { Metadata } from 'next';
import CaseStudiesPageContent from '@/components/case-studies/CaseStudiesPageContent';

export const metadata: Metadata = {
  title: 'Casos de Estudio - Henry Barefoot',
  description: 'Explora casos de estudio detallados de mi trabajo con clientes, mostrando enfoques de resolución de problemas, soluciones técnicas y resultados medibles en diversas industrias.',
};

export const revalidate = 60;

export default async function CaseStudiesPageES() {
  return <CaseStudiesPageContent locale="es" />;
}
