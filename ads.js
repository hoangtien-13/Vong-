/* Quảng cáo cho bản app Android (Capacitor + AdMob).
   - Bản web (GitHub Pages) không có quảng cáo: ADS.enabled = false, mọi nút quảng cáo bị ẩn.
   - Thêm ?adsim vào địa chỉ trang để chạy thử quảng cáo GIẢ LẬP ngay trên trình duyệt.
   Chỉ dùng quảng cáo CÓ THƯỞNG (người chơi tự chọn xem). Không có quảng cáo chen giữa.
   Khi có tài khoản AdMob thật: thay mã đơn vị quảng cáo bên dưới và đặt TESTING = false.
   (Mã ỨNG DỤNG AdMob nằm trong file .github/workflows/android.yml, biến ADMOB_APP_ID.) */
window.ADS = (() => {
  const tr = (vi, en) => (window.T ? window.T(vi, en) : vi);   // ngôn ngữ (settings.js)
  const CFG = {
    REWARDED_ID: 'ca-app-pub-3940256099942544/5224354917',      // mã thử nghiệm của Google
    TESTING: true,
  };

  const C = window.Capacitor;
  const native = !!(C && C.isNativePlatform && C.isNativePlatform());
  const plugin = native ? (C.registerPlugin ? C.registerPlugin('AdMob') : C.Plugins && C.Plugins.AdMob) : null;
  let sim = false;
  try { sim = new URLSearchParams(location.search).has('adsim') || sessionStorage.getItem('adsim') === '1'; if (sim) sessionStorage.setItem('adsim', '1'); } catch (e) {}
  const enabled = !!plugin || sim;

  /* ---------- khởi động: hỏi đồng ý quảng cáo (người dùng châu Âu), rồi khởi tạo AdMob ---------- */
  let ready = null;
  function init() {
    if (!plugin) return Promise.resolve();
    if (!ready) ready = (async () => {
      try {
        const info = await plugin.requestConsentInfo();
        if (info && info.isConsentFormAvailable && info.status === 'REQUIRED') await plugin.showConsentForm();
      } catch (e) {}
      await plugin.initialize({ initializeForTesting: CFG.TESTING });
    })().catch(e => { ready = null; throw e; });
    return ready;
  }

  /* ---------- màn che khi đang tải ---------- */
  const css = document.createElement('style');
  css.textContent = `
  .adveil{position:fixed;inset:0;z-index:100;background:rgba(3,4,6,.92);display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:16px;padding:20px;text-align:center;color:#c9d1dc;
    font-family:'Chakra Petch',monospace;letter-spacing:.1em}
  .adveil .box{width:100%;max-width:360px;aspect-ratio:9/12;border:1px dashed #3a4352;display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:10px;background:repeating-linear-gradient(45deg,#0d1016 0 10px,#10141b 10px 20px)}
  .adveil .big{font-size:22px;color:#fff}
  .adveil .dim{font-size:13px;color:#6b7686}
  .adveil .row{display:flex;gap:10px}
  .adveil button{font-family:inherit;font-size:14px;letter-spacing:.1em;background:transparent;color:#3de1ff;border:1px solid #3de1ff;padding:10px 14px;cursor:pointer}
  .adveil button.red{color:#ff2e4d;border-color:#ff2e4d}
  .adveil button:disabled{opacity:.3}
`;
  document.head.appendChild(css);
  function veil(html) {
    const v = document.createElement('div'); v.className = 'adveil'; v.innerHTML = html;
    document.body.appendChild(v); return v;
  }

  /* ---------- quảng cáo giả lập (chỉ để thử trên trình duyệt) ---------- */
  function simAd(kind) {
    return new Promise(res => {
      const reward = kind === 'rewarded';
      const v = veil(`<div class="box"><div class="big">${tr('QUẢNG CÁO', 'AD')}</div><div class="dim">${tr('(GIẢ LẬP · CÓ THƯỞNG)', '(SIMULATED · REWARDED)')}</div>
        <div class="big" id="adCount">3</div></div>
        <div class="row">${reward ? `<button class="red" id="adQuit">${tr('ĐÓNG SỚM (KHÔNG NHẬN THƯỞNG)', 'CLOSE EARLY (NO REWARD)')}</button>` : ''}<button id="adDone" disabled>${tr('ĐÓNG', 'CLOSE')}</button></div>`);
      let n = 3;
      const t = setInterval(() => { n--; v.querySelector('#adCount').textContent = n; if (n <= 0) { clearInterval(t); v.querySelector('#adDone').disabled = false; v.querySelector('#adCount').textContent = reward ? tr('✓ ĐÃ XEM HẾT', '✓ WATCHED') : '✓'; } }, 1000);
      const close = ok => { clearInterval(t); v.remove(); res(ok); };
      v.querySelector('#adDone').onclick = () => close(true);
      if (reward) v.querySelector('#adQuit').onclick = () => close(false);
    });
  }

  /* ---------- quảng cáo có thưởng: trả về true nếu người chơi xem hết ---------- */
  async function rewarded() {
    if (sim) return simAd('rewarded');
    if (!plugin) return false;
    const v = veil(`<div class="big">${tr('ĐANG TẢI QUẢNG CÁO…', 'LOADING AD…')}</div>`);
    try {
      await init();
      await plugin.prepareRewardVideoAd({ adId: CFG.REWARDED_ID, isTesting: CFG.TESTING });
    } catch (e) {
      v.innerHTML = `<div class="big">${tr('KHÔNG TẢI ĐƯỢC QUẢNG CÁO', 'COULD NOT LOAD AD')}</div><div class="dim">${tr('Kiểm tra mạng rồi thử lại sau.', 'Check your connection and try again later.')}</div><button>${tr('ĐÓNG', 'CLOSE')}</button>`;
      return new Promise(res => v.querySelector('button').onclick = () => { v.remove(); res(false); });
    }
    v.remove();
    return new Promise(res => {
      let got = false, finished = false, handles = [];
      const done = ok => { if (finished) return; finished = true; handles.forEach(h => h && h.remove && h.remove()); res(ok); };
      Promise.all([
        plugin.addListener('onRewardedVideoAdReward', () => { got = true; }),
        plugin.addListener('onRewardedVideoAdDismissed', () => setTimeout(() => done(got), 300)),
        plugin.addListener('onRewardedVideoAdFailedToShow', () => done(false)),
      ]).then(h => {
        handles = h;
        plugin.showRewardVideoAd().then(() => { got = true; }).catch(() => done(false));
      }).catch(() => done(false));
    });
  }

  if (plugin) init().catch(() => {});
  return { enabled, native, sim, rewarded };
})();
