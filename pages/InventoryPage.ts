import { Page, Locator } from '@playwright/test';

/** Product listing page. */
export class InventoryPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  private slug(productName: string): string {
    return productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  async addProductToCart(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${this.slug(productName)}"]`).click();
  }

  productImage(productName: string): Locator {
    return this.page.locator(`[data-test="inventory-item-${this.slug(productName)}-img"]`);
  }

  async openCart() {
    await this.cartLink.click();
  }
}
