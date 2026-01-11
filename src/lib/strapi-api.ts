import axios from 'axios';

const strapiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
    ...(process.env.STRAPI_API_KEY && {
      'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`
    }),
  },
});

// Helper functions for API calls
export const getHero = (locale: string = 'en') => strapiApi.get(`/hero?locale=${locale}&populate=*`);

// Server-side fetch for Hero (no axios wrapper for server components)
export async function fetchHeroServer(locale: string = 'en') {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
  try {
    const res = await fetch(`${baseUrl}/hero?locale=${locale}&populate=*`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.STRAPI_API_KEY && {
          'Authorization': `Bearer ${process.env.STRAPI_API_KEY}`
        }),
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export const getAbout = (locale: string = 'en') => strapiApi.get(`/about?locale=${locale}&populate=*`);

export const getSkills = (locale: string = 'en') => 
  strapiApi.get(`/skills?locale=${locale}&populate=*&sort=order:asc`);

export const getExperiences = (locale: string = 'en') => 
  strapiApi.get(`/experiences?locale=${locale}&populate=*&sort=order:asc`);

export const getProjects = (params?: { featured?: boolean; locale?: string }) => {
  const locale = params?.locale || 'en';
  const query = params?.featured 
    ? `/projects?locale=${locale}&populate=*&filters[isFeatured][$eq]=true&sort=order:asc`
    : `/projects?locale=${locale}&populate=*&sort=order:asc`;
  return strapiApi.get(query);
};

export const getProject = (slug: string, locale: string = 'en') => 
  strapiApi.get(`/projects?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`);

export const getTechnologies = () => 
  strapiApi.get('/technologies?populate=*');

export const getCaseStudies = (params?: { featured?: boolean; locale?: string }) => {
  const locale = params?.locale || 'en';
  const query = params?.featured
    ? `/case-studies?locale=${locale}&populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&filters[featured][$eq]=true&sort=order:asc`
    : `/case-studies?locale=${locale}&populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&sort=order:asc`;
  return strapiApi.get(query);
};

export const getCaseStudy = (slug: string, locale: string = 'en') => 
  strapiApi.get(`/case-studies?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`);

export const getBlogPosts = (params?: { category?: string; limit?: number; locale?: string }) => {
  const locale = params?.locale || 'en';
  let query = `/blog-posts?locale=${locale}&populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage&sort=publishedAt:desc`;
  if (params?.category) {
    query += `&filters[category][slug][$eq]=${params.category}`;
  }
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }
  return strapiApi.get(query);
};

export const getBlogPost = (slug: string, locale: string = 'en') => 
  strapiApi.get(`/blog-posts?locale=${locale}&filters[slug][$eq]=${slug}&populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage`);

export const getBlogCategories = () => 
  strapiApi.get('/blog-categories?populate=*');

export const getAuthors = () => 
  strapiApi.get('/authors?populate=*');

export const getContactInfo = () => 
  strapiApi.get('/contact-info?populate=*');

export const getGalleryProjects = (locale: string = 'en') => 
  strapiApi.get(`/gallery-projects?locale=${locale}&populate=*&filters[isVisible][$eq]=true&sort=order:asc`);

export const getSiteSettings = () => 
  strapiApi.get('/site-setting?populate=*');

// Landing Pages
export const getLandingPages = (locale: string = 'en') =>
  strapiApi.get(`/landing-pages?locale=${locale}&populate[sections][populate]=*&filters[isActive][$eq]=true`);

export const getLandingPage = (slug: string, locale: string = 'en') =>
  // Use simple populate for ogImage to avoid Strapi v5 validation errors
  strapiApi.get(`/landing-pages?locale=${locale}&filters[slug][$eq]=${slug}&populate[sections][populate]=*&populate[ogImage]=true`);

// Fetch landing page by documentId (for draft preview)
// Note: Strapi v5 single document endpoint requires URL-encoded nested populate for dynamic zones
export const getLandingPageByDocumentId = (documentId: string, isDraft: boolean = false, locale: string = 'en') => {
  const statusParam = isDraft ? '&status=draft' : '';
  // Use nested populate to get component items within sections dynamic zone
  // Note: ogImage uses simple populate (=true) instead of populate=* to avoid validation errors
  return strapiApi.get(`/landing-pages/${documentId}?locale=${locale}&populate[sections][populate]=*&populate[ogImage]=true${statusParam}`);
};

export default strapiApi;
