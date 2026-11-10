const $=s=>document.querySelector(s),get=k=>{try{return JSON.parse(localStorage.getItem(k))||[]}catch(e){return[]}},set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function draw(){
$("#pl").innerHTML=get("c2e_products").map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.flavour)}</td><td>₹${esc(p.price)}</td><td>${esc(p.qty)}</td><td><button class="btn sm ghost" data-dp="${esc(p.id)}">Delete</button></td></tr>`).join("")||"<tr><td colspan=5>No products yet.</td></tr>";
$("#rl").innerHTML=get("c2e_reviews").map((r,i)=>`<tr><td>${esc(r.name)}</td><td>${esc(r.text)}</td><td><button class="btn sm ghost" data-dr="${i}">Delete</button></td></tr>`).join("")||"<tr><td colspan=3>No reviews yet.</td></tr>";}
$("#pf").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));d.id=Date.now().toString(36);const p=get("c2e_products");p.push(d);set("c2e_products",p);e.target.reset();draw()};
$("#rf").onsubmit=e=>{e.preventDefault();const r=get("c2e_reviews");r.push(Object.fromEntries(new FormData(e.target)));set("c2e_reviews",r);e.target.reset();draw()};
document.body.onclick=e=>{const t=e.target;
if(t.dataset.dp){set("c2e_products",get("c2e_products").filter(p=>p.id!=t.dataset.dp));draw()}
if(t.dataset.dr){const r=get("c2e_reviews");r.splice(+t.dataset.dr,1);set("c2e_reviews",r);draw()}
if(t.dataset.tab){document.querySelectorAll(".pane").forEach(p=>p.hidden=p.id!=t.dataset.tab);document.querySelectorAll(".tabs .btn").forEach(b=>b.classList.toggle("on",b==t))}};
draw();
