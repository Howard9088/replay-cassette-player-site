import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('./account.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('./site-live.js', import.meta.url), 'utf8');

assert.match(html, /id="accountGuestView"/);
assert.match(html, /id="accountDashboard"[^>]*\bhidden\b/);
assert.ok(html.indexOf('id="accountGuestView"') < html.indexOf('id="accountDashboard"'));
assert.match(html, /id="registerInvite"[^>]*name="invite_code"/);

function element() {
  return {
    hidden: false, dataset: {}, textContent: '', children: [],
    classList: { add() {}, remove() {} },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    addEventListener() {}
  };
}

async function checkCase(enabled, signedIn, inviteOnly = false) {
  const selectors = [
    '#accountGuestView', '#accountDashboard', '#accountAuthStatus',
    '#accountSignOut', '#accountLiveStatus', '#accountRpValue',
    '#accountBlankValue', '#accountAssetValue', '#accountAssetList',
    '#accountHistoryValue', '#accountDeviceValue', '#accountCassetteValue',
    '#accountCreatorValue', '#accountMissingValue', '#accountCassetteList',
    '#accountDeviceList', '#registerInviteField', '#registerInvite'
  ];
  const nodes = Object.fromEntries(selectors.map(selector => [selector, element()]));
  nodes['#accountDashboard'].hidden = true;
  nodes['#accountSignOut'].hidden = true;
  const api = {
    isEnabled: async () => enabled,
    catalog: async () => ({ registration_invite_only: inviteOnly }),
    me: async () => {
      if (!signedIn) throw Object.assign(new Error('UNAUTHORIZED'), { code: 'UNAUTHORIZED' });
      return { user: { display_name: 'Test user' }, rewards: { balance: 2000 }, entitlements: { blank_cassette: 0, assets: {} } };
    },
    rewardHistory: async () => ({ events: [] }),
    devices: async () => ({ devices: [] }),
    cassettes: async () => ({ projects: [] }),
    creatorWorks: async () => ({ works: [] })
  };
  const document = {
    body: { dataset: { page: 'account' }, classList: { add() {}, remove() {} } },
    documentElement: { lang: 'en' },
    querySelector: selector => nodes[selector] ?? null,
    querySelectorAll: () => [],
    createTextNode: textContent => ({ textContent }),
    createElement: element
  };
  runInNewContext(script, {
    window: { RePlayApi: api, RePlaySiteText: () => 'Service unavailable' },
    document, location: { search: '', reload() {} },
    URLSearchParams, Intl, Promise, console
  });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(nodes['#accountGuestView'].hidden, enabled && signedIn);
  assert.equal(nodes['#accountDashboard'].hidden, !(enabled && signedIn));
  if (enabled) {
    assert.equal(nodes['#registerInviteField'].hidden, !inviteOnly);
    assert.equal(nodes['#registerInvite'].required, inviteOnly);
  }
  if (enabled && signedIn) {
    assert.equal(nodes['#accountRpValue'].textContent, '2,000 RP');
    assert.equal(nodes['#accountSignOut'].hidden, false);
  }
}

await checkCase(false, false);
await checkCase(true, false);
await checkCase(true, true);
await checkCase(true, false, true);
console.log('account auth gate: disabled, guest, authenticated passed');
