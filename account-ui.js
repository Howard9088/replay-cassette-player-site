(() => {
  'use strict';
  if (document.body.dataset.page !== 'account') return;
  // GitHub Pages is the public entry point; authenticated pages stay on the API origin.
  if (location.hostname === 'howard9088.github.io') {
    location.replace('https://167.179.117.244:8443/account.html' + location.search + location.hash);
    return;
  }
  const $ = selector => document.querySelector(selector);
  const messages = {
    en: {
      backHome: 'Back to website', loginTitle: 'Welcome back',
      loginDescription: 'Sign in to your Re:Play account.',
      registerTitle: 'Create your account', registerDescription: 'Make room for your music.',
      showPassword: 'Show', hidePassword: 'Hide',
      noAccount: 'New to Re:Play?', haveAccount: 'Already have an account?',
      passwordHint: 'Use at least 10 characters.', confirmPassword: 'Confirm password',
      mismatch: 'Passwords do not match.', privacyNote: 'Your music stays on your device.',
      privacyLink: 'Account & privacy', footerTagline: 'A little more time for music.',
      workspace: 'YOUR WORKSPACE', overview: 'Overview', devices: 'Devices',
      balanceHint: 'For cassettes and artwork.'
    },
    zh: {
      backHome: '返回网站', loginTitle: '欢迎回来', loginDescription: '登录你的 Re:Play 账户。',
      registerTitle: '创建你的账户', registerDescription: '从这里，开始你的音乐时光。',
      showPassword: '显示', hidePassword: '隐藏',
      noAccount: '还没有账号？', haveAccount: '已有账号？',
      passwordHint: '请使用至少 10 个字符。', confirmPassword: '确认密码',
      mismatch: '两次输入的密码不一致。', privacyNote: '你的音乐始终保留在自己的设备上。',
      privacyLink: '账户与隐私说明', footerTagline: '多留一点时间给音乐。',
      workspace: '个人空间', overview: '账户概览', devices: '设备管理',
      balanceHint: '可用于兑换磁带与设计。'
    }
  };
  let mode = location.hash === '#register' ? 'register' : 'login';
  const t = key => messages[document.documentElement.lang.startsWith('zh') ? 'zh' : 'en'][key];
  const password = $('#registerPassword'), confirm = $('#registerConfirm');
  function validateConfirmation(showError = false) {
    const mismatch = !!confirm.value && confirm.value !== password.value;
    confirm.setCustomValidity(mismatch ? t('mismatch') : '');
    confirm.setAttribute('aria-invalid', String(mismatch && showError));
    const error = $('#passwordMatchError');
    error.hidden = !(mismatch && showError);
    error.textContent = mismatch ? t('mismatch') : '';
  }
  function render() {
    document.querySelectorAll('[data-account-copy]').forEach(node => {
      node.textContent = t(node.dataset.accountCopy);
    });
    $('#accountLoginForm').hidden = mode !== 'login';
    $('#accountRegisterForm').hidden = mode !== 'register';
    $('#accountFormTitle').textContent = t(mode === 'login' ? 'loginTitle' : 'registerTitle');
    $('#accountFormDescription').textContent = t(mode === 'login' ? 'loginDescription' : 'registerDescription');
    document.querySelectorAll('[data-password-target]').forEach(button => {
      const shown = document.getElementById(button.dataset.passwordTarget).type === 'text';
      button.textContent = t(shown ? 'hidePassword' : 'showPassword');
      button.setAttribute('aria-pressed', String(shown));
    });
    validateConfirmation(confirm.getAttribute('aria-invalid') === 'true');
  }
  document.querySelectorAll('[data-auth-mode]').forEach(button => {
    button.addEventListener('click', () => {
      mode = button.dataset.authMode;
      history.replaceState(null, '', location.pathname + location.search + (mode === 'register' ? '#register' : ''));
      const status = $('#accountAuthStatus');
      if (!status.dataset.i18n) status.textContent = '';
      render();
      $('#accountFormTitle').setAttribute('tabindex', '-1');
      $('#accountFormTitle').focus({ preventScroll: true });
    });
  });
  document.querySelectorAll('[data-password-target]').forEach(button => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.passwordTarget);
      input.type = input.type === 'password' ? 'text' : 'password';
      button.textContent = t(input.type === 'text' ? 'hidePassword' : 'showPassword');
      button.setAttribute('aria-pressed', String(input.type === 'text'));
    });
  });
  confirm.addEventListener('input', () => validateConfirmation(true));
  confirm.addEventListener('blur', () => validateConfirmation(true));
  password.addEventListener('input', () => validateConfirmation(!!confirm.value));
  $('#langSelect').addEventListener('change', render);
  window.addEventListener('hashchange', () => {
    if (!$('#accountGuestView').hidden) {
      mode = location.hash === '#register' ? 'register' : 'login';
      render();
    }
  });
  render();
})();
