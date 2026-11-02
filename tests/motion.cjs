// Run with Playwright installed: node tests/motion.cjs
// Serve the repository at TIGER_URL (default http://127.0.0.1:4173).
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ reducedMotion: 'no-preference', viewport: { width: 1280, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => { errors.push(error.message); console.error('PAGE ERROR', error.message); });
    page.on('requestfailed', request => console.error('REQUEST FAILED', request.url(), request.failure()));
    await page.goto(process.env.TIGER_URL || 'http://127.0.0.1:4173');
    const tiger = page.locator('#tiger');
    const image = tiger.locator('img');
    await image.evaluate(el => el.decode());
    assert.equal(await image.evaluate(el => el.naturalWidth), 1254);
    await page.bringToFront();
    await tiger.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('#tiger').dataset.pose === 'idle');
    const frames = new Set();
    for (let i = 0; i < 14 && frames.size < 2; i++) {
      frames.add(await image.evaluate(el => getComputedStyle(el).transform));
      await page.waitForTimeout(260);
    }
    assert.equal(frames.size, 2, 'typing must visibly alternate two poses');
    await tiger.press('Enter');
    assert.equal(await tiger.getAttribute('data-pose'), 'wave');
    await page.locator('#feed').click();
    assert.equal(await tiger.getAttribute('data-pose'), 'snack');
    await page.locator('#nap').click();
    await page.waitForTimeout(1700);
    assert.equal(await tiger.getAttribute('data-pose'), 'sleep', 'pending reaction must not wake the tiger');
    await page.locator('#nap').click();
    assert.equal(await tiger.getAttribute('data-pose'), 'idle');
    await page.locator('#motion-toggle').click();
    assert.equal(await image.evaluate(el => getComputedStyle(el).animationName), 'none');
    await tiger.press('Enter');
    assert.equal(await page.locator('#pats-count').textContent(), '2', 'care remains usable while paused');
    assert.equal(await tiger.locator('.tiger-crop').evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.locator('#motion-toggle').click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.querySelector('#motion-toggle').disabled);
    assert.equal(await page.locator('#motion-toggle').isDisabled(), true);
    assert.equal(await image.evaluate(el => getComputedStyle(el).animationName), 'none');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => !document.querySelector('#motion-toggle').disabled);
    assert.equal(await page.locator('#motion-toggle').isEnabled(), true);
    await page.locator('#debug').click();
    await page.locator('#start-game').click();
    for (let i = 0; i < 5; i++) await page.locator('.bug').press('Enter');
    assert.equal(await tiger.getAttribute('data-pose'), 'dance');
    await page.keyboard.press('Escape');
    await page.locator('#nap').click();
    await page.locator('#reset').click();
    await page.locator('#confirm-reset').click();
    assert.equal(await tiger.getAttribute('data-pose'), 'idle');
    await page.waitForTimeout(1700);
    assert.equal(await page.locator('#energy-value').textContent(), '72%', 'reset must cancel the nap timer');
    await page.setViewportSize({ width: 390, height: 844 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: '/tmp/tiger-v2-mobile.png', fullPage: true });
    assert.deepEqual(errors, []);
    console.log('PASS: high-density artwork, two typing frames, wave, munch, sleep priority, pause/play, reduced motion, victory dance, reset cancellation, mobile layout, and no JS errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
