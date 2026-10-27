import { expect, test } from '@playwright/test';

async function readProfile(page) {
  return page.evaluate(() =>
    JSON.parse(
      document.querySelector('script[type="application/ld+json"]').textContent
    )
  );
}

test('title, og:title and canonical agree', async ({ page }) => {
  await page.goto('/');

  const ogTitle = await page
    .locator('meta[property="og:title"]')
    .getAttribute('content');
  const ogUrl = await page
    .locator('meta[property="og:url"]')
    .getAttribute('content');
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute('href');

  expect(await page.title()).toBe(ogTitle);
  expect(canonical).toBe(ogUrl);
});

test('contact links and copy chips match the structured data', async ({
  page,
}) => {
  await page.goto('/');
  const profile = await readProfile(page);

  expect(profile.email).not.toContain('mailto:');
  await expect(page.locator(`[data-copy="${profile.telephone}"]`)).toHaveCount(
    1
  );
  await expect(page.locator(`[data-copy="${profile.email}"]`)).toHaveCount(1);
  await expect(page.locator(`a[href="mailto:${profile.email}"]`)).toHaveCount(
    1
  );
  // Zalo uses the national number: +84359511473 -> 0359511473.
  const zalo = `https://zalo.me/0${profile.telephone.slice(3)}`;
  await expect(page.locator(`a[href="${zalo}"]`)).not.toHaveCount(0);
});

test('favicon, apple touch icon and manifest icons all resolve', async ({
  page,
}) => {
  await page.goto('/');
  const manifest = await page.request.get('/manifest.json').then(r => r.json());

  const urls = [
    await page.locator('link[rel="icon"]').getAttribute('href'),
    await page.locator('link[rel="apple-touch-icon"]').getAttribute('href'),
    ...manifest.icons.map(icon => icon.src),
  ];
  for (const url of urls) {
    const response = await page.request.get(url);
    expect(response.ok(), url).toBeTruthy();
  }
  expect(manifest.icons.some(icon => icon.purpose === 'maskable')).toBe(true);
});
