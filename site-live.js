(() => {
  'use strict';
  const api=window.RePlayApi;
  if(!api)return;
  const $=s=>document.querySelector(s);
  const fmt=n=>new Intl.NumberFormat(document.documentElement.lang.startsWith('zh')?'zh-CN':'en-US').format(n);

  async function account(){
    if(document.body.dataset.page!=='account'||!await api.isEnabled())return;
    try{
      const data=await api.me();
      $('#accountLiveStatus')?.replaceChildren(document.createTextNode(data.user?.display_name||'Re:Play'));
      if($('#accountRpValue')) $('#accountRpValue').textContent=fmt(data.rewards?.balance||0)+' RP';
      if($('#accountBlankValue')) $('#accountBlankValue').textContent=String(data.entitlements?.blank_cassette||0);
      if($('#accountAssetValue')) $('#accountAssetValue').textContent=String(Object.keys(data.entitlements?.assets||{}).length);
      const history=await api.rewardHistory();
      if($('#accountHistoryValue')) $('#accountHistoryValue').textContent=String(history.events?.length||0);
      document.body.classList.add('api-live');
    }catch(error){document.body.dataset.apiError=error.code||'API_ERROR'}
  }

  async function activities(){
    if(document.body.dataset.page!=='activities'||!await api.isEnabled())return;
    try{
      const data=await api.campaigns();
      const box=$('#liveCampaigns');
      if(box&&data.campaigns?.length){
        box.innerHTML=data.campaigns.map(c=>`<article class="activity-card active"><span>ACTIVE</span><strong>${String(c.name).replace(/[<>&"]/g,'')}</strong><b>+${Number(c.reward_rp).toLocaleString()} RP</b><p>Per-account limit: ${Number(c.per_account_limit)}</p></article>`).join('');
        $('#campaignEmpty')?.setAttribute('hidden','');
      }
    }catch(error){document.body.dataset.apiError=error.code||'API_ERROR'}
  }

  async function support(){
    if(document.body.dataset.page!=='support'||!await api.isEnabled())return;
    const form=$('.support-form'); if(!form)return;
    form.querySelectorAll('select,input,textarea,button').forEach(el=>el.disabled=false);
    $('#supportDisabled')?.setAttribute('hidden','');
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      const select=form.querySelector('select'), input=form.querySelector('input'), textarea=form.querySelector('textarea'), button=form.querySelector('button');
      button.disabled=true;
      try{
        await api.createTicket({category:select.value,subject:input.value,details:textarea.value});
        input.value='';textarea.value='';
        button.textContent=document.documentElement.lang.startsWith('zh')?'已提交':'Submitted';
      }catch(error){
        button.textContent=error.code==='UNAUTHORIZED'?(document.documentElement.lang.startsWith('zh')?'请先登录':'Sign in required'):(document.documentElement.lang.startsWith('zh')?'提交失败':'Submit failed');
      }finally{setTimeout(()=>{button.disabled=false},800)}
    });
  }

  Promise.all([account(),activities(),support()]).catch(()=>{});
})();