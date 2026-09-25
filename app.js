/* Public preview: cart, prices and point examples are local display only. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const CART_KEY = 'replay-site-preview-cart-v1';
  const LANG_KEY = 'replay-site-language-v3';
  const copy = {
    zh: {
      skip:'跳到内容', navExperience:'体验', navShop:'商城', navGallery:'Gallery', navPoints:'积分', cart:'购物车', downloadReplay:'下载 Re:Play', languageLabel:'网站语言', skinLabel:'播放器外观', sceneGroupLabel:'场景背景', homeLabel:'Re:Play 首页', mainNavLabel:'网站导航', footerNavLabel:'页脚导航', tapeCanvasLabel:'装在播放器磁带舱内并转动卷轴的 Metal C90', addToCart:'添加到购物车', removeFromCart:'从购物车移除', chooseTape:'选择磁带', closeCart:'关闭购物车',
      heroKicker:'重新想象慢下来听歌', heroTitle:'歌没有变快，<br>只是我们<br>变得太快了。', heroTagline:'十首歌。一盒磁带。一个属于自己的晚上。', heroDescription:'挑选真正喜欢的歌，做一盒自己的磁带。按下 PLAY，看卷轴转起来，认真听完。', freeDownload:'↓&nbsp; Windows 预览版', seeExperience:'▷&nbsp; 了解 Re:Play', platformNote:'Windows 预览版 · 使用自己的音乐 · 下载权限可能受限',
      showcaseLabel:'真实的 RE:PLAY 播放器', skinGold:'黄金版', skinRetro:'复古版', demoPause:'Ⅱ 暂停画面演示', demoPlay:'▷ 播放画面演示', demoDisclaimer:'动态画面演示 · 无声音与个人磁带', demoCoverAlt:'原创「蓝色时刻」示范磁带封面', sceneLabel:'场景', sceneNight:'夜间书桌', sceneRain:'雨天', sceneWindow:'窗前', sceneSea:'海边', demoShelfKicker:'示范磁带架', demoShelfTitle:'等你的音乐住进来。', demoShelfNotice:'虚构展示磁带 · 不含用户作品',
      benefitTape:'真实的磁带体验', benefitTapeDetail:'复刻磁带的声音与质感。', benefitMusic:'属于你的音乐', benefitMusicDetail:'精选歌曲，记录心情。', benefitScene:'沉浸式场景', benefitSceneDetail:'不同的环境，不同的心情。', benefitRadio:'全球电台', benefitRadioDetail:'发现世界各地的好声音。', benefitQuote:'“有时候，美好的东西，<br>本来就不需要那么快。”',
      productKicker:'PRODUCT / RE:PLAY', productTitle:'经典外观。<br>现代体验。', productDescription:'Re:Play 是一款有真实磁带气质的数字播放器。用自己的音乐，体验亲手挑歌、录带、翻面与收藏的乐趣。', exploreProduct:'了解产品 →',
      featuresKicker:'真实软件界面', featuresTitle:'两种播放器，<br>同一种慢下来。', featuresDescription:'切换黄金版与复古版，感受自动轮换的听歌场景，再用完整创意画板制作磁带。播放器为真实软件截图；画板中的图案为原创示意。', featureGold:'黄金版播放器', featureGoldDetail:'软件里的暖色实体感机身。', featureRetro:'复古版播放器', featureRetroDetail:'另一套完整可用的听歌界面。', featureCreator:'完整创意画板', featureCreatorDetail:'按尺寸设计盒面、盒脊、普通带贴纸和歌词纸。', creatorSampleAlt:'真实创意画板截图上展示原创「蓝色时刻」示范图案', creatorNote:'不想设计也没关系：上传封面即可自动配套盒脊颜色。想认真创作时，再打开完整画板。', creatorGalleryLink:'看看 Gallery →',
      storyKicker:'MORE THAN MUSIC', storyTitle:'音乐不只是声音，<br>更是一段时光。', storyDescription:'在这个快进的世界里，给自己一点时间。打开 Re:Play，重新发现音乐的温度。', beginStory:'从一盒磁带开始 →',
      shopKicker:'CASSETTE STORE', shopTitle:'收藏属于你的<br>磁带时光。', shopDescription:'从经典 C60 到金属 Metal，每一盒磁带，都是一段独特的音乐旅程。', previewShop:'预览商城 · 尚未开放收款', c60Description:'经典 60 分钟，简单纯粹。', c90Description:'更长的陪伴，更多的故事。', metalDescription:'更丰富的音色；金属带不贴纸。', shopFineprint:'商品价格与返积分为试算展示。购物车只保存在本机；正式付款、磁带资产和积分以未来服务端确认为准。',
      galleryKicker:'RE:PLAY GALLERY', galleryTitle:'一盒磁带，<br>一种自己的表达。', galleryDescription:'磁带盒与磁带一起展示。创作者保留原创设计权益；兑换者获得所选版本的个人使用许可。', galleryNotice:'设计示例 · 尚未开放兑换', galleryOne:'蓝色时刻', galleryTwo:'深夜来信', galleryThree:'雨后的歌', sampleLabel:'示意设计 · 未上架', redeemPending:'积分兑换筹备中', galleryFineprint:'Gallery 兑换的是设计使用权，可绑定到自己持有的空白磁带；不包含图片、字体或音乐之外的版权转让。金属带示例仅展示磁带盒设计，不添加磁带贴纸。',
      pointsKicker:'RE:PLAY POINTS / PILOT', pointsTitle:'买一盒磁带，<br>开启下一次创作。', pointsDescription:'购买磁带获得积分；积分可以兑换 Gallery 设计的使用许可，也可以兑换新的空白磁带。创作者的设计被兑换后，也会获得积分。', pilotNotice:'建议测试规则 · 尚未开放积分交易', pointsBoardTitle:'积分兑换规则', pointsBoardTag:'PILOT / CONFIGURABLE', pointsPurchase:'购买返积分', pointsBlank:'空白磁带兑换', pointsDesign:'Gallery 设计使用权', pointsCreator:'创作者获得', pointsPending:'积分待结算', pointsLimit:'兑换不再返积分；积分不能提现，暂不承诺固定现金价值。具体参数在收款上线前复核并公布。', pointsExampleLabel:'试算：选择一盒磁带',
      downloadKicker:'DOWNLOAD', downloadTitle:'开始你的<br>音乐时光。', downloadDescription:'免费下载 Re:Play。拿起你的音乐，给它一段自己的时光。', viewWindowsBuild:'查看测试版本', comingSoon:'筹备中', mobile:'移动端', downloadNotice:'Windows 测试版本目前仅向授权用户开放；macOS 与移动端尚未提供下载。', footerLine:'让自己慢下来，重新认真听音乐。',
      subtotal:'计划售价小计', cartDisclaimer:'当前仅保存本机选购清单。正式金额、积分及磁带资产将在安全结算服务接入后由服务器确认。', checkoutPending:'结算服务建设中', emptyCart:'还没有选择磁带。', cartAdded:'已加入本机购物车', catalogUnavailable:'商品资料暂时无法读取', storageUnavailable:'浏览器未保存购物车，可继续浏览。'
    },
    en: {
      skip:'Skip to content', navExperience:'Experience', navShop:'Shop', navGallery:'Gallery', navPoints:'Points', cart:'Cart', downloadReplay:'Get Re:Play', languageLabel:'Website language', skinLabel:'Player appearance', sceneGroupLabel:'Scene background', homeLabel:'Re:Play home', mainNavLabel:'Main navigation', footerNavLabel:'Footer navigation', tapeCanvasLabel:'Metal C90 mounted inside the player with rotating reels', addToCart:'Add to cart', removeFromCart:'Remove from cart', chooseTape:'Choose a cassette', closeCart:'Close cart',
      heroKicker:'SLOW LISTENING, REIMAGINED', heroTitle:'Music did not<br>get faster.<br>We did.', heroTagline:'Ten songs. One tape. One evening.', heroDescription:'Choose the songs that matter. Make a tape of your own. Press PLAY, watch the reels turn, and give the music your full attention.', freeDownload:'↓&nbsp; Windows preview', seeExperience:'▷&nbsp; Explore Re:Play', platformNote:'Windows preview · Your music stays yours · Download access may be limited',
      showcaseLabel:'THE REAL RE:PLAY PLAYER', skinGold:'Gold', skinRetro:'Retro', demoPause:'Ⅱ Pause visual demo', demoPlay:'▷ Play visual demo', demoDisclaimer:'Visual motion demo · no audio or personal tapes', demoCoverAlt:'Original Blue Hour sample cassette cover', sceneLabel:'SCENE', sceneNight:'Night desk', sceneRain:'Rain', sceneWindow:'Window', sceneSea:'Sea', demoShelfKicker:'DEMO COLLECTION', demoShelfTitle:'A shelf waiting for your songs.', demoShelfNotice:'Fictional display tapes · no user works',
      benefitTape:'A real tape experience', benefitTapeDetail:'Cassette sound and texture.', benefitMusic:'Music that is yours', benefitMusicDetail:'Choose songs, keep memories.', benefitScene:'Immersive scenes', benefitSceneDetail:'Different places and moods.', benefitRadio:'Global radio', benefitRadioDetail:'Sounds from around the world.', benefitQuote:'“Some good things<br>need a little time.”',
      productKicker:'PRODUCT / RE:PLAY', productTitle:'Classic look.<br>Modern experience.', productDescription:'Re:Play is a digital player with the character of a cassette deck. Use your own music to choose songs, make tapes, turn them over and keep them.', exploreProduct:'Explore the product →',
      featuresKicker:'THE SOFTWARE / REAL INTERFACES', featuresTitle:'Two players.<br>One way to slow down.', featuresDescription:'Switch between Gold and Retro as listening scenes change automatically. Make your own tape in the full-size Creator board. Player images are real app captures; the board artwork is an original illustration.', featureGold:'Gold player', featureGoldDetail:'The warm hardware-style deck from the real app.', featureRetro:'Retro player', featureRetroDetail:'A second, fully functional listening surface.', featureCreator:'Full artwork board', featureCreatorDetail:'Design the case, spine, classic labels and lyric paper.', creatorSampleAlt:'Real Creator board capture with original Blue Hour sample artwork', creatorNote:'Prefer simple? Upload a cover and get a matching spine color. Open the full board whenever you want to create more.', creatorGalleryLink:'See Gallery →',
      storyKicker:'MORE THAN MUSIC', storyTitle:'Music is more<br>than sound.', storyDescription:'Give yourself a little time in a fast world. Open Re:Play and rediscover the warmth of music.', beginStory:'Start with one tape →',
      shopKicker:'CASSETTE STORE', shopTitle:'Collect the music<br>that stays with you.', shopDescription:'From classic C60 to Metal, every tape can hold a different part of your story.', previewShop:'Preview shop · Checkout closed', c60Description:'Classic 60 minutes, simple and pure.', c90Description:'More time, more stories.', metalDescription:'Richer sound; no stickers on Metal.', shopFineprint:'Prices and points are pilot examples. Your cart is stored only on this device. A future server will confirm payment, assets and points.',
      galleryKicker:'RE:PLAY GALLERY', galleryTitle:'One tape.<br>Your own expression.', galleryDescription:'The case and tape are shown together. Creators keep their original design rights; redeemers receive personal use of a selected version.', galleryNotice:'Concept works · Redemption closed', galleryOne:'Blue Hour', galleryTwo:'Late Night Letter', galleryThree:'After the Rain', sampleLabel:'Concept design · Not listed', redeemPending:'Points redemption in development', galleryFineprint:'Gallery grants design-use rights for your own blank tape. It does not transfer rights in photos, fonts or music. The Metal example changes only the case artwork, never adds a tape sticker.',
      pointsKicker:'RE:PLAY POINTS / PILOT', pointsTitle:'Buy a tape.<br>Make another work.', pointsDescription:'A tape purchase earns points. Use points for a Gallery design licence or another blank tape. Creators can earn points when a design is redeemed.', pilotNotice:'Proposed pilot · Transactions closed', pointsBoardTitle:'Points rules', pointsBoardTag:'PILOT / CONFIGURABLE', pointsPurchase:'Earn on purchase', pointsBlank:'Redeem a blank tape', pointsDesign:'Gallery design licence', pointsCreator:'Creator receives', pointsPending:'Pending period', pointsLimit:'Redemptions earn no new points. Points cannot be cashed out, and no fixed cash value is promised. Figures will be reviewed before paid launch.', pointsExampleLabel:'Example: choose a tape',
      downloadKicker:'DOWNLOAD', downloadTitle:'Start your<br>music time.', downloadDescription:'Download Re:Play and give your music a moment of its own.', viewWindowsBuild:'View test build', comingSoon:'Coming soon', mobile:'Mobile', downloadNotice:'Windows test builds currently require access. macOS and mobile downloads are not available yet.', footerLine:'Slow down and listen again.',
      subtotal:'Planned subtotal', cartDisclaimer:'Choices are stored only on this device. A future secure checkout will confirm the final price, points and tape assets.', checkoutPending:'Checkout in development', emptyCart:'Your cart is empty.', cartAdded:'Added to this device’s cart', catalogUnavailable:'Catalogue unavailable', storageUnavailable:'The cart could not be saved in this browser.'
    }
  };
  const state = {language:'en',catalog:null,items:{},toastTimer:null,returnFocus:null};
  const storage = {
    get(key){try{return localStorage.getItem(key)}catch{return null}},
    set(key,value){try{localStorage.setItem(key,value);return true}catch{return false}}
  };
  state.language = storage.get(LANG_KEY) === 'zh' ? 'zh' : 'en';
  const t = key => copy[state.language][key] || key;
  window.RePlaySiteText = t;
  const money = cents => new Intl.NumberFormat(state.language === 'zh' ? 'zh-CN' : 'en-US',{style:'currency',currency:'USD'}).format(cents / 100);
  const points = amount => new Intl.NumberFormat(state.language === 'zh' ? 'zh-CN' : 'en-US').format(amount);
  function translate(){
    document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
    const pageTitles = {
      home:['Slow Listening, Reimagined','让自己慢下来'],
      experience:['Experience','产品体验'],
      shop:['Shop','磁带商城'],
      gallery:['Gallery','创意画廊'],
      points:['Points','积分规则']
    };
    const titles = pageTitles[document.body.dataset.page] || pageTitles.home;
    document.title = `Re:Play · ${titles[state.language === 'zh' ? 1 : 0]}`;
    $$('[data-i18n]').forEach(node => {
      const value = t(node.dataset.i18n);
      if (value.includes('<br>') || value.includes('&nbsp;')) node.innerHTML = value;
      else node.textContent = value;
    });
    $$('[data-i18n-aria-label]').forEach(node => node.setAttribute('aria-label',t(node.dataset.i18nAriaLabel)));
    $$('[data-i18n-alt]').forEach(node => node.alt = t(node.dataset.i18nAlt));
    $$('[data-add]').forEach(node => node.setAttribute('aria-label',`${t('addToCart')}: ${node.closest('[data-product]').querySelector('h3').textContent}`));
    $('#langSelect').value = state.language;
    storage.set(LANG_KEY,state.language);
    renderCatalog();renderCart();
  }
  const product = id => state.catalog?.products.find(item => item.id === id);
  function cleanItems(input){
    const result = {};
    if (!input || typeof input !== 'object' || Array.isArray(input)) return result;
    for (const [id,quantity] of Object.entries(input)) if (product(id) && Number.isInteger(quantity) && quantity >= 1 && quantity <= 99) result[id] = quantity;
    return result;
  }
  function toast(message){
    const node = $('#toast');node.textContent = message;node.hidden = false;
    clearTimeout(state.toastTimer);state.toastTimer = setTimeout(() => {node.hidden = true},2200);
  }
  function saveCart(){if (!storage.set(CART_KEY,JSON.stringify({version:1,items:state.items}))) toast(t('storageUnavailable'))}
  function renderCart(){
    const rows = Object.entries(state.items).filter(([id,qty]) => product(id) && qty > 0);
    $('#cartCount').textContent = String(rows.reduce((sum,[,qty]) => sum + qty,0));
    $('#cartSubtotal').textContent = money(rows.reduce((sum,[id,qty]) => sum + product(id).cents * qty,0));
    const container = $('#cartItems');container.replaceChildren();
    if (!rows.length){const empty = document.createElement('p');empty.className = 'cart-empty';empty.textContent = t('emptyCart');container.append(empty);return}
    for (const [id,qty] of rows){
      const item = product(id),row = document.createElement('div');row.className = 'cart-row';
      const image = document.createElement('img');image.src = 'assets/cassettes/' + item.image;image.alt = '';
      const summary = document.createElement('div'),name = document.createElement('strong'),price = document.createElement('small');
      name.textContent = item.name;price.textContent = money(item.cents) + ' × ' + qty;summary.append(name,price);
      const controls = document.createElement('div');controls.className = 'quantity';
      for (const [label,delta] of [['−',-1],['+',1]]){
        const button = document.createElement('button');button.type='button';button.textContent=label;button.dataset.quantity=id;button.dataset.delta=String(delta);button.setAttribute('aria-label',(delta>0?t('addToCart'):t('removeFromCart'))+': '+item.name);controls.append(button);
        if (delta < 0){const value = document.createElement('span');value.textContent = String(qty);controls.append(value)}
      }
      row.append(image,summary,controls);container.append(row);
    }
  }
  function setQuantity(id,quantity){
    if (!product(id) || !Number.isInteger(quantity) || quantity < 0 || quantity > 99) return;
    if (quantity) state.items[id]=quantity;else delete state.items[id];
    saveCart();renderCart();
  }
  function setDrawer(open){
    $('#cartDrawer').hidden = !open;$('#cartBackdrop').hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open){state.returnFocus = document.activeElement;$('#cartClose').focus()}else state.returnFocus?.focus?.();
  }
  function renderCatalog(){
    if (!state.catalog) return;
    const policy = state.catalog.pointsPolicy;
    for (const item of state.catalog.products){
      $$('[data-price="'+item.id+'"]').forEach(node => node.textContent = money(item.cents));
      $$('[data-reward="'+item.id+'"]').forEach(node => node.textContent = state.language === 'zh' ? `建议购买奖励 +${points(policy.purchaseReward[item.id])} 积分` : `Proposed reward +${points(policy.purchaseReward[item.id])} points`);
    }
    $$('[data-gallery-price]').forEach(node => {
      const value = policy.sampleGalleryPrices[Number(node.dataset.galleryPrice)];
      node.textContent = state.language === 'zh' ? `${points(value)} 积分` : `${points(value)} pts`;
    });
    const ruleText = {
      earnRule:`C60 +${points(policy.purchaseReward['classic-c60'])} / C90 +${points(policy.purchaseReward['classic-c90'])} / Metal +${points(policy.purchaseReward['metal-c90'])}`,
      blankRule:`C60 ${points(policy.blankCassetteCost['classic-c60'])} / C90 ${points(policy.blankCassetteCost['classic-c90'])} / Metal ${points(policy.blankCassetteCost['metal-c90'])}`,
      designRule:state.language === 'zh' ? `${points(policy.designPriceRange.min)}–${points(policy.designPriceRange.max)} 积分` : `${points(policy.designPriceRange.min)}–${points(policy.designPriceRange.max)} pts`,
      creatorRule:`${policy.creatorSharePercent}%`,
      pendingRule:state.language === 'zh' ? `${policy.pendingDays} 天` : `${policy.pendingDays} days`
    };
    for (const [id,value] of Object.entries(ruleText)) if ($('#'+id)) $('#'+id).textContent = value;
    if ($('#pointsProduct')) {
      const chosen = $('#pointsProduct').value;
      $('#pointsExample').textContent = state.language === 'zh'
        ? `买 ${product(chosen).name} 建议返 ${points(policy.purchaseReward[chosen])} 积分；${points(policy.blankCassetteCost[chosen])} 积分可兑换同款空白磁带。`
        : `Buying ${product(chosen).name} would earn ${points(policy.purchaseReward[chosen])} points; ${points(policy.blankCassetteCost[chosen])} points could redeem a matching blank.`;
    }
  }
  async function loadCatalog(){
    const response = await fetch('catalog.json',{cache:'no-store'});
    if (!response.ok) throw Error('CATALOG_UNAVAILABLE');
    const data = await response.json();
    const ids = ['classic-c60','classic-c90','metal-c90'];
    if (data.schemaVersion !== 1 || data.mode !== 'preview' || data.checkoutEnabled !== false || data.currency !== 'USD' || !Array.isArray(data.products) || data.products.length !== 3) throw Error('CATALOG_INVALID');
    if (data.products.some((item,index) => item.id !== ids[index] || !Number.isSafeInteger(item.cents) || item.cents <= 0 || !/^[a-z0-9-]+\.png$/.test(item.image))) throw Error('CATALOG_INVALID');
    const policy = data.pointsPolicy;
    if (!policy || policy.status !== 'proposal' || policy.enabled !== false || policy.redemptionEnabled !== false || !Number.isInteger(policy.creatorSharePercent) || policy.creatorSharePercent < 0 || policy.creatorSharePercent > 100 || !Number.isInteger(policy.pendingDays) || policy.pendingDays < 0 || !Array.isArray(policy.sampleGalleryPrices) || policy.sampleGalleryPrices.length !== 3 || !policy.designPriceRange) throw Error('POINTS_POLICY_INVALID');
    if (ids.some(id => !Number.isSafeInteger(policy.purchaseReward[id]) || policy.purchaseReward[id] <= 0 || !Number.isSafeInteger(policy.blankCassetteCost[id]) || policy.blankCassetteCost[id] <= policy.purchaseReward[id]) || !Number.isSafeInteger(policy.designPriceRange.min) || !Number.isSafeInteger(policy.designPriceRange.max) || policy.designPriceRange.min <= 0 || policy.designPriceRange.max < policy.designPriceRange.min || policy.sampleGalleryPrices.some(value => !Number.isSafeInteger(value) || value < policy.designPriceRange.min || value > policy.designPriceRange.max)) throw Error('POINTS_POLICY_INVALID');
    state.catalog = data;
    const saved = storage.get(CART_KEY);
    if (saved){try{const parsed=JSON.parse(saved);if(parsed.version === 1)state.items=cleanItems(parsed.items)}catch{state.items={}}}
    renderCatalog();renderCart();
  }
  $('#langSelect').addEventListener('change',event => {state.language = event.target.value === 'zh' ? 'zh' : 'en';translate()});
  $('#cartButton').addEventListener('click',() => setDrawer(true));
  $('#cartClose').addEventListener('click',() => setDrawer(false));
  $('#cartBackdrop').addEventListener('click',() => setDrawer(false));
  document.addEventListener('keydown',event => {if (event.key === 'Escape' && !$('#cartDrawer').hidden) setDrawer(false)});
  $('#products')?.addEventListener('click',event => {
    const button = event.target.closest('[data-add]');if (!button) return;
    const id = button.dataset.add;if (!state.catalog){toast(t('catalogUnavailable'));return}
    setQuantity(id,Math.min(99,(state.items[id] || 0)+1));toast(t('cartAdded'));
  });
  $('#cartItems').addEventListener('click',event => {
    const button = event.target.closest('[data-quantity]');if (!button) return;
    const id = button.dataset.quantity;setQuantity(id,(state.items[id] || 0)+Number(button.dataset.delta));
  });
  $('#pointsProduct')?.addEventListener('change',renderCatalog);
  translate();
  loadCatalog().catch(() => {
    $$('[data-add]').forEach(button => {button.disabled=true;button.title=t('catalogUnavailable')});
    toast(t('catalogUnavailable'));
  });
})();
