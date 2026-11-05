# Vong Giới: làm app Android có quảng cáo (chỉ cần điện thoại và GitHub)

App được đóng gói bằng **Capacitor**, quảng cáo dùng **Google AdMob**. Việc build chạy trên máy chủ của GitHub (**GitHub Actions**), nên bạn không cần cài Android Studio.

Bản web trên GitHub Pages **không có quảng cáo**. Quảng cáo chỉ xuất hiện trong app Android.

---

## Bước 1: Tải code lên GitHub

Vào repo **Vong-** trên GitHub.

1. Bấm **Add file → Upload files**, rồi tải lên toàn bộ file trong thư mục `ban-phat-hanh`:
   - các file `.html`
   - `ads.js`, `sw.js`, `manifest.json`
   - `package.json`, `capacitor.config.json`
   - thư mục `icons`

   File trùng tên sẽ được ghi đè.
2. Tạo file build tự động. Cách này làm được trên điện thoại:
   - Bấm **Add file → Create new file**.
   - Ở ô tên file, gõ đúng: `.github/workflows/android.yml`. Mỗi lần gõ dấu `/`, GitHub tự tạo một thư mục.
   - Mở file `ban-phat-hanh/.github/workflows/android.yml` trên máy tính, **chép toàn bộ nội dung** rồi dán vào.
   - Bấm **Commit changes**.

## Bước 2: Chờ GitHub build (3–6 phút)

1. Vào tab **Actions** ở thanh trên cùng của repo. Bạn sẽ thấy lượt chạy **"Build app Android"**.
2. Vòng tròn vàng nghĩa là đang build. Dấu ✅ xanh là xong. Dấu ❌ đỏ là lỗi: bấm vào để xem, rồi chụp màn hình gửi Claude.

Nếu tab Actions báo Actions đang tắt: vào **Settings → Actions → General**, chọn **Allow all actions**, rồi bấm **Save**.

## Bước 3: Cài thử trên điện thoại

1. Trên trang repo, mở mục **Releases** (cột bên phải, hoặc vào `github.com/hoangtien-13/Vong-/releases`).
2. Mở bản **"Vong Giới · APK thử nghiệm"** và tải file **`vong-gioi.apk`**.
3. Mở file vừa tải. Nếu điện thoại hỏi, cho phép **"Cài ứng dụng từ nguồn này"**.
4. Mỗi lần bạn tải code mới lên, GitHub tự build lại và thay file APK trong mục Releases.

Bản này dùng **quảng cáo thử nghiệm của Google**, có dòng chữ "Test Ad". Bấm vào thoải mái, không bị phạt.

## Quảng cáo trong game

| Vị trí | Loại | Giới hạn |
|---|---|---|
| Nút **📺 +1 NGÀY** ở màn hình thành phố | Có thưởng: xem hết thì +1 ngày | 3 lần mỗi lượt chơi |
| Nút **📺 HỒI SINH** khi GAME OVER | Có thưởng: quay lại với 3 ngày, giữ các tòa nhà đã qua | 1 lần mỗi lượt chơi |

Game **chỉ có quảng cáo có thưởng**: người chơi tự bấm nút khi muốn xem. Không có quảng cáo chen giữa, không có banner, và không có quảng cáo nào tự bật lên.

Muốn thử trên máy tính: mở trang thành phố và thêm `?adsim` vào cuối địa chỉ để xem **quảng cáo giả lập**.

---

## Bước 4: Chuyển sang quảng cáo thật (khi đã có tài khoản AdMob)

### 4.1. Lấy 2 mã từ AdMob

1. Đăng ký **https://admob.google.com** (cần từ 18 tuổi).
2. Bấm **Apps → Add app**, chọn **Android**, đặt tên "Vong Giới". Câu hỏi "app đã có trên cửa hàng chưa" thì trả lời **chưa**.
3. Trong app vừa tạo, bấm **Ad units → Add ad unit**, chọn loại **Rewarded** (có thưởng) và đặt tên, ví dụ "Thuong ngay".
4. Ghi lại **2 mã**:

| Mã | Lấy ở đâu | Trông như thế nào |
|---|---|---|
| **Mã ứng dụng** (App ID) | **App settings** của app | `ca-app-pub-1234567890123456~1234567890` (có dấu **`~`**) |
| **Mã đơn vị quảng cáo** (Ad unit ID) | Danh sách **Ad units** | `ca-app-pub-1234567890123456/9876543210` (có dấu **`/`**) |

Hai mã có phần đầu giống nhau. Hãy phân biệt bằng dấu **`~`** và **`/`**: nhầm chỗ là app không hiện quảng cáo, thậm chí có thể bị đóng ngay khi mở.

### 4.2. Cách sửa file ngay trên GitHub (làm được trên điện thoại)

1. Vào repo **Vong-** và bấm vào tên file cần sửa.
2. Bấm biểu tượng **cây bút ✏️** (Edit this file) ở góc trên bên phải nội dung file.
3. Sửa đúng dòng như hướng dẫn bên dưới.
4. Bấm **Commit changes…**, rồi bấm **Commit changes** một lần nữa.

Mỗi lần commit, GitHub tự build lại APK (xem tab **Actions**).

### 4.3. Sửa file `ads.js` (mã đơn vị quảng cáo)

Ở gần đầu file, tìm 2 dòng này:

```js
    REWARDED_ID: 'ca-app-pub-3940256099942544/5224354917',      // mã thử nghiệm của Google
    TESTING: true,
```

Thay **phần nằm giữa hai dấu nháy đơn `' '`** bằng **mã đơn vị quảng cáo** của bạn (mã có dấu `/`):

```js
    REWARDED_ID: 'ca-app-pub-1234567890123456/9876543210',      // mã thật của tôi
    TESTING: true,
```

Giữ nguyên **hai dấu nháy `' '`** và **dấu phẩy `,`** ở cuối dòng. Không thêm khoảng trắng vào giữa mã.

### 4.4. Sửa file `.github/workflows/android.yml` (mã ứng dụng)

Tìm dòng:

```yaml
      ADMOB_APP_ID: ca-app-pub-3940256099942544~3347511713
```

Thay phần sau dấu `: ` bằng **mã ứng dụng** của bạn (mã có dấu `~`):

```yaml
      ADMOB_APP_ID: ca-app-pub-1234567890123456~1234567890
```

Giữ nguyên **số khoảng trắng ở đầu dòng**. File `.yml` rất "khó tính": thụt lề sai một khoảng trắng là build bị lỗi. Ở đây không cần dấu nháy.

### 4.5. Thử trước, rồi mới bật quảng cáo thật

1. **Lần build đầu sau khi đổi mã, cứ để `TESTING: true`.** App dùng mã của bạn nhưng chỉ hiện **quảng cáo thử** (có chữ "Test Ad"), không ai bị phạt. Cài APK mới và bấm thử nút **📺 +1 NGÀY** xem có chạy không.
2. Khi đã chạy tốt, mở lại `ads.js` và đổi `TESTING: true,` thành **`TESTING: false,`**. Từ lúc này app hiện **quảng cáo thật** và bắt đầu có tiền.
3. Nên khai báo điện thoại của bạn là **thiết bị thử nghiệm** trong AdMob (**Settings → Test devices**), để điện thoại của bạn luôn chỉ thấy quảng cáo thử.

⚠️ **Không bao giờ bấm vào quảng cáo thật trong app của chính mình**, và không nhờ người khác bấm. Google sẽ khóa tài khoản AdMob vĩnh viễn.

AdMob có thể mất **vài giờ đến vài ngày** để bắt đầu phân phát quảng cáo thật cho một mã mới. Trong thời gian đó, nếu bấm nút mà thấy báo **"Không tải được quảng cáo"** thì là bình thường.

### Tóm tắt: cần thay những gì

| File | Dòng | Thay bằng |
|---|---|---|
| `ads.js` | `REWARDED_ID: '…'` | Mã **đơn vị quảng cáo** (có `/`) |
| `ads.js` | `TESTING: true` | `false`, sau khi đã thử chạy tốt |
| `.github/workflows/android.yml` | `ADMOB_APP_ID: …` | Mã **ứng dụng** (có `~`) |

Nếu bị lỗi, hoặc không chắc mình sửa đúng chưa, cứ gửi 2 mã cho Claude để sửa giúp.

## Bước 5: Nộp lên Google Play

1. Tạo **khóa ký** (keystore). Claude có thể tạo giúp. **Giữ khóa thật cẩn thận**, vì mất khóa là không cập nhật app được nữa.
2. Cất khóa vào **Settings → Secrets and variables → Actions** của repo, gồm 4 mục:
   - `KEYSTORE_BASE64`
   - `KEYSTORE_PASSWORD`
   - `KEY_ALIAS`
   - `KEY_PASSWORD`
3. GitHub sẽ build thêm file **AAB đã ký**, nằm trong mục **Artifacts** của mỗi lượt chạy Actions.
4. Đăng ký **Google Play Console** (25 USD). Tạo app rồi tải file AAB lên.
5. Hoàn thành các mục bắt buộc trên Play Console:
   - chính sách quyền riêng tư;
   - an toàn dữ liệu, có khai "Có quảng cáo";
   - xếp hạng nội dung;
   - đối tượng người dùng: không dành cho trẻ em.

   Sau đó cho **12 người thử kín trong 14 ngày**, rồi mới phát hành công khai.

## Các file liên quan

| File | Vai trò |
|---|---|
| `ads.js` | Gọi quảng cáo AdMob. Có chế độ giả lập `?adsim` |
| `package.json` | Danh sách thư viện: Capacitor 8, plugin AdMob 8 |
| `capacitor.config.json` | Tên app, mã gói `io.github.hoangtien13.vonggioi` (**không đổi được sau khi đã lên Google Play**) |
| `.github/workflows/android.yml` | Kịch bản để GitHub tự build APK và AAB |
