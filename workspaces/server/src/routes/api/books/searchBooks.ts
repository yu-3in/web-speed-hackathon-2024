import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { SearchBooksRequestQuerySchema } from '@wsh-2024/schema/src/api/books/SearchBooksRequest';
import { SearchBooksResponseSchema } from '@wsh-2024/schema/src/api/books/SearchBooksResponse';

import { bookRepository } from '../../../repositories';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/searchBooks',
  request: {
    query: SearchBooksRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: SearchBooksResponseSchema,
        },
      },
      description: 'Search book.',
    },
  },
  tags: ['[App] Books API'],
});

app.openapi(route, async (c) => {
  const query = c.req.valid('query');
  const res = await bookRepository.search({ query });

  if (res.isErr()) {
    throw res.error;
  }
  return c.json(res.value);
});

export { app as searchBookApp };
