import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Stack Developer Course - Henry Barefoot',
  description: 'Interactive Full Stack Development Course covering Frontend, Backend, Databases, and Deployment',
  keywords: ['Full Stack', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Course', 'Tutorial'],
};

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-slate-800/10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] [background-size:20px_20px]"></div>
      </div>
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
