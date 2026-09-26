(() => {
  'use strict';
  const api = window.RePlayApi;
  if (!api) return;
  const $ = s => document.querySelector(s);
  const set = (selector, value) => { const el = $(selector); if (el) el.textContent = value; };
  const fmt = n => new Intl.NumberFormat('en-US').format(Number(n || 0));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));

  async function load() {
    if (!await api.isEnabled()) return;
    try {
      const [users, ledger, tickets, works, flags, campaigns, audit] = await Promise.all([
        api.adminUsers(), api.adminLedger(), api.adminTickets(), api.adminWorks(),
        api.adminFlags(), api.adminCampaigns(), api.adminAudit()
      ]);
      const userRows = users.users || [];
      const ledgerRows = ledger.events || [];
      const ticketRows = tickets.tickets || [];
      const workRows = works.works || [];

      set('#adminUsersKpi', fmt(userRows.length));
      set('#adminRpKpi', fmt(userRows.reduce((s, x) => s + Number(x.rp_balance || 0), 0)));
      set('#adminCreatorKpi', fmt(workRows.length));
      set('#adminTicketsKpi', fmt(ticketRows.filter(x => !['RESOLVED','CLOSED'].includes(x.status)).length));

      const usersBody = $('#adminUsersBody');
      if (usersBody) usersBody.innerHTML = userRows.slice(0,100).map(x =>
        '<tr><td>'+esc(x.display_name)+'</td><td>'+esc(x.status)+'</td><td>'+fmt(x.rp_balance)+' RP</td><td>'+fmt(x.blank_cassette)+'</td><td>'+fmt(x.creator_works)+'</td><td>'+fmt(x.open_tickets)+'</td></tr>'
      ).join('');

      const ledgerBody = $('#adminLedgerBody');
      if (ledgerBody) ledgerBody.innerHTML = ledgerRows.slice(0,100).map(x =>
        '<tr><td>'+esc(x.event_type)+'</td><td>'+esc(x.user_id)+'</td><td>'+(x.amount>0?'+':'')+fmt(x.amount)+'</td><td>'+esc(x.source_type)+'</td><td>'+esc(x.created_at)+'</td></tr>'
      ).join('');

      const ticketsBody = $('#adminTicketsBody');
      if (ticketsBody) ticketsBody.innerHTML = ticketRows.slice(0,100).map(x =>
        '<tr><td>'+esc(x.category)+'</td><td>'+esc(x.subject)+'</td><td>'+esc(x.status)+'</td><td>'+esc(x.user_id)+'</td></tr>'
      ).join('');

      const worksBody = $('#adminWorksBody');
      if (worksBody) worksBody.innerHTML = workRows.slice(0,100).map(x =>
        '<tr><td>'+esc(x.title)+'</td><td>'+esc(x.asset_type)+'</td><td>'+fmt(x.reward_price_rp)+' RP</td><td>♡ '+fmt(x.like_count)+'</td><td>'+fmt(x.redeem_count)+'</td></tr>'
      ).join('');

      const flagGrid = $('#flagGrid');
      if (flagGrid) flagGrid.innerHTML = Object.entries(flags.flags || {}).map(([k,v]) =>
        '<article class="flag-card"><span>'+esc(k)+'</span><strong class="'+(v?'flag-on':'flag-off')+'">'+(v?'ON':'OFF')+'</strong></article>'
      ).join('');

      const campaignBody = $('#adminCampaignBody');
      if (campaignBody) campaignBody.innerHTML = (campaigns.campaigns || []).map(x =>
        '<tr><td>'+esc(x.name)+'</td><td>'+fmt(x.reward_rp)+' RP</td><td>'+esc(x.claim_mode)+'</td><td>'+esc(x.status)+'</td></tr>'
      ).join('');

      const auditBody = $('#adminAuditBody');
      if (auditBody) auditBody.innerHTML = (audit.events || []).slice(-100).reverse().map(x =>
        '<tr><td>'+esc(x.action)+'</td><td>'+esc(x.operator_id)+'</td><td>'+esc(x.target)+'</td><td>'+esc(x.created_at)+'</td></tr>'
      ).join('');

      document.body.classList.add('api-live');
      const chip = $('.admin-topbar .notice-chip');
      if (chip) chip.textContent = 'Backend connected';
    } catch (error) {
      document.body.dataset.apiError = error.code || 'ADMIN_API_ERROR';
      const chip = $('.admin-topbar .notice-chip');
      if (chip) chip.textContent = error.code === 'UNAUTHORIZED' ? 'Admin sign-in required' : 'Backend unavailable';
    }
  }
  load();
})();