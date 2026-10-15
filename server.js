const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ name: 'kvantumci-demo', message: 'hello from the demo' }));
    return;
  }
  if (req.method === 'GET' && req.url === '/healthz') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  server.listen(port, '127.0.0.1', () => console.log(`kvantumci-demo listening on ${port}`));
}

module.exports = server;
