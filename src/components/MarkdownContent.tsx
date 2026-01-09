'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Custom components for ReactMarkdown with professional styling
const MarkdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700/50 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-10 mb-5 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-4">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-6 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-gray-700 dark:text-gray-300 text-[17px] leading-[1.8] mb-5">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-5 ml-6 space-y-2 list-disc list-outside">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-5 ml-6 space-y-2 list-decimal list-outside">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-gray-700 dark:text-gray-300 text-[17px] leading-[1.7] pl-1">
      {children}
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-gray-900 dark:text-white">
      {children}
    </strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-gray-800 dark:text-gray-200">
      {children}
    </em>
  ),
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-blue-600 dark:text-blue-400 text-sm font-mono border border-gray-200 dark:border-gray-700/50">
          {children}
        </code>
      );
    }
    return (
      <code className="text-gray-100 text-sm font-mono block">
        {children}
      </code>
    );
  },
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-gray-900 dark:bg-gray-800/90 border border-gray-700 dark:border-gray-700/50 rounded-xl my-6 p-5 overflow-x-auto">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-800/30 py-4 px-6 rounded-r-xl my-6 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a 
      href={href} 
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-gray-200 dark:border-gray-700/50 my-10" />
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">
      {children}
    </thead>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
      {children}
    </tbody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr>{children}</tr>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
};

export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  if (!content) return null;
  
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
