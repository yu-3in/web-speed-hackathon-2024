import fs from 'node:fs';

import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetFooterRequestSchema, GetFooterResponseSchema } from '@wsh-2024/schema/src/api/footer/GetFooterResponse';

import { CONSTANT_PATH } from '../../../constants/paths';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/footer/{type}',
  request: {
    params: GetFooterRequestSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetFooterResponseSchema,
        },
      },
      description: 'Get footer text.',
    },
  },
  tags: ['[App] Footer API'],
});

app.openapi(route, async (c) => {
  const params = c.req.valid('param');
  const res = fs.readFileSync(`${CONSTANT_PATH}/${params.type}.txt`);
  const content = res.toString();

  return c.json({ content });
});

export { app as getFooterApp };
