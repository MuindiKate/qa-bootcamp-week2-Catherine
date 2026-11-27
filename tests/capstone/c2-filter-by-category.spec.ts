import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page';

const HAND_TOOLS_SUBCATEGORIES = ['Hammer', 'Hand Saw', 'Wrench', 'Screwdriver', 'Pliers', 'Chisels', 'Measures'];

test('C2 Filter by category', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  // Unfiltered list: wait for the page buttons, then count them
  await expect(home.pageButtons.first()).toBeVisible();
  const pagesBefore = await home.pageButtons.count();

  await home.filterByCategory('Hand Tools');

  // Ticking Hand Tools also ticks all seven subcategories
  for (const subcategory of HAND_TOOLS_SUBCATEGORIES) {
    await expect(home.categoryCheckbox(subcategory)).toBeChecked();
  }

  // Page 1 can look unchanged, so check the page count instead (retries, no fixed wait)
  await expect(home.pageButtons).not.toHaveCount(pagesBefore);
  const pagesAfter = await home.pageButtons.count();
  expect(pagesAfter).toBeLessThan(pagesBefore);
  expect(pagesAfter).toBeGreaterThan(1);
});