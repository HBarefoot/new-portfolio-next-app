import {
  StrapiHero,
  StrapiAbout,
  StrapiSkill,
  StrapiExperience,
  StrapiProject,
  StrapiTechnology,
  StrapiCaseStudy,
  StrapiBlogPost,
  StrapiBlogCategory,
  StrapiAuthor,
  StrapiContactInfo,
  StrapiGalleryProject,
  StrapiSiteSettings,
  StrapiLandingPage,
} from '@/types/strapi';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

const getHeaders = (headers: Record<string, string> = {}) => {
  const defaults: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (process.env.STRAPI_API_KEY) {
    defaults['Authorization'] = `Bearer ${process.env.STRAPI_API_KEY}`;
  }

  return { ...defaults, ...headers };
};

/**
 * Helper to fetch a single item (returns object or null)
 */
async function fetchStrapi<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: getHeaders(options.headers as Record<string, string>),
    });

    if (!res.ok) {
      console.warn(`Strapi fetch failed for ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

/**
 * Helper to fetch a list of items (returns array or empty array)
 */
async function fetchStrapiList<T>(endpoint: string, options: RequestInit = {}): Promise<T[]> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: getHeaders(options.headers as Record<string, string>),
    });

    if (!res.ok) {
      console.warn(`Strapi fetch list failed for ${endpoint}: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error(`Error fetching list ${endpoint}:`, error);
    return [];
  }
}

// ==========================================
// Server-side fetchers (with cache)
// ==========================================

export async function fetchHeroServer(locale: string = 'en') {
  return fetchStrapi<StrapiHero>(`/hero?locale=${locale}&populate=*`, {
    next: { revalidate: 60 }
  });
}

export async function fetchAboutServer(locale: string = 'en') {
  return fetchStrapi<StrapiAbout>(`/about?locale=${locale}&populate=*`, {
    next: { revalidate: 60 }
  });
}

export async function fetchSkillsServer(locale: string = 'en') {
  return fetchStrapiList<StrapiSkill>(`/skills?locale=${locale}&populate=*&sort=order:asc`, {
    next: { revalidate: 60 }
  });
}

export async function fetchExperiencesServer(locale: string = 'en') {
  return fetchStrapiList<StrapiExperience>(`/experiences?locale=${locale}&populate=*&sort=order:asc`, {
    next: { revalidate: 60 }
  });
}

export async function fetchProjectsServer(locale: string = 'en') {
  return fetchStrapiList<StrapiProject>(`/projects?locale=${locale}&populate=*&sort=order:asc`, {
    next: { revalidate: 60 }
  });
}

// ==========================================
// General fetchers (replaces Axios)
// ==========================================

export const getHero = (locale: string = 'en') =>
  fetchStrapi<StrapiHero>(`/hero?locale=${locale}&populate=*`);

export const getAbout = (locale: string = 'en') =>
  fetchStrapi<StrapiAbout>(`/about?locale=${locale}&populate=*`);

export const getSkills = (locale: string = 'en') =>
  fetchStrapiList<StrapiSkill>(`/skills?locale=${locale}&populate=*&sort=order:asc`);

export const getExperiences = (locale: string = 'en') =>
  fetchStrapiList<StrapiExperience>(`/experiences?locale=${locale}&populate=*&sort=order:asc`);

export const getProjects = (params?: { featured?: boolean; locale?: string }) => {
  const locale = params?.locale || 'en';
  const query = params?.featured
    ? `/projects?locale=${locale}&populate=*&filters[isFeatured][$eq]=true&sort=order:asc`
    : `/projects?locale=${locale}&populate=*&sort=order:asc`;
  return fetchStrapiList<StrapiProject>(query);
};

// Returns a list because it filters on a collection type
export const getProject = (slug: string, locale: string = 'en') =>
  fetchStrapiList<StrapiProject>(`/projects?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`);

export const getTechnologies = () =>
  fetchStrapiList<StrapiTechnology>('/technologies?populate=*');

export const getCaseStudies = (params?: { featured?: boolean; locale?: string }) => {
  const locale = params?.locale || 'en';
  const query = params?.featured
    ? `/case-studies?locale=${locale}&populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&filters[featured][$eq]=true&sort=order:asc`
    : `/case-studies?locale=${locale}&populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&sort=order:asc`;
  return fetchStrapiList<StrapiCaseStudy>(query);
};

export const getCaseStudy = (slug: string, locale: string = 'en') =>
  fetchStrapiList<StrapiCaseStudy>(`/case-studies?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`);

// Fetch case study by documentId (for draft preview)
export const getCaseStudyByDocumentId = (documentId: string, isDraft: boolean = false, locale: string = 'en') => {
  const statusParam = isDraft ? '&status=draft' : '';
  // Note: Single document fetch returns an object (T | null), not a list
  return fetchStrapi<StrapiCaseStudy>(`/case-studies/${documentId}?locale=${locale}&populate=*${statusParam}`);
};

export const getBlogPosts = (params?: { category?: string; limit?: number; locale?: string }) => {
  const locale = params?.locale || 'en';
  let query = `/blog-posts?locale=${locale}&populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage&populate[4]=codeSnippets&sort=publishedAt:desc`;
  if (params?.category) {
    query += `&filters[category][slug][$eq]=${params.category}`;
  }
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }
  return fetchStrapiList<StrapiBlogPost>(query);
};

export const getBlogPost = (slug: string, locale: string = 'en') =>
  fetchStrapiList<StrapiBlogPost>(`/blog-posts?locale=${locale}&filters[slug][$eq]=${slug}&populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage&populate[4]=codeSnippets`);

export const getBlogCategories = () =>
  fetchStrapiList<StrapiBlogCategory>('/blog-categories?populate=*');

export const getAuthors = () =>
  fetchStrapiList<StrapiAuthor>('/authors?populate=*');

export const getContactInfo = () =>
  fetchStrapi<StrapiContactInfo>('/contact-info?populate=*');

export const getGalleryProjects = (locale: string = 'en') =>
  fetchStrapiList<StrapiGalleryProject>(`/gallery-projects?locale=${locale}&populate=*&filters[isVisible][$eq]=true&sort=order:asc`);

export const getSiteSettings = () =>
  fetchStrapi<StrapiSiteSettings>('/site-setting?populate=*');

// Landing Pages
export const getLandingPages = (locale: string = 'en') =>
  fetchStrapiList<StrapiLandingPage>(`/landing-pages?locale=${locale}&populate[sections][populate]=*&filters[isActive][$eq]=true`);

export const getLandingPage = (slug: string, locale: string = 'en') =>
  // Use simple populate for ogImage to avoid Strapi v5 validation errors
  fetchStrapiList<StrapiLandingPage>(`/landing-pages?locale=${locale}&filters[slug][$eq]=${slug}&populate[sections][populate]=*&populate[ogImage]=true`);

// Fetch landing page by documentId (for draft preview)
// Note: Strapi v5 single document endpoint requires URL-encoded nested populate for dynamic zones
export const getLandingPageByDocumentId = (documentId: string, isDraft: boolean = false, locale: string = 'en') => {
  const statusParam = isDraft ? '&status=draft' : '';
  // Use nested populate to get component items within sections dynamic zone
  // Note: ogImage uses simple populate (=true) instead of populate=* to avoid validation errors
  // Single document fetch returns an object, not a list.
  return fetchStrapi<StrapiLandingPage>(`/landing-pages/${documentId}?locale=${locale}&populate[sections][populate]=*&populate[ogImage]=true${statusParam}`);
};
