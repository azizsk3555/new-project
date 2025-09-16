const http = require('http');
const fs = require('fs');
const path = require('path');

const host = '127.0.0.1';
const port = process.env.PORT || 3000;

// Serve files from the project directory
const baseDir = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Map "/" to calculator.html
  const requestedPath = req.url === '/' ? '/calculator.html' : req.url;

  // Prevent path traversal and resolve within baseDir
  const safePath = path.normalize(requestedPath).replace(/^\/+/, '');
  const filePath = path.join(baseDir, safePath);

  if (!filePath.startsWith(baseDir)) {
    res.statusCode = 400;
    res.end('Bad Request');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);

    const readStream = fs.createReadStream(filePath);
    readStream.on('error', () => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('500 Internal Server Error');
    });
    readStream.pipe(res);
  });
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

