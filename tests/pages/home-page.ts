import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNames = page.getByRole('heading', { level: 5 });
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com');
  }

  categoryCheckbox(category: string): Locator {
    return this.page.getByRole('checkbox', { name: category, exact: true });
  }

  async filterByCategory(category: string) {
    await this.categoryCheckbox(category).check();
  }

  async clearCategory(category: string) {
    await this.categoryCheckbox(category).uncheck();
  }
}