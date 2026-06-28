'use server';

import { z } from 'zod';

// Optional post-conversion context attached to an existing AuditSubmission.
const updateSchema = z.object({
  company: z.string().trim().max(200).optional(),
  role: z.string().trim().max(100).optional(),
});

export type UpdateAuditInput = z.infer<typeof updateSchema>;

export interface UpdateAuditResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Update an existing AuditSubmission record (by id) with optional company/role.
 * Mirrors the create flow in submit-audit.ts — the Strapi write token stays on
 * the server and is never exposed to the client.
 *
 * NOTE (Strapi): requires `company` and `role` fields on the AuditSubmission
 * content type. Uses the numeric record id returned by the create call.
 */
export async function updateAuditSubmission(
  id: number,
  input: UpdateAuditInput,
): Promise<UpdateAuditResult> {
  try {
    if (!Number.isFinite(id) || id <= 0) {
      return { success: false, message: 'Invalid record id' };
    }

    const data = updateSchema.parse(input);

    const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const strapiToken = process.env.STRAPI_API_KEY || process.env.STRAPI_API_TOKEN;

    if (!strapiApiUrl) {
      console.error('[updateAuditSubmission] NEXT_PUBLIC_STRAPI_API_URL not configured');
      return { success: true, message: 'Updated (demo mode)' };
    }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (strapiToken) {
      headers['Authorization'] = `Bearer ${strapiToken}`;
    }

    const response = await fetch(`${strapiApiUrl}/audit-submissions/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        data: {
          company: data.company || null,
          role: data.role || null,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[updateAuditSubmission] Strapi error:', response.status, errorData);
      throw new Error(`Strapi returned ${response.status}`);
    }

    return { success: true, message: 'Updated' };
  } catch (error) {
    console.error('[updateAuditSubmission] Error:', error);
    return {
      success: false,
      message: 'Update failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
