// MẪU THÊM BỘ MÔN MỚI (Nội thất, Điện, Cấp thoát nước, Chiếu sáng...).
// Sao chép file này thành js/modules/noithat.js rồi thêm <script src="js/modules/noithat.js"></script> vào index.html sau shell.js.
// Có sẵn trong code 3D: THREE, scene, M(màu) tạo vật liệu, bx(nhóm,x0,y0,z0,x1,y1,z1,vật_liệu) tạo khối, lab(chữ,x,y,z,cỡ,nhóm) tạo nhãn.
// Tọa độ: x chạy theo trục 1X (0 đến 73 m), z chạy theo trục 1Y (0 đến 34,5 m), y là cao độ (sàn tầng 1 kho = 1,35; tầng 2 = 6,35).
/*
const g=new THREE.Group();
bx(g,49,6.35,1,51,7.1,2.5,M(0x8b5a2b));           // ví dụ: một bàn làm việc ở phòng PTGĐ TTr
lab('Bàn làm việc',50,7.6,1.75,3,g);
Viewer.reg({id:'nt',                               // id bộ môn: nt, dien, nuoc, sang, kc... (khai báo trong DISCS ở data.js)
  layers:[['nt_ban','Bàn ghế văn phòng',g]],       // [mã lớp duy nhất, tên hiển thị, nhóm 3D]
  views:{noithat1:{p:[62,30,30],t:[50,6.5,8],on:ALL,roof:0,shell:0,cut:10.3}}}); // góc nhìn riêng (không bắt buộc)
*/
