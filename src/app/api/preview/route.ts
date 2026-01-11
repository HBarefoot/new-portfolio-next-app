import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const documentId = searchParams.get("documentId");
  const contentType = searchParams.get("contentType");
  const url = searchParams.get("url");
  const status = searchParams.get("status");
  const locale = searchParams.get("locale") || "en";

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  
  if (status === "published") {
    draft.disable();
  } else {
    draft.enable();
  }

  // Construct the preview URL based on content type
  let previewUrl = "/";
  
  if (url) {
    // If explicit URL provided by Strapi, use it directly
    // Strapi now sends locale-prefixed URLs (e.g., /es/blog/slug)
    previewUrl = url;
  } else if (slug && contentType) {
    // Fallback: Construct URL based on content type
    const localePrefix = locale && locale !== 'en' ? `/${locale}` : '';
    
    if (contentType === "api::case-study.case-study") {
      previewUrl = `${localePrefix}/case-studies/${slug}`;
    } else if (contentType === "api::blog-post.blog-post") {
      previewUrl = `${localePrefix}/blog/${slug}`;
    } else if (contentType === "api::project.project") {
      previewUrl = `${localePrefix}/projects/${slug}`;
    } else if (contentType === "api::landing-page.landing-page") {
      previewUrl = `${localePrefix}/lp/${slug}`;
    }
  } else if (slug) {
    // Fallback: try case studies first (most common)
    const localePrefix = locale && locale !== 'en' ? `/${locale}` : '';
    previewUrl = `${localePrefix}/case-studies/${slug}`;
  }

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(previewUrl);
}
