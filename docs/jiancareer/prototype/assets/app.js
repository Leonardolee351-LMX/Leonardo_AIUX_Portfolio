
(function(){
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
function toast(msg){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}t.innerHTML='<strong>JianCareer Prototype</strong><div class="small muted mt1">'+msg+'</div>';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-toast]');if(t){e.preventDefault();toast(t.dataset.toast)} const sw=e.target.closest('[data-switch]');if(sw){const g=sw.dataset.group;const id=sw.dataset.switch;$$('[data-panel="'+g+'"]').forEach(x=>x.classList.add('hidden'));$('#'+id)?.classList.remove('hidden');$$('[data-switch][data-group="'+g+'"]').forEach(x=>x.classList.remove('active'));sw.classList.add('active')}});
document.addEventListener('DOMContentLoaded',()=>{const c=$('[data-countdown]');if(c){let n=59;setInterval(()=>{if(n>0)c.textContent=n--+'s 后可重发'},1000)};$$('[data-progress-auto]').forEach(el=>{let n=0;const max=Number(el.dataset.progressAuto||100);const bar=el.querySelector('span');const label=el.querySelector('[data-progress-label]');const timer=setInterval(()=>{n+=5;if(bar)bar.style.width=Math.min(n,max)+'%';if(label)label.textContent=Math.min(n,max)+'%';if(n>=max)clearInterval(timer)},120)});});
window.JC={toast};
})();
