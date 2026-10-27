import { expect, test } from '@playwright/test';

// The card fades in with a CSS animation, so wait for it to finish.
async function expectCardVisible(page) {
  await expect(page.locator('.identity-card')).toHaveCSS('opacity', '1');
}

test('card renders without page errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');
  await expectCardVisible(page);
  await expect(page.locator('.qr-image')).toBeAttached();

  expect(errors).toEqual([]);
});

test('card still renders when localStorage is blocked', async ({ page }) => {
  // Mimics browsers that throw SecurityError when storage is disabled.
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('blocked', 'SecurityError');
      },
    });
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');
  await expectCardVisible(page);
  await expect(page.locator('.qr-image')).toBeAttached();

  expect(errors).toEqual([]);
});

test('card is visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/');
  await expectCardVisible(page);

  await context.close();
});
