import { test, expect } from '@playwright/test';

const BASE = 'https://practicesoftwaretesting.com';

test('home page has the expected title', async ({ page }) => {
  await page.goto(BASE);
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});

test('search for pliers returns only pliers', async ({ page }) => {
  await page.goto(BASE);
  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  const names = page.getByRole('heading', { level: 5 });
  await expect(names.first()).toContainText(/pliers/i);
  await expect(names.filter({ hasNotText: /pliers/i })).toHaveCount(0);
});

test('invalid login shows an error', async ({ page }) => {
  await page.goto(`${BASE}/auth/login`);
  await page.getByPlaceholder('Your email').fill('wrong@example.com');
  await page.getByPlaceholder('Your password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});