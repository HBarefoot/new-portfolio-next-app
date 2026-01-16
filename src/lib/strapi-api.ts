import {
  StrapiHero,
  StrapiAbout,
  StrapiSkill,
  StrapiExperience,
  StrapiProject,
  StrapiCaseStudy,
  StrapiBlogPost,
  StrapiBlogCategory,
  StrapiAuthor,
  StrapiContactInfo,
  StrapiGalleryProject,
  StrapiSiteSettings,
  StrapiLandingPage,
  StrapiTechnology
} from '@/types/strapi';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

const getStrapiHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (process.env.STRAPI_API_KEY) {
    headers['Authorization'] = `Bearer ${process.env.STRAPI_API_KEY}`;
  }
  return headers;
};

/**
 * Unified fetch helper for server components and general use.
 * Handles base URL construction and header management (including authentication).
 *
 * @param endpoint - The API endpoint (e.g., '/hero' or 'hero')
 * @param options - Fetch options (headers, cache, etc.)
 * @returns The fetch response
 */
export async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  const url = `${STRAPI_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(getStrapiHeaders());

  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers.set(key, value);
      });
    } else if (Array.isArray(options.headers)) {
      for (const [key, value] of options.headers) {
        headers.set(key, value);
      }
    } else {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (typeof value !== 'undefined') {
          headers.set(key, String(value));
        }
      });
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  return res;
}

// Generic helper for fetching single entity
async function fetchSingle<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetchStrapi(endpoint, options);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// Generic helper for fetching collection
async function fetchCollection<T>(endpoint: string, options?: RequestInit): Promise<T[]> {
  try {
    const res = await fetchStrapi(endpoint, options);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Server-side fetch for Hero
export async function fetchHeroServer(locale: string = 'en') {
  return fetchSingle<StrapiHero>(`/hero?locale=${locale}&populate=*`, {
    next: { revalidate: 60 },
  });
}

// Client/Shared fetch for Hero
export const getHero = async (locale: string = 'en') => {
  return fetchSingle<StrapiHero>(`/hero?locale=${locale}&populate=*`);
};

// Server-side fetch for About
export async function fetchAboutServer(locale: string = 'en') {
  return fetchSingle<StrapiAbout>(`/about?locale=${locale}&populate=*`, {
    next: { revalidate: 60 },
  });
}

export const getAbout = async (locale: string = 'en') => {
  return fetchSingle<StrapiAbout>(`/about?locale=${locale}&populate=*`);
};

// Server-side fetch for Skills
export async function fetchSkillsServer(locale: string = 'en') {
  return fetchCollection<StrapiSkill>(`/skills?locale=${locale}&populate=*&sort=order:asc`, {
    next: { revalidate: 60 },
  });
}

export const getSkills = async (locale: string = 'en') => {
  return fetchCollection<StrapiSkill>(`/skills?locale=${locale}&populate=*&sort=order:asc`);
};

// Server-side fetch for Experiences
export async function fetchExperiencesServer(locale: string = 'en') {
  return fetchCollection<StrapiExperience>(`/experiences?locale=${locale}&populate=*&sort=order:asc`, {
    next: { revalidate: 60 },
  });
}

export const getExperiences = async (locale: string = 'en') => {
  return fetchCollection<StrapiExperience>(`/experiences?locale=${locale}&populate=*&sort=order:asc`);
};

// Server-side fetch for Projects
export async function fetchProjectsServer(locale: string = 'en') {
  return fetchCollection<StrapiProject>(`/projects?locale=${locale}&populate=*&sort=order:asc`, {
    next: { revalidate: 60 },
  });
}

export const getProjects = async (params?: { featured?: boolean; locale?: string }) => {
  const locale = params?.locale || 'en';
  const query = params?.featured
    ? `/projects?locale=${locale}&populate=*&filters[isFeatured][$eq]=true&sort=order:asc`
    : `/projects?locale=${locale}&populate=*&sort=order:asc`;
  return fetchCollection<StrapiProject>(query);
};

export const getProject = async (slug: string, locale: string = 'en') => {
  return fetchCollection<StrapiProject>(`/projects?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`);
};

export const getTechnologies = async () => {
  return fetchCollection<StrapiTechnology>('/technologies?populate=*');
};

export const getCaseStudies = async (params?: { featured?: boolean; locale?: string }) => {
  const locale = params?.locale || 'en';
  const query = params?.featured
    ? `/case-studies?locale=${locale}&populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&filters[featured][$eq]=true&sort=order:asc`
    : `/case-studies?locale=${locale}&populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&sort=order:asc`;
  return fetchCollection<StrapiCaseStudy>(query);
};

export const getCaseStudy = async (slug: string, locale: string = 'en') => {
  return fetchCollection<StrapiCaseStudy>(`/case-studies?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`);
};

export const getBlogPosts = async (params?: { category?: string; limit?: number; locale?: string }) => {
  const locale = params?.locale || 'en';
  let query = `/blog-posts?locale=${locale}&populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage&populate[4]=codeSnippets&sort=publishedAt:desc`;
  if (params?.category) {
    query += `&filters[category][slug][$eq]=${params.category}`;
  }
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }
  return fetchCollection<StrapiBlogPost>(query);
};

export const getBlogPost = async (slug: string, locale: string = 'en') => {
  return fetchCollection<StrapiBlogPost>(`/blog-posts?locale=${locale}&filters[slug][$eq]=${slug}&populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage&populate[4]=codeSnippets`);
};

export const getBlogCategories = async () => {
  return fetchCollection<StrapiBlogCategory>('/blog-categories?populate=*');
};

export const getAuthors = async () => {
  return fetchCollection<StrapiAuthor>('/authors?populate=*');
};

export const getContactInfo = async () => {
  return fetchSingle<StrapiContactInfo>('/contact-info?populate=*');
};

export const getGalleryProjects = async (locale: string = 'en') => {
  return fetchCollection<StrapiGalleryProject>(`/gallery-projects?locale=${locale}&populate=*&filters[isVisible][$eq]=true&sort=order:asc`);
};

export const getSiteSettings = async () => {
  return fetchSingle<StrapiSiteSettings>('/site-setting?populate=*');
};

// Landing Pages
export const getLandingPages = async (locale: string = 'en') => {
  return fetchCollection<StrapiLandingPage>(`/landing-pages?locale=${locale}&populate[sections][populate]=*&filters[isActive][$eq]=true`);
};

export const getLandingPageSlugs = async (locale: string = 'en') => {
  return fetchCollection<StrapiLandingPage>(`/landing-pages?locale=${locale}&fields[0]=slug&filters[isActive][$eq]=true`);
};

export const getLandingPage = async (slug: string, locale: string = 'en') => {
  // Use simple populate for ogImage to avoid Strapi v5 validation errors
  return fetchCollection<StrapiLandingPage>(`/landing-pages?locale=${locale}&filters[slug][$eq]=${slug}&populate[sections][populate]=*&populate[ogImage]=true`);
};

// Fetch landing page by documentId (for draft preview)
// Note: Strapi v5 single document endpoint requires URL-encoded nested populate for dynamic zones
export const getLandingPageByDocumentId = async (documentId: string, isDraft: boolean = false, locale: string = 'en') => {
  const statusParam = isDraft ? '&status=draft' : '';
  // Use nested populate to get component items within sections dynamic zone
  // Note: ogImage uses simple populate (=true) instead of populate=* to avoid validation errors
  return fetchSingle<StrapiLandingPage>(`/landing-pages/${documentId}?locale=${locale}&populate[sections][populate]=*&populate[ogImage]=true${statusParam}`);
};
