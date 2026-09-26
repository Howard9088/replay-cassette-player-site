import fs from 'node:fs';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const json=p=>JSON.parse(read(p));
const catalog=json('catalog.json');
const admin=json('admin-config.json');
const api=json('api-config.json');

assert.equal(catalog.policyVersion,'global-beta-v1.1');
assert.equal(catalog.welcomeRewardRp,2000);
assert.equal(catalog.blankCassetteCostRp,400);
assert.equal(Object.hasOwn(catalog,'firstCreatorPublishRewardRp'),false);
assert.deepEqual(catalog.products.map(x=>x.rewardPriceRp),[400,800,1200]);
assert.deepEqual(catalog.products.map(x=>x.cashPriceCents),[99,199,299]);
assert.deepEqual(catalog.creatorPriceTiersRp,[100,200,300,400]);
assert.equal(catalog.creatorRewardPercent,100);
assert.equal(catalog.creatorLikePolicy.rewardRp,0);
assert.equal(catalog.creatorLikePolicy.affectsRedemptionPrice,false);

assert.equal(admin.policyVersion,'global-beta-v1.1');
assert.equal(admin.rewardPolicy.welcomeRewardRp,2000);
assert.equal(admin.rewardPolicy.blankCassetteCostRp,400);
assert.equal(Object.hasOwn(admin.rewardPolicy,'firstCreatorPublishRewardRp'),false);
assert.equal(admin.featureFlags.PURCHASE_ENABLED,false);
assert.equal(admin.featureFlags.CREATOR_LEVEL_ENABLED,false);
assert.equal(admin.featureFlags.CREATOR_BONUS_ENABLED,false);

assert.equal(api.enabled,false);
assert.equal(api.baseUrl,'');
assert.equal(api.authMode,'cookie-session');

for(const page of ['account.html','creator.html','activities.html','support.html','policies.html','shop.html']){
  const html=read(page);
  assert.match(html,/replay-api\.js/);
}
assert.match(read('admin-preview.html'),/noindex,nofollow/);
assert.doesNotMatch(read('admin-preview.html'),/admin-live\.js|replay-api\.js/);
assert.match(read('admin-preview.html'),/data-admin-write disabled/);
assert.doesNotMatch(read('admin-preview.html'),/Creator Publish|adminFirstPublish/);
assert.doesNotMatch(read('admin-preview.html'),/api[_-]?key|secret|bearer\s+[A-Za-z0-9_-]{10,}/i);
assert.doesNotMatch(read('app.js'),/cartDisclaimer|checkoutPending|Planned subtotal|计划售价小计/);
assert.doesNotMatch(read('shop.html'),/blank-card|data-redeem-kind="blank-cassette"|data-blank-price/);
assert.match(read('shop.html'),/data-cash-price="classic-c60">\$0\.99/);
assert.match(read('shop.html'),/data-cash-price="classic-c90">\$1\.99/);
assert.match(read('shop.html'),/data-cash-price="metal-c90">\$2\.99/);
assert.match(read('shop.html'),/\$0\.99/);
assert.match(read('shop.html'),/\$1\.99/);
assert.match(read('shop.html'),/\$2\.99/);
assert.doesNotMatch(read('points.html'),/publishRule|pointsPublish/);
assert.match(read('activities.html'),/Valid Creator Redemption/);
assert.match(read('activities.html'),/Uploading or publishing earns no RP/);
assert.match(read('support.html'),/<span data-i18n="supportCategory">/);
assert.match(read('creator.html'),/id="creatorArtworkInput"/);
assert.match(read('creator.html'),/id="creatorWorksList"/);
assert.match(read('account.html'),/id="desktopLinkPanel"/);
assert.match(read('replay-api.js'),/createDesktopLink/);
assert.match(read('replay-api.js'),/uploadCreatorArtwork/);
assert.match(read('replay-api.js'),/creatorWorks:\(\)=>request\('\/api\/creator\/works'\)/);
assert.match(read('replay-api.js'),/gallery:\(\)=>request\('\/api\/gallery'\)/);
assert.match(read('site-live.js'),/async function gallery\(\)/);
assert.match(read('admin-preview.html'),/BETA INVITES/);
assert.doesNotMatch(read('app.js'),/\$\$\('\[data-price\],\[data-gallery-price\]'\)\.forEach\(node => node\.textContent = '—'\)/);
assert.match(read('site-live.js'),/future_cash_price_cents/);
console.log('Re:Play site Global Beta V1.1 checks passed.');
