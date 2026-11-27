import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'url';
import * as path from 'path';

// Turn the local file path into a URL the browser can open
const DRILL_PAGE = pathToFileURL(path.join(__dirname, 'index.html')).href;

test('Drill: Saved message appears after clicking Save', async ({ page }) => {
  await page.goto(DRILL_PAGE);
  await page.getByRole('button', { name: 'Save' }).click();

  await page.waitForTimeout(500); // fixed wait: a guess at how long saving takes

  const message = await page.getByRole('paragraph').textContent(); // read once
  expect(message).toBe('Saved'); // plain check, doesn't retry
});