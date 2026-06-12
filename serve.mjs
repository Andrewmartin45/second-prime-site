// Local preview server: reliable responses, caching disabled
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.otf': 'font/otf', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm' };

http.createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path === '/') path = '/index.html';
    const file = normalize(join(process.cwd(), path));
    if (!file.startsWith(process.cwd())) { res.writeHead(403).end(); return; }
    const data = await readFile(file);
    const type = TYPES[extname(file)] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      const m = range.match(/bytes=(\d*)-(\d*)/);
      const start = m && m[1] ? parseInt(m[1]) : 0;
      const end = m && m[2] ? Math.min(parseInt(m[2]), data.length - 1) : data.length - 1;
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${data.length}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Cache-Control': 'no-store, must-revalidate',
      });
      res.end(data.subarray(start, end + 1));
      return;
    }
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': data.length,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store, must-revalidate',
    });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(8741, '127.0.0.1', () => console.log('serving on http://127.0.0.1:8741'));
