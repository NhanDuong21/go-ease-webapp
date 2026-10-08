import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { isHealthResponse } from '@goease/contracts';
import { createApp } from '../src/app.js';

let app: Awaited<ReturnType<typeof createApp>>;
let baseUrl: string;
before(async () => {
  app = await createApp(false);
  await app.listen(0, '127.0.0.1');
  baseUrl = await app.getUrl();
});
after(async () => { await app?.close(); });

test('GET /api/health trả contract API-only và thời điểm hiện tại', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  const body: unknown = await response.json();
  assert.ok(isHealthResponse(body));
  assert.ok(Math.abs(Date.now() - Date.parse(body.timestamp)) < 5000);
});

test('route lạ trả lỗi thống nhất, không lộ stack hoặc query', async () => {
  const response = await fetch(`${baseUrl}/api/missing?private=test`);
  assert.equal(response.status, 404);
  const body = await response.json() as { error: unknown; path: string; timestamp: string };
  assert.deepEqual({ ...body, timestamp: '<timestamp>' }, {
    error: { code: 'NOT_FOUND', message: 'Không tìm thấy đường dẫn API.', statusCode: 404 },
    path: '/api/missing', timestamp: '<timestamp>',
  });
  assert.ok(Number.isFinite(Date.parse(body.timestamp)));
});

test('CORS chỉ cấp phép cho origin cấu hình, không bật credentials', async () => {
  const allowed = await fetch(`${baseUrl}/api/health`, { headers: { Origin: 'http://localhost:5173' } });
  assert.equal(allowed.headers.get('access-control-allow-origin'), 'http://localhost:5173');
  assert.equal(allowed.headers.get('access-control-allow-credentials'), null);
  const denied = await fetch(`${baseUrl}/api/health`, { headers: { Origin: 'https://untrusted.example' } });
  assert.equal(denied.headers.get('access-control-allow-origin'), null);
});
