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
    // If explicit URL provided, use it
    previewUrl = url;
  } else if (slug && contentType) {
    // Construct URL based on content type
    if (contentType === "api::case-study.case-study") {
      previewUrl = `/case-studies/${slug}`;
    } else if (contentType === "api::blog-post.blog-post") {
      previewUrl = `/blog/${slug}`;
    } else if (contentType === "api::project.project") {
      previewUrl = `/projects/${slug}`;
    }
  } else if (slug) {
    // Fallback: try case studies first (most common)
    previewUrl = `/case-studies/${slug}`;
  }

  // Add documentId as query param for draft mode fetching
  if (documentId) {
    const separator = previewUrl.includes("?") ? "&" : "?";
    previewUrl = `${previewUrl}${separator}documentId=${documentId}`;
  }

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(previewUrl);
}
