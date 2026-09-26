/* Public Beta site preview. Account balances and redemptions require the shared service. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const LANG_KEY = 'replay-site-language-v3';
  const copy = {
    zh: {
      skip:'跳到内容', navExperience:'体验', navShop:'兑换商店', navGallery:'Gallery', navPoints:'奖励规则', navCreator:'Creator', navAccount:'Beta 账户', navActivities:'活动', navSupport:'客服', navPolicies:'政策', cart:'全球公测', downloadReplay:'下载 Re:Play', languageLabel:'网站语言', skinLabel:'播放器外观', sceneGroupLabel:'场景背景', homeLabel:'Re:Play 首页', mainNavLabel:'网站导航', footerNavLabel:'页脚导航', tapeCanvasLabel:'装在播放器磁带舱内并转动卷轴的 Metal C90', chooseTape:'选择磁带', betaWelcomeLabel:'新账号欢迎奖励', betaWelcomeSub:'首次登录后由服务端一次性发放；初始空白磁带为 0。', betaAction:'账号服务接入后开放兑换',
      heroKicker:'重新想象慢下来听歌', heroTitle:'歌没有变快，<br>只是我们变得太快了。', heroTagline:'十首歌。一盒磁带。一个属于自己的晚上。', heroDescription:'挑选真正喜欢的歌，做一盒自己的磁带。按下 PLAY，看卷轴转起来，认真听完。', freeDownload:'↓&nbsp; Windows 预览版', seeExperience:'▷&nbsp; 了解 Re:Play', platformNote:'Windows 预览版 · 使用自己的音乐 · 下载权限可能受限', betaHome:'全球公测：首次注册奖励 2,000 RP →',
      showcaseLabel:'真实的 RE:PLAY 播放器', skinGold:'黄金版', skinRetro:'复古版', demoPause:'Ⅱ 暂停画面演示', demoPlay:'▷ 播放画面演示', demoDisclaimer:'动态画面演示 · 无声音与个人磁带', demoCoverAlt:'原创「蓝色时刻」示范磁带封面', sceneLabel:'场景', sceneNight:'夜间书桌', sceneRain:'雨天', sceneWindow:'窗前', sceneSea:'海边', demoShelfKicker:'示范磁带架', demoShelfTitle:'等你的音乐住进来。', demoShelfNotice:'虚构展示磁带 · 不含用户作品',
      benefitTape:'真实的磁带体验', benefitTapeDetail:'复刻磁带的声音与质感。', benefitMusic:'属于你的音乐', benefitMusicDetail:'精选歌曲，记录心情。', benefitScene:'沉浸式场景', benefitSceneDetail:'不同的环境，不同的心情。', benefitRadio:'全球电台', benefitRadioDetail:'发现世界各地的好声音。', benefitQuote:'“有时候，美好的东西，<br>本来就不需要那么快。”',
      productKicker:'PRODUCT / RE:PLAY', productTitle:'经典外观。现代体验。', productDescription:'Re:Play 是一款有真实磁带气质的数字播放器。用自己的音乐，体验亲手挑歌、录带、翻面与收藏的乐趣。', exploreProduct:'了解产品 →',
      featuresKicker:'真实软件界面', featuresTitle:'两种播放器，同一种慢下来。', featuresDescription:'切换黄金版与复古版，感受自动轮换的听歌场景，再用完整创意画板制作磁带。播放器预览由真实软件截图与原创磁带图案合成。', featureGold:'黄金版播放器', featureGoldDetail:'软件里的暖色实体感机身。', featureRetro:'复古版播放器', featureRetroDetail:'另一套完整可用的听歌界面。', featureCreator:'完整创意画板', featureCreatorDetail:'按尺寸设计盒面、盒脊、普通带贴纸和歌词纸。', creatorSampleAlt:'真实创意画板截图上展示原创「蓝色时刻」示范图案', creatorNote:'不想设计也没关系：上传封面即可自动配套盒脊颜色。想认真创作时，再打开完整画板。', creatorGalleryLink:'看看 Gallery →',
      storyKicker:'MORE THAN MUSIC', storyTitle:'音乐不只是声音，更是一段时光。', storyDescription:'在这个快进的世界里，给自己一点时间。打开 Re:Play，重新发现音乐的温度。', beginStory:'从一盒磁带开始 →',
      shopKicker:'GLOBAL BETA / REWARDS STORE', shopTitle:'从一盒磁带，开始你的创作。', shopDescription:'全球公测统一用 RP 兑换数字磁带。首次注册奖励 2,000 RP，由你决定如何使用。', previewShop:'全球公测 · 现金购买关闭', c60Description:'经典 60 分钟，简单纯粹。', c90Description:'更长的陪伴，更多的故事。', metalDescription:'更丰富的音色；金属带不贴纸。', shopFineprint:'公测仅展示兑换规则。账号服务接入前不扣积分、不发放磁带；正式美元售价仅保存在商业配置中。',
      galleryKicker:'RE:PLAY GALLERY', galleryTitle:'一盒磁带，一种自己的表达。', galleryDescription:'磁带盒与磁带一起展示。创作者保留原创设计权益；兑换者获得所选版本的个人使用许可。', galleryNotice:'原创示范作品 · 账号接入后开放兑换', galleryOne:'蓝色时刻', galleryTwo:'深夜来信', galleryThree:'雨后的歌', sampleLabel:'示意设计 · 未上架', redeemPending:'账号接入后开放 RP 兑换', galleryFineprint:'Gallery 兑换的是设计使用权，可绑定到自己持有的空白磁带；不包含图片、字体或音乐之外的版权转让。Creator 作品按资产类型采用系统固定 RP，不由作者自行定价。', galleryFixedPolicy:'固定分类兑换价 · ♡ 喜欢度不改变 RP 价格',
      pointsKicker:'RE:PLAY REWARDS / GLOBAL BETA', pointsTitle:'创作、收藏、再创作。', pointsDescription:'全球公测首次注册送 2,000 RP。用 RP 兑换空白磁带、官方磁带与 Gallery 设计；创作者的作品被有效兑换后获得系统奖励。', pilotNotice:'全球统一公测规则 · 账号服务接入中', pointsBoardTitle:'全球公测规则', pointsBoardTag:'BETA V1 / GLOBAL', pointsPurchase:'首次注册奖励', pointsBlank:'空白磁带', pointsDesign:'Creator 作品档位', pointsCreator:'有效兑换后创作者奖励', pointsPending:'首次完成磁带', pointsLimit:'RP 不可充值、提现或转账；公测关闭现金购买。积分与权益最终以服务端账本为准。', pointsExampleLabel:'查看官方磁带兑换档位', pointsFixed:'Creator 固定兑换档位', pointsLikes:'♡ 喜欢度', pointsFixedValue:'100 / 200 / 300 / 400 RP · 作者不可自行定价', pointsLikesValue:'0 RP · 仅用于社区反馈与未来等级信号',
      downloadKicker:'DOWNLOAD', downloadTitle:'开始你的音乐时光。', downloadDescription:'免费下载 Re:Play。拿起你的音乐，给它一段自己的时光。', viewWindowsBuild:'查看测试版本', comingSoon:'筹备中', mobile:'移动端', downloadNotice:'Windows 测试版本目前仅向授权用户开放；macOS 与移动端尚未提供下载。', accountKicker:'RE:PLAY ACCOUNT / GLOBAL BETA', accountTitle:'一个账号，连接网站与桌面软件。', accountDescription:'Beta 账户服务接入后，这里将统一显示 RP、空白磁带、数字资产、Creator 作品与奖励流水。', accountPending:'账户服务接入中 · 当前页面展示目标结构', accountWelcome:'首次注册奖励', accountBlank:'Blank Cassette', accountAssets:'My Assets', accountHistory:'Reward History', accountSync:'Website ↔ Desktop 同步', accountNoFake:'当前不显示模拟余额；真实余额与资产将以服务端 Reward Ledger 和 Entitlement 为准。', creatorKicker:'RE:PLAY CREATOR / GLOBAL BETA', creatorTitle:'创作可以不同，兑换规则保持简单。', creatorDescription:'Creator 不能自行给作品定价。Re:Play 按资产类型提供固定 RP 兑换档位；上传或发布作品本身不产生 RP，只有他人有效兑换后系统才独立奖励作者。', creatorPricing:'固定 Creator 兑换档位', creatorLikes:'♡ Like / Heart', creatorLikesDetail:'喜欢度只用于社区反馈、热门排序与未来 Creator Level 信号；当前不产生 RP，也不改变作品价格。', creatorLevel:'Creator Level（未来）', creatorLevelDetail:'Beta V1.1 暂不启用等级奖励。未来可以提高平台 Creator Bonus，但不需要提高用户兑换价格。', creatorOpenApp:'Creator 编辑在 Re:Play 桌面软件中完成。', experienceAccountKicker:'ONE ACCOUNT / ONE LIBRARY', experienceAccountTitle:'网站负责发现与兑换，桌面软件负责播放与创作。', experienceAccountBody:'RP、Blank Cassette、Creator 设计和数字资产由同一个 Re:Play Backend 管理。', experienceFlowReward:'加入 Beta · +2,000 RP', experienceFlowRedeem:'兑换 · Blank Cassette 400 RP', experienceFlowCreate:'创作 · Creator / Gallery', experienceFlowSync:'同步 · Website ↔ Desktop', supportKicker:'RE:PLAY SUPPORT / 全球公测', supportTitle:'客服应该同时看懂账号、积分和数字资产。', supportDescription:'工单服务接入后，客服可以在同一工单里看到相关 RP 流水、磁带资产、客户端版本和 Creator 审核上下文。', supportPending:'客服工单后台尚未接入。', supportCategory:'问题分类', supportSubject:'主题', supportMessage:'详细说明', supportSubmit:'提交工单', supportDisabled:'接入登录账号与工单服务后开放提交。', redeemAction:'兑换', redeemWorking:'兑换中…', redeemSuccess:'兑换成功', redeemSignIn:'请先登录', redeemFailed:'兑换失败', redeemBalance:'剩余 RP', activitiesKicker:'GLOBAL BETA / 活动', activitiesTitle:'用活动奖励推动测试，而不是制造交易体系。', activitiesDescription:'基础 Beta 奖励由固定政策控制；特殊活动以后由后台设置时间、用户范围、奖励档位和单账号次数限制。', activityWelcome:'首次注册奖励', activityWelcomeDetail:'符合条件的 Beta 账号首次注册后一次性获得。', activityFirstTape:'首次完成磁带', activityFirstTapeDetail:'一次性里程碑奖励。', activityFirstCreator:'Creator 有效兑换', activityFirstCreatorDetail:'上传或发布作品本身不奖励 RP；只有他人完成有效兑换后，系统才按固定兑换积分独立奖励作者。', activityContribution:'Beta 测试贡献', activityContributionDetail:'对有效测试反馈进行可审计的人工奖励。', activityNoCampaign:'当前没有额外限时活动。', activityNoCampaignDetail:'未来可以在 Admin 设置用户范围、奖励档位、起止时间和单账号次数限制。', policiesKicker:'RE:PLAY 政策中心', policiesTitle:'把 Beta 奖励、Creator 和账号数据规则放在一个地方。', policiesDescription:'以下是当前产品规则。正式账户上线前，Terms 与 Privacy 的法律文本仍需最终审核。', policyRewards:'Rewards Policy', policyCreator:'Creator Policy', policyContent:'内容与版权', policyPrivacy:'隐私与账号数据', policyDisclaimer:'当前为产品规则预览，不代表最终法律版 Terms of Service 或 Privacy Policy。', footerLine:'让自己慢下来，重新认真听音乐。', catalogUnavailable:'商品资料暂时无法读取'
    },
    en: {
      skip:'Skip to content', navExperience:'Experience', navShop:'Rewards Store', navGallery:'Gallery', navPoints:'Rewards', navCreator:'Creator', navAccount:'Beta Account', navActivities:'Activities', navSupport:'Support', navPolicies:'Policies', cart:'Global Beta', downloadReplay:'Get Re:Play', languageLabel:'Website language', skinLabel:'Player appearance', sceneGroupLabel:'Scene background', homeLabel:'Re:Play home', mainNavLabel:'Main navigation', footerNavLabel:'Footer navigation', tapeCanvasLabel:'Metal C90 mounted inside the player with rotating reels', chooseTape:'Choose a cassette', betaWelcomeLabel:'New account welcome reward', betaWelcomeSub:'Issued once by the server after first sign-in. Starting blank cassette balance is zero.', betaAction:'Redemption opens with account service',
      heroKicker:'SLOW LISTENING, REIMAGINED', heroTitle:'Music did not<br>get faster.<br>We did.', heroTagline:'Ten songs. One tape. One evening.', heroDescription:'Choose the songs that matter. Make a tape of your own. Press PLAY, watch the reels turn, and give the music your full attention.', freeDownload:'↓&nbsp; Windows preview', seeExperience:'▷&nbsp; Explore Re:Play', platformNote:'Windows preview · Your music stays yours · Download access may be limited', betaHome:'Global beta: 2,000 RP welcome reward →',
      showcaseLabel:'THE REAL RE:PLAY PLAYER', skinGold:'Gold', skinRetro:'Retro', demoPause:'Ⅱ Pause visual demo', demoPlay:'▷ Play visual demo', demoDisclaimer:'Visual motion demo · no audio or personal tapes', demoCoverAlt:'Original Blue Hour sample cassette cover', sceneLabel:'SCENE', sceneNight:'Night desk', sceneRain:'Rain', sceneWindow:'Window', sceneSea:'Sea', demoShelfKicker:'DEMO COLLECTION', demoShelfTitle:'A shelf waiting for your songs.', demoShelfNotice:'Fictional display tapes · no user works',
      benefitTape:'A real tape experience', benefitTapeDetail:'Cassette sound and texture.', benefitMusic:'Music that is yours', benefitMusicDetail:'Choose songs, keep memories.', benefitScene:'Immersive scenes', benefitSceneDetail:'Different places and moods.', benefitRadio:'Global radio', benefitRadioDetail:'Sounds from around the world.', benefitQuote:'“Some good things<br>need a little time.”',
      productKicker:'PRODUCT / RE:PLAY', productTitle:'Classic look. Modern experience.', productDescription:'Re:Play is a digital player with the character of a cassette deck. Use your own music to choose songs, make tapes, turn them over and keep them.', exploreProduct:'Explore the product →',
      featuresKicker:'THE SOFTWARE / REAL INTERFACES', featuresTitle:'Two players. One way to slow down.', featuresDescription:'Switch between Gold and Retro as listening scenes change automatically. Make your own tape in the full-size Creator board. Player previews combine real app captures with original cassette artwork.', featureGold:'Gold player', featureGoldDetail:'The warm hardware-style deck from the real app.', featureRetro:'Retro player', featureRetroDetail:'A second, fully functional listening surface.', featureCreator:'Full artwork board', featureCreatorDetail:'Design the case, spine, classic labels and lyric paper.', creatorSampleAlt:'Real Creator board capture with original Blue Hour sample artwork', creatorNote:'Prefer simple? Upload a cover and get a matching spine color. Open the full board whenever you want to create more.', creatorGalleryLink:'See Gallery →',
      storyKicker:'MORE THAN MUSIC', storyTitle:'Music is more than sound.', storyDescription:'Give yourself a little time in a fast world. Open Re:Play and rediscover the warmth of music.', beginStory:'Start with one tape →',
      shopKicker:'GLOBAL BETA / REWARDS STORE', shopTitle:'Start creating with one tape.', shopDescription:'The global beta uses RP for digital cassettes. New accounts receive 2,000 RP to choose how to begin.', previewShop:'Global beta · cash purchases closed', c60Description:'Classic 60 minutes, simple and pure.', c90Description:'More time, more stories.', metalDescription:'Richer sound; no stickers on Metal.', shopFineprint:'Beta redemption rules are shown here. No RP is deducted or cassette issued until the account service is connected. Future USD prices stay in private commercial configuration.',
      galleryKicker:'RE:PLAY GALLERY', galleryTitle:'One tape. Your own expression.', galleryDescription:'The case and tape are shown together. Creators keep their original design rights; redeemers receive personal use of a selected version.', galleryNotice:'Original concept works · redemption opens with accounts', galleryOne:'Blue Hour', galleryTwo:'Late Night Letter', galleryThree:'After the Rain', sampleLabel:'Concept design · Not listed', redeemPending:'RP redemption opens with accounts', galleryFineprint:'Gallery grants design-use rights for your own blank tape. It does not transfer rights in photos, fonts or music. Creator works use fixed system RP by asset type; creators cannot set prices.', galleryFixedPolicy:'Fixed category price · ♡ Likes never change the RP cost',
      pointsKicker:'RE:PLAY REWARDS / GLOBAL BETA', pointsTitle:'Create. Collect. Create again.', pointsDescription:'Every global beta account starts with 2,000 RP. Redeem blank and official cassettes or Gallery designs; creators earn a separate reward after a valid redemption.', pilotNotice:'One global beta policy · account service in progress', pointsBoardTitle:'Global beta rules', pointsBoardTag:'BETA V1 / GLOBAL', pointsPurchase:'Welcome reward', pointsBlank:'Blank cassette', pointsDesign:'Creator design tiers', pointsCreator:'Creator reward after valid redemption', pointsPending:'First cassette completed', pointsLimit:'RP cannot be purchased, cashed out or transferred. Cash purchases are closed during beta. The server ledger will own balances and entitlements.', pointsExampleLabel:'Official cassette redemption tiers', pointsFixed:'Fixed Creator redemption tiers', pointsLikes:'♡ Likes', pointsFixedValue:'100 / 200 / 300 / 400 RP · creators cannot set prices', pointsLikesValue:'0 RP · community signal only; future level input',
      downloadKicker:'DOWNLOAD', downloadTitle:'Start your music time.', downloadDescription:'Download Re:Play and give your music a moment of its own.', viewWindowsBuild:'View test build', comingSoon:'Coming soon', mobile:'Mobile', downloadNotice:'Windows test builds currently require access. macOS and mobile downloads are not available yet.', accountKicker:'RE:PLAY ACCOUNT / GLOBAL BETA', accountTitle:'One account for the website and desktop app.', accountDescription:'When the Beta account service goes live, this page will unify RP, blank cassettes, digital assets, Creator works and reward history.', accountPending:'Account service in progress · this page shows the target structure', accountWelcome:'Welcome reward', accountBlank:'Blank Cassette', accountAssets:'My Assets', accountHistory:'Reward History', accountSync:'Website ↔ Desktop sync', accountNoFake:'No simulated balance is shown. Real rewards and assets will come from the server Reward Ledger and Entitlements.', creatorKicker:'RE:PLAY CREATOR / GLOBAL BETA', creatorTitle:'Creative work can differ. Redemption rules stay simple.', creatorDescription:'Creators cannot set prices. Re:Play assigns fixed RP redemption tiers by asset type. Uploading or publishing creates no RP reward; only another user\'s valid redemption triggers an independent system Creator Reward.', creatorPricing:'Fixed Creator redemption tiers', creatorLikes:'♡ Like / Heart', creatorLikesDetail:'Likes are community feedback, popularity and a future Creator Level signal. They do not generate RP or change redemption cost today.', creatorLevel:'Creator Level (future)', creatorLevelDetail:'Disabled in Beta V1.1. Future levels may increase platform Creator Bonus without raising the user redemption price.', creatorOpenApp:'Creator editing happens in the Re:Play desktop app.', experienceAccountKicker:'ONE ACCOUNT / ONE LIBRARY', experienceAccountTitle:'Discover and redeem on the web. Play and create on desktop.', experienceAccountBody:'RP, Blank Cassettes, Creator designs and digital assets are managed by one Re:Play Backend.', experienceFlowReward:'Join Beta · +2,000 RP', experienceFlowRedeem:'Redeem · Blank Cassette 400 RP', experienceFlowCreate:'Create · Creator / Gallery', experienceFlowSync:'Sync · Website ↔ Desktop', supportKicker:'RE:PLAY SUPPORT / GLOBAL BETA', supportTitle:'Support should understand your account, rewards and assets.', supportDescription:'When ticket service connects, support cases will include RP ledger events, cassette entitlements, app version and Creator moderation context.', supportPending:'Ticket backend is not connected yet.', supportCategory:'Category', supportSubject:'Subject', supportMessage:'Details', supportSubmit:'Submit ticket', supportDisabled:'Submission opens after authenticated account and ticket services are connected.', redeemAction:'Redeem', redeemWorking:'Redeeming…', redeemSuccess:'Redeemed', redeemSignIn:'Sign in required', redeemFailed:'Redeem failed', redeemBalance:'RP remaining', activitiesKicker:'GLOBAL BETA / ACTIVITIES', activitiesTitle:'Use activity rewards to support testing, not to create a trading system.', activitiesDescription:'Core Beta rewards are fixed by policy. Special campaigns will be time-bounded, audience-scoped and limited per account.', activityWelcome:'Welcome Reward', activityWelcomeDetail:'One time after the first eligible Beta registration.', activityFirstTape:'First Cassette Completed', activityFirstTapeDetail:'One-time milestone reward.', activityFirstCreator:'Valid Creator Redemption', activityFirstCreatorDetail:'Uploading or publishing earns no RP. The system rewards the Creator only after another user completes a valid redemption.', activityContribution:'Beta Contribution', activityContributionDetail:'Audited manual reward for useful testing contributions.', activityNoCampaign:'No special campaign is currently active.', activityNoCampaignDetail:'Future campaigns can be scheduled in Admin with audience, reward tier, dates and per-account limits.', policiesKicker:'RE:PLAY POLICY CENTRE', policiesTitle:'One place for the rules behind Beta rewards, Creator and account data.', policiesDescription:'These are current product policies. Formal legal Terms and Privacy wording still require final review before production account launch.', policyRewards:'Rewards Policy', policyCreator:'Creator Policy', policyContent:'Content & Copyright', policyPrivacy:'Privacy & Account Data', policyDisclaimer:'Product-policy preview only. This is not the final legal Terms of Service or Privacy Policy.', footerLine:'Slow down and listen again.', catalogUnavailable:'Catalogue unavailable'
    }
  };
  const state = {language:'en',catalog:null};
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
      shop:['Rewards Store','兑换商店'],
      gallery:['Gallery','创意画廊'],
      points:['Rewards','奖励规则'],
      creator:['Creator','Creator 创作'],
      account:['Beta Account','Beta 账户'],
      support:['Support','客服中心'],
      activities:['Activities','活动中心'],
      policies:['Policies','政策中心']
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
  }
  function renderCatalog(){
    const catalog = state.catalog;
    if (!catalog) return;
    for (const item of catalog.products){
      $$(`[data-price="${item.id}"]`).forEach(node => node.textContent = `${points(item.rewardPriceRp)} RP`);
      $$(`[data-reward="${item.id}"]`).forEach(node => node.textContent = state.language === 'zh' ? '全球公测兑换档位' : 'Global beta redemption tier');
    }
    $$('[data-blank-price]').forEach(node => node.textContent = `${points(catalog.blankCassetteCostRp)} RP`);
    $$('[data-gallery-price]').forEach(node => {
      const value = catalog.gallerySamplePricesRp[Number(node.dataset.galleryPrice)];
      node.textContent = `${points(value)} RP`;
    });
    const ruleText = {
      earnRule:`${points(catalog.welcomeRewardRp)} RP`,
      blankRule:`${points(catalog.blankCassetteCostRp)} RP`,
      designRule:`${catalog.creatorPriceTiersRp.map(value => points(value)).join(' / ')} RP`,
      creatorRule:`${catalog.creatorRewardPercent}%`,
      pendingRule:`+${points(catalog.firstCassetteCompletedRewardRp)} RP`
    };
    for (const [id,value] of Object.entries(ruleText)) if ($('#'+id)) $('#'+id).textContent = value;
    if ($('#pointsProduct')) {
      const selected = catalog.products.find(item => item.id === $('#pointsProduct').value);
      if (selected) $('#pointsExample').textContent = state.language === 'zh'
        ? `${selected.name}：${points(selected.rewardPriceRp)} RP。公测无现金购买，兑换将在账号服务接入后开放。`
        : `${selected.name}: ${points(selected.rewardPriceRp)} RP. Cash purchases are closed in beta; redemption opens with account service.`;
    }
  }
  async function loadCatalog(){
    const response = await fetch('catalog.json',{cache:'no-store'});
    if (!response.ok) throw Error('CATALOG_UNAVAILABLE');
    const data = await response.json();
    const ids = ['classic-c60','classic-c90','metal-c90'];
    const validInteger = n => Number.isSafeInteger(n) && n > 0;
    const nonNegativeInteger = n => Number.isSafeInteger(n) && n >= 0;
    if (data.schemaVersion !== 2 || data.mode !== 'global-beta' || !data.features ||
        data.features.cashPurchaseEnabled !== false || data.features.purchaseRewardEnabled !== false ||
        data.features.rewardsEnabled !== true || data.features.liveAccountServiceEnabled !== false ||
        !validInteger(data.welcomeRewardRp) || !validInteger(data.blankCassetteCostRp) ||
        !validInteger(data.firstCassetteCompletedRewardRp) ||
        !Array.isArray(data.products) || data.products.length !== ids.length ||
        data.products.some((item,index) => item.id !== ids[index] || !validInteger(item.rewardPriceRp) || !/^[a-z0-9-]+\.png$/.test(item.image)) ||
        !Array.isArray(data.creatorPriceTiersRp) || data.creatorPriceTiersRp.length !== 4 || !data.creatorPriceTiersRp.every(validInteger) ||
        !Array.isArray(data.gallerySamplePricesRp) || data.gallerySamplePricesRp.length !== 3 || !data.gallerySamplePricesRp.every(validInteger) ||
        !validInteger(data.creatorRewardPercent)) throw Error('CATALOG_INVALID');
    state.catalog = data;
    renderCatalog();
  }
  $('#langSelect')?.addEventListener('change',event => {state.language = event.target.value === 'zh' ? 'zh' : 'en';translate()});
  $('#pointsProduct')?.addEventListener('change',renderCatalog);
  translate();
  loadCatalog().catch(() => {
    const message = t('catalogUnavailable');
    $$('[data-price],[data-gallery-price]').forEach(node => node.textContent = '—');
    const notice = $('.section-fineprint');
    if (notice) notice.textContent = message;
  });
})();
