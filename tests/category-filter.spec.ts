import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home-page';

test('category filter shows only products in that category', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await home.filterByCategory('Hammer');

  await expect(home.productNames.filter({ hasNotText: /hammer/i })).toHaveCount(0);
  await expect(home.productNames).not.toHaveCount(0);
});

test('clearing the category shows other products again', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.filterByCategory('Hammer');
  await expect(home.productNames.filter({ hasNotText: /hammer/i })).toHaveCount(0);

  await home.clearCategory('Hammer');

  await expect(home.productNames.filter({ hasNotText: /hammer/i })).not.toHaveCount(0);
});