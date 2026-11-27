import {test, expect} from '@playwright/test';

const pages = ['index.html', 'production.html', 'animation.html', 'lab.html', 'graph.html'];

// Every studio must load with no uncaught errors at phone width.
for (const page of pages) {
  test(`${page} loads without page errors`, async ({page: p}) => {
    const errors = [];
    p.on('pageerror', e => errors.push(e.message));
    await p.goto(`/${page}`);
    await p.waitForTimeout(800);
    expect(errors).toEqual([]);
  });
}

test('water lab slider shows its live value and Save/Load restore it', async ({page}) => {
  await page.goto('/index.html');
  await page.waitForTimeout(500);
  await page.locator('#depth').evaluate(e => { e.value = '3.2'; e.dispatchEvent(new Event('input')); });
  await expect(page.locator('#depth-out')).toHaveText('3.20');
  await page.click('#save');
  await expect(page.locator('#status')).toHaveText('Scene saved locally');
  await page.locator('#depth').evaluate(e => { e.value = '1.5'; e.dispatchEvent(new Event('input')); });
  await page.click('#load');
  await expect(page.locator('#depth-out')).toHaveText('3.20');
});

test('graph lab loads a valid graph and reports invalid JSON', async ({page}) => {
  await page.goto('/graph.html');
  await page.click('#load');
  await expect(page.locator('#status')).toHaveText('mseepee: 2 nodes, 1 edges');
  await page.fill('#source', '{bad');
  await page.click('#load');
  await expect(page.locator('#status')).toContainText('JSON');
});

test('production studio rejects invalid composition JSON', async ({page}) => {
  await page.goto('/production.html');
  await page.locator('summary').click();
  await page.fill('#project', '{not json');
  await page.click('#apply');
  await expect(page.locator('#status')).toContainText('JSON');
});

test('physics lab switches mode and reports stats', async ({page}) => {
  await page.goto('/lab.html');
  await page.selectOption('#mode', 'torus');
  await expect(page.locator('#stats')).toContainText('FPS');
});
