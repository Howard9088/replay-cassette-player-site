(() => {
  'use strict';
  const api = window.RePlayApi;
  if (!api) return;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const set = (selector, value) => { const el = $(selector); if (el) el.textContent = value; };
  const fmt = n => new Intl.NumberFormat('en-US').format(Number(n || 0));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
  let writable = false;

  function writeStatus(message, ok = true) {
    const el = $('#adminWriteStatus');
    if (!el) return;
    el.textContent = message || '';
    el.dataset.ok = ok ? 'true' : 'false';
  }
  function setWritable(value) {
    writable = !!value;
    $$('[data-admin-write]').forEach(el => { el.disabled = !writable; });
  }
  function formData(form) { return Object.fromEntries(new FormData(form).entries()); }

  async function load() {
    if (!await api.isEnabled()) {
      setWritable(false);
      return;
    }
    try {
      const [users, ledger, tickets, works, flags, campaigns, audit, announcements] = await Promise.all([
        api.adminUsers(), api.adminLedger(), api.adminTickets(), api.adminWorks(),
        api.adminFlags(), api.adminCampaigns(), api.adminAudit(), api.adminAnnouncements()
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
        '<tr><td>'+esc(x.title)+'</td><td>'+esc(x.asset_type)+'</td><td>'+fmt(x.reward_price_rp)+' RP</td><td>♡ '+fmt(x.like_count)+'</td><td>'+fmt(x.redeem_count)+'</td><td>'+esc(x.status)+'</td></tr>'
      ).join('');

      const flagGrid = $('#flagGrid');
      if (flagGrid) flagGrid.innerHTML = Object.entries(flags.flags || {}).map(([k,v]) =>
        '<article class="flag-card"><span>'+esc(k)+'</span><strong class="'+(v?'flag-on':'flag-off')+'">'+(v?'ON':'OFF')+'</strong></article>'
      ).join('');

      const campaignBody = $('#adminCampaignBody');
      if (campaignBody) campaignBody.innerHTML = (campaigns.campaigns || []).map(x =>
        '<tr><td>'+esc(x.name)+'</td><td>'+fmt(x.reward_rp)+' RP</td><td>'+esc(x.claim_mode)+'</td><td>'+esc(x.status)+'</td></tr>'
      ).join('');

      const announcementBody = $('#adminAnnouncementsBody');
      if (announcementBody) announcementBody.innerHTML = (announcements.announcements || []).map(x =>
        '<tr><td>'+esc(x.title)+'</td><td>'+esc(x.target)+'</td><td>'+esc(x.locale)+'</td><td>'+esc(x.status)+'</td></tr>'
      ).join('');

      const auditBody = $('#adminAuditBody');
      if (auditBody) auditBody.innerHTML = (audit.events || []).slice(-100).reverse().map(x =>
        '<tr><td>'+esc(x.action)+'</td><td>'+esc(x.operator_id)+'</td><td>'+esc(x.target)+'</td><td>'+esc(x.created_at)+'</td></tr>'
      ).join('');

      document.body.classList.add('api-live');
      set('#adminConnectionStatus','Backend connected · Admin session verified');
      setWritable(true);
    } catch (error) {
      setWritable(false);
      document.body.dataset.apiError = error.code || 'ADMIN_API_ERROR';
      set('#adminConnectionStatus', error.code === 'UNAUTHORIZED' ? 'Admin sign-in required' : 'Backend unavailable');
    }
  }

  async function runWrite(label, action) {
    if (!writable) return;
    writeStatus(label + '…');
    setWritable(false);
    try {
      await action();
      writeStatus(label + ' ✓', true);
      await load();
    } catch (error) {
      writeStatus((error.code || 'ADMIN_WRITE_FAILED') + ' ✕', false);
      setWritable(true);
    }
  }

  $('#adminUserStatusForm')?.addEventListener('submit', event => {
    event.preventDefault(); const d=formData(event.currentTarget);
    runWrite('Account updated',()=>api.adminSetUserStatus(d.user_id,{status:d.status,reason:d.reason}));
  });
  $('#adminRewardForm')?.addEventListener('submit', event => {
    event.preventDefault(); const d=formData(event.currentTarget);
    runWrite('Reward granted',()=>api.adminGrant({user_id:d.user_id,amount:Number(d.amount),source:d.source,reason:d.reason}));
  });
  $('#adminCreatorReviewForm')?.addEventListener('submit', event => {
    event.preventDefault(); const d=formData(event.currentTarget);
    runWrite('Creator review saved',()=>api.adminReviewCreator(d.work_id,{status:d.status,reason:d.reason}));
  });
  $('#adminCampaignForm')?.addEventListener('submit', event => {
    event.preventDefault(); const d=formData(event.currentTarget);
    runWrite('Campaign created',()=>api.adminCreateCampaign({
      campaign_id:'campaign-'+crypto.randomUUID(),name:d.name,reward_rp:Number(d.reward_rp),
      claim_mode:d.claim_mode,status:d.status,per_account_limit:Number(d.per_account_limit)
    }));
  });
  $('#adminTicketForm')?.addEventListener('submit', event => {
    event.preventDefault(); const d=formData(event.currentTarget);
    runWrite('Ticket updated',()=>api.adminUpdateTicket(d.ticket_id,{status:d.status,note:d.note}));
  });
  $('#adminAnnouncementForm')?.addEventListener('submit', event => {
    event.preventDefault(); const d=formData(event.currentTarget);
    runWrite('Announcement created',()=>api.adminCreateAnnouncement({
      title:d.title,body:d.body,target:d.target,locale:d.locale||'all',status:d.status
    }));
  });
  $('#adminFlagForm')?.addEventListener('submit', event => {
    event.preventDefault(); const d=formData(event.currentTarget);
    runWrite('Feature flag updated',()=>api.adminSetFlag({name:d.name,enabled:d.enabled==='true',reason:d.reason}));
  });

  setWritable(false);
  load();
})();