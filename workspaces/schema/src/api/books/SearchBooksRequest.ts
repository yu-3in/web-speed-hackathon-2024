import { z } from 'zod';

export const SearchBooksRequestQuerySchema = z.object({
  name: z.string().optional(),
  nameRuby: z.string().optional(),
});

export type SearchBooksRequestQuery = z.infer<typeof SearchBooksRequestQuerySchema>;
