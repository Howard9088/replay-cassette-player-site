(() => {
  'use strict';
  const api=window.RePlayApi;
  if(!api)return;
  const $=s=>document.querySelector(s);
  const fmt=n=>new Intl.NumberFormat(document.documentElement.lang.startsWith('zh')?'zh-CN':'en-US').format(n);


  async function rewardsPolicy(){
    if(!['points','creator'].includes(document.body.dataset.page)||!await api.isEnabled())return;
    try{
      const catalog=await api.catalog();
      document.body.dataset.policyRevision=String(catalog.policy_revision||'');
      if(document.body.dataset.page==='points'){
        if($('#earnRule')) $('#earnRule').textContent=fmt(catalog.welcome_reward_rp)+' RP';
        if($('#blankRule')) $('#blankRule').textContent=fmt(catalog.blank_cassette_rp)+' RP';
        const creatorTiers=[...new Set((catalog.creator_asset_policy||[]).map(x=>Number(x.reward_price_rp)))].sort((a,b)=>a-b);
        if($('#designRule')) $('#designRule').textContent=creatorTiers.map(fmt).join(' / ')+' RP';
        if($('#creatorRule')) $('#creatorRule').textContent=fmt(catalog.creator_reward_percent)+'%';
        if($('#pendingRule')) $('#pendingRule').textContent='+'+fmt(catalog.first_cassette_completed_reward_rp)+' RP';
      }
      if(document.body.dataset.page==='creator'){
        for(const row of catalog.creator_asset_policy||[]){
          document.querySelectorAll('[data-creator-price-type="'+row.type+'"]').forEach(node=>{
            node.textContent=fmt(row.reward_price_rp)+' RP';
          });
        }
      }
    }catch(error){
      document.body.dataset.policyApiError=error.code||'API_ERROR';
    }
  }

  async function account(){
    if(document.body.dataset.page!=='account'||!await api.isEnabled())return;
    try{
      const data=await api.me();
      $('#accountLiveStatus')?.replaceChildren(document.createTextNode(data.user?.display_name||'Re:Play'));
      if($('#accountRpValue')) $('#accountRpValue').textContent=fmt(data.rewards?.balance||0)+' RP';
      if($('#accountBlankValue')) $('#accountBlankValue').textContent=String(data.entitlements?.blank_cassette||0);
      const assetRows=Object.values(data.entitlements?.assets||{});
      const assetTotal=assetRows.reduce((sum,asset)=>sum+Math.max(1,Number(asset?.quantity||1)),0);
      if($('#accountAssetValue')) $('#accountAssetValue').textContent=String(assetTotal);
      const assetList=$('#accountAssetList');
      if(assetList){
        assetList.replaceChildren();
        if(!assetRows.length){
          const empty=document.createElement('p');empty.textContent=document.documentElement.lang.startsWith('zh')?'还没有在线资产。':'No online assets yet.';assetList.append(empty);
        }else{
          for(const asset of assetRows){
            const row=document.createElement('div');
            const label=document.createElement('span');
            const amount=document.createElement('b');
            label.textContent=asset.kind==='creator-design'?'Creator · '+String(asset.asset_id||''):String(asset.asset_id||'').replace(/-/g,' ');
            amount.textContent='×'+Math.max(1,Number(asset.quantity||1));
            row.append(label,amount);assetList.append(row);
          }
        }
      }
      const history=await api.rewardHistory();
      if($('#accountHistoryValue')) $('#accountHistoryValue').textContent=String(history.events?.length||0);
      const linkButton=$('#desktopLinkCreate'), linkCode=$('#desktopLinkCode'), linkStatus=$('#desktopLinkStatus');
      if(linkButton&&linkCode&&linkStatus){
        linkButton.disabled=false;
        linkStatus.textContent=window.RePlaySiteText?.('desktopLinkExpires')||'Valid for 10 minutes · single use';
        if(!linkButton.dataset.bound){
          linkButton.dataset.bound='true';
          linkButton.addEventListener('click',async()=>{
            linkButton.disabled=true;
            linkButton.textContent=window.RePlaySiteText?.('desktopLinkWorking')||'Generating…';
            linkCode.hidden=true;
            try{
              const link=await api.createDesktopLink();
              linkCode.textContent=link.link_code;
              linkCode.hidden=false;
              linkStatus.textContent=(window.RePlaySiteText?.('desktopLinkExpires')||'Valid for 10 minutes · single use')+' · '+new Date(link.expires_at).toLocaleTimeString();
            }catch(error){
              linkStatus.textContent=window.RePlaySiteText?.('desktopLinkFailed')||'Could not generate code.';
            }finally{
              linkButton.disabled=false;
              linkButton.textContent=window.RePlaySiteText?.('desktopLinkAction')||'Generate desktop link code';
            }
          });
        }
      }
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


  async function shop(){
    if(document.body.dataset.page!=='shop'||!await api.isEnabled())return;
    try{
      const catalog=await api.catalog();
      for(const product of catalog.official_cassettes||[]){
        document.querySelectorAll('[data-price="'+product.product_id+'"]').forEach(node=>{
          node.textContent=fmt(product.reward_price_rp)+' RP';
        });
      }
      document.body.dataset.policyRevision=String(catalog.policy_revision||'');
    }catch(error){
      // Static RP values in HTML are the safe fallback. Never replace them with placeholders.
      document.body.dataset.catalogApiError=error.code||'API_ERROR';
    }
    const buttons=[...document.querySelectorAll('.reward-redeem')];
    if(!buttons.length)return;
    buttons.forEach(button=>{
      button.disabled=false;
      button.textContent=window.RePlaySiteText?.('redeemAction')||'Redeem';
      button.addEventListener('click',async()=>{
        if(button.disabled)return;
        button.disabled=true;
        button.textContent=window.RePlaySiteText?.('redeemWorking')||'Redeeming…';
        const status=document.querySelector('#redeemStatus');
        try{
          const result=await api.redeem(button.dataset.redeemKind,button.dataset.redeemAsset);
          button.textContent=window.RePlaySiteText?.('redeemSuccess')||'Redeemed';
          if(status){
            const balance=fmt(result.rewards?.balance||0);
            status.textContent=(window.RePlaySiteText?.('redeemBalance')||'RP remaining')+': '+balance+' RP';
            status.hidden=false;
          }
          window.dispatchEvent(new CustomEvent('replay:entitlements-updated',{detail:result}));
        }catch(error){
          button.textContent=error.code==='UNAUTHORIZED'
            ?(window.RePlaySiteText?.('redeemSignIn')||'Sign in required')
            :(window.RePlaySiteText?.('redeemFailed')||'Redeem failed');
          if(status){status.textContent=error.code||'API_ERROR';status.hidden=false}
        }finally{
          setTimeout(()=>{
            button.disabled=false;
            if(!button.textContent.includes('成功')&&!button.textContent.includes('Redeemed')) button.textContent=window.RePlaySiteText?.('redeemAction')||'Redeem';
          },1200);
        }
      });
    });
  }



  async function gallery(){
    if(document.body.dataset.page!=='gallery'||!await api.isEnabled())return;
    const grid=$('#galleryGrid'), notice=$('#galleryNotice');
    if(!grid)return;
    try{
      const data=await api.gallery();
      const works=Array.isArray(data.works)?data.works:[];
      if(!works.length)return;
      grid.replaceChildren();
      grid.dataset.galleryMode='live';
      if(notice) notice.textContent=document.documentElement.lang.startsWith('zh')?'社区作品 · RP 固定兑换':'Community works · fixed RP redemption';

      for(const work of works){
        const card=document.createElement('article'); card.className='gallery-card gallery-live-card';
        const art=document.createElement('div'); art.className='gallery-live-art';
        if(work.artwork_asset_id){
          const img=document.createElement('img');
          img.alt=String(work.title||'Creator artwork');
          img.loading='lazy';
          try{img.src=await api.creatorArtworkUrl(work.artwork_asset_id)}catch{}
          art.append(img);
        }else{
          const placeholder=document.createElement('span');
          placeholder.textContent='Re:Play Creator';
          art.append(placeholder);
        }

        const meta=document.createElement('div'); meta.className='gallery-meta';
        const info=document.createElement('div');
        const title=document.createElement('h3'); title.textContent=String(work.title||'Untitled');
        const by=document.createElement('span'); by.textContent='by '+String(work.creator?.display_name||'Re:Play Creator')+' · '+String(work.asset_type||'design');
        info.append(title,by);
        const price=document.createElement('b'); price.textContent=fmt(work.reward_price_rp)+' RP';
        meta.append(info,price);

        const metrics=document.createElement('div'); metrics.className='gallery-live-metrics';
        const like=document.createElement('button'); like.type='button'; like.className='gallery-like';
        like.textContent='♡ '+fmt(work.like_count||0);
        const redeems=document.createElement('span'); redeems.textContent=fmt(work.redeem_count||0)+' Redeems';
        metrics.append(like,redeems);

        const policy=document.createElement('small'); policy.className='gallery-policy-note';
        policy.textContent=document.documentElement.lang.startsWith('zh')?'固定分类兑换价 · 点心数不改变 RP':'Fixed category price · likes do not change RP';

        const redeem=document.createElement('button'); redeem.type='button'; redeem.className='gallery-redeem gallery-live-redeem';
        redeem.textContent=(window.RePlaySiteText?.('redeemAction')||'Redeem')+' · '+fmt(work.reward_price_rp)+' RP';

        like.addEventListener('click',async()=>{
          like.disabled=true;
          try{
            const result=await api.like(work.work_id,true);
            like.textContent='♡ '+fmt(result.like_count||0);
          }catch(error){
            if(error.code==='UNAUTHORIZED') like.textContent=document.documentElement.lang.startsWith('zh')?'登录后点赞':'Sign in to like';
          }finally{setTimeout(()=>{like.disabled=false},500)}
        });

        redeem.addEventListener('click',async()=>{
          redeem.disabled=true;
          try{
            const result=await api.redeemCreator(work.work_id);
            redeem.textContent=window.RePlaySiteText?.('redeemSuccess')||'Redeemed';
            work.redeem_count=Number(work.redeem_count||0)+1;
            redeems.textContent=fmt(work.redeem_count)+' Redeems';
            window.dispatchEvent(new CustomEvent('replay:entitlements-updated',{detail:result}));
          }catch(error){
            redeem.textContent=error.code==='UNAUTHORIZED'
              ?(window.RePlaySiteText?.('redeemSignIn')||'Sign in required')
              : error.code==='INSUFFICIENT_RP'
                ?(document.documentElement.lang.startsWith('zh')?'RP 不足':'Not enough RP')
                :(window.RePlaySiteText?.('redeemFailed')||'Redeem failed');
          }finally{setTimeout(()=>{redeem.disabled=false},900)}
        });

        card.append(art,meta,metrics,policy,redeem);
        grid.append(card);
      }
    }catch(error){
      document.body.dataset.galleryApiError=error.code||'API_ERROR';
    }
  }

  async function creator(){
    if(document.body.dataset.page!=='creator')return;
    const input=$('#creatorArtworkInput'), button=$('#creatorArtworkUpload'), status=$('#creatorArtworkStatus'), preview=$('#creatorArtworkPreview');
    if(!input||!button||!status)return;
    if(!await api.isEnabled())return;

    input.disabled=false;
    button.disabled=false;
    status.textContent=window.RePlaySiteText?.('creatorUploadReady')||'Choose an image.';

    input.addEventListener('change',()=>{
      const file=input.files?.[0];
      if(!file)return;
      if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size<100||file.size>5_000_000){
        input.value='';
        status.textContent=window.RePlaySiteText?.('creatorUploadInvalid')||'Invalid artwork.';
        if(preview){preview.hidden=true;preview.removeAttribute('src')}
        return;
      }
      if(preview){
        preview.src=URL.createObjectURL(file);
        preview.hidden=false;
        preview.onload=()=>URL.revokeObjectURL(preview.src);
      }
      status.textContent=file.name+' · '+fmt(file.size)+' bytes';
    });

    button.addEventListener('click',async()=>{
      const file=input.files?.[0];
      if(!file){status.textContent=window.RePlaySiteText?.('creatorUploadReady')||'Choose an image.';return}
      button.disabled=true;
      status.textContent=window.RePlaySiteText?.('creatorUploadWorking')||'Uploading…';
      try{
        const result=await api.uploadCreatorArtwork(file);
        status.textContent=(window.RePlaySiteText?.('creatorUploadSuccess')||'Uploaded · Asset ID')+': '+result.artwork_asset_id;
        status.dataset.assetId=result.artwork_asset_id;
      }catch(error){
        status.textContent=error.code==='UNAUTHORIZED'
          ?(window.RePlaySiteText?.('redeemSignIn')||'Sign in required')
          :(error.code||window.RePlaySiteText?.('creatorUploadInvalid')||'Upload failed');
      }finally{
        button.disabled=false;
      }
    });
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

  Promise.all([rewardsPolicy(),account(),activities(),shop(),gallery(),creator(),support()]).catch(()=>{});
})();