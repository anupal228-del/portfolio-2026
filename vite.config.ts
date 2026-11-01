import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  base: '/portfolio-2026/',
  plugins: [
    react(),
    {
      name: 'serve-local-portfolio-media',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            const rawUrl = req.url || '';
            const decodedUrl = decodeURIComponent(rawUrl.split('?')[0]);
            
            // Check if request matches a local media path prefix: /media/ or directly accessing folders
            let targetPath = '';
            if (decodedUrl.startsWith('/media/')) {
              targetPath = path.join(__dirname, decodedUrl.replace('/media/', ''));
            }

            if (targetPath && fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
              const stat = fs.statSync(targetPath);
              const fileSize = stat.size;
              const ext = path.extname(targetPath).toLowerCase();
              
              let mimeType = 'application/octet-stream';
              if (ext === '.mp4') mimeType = 'video/mp4';
              else if (ext === '.mov') mimeType = 'video/quicktime';
              else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
              else if (ext === '.png') mimeType = 'image/png';
              else if (ext === '.pdf') mimeType = 'application/pdf';

              const range = req.headers.range;
              if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunksize = end - start + 1;
                const file = fs.createReadStream(targetPath, { start, end });
                res.writeHead(206, {
                  'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                  'Accept-Ranges': 'bytes',
                  'Content-Length': chunksize,
                  'Content-Type': mimeType,
                });
                file.pipe(res);
                return;
              } else {
                res.writeHead(200, {
                  'Content-Length': fileSize,
                  'Content-Type': mimeType,
                  'Accept-Ranges': 'bytes',
                });
                fs.createReadStream(targetPath).pipe(res);
                return;
              }
            }
          } catch (e) {
            console.error('Error serving media file:', e);
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
