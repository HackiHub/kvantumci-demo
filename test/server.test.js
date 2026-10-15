const test = require('node:test');
const assert = require('node:assert/strict');
const server = require('../server');

let address;
test.before(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  address = `http://127.0.0.1:${server.address().port}`;
});
test.after(async () => {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
});
test('GET / returns demo metadata', async () => {
  const response = await fetch(`${address}/`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { name: 'kvantumci-demo', message: 'hello from the demo' });
});
test('GET /healthz returns ok', async () => {
  const response = await fetch(`${address}/healthz`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});
test('unknown routes return 404', async () => {
  const response = await fetch(`${address}/missing`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'not found' });
});
