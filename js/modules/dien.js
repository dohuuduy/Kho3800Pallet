// BỘ MÔN ĐIỆN (từ Dien.pdf): chiếu sáng, tủ điện, máy lạnh, điện nhẹ, chống sét. Vị trí thiết bị lấy gần đúng theo mặt bằng Đ:03 đến Đ:14.
(function(){
const bc=(g,x,y,z,w,h,d,m)=>bx(g,x-w/2,y-h/2,z-d/2,x+w/2,y+h/2,z+d/2,m),LM=new THREE.MeshBasicMaterial({color:0xfff1a0}),RED='rgba(176,28,36,.92)';
const gs=new THREE.Group(),gd=new THREE.Group(),ga=new THREE.Group(),gn=new THREE.Group(),gt=new THREE.Group();
// Chiếu sáng (Đ:03, Đ:04): panel 40W, tube 2x18W, downlight 15W, pha LED 70W
[3,[7.8,9.4],13.3,18.1,22.9,27.6].forEach(z=>[].concat(z).forEach(zz=>[49.4,51.1].forEach(x=>bc(gs,x,9.25,zz,.6,.04,.6,LM))));
[1,2.9].forEach(z=>[61,63.7,66.4,69.1,71.8].forEach(x=>bc(gs,x,9.25,z,.6,.04,.6,LM)));
[57.5,61,64.5,68,71.5].forEach(x=>bc(gs,x,9.25,5,1.2,.05,.2,LM));[[56.2,1.5],[56.2,4.5],[58.2,1.5],[58.2,4.5]].forEach(a=>bc(gs,a[0],9.3,a[1],.18,.04,.18,LM));
[1.4,4.4].forEach(z=>[60,63,67.5,71].forEach(x=>bc(gs,x,3.6,z,.6,.04,.6,LM)));[2,4].forEach(z=>bc(gs,50.2,3.6,z,1.2,.05,.2,LM));
[50.5,53].forEach(x=>bc(gs,x,5.2,30.2,.35,.25,.2,new THREE.MeshStandardMaterial({color:0x333333})));
lab('Kho lạnh: chiếu sáng do nhà thầu kho lạnh thực hiện',26,6,15,14,gs);lab('Đèn pha LED 70W IP65',51.7,6.2,30.5,5,gs);
// Tủ điện (Đ:02, Đ:05, Đ:06)
[['DB-OF: Pđ 45,1 kW, Ptt 36,1 kW',52.3,2.6,5.6],['DB-OF1: Pđ 37,3 kW, Ptt 29,3 kW',52.3,7.7,5.6],['DB-OF/S1',58.4,1.9,5.7],['DB-OF/S2',66.2,1.9,5.7]].forEach(a=>{bc(gd,a[1],a[2],a[3],.7,1,.25,new THREE.MeshStandardMaterial({color:0xc0392b}));lab(a[0],a[1],a[2]+1.1,a[3],a[0].length>12?8:3,gd,RED)});
lab('Nguồn từ điện hiện trạng, dự trù 140 m (4x35 mm² trong ống HDPE 65/50)',36,1.2,-5,18,gd,RED);
// Máy lạnh (Đ:13, Đ:14): 10 cassette, dàn nóng đặt tầng dưới
[['AC01 3HP',61.7,3.4,3],['AC02 3HP',69.3,3.4,3],['AC03 3HP',63,9.1,1.95],['AC04 3HP',69.5,9.1,1.95],['AC05 2,5HP',50.2,9.1,3],['AC06 2,5HP',50.2,9.1,8.6],['AC07 2,5HP',50.2,9.1,13.3],['AC08 2,5HP',50.2,9.1,18.1],['AC09 2,5HP',50.2,9.1,22.9],['AC10 3HP',50.2,9.1,27.6]].forEach(a=>{bc(ga,a[1],a[2],a[3],.84,.25,.84,new THREE.MeshStandardMaterial({color:0xf2f2f2}));lab(a[0],a[1],a[2]-.5,a[3],3,ga,'rgba(20,90,140,.92)')});
[['CU01',60.8],['CU02',62.4],['CU03',64],['CU04',65.6],['CU06',49],['CU07',50.6]].forEach(a=>{bc(ga,a[1],1,-.55,.9,.8,.35,new THREE.MeshStandardMaterial({color:0x7d8b96}));lab(a[0],a[1],1.9,-.55,2,ga,'rgba(20,90,140,.92)')});
// Điện nhẹ (Đ:09 đến Đ:12): camera, rack 27U, wifi
[['CAM-04',57.1,5.2,-.3],['CAM-03',73.4,5.2,3.8],['CAM-02',56.8,5.2,7],['CAM-01',56,5.2,27.6]].forEach(a=>{bc(gn,a[1],a[2],a[3],.4,.18,.18,new THREE.MeshStandardMaterial({color:0x222222}));lab(a[0],a[1],a[2]+.7,a[3],2.6,gn,'rgba(90,40,120,.92)')});
bc(gn,72.3,1.55,1,.6,1.9,.8,new THREE.MeshStandardMaterial({color:0x1d1d1d}));lab('Rack 27U (tầng 1)',72.3,3,1,5,gn,'rgba(90,40,120,.92)');
[[66,3.6,3],[54,9.2,4],[66,9.2,3]].forEach(a=>{bc(gn,a[0],a[1],a[2],.3,.05,.3,new THREE.MeshStandardMaterial({color:0xffffff}));lab('WiFi',a[0],a[1]-.4,a[2],1.8,gn,'rgba(90,40,120,.92)')});
bc(gn,64.5,9.3,5.3,14,.1,.2,new THREE.MeshStandardMaterial({color:0x9a9a9a}));
// Chống sét (Đ:07, Đ:08): kim tia tiên đạo Rp=57 m, cấp III, cao 5 m so với mái
const SM=new THREE.MeshStandardMaterial({color:0xb0b7bd});
const pole=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,5,8),SM);pole.position.set(24,22.92,17.25);gt.add(pole);
const cone=new THREE.Mesh(new THREE.ConeGeometry(57,25.4,48,1,true),new THREE.MeshBasicMaterial({color:0x5aa9ff,transparent:true,opacity:.07,side:THREE.DoubleSide,depthWrite:false}));cone.position.set(24,12.7,17.25);gt.add(cone);
[-4,38.5].forEach(z=>{bc(gt,24,.1,z,3,.2,2,new THREE.MeshStandardMaterial({color:0x2e7d32}));lab('Bãi tiếp địa R ≤ 10 Ω',24,2,z,6,gt,RED)});
const cm=new THREE.LineBasicMaterial({color:0xd35400,depthTest:false});
[[-4,0],[38.5,34.5]].forEach(a=>{const l=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(24,25.4,17.25),new THREE.Vector3(24,20.42,17.25),new THREE.Vector3(24,17.85,a[1]),new THREE.Vector3(24,.2,a[0])]),cm);l.renderOrder=9;gt.add(l)});
lab('Kim thu sét tia tiên đạo Rp=57 m, cấp III',24,27.5,17.25,14,gt,RED);
[[gs,'sang','sang_den','Đèn chiếu sáng (Đ:03, Đ:04)'],[gd,'dien','dien_tu','Tủ điện, cấp nguồn (Đ:02, Đ:05, Đ:06)'],[ga,'ac','ac_may','Máy lạnh, 10 cassette (Đ:13, Đ:14)'],[gn,'dnhe','dnhe_mang','Camera, WiFi, mạng (Đ:09 đến Đ:12)'],[gt,'set','set_kim','Chống sét (Đ:07, Đ:08)']].forEach(a=>{a[0].visible=false;Viewer.reg({id:a[1],layers:[[a[2],a[3],a[0]]]})});
})();
