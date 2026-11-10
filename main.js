const WA="919818192575",MAIL="varunkhera6@gmail.com";
const $=s=>document.querySelector(s),get=k=>{try{return JSON.parse(localStorage.getItem(k))||[]}catch(e){return[]}};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cupSVG='<svg viewBox="0 0 100 120" fill="none" stroke="#064E3B" stroke-width="4" stroke-linejoin="round"><path d="M18 20h64l-8 88H26z" fill="#FFF8E8"/><path d="M22 44h56" stroke="#D6A84F"/><path d="M40 4c6 6 18 6 24 0" stroke="#087653"/></svg>';
const pages=[["index.html","Home"],["products.html","Products"],["about.html","About Us"],["mission.html","Our Mission"],["contact.html","Contact"]];
const cur=location.pathname.split("/").pop()||"index.html";
$("#hdr").outerHTML=`<header><div class="wrap nav"><a class="logo" href="index.html">Cup<span>2</span>Eat</a>
<nav id="nav"><ul>${pages.map(p=>`<li><a href="${p[0]}" class="${p[0]==cur?"on":""}">${p[1]}</a></li>`).join("")}<li><a class="btn sm" href="products.html">Shop Now</a></li></ul></nav>
<div class="tools"><button class="cartb" id="cartBtn" aria-label="Order cart">Cart (<span id="cc">0</span>)</button><button class="burger" id="bg" aria-label="Menu" aria-expanded="false">☰</button></div></div></header>`;
$("#ftr").outerHTML=`<footer><div class="wrap fg"><div><a class="logo" href="index.html">Cup<span>2</span>Eat</a><p style="margin-top:.8rem;max-width:36ch">Eat Your Drink! Edible cups for a greener tomorrow, founded by Varun Khera.</p></div>
<div><h3>Quick Links</h3><ul>${pages.map(p=>`<li><a href="${p[0]}">${p[1]}</a></li>`).join("")}</ul></div>
<div><h3>Get in Touch</h3><ul><li><a href="tel:09818192575">09818192575</a></li><li><a href="mailto:${MAIL}">${MAIL}</a></li><li><a href="https://instagram.com/cup2eat" target="_blank" rel="noopener">Instagram @cup2eat</a></li></ul></div></div>
<div class="wrap copy">© ${new Date().getFullYear()} Cup2Eat. All rights reserved.</div></footer>`;
$("#bg").onclick=e=>{const o=$("#nav").classList.toggle("open");e.target.setAttribute("aria-expanded",o)};
const wa=t=>window.open(`https://wa.me/${WA}?text=${encodeURIComponent(t)}`,"_blank","noopener");
const cart=()=>get("c2e_cart"),saveCart=c=>{localStorage.setItem("c2e_cart",JSON.stringify(c));upd()};
function upd(){$("#cc").textContent=cart().reduce((a,i)=>a+i.q,0)}upd();
const prods=()=>get("c2e_products");
function add(id){const c=cart(),i=c.find(x=>x.id==id);i?i.q++:c.push({id,q:1});saveCart(c);}
$("#cartBtn").onclick=()=>{const c=cart(),p=prods();if(!c.length)return alert("Your cart is empty. Add a product first.");
wa("Hello Cup2Eat, I would like to order:\n"+c.map(i=>{const x=p.find(y=>y.id==i.id)||{};return `- ${x.name||"Item"} x ${i.q}`}).join("\n"));};
function card(p){return `<article class="card pcard"><div class="pimg">${p.img?`<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">`:cupSVG}</div>
<div class="pbody"><h3>${esc(p.name)}</h3>${p.flavour?`<span class="meta">Flavour: ${esc(p.flavour)}</span>`:""}<p>${esc(p.desc)}</p>
<div class="price">₹${esc(p.price)}</div><span class="meta">Available: ${esc(p.qty)}</span>
<div class="btns"><button class="btn sm ghost" data-add="${esc(p.id)}">Add to Cart</button><button class="btn sm" data-buy="${esc(p.id)}">Buy Now</button></div></div></article>`}
const pg=$("#products-grid");
if(pg){const lim=+pg.dataset.limit||99,p=prods().slice(0,lim);
pg.innerHTML=p.length?p.map(card).join(""):`<div class="empty"><h3>Products coming soon</h3><p>Our range is being added. Message us on WhatsApp to enquire.</p></div>`;
pg.onclick=e=>{const a=e.target.dataset.add,b=e.target.dataset.buy;if(a){add(a);e.target.textContent="Added ✓"}
if(b){const x=prods().find(y=>y.id==b);wa(`Hello Cup2Eat, I want to buy: ${x.name}${x.flavour?" ("+x.flavour+")":""}`)}}}
const rv=$("#reviews");
if(rv){const r=get("c2e_reviews");rv.innerHTML=r.length?r.map(x=>`<blockquote class="card quote">“${esc(x.text)}”<small>${esc(x.name)}</small></blockquote>`).join(""):`<div class="empty">Customer reviews will appear here soon.</div>`}
document.querySelectorAll("[data-wa]").forEach(f=>f.onsubmit=e=>{e.preventDefault();const d=new FormData(f);
wa(f.dataset.wa+"\n"+[...d].map(([k,v])=>`${k}: ${v}`).join("\n"));f.reset();});
