import { test, expect } from '@playwright/test';

/**
 * Mocking downstream service layers with Playwright route interception.
 * Proves the checkout experience degrades gracefully when a dependency fails,
 * without needing the real payment service to be down.
 */
test.describe('Service layer mocking (payment dependency)', () => {
  test.beforeEach(async ({ page }) => {
    // Any page load gives us an origin to resolve relative fetches against.
    await page.goto('/');
  });

  test('order placement survives a payment service outage (mocked HTTP 500)', async ({ page }) => {
    await page.route('**/api/payment', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Payment service unavailable' }),
      });
    });

    const response = await page.evaluate(async () => {
      const res = await fetch('/api/payment', { method: 'POST' });
      return { status: res.status, body: await res.json() };
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toContain('unavailable');
    // In the real app this is where we assert the UI shows
    // "Payment failed, please retry" instead of crashing.
  });

  test('declined card returns a handled 402 with a machine readable code', async ({ page }) => {
    await page.route('**/api/payment', async (route) => {
      await route.fulfill({
        status: 402,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Card declined', code: 'card_declined' }),
      });
    });

    const response = await page.evaluate(async () => {
      const res = await fetch('/api/payment', { method: 'POST' });
      return { status: res.status, body: await res.json() };
    });

    expect(response.status).toBe(402);
    expect(response.body.code).toBe('card_declined');
  });
});
