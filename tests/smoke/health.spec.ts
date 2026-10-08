import { test, expect } from '@playwright/test';

test('web production nhận health thật, kiểm tra lại, không lỗi JS hoặc tràn ngang', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  const health = page.waitForResponse('http://127.0.0.1:3020/api/health');
  await page.goto('/');
  expect((await health).status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'API đang hoạt động' })).toBeVisible();
  const retry = page.waitForResponse('http://127.0.0.1:3020/api/health');
  await page.getByRole('button', { name: /Kiểm tra lại/ }).click();
  expect((await retry).status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'API đang hoạt động' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
