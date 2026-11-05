/* Cài đặt chung của Vong Giới: ngôn ngữ (vi / en) và âm thanh (bật / tắt).
   Cách dùng trong mỗi trang:
   - Nạp file này ở CUỐI <body>, ngay trước các <script> của trang (sau toàn bộ HTML tĩnh).
   - HTML tĩnh: thêm data-en="nội dung tiếng Anh (có thể chứa thẻ HTML)" vào phần tử. Khi chọn English,
     innerHTML của phần tử được thay bằng data-en. data-en-title thay cho thuộc tính title.
   - Chuỗi trong JavaScript: T('chuỗi tiếng Việt', 'English string'), dùng được với template `${...}`.
   - Âm thanh: các hàm beep() kiểm tra SETTINGS.sound trước khi phát. */
(() => {
  const KEY = 'vong-gioi-settings';
  const s = { lang: 'vi', sound: true };
  try { Object.assign(s, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  if (!['vi', 'en'].includes(s.lang)) s.lang = 'vi';
  s.sound = s.sound !== false;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} };

  window.SETTINGS = {
    get lang() { return s.lang; },
    get sound() { return s.sound; },
    setLang(l) { s.lang = l === 'en' ? 'en' : 'vi'; save(); },
    setSound(v) { s.sound = !!v; save(); },
  };
  window.T = (vi, en) => (s.lang === 'en' ? en : vi);

  document.documentElement.lang = s.lang;
  if (s.lang === 'en') {
    document.querySelectorAll('[data-en]').forEach(el => { el.innerHTML = el.getAttribute('data-en'); });
    document.querySelectorAll('[data-en-title]').forEach(el => { el.title = el.getAttribute('data-en-title'); });
  }
})();
