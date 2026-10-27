import { readFile } from 'node:fs/promises';
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

test('fonts are self-hosted, so no request leaves the origin', async ({
  page,
}) => {
  const origin = new URL(test.info().project.use.baseURL).origin;
  const external = [];
  page.on('request', request => {
    const url = request.url();
    if (!url.startsWith('data:') && new URL(url).origin !== origin) {
      external.push(url);
    }
  });

  await page.goto('/');
  await expectCardVisible(page);
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts]
      .filter(font => font.status === 'loaded')
      .map(font => font.family.replace(/["']/g, ''));
  });

  expect(external).toEqual([]);
  expect(fonts).toEqual(expect.arrayContaining(['Inter', 'Space Grotesk']));
});

test('vCard escapes commas and semicolons in the name', async ({ page }) => {
  await page.goto('/');
  const vcard = await page.evaluate(() => {
    const json = document.querySelector('script[type="application/ld+json"]');
    const profile = JSON.parse(json.textContent);
    profile.name = 'Ngoc, Giau; Jr';
    json.textContent = JSON.stringify(profile);
    return buildVCard();
  });

  expect(vcard).toContain('FN:Ngoc\\, Giau\\; Jr');
  expect(vcard).toContain('N:;Ngoc\\, Giau\\; Jr;;;');
});

test('card and its fonts load offline after the first visit', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await expectCardVisible(page);
  await page.waitForFunction(async () => {
    for (const name of await caches.keys()) {
      const cache = await caches.open(name);
      if (await cache.match('assets/fonts/inter-latin-wght-normal.woff2')) {
        return true;
      }
    }
    return false;
  });

  await context.setOffline(true);
  await page.reload();
  await expectCardVisible(page);
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts]
      .filter(font => font.status === 'loaded')
      .map(font => font.family.replace(/["']/g, ''));
  });
  expect(fonts).toEqual(expect.arrayContaining(['Inter', 'Space Grotesk']));
});

test('save contact downloads a vCard file', async ({ page }) => {
  await page.goto('/');
  const downloadPromise = page.waitForEvent('download');
  await page.click('#save-contact');
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('nzaoo.vcf');
  const text = await readFile(await download.path(), 'utf8');
  expect(text).toContain('BEGIN:VCARD');
  expect(text).toContain('END:VCARD');
});

test('QR code encodes the ?src=qr URL', async ({ page }) => {
  // Replace QRious with a stub that records the value it was asked to encode.
  await page.addInitScript(() => {
    window.qrValues = [];
    Object.defineProperty(window, 'QRious', {
      configurable: true,
      get() {
        return class {
          constructor(options) {
            window.qrValues.push(options.value);
            this.toDataURL = () =>
              'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          }
        };
      },
      set() {},
    });
  });

  await page.goto('/');
  const baseURL = test.info().project.use.baseURL;
  const values = await page.evaluate(() => window.qrValues);

  expect(values).toEqual([`${baseURL}/?src=qr`]);
});

test('low-power devices get the lite class', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'deviceMemory', { get: () => 2 });
  });

  await page.goto('/');
  await expect(page.locator('body')).toHaveClass(/is-lite/);
  await expect(page.locator('body')).toHaveCSS('animation-name', 'none');
});
