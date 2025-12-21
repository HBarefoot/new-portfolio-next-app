export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  sourceWikiPage?: string;
  codeSnippets?: CodeSnippet[];
  businessContext?: string;
  industry?: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
  description?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface BlogMeta {
  totalPosts: number;
  categories: BlogCategory[];
  tags: string[];
  lastUpdated: string;
}
