// Visual-only homepage demo using the same Metal C90 photograph and reel geometry
// as cassette_motion.js. It never reads the visitor's music or cassette library.
(() => {
  'use strict';
  const canvas = document.querySelector('#demoTape');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const image = new Image();
  image.src = 'assets/cassettes/metal-c90-v1.png';
  const source = { x: 48, y: 64, width: 1440, height: 876, hubs: [[450,438,270],[1087,438,270]] };
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !prefersReducedMotion.matches;
  let angles = [0,0];
  let previous = 0;
  let lastFrame = 0;

  function draw() {
    if (!image.complete || !image.naturalWidth) return;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(image,source.x,source.y,source.width,source.height,0,0,canvas.width,canvas.height);
    source.hubs.forEach(([absoluteX,absoluteY,radius],index) => {
      const x = absoluteX - source.x, y = absoluteY - source.y;
      context.save();
      context.beginPath();
      context.arc(x,y,radius,0,Math.PI*2);
      context.clip();
      context.translate(x,y);
      context.rotate(angles[index]);
      context.translate(-x,-y);
      context.drawImage(image,-source.x,-source.y);
      context.restore();
    });
  }
  image.addEventListener('load',draw,{once:true});
  function frame(now) {
    const elapsed = previous ? Math.min((now-previous)/1000,.08) : 0;
    previous = now;
    if (playing && !document.hidden && now-lastFrame > 32) {
      angles[0] += elapsed*5.2;
      angles[1] += elapsed*4.8;
      draw();
      lastFrame = now;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  const shell = document.querySelector('#playerShell');
  const playerImage = document.querySelector('#playerImage');
  const skinButtons = {
    gold:document.querySelector('#skinGold'),
    retro:document.querySelector('#skinRetro')
  };
  function setSkin(name) {
    if (!skinButtons[name]) return;
    shell.classList.toggle('skin-gold',name==='gold');
    shell.classList.toggle('skin-retro',name==='retro');
    playerImage.src = `media/real-player-${name}.png`;
    playerImage.alt = name==='gold'
      ? 'Real Re:Play Gold player interface with a rotating Metal C90 in the cassette bay'
      : 'Real Re:Play Retro player interface with a rotating Metal C90 in the cassette bay';
    for (const [key,button] of Object.entries(skinButtons)) button.setAttribute('aria-pressed',String(key===name));
  }
  for (const [name,button] of Object.entries(skinButtons)) button.addEventListener('click',() => setSkin(name));

  const playButton = document.querySelector('#demoPlay');
  function syncPlayButton() {
    playButton.setAttribute('aria-pressed',String(playing));
    playButton.dataset.i18n = playing ? 'demoPause' : 'demoPlay';
    playButton.textContent = window.RePlaySiteText?.(playButton.dataset.i18n) || (playing ? 'Ⅱ Pause visual demo' : '▷ Play visual demo');
  }
  playButton.addEventListener('click',() => { playing=!playing;syncPlayButton(); });
  syncPlayButton();

  const scenes = {
    lounge:'assets/scenes/rain-lounge-v1.png',
    desk:'assets/scenes/night-desk-v2.png',
    ocean:'assets/scenes/ocean-window-v1.png',
    lamplight:'assets/scenes/city-lamp-v1.png',
    morning:'assets/scenes/sunny-desk-v1.png'
  };
  Object.values(scenes).forEach(src => { const preload = new Image(); preload.src = src; });
  const hero = document.querySelector('.hero');
  const layers = [document.querySelector('#heroScene'),document.querySelector('#heroSceneNext')];
  let activeLayer = 0;
  let sceneName = 'lounge';
  hero.dataset.activeScene = sceneName;
  layers[0].style.backgroundImage = `url("${scenes.lounge}")`;
  function setScene(name) {
    if (!scenes[name] || name===sceneName) return;
    const next = 1-activeLayer;
    layers[next].style.backgroundImage = `url("${scenes[name]}")`;
    layers[next].style.opacity = '1';
    layers[activeLayer].style.opacity = '0';
    activeLayer = next;
    sceneName = name;
    hero.dataset.activeScene = name;
  }
  if (!prefersReducedMotion.matches) setInterval(() => {
    if (document.hidden) return;
    const names = Object.keys(scenes);
    setScene(names[(names.indexOf(sceneName)+1)%names.length]);
  },5000);
})();
