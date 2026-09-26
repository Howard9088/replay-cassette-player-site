(() => {
  'use strict';
  const flags = document.querySelector('#flagGrid');
  const roles = document.querySelector('#roleGrid');
  fetch('admin-config.json',{cache:'no-store'})
    .then(r => { if(!r.ok) throw new Error('CONFIG'); return r.json(); })
    .then(data => {
      document.querySelector('#policyVersion').textContent = data.policyVersion || '—';
      const p = data.rewardPolicy || {};
      document.querySelector('#adminWelcome').textContent = (p.welcomeRewardRp ?? '—').toLocaleString() + ' RP';
      document.querySelector('#adminBlank').textContent = (p.blankCassetteCostRp ?? '—').toLocaleString() + ' RP';
      document.querySelector('#adminFirstTape').textContent = '+' + (p.firstCassetteCompletedRewardRp ?? '—') + ' RP';
      document.querySelector('#adminFirstPublish').textContent = (p.firstCreatorPublishRewardRp ?? '—') + ' RP';
      document.querySelector('#adminCreatorReward').textContent = (p.creatorRewardPercent ?? '—') + '%';
      document.querySelector('#adminContribution').textContent = (p.betaContributionTiersRp || []).join(' / ') + ' RP';
      flags.innerHTML = Object.entries(data.featureFlags || {}).map(([key,value]) =>
        `<article class="flag-card"><span>${key}</span><strong class="${value?'flag-on':'flag-off'}">${value?'ON':'OFF'}</strong></article>`
      ).join('');
      roles.innerHTML = Object.entries(data.adminRoles || {}).map(([key,value]) =>
        `<article><span>${key}</span><strong>${value.includes('*')?'FULL ACCESS':value.length+' permissions'}</strong></article>`
      ).join('');
    })
    .catch(() => {
      if(flags) flags.innerHTML = '<div class="admin-empty-state">Configuration unavailable.</div>';
    });
})();