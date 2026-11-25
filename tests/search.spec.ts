import { test, expect } from '@playwright/test';

test('search for pliers returns only pliers', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');
  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  const names = page.getByRole('heading', { level: 5 });
  await expect(names.first()).toContainText(/pliers/i);
  await expect(names.filter({ hasNotText: /pliers/i })).toHaveCount(0);
});