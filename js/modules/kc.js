// BỘ MÔN KẾT CẤU (từ BanVeKetCau.pdf). Kích thước và cao độ lấy từ các bảng thống kê KC:08, KC:12, KC:13, KC:35 đến KC:40.
// Vị trí cột, đài cọc, móng nền được suy ra từ lưới trục và số lượng trong thống kê (khớp tổng 44 cột = 44 đài cọc); vị trí đà kiềng và khung thép gần đúng.
(function(){
const gm=new THREE.Group(),gc=new THREE.Group(),gb=new THREE.Group(),gf=new THREE.Group(),gx=new THREE.Group();
const M2=(c,o)=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.7},o||{})),X=i=>AX[i-1],Y=i=>AY[i-1];
const BB=(g,cx,y0,cz,w,y1,d,m)=>bx(g,cx-w/2,y0,cz-d/2,cx+w/2,y1,cz+d/2,m),LB=(t,x,y,z,s,g,c)=>lab(t,x,y,z,s,g,c||'rgba(120,60,20,.92)');
const R=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
// Cột BTCT: [mã, A (theo x), B (theo z), cao độ đỉnh, vị trí [trục X, trục Y]]
const CO=[['C1',.4,.6,1.35,R(2,7).map(i=>[i,6])],['C1A',.4,.6,1.35,R(2,7).map(i=>[i,1])],['C2',.3,.4,1.35,R(1,8).map(i=>[i,7])],['C3',.4,.6,.5,R(2,5).map(i=>[1,i])],['C3A',.4,.6,.4,[[1,1],[1,6]]],
['C4',.4,.5,10.3,[[8,1],[8,6]]],['C4A',.4,.5,10.3,[[10,1],[10,6]]],['C5',.4,.5,10.3,R(2,5).map(i=>[8,i])],['C5A',.4,.5,10.3,R(2,5).map(i=>[10,i])],['C6',.3,.5,10.3,[[11,1],[12,1],[13,1],[11,2],[12,2],[13,2]]]];
const cm=M2(0x8d6e63),pm=M2(0x3a6ea5,{transparent:true,opacity:.55,depthTest:false}),dm=M2(0xe08a1e,{transparent:true,opacity:.5,depthTest:false});
const PFD={PF1:[1,2],PF1A:[1,2],PF2:[1,1],PF3:[1.4,2],PF3A:[1.4,2],PF4:[1,2],PF4A:[1,2],PF5:[1.4,2],PF5A:[1.4,2],PF6:[1,2],PF6A:[1,2]},PFM={C1:'PF1',C1A:'PF1A',C2:'PF2',C3:'PF3',C3A:'PF3A',C4:'PF4',C4A:'PF4A',C5:'PF5',C5A:'PF5A'};
const pile=new THREE.InstancedMesh(new THREE.CylinderGeometry(.175,.175,6,12),pm,100),mt=new THREE.Matrix4();let np=0;const seen={};
CO.forEach(c=>c[4].forEach(([ix,iy])=>{const x=X(ix),z=Y(iy);BB(gc,x,-.4,z,c[1],c[3],c[2],cm);LB(c[0],x,c[3]+.5,z,1.5,gc);
 const pf=c[0]=='C6'?(iy==1?'PF6':'PF6A'):PFM[c[0]];if(pf=='PF2'&&ix==8)return;const d=PFD[pf];BB(gm,x,-1.2,z,d[0],-.4,d[1],pm);
 (d[1]==1?[0]:[-.55,.55]).forEach(o=>{mt.setPosition(x,-4.2,z+o);pile.setMatrixAt(np++,mt)});if(!seen[pf]){seen[pf]=1;LB(pf+' ('+d[0]+'×'+d[1]+')',x,-.4,z,2.4,gm,'rgba(30,80,140,.92)')}}));
pile.count=np;gm.add(pile);
// Móng nền DF: [mã, kích thước x, z, y đáy, y đỉnh, vị trí]
[['DF1',1.4,1.4,-.4,.4,[[1,1],[1,6]]],['DF1A',1.4,1.4,-.4,.4,R(2,5).map(i=>[1,i])],['DF2',.8,.8,-.6,0,[[8,1],[8,6]]],['DF4',.8,1.4,.2,1,R(2,7).reduce((a,i)=>a.concat([[i,1],[i,6]]),[])],['DF4A',.8,1.4,.05,.85,[[10,1],[10,6]]],['DF5',1.4,1.4,.05,.85,R(2,5).map(i=>[8,i])],['DF6',1.4,1.4,.05,.85,R(2,5).map(i=>[10,i])]].forEach(a=>a[5].forEach(([ix,iy],k)=>{BB(gm,X(ix),a[3],Y(iy),a[1],a[4],a[2],dm);if(!k)LB(a[0]+' '+a[1]*1000+'×'+a[2]*1000,X(ix),a[4]+.4,Y(iy),2.2,gm,'rgba(150,80,10,.92)')}));
// Đà kiềng GB (vị trí gần đúng): [mã, x0, x1, z0, z1, rộng, cao, đỉnh]
const gbm=M2(0x607d8b);[['GB1',4.55,48.05,0,0,.3,1.4,1.35],['GB1C',4.55,48.05,30,30,.3,1.6,1.35],['GB2',0,48.05,34.5,34.5,.25,.6,.2],['GB6',0,0,0,30.55,.3,.6,.4],['GB7',4.83,4.83,0,29.95,.3,.6,.4],['GB8',48.05,48.05,0,29.95,.3,1.15,1.35],['GB10',55.3,55.3,0,28.65,.3,.8,1.35],
 ...[6,12,18,24].map((z,i)=>['GB5',48.05,55.3,z,z,.3,.8,1.05]),...[0,6].map(z=>['GB2B',55.3,73.4,z,z,.3,.6,.55])].forEach((b,i)=>{const w=b[5];bx(gb,b[1]-w/2*(b[1]==b[2]?1:0),b[7]-b[6],b[3]-w/2*(b[3]==b[4]?1:0),b[2]+w/2*(b[1]==b[2]?1:0),b[7],b[4]+w/2*(b[3]==b[4]?1:0),gbm);
 if(b[0]!='GB5'||i==7)LB(b[0]+' '+b[5]*1000+'×'+b[6]*1000,(b[1]+b[2])/2,b[7]+.5,(b[3]+b[4])/2,3,gb,'rgba(40,70,90,.92)')});
// Khung thép FR1 (1X1), FR2 ×6 (1X2 đến 1X7), FR3 (1X8): cột I36, kèo I45, giằng I36 29,5 m ở FL+17,850
const sm=M2(0x2f5d8c),sl=2.57/17.25;
function rb(x,z0,y0,z1,y1){const L=Math.hypot(z1-z0,y1-y0),m=new THREE.Mesh(new THREE.BoxGeometry(.18,.45,L),sm);m.position.set(x,(y0+y1)/2,(z0+z1)/2);m.rotation.x=-Math.atan2(y1-y0,z1-z0);gf.add(m)}
R(1,8).forEach(i=>{const x=X(i);[0,30].forEach(z=>BB(gf,x,1.35,z,.18,z?18.5:17.85,.36,sm));BB(gf,x,1.35,34.5,.18,17.85,.3,sm);rb(x,0,17.85,17.25,20.42);rb(x,17.25,20.42,34.5,17.85);BB(gf,x,17.6,15,.18,17.85,30,sm);
 if(i==1||i==2||i==8)LB(i==1?'FR1':i==8?'FR3':'FR2 ×6 (1X2 đến 1X7)',x,22.4,17.25,i==2?8:3,gf,'rgba(20,70,130,.92)')});
// Xà gồ mái C20 (30 hàng, a ≈ 1,12 m) và xà gồ vách Z200 @1300
const xm=M2(0xc0c7cc),pur=new THREE.InstancedMesh(new THREE.BoxGeometry(48.05,.06,.12),xm,30+26),q=new THREE.Quaternion(),sc=new THREE.Vector3(1,1,1),ps=new THREE.Vector3();let k=0;
[0,1].forEach(s=>R(0,14).forEach(i=>{const z=.4+i*1.12,y=17.85+z*sl+.3,a=Math.atan(sl);q.setFromEuler(new THREE.Euler(s?a:-a,0,0));ps.set(24.025,y,s?34.5-z:z);mt.compose(ps,q,sc);pur.setMatrixAt(k++,mt)}));
q.set(0,0,0,1);[-.12,34.62].forEach(z=>R(0,12).forEach(i=>{ps.set(24.025,2+i*1.3,z);mt.compose(ps,q,sc);pur.setMatrixAt(k++,mt)}));gx.add(pur);
LB('Xà gồ mái C20 d=1,8, 30 hàng',24,22.2,8,10,gx,'rgba(60,70,80,.92)');LB('Xà gồ vách Z200×62×68×1,8 a=1300',24,9,-.5,12,gx,'rgba(60,70,80,.92)');
[[gm,'kc_mong','Móng: đài cọc PF, cọc PHC D350, móng nền DF (KC:06 đến KC:28)'],[gc,'kc_cot','Cột BTCT C1 đến C6 (KC:08, KC:30)'],[gb,'kc_gb','Đà kiềng GB (KC:08, KC:29)'],[gf,'kc_khung','Khung thép FR1, FR2, FR3 (KC:14 đến KC:21)'],[gx,'kc_xg','Xà gồ mái và vách (KC:16, KC:40)']].forEach(a=>{a[0].visible=false});
Viewer.reg({id:'kc',layers:[['kc_mong','Móng: đài cọc PF, cọc PHC D350, móng nền DF (KC:06 đến KC:28)',gm],['kc_cot','Cột BTCT C1 đến C6 (KC:08, KC:30)',gc],['kc_gb','Đà kiềng GB (KC:08, KC:29)',gb],['kc_khung','Khung thép FR1, FR2, FR3 (KC:14 đến KC:21)',gf],['kc_xg','Xà gồ mái và vách (KC:16, KC:40)',gx]]});
// Bảng ký hiệu theo bản vẽ
const T=(h,rows)=>'<details class="sec"><summary>'+h+'</summary><table class="at">'+rows.map(r=>'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>').join('')+'</table></details>';
const P='+6,300',RF='+10,300',s=(a,b)=>a.split(' ').map((c,i)=>[c,b.split(' ')[i].replace('x','×'),'']),gbT=[['GB1','300x1400','+1,350'],['GB1A','300x600','+0,400'],['GB1B','300x500','+0,150'],['GB1C','300x1600','+1,350'],['GB2','250x600','+0,200'],['GB2A','300x1400','+1,300'],['GB2B','300x600','+0,550'],['GB3','300x600','+0,400'],['GB4','200x400','+0,200'],['GB5','300x800','+1,050'],['GB5A','200x1400','+1,350'],['GB6','300x600','+0,400'],['GB7','300x600','+0,400'],['GB8','300x1150','+1,350'],['GB9','250x600','+0,200'],['GB10','300x800','+1,350'],['GB10A','300x1400','+1,350'],['GB11','200x800','+1,050'],['GB12','300x(800~1400)','+0,750~+1,350'],['GB12A','300x(400~1600)','+0,150~+1,350'],['GB13','200x500','+1,300'],['GB13A','200x800','+1,050'],['GB14','300x500','+1,300'],['GB15','300x600','+0,550'],['GB16','200x500','+1,300'],['GB17','200x300','+0,100'],['GB18','100x300','+1,350'],['GB19','200x500','+1,300']].map(r=>[r[0],r[1].replace(/x/g,'×'),r[2]]);
const d=document.createElement('div');d.innerHTML=
 T('Cột BTCT (KC:08): mã, tiết diện, cao độ đỉnh',[['C1, C1A','400×600','+1,350'],['C2','300×400','+1,350'],['C3','400×600','+0,500'],['C3A','400×600','+0,400'],['C4, C4A','400×500','+10,300'],['C5, C5A','400×500','+10,300'],['C6','300×500','+10,300'],['C7','300×300','+0,400'],['SC1','200×300','+10,300']])+
 T('Đà kiềng GB (KC:08): tiết diện B×H, cao độ đỉnh',gbT)+
 T('Dầm tầng 2 (KC:12): cao độ đỉnh +6,300',[['1B1, 1B5','300×500',P],['1B2, 1B3A, 1B5A, 1B5B, 1B7','300×600',P],['1B3, 1B4, 1B6, 1B8','200×500',P],['1B4A','250×300',P],['1B9','100×300',P]])+
 T('Dầm mái (KC:13): cao độ đỉnh +10,300',[['RB1, RB2, RB3','300×500',RF],['RB4, RB6','200×500',RF],['RB5, RB5A','200×400',RF]])+
 T('Móng nền DF (KC:08): kích thước, cao độ đáy',[['DF1, DF1A','1400×1400×800','-0,400'],['DF2','800×800×600','-0,600'],['DF3','1400×1400×800','+0,200'],['DF4','800×1400×800','+0,200'],['DF4A','800×1400×800','+0,050'],['DF5, DF6','1400×1400×800','+0,050']])+
 T('Sàn BTCT và thép (KC:12, KC:13, KC:35 đến KC:40)',[['Sàn tầng 2','B20, dày 130','200 kg/m²'],['Sàn mái','B20, dày 120','150 kg/m²'],['Khung FR1','×1','I36, I30a, I30, I55'],['Khung FR2','×6','I45, I36, I30'],['Khung FR3','×1','I36, I22'],['Xà gồ mái','C20 d=1,8','3.593 m'],['Xà gồ vách','Z200 a=1300','KC:21']]);
document.getElementById('sbc').appendChild(d);
})();
