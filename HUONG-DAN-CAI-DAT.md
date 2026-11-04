# Thành Phố Lặng: cài lên điện thoại Android

Thư mục `ban-phat-hanh` chứa toàn bộ game ở dạng **PWA**, tức là web app cài được như app thật, có biểu tượng riêng, mở toàn màn hình và chơi được khi không có mạng.

## Bước 1: Đưa game lên mạng (miễn phí, khoảng 2 phút)

1. Mở **https://app.netlify.com/drop** trên máy tính.
2. Kéo **cả thư mục `ban-phat-hanh`** thả vào trang đó.
3. Chờ vài giây, Netlify sẽ đưa cho bạn một đường link dạng `https://ten-ngau-nhien.netlify.app`.
4. Muốn giữ link lâu dài và đổi tên link: đăng ký tài khoản Netlify miễn phí, rồi bấm "Claim" trên trang đó.

> Phải dùng link **https**. Mở file trực tiếp từ máy (`file://`) sẽ không cài được và không chơi offline được.

## Bước 2: Cài lên điện thoại Android

1. Mở link ở bước 1 bằng **Chrome** trên điện thoại.
2. Chrome sẽ hiện thông báo **"Cài đặt ứng dụng"**. Nếu không thấy, bấm menu **⋮** rồi chọn **"Thêm vào màn hình chính"**, sau đó chọn **"Cài đặt"**.
3. Biểu tượng **Thành Phố Lặng** sẽ xuất hiện ngoài màn hình chính. Mở lên là chơi toàn màn hình.
4. Sau lần mở đầu tiên có mạng, game được lưu sẵn trong máy, từ đó **chơi được cả khi tắt mạng**.

iPhone cũng cài được: mở link bằng **Safari**, bấm nút **Chia sẻ**, rồi chọn **"Thêm vào MH chính"**.

## Cập nhật game sau này

Khi sửa bất kỳ file nào:
1. Mở `sw.js` và tăng số phiên bản, ví dụ `tpl-v1` thành `tpl-v2`.
2. Kéo lại thư mục lên Netlify. Nếu đã có tài khoản thì vào mục **Deploys** của site đó.
3. Lần tới điện thoại có mạng, app sẽ tự tải bản mới. Có thể phải đóng app rồi mở lại một lần.

## Muốn có file APK hoặc đưa lên Google Play

1. Vào **https://www.pwabuilder.com**, dán link Netlify của bạn rồi bấm **Start**.
2. Chọn **Android**, bấm **Generate Package** để tải về gói gồm:
   - file **APK**: gửi cho bạn bè cài trực tiếp. Điện thoại sẽ hỏi cho phép cài từ nguồn không xác định.
   - file **AAB** và **khóa ký** (signing key): dùng để nộp lên Google Play. **Giữ khóa ký cẩn thận**, vì mất khóa thì không cập nhật app được nữa.
3. Đưa lên Google Play:
   - Cần tài khoản Google Play Developer, phí một lần **25 USD**.
   - Tài khoản cá nhân mới phải cho khoảng **12 người thử kín trong 14 ngày** trước khi được phát hành công khai.
   - Cần một trang **chính sách quyền riêng tư**. Game không thu thập dữ liệu, tiến trình chỉ lưu trên máy người chơi, nên trang này có thể rất ngắn.

## Danh sách file

| File | Vai trò |
|---|---|
| `index.html` | Trang mở đầu, chuyển thẳng vào thành phố |
| `thanh-pho-lang.html` | Bản đồ thành phố |
| `phong-can.html` … `van-bai-long-tin.html` | 5 trò chơi |
| `thap-trung-tam.html` | Tháp cuối và 2 đoạn kết |
| `manifest.json` | Tên, màu sắc, biểu tượng của app |
| `sw.js` | Lưu game để chơi offline |
| `icons/` | Biểu tượng app các kích thước |
