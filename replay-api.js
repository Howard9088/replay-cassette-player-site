(() => {
  'use strict';
  if (window.RePlayApi) return;
  let config = null;
  const ready = fetch('api-config.json',{cache:'no-store'})
    .then(r=>r.ok?r.json():Promise.reject(new Error('API_CONFIG')))
    .then(value=>{config=value;return value})
    .catch(()=>({enabled:false,baseUrl:'',credentials:'include'}));

  const operationId=()=>crypto.randomUUID();
  async function request(path,{method='GET',body,operation=false}={}){
    const cfg=await ready;
    if(!cfg.enabled||!cfg.baseUrl) throw Object.assign(new Error('API_DISABLED'),{code:'API_DISABLED'});
    const headers={'accept':'application/json'};
    const payload=body?{...body}:undefined;
    if(operation&&payload&&!payload.operation_id) payload.operation_id=operationId();
    if(payload) headers['content-type']='application/json';
    const response=await fetch(new URL(path,cfg.baseUrl),{
      method,headers,credentials:cfg.credentials||'include',
      body:payload?JSON.stringify(payload):undefined
    });
    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw Object.assign(new Error(data?.error?.code||'API_ERROR'),{code:data?.error?.code||'API_ERROR',status:response.status});
    return data;
  }
  const api={
    ready,
    isEnabled:async()=>{const c=await ready;return !!(c.enabled&&c.baseUrl)},
    me:()=>request('/api/me'),
    rewards:()=>request('/api/me/rewards'),
    rewardHistory:()=>request('/api/me/rewards/history'),
    entitlements:()=>request('/api/me/entitlements'),
    catalog:()=>request('/api/rewards/catalog'),
    redeem:(kind,asset_id)=>request('/api/rewards/redeem',{method:'POST',body:{kind,asset_id},operation:true}),
    campaigns:()=>request('/api/campaigns'),
    claimCampaign:campaignId=>request('/api/campaigns/'+encodeURIComponent(campaignId)+'/claim',{method:'POST',body:{},operation:true}),
    tickets:()=>request('/api/support/tickets'),
    createTicket:data=>request('/api/support/tickets',{method:'POST',body:data}),
    publishCreator:data=>request('/api/creator/publish',{method:'POST',body:data,operation:true}),
    redeemCreator:workId=>request('/api/gallery/'+encodeURIComponent(workId)+'/redeem',{method:'POST',body:{},operation:true}),
    like:(workId,liked)=>request('/api/gallery/'+encodeURIComponent(workId)+'/like',{method:liked?'POST':'DELETE'}),
  };
  window.RePlayApi=Object.freeze(api);
  ready.then(c=>window.dispatchEvent(new CustomEvent('replay:api-ready',{detail:{enabled:!!(c.enabled&&c.baseUrl)}})));
})();