
const T=THREE,cs=getComputedStyle(document.documentElement);
const scene=new T.Scene(),cam=new T.PerspectiveCamera(45,innerWidth/innerHeight,.5,700);
const R=new T.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.5));R.setSize(innerWidth,innerHeight);
document.getElementById('c').appendChild(R.domElement);
const setBg=()=>scene.background=new T.Color(cs.getPropertyValue('--bg').trim()||'#dfe7ec');setBg();
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',setBg);
scene.add(new T.HemisphereLight(0xffffff,0x7a8a96,.85));
const sun=new T.DirectionalLight(0xffffff,.7);sun.position.set(60,120,90);scene.add(sun);
const ctl=new T.OrbitControls(cam,R.domElement);ctl.enableDamping=true;
const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o));
const shellM=M(0xdfe6eb,{transparent:true,opacity:.3,side:T.DoubleSide,depthWrite:false});
const glassM=M(0x7fb8d8,{transparent:true,opacity:.35,side:T.DoubleSide,depthWrite:false});
const roofM=M(0xa9b6c0,{side:T.DoubleSide,transparent:true,opacity:.55}),concM=M(0xb4b8ba),partM=M(0xf1f3f4),
 floorM=M(0xd2c9b6),stM=M(0xc7ccd0),steelM=M(0x6f7a84);
const G={};['shell','roof','inner','lab','door','dim','rack','part','stair','grid','site','roofd','fin','wc'].forEach(k=>{G[k]=new T.Group();scene.add(G[k])});
function bx(g,x0,y0,z0,x1,y1,z1,m){const o=new T.Mesh(new T.BoxGeometry(x1-x0,y1-y0,z1-z0),m);o.position.set((x0+x1)/2,(y0+y1)/2,(z0+z1)/2);g.add(o);return o}
// ground and axes
const gr=new T.Mesh(new T.PlaneGeometry(340,240),M(0x8f9a8a));gr.rotation.x=-Math.PI/2;gr.position.set(-10,-.02,0);scene.add(gr);
bx(G.inner,55.3,0,6,73,.05,34.5,M(0xa8abad));
function lab(t,x,y,z,s=6,g=G.lab,bg='rgba(18,44,64,.85)'){const c=document.createElement('canvas');c.width=512;c.height=96;const q=c.getContext('2d');q.font='bold 44px sans-serif';const W=Math.max(160,Math.ceil(q.measureText(t).width)+44);c.width=W;q.fillStyle=bg;q.fillRect(0,0,W,96);q.fillStyle='#fff';q.font='bold 44px sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillText(t,W/2,50);
 const sp=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),depthTest:false,transparent:true}));sp.scale.set(s*W/512,s*96/512,1);sp.position.set(x,y,z);sp.renderOrder=10;sp.userData.text=t;g.add(sp)}
const AX=[0,6.65,13.55,20.45,27.35,34.25,41.15,48.05,52.5,55.3,59.4,66.2,73],AY=[0,6,12,18,24,30,34.5];
AX.forEach((x,i)=>{lab('1X'+(i+1),x,.6,-3,2.4,G.grid);bx(G.grid,x-.03,0,-1.5,x+.03,.03,35.5,M(0x3b6a8a))});
AY.forEach((z,i)=>{lab('1Y'+(i+1),-3.5,.6,z,2.4,G.grid);bx(G.grid,-2,0,z-.03,74,.03,z+.03,M(0x3b6a8a))});
// slabs
bx(G.inner,4.83,0,0,48.05,1.35,30,concM);bx(G.inner,0,0,0,4.83,.4,30,floorM);bx(G.inner,0,0,30,48.05,.2,34.5,floorM);
bx(G.inner,48.05,0,0,55.3,1.35,30,floorM);bx(G.inner,55.3,0,0,73,.6,6,floorM);
// hall envelope (panel/steel sheet) – eave 17.85, ridge 20.42
bx(G.shell,0,0,0,48.05,17.85,.15,shellM);bx(G.shell,0,0,34.35,48.05,17.85,34.5,shellM);
function gable(x){const s=new T.Shape();s.moveTo(0,0);s.lineTo(34.5,0);s.lineTo(34.5,17.85);s.lineTo(17.25,20.42);s.lineTo(0,17.85);s.closePath();
 const m=new T.Mesh(new T.ExtrudeGeometry(s,{depth:.15,bevelEnabled:false}),shellM);m.rotation.y=-Math.PI/2;m.position.x=x+.15;G.shell.add(m)}
gable(0);gable(47.9);
const a=Math.atan(2.57/17.25),L=Math.hypot(17.25,2.57);
[[-a,8.625],[a,25.875]].forEach(([r,z])=>{const m=new T.Mesh(new T.PlaneGeometry(48.05,L).rotateX(-Math.PI/2),roofM);m.rotation.x=r;m.position.set(24.025,19.135,z);G.roof.add(m)});
bx(G.roof,4.83,14,0,48.05,14.15,30,M(0xf4f6f7,{transparent:true,opacity:.35}));bx(G.roof,0,5.15,0,4.83,5.3,30,M(0xf4f6f7,{transparent:true,opacity:.4}));
// steel columns on grid
const col=new T.InstancedMesh(new T.BoxGeometry(.4,17.85,.4),steelM,AX.slice(0,8).length*2),mt=new T.Matrix4();let k=0;
AX.slice(0,8).forEach(x=>[0,34.5].forEach(z=>{mt.setPosition(x,8.9,z);col.setMatrixAt(k++,mt)}));G.shell.add(col);
// cold-store partitions
bx(G.part,4.83,1.35,0,5,14,30,partM);bx(G.part,4.83,.2,29.9,48.05,14,30.1,partM);
// racking: 6 tiers
const pal=new T.InstancedMesh(new T.BoxGeometry(1,1.3,1.1),M(0xc89b5e),2700),pst=new T.InstancedMesh(new T.BoxGeometry(.1,13.5,.1),M(0x2f6fb0),320),bm=new T.InstancedMesh(new T.BoxGeometry(43,.12,.12),M(0xe07b1f),140);
let p=0,s=0,e=0;
for(let b=0;b<4;b++){for(let r=0;r<4;r++)for(let i=0;i<28;i++)for(let l=0;l<6;l++){if(Math.random()<.12)continue;mt.setPosition(6.2+i*1.4,1.35+.3+l*2.1+.65,1.2+b*7.6+r*1.3+.65);pal.setMatrixAt(p++,mt)}
 for(let r=0;r<5;r++){const z=1.2+b*7.6+r*1.3;for(let i=0;i<16;i++){mt.setPosition(5.5+i*2.8,1.35+6.75,z);pst.setMatrixAt(s++,mt)}
 for(let l=0;l<7;l++){mt.setPosition(27,1.35+.3+l*2.1,z);bm.setMatrixAt(e++,mt)}}}
pal.count=p;[pal,pst,bm].forEach(o=>G.rack.add(o));
// ---- office spine x48.05–55.3, wing x55.3–73 ----
bx(G.shell,48.05,1.35,0,55.3,10.35,.15,shellM);bx(G.shell,48.05,1.35,29.85,55.3,10.35,30,shellM);
bx(G.shell,55.3,.6,0,73,10.35,.15,shellM);bx(G.shell,72.85,.6,0,73,10.35,6,shellM);
const slabs=[[48.05,0,52.5,30],[52.5,0,55.3,1],[52.5,6.6,55.3,30],[55.3,0,73,6]];
slabs.forEach(q=>bx(G.inner,q[0],6.2,q[1],q[2],6.35,q[3],floorM));
bx(G.roof,48.05,10.35,0,55.3,10.5,30,roofM);bx(G.roof,55.3,10.35,0,73,10.5,6,roofM);
// east glass + louver L1, wing front glass + louver L2
const gE=new T.Mesh(new T.PlaneGeometry(30,5).rotateY(Math.PI/2),glassM);gE.position.set(55.3,3.85,15);G.shell.add(gE);
const gF=new T.Mesh(new T.PlaneGeometry(17.7,5.75),glassM);gF.position.set(64.15,3.475,6);G.shell.add(gF);
function lv(w,h,rx,ry){const c=document.createElement('canvas');c.width=c.height=128;const q=c.getContext('2d');q.fillStyle='#9aa7b2';q.fillRect(0,0,128,128);q.globalCompositeOperation='destination-out';q.beginPath();q.arc(64,64,38,0,7);q.fill();
 const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rx,ry);return new T.Mesh(new T.PlaneGeometry(w,h),M(0xffffff,{map:t,transparent:true,alphaTest:.5,side:T.DoubleSide}))}
const L1=lv(24,4,24,4);L1.rotation.y=Math.PI/2;L1.position.set(55.3,8.35,12);G.shell.add(L1);
const L2=lv(17.7,4,17.7,4);L2.position.set(64.15,8.35,6);G.shell.add(L2);
// partitions
[6.1,10.86,15.62,20.38,25.14].forEach(z=>bx(G.part,48.05,6.35,z-.07,52.45,10.35,z+.07,partM));
bx(G.part,52.4,6.35,6.6,52.6,10.35,30,partM);bx(G.part,48.05,1.35,5.9,52.5,6.2,6.1,partM);
bx(G.part,65.4,.6,0,65.6,6.2,6,partM);bx(G.part,57.9,.6,0,58.1,6.2,6,partM);bx(G.part,59.4,6.35,0,59.6,10.35,6,partM);bx(G.part,55.3,6.35,3.9,73,10.35,4.1,partM);
// hydraulic lifts in loading-wait room
[[9.5,13],[19,22.5]].forEach(q=>bx(G.inner,49.5,1.36,q[0],53,1.5,q[1],M(0x333b42)));
// ST1 stair (2 flights, 30 risers x 166mm = 5.0 m)
function stair(x,w,z0,dir,y0,rise,n,run){const h=rise/n,d=run/n;for(let i=0;i<n;i++)bx(G.stair,x-w/2,y0,z0+dir*i*d-(dir<0?d:0),x+w/2,y0+(i+1)*h,z0+dir*i*d+(dir>0?d:0),stM)}
stair(53.1,1.2,1,1,1.35,2.5,15,4.2);bx(G.stair,52.5,3.7,5.2,55.3,3.85,6.6,stM);stair(54.7,1.2,5.2,-1,3.85,2.5,15,4.2);
bx(G.inner,52.5,1.35,.3,52.55,1.4,.35,stM);
// labels
[['Kho lạnh – 6 tầng kệ',26,16,15,11],['Phòng đóng gói',2.4,3,15,5],['Kho bao bì',24,3,32.3,6],['Phòng chờ xuất hàng',50.3,3.4,18,7],['Thang ST1',54,8.4,3.3,4],['P. KT&XBCB',61.7,4,3,5],['P. TCHC',69.3,4,3,5],['P. KTTC',66.2,8.6,2,5],['WC',56.7,8.6,2,2],
 ['PTGĐ TTr',50.3,8.6,3,4],['Phòng họp',50.3,8.6,8.6,4],['PTGĐ Ns',50.3,8.6,13.3,4],['TGĐ',50.3,8.6,18.1,3],['PTGĐ KD',50.3,8.6,22.9,4],['KDXNK',50.3,8.6,27.6,4]].forEach(a=>lab(a[0],a[2],a[3],a[4],a[5]||5));
// ---- doors and windows (schedule KT:30-31; positions approximate) ----
const DT={D01:[1.7,3,0xe8a33a],D02:[.9,2.2,0x8a5a34],D03:[.9,2.8,0x8a5a34],D04:[2,2.8,0x4f7ca3],D05:[2.2,2.5,0x4f7ca3],Dw1:[.8,2.2,0x9b7b55],DC1:[.9,2.2,0xe9eef2],RD1:[2.5,3,0xd9552b],W01:[2.4,1.8,0x4aa3dc],W03:[.6,.6,0x4aa3dc]};
function dr(t,ax,x,z,y0){const [w,h,c]=DT[t],X=ax=='x';const o=new T.Mesh(new T.BoxGeometry(X?.4:w,h,X?w:.4),M(c,{roughness:.5}));o.position.set(x,y0+h/2,z);G.door.add(o);o.userData.code=t;o.userData.w=w;o.userData.h=h;lab(t,x,y0+h+.45,z,Math.max(1.8,w),G.door,'rgba(120,70,20,.92)')}
[7,15,24,28.5].forEach(z=>dr('D01','x',48.05,z,1.35));[10,16,30,38].forEach(x=>dr('D01','z',x,30,1.35));
[2.5,7.5,12.5,17.5,22.5,27.5].forEach(z=>dr('DC1','x',4.83,z,1.35));[10,30.8].forEach(x=>dr('RD1','z',x,34.5,.2));
[[49.5,5.9,1.35],[51.5,5.9,1.35],[61.7,6,.6],[69.3,6,.6]].forEach(a=>dr('D02','z',a[0],a[1],a[2]));dr('D02','x',.1,32,.2);dr('D02','x',48.05,32.5,.2);
[8,17,26].forEach(z=>dr('D03','x',55.3,z,1.35));[13.3,18.1,22.9].forEach(z=>dr('D03','x',52.5,z,6.35));
dr('D04','z',63.5,6,.6);dr('D04','z',71.5,6,.6);dr('D05','x',73,3.5,.6);dr('Dw1','x',58,3,.6);dr('Dw1','x',59.5,2,6.35);
[61.7,69.3].forEach(x=>dr('W01','z',x,.1,1.5));[61.7,66.5,70.5].forEach(x=>dr('W01','z',x,.1,7.2));dr('W01','x',73,3,7.2);
[[56.7,.1,3.5],[56.7,.1,8.3],[50,29.9,3],[50,29.9,8]].forEach(a=>dr('W03','z',a[0],a[1],a[2]));
// ---- dimensions from drawings (m) ----
const dm=new T.LineBasicMaterial({color:0xd8232b,depthTest:false}),V3=a=>new T.Vector3(a[0],a[1],a[2]),fm=n=>n.toFixed(2).replace('.',',');
function seg(a,b){const l=new T.Line(new T.BufferGeometry().setFromPoints([V3(a),V3(b)]),dm);l.renderOrder=9;G.dim.add(l)}
function dim(a,b,t,s=3){seg(a,b);const v=a[1]!=b[1]?[.4,0,0]:[0,.4,0];[a,b].forEach(p=>seg([p[0]-v[0],p[1]-v[1],p[2]-v[2]],[p[0]+v[0],p[1]+v[1],p[2]+v[2]]));lab(t,(a[0]+b[0])/2,(a[1]+b[1])/2+.5,(a[2]+b[2])/2,s,G.dim,'rgba(176,28,36,.92)')}
for(let i=0;i<12;i++)dim([AX[i],.2,-7],[AX[i+1],.2,-7],fm(AX[i+1]-AX[i]),2.4);
dim([0,.2,-10.5],[73,.2,-10.5],'73,00 m (1X1–1X13)',7);dim([0,.2,-13.5],[48.05,.2,-13.5],'48,05 m: kho lạnh và đóng gói',8);
for(let i=0;i<6;i++)dim([-7,.2,AY[i]],[-7,.2,AY[i+1]],fm(AY[i+1]-AY[i]),2.4);dim([-10.5,.2,0],[-10.5,.2,34.5],'34,50 m (1Y1–1Y7)',6);
const LV=[0,1.35,6.35,10.35,17.85,20.42];for(let i=0;i<5;i++)dim([76,LV[i],15],[76,LV[i+1],15],fm(LV[i+1]-LV[i]),2.4);
LV.forEach(h=>lab(h?'FL+'+h.toFixed(3):'FL±0.000',80,h,15,4.4,G.dim,'rgba(176,28,36,.92)'));
dim([4.83,14.4,-1],[48.05,14.4,-1],'Kho lạnh 43,22 m (cao CL+14,000)',8);dim([0,5.5,-1],[4.83,5.5,-1],'4,83 (CL+5,150)',4);
dim([48.05,.2,36.5],[55.3,.2,36.5],'7,25',3);dim([55.3,.2,36.5],[73,.2,36.5],'17,70',3.5);
dim([55.3,10.9,0],[55.3,10.9,24],'Lam L1: 24,00 × 4,00',6);dim([55.3,10.9,6],[73,10.9,6],'Lam L2: 17,70 × 4,00',6);
dim([52.5,7,-.8],[55.3,7,-.8],'ST1 2,80',3);dim([55.8,7,0],[55.8,7,6.2],'6,20',2.4);
// ---- site (KT:03-05, approximate) ----
function pl2(g,x0,z0,x1,z1,m,y=.03){const o=new T.Mesh(new T.PlaneGeometry(x1-x0,z1-z0).rotateX(-Math.PI/2),m);o.position.set((x0+x1)/2,y,(z0+z1)/2);g.add(o)}
const asph=M(0x3d4349);pl2(G.site,-100,37.4,95,49.6,asph);pl2(G.site,76,-60,92,49.6,asph);pl2(G.site,-88,37.6,76,43.4,M(0x9a3030),.04);pl2(G.site,-165,-90,-100,70,M(0x3b82b8));
bx(G.site,-84.6,0,3.2,-3.2,8.5,36,M(0xb9bfc4));bx(G.site,-86.7,0,-32,-22.2,7.5,-4,M(0xc7b8b8));
[['Đường nội bộ số 1 (6,0 + 6,2 m)',5,.8,46.5,16],['Đường cho xe chữa cháy 40T, rộng 6 m',-45,.8,40.5,16],['Đường Cao Thắng (nhựa), lề 8 m',84,.8,15,14],['Sông Gành Hào',-132,.8,0,14],['Khối phân xưởng 196 hiện trạng (2.687 m²)',-44,9.5,20,18],['Khối phân xưởng 118 hiện trạng (2.055 m²)',-54,8.5,-15,18],['Khu đất 12.608,5 m², mật độ xây dựng 54,43%',36,.8,-17,20]].forEach(a=>lab(a[0],a[1],a[2],a[3],a[4],G.site));
// ---- external inox escape stair (KT:23): 37 risers up to FL+6.150 ----
const inox=M(0x9aa5ae,{metalness:.5,roughness:.4}),H4=6.15/4;
function stX(z,x0,dir,y0){const n=9,h=H4/n,d=2.7/n;for(let i=0;i<n;i++){const xa=x0+dir*i*d,xb=xa+dir*d;bx(G.stair,Math.min(xa,xb),y0+i*h+h-.05,z-.6,Math.max(xa,xb),y0+i*h+h,z+.6,inox)}}
stX(33.8,49.6,1,0);bx(G.stair,52.3,H4-.05,31.4,53.5,H4,34.4,inox);stX(32,52.3,-1,H4);bx(G.stair,48.4,2*H4-.05,31.4,49.6,2*H4,34.4,inox);stX(33.8,49.6,1,2*H4);bx(G.stair,52.3,3*H4-.05,31.4,53.5,3*H4,34.4,inox);stX(32,52.3,-1,3*H4);bx(G.stair,48.4,4*H4-.05,31.4,49.6,4*H4,34.4,inox);
[48.5,53.4].forEach(x=>[31.5,34.3].forEach(z=>bx(G.stair,x-.05,0,z-.05,x+.05,6.15,z+.05,inox)));lab('Thang thoát hiểm inox',51,7.4,33,7,G.stair);
// ---- roof drainage (KT:17), roof ribs, glass canopy D1 (KT:25) ----
const gut=M(0xd8dde1,{metalness:.6,roughness:.3});bx(G.roofd,-.3,17.6,-.45,48.4,17.85,0,gut);bx(G.roofd,-.3,17.6,34.5,48.4,17.85,34.95,gut);
const dp=new T.InstancedMesh(new T.CylinderGeometry(.07,.07,17.7,10),M(0xe8e8e8),28);let qd=0;for(let i=0;i<14;i++)[-.5,35].forEach(z=>{mt.setPosition(1.7+i*3.45,8.85,z);dp.setMatrixAt(qd++,mt)});G.roofd.add(dp);lab('Máng xối inox, 28 ống PVC Ø140, mái dốc 10%',24,19.2,-1.5,12,G.roofd);
{const c=document.createElement('canvas');c.width=64;c.height=8;const x2=c.getContext('2d');x2.fillStyle='#b4c0c9';x2.fillRect(0,0,64,8);x2.fillStyle='#7f8c97';x2.fillRect(0,0,3,8);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(96,1);roofM.map=t;roofM.needsUpdate=true}
bx(G.shell,73,4.1,.4,75.4,4.25,6.6,glassM);lab('Mái đón kính 6,2 × 2,4 m (FL+4,100)',75,5.2,3.5,9);
// ---- floor finishes (KT:07, 11, 15) ----
function fin(x0,z0,x1,z1,y,ts,c1,c2){const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');g.fillStyle=c1;g.fillRect(0,0,64,64);g.strokeStyle=c2;g.lineWidth=3;g.strokeRect(0,0,64,64);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set((x1-x0)/ts,(z1-z0)/ts);pl2(G.fin,x0,z0,x1,z1,M(0xffffff,{map:t}),y+.02)}
fin(4.83,0,48.05,30,1.35,6,'#b6bbbe','#9ea4a8');fin(0,0,4.83,30,.4,3,'#b6bbbe','#9ea4a8');fin(0,30,48.05,34.5,.2,3,'#b6bbbe','#9ea4a8');
fin(48.05,6.6,55.3,30,1.35,.8,'#cfc3ab','#9d927c');fin(48.05,0,52.5,5.9,1.35,.8,'#d9d0bd','#aaa08b');fin(58,0,73,6,.6,.8,'#e3ddd0','#b5ad9c');fin(55.3,0,58,6,.6,.4,'#9fb5c2','#6f8794');
fin(48.05,0,52.5,30,6.35,.8,'#e6e0d2','#b9b2a1');fin(52.5,6.6,55.3,30,6.35,.8,'#e6e0d2','#b9b2a1');fin(59.4,0,73,6,6.35,.8,'#e6e0d2','#b9b2a1');fin(55.3,0,59.4,6,6.35,.4,'#9fb5c2','#6f8794');
// ---- kicker, airbag shrouds (KT:10), WC fixtures (KT:26-27) ----
bx(G.inner,5,1.35,.15,48.05,1.5,.35,concM);bx(G.inner,5,1.35,29.65,48.05,1.5,29.85,concM);
[[9.5,13],[19,22.5]].forEach(a=>bx(G.inner,48.05,1.5,a[0],49.3,4.7,a[1],M(0xf0b429,{transparent:true,opacity:.6})));lab('Bàn nâng thủy lực và bộ trùm túi khí',50.5,5.6,11.3,9);
const wh=M(0xf7f8f9),cp=M(0x7aa2b5);[.6,6.35].forEach(y=>{[.9,2,4.3,5.3].forEach(z=>bx(G.wc,55.5,y,z-.2,56,y+.45,z+.2,wh));[1.45,2.55,4.85].forEach(z=>bx(G.wc,55.4,y,z-.01,57.6,y+1.8,z+.01,cp));[56.8,57.7].forEach(x=>bx(G.wc,x-.25,y+.8,.05,x+.25,y+.9,.5,wh))});
// ---- room explorer: pick a room to fly to it and read its data ----
let D=1;
const RM=[['Kho lạnh, 6 tầng kệ (3.800 pallet)',4.83,48.05,0,30,1.35,12.65,'FL+1,350, trần CL+14,000. Nền F.1.1: hardener 5 kg/m², giấy KRAFT, panel cách nhiệt, bê tông đá 150, ống thông hơi PVC Ø90 cách 600. Vách panel EW.1 dày 150. Cửa D01 ×8, DC1 ×6.'],
['Phòng đóng gói',.15,4.83,0,30,.4,4.75,'FL+0,400, trần panel CL+5,150. Nền F.1.2A hardener. Cửa DC1 sang kho lạnh.'],
['Kho bao bì',0,48.05,30,34.5,.2,6.15,'FL+0,200. Nền F.1.2A hardener. Cửa cuốn RD1 2,5×3,0 ×2, cửa D02.'],
['Phòng chờ xuất hàng',48.05,55.3,6.6,30,1.35,2.4,'FL+1,350, trần CL+3,750. Nền F.1.5 granite 800 chống trượt. 2 bàn nâng thủy lực, bộ trùm túi khí do nhà cung cấp thiết bị thực hiện.'],
['P. BH kho, P. thủ kho',48.05,52.5,0,5.9,1.35,4.85,'FL+1,350. Nền F.1.4 granite 800. Cửa D02.'],
['P. KT&XBCB (tầng 1)',58,65.5,0,6,.6,5.6,'FL+0,600. Trần thạch cao chống ẩm C.2, khung nổi. Sàn granite 800. Cửa D02, D04, cửa sổ W01.'],
['P. TCHC (tầng 1)',65.5,73,0,6,.6,5.6,'FL+0,600. Trần thạch cao chống ẩm C.2. Cửa D02, D04, D05 (cánh lùa), cửa sổ W01.'],
['WC tầng 1',55.3,58,0,6,.6,5.6,'FL+0,600. Nền F.1.3 granite 400 chống trượt, ốp gạch cao tới trần, vách compact dày 15, lavabo đá granite. Cửa Dw1.'],
['WC tầng 2',55.3,59.4,0,6,6.35,4,'FL+6,350. Nền granite 400 chống trượt, vách compact dày 15. Cửa Dw1.'],
['P. KTTC (tầng 2)',59.4,73,0,3.9,6.35,4,'FL+6,350. Sàn F.n.1 granite 800. Mái kính an toàn 12,76 mm, khung thép.'],
['Hành lang tầng 2',55.3,73,3.9,6,6.31,4,'FL+6,310. Lan can hành lang, lát gạch granite 400 chống trượt (KT:24).'],
['Cầu thang ST1',52.5,55.3,1,6.6,1.35,9,'Thang bê tông 2 vế, 30 bậc cao 166, rộng 2,8 × 6,2 m. Mặt bậc phủ granite dày 20, tay vịn inox Ø49 (KT:22).'],
['Thang thoát hiểm inox',48.4,53.5,31.4,34.4,0,6.15,'FL±0,000 lên FL+6,150, 37 bậc. Inox 304, mặt bậc lá đúc dày 5 (KT:23).']];
['PTGĐ TTr','Phòng họp','PTGĐ Ns','TGĐ','PTGĐ KD','KDXNK'].forEach((n,i)=>RM.push(['Tầng 2: '+n,48.05,52.45,i?6.2+(i-1)*4.76:0,i?6.2+i*4.76:6,6.35,4,'FL+6,350. Sàn F.n.1 granite 800, tường gạch ống 200, cửa D03, cửa sổ W01, VK.']));
const hl=new T.Group(),hb=new T.Mesh(new T.BoxGeometry(1,1,1),new T.MeshBasicMaterial({color:0xff8a00,transparent:true,opacity:.28,depthTest:false})),he=new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(1,1,1)),new T.LineBasicMaterial({color:0xff6a00,depthTest:false}));
hb.renderOrder=11;he.renderOrder=12;hl.add(hb,he);hl.visible=false;scene.add(hl);
const rs=document.getElementById('rs'),ri=document.getElementById('ri');
rs.innerHTML='<option value="">Chọn phòng để xem thông tin</option>'+RM.map((r,i)=>'<option value="'+i+'">'+r[0]+'</option>').join('');
rs.onchange=()=>{if(rs.value===''){hl.visible=false;ri.innerHTML='';D=1;return}const r=RM[+rs.value],w=r[2]-r[1],d=r[4]-r[3],cx=(r[1]+r[2])/2,cz=(r[3]+r[4])/2,cy=r[5]+r[6]/2,k=Math.max(w,d)*.9+14;
 hl.position.set(cx,cy,cz);hl.scale.set(w,r[6],d);hl.visible=true;ri.innerHTML='<b>'+r[0]+'</b>Diện tích gần đúng '+fm(w*d)+' m², cao '+fm(r[6])+' m<br>'+r[7];
 goal={p:new T.Vector3(cx+k*.35,cy+k*.7,cz+k*.8),t:new T.Vector3(cx,cy,cz)};rf=0;sh=0;cut(21);apply()};
function posRm(){const t=document.getElementById('t');document.getElementById('rm').style.top=(t.offsetTop+t.offsetHeight+8)+'px'}posRm();
// ---- layers and horizontal cut ----
const LAY=[['inner','Sàn, nền, bàn nâng'],['rack','Kệ và pallet'],['part','Vách ngăn trong'],['shell','Vỏ bao che, cột, lam, kính'],['roof','Mái và trần'],['stair','Thang ST1 và thoát hiểm'],['site','Khu đất, đường, nhà hiện trạng'],['roofd','Máng xối, ống thoát mái'],['fin','Hoàn thiện sàn'],['wc','Thiết bị vệ sinh'],['door','Cửa đi, cửa sổ'],['dim','Kích thước'],['grid','Lưới trục'],['lab','Tên phòng']];
const lyl=document.getElementById('lyl');LAY.forEach(([k,n])=>{const l=document.createElement('label');l.innerHTML='<input type="checkbox" data-k="'+k+'"> '+n;lyl.appendChild(l);l.firstChild.onchange=e=>{const on=e.target.checked;G[k].visible=on;if(k=='shell')sh=on?(sh==2?0:sh):2;if(k=='roof')rf=on?1:0;if(k=='lab')lb=on?1:0;apply()}});
function sync(){document.querySelectorAll('#lyl input').forEach(i=>i.checked=G[i.dataset.k].visible)}
const pl=new T.Plane(new T.Vector3(0,-1,0),1e3);R.clippingPlanes=[pl];
function cut(h){pl.constant=h>=21?1e3:h;document.getElementById('cv').textContent=h>=21?'toàn bộ':'đến FL+'+h.toFixed(2);document.getElementById('cut').value=h;D=1}
document.getElementById('cut').oninput=e=>cut(+e.target.value);document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>cut(+b.dataset.c));
if(innerWidth<700)document.getElementById('ly').open=false;
// view presets
const V={persp:{p:[100,50,80],t:[36,6,15],r:1,s:0},front:{p:[36,10,150],t:[36,9,15],r:1,s:1},top:{p:[36,150,17],t:[36,0,15],r:0,s:0},f2:{p:[66,48,38],t:[62,6,10],r:0,s:0},stair:{p:[64,15,20],t:[53.5,4,3.5],r:0,s:0},esc:{p:[62,12,50],t:[51,3,33],r:1,s:0},site:{p:[-5,205,125],t:[-5,0,2],r:1,s:0}};
let goal=null,sh=0,rf=1,lb=1;
function apply(){shellM.opacity=sh==1?.95:.3;shellM.depthWrite=sh==1;G.shell.visible=sh<2;G.roof.visible=!!rf;G.lab.visible=!!lb;
 const B=id=>document.getElementById(id);B('bs').textContent='Vỏ bao che: '+['mờ','đặc','ẩn'][sh];B('br').textContent='Mái: '+(rf?'hiện':'ẩn');B('bl').textContent='Nhãn: '+(lb?'hiện':'ẩn');B('br').classList.toggle('on',!!rf);B('bl').classList.toggle('on',!!lb);window.sync&&sync();D=1}
document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const v=V[b.dataset.v];goal={p:new T.Vector3(...v.p),t:new T.Vector3(...v.t)};rf=v.r;sh=v.s;apply()});
document.getElementById('bs').onclick=()=>{sh=(sh+1)%3;apply()};document.getElementById('br').onclick=()=>{rf=rf?0:1;apply()};document.getElementById('bl').onclick=()=>{lb=lb?0:1;apply()};
cam.position.set(...V.persp.p);ctl.target.set(...V.persp.t);apply();
addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();R.setSize(innerWidth,innerHeight);D=1;posRm()});
ctl.addEventListener('change',()=>D=1);(function loop(){requestAnimationFrame(loop);if(goal){cam.position.lerp(goal.p,.08);ctl.target.lerp(goal.t,.08);D=1;if(cam.position.distanceTo(goal.p)<.1)goal=null}ctl.update();if(D){D=0;R.render(scene,cam)}})();
