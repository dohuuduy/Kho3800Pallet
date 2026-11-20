// DỮ LIỆU: sửa file này để thêm bản vẽ, góc nhìn, bộ môn. Không cần đụng vào code 3D.
const DISCS=[['arch','Kiến trúc'],['tb','Thiết bị kho'],['kc','Kết cấu'],['nt','Nội thất'],['dien','Điện'],['nuoc','Cấp thoát nước'],['sang','Chiếu sáng'],['pccc','PCCC'],['ac','Điều hòa'],['dnhe','Điện nhẹ'],['set','Chống sét']];
// lớp 3D thuộc bộ môn nào (lớp không khai báo = "Tổng quát")
const LAYD={inner:'arch',part:'arch',shell:'arch',roof:'arch',stair:'arch',door:'arch',fin:'arch',wc:'arch',roofd:'arch',site:'arch',rack:'tb'};
const ALL=['inner','part','stair','door','fin','wc','roofd','site','rack'];
// Góc nhìn: p = vị trí camera, t = điểm nhìn, on = lớp bật, shell 0 mờ/1 đặc/2 ẩn, roof 0/1,
// cut = cắt ngang (m), cx / cz = mặt cắt dọc theo trục X / Z (m), dim = hiện kích thước
const TOP=[36,150,17],TT=[36,0,15];
const VW={
all:{p:[100,50,80],t:[36,6,15],on:ALL,roof:1,shell:0},
site:{p:[-5,205,125],t:[-5,0,2],on:['site','inner','roofd'],roof:1,shell:1},
roofplan:{p:TOP,t:[36,10,15],on:['roofd'],roof:1,shell:2},
fin:{p:TOP,t:TT,on:['inner','fin'],roof:0,shell:2},
rack1:{p:TOP,t:TT,on:['inner','rack','stair'],cut:6.3,roof:0,shell:0},
plan1:{p:TOP,t:TT,on:['inner','part','stair','wc'],cut:6.3,roof:0,shell:0,dim:1},
fin1:{p:TOP,t:TT,on:['inner','fin','part'],cut:6.3,roof:0,shell:0},
ceil:{p:TOP,t:TT,on:['inner'],roof:1,shell:2},
door1:{p:TOP,t:TT,on:['inner','part','door','stair'],cut:6.3,roof:0,shell:0},
plan2:{p:[62,95,20],t:[62,6.4,15],on:['inner','part','stair','wc'],cut:10.3,roof:0,shell:0,dim:1},
fin2:{p:[62,95,20],t:[62,6.4,15],on:['inner','fin','part'],cut:10.3,roof:0,shell:0},
door2:{p:[62,95,20],t:[62,6.4,15],on:['inner','part','door','stair'],cut:10.3,roof:0,shell:0},
sectS1:{p:[36,10,100],t:[36,9,15],on:ALL,roof:1,shell:0,cz:15},
sectS2:{p:[110,10,15],t:[27,9,15],on:ALL,roof:1,shell:0,cx:27},
sectS4:{p:[110,8,15],t:[53,6,12],on:ALL,roof:1,shell:0,cx:53},
elevZ:{p:[160,12,15],t:[36,9,15],on:ALL,roof:1,shell:1},
elevX:{p:[36,10,150],t:[36,9,15],on:ALL,roof:1,shell:1},
stair:{p:[64,15,20],t:[53.5,4,3.5],on:ALL,roof:0,shell:0},
esc:{p:[62,12,50],t:[51,3,33],on:ALL,roof:1,shell:0},
wc1:{p:[63,14,16],t:[56.6,3,3],on:['inner','part','wc','fin','door'],cut:6.3,roof:0,shell:0},
wc2:{p:[63,19,16],t:[57,8,3],on:['inner','part','wc','fin','door'],cut:10.3,roof:0,shell:0},
lam1:{p:[100,10,12],t:[55.3,8.3,12],on:ALL,roof:1,shell:1},
lam2:{p:[64,10,48],t:[64,8.3,6],on:ALL,roof:1,shell:1},
canopy:{p:[95,8,14],t:[74,4.2,3.5],on:ALL,roof:1,shell:1},
zkho:{p:[30,62,48],t:[26,6,15],on:['inner','rack','part','door'],roof:0,shell:0},
zoff1:{p:[62,40,35],t:[58,3,6],on:ALL,cut:6.3,roof:0,shell:0}};
const ZN=[['Toàn bộ công trình','all'],['Khu đất, đường, nhà hiện trạng','site'],['Kho lạnh và kệ','zkho'],['Khối văn phòng tầng 1','zoff1'],['Khối văn phòng tầng 2','plan2'],['Thang ST1','stair'],['Thang thoát hiểm','esc'],['Mái và thoát nước','roofplan']];
// Bản vẽ: [số, tên, trạng thái (1 có 3D, 2 một phần, 0 chưa có), góc nhìn]
const SHEETS=[[1,'Danh sách bản vẽ kiến trúc',0,null],[2,'Thông tin PCCC',2,'info'],[3,'Họa đồ vị trí',1,'site'],[4,'Mặt bằng định vị',1,'site'],[5,'Mặt bằng tổng thể trệt',2,'site'],[6,'Mặt bằng tổng thể mái',2,'roofplan'],[7,'Vật liệu hoàn thiện 01',2,'fin'],[8,'Vật liệu hoàn thiện 02',0,null],[9,'Mặt bằng thiết bị tầng 1',1,'rack1'],[10,'Mặt bằng tầng 1',1,'plan1'],[11,'Hoàn thiện nền, tường tầng 1',1,'fin1'],[12,'Mặt bằng trần tầng 1',2,'ceil'],[13,'Định vị cửa tầng 1',2,'door1'],[14,'Mặt bằng tầng 2',1,'plan2'],[15,'Hoàn thiện nền sàn, trần tầng 2',1,'fin2'],[16,'Định vị cửa tầng 2',2,'door2'],[17,'Mặt bằng mái',1,'roofplan'],[18,'Mặt cắt S1',1,'sectS1'],[19,'Mặt cắt S2, S3, chi tiết D1, G1',2,'sectS2'],[20,'Mặt đứng 1Y, mặt cắt S4, S5',1,'elevZ'],[21,'Mặt đứng 1X1 đến 1X13',1,'elevX'],[22,'Chi tiết thang ST1',1,'stair'],[23,'Thang thoát hiểm inox',1,'esc'],[24,'Chi tiết bậc cấp',0,null],[25,'Mái đón D1',1,'canopy'],[26,'Chi tiết vệ sinh WC01',2,'wc1'],[27,'Chi tiết vệ sinh WC02',2,'wc2'],[28,'Mặt đứng lam 1',1,'lam1'],[29,'Mặt đứng lam 2',1,'lam2'],[30,'Bảng thống kê cửa 01',2,'door1'],[31,'Bảng thống kê cửa 02',2,'door2']];
// ---- Bản vẽ điện (Dien.pdf): góc nhìn và danh mục ----
Object.assign(VW,{
dtt:{p:[-5,205,125],t:[-5,0,2],on:['site','inner','dien_tu','set_kim'],roof:1,shell:1},
dtu:{p:[62,95,20],t:[62,6.4,15],on:['inner','part','dien_tu'],cut:10.3,roof:0,shell:0},
den1:{p:TOP,t:TT,on:['inner','part','sang_den'],cut:6.3,roof:0,shell:0},
den2:{p:[62,95,20],t:[62,6.4,15],on:['inner','part','sang_den'],cut:10.3,roof:0,shell:0},
ng1:{p:TOP,t:TT,on:['inner','part','dien_tu'],cut:6.3,roof:0,shell:0},
ng2:{p:[62,95,20],t:[62,6.4,15],on:['inner','part','dien_tu'],cut:10.3,roof:0,shell:0},
set:{p:[24,110,95],t:[24,10,17],on:['inner','set_kim'],roof:1,shell:0},
mg1:{p:TOP,t:TT,on:['inner','part','dnhe_mang'],cut:6.3,roof:0,shell:0},
mg2:{p:[62,95,20],t:[62,6.4,15],on:['inner','part','dnhe_mang'],cut:10.3,roof:0,shell:0},
ac1:{p:TOP,t:TT,on:['inner','part','ac_may'],cut:6.3,roof:0,shell:0},
ac2:{p:[62,95,20],t:[62,6.4,15],on:['inner','part','ac_may'],cut:10.3,roof:0,shell:0}});
const SHEETS_D=[[0,'Danh sách bản vẽ điện',0,null],[1,'Mặt bằng điện tổng thể',2,'dtt'],[2,'Sơ đồ nguyên lý tủ điện',2,'dtu'],[3,'Bố trí bóng đèn tầng 1',2,'den1'],[4,'Bố trí bóng đèn tầng 2',2,'den2'],[5,'Bố trí cấp nguồn tầng 1',2,'ng1'],[6,'Bố trí cấp nguồn tầng 2',2,'ng2'],[7,'Mặt bằng chống sét mái',1,'set'],[8,'Chi tiết kim thu sét, tiếp địa, lắp đặt',0,null],[9,'Bố trí WiFi, camera tầng 1',2,'mg1'],[10,'Bố trí WiFi tầng 2',2,'mg2'],[11,'Sơ đồ nguyên lý điện thoại, mạng',0,null],[12,'Sơ đồ nguyên lý camera IP',0,null],[13,'Bố trí máy lạnh tầng 1',1,'ac1'],[14,'Bố trí máy lạnh tầng 2',1,'ac2'],[15,'Chi tiết lắp đặt dàn nóng',0,null]];
// ---- Bản vẽ nước (Nuoc.pdf): góc nhìn và danh mục ----
Object.assign(VW,{
ntt:{p:[-8,190,12],t:[-8,0,-2],on:['site','nuoc_ngoai'],roof:1,shell:1},
nvs:{p:[64,26,-14],t:[57,4,1],on:['inner','part','wc','fin','nuoc_trong'],roof:0,shell:0}});
const SHEETS_N=[['N:01','Mặt bằng cấp thoát nước tổng thể',2,'ntt'],['N:02','Bảng thống kê mương, hố ga',2,'ntt'],['N:03','Mặt cắt mương, bó vỉa',0,null],['N:04','Ghi chú chung, vật liệu, ký hiệu',0,null],['N:05','Sơ đồ nguyên lý cấp thoát nước',2,'nvs'],['N:06','Mặt bằng cấp nước nhà vệ sinh',2,'nvs'],['N:07','Mặt bằng thoát nước nhà vệ sinh',2,'nvs'],['N:08','Chi tiết bể tự hoại',2,'nvs'],['N:09','Chi tiết lắp đặt cấp thoát nước',0,null],['S:10','Mặt bằng sân tổng thể',2,'ntt'],['S:11','Mặt cắt sân',0,null]];
