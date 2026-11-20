// DIỆN TÍCH PHÒNG: tự tính từ danh sách phòng RM trong app.js (rộng × dài theo trục bản vẽ), hiện nhãn xanh lá trong 3D và bảng ở thanh bên.
(function(){
const g=new THREE.Group(),f1=n=>n.toFixed(1).replace('.',','),ar=r=>(r[2]-r[1])*(r[4]-r[3]);
RM.forEach(r=>lab(f1(ar(r))+' m²',(r[1]+r[2])/2,r[5]+(r[6]>6?2.2:.5),(r[3]+r[4])/2,Math.max(3.2,Math.min(6,Math.sqrt(ar(r))*.45)),g,'rgba(20,110,60,.92)'));
Viewer.reg({id:'chung',layers:[['area','Diện tích phòng',g]]});
const d=document.createElement('details');d.className='sec';d.open=true;
d.innerHTML='<summary>Diện tích phòng (gần đúng)</summary><table class="at">'+RM.map(r=>'<tr><td>'+r[0]+'</td><td>'+f1(ar(r))+' m²</td></tr>').join('')+'</table>';
document.getElementById('sbc').appendChild(d);
})();
