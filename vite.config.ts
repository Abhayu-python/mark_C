import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function artworkUploadPlugin(): Plugin {
  const mimeLookup: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  };

  const handleUpload = (req: any, res: any) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
      return;
    }

    let rawData = '';
    req.setEncoding('utf8');

    req.on('data', (chunk: string) => {
      rawData += chunk;
      // Prevent oversized payloads (> 16MB)
      if (rawData.length > 16 * 1024 * 1024) {
        res.statusCode = 413;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Payload exceeds limit' }));
        req.destroy();
      }
    });

    req.on('end', async () => {
      try {
        if (!rawData) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Empty payload received' }));
          return;
        }

        const parsed = JSON.parse(rawData);
        const { filename, mimeType, base64Data } = parsed;

        if (!base64Data || !mimeType) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Missing base64Data or mimeType' }));
          return;
        }

        const allowedMimes: Record<string, string> = {
          'image/jpeg': 'jpg',
          'image/jpg': 'jpg',
          'image/png': 'png',
          'image/webp': 'webp',
          'image/gif': 'gif'
        };

        const ext = allowedMimes[mimeType.toLowerCase()];
        if (!ext) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Unsupported file format. Please upload JPG, PNG, WEBP, or GIF.' }));
          return;
        }

        const cleanBase64 = base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
        const buffer = Buffer.from(cleanBase64, 'base64');

        // File size validation (10 MB max)
        const maxBytes = 10 * 1024 * 1024;
        if (buffer.length > maxBytes) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'File size exceeds the 10 MB limit' }));
          return;
        }

        const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads', 'artworks');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Clean original base name (without spaces or special chars)
        const baseNameOnly = filename
          ? path.basename(filename, path.extname(filename)).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30)
          : 'artwork';
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 8);
        const uniqueFileName = `${baseNameOnly}-${timestamp}-${randomHash}.${ext}`;
        const targetPath = path.join(uploadsDir, uniqueFileName);

        await fs.promises.writeFile(targetPath, buffer);

        const proto = (req.headers['x-forwarded-proto'] as string) || 'http';
        const host = req.headers.host || 'localhost:5173';
        const relativeUrl = `/uploads/artworks/${uniqueFileName}`;
        const fullUrl = `${proto}://${host}${relativeUrl}`;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: true,
          filename: uniqueFileName,
          url: relativeUrl,
          fullUrl: fullUrl
        }));
      } catch (err: any) {
        console.error('Artwork upload error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Failed to process artwork upload' }));
      }
    });
  };

  const handleServeUpload = (req: any, res: any, next: any) => {
    const cleanUrl = (req.url || '').split('?')[0];
    if (cleanUrl.startsWith('/uploads/artworks/') && req.method === 'GET') {
      const filePath = path.join(process.cwd(), 'public', cleanUrl);
      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase();
        res.setHeader('Content-Type', mimeLookup[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }
    next();
  };

  return {
    name: 'vite-plugin-artwork-upload',
    configureServer(server) {
      server.middlewares.use(handleServeUpload);
      server.middlewares.use('/api/upload-artwork', (req, res) => {
        handleUpload(req, res);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleServeUpload);
      server.middlewares.use('/api/upload-artwork', (req, res) => {
        handleUpload(req, res);
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), artworkUploadPlugin()],
  publicDir: 'public',
  server: {
    port: 5173,
    host: true
  }
});
