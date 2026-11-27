import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';
import * as path from 'path';

// Turn the local file path into a URL the browser can open
const DRILL_PAGE = pathToFileURL(path.join(__dirname, 'index.html')).href;

test('Drill: Saved message appears after clicking Save', async ({ page }) => {
  await page.goto(DRILL_PAGE);
  await page.getByRole('button', { name: 'Save' }).click();

  // Wait for the condition, not a guess: this retries until the text is "Saved" (up to 5 seconds)
  await expect(page.getByRole('paragraph')).toHaveText('Saved');
});