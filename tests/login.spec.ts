import { test, expect } from '@playwright/test';

test('invalid login shows an error', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByPlaceholder('Your email').fill('wrong@example.com');
  await page.getByPlaceholder('Your password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});