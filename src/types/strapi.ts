// Strapi Media Types
export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

// Content Type Interfaces
export interface StrapiHero {
  name: string;
  title: string;
  subtitle?: string;
  description?: string;
  profileImage?: { data: StrapiEntity<StrapiImage> | null };
  ctaButtonText?: string;
  ctaButtonLink?: string;
  resumeFile?: { data: StrapiEntity<StrapiImage> | null };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiAbout {
  headline: string;
  biography: string;
  yearsExperience?: number;
  location?: string;
  highlights?: Array<{
    title: string;
    description: string;
  }>;
  highlightImage?: { data: StrapiEntity<StrapiImage> | null };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiSkill {
  name: string;
  category: 'Languages' | 'Frameworks & Libraries' | 'Tools' | 'Other';
  proficiencyLevel?: number;
  icon?: string;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTechnology {
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  category?: string;
  projects?: { data: StrapiEntity<StrapiProject>[] };
  case_studies?: { data: StrapiEntity<StrapiCaseStudy>[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string;
  responsibilities?: Array<{ description: string }>;
  companyLogo?: { data: StrapiEntity<StrapiImage> | null };
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiProject {
  title: string;
  slug: string;
  description: string;
  image?: { data: StrapiEntity<StrapiImage> | null };
  technologies?: { data: StrapiEntity<StrapiTechnology>[] };
  features?: Array<{ title: string; description?: string }>;
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  isFeatured: boolean;
  order: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiCaseStudy {
  title: string;
  slug: string;
  client: string;
  industry?: string;
  projectDate?: string;
  projectDuration?: string;
  excerpt: string;
  heroImage?: { data: StrapiEntity<StrapiImage> | null };
  heroTagline?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  metrics?: Array<{
    label: string;
    value: string;
    icon?: string;
    description?: string;
  }>;
  role?: string;
  responsibilities?: Array<{
    title: string;
    description?: string;
  }>;
  technologies?: { data: StrapiEntity<StrapiTechnology>[] };
  methodologies?: Array<{
    name: string;
    description?: string;
  }>;
  gallery?: { data: StrapiEntity<StrapiImage>[] };
  screenshots?: Array<{
    title: string;
    image?: { data: StrapiEntity<StrapiImage> | null };
    caption?: string;
    order: number;
  }>;
  beforeAfterImages?: Array<{
    title: string;
    beforeImage?: { data: StrapiEntity<StrapiImage> | null };
    afterImage?: { data: StrapiEntity<StrapiImage> | null };
    description?: string;
  }>;
  phases?: Array<{
    title: string;
    description?: string;
    duration?: string;
    deliverables?: any;
    order: number;
  }>;
  timeline?: Array<{
    date: string;
    milestone: string;
    description?: string;
    icon?: string;
  }>;
  clientTestimonial?: {
    quote: string;
    clientName: string;
    clientTitle?: string;
    clientCompany?: string;
    clientPhoto?: { data: StrapiEntity<StrapiImage> | null };
    rating: number;
  };
  relatedProjects?: { data: StrapiEntity<StrapiProject>[] };
  relatedCaseStudies?: { data: StrapiEntity<StrapiCaseStudy>[] };
  featured: boolean;
  order: number;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: { data: StrapiEntity<StrapiImage> | null };
  author?: { data: StrapiEntity<StrapiAuthor> | null };
  category?: { data: StrapiEntity<StrapiBlogCategory> | null };
  tags?: any;
  readingTime?: number;
  publishedAt: string;
  sourceWikiPage?: string;
  codeSnippets?: Array<{
    language: string;
    code: string;
    filename?: string;
    caption?: string;
  }>;
  businessContext?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiBlogCategory {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  blog_posts?: { data: StrapiEntity<StrapiBlogPost>[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiAuthor {
  name: string;
  bio?: string;
  avatar?: { data: StrapiEntity<StrapiImage> | null };
  email?: string;
  socialLinks?: Array<{
    platform: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Website' | 'Email';
    url: string;
  }>;
  blog_posts?: { data: StrapiEntity<StrapiBlogPost>[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiContactInfo {
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
  timezone?: string;
  socialLinks?: Array<{
    platform: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Website' | 'Email';
    url: string;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiGalleryProject {
  title: string;
  slug: string;
  description?: string;
  images?: { data: StrapiEntity<StrapiImage>[] };
  thumbnail?: { data: StrapiEntity<StrapiImage> | null };
  category?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiSiteSettings {
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: { data: StrapiEntity<StrapiImage> | null };
  favicon?: { data: StrapiEntity<StrapiImage> | null };
  googleAnalyticsId?: string;
  headerCTAText?: string;
  headerCTALink?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper function to construct full media URLs
export const getStrapiMediaUrl = (url: string | undefined): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || 'http://localhost:1337'}${url}`;
};

// Helper to extract image URL from Strapi response
// Handles both Strapi v4 (nested data.attributes) and v5 (flat object) structures
export const getStrapiImageUrl = (image: any): string => {
  if (!image) return '';
  
  // Strapi v5 flat structure (image has url directly)
  if (image.url) {
    return getStrapiMediaUrl(image.url);
  }
  
  // Strapi v4 nested structure (image.data.attributes.url)
  if (image.data?.attributes?.url) {
    return getStrapiMediaUrl(image.data.attributes.url);
  }
  
  return '';
};
