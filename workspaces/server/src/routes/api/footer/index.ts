import { OpenAPIHono } from '@hono/zod-openapi';

import { getFooterApp } from './getText';

const app = new OpenAPIHono();

app.route('/', getFooterApp);

export { app as footerApp };
