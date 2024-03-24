import fs from 'node:fs/promises';
import path from 'node:path';

import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import sharp from 'sharp';
import { z } from 'zod';

import { IMAGES_PATH } from '../../constants/paths';

const app = new Hono();
const cacheMap = new Map<string, Buffer>();

// MIMEタイプのマッピング
const IMAGE_MIME_TYPE: Record<string, string> = {
  avif: 'image/avif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  jxl: 'image/jxl',
  png: 'image/png',
  webp: 'image/webp',
};

app.get(
  '/images/:imageFile',
  zValidator(
    'param',
    z.object({
      imageFile: z.string().regex(/^[a-f0-9-]+(?:\.\w*)?$/),
    }),
  ),
  zValidator(
    'query',
    z.object({
      height: z.coerce.number().optional(),
      width: z.coerce.number().optional(),
    }),
  ),
  async (c) => {
    const imageFileName = c.req.param('imageFile');
    const width = parseInt(c.req.query('width') ?? '') || undefined;
    const height = parseInt(c.req.query('height') ?? '') || undefined;

    // 画像ファイルのフルパスを生成
    const origFilePath = path.resolve(IMAGES_PATH, imageFileName) + '.webp';

    // ファイル存在確認
    try {
      await fs.access(origFilePath);
    } catch {
      throw new HTTPException(404, { message: 'Image not found.' });
    }

    // リサイズ処理
    let mimeType = 'image/webp'; // デフォルトMIMEタイプ
    try {
      const image = sharp(origFilePath);
      if (width || height) {
        image.resize(width, height);
      }

      const format = path.extname(origFilePath).slice(1).toLowerCase();
      mimeType = IMAGE_MIME_TYPE[format] || mimeType;

      const buffer = await image.toBuffer();

      const { ext: reqImgExt, name: reqImgId } = path.parse(c.req.valid('param').imageFile);

      // 画像のキャッシュ
      const resImgFormat = reqImgExt.slice(1) || 'webp';
      const cacheKey = `${reqImgId}-${resImgFormat}-${c.req.valid('query').width}-${c.req.valid('query').height}`;

      if (cacheMap.has(cacheKey)) {
        console.log('Cache hit!', cacheKey, 'size:', cacheMap.get(cacheKey)!.length, 'bytes');
        c.header('Content-Type', IMAGE_MIME_TYPE[resImgFormat]);
        return c.body(cacheMap.get(cacheKey)!);
      }

      cacheMap.set(cacheKey, buffer);

      c.header('Content-Type', mimeType);
      return c.body(buffer);
    } catch (error) {
      console.error(error);
      throw new HTTPException(500, { message: 'Failed to process image.' });
    }
  },
);

export { app as imageApp };
