import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/smoke',
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      command: 'pnpm --filter @goease/api start', url: 'http://127.0.0.1:3020/api/health', reuseExistingServer: false,
      env: { NODE_ENV: 'test', PORT: '3020', WEB_ORIGINS: 'http://127.0.0.1:4173' },
    },
    {
      command: 'pnpm --filter @goease/web build && pnpm --filter @goease/web preview',
      url: 'http://127.0.0.1:4173', reuseExistingServer: false, timeout: 120000,
      env: { VITE_API_BASE_URL: 'http://127.0.0.1:3020/api' },
    },
  ],
});
