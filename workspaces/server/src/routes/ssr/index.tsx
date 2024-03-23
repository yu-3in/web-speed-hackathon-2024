import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';

import { ClientApp } from '@wsh-2024/app/src/index';

import { INDEX_HTML_PATH } from '../../constants/paths';

const app = new Hono();

let cachedHtmlContent: string | null = null;

async function loadHtmlTemplate(): Promise<string> {
  if (!cachedHtmlContent) {
    cachedHtmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');
  }
  return cachedHtmlContent;
}

async function createHTML({
  body,
  path,
  styleTags,
}: {
  body: string;
  path: string;
  styleTags: string;
}): Promise<string> {
  const htmlContent = await loadHtmlTemplate();

  // トップページの場合のみプリロードタグを追加
  const preloadLink =
    path === '/' ? '<link rel="preload" as="image" href="/assets/hero-1024.avif" type="image/avif" />' : '';

  const content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags)
    .replaceAll('</head>', `${preloadLink}</head>`); // </head> タグの直前にプリロードタグを挿入

  return content;
}

app.get('*', async (c) => {
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <StaticRouter location={c.req.path}>
          <ClientApp />
        </StaticRouter>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, path: c.req.path, styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
