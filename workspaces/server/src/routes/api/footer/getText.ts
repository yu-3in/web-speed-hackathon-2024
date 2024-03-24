import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetFooterRequestSchema, GetFooterResponseSchema } from '@wsh-2024/schema/src/api/footer/GetFooterResponse';

import { COMPANY } from '../../../constants/company';
import { CONTACT } from '../../../constants/contact';
import { OVERVIEW } from '../../../constants/overview';
import { QUESTION } from '../../../constants/question';
import { TERM } from '../../../constants/term';

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

  let content: string = '';

  switch (params.type) {
    case 'term':
      content = TERM;
      break;
    case 'company':
      content = COMPANY;
      break;
    case 'contact':
      content = CONTACT;
      break;
    case 'overview':
      content = OVERVIEW;
      break;
    case 'question':
      content = QUESTION;
      break;
  }

  return c.json({ content });
});

export { app as getFooterApp };
