import { test, expect } from '@playwright/test';

/**
 * API testing with Playwright's request fixture.
 * Contract, payload, negative path and SLA checks against a demo order-style API.
 * (Mirrors what the Karate feature in karate/order-api.feature asserts.)
 */
const API = 'https://jsonplaceholder.typicode.com';

test.describe('Order service API validation', () => {
  test('GET single order returns 200 with the expected contract', async ({ request }) => {
    const response = await request.get(`${API}/posts/1`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({ userId: 1, id: 1 });
    expect(typeof body.title).toBe('string');
    expect(body.title.length).toBeGreaterThan(0);
  });

  test('POST creates an order and echoes the payload (201)', async ({ request }) => {
    const payload = { userId: 1, title: 'Sauce Labs Backpack', body: 'qty: 2' };
    const response = await request.post(`${API}/posts`, { data: payload });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(body.id).toBeDefined();
  });

  test('GET users returns a non-empty list with required fields', async ({ request }) => {
    const response = await request.get(`${API}/users`);
    expect(response.ok()).toBeTruthy();

    const users = await response.json();
    expect(users.length).toBeGreaterThan(0);
    for (const user of users.slice(0, 3)) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user.email).toContain('@');
    }
  });

  test('unknown resource returns 404', async ({ request }) => {
    const response = await request.get(`${API}/posts/999999`);
    expect(response.status()).toBe(404);
  });

  test('API responds within the 2s SLA', async ({ request }) => {
    const start = Date.now();
    const response = await request.get(`${API}/posts/1`);
    expect(response.ok()).toBeTruthy();
    expect(Date.now() - start).toBeLessThan(2000);
  });
});
