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
export const getHero = () => strapiApi.get('/hero?populate=*');

// Server-side fetch for Hero (no axios wrapper for server components)
export async function fetchHeroServer() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
  try {
    const res = await fetch(`${baseUrl}/hero?populate=*`, {
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

export const getAbout = () => strapiApi.get('/about?populate=*');

export const getSkills = () => 
  strapiApi.get('/skills?populate=*&sort=order:asc');

export const getExperiences = () => 
  strapiApi.get('/experiences?populate=*&sort=order:asc');

export const getProjects = (params?: { featured?: boolean }) => {
  const query = params?.featured 
    ? '/projects?populate=*&filters[isFeatured][$eq]=true&sort=order:asc'
    : '/projects?populate=*&sort=order:asc';
  return strapiApi.get(query);
};

export const getProject = (slug: string) => 
  strapiApi.get(`/projects?filters[slug][$eq]=${slug}&populate=*`);

export const getTechnologies = () => 
  strapiApi.get('/technologies?populate=*');

export const getCaseStudies = (params?: { featured?: boolean }) => {
  const query = params?.featured
    ? '/case-studies?populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&filters[featured][$eq]=true&sort=order:asc'
    : '/case-studies?populate[0]=heroImage&populate[1]=gallery&populate[2]=technologies&sort=order:asc';
  return strapiApi.get(query);
};

export const getCaseStudy = (slug: string) => 
  strapiApi.get(`/case-studies?filters[slug][$eq]=${slug}&populate=*`);

export const getBlogPosts = (params?: { category?: string; limit?: number }) => {
  let query = '/blog-posts?populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage&sort=publishedAt:desc';
  if (params?.category) {
    query += `&filters[category][slug][$eq]=${params.category}`;
  }
  if (params?.limit) {
    query += `&pagination[limit]=${params.limit}`;
  }
  return strapiApi.get(query);
};

export const getBlogPost = (slug: string) => 
  strapiApi.get(`/blog-posts?filters[slug][$eq]=${slug}&populate[0]=author&populate[1]=author.avatar&populate[2]=category&populate[3]=coverImage`);

export const getBlogCategories = () => 
  strapiApi.get('/blog-categories?populate=*');

export const getAuthors = () => 
  strapiApi.get('/authors?populate=*');

export const getContactInfo = () => 
  strapiApi.get('/contact-info?populate=*');

export const getGalleryProjects = () => 
  strapiApi.get('/gallery-projects?populate=*&filters[isVisible][$eq]=true&sort=order:asc');

export const getSiteSettings = () => 
  strapiApi.get('/site-setting?populate=*');

// Landing Pages
export const getLandingPages = () =>
  strapiApi.get('/landing-pages?populate[sections][populate]=*&filters[isActive][$eq]=true');

export const getLandingPage = (slug: string) =>
  // Use simple populate for ogImage to avoid Strapi v5 validation errors
  strapiApi.get(`/landing-pages?filters[slug][$eq]=${slug}&populate[sections][populate]=*&populate[ogImage]=true`);

// Fetch landing page by documentId (for draft preview)
// Note: Strapi v5 single document endpoint requires URL-encoded nested populate for dynamic zones
export const getLandingPageByDocumentId = (documentId: string, isDraft: boolean = false) => {
  const statusParam = isDraft ? '&status=draft' : '';
  // Use nested populate to get component items within sections dynamic zone
  // Note: ogImage uses simple populate (=true) instead of populate=* to avoid validation errors
  return strapiApi.get(`/landing-pages/${documentId}?populate[sections][populate]=*&populate[ogImage]=true${statusParam}`);
};

export default strapiApi;
