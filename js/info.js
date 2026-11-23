// CLICK ĐỂ XEM THÔNG TIN: bấm vào một cấu kiện (cột, dầm, đài cọc, cửa, thiết bị, phòng...) để xem mã, kích thước, cao độ, bản vẽ.
// Thêm thông tin cho cấu kiện mới: gán mesh.userData.info={t:'Tên',sheet:'KC:08',rows:[['Tiết diện','300×600 mm']]}
(function(){
const rc=new THREE.Raycaster(),mv=new THREE.Vector2(),dom=R.domElement,card=document.createElement('div');card.id='ic';card.className='p';card.hidden=true;document.body.appendChild(card);
const hlm=new THREE.LineSegments(new THREE.BufferGeometry(),new THREE.LineBasicMaterial({color:0xff3b00,depthTest:false}));hlm.renderOrder=20;hlm.matrixAutoUpdate=false;hlm.frustumCulled=false;hlm.visible=false;scene.add(hlm);
const SH={inner:'KT:09 đến KT:15',part:'KT:10, KT:11',shell:'KT:18 đến KT:21',roof:'KT:12, KT:17',stair:'KT:22, KT:23',door:'KT:13, KT:16, KT:30, KT:31',fin:'KT:07, KT:11, KT:15',wc:'KT:26, KT:27',roofd:'KT:17',site:'KT:03 đến KT:05',rack:'KT:09, KT:18, KT:19',sang_den:'Đ:03, Đ:04',dien_tu:'Đ:02, Đ:05, Đ:06',ac_may:'Đ:13, Đ:14',dnhe_mang:'Đ:09 đến Đ:12',set_kim:'Đ:07, Đ:08',nuoc_ngoai:'N:01 đến N:03, S:10',nuoc_trong:'N:05 đến N:08',kc_xg:'KC:16, KC:40'};
const DT2={D01:['Cửa cuốn nhanh cách nhiệt cho kho lạnh','8 bộ'],D02:['Cửa đi 1 cánh mở, nhôm Xingfa hệ 55, kính cường lực 8 mm','6 bộ'],D03:['Cửa đi 1 cánh mở, nhôm Xingfa, kính cường lực 8 mm','3 bộ tầng 1, 3 bộ tầng 2'],D04:['Cửa đi 2 cánh mở, nhôm Xingfa','2 bộ'],D05:['Cửa đi 1 cánh lùa, nhôm Xingfa','1 bộ'],Dw1:['Cửa đi 1 cánh mở, kính mờ (nhà vệ sinh)','2 bộ mỗi tầng'],DC1:['Cửa đi cách nhiệt 1 cánh mở, do nhà thầu kho lạnh thực hiện','6 bộ'],RD1:['Cửa cuốn khung thép dày 1,2, sơn tĩnh điện, tự động','2 bộ'],W01:['Cửa sổ 4 cánh lùa, nhôm Xingfa','tầng 1 và tầng 2'],W03:['Cửa sổ mở hất 1 cánh 0,6×0,6','theo bảng KT:30, KT:31']};
const f=n=>String(+n.toFixed(2)).replace('.',','),layerOf=o=>{for(;o;o=o.parent)for(const l of LAY)if(G[l[0]]===o)return l[0];return null};
const vis=o=>{for(;o;o=o.parent)if(!o.visible)return false;return true},clipped=p=>R.clippingPlanes.some(pl=>pl.distanceToPoint(p)<0);
function room(p){let b=null,ba=1e9;RM.forEach(r=>{if(p.x>=r[1]&&p.x<=r[2]&&p.z>=r[3]&&p.z<=r[4]&&p.y>=r[5]-.7&&p.y<=r[5]+r[6]+.3){const a=(r[2]-r[1])*(r[4]-r[3]);if(a<ba){ba=a;b=r}}});return b}
let down=null;dom.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
dom.addEventListener('pointerup',e=>{if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])<5)pick(e);down=null});
addEventListener('keydown',e=>{if(e.key=='Escape')close()});
function close(){card.hidden=true;hlm.visible=false;D=1}
function pick(e){const r=dom.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);rc.setFromCamera(mv,cam);
 const hs=rc.intersectObjects(scene.children,true).filter(h=>{const o=h.object;return vis(o)&&!o.isSprite&&!o.isLine&&!o.isLineSegments&&o!==gr&&o.parent!==hl&&!clipped(h.point)});
 let h=hs.slice(0,10).find(x=>x.object.userData.info||x.object.userData.code)||hs.find(x=>layerOf(x.object)!='shell'||sh==1)||hs[0];
 if(!h){close();return}
 const o=h.object,k=layerOf(o),u=o.userData;let t,rows=[],sheet=SH[k]||'';
 if(u.info){t=u.info.t;rows=u.info.rows||[];sheet=u.info.sheet||sheet}
 else if(u.code){const d=DT2[u.code]||['',''];t='Cửa '+u.code;rows=[['Kích thước',f(u.w)+' × '+f(u.h)+' m'],['Loại',d[0]],['Số lượng',d[1]]];sheet='KT:30, KT:31'}
 else{let best=null,bd=1.4;const g=G[k];if(g)g.children.forEach(s=>{if(s.isSprite&&s.userData.text){const dd=s.position.distanceTo(h.point);if(dd<bd){bd=dd;best=s.userData.text}}});
  const rm=room(h.point),ln=(LAY.find(l=>l[0]==k)||[0,'Chi tiết công trình'])[1];t=best||(rm&&(k=='inner'||k=='part'||k=='fin'||k=='shell'||k=='roof')?rm[0]:ln);
  if(rm){rows.push(['Phòng',rm[0]],['Diện tích gần đúng',f((rm[2]-rm[1])*(rm[4]-rm[3]))+' m²'],['Cao',f(rm[6])+' m'],['Ghi chú',rm[7]])}
  rows.push(['Lớp',ln])}
 rows.push(['Cao độ điểm chọn','FL+'+h.point.y.toFixed(2).replace('.',',')]);
 card.innerHTML='<button class="x" aria-label="Đóng">×</button><b>'+t+'</b><table class="at">'+rows.map(a=>'<tr><td>'+a[0]+'</td><td>'+a[1]+'</td></tr>').join('')+'</table>'+(sheet?'<div class="lg">Bản vẽ: '+sheet+'</div>':'');
 card.querySelector('.x').onclick=close;card.hidden=false;
 if(o.isMesh&&!o.isInstancedMesh){hlm.geometry.dispose();hlm.geometry=new THREE.EdgesGeometry(o.geometry);o.updateWorldMatrix(true,false);hlm.matrix.copy(o.matrixWorld);hlm.visible=true}else hlm.visible=false;D=1}
})();
