// BỘ MÔN CẤP THOÁT NƯỚC (từ Nuoc.pdf). Vị trí mương, hố ga lấy gần đúng theo chiều dài ghi trong bảng N:02; thiết bị nhà vệ sinh theo N:05 đến N:08.
(function(){
const gm=new THREE.Group(),gi=new THREE.Group(),BL='rgba(20,90,150,.92)',mt=c=>new THREE.MeshStandardMaterial({color:c,roughness:.6});
const bc=(g,x,y,z,w,h,d,m)=>bx(g,x-w/2,y-h/2,z-d/2,x+w/2,y+h/2,z+d/2,m);
// Mương HG1 đến HG6 dọc nhà mới (15+15+15+15+10 m, rồi 4 m ra đường Cao Thắng), z = -1,3
bc(gm,38.5,.05,-1.3,79,.1,.3,mt(0x7f8c8d));
[['HG1',1],['HG2',16],['HG3',31],['HG4',46],['HG5',61],['HG6',71]].forEach(a=>{bc(gm,a[1],.1,-1.3,.7,.2,.7,mt(0x34495e));lab(a[0],a[1],1.2,-1.3,1.8,gm,BL)});
// Ống HDPE Ø200 từ HG20 đến HG10 (khoảng 166 m, thoát ra đường Cao Thắng), z = -2,3
const L=[15,20,20.6,19,3.8,17.5,17.5,17.5,17.5];let x=-90;const B=[['HG20',x]];
['HG19','HG18','HG17','HG16','HG15','HG14','HG13','HG12','HG11'].forEach((n,i)=>{x+=L[i];B.push([n,x])});B.push(['HG10',x+17.5]);
bc(gm,(-90+79.9)/2,.05,-2.3,169.9,.08,.25,mt(0x2e86c1));
B.forEach(a=>{bc(gm,a[1],.1,-2.3,.6,.2,.6,mt(0x1b4f72));lab(a[0],a[1],1.2,-2.3,1.8,gm,BL)});
bc(gm,-11,.1,-.45,174,.2,.3,mt(0xd0d0d0));
lab('Mương HG1 đến HG6, ống HDPE Ø200 HG20 đến HG10, bó vỉa L = 174 m',-10,2.6,-4,24,gm,BL);
lab('Thoát ra đường Cao Thắng',79,1.2,-2.3,7,gm,BL);
lab('Sân BTCT dày 120, S = 924,2 m² (S:10)',66,.8,20,13,gm,BL);
// Nhà vệ sinh: bể tự hoại 5 m³ (3,6 × 1,8 m), bồn inox 1,5 m³ trên mái, ống cấp Dn32, thoát và thông hơi
bc(gi,57.2,.12,-1.5,3.6,.5,1.8,mt(0x3a8f6a));lab('Bể tự hoại 5 m³ (3,6 × 1,8 m)',57.2,1.4,-1.5,8,gi,BL);
bc(gi,57.6,10.75,2.4,.9,.5,.9,mt(0x888888));
const tk=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,1.5,24),new THREE.MeshStandardMaterial({color:0xcfd8dc,metalness:.6,roughness:.3}));tk.position.set(57.6,11.75,2.4);gi.add(tk);
lab('Bồn inox 1,5 m³',57.6,13.2,2.4,6,gi,BL);
const rs=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,11.1,8),mt(0x1e88e5));rs.position.set(57.4,6.15,.4);gi.add(rs);
const sw=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,10.65,8),mt(0x2e7d32));sw.position.set(57.1,5.7,.4);gi.add(sw);
bc(gi,57.1,.4,-.4,.12,.12,1.6,mt(0x2e7d32));
lab('Cấp Dn32 từ nguồn hiện hữu',57.4,2.2,.4,7,gi,BL);lab('Thoát SWP Dn100, thông hơi VTP Dn80 vượt mái 700',57.1,6,.4,12,gi,BL);
[[gm,'nuoc_ngoai','Mương, hố ga, ống thoát ngoài nhà (N:01 đến N:03, S:10)'],[gi,'nuoc_trong','Cấp thoát nước nhà vệ sinh (N:05 đến N:08)']].forEach(a=>a[0].visible=false);
Viewer.reg({id:'nuoc',layers:[['nuoc_ngoai','Mương, hố ga, ống thoát ngoài nhà (N:01 đến N:03, S:10)',gm],['nuoc_trong','Cấp thoát nước nhà vệ sinh (N:05 đến N:08)',gi]]});
const d=document.createElement('details');d.className='sec';
d.innerHTML='<summary>Thông số cấp thoát nước (Nuoc.pdf)</summary><table class="at"><tr><td>Bồn nước</td><td>Inox 1,5 m³ trên mái</td></tr><tr><td>Bể tự hoại</td><td>BTCT 5 m³, thoát WWP DN150 vào hố ga hiện hữu</td></tr><tr><td>Thiết bị tầng 1</td><td>WC ×4, tiểu ×2, lavabo ×3, vòi ×2</td></tr><tr><td>Thiết bị tầng 2</td><td>WC ×5, tiểu ×2, lavabo ×3, vòi ×2</td></tr><tr><td>Ống trong nhà</td><td>Cấp PP-R, thoát uPVC (WWP Dn80, Dn100; SWP Dn100; i = 1,2 đến 2%)</td></tr><tr><td>Ống ngoài nhà</td><td>Cấp HDPE; thoát mưa HDPE Ø200 dày 9,6; thoát thải HDPE Ø140</td></tr><tr><td>Mương HG1 đến HG6</td><td>15 + 15 + 15 + 15 + 10 m, độ dốc 0,5%</td></tr><tr><td>Ống HG20 đến HG10</td><td>khoảng 166 m, hố ga 500×500 đến 700×700</td></tr><tr><td>Đấu nối cấp nước</td><td>ống PVC Ø27, dự trù 140 m</td></tr><tr><td>Bó vỉa</td><td>BT đá 10×20 M200, L = 174 m</td></tr><tr><td>Sân BTCT dày 120</td><td>S = 924,2 m² (S:10), 1.315 m² (S:11)</td></tr></table>';
document.getElementById('sbc').appendChild(d);
})();
