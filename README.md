# Mô phỏng 3D kho lạnh 3.800 pallet

Mở `index.html` bằng trình duyệt (cần có mạng để tải three.js). Đưa lên GitHub Pages: tải toàn bộ file lên gốc repository, bật Settings, Pages, nhánh main.

## Cấu trúc
- `js/data.js`: danh sách bộ môn, bản vẽ KT:01 đến KT:31, góc nhìn. Thêm bản vẽ hoặc góc nhìn ở đây.
- `js/app.js`: mô hình 3D kiến trúc hiện có (một file lớn, sau này nên tách theo khu).
- `js/shell.js`: thanh điều hướng, tab bộ môn, mặt cắt, liên kết sâu (ví dụ `index.html#plan2`).
- `js/modules/`: mỗi bộ môn mới là một file riêng, xem `mau.js`.

## Thêm nội thất, điện, nước, đèn
Tạo `js/modules/<tên>.js`, dựng các khối 3D vào một `THREE.Group`, rồi gọi `Viewer.reg({id, layers, views})`. Tab bộ môn tự sáng lên, lớp tự xuất hiện trong bảng lớp.
