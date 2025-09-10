const http = require('http');

const host = '127.0.0.1';
const port = process.env.PORT || 3000;

const requestListener = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<!doctype html><html><head><meta charset="utf-8"><title>Hello</title></head><body><h1>Hello World</h1></body></html>');
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});


