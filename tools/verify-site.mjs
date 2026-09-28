import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = name => fs.readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const json = name => JSON.parse(read(name));
const catalog = json('catalog.json');
const api = json('api-config.json');
const admin = json('admin-config.json');

assert.equal(catalog.policyVersion, 'global-beta-v1.2');
assert.equal(catalog.welcomeRewardRp, 2000);
assert.equal(catalog.blankCassetteCostRp, 400);
assert.deepEqual(catalog.products.map(item => item.rewardPriceRp), [400, 800, 1200]);
assert.deepEqual(catalog.products.map(item => item.cashPriceCents), [99, 199, 299]);
assert.deepEqual(catalog.products.map(item => item.purchaseRewardRp), [200, 400, 600]);
assert.deepEqual(catalog.creatorPriceTiersRp, [400]);
assert.equal(catalog.creatorRewardPercent, 100);
assert.equal(catalog.creatorLikePolicy.rewardRp, 0);
assert.equal(catalog.creatorLikePolicy.affectsRedemptionPrice, false);
assert.equal(catalog.features.cashPurchaseEnabled, false);
assert.equal(catalog.features.purchaseRewardEnabled, false);

// GitHub Pages is public marketing; authenticated account operations use
// the protected same-origin service, never a writable static admin preview.
assert.equal(api.enabled, false);
assert.equal(api.baseUrl, '');
assert.equal(admin.featureFlags.PURCHASE_ENABLED, false);
assert.match(read('account.html'), /id="accountLoginForm"/);
assert.match(read('account.html'), /id="accountRegisterForm"/);
assert.match(read('account.html'), /desktopAuthorizePanel/);
assert.match(read('admin-preview.html'), /noindex,nofollow/);
assert.doesNotMatch(read('admin-preview.html'), /admin-live\.js|replay-api\.js/);
assert.match(read('admin-preview.html'), /data-admin-write disabled/);

for (const name of ['index.html', 'experience.html', 'shop.html', 'gallery.html', 'points.html']) {
  assert.match(read(name), /<html/);
}
const shop = read('shop.html');
for (const item of ['classic-c60', 'classic-c90', 'metal-c90']) {
  assert.match(shop, new RegExp(`data-cash-price="${item}"`));
  assert.match(shop, new RegExp(`data-price="${item}"`));
}
assert.doesNotMatch(shop, /Buy now|Checkout|data-redeem-kind="blank-cassette"/i);
const download = 'https://github.com/Howard9088/replay-cassette-player-releases/releases/latest/download/RePlay-Setup.exe';
assert.ok(read('index.html').includes(download));
assert.ok(shop.includes(download));
console.log('Re:Play public website and account-boundary checks passed.');
