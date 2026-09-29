/* Public Beta site preview. Account balances and redemptions require the shared service. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const LANG_KEY = 'replay-site-language-v3';
  const copy = {
    zh: {
      skip:'跳到内容', navExperience:'体验', navShop:'商城', navGallery:'Gallery', navPoints:'奖励规则', navAccount:'登录 / 注册', cart:'全球公测', downloadReplay:'直接下载 Windows 版', languageLabel:'网站语言', skinLabel:'播放器外观', sceneGroupLabel:'场景背景', homeLabel:'Re:Play 首页', mainNavLabel:'网站导航', footerNavLabel:'页脚导航', tapeCanvasLabel:'装在播放器磁带舱内并转动卷轴的 Metal C90', chooseTape:'选择磁带', blankTitle:'空白磁带', blankDetail:'兑换后可开启一个新的磁带创作项目。', betaWelcomeLabel:'首次注册奖励', betaWelcomeSub:'注册后由服务端一次性发放；初始空白磁带为 0。', betaAction:'公测积分兑换',
      heroKicker:'重新想象慢下来听歌', heroTitle:'歌没有变快，<br>只是我们变得太快了。', heroTagline:'十首歌。一盒磁带。一个属于自己的晚上。', heroDescription:'挑选真正喜欢的歌，做一盒自己的磁带。按下 PLAY，看卷轴转起来，认真听完。', freeDownload:'↓&nbsp; 下载 Windows v0.7.4', seeExperience:'▷&nbsp; 了解 Re:Play', platformNote:'Windows v0.7.4 · 使用自己的音乐', betaHome:'全球公测：首次注册奖励 2,000 RP →',
      showcaseLabel:'真实的 RE:PLAY 播放器', skinGold:'黄金版', skinRetro:'复古版', demoPause:'Ⅱ 暂停画面演示', demoPlay:'▷ 播放画面演示', demoDisclaimer:'动态画面演示 · 无声音与个人磁带', demoCoverAlt:'原创「蓝色时刻」示范磁带封面', sceneLabel:'场景', sceneNight:'夜间书桌', sceneRain:'雨天', sceneWindow:'窗前', sceneSea:'海边', demoShelfKicker:'示范磁带架', demoShelfTitle:'等你的音乐住进来。', demoShelfNotice:'虚构展示磁带 · 不含用户作品',
      benefitTape:'真实的磁带体验', benefitTapeDetail:'复刻磁带的声音与质感。', benefitMusic:'属于你的音乐', benefitMusicDetail:'精选歌曲，记录心情。', benefitScene:'沉浸式场景', benefitSceneDetail:'不同的环境，不同的心情。', benefitRadio:'全球电台', benefitRadioDetail:'发现世界各地的好声音。', benefitQuote:'“有时候，美好的东西，<br>本来就不需要那么快。”',
      productKicker:'PRODUCT / RE:PLAY', productTitle:'经典外观。现代体验。', productDescription:'Re:Play 是一款有真实磁带气质的数字播放器。用自己的音乐，体验亲手挑歌、录带、翻面与收藏的乐趣。', exploreProduct:'了解产品 →',
      featuresKicker:'真实软件界面', featuresTitle:'两种播放器，同一种慢下来。', featuresDescription:'切换黄金版与复古版，感受自动轮换的听歌场景，再用完整创意画板制作磁带。播放器预览由真实软件截图与原创磁带图案合成。', featureGold:'黄金版播放器', featureGoldDetail:'经典 C60 · 60 分钟，装在磁带机内。', featureRetro:'复古版播放器', featureRetroDetail:'金属 C90 · 90 分钟，无纸质贴纸。', featureCreator:'完整创意画板', featureCreatorDetail:'按尺寸设计盒面、盒脊、普通带贴纸和歌词纸。', creatorSampleAlt:'真实创意画板截图上展示原创「蓝色时刻」示范图案', creatorNote:'不想设计也没关系：上传封面即可自动配套盒脊颜色。想认真创作时，再打开完整画板。', creatorGalleryLink:'看看 Gallery →',
      storyKicker:'MORE THAN MUSIC', storyTitle:'音乐不只是声音，更是一段时光。', storyDescription:'在这个快进的世界里，给自己一点时间。打开 Re:Play，重新发现音乐的温度。', beginStory:'从一盒磁带开始 →',
      shopKicker:'CASSETTE STORE / GLOBAL BETA', shopTitle:'收藏属于你的磁带时光。', shopDescription:'三款磁带保留正式售价；公测期用 RP 兑换，首次注册奖励 2,000 RP。', previewShop:'正式售价展示 · 公测积分兑换', c60Description:'经典 60 分钟，简单纯粹。', c90Description:'更长的陪伴，更多的故事。', metalDescription:'更丰富的音色；金属带不贴纸。', shopFineprint:'未来开放现金购买时，三款磁带分别奖励 200 / 400 / 600 RP；公测阶段仅支持 RP 兑换，现金购买和购买奖励均未开放。美元标价与 RP 不构成固定换算比例。',
      galleryKicker:'RE:PLAY GALLERY', galleryTitle:'封面，自由表达。', galleryDescription:'封面与磁带分开；平台固定 400 RP 兑换，应用到自己已有的磁带。', galleryNotice:'原创示范作品 · 尚未上架', galleryOne:'蓝色时刻', galleryTwo:'深夜来信', galleryThree:'雨后的歌', sampleLabel:'封面示例 · 未上架', redeemPending:'示范作品不可兑换', galleryFineprint:'上传或发布封面不奖励积分。发生有效兑换后，兑换者扣除 400 RP，系统另向创作者奖励 400 RP；两笔独立记账，不是用户间转账。展示中的磁带只是应用效果示意，兑换不包含磁带或音乐。',
      pointsKicker:'RE:PLAY REWARDS / GLOBAL BETA', pointsTitle:'积分，用于继续创作。', pointsDescription:'公测首次注册奖励 2,000 RP；正式购买磁带可获积分。创意作品统一 400 RP 兑换，上传本身没有奖励。', pilotNotice:'全球统一公测规则 · 账号兑换已开放', pointsBoardTitle:'全球公测规则', pointsBoardTag:'BETA V1 / GLOBAL', pointsPurchase:'首次注册奖励', pointsBlank:'Classic C60 兑换', pointsDesign:'作品使用权兑换', pointsCreator:'作品有效兑换后系统奖励创作者', pointsPending:'正式购买返积分（公测暂停）', pointsLimit:'RP 仅用于平台兑换，不能充值、提现、交易或转账。作品兑换扣分与创作者奖励分开记账；上传和发布不奖励积分。', pointsExampleLabel:'查看官方磁带兑换档位',
      downloadKicker:'DOWNLOAD', downloadTitle:'开始你的音乐时光。', downloadDescription:'免费下载 Re:Play。拿起你的音乐，给它一段自己的时光。', viewWindowsBuild:'下载 Windows 版', comingSoon:'筹备中', mobile:'移动端', downloadNotice:'Windows 正式版现已提供下载；macOS 与移动端尚未提供下载。', footerLine:'让自己慢下来，重新认真听音乐。',
      subtotal:'计划售价小计', cartDisclaimer:'当前仅保存本机选购清单。正式金额、积分及磁带资产将在安全结算服务接入后由服务器确认。', checkoutPending:'结算服务建设中', emptyCart:'还没有选择磁带。', cartAdded:'已加入本机购物车', catalogUnavailable:'商品资料暂时无法读取', storageUnavailable:'浏览器未保存购物车，可继续浏览。'
    },
    en: {
      skip:'Skip to content', navExperience:'Experience', navShop:'Shop', navGallery:'Gallery', navPoints:'Rewards', navAccount:'Sign in / Sign up', cart:'Global Beta', downloadReplay:'Download for Windows', languageLabel:'Website language', skinLabel:'Player appearance', sceneGroupLabel:'Scene background', homeLabel:'Re:Play home', mainNavLabel:'Main navigation', footerNavLabel:'Footer navigation', tapeCanvasLabel:'Metal C90 mounted inside the player with rotating reels', chooseTape:'Choose a cassette', blankTitle:'Blank Cassette', blankDetail:'Redeem one to begin a new cassette creation project.', betaWelcomeLabel:'New account welcome reward', betaWelcomeSub:'Issued once by the server after registration. Starting blank cassette balance is zero.', betaAction:'Beta RP redemption',
      heroKicker:'SLOW LISTENING, REIMAGINED', heroTitle:'Music did not<br>get faster.<br>We did.', heroTagline:'Ten songs. One tape. One evening.', heroDescription:'Choose the songs that matter. Make a tape of your own. Press PLAY, watch the reels turn, and give the music your full attention.', freeDownload:'↓&nbsp; Download Windows v0.7.4', seeExperience:'▷&nbsp; Explore Re:Play', platformNote:'Windows v0.7.4 · Your music stays yours', betaHome:'Global beta: 2,000 RP welcome reward →',
      showcaseLabel:'THE REAL RE:PLAY PLAYER', skinGold:'Gold', skinRetro:'Retro', demoPause:'Ⅱ Pause visual demo', demoPlay:'▷ Play visual demo', demoDisclaimer:'Visual motion demo · no audio or personal tapes', demoCoverAlt:'Original Blue Hour sample cassette cover', sceneLabel:'SCENE', sceneNight:'Night desk', sceneRain:'Rain', sceneWindow:'Window', sceneSea:'Sea', demoShelfKicker:'DEMO COLLECTION', demoShelfTitle:'A shelf waiting for your songs.', demoShelfNotice:'Fictional display tapes · no user works',
      benefitTape:'A real tape experience', benefitTapeDetail:'Cassette sound and texture.', benefitMusic:'Music that is yours', benefitMusicDetail:'Choose songs, keep memories.', benefitScene:'Immersive scenes', benefitSceneDetail:'Different places and moods.', benefitRadio:'Global radio', benefitRadioDetail:'Sounds from around the world.', benefitQuote:'“Some good things<br>need a little time.”',
      productKicker:'PRODUCT / RE:PLAY', productTitle:'Classic look. Modern experience.', productDescription:'Re:Play is a digital player with the character of a cassette deck. Use your own music to choose songs, make tapes, turn them over and keep them.', exploreProduct:'Explore the product →',
      featuresKicker:'THE SOFTWARE / REAL INTERFACES', featuresTitle:'Two players. One way to slow down.', featuresDescription:'Switch between Gold and Retro as listening scenes change automatically. Make your own tape in the full-size Creator board. Player previews combine real app captures with original cassette artwork.', featureGold:'Gold player', featureGoldDetail:'Classic C60 · 60 minutes, inside the deck.', featureRetro:'Retro player', featureRetroDetail:'Metal C90 · 90 minutes, no paper label.', featureCreator:'Full artwork board', featureCreatorDetail:'Design the case, spine, classic labels and lyric paper.', creatorSampleAlt:'Real Creator board capture with original Blue Hour sample artwork', creatorNote:'Prefer simple? Upload a cover and get a matching spine color. Open the full board whenever you want to create more.', creatorGalleryLink:'See Gallery →',
      storyKicker:'MORE THAN MUSIC', storyTitle:'Music is more than sound.', storyDescription:'Give yourself a little time in a fast world. Open Re:Play and rediscover the warmth of music.', beginStory:'Start with one tape →',
      shopKicker:'CASSETTE STORE / GLOBAL BETA', shopTitle:'Collect your cassette moments.', shopDescription:'Three cassettes keep their USD list prices. Beta redemption uses RP; new accounts receive 2,000 RP.', previewShop:'List prices shown · beta RP redemption', c60Description:'Classic 60 minutes, simple and pure.', c90Description:'More time, more stories.', metalDescription:'Richer sound; no stickers on Metal.', shopFineprint:'When cash purchases open in the future, these tapes will reward 200 / 400 / 600 RP respectively. Beta supports RP redemption only; cash purchases and purchase rewards are not available. USD prices have no fixed RP exchange rate.',
      galleryKicker:'RE:PLAY GALLERY', galleryTitle:'Covers, made personal.', galleryDescription:'Cover designs stand apart from tapes. Each uses a fixed 400 RP redemption price and can dress your own tape.', galleryNotice:'Original concept works · not listed', galleryOne:'Blue Hour', galleryTwo:'Late Night Letter', galleryThree:'After the Rain', sampleLabel:'Cover concept · Not listed', redeemPending:'Concept works cannot be redeemed', galleryFineprint:'Uploading or publishing a cover earns no RP. On a valid redemption, 400 RP is burned from the redeemer and the system separately rewards the creator 400 RP. These are separate ledger entries, not a user transfer. Tape images only preview application; no tape or music is included.',
      pointsKicker:'RE:PLAY REWARDS / GLOBAL BETA', pointsTitle:'RP for the next creation.', pointsDescription:'Beta registration grants 2,000 RP once. Formal tape purchases can earn RP. Creator designs cost a fixed 400 RP to redeem; uploading earns none.', pilotNotice:'One global beta policy · account redemption is open', pointsBoardTitle:'Global beta rules', pointsBoardTag:'BETA V1 / GLOBAL', pointsPurchase:'Welcome reward', pointsBlank:'Classic C60 redemption', pointsDesign:'Design use redemption', pointsCreator:'System reward after valid design redemption', pointsPending:'Purchase rewards (paused in beta)', pointsLimit:'RP is only for platform redemptions. It cannot be purchased, withdrawn, traded or transferred. Design redemption and creator reward use separate ledger entries; uploading or publishing grants no RP.', pointsExampleLabel:'Official cassette redemption tiers',
      downloadKicker:'DOWNLOAD', downloadTitle:'Start your music time.', downloadDescription:'Download Re:Play and give your music a moment of its own.', viewWindowsBuild:'Download for Windows', comingSoon:'Coming soon', mobile:'Mobile', downloadNotice:'The Windows release is available now. macOS and mobile downloads are not available yet.', footerLine:'Slow down and listen again.',
      subtotal:'Planned subtotal', cartDisclaimer:'Choices are stored only on this device. A future secure checkout will confirm the final price, points and tape assets.', checkoutPending:'Checkout in development', emptyCart:'Your cart is empty.', cartAdded:'Added to this device’s cart', catalogUnavailable:'Catalogue unavailable', storageUnavailable:'The cart could not be saved in this browser.'
    }
  };
  const ACCOUNT_URL = 'https://167.179.117.244:8443/account.html';
  const state = {language:'en',catalog:null,accountOnline:false};
  const storage = {
    get(key){try{return localStorage.getItem(key)}catch{return null}},
    set(key,value){try{localStorage.setItem(key,value)}catch{}}
  };
  state.language = storage.get(LANG_KEY) === 'zh' ? 'zh' : 'en';
  const t = key => copy[state.language][key] || key;
  const points = amount => new Intl.NumberFormat(state.language === 'zh' ? 'zh-CN' : 'en-US').format(amount);
  window.RePlaySiteText = t;
  function translate(){
    document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
    const titles = {
      home:['Slow Listening, Reimagined','让自己慢下来'],
      experience:['Experience','产品体验'],
      shop:['Shop','商城'],
      gallery:['Gallery','创意画廊'],
      points:['Rewards','奖励规则']
    };
    const title = titles[document.body.dataset.page] || titles.home;
    document.title = `Re:Play · ${title[state.language === 'zh' ? 1 : 0]}`;
    $$('[data-i18n]').forEach(node => {
      const value = t(node.dataset.i18n);
      if (value.includes('<br>') || value.includes('&nbsp;')) node.innerHTML = value;
      else node.textContent = value;
    });
    $$('[data-i18n-aria-label]').forEach(node => node.setAttribute('aria-label',t(node.dataset.i18nAriaLabel)));
    $$('[data-i18n-alt]').forEach(node => node.alt = t(node.dataset.i18nAlt));
    $('#langSelect').value = state.language;
    storage.set(LANG_KEY,state.language);
    renderCatalog();
    if (state.accountOnline) applyAccountMode();
  }
  function applyAccountMode(){
    const accountLink = $('[data-account-entry]');
    if (accountLink) accountLink.href = ACCOUNT_URL;
    $$('.product-card').forEach(card => {
      let link = card.querySelector('[data-account-redeem]');
      if (!link) {
        link = document.createElement('a');
        link.href = ACCOUNT_URL; link.className = 'account-redeem';
        link.dataset.accountRedeem = 'true'; card.append(link);
      }
      link.textContent = state.language === 'zh' ? '进入账号兑换 →' : 'Open account to redeem →';
      const pending = card.querySelector('[data-i18n="betaAction"]');
      if (pending) pending.hidden = true;
    });
    $$('[data-i18n="pilotNotice"]').forEach(node => node.textContent = state.language === 'zh' ? '全球统一公测规则 · 账号兑换已开放' : 'One global beta policy · account redemption is open');
    $$('[data-i18n="betaWelcomeSub"]').forEach(node => node.textContent = t('betaWelcomeSub'));
  }
  function renderCatalog(){
    const catalog = state.catalog;
    if (!catalog) return;
    $$('[data-welcome-reward]').forEach(node => node.textContent = `${points(catalog.welcomeRewardRp)} RP`);
    for (const item of catalog.products){
      const cash = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(item.cashPriceCents / 100);
      $$(`[data-cash-price="${item.id}"]`).forEach(node => node.textContent = cash);
      $$(`[data-price="${item.id}"]`).forEach(node => node.textContent = state.language === 'zh' ? `（公测可用 ${points(item.rewardPriceRp)} RP 兑换）` : `(Beta: redeem for ${points(item.rewardPriceRp)} RP)`);
      $$(`[data-reward="${item.id}"]`).forEach(node => node.textContent = state.language === 'zh' ? '全球公测兑换档位' : 'Global beta redemption tier');
    }
    $$('[data-blank-price]').forEach(node => node.textContent = `${points(catalog.blankCassetteCostRp)} RP`);
    $$('[data-gallery-price]').forEach(node => node.textContent = `${points(catalog.coverRedemptionCostRp)} RP`);
    const ruleText = {
      earnRule:`${points(catalog.welcomeRewardRp)} RP`,
      blankRule:`${points(catalog.blankCassetteCostRp)} RP`,
      designRule:`${points(catalog.coverRedemptionCostRp)} RP`,
      creatorRule:`+${points(catalog.creatorRewardOnCoverRedemptionRp)} RP`,
      pendingRule:`+${catalog.products.map(item => points(item.purchaseRewardRp)).join(' / ')} RP`
    };
    for (const [id,value] of Object.entries(ruleText)) if ($('#'+id)) $('#'+id).textContent = value;
    if ($('#pointsProduct')) {
      const selected = catalog.products.find(item => item.id === $('#pointsProduct').value);
      if (selected) $('#pointsExample').textContent = state.language === 'zh'
        ? `${selected.name}：${points(selected.rewardPriceRp)} RP。公测无现金购买，请登录账号兑换。`
        : `${selected.name}: ${points(selected.rewardPriceRp)} RP. Cash purchases are closed in beta; sign in to redeem.`;
    }
  }
  async function loadCatalog(){
    let response;
    try {
      response = await fetch('/api/policy',{cache:'no-store'});
      if (!response.ok) throw Error('API_UNAVAILABLE');
      state.accountOnline = true;
    } catch {
      response = await fetch('catalog.json',{cache:'no-store'});
    }
    if (!response.ok) throw Error('CATALOG_UNAVAILABLE');
    const data = await response.json();
    const ids = ['classic-c60','classic-c90','metal-c90'];
    const validInteger = n => Number.isSafeInteger(n) && n > 0;
    if (data.schemaVersion !== 2 || data.mode !== 'global-beta' || !data.features ||
        data.features.cashPurchaseEnabled !== false || data.features.purchaseRewardEnabled !== false ||
        data.features.rewardsEnabled !== true || typeof data.features.liveAccountServiceEnabled !== 'boolean' ||
        !validInteger(data.welcomeRewardRp) || !validInteger(data.blankCassetteCostRp) ||
        !validInteger(data.coverRedemptionCostRp) || !validInteger(data.creatorRewardOnCoverRedemptionRp) ||
        !Array.isArray(data.products) || data.products.length !== ids.length ||
        data.products.some((item,index) => item.id !== ids[index] || !validInteger(item.rewardPriceRp) || !validInteger(item.cashPriceCents) || !validInteger(item.purchaseRewardRp) || !/^[a-z0-9-]+\.png$/.test(item.image)) ||
        !Array.isArray(data.gallerySamplePricesRp) || data.gallerySamplePricesRp.length !== 3 || data.gallerySamplePricesRp.some(value => value !== data.coverRedemptionCostRp)) throw Error('CATALOG_INVALID');
    state.catalog = data;
    state.accountOnline = data.features.liveAccountServiceEnabled;
    renderCatalog();
    if (state.accountOnline) applyAccountMode();
  }
  $('#langSelect')?.addEventListener('change',event => {state.language = event.target.value === 'zh' ? 'zh' : 'en';translate()});
  $('#pointsProduct')?.addEventListener('change',renderCatalog);
  translate();
  loadCatalog().catch(() => {
    const message = t('catalogUnavailable');
    $$('[data-price],[data-cash-price],[data-welcome-reward],[data-gallery-price]').forEach(node => node.textContent = '—');
    const notice = $('.section-fineprint');
    if (notice) notice.textContent = message;
  });
})();
