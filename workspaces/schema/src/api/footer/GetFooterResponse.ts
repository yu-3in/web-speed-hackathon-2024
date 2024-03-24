import { z } from 'zod';

export const GetFooterRequestSchema = z.object({
  type: z.string(),
});

export type GetFooterRequest = z.infer<typeof GetFooterRequestSchema>;

export const GetFooterResponseSchema = z.object({
  content: z.string(),
});

export type GetFooterResponse = z.infer<typeof GetFooterResponseSchema>;
