'use server';

import { z } from 'zod';

// ============ Lead Source Types ============
export type LeadSource =
    | 'Performance Audit'
    | 'ROHC Calculator'
    | 'Readiness Quiz'
    | 'OCR Demo'
    | 'Stack Mapper'
    | 'Blueprint Download';

// ============ Zod Schemas ============

// Base schema for all submissions
const baseSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().optional(),
});

// Performance Audit specific data
const performanceAuditSchema = baseSchema.extend({
    leadSource: z.literal('Performance Audit'),
    websiteUrl: z.string().url('Invalid URL'),
    overallScore: z.number().min(0).max(100),
    auditData: z.object({
        performance: z.number(),
        accessibility: z.number(),
        bestPractices: z.number(),
        seo: z.number(),
    }),
});

// ROHC Calculator specific data
const rohcCalculatorSchema = baseSchema.extend({
    leadSource: z.literal('ROHC Calculator'),
    auditData: z.object({
        revenue: z.number().positive(),
        headcount: z.number().positive().int(),
        rohc_score: z.number(),
        insight: z.string(),
    }),
});

// Readiness Quiz specific data
const readinessQuizSchema = baseSchema.extend({
    leadSource: z.literal('Readiness Quiz'),
    auditData: z.object({
        total_score: z.number().min(0).max(100),
        pillar_scores: z.object({
            DATA_MATURITY: z.number(),
            PROCESS_AUTOMATION: z.number(),
            STRATEGIC_ALIGNMENT: z.number(),
        }),
        answers: z.record(z.string(), z.string()),
        verdict: z.string(),
    }),
});

// OCR Demo specific data
const ocrDemoSchema = baseSchema.extend({
    leadSource: z.literal('OCR Demo'),
    auditData: z.object({
        file_name: z.string().optional(),
        context: z.string().optional(),
    }),
});

// Stack Mapper specific data
const stackMapperSchema = baseSchema.extend({
    leadSource: z.literal('Stack Mapper'),
    auditData: z.object({
        selected_tools: z.array(z.object({
            id: z.string(),
            name: z.string(),
            category: z.string(),
        })),
        asset_requested: z.string().optional(),
    }),
});

// Blueprint Download specific data
const blueprintDownloadSchema = baseSchema.extend({
    leadSource: z.literal('Blueprint Download'),
    auditData: z.object({}).optional(),
});

// Discriminated union of all schemas
const submissionSchema = z.discriminatedUnion('leadSource', [
    performanceAuditSchema,
    rohcCalculatorSchema,
    readinessQuizSchema,
    ocrDemoSchema,
    stackMapperSchema,
    blueprintDownloadSchema,
]);

export type SubmissionInput = z.infer<typeof submissionSchema>;

// ============ Response Types ============
export interface SubmitAuditResult {
    success: boolean;
    message: string;
    id?: number;
    error?: string;
}

// ============ Server Action ============
export async function submitAudit(
    input: SubmissionInput,
    metadata?: {
        ipAddress?: string;
        userAgent?: string;
        referrer?: string;
    }
): Promise<SubmitAuditResult> {
    try {
        // Validate input
        const validatedData = submissionSchema.parse(input);

        // Get environment variables
        // Note: NEXT_PUBLIC_STRAPI_API_URL already includes /api, so we use it as base
        const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const strapiToken = process.env.STRAPI_API_KEY || process.env.STRAPI_API_TOKEN;

        if (!strapiApiUrl) {
            console.error('[submitAudit] NEXT_PUBLIC_STRAPI_API_URL not configured');
            // Return success for demo purposes
            return {
                success: true,
                message: 'Submission received (demo mode)',
            };
        }

        // Build the Strapi payload
        const strapiPayload = {
            data: {
                email: validatedData.email,
                name: validatedData.name || null,
                websiteUrl: 'websiteUrl' in validatedData ? validatedData.websiteUrl : null,
                overallScore: 'overallScore' in validatedData ? validatedData.overallScore : null,
                auditData: validatedData.auditData,
                leadSource: validatedData.leadSource,
                status: 'New',
                submittedAt: new Date().toISOString(),
                ipAddress: metadata?.ipAddress || null,
                userAgent: metadata?.userAgent || null,
                referrer: metadata?.referrer || null,
            },
        };

        console.log('[submitAudit] Sending to Strapi:', {
            url: `${strapiApiUrl}/audit-submissions`,
            leadSource: validatedData.leadSource,
            email: validatedData.email,
        });

        // Send to Strapi
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (strapiToken) {
            headers['Authorization'] = `Bearer ${strapiToken}`;
        }

        const response = await fetch(`${strapiApiUrl}/audit-submissions`, {
            method: 'POST',
            headers,
            body: JSON.stringify(strapiPayload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('[submitAudit] Strapi error:', response.status, errorData);
            throw new Error(`Strapi returned ${response.status}`);
        }

        const result = await response.json();

        return {
            success: true,
            message: 'Submission successful',
            id: result.data?.id,
        };

    } catch (error) {
        console.error('[submitAudit] Error:', error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                message: 'Validation failed',
                error: error.issues.map((e) => e.message).join(', '),
            };
        }

        return {
            success: false,
            message: 'Submission failed',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
