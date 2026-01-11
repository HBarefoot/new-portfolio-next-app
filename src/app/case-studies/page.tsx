import { Metadata } from 'next';
import CaseStudiesPageContent from '@/components/case-studies/CaseStudiesPageContent';

export const metadata: Metadata = {
  title: 'Case Studies - Henry Barefoot',
  description: 'Explore detailed case studies of my client work, showcasing problem-solving approaches, technical solutions, and measurable results across various industries.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CaseStudiesPage() {
  return <CaseStudiesPageContent locale="en" />;
}
