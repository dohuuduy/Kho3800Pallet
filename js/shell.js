// KHUNG TRANG WEB: điều hướng, bộ môn, mặt cắt, liên kết sâu (#tên-góc-nhìn), API Viewer.reg
(function(){
const $=id=>document.getElementById(id),nz=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
const px=new THREE.Plane(new THREE.Vector3(-1,0,0),1e3),pz=new THREE.Plane(new THREE.Vector3(0,0,-1),1e3);R.clippingPlanes=[pl,pz,px];
const chung=['grid','dim','lab'],keys=()=>LAY.map(l=>l[0]),dOf=k=>LAYD[k]||'chung';
let sbo=innerWidth>=900;
function setLayer(k,on){G[k].visible=on;if(k=='shell')sh=on?(sh==2?0:sh):2;if(k=='roof')rf=on?1:0;if(k=='lab')lb=on?1:0}
function secs(x,z){px.constant=x>=74.9?1e3:x;pz.constant=z>=34.9?1e3:z;const sx=$('sx'),sz=$('sz');if(sx){sx.value=Math.min(x,75);sz.value=Math.min(z,35);$('vx').textContent=x>=74.9?'tắt':'x ≤ '+(+x).toFixed(1);$('vz').textContent=z>=34.9?'tắt':'z ≤ '+(+z).toFixed(1)}D=1}
function note(t){const n=$('nt');n.textContent=t;n.hidden=false;clearTimeout(note.h);note.h=setTimeout(()=>n.hidden=true,3500)}
function show(id,quiet){const v=VW[id];if(!v){note('Chưa có góc nhìn này');return}
 keys().forEach(k=>{if(!chung.includes(k)&&k!='shell'&&k!='roof'&&v.on)G[k].visible=v.on.includes(k)});
 if(v.dim!=null)G.dim.visible=!!v.dim;sh=v.shell??0;rf=v.roof??0;apply();
 secs(v.cx??99,v.cz??99);cut(v.cut??21);rs.value='';hl.visible=false;
 goal={p:new THREE.Vector3(...v.p),t:new THREE.Vector3(...v.t)};tabs();
 if(!quiet&&location.hash!=='#'+id)history.replaceState(null,'','#'+id)}
function tabs(){const nav=$('tabs');nav.innerHTML='';DISCS.forEach(([d,n])=>{const ks=keys().filter(k=>dOf(k)==d),b=document.createElement('button');
 b.className='tab'+(ks.length?'':' off')+(ks.some(k=>G[k].visible)?' on':'');b.textContent=n;b.title=ks.length?'Bật hoặc tắt cả bộ môn':'Chưa có dữ liệu';
 b.onclick=()=>{if(!ks.length){note('Bộ môn '+n+' chưa có dữ liệu. Thêm bằng Viewer.reg trong js/modules (xem README).');return}const on=!ks.some(k=>G[k].visible);ks.forEach(k=>setLayer(k,on));apply();tabs()};nav.appendChild(b)})}
function buildLayers(){const box=$('lyl');box.innerHTML='';[...DISCS.map(d=>d[0]),'chung'].forEach(d=>{const ks=keys().filter(k=>dOf(k)==d);if(!ks.length)return;
 const h=document.createElement('div');h.className='lh';h.textContent=d=='chung'?'Tổng quát':DISCS.find(x=>x[0]==d)[1];box.appendChild(h);
 ks.forEach(k=>{const l=document.createElement('label');l.innerHTML='<input type="checkbox" data-k="'+k+'"> '+LAY.find(x=>x[0]==k)[1];l.firstChild.onchange=e=>{setLayer(k,e.target.checked);apply();tabs()};box.appendChild(l)})});sync()}
function side(){const c=$('sbc');const sec=(t,o)=>{const d=document.createElement('details');d.className='sec';d.open=o;d.innerHTML='<summary>'+t+'</summary>';c.appendChild(d);return d};
 let d=sec('Khu vực',1);ZN.forEach(([n,v])=>{const b=document.createElement('button');b.className='it';b.textContent=n;b.onclick=()=>show(v);d.appendChild(b)});
 d=sec('Bản vẽ kiến trúc (31)',1);d.insertAdjacentHTML('beforeend','<div class="lg"><span class="d1">●</span> có 3D &nbsp;<span class="d2">●</span> một phần &nbsp;<span class="d0">●</span> chưa có</div>');
 SHEETS.forEach(([no,n,st,v])=>{const b=document.createElement('button');b.className='it sh';b.innerHTML='<span class="d'+st+'">●</span> KT:'+String(no).padStart(2,'0')+' '+n;b.dataset.q=nz('kt'+no+' '+n);
  b.onclick=()=>{if(v=='info'){$('ly').open=true;note('Thông tin PCCC nằm trong bảng bên phải')}else if(v)show(v);else note('Bản vẽ này chưa có mô phỏng 3D')};d.appendChild(b)});
 d=sec('Mặt cắt dọc',0);d.insertAdjacentHTML('beforeend','<label>Cắt theo trục X <b id="vx">tắt</b><input id="sx" type="range" min="0" max="75" step=".1" value="75"></label><label>Cắt theo trục Z <b id="vz">tắt</b><input id="sz" type="range" min="0" max="35" step=".1" value="35"></label>');
 d=sec('Phòng',0);d.appendChild($('rm'));
 $('sx').oninput=e=>secs(+e.target.value,+$('sz').value);$('sz').oninput=e=>secs(+$('sx').value,+e.target.value);
 $('q').oninput=e=>{const q=nz(e.target.value.trim());document.querySelectorAll('.it.sh').forEach(b=>b.hidden=!!q&&!b.dataset.q.includes(q))}}
function sbw(){$('sb').classList.toggle('shut',!sbo);document.documentElement.style.setProperty('--sbw',sbo?'300px':'0px')}
$('mn').onclick=()=>{sbo=!sbo;sbw()};
window.Viewer={show,reg(m){m.layers.forEach(([k,n,g])=>{scene.add(g);G[k]=g;LAY.push([k,n]);LAYD[k]=m.id});if(m.views)Object.assign(VW,m.views);buildLayers();tabs()}};
side();buildLayers();tabs();sbw();
addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(VW[h])show(h,true)});
const h0=location.hash.slice(1);if(VW[h0]){show(h0,true);cam.position.copy(goal.p);ctl.target.copy(goal.t);goal=null}
})();
