import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import data from '../../test-data/users.json';

/**
 * Data driven retail checkout flow, Page Object Model.
 * Covers: login (positive + negative), add to cart, checkout, order confirmation.
 */
test.describe('Retail checkout E2E (data driven, POM)', () => {
  for (const user of data.users) {
    test(`checkout flow as ${user.name}`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(user.username, user.password);

      if (!user.shouldSucceed) {
        // Negative path: locked out user must see the lockout banner.
        await expect(login.errorMessage).toContainText(user.expectedError ?? '');
        return;
      }

      const inventory = new InventoryPage(page);
      for (const product of data.products) {
        await inventory.addProductToCart(product);
      }
      await expect(inventory.cartBadge).toHaveText(String(data.products.length));
      await inventory.openCart();

      const cart = new CartPage(page);
      await expect(cart.cartItems).toHaveCount(data.products.length);
      await cart.proceedToCheckout();

      const checkout = new CheckoutPage(page);
      await checkout.fillCustomerInfo(
        data.checkoutInfo.firstName,
        data.checkoutInfo.lastName,
        data.checkoutInfo.zip,
      );
      await checkout.finishOrder();
      await expect(checkout.completeHeader).toContainText('Thank you for your order');
    });
  }

  /**
   * Known defect, tracked as an expected failure so the suite stays green
   * while the triage evidence (trace, screenshot, video) is still captured.
   * Full writeup: defect-report/DEFECT-101-problem-user-images.md
   */
  test('DEFECT-101: problem_user sees incorrect product images', async ({ page }) => {
    test.fail(true, 'Known defect DEFECT-101: problem_user renders wrong product images');
    const login = new LoginPage(page);
    await login.goto();
    await login.login('problem_user', 'secret_sauce');

    const inventory = new InventoryPage(page);
    // The backpack tile must show the backpack image.
    await expect(inventory.productImage('Sauce Labs Backpack'))
      .toHaveAttribute('src', /backpack/);
  });
});
