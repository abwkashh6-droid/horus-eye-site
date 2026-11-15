window.HORUS={url:"https://nnoejcpajhkhhiiklorv.supabase.co",anon:"sb_publishable_iXUKLWnV81ciTkYayl34_Q_XNdccm8D",fn:"smart-service"};
document.head.insertAdjacentHTML("beforeend","<style>html,body{overflow-x:hidden}input[name=web]{left:0!important;top:0!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important}</style>");
/* HORUS cinematic intro: the Eye of Horus draws itself, then the camera "flies through the pupil" into the sea scene. Add ?intro=0 to the URL to skip. */
(function(){
if(matchMedia("(prefers-reduced-motion:reduce)").matches||location.search.indexOf("intro=0")>-1)return;
var H=document.documentElement,B=document.body,L="ar";try{L=localStorage.getItem("hl")||"ar"}catch(e){}
var ar=L=="ar",tag=ar?"تجربة متوسطية جديدة":"A NEW MEDITERRANEAN EXPERIENCE",sk=ar?"تخطّي":"SKIP";
var st=document.createElement("style");
st.textContent="html.hz #gl{transform:scale(1.5);transform-origin:50% 60%}html.rv #gl{transform:none;transition:transform 3s cubic-bezier(.16,.8,.2,1)}"
+"html.hz #hero>*{opacity:0}html.go #hero>*{animation:hzup 1.3s cubic-bezier(.2,.7,.2,1) both}"
+"html.go #hero>:nth-child(2){animation:trk 1.8s .15s cubic-bezier(.2,.7,.2,1) both}html.go #hero>:nth-child(3){animation-delay:.6s}html.go #hero>:nth-child(4){animation-delay:.9s}"
+"@keyframes hzup{from{opacity:0;transform:translateY(28px);filter:blur(8px)}to{opacity:1;transform:none;filter:blur(0)}}"
+"@keyframes trk{from{opacity:0;letter-spacing:.9em;filter:blur(14px)}to{opacity:1;letter-spacing:.3em;filter:blur(0)}}"
+"@keyframes trk2{from{opacity:0;letter-spacing:1.1em;filter:blur(12px)}to{opacity:1;letter-spacing:.5em;filter:blur(0)}}"
+"@keyframes dr{to{stroke-dashoffset:0}}@keyframes pop{to{transform:scale(1)}}@keyframes fi{to{opacity:1}}"
+"#intro{position:fixed;inset:0;z-index:200;background:#050d1c;overflow:hidden}#iw{position:absolute;inset:0}"
+"#eye{position:absolute;left:50%;top:50%;width:min(560px,80vw);transform:translate(-50%,-50%);overflow:visible;filter:drop-shadow(0 0 16px rgba(201,164,92,.5))}"
+"#eye .d{fill:none;stroke:#c9a45c;stroke-width:2.4;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;animation:dr 1.7s cubic-bezier(.5,0,.2,1) forwards}"
+"#eye #pu{fill:#c9a45c;transform-box:fill-box;transform-origin:center;transform:scale(0);animation:pop .9s 1.7s cubic-bezier(.2,1.5,.4,1) forwards}"
+"#itb{position:absolute;left:0;right:0;top:calc(50% + min(154px,22vw) + 16px);display:flex;flex-direction:column;align-items:center;gap:14px}"
+"#itx{direction:ltr;white-space:nowrap;padding-left:.5em;font:600 clamp(34px,8vw,72px)/1 'Cormorant Garamond',serif;color:#f6f1e7;letter-spacing:.5em;opacity:0;animation:trk2 1.5s 2.1s cubic-bezier(.2,.7,.2,1) forwards}"
+"#itg{color:#d9c3a0;font-family:Cairo,sans-serif;opacity:0;animation:fi 1.2s 2.7s forwards}"
+"#isk{position:absolute;bottom:calc(28px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:none;border:1px solid #c9a45c88;color:#d9c3a0;padding:8px 22px;font:500 12px Cairo,sans-serif;letter-spacing:.2em;cursor:pointer;opacity:0;animation:fi .8s .8s forwards}"
+".lb{position:fixed;left:0;right:0;height:11vh;background:#000;z-index:190;transition:transform 1.4s cubic-bezier(.7,0,.2,1)}#lbT{top:0}#lbB{bottom:0}";
document.head.appendChild(st);
var ov=document.createElement("div");ov.id="intro";
ov.innerHTML='<div id="iw"><svg id="eye" viewBox="0 0 400 220">'
+'<path class="d" pathLength="1" d="M24 110Q200 -6 376 110Q200 226 24 110Z"/>'
+'<path class="d" pathLength="1" style="animation-delay:.25s" d="M60 40Q200 -20 340 40"/>'
+'<circle class="d" pathLength="1" style="animation-delay:.6s" cx="200" cy="110" r="42"/>'
+'<circle class="d" pathLength="1" style="animation-delay:.9s" cx="200" cy="110" r="27"/>'
+'<circle id="pu" cx="200" cy="110" r="14"/>'
+'<path class="d" pathLength="1" style="animation-delay:.7s" d="M200 168V196Q200 214 224 214"/>'
+'<path class="d" pathLength="1" style="animation-delay:1s" d="M246 214Q272 214 276 196Q279 180 264 174"/>'
+'</svg><div id="itb"><div id="itx">HORUS</div><div id="itg" style="'+(ar?'letter-spacing:0;font-size:17px':'letter-spacing:.38em;font-size:12px')+'">'+tag+'</div></div></div><button id="isk">'+sk+'</button>';
var bt=document.createElement("div"),bb=document.createElement("div");
bt.className=bb.className="lb";bt.id="lbT";bb.id="lbB";
B.appendChild(bt);B.appendChild(bb);B.appendChild(ov);
H.classList.add("hz");H.style.overflow="hidden";
var eye=ov.querySelector("#eye"),iw=ov.querySelector("#iw"),sb=ov.querySelector("#isk"),rv=false,fin=false;
function mask(r){var g="radial-gradient(circle at 50% 50%,transparent "+r+"px,#000 "+(r+80)+"px)";ov.style.webkitMaskImage=g;ov.style.maskImage=g}
function finish(){if(fin)return;fin=true;H.classList.remove("hz");H.classList.add("go","rv");H.style.overflow="";
 if(ov.parentNode)ov.parentNode.removeChild(ov);
 bt.style.transform="translateY(-100%)";bb.style.transform="translateY(100%)";
 setTimeout(function(){if(bt.parentNode)bt.parentNode.removeChild(bt);if(bb.parentNode)bb.parentNode.removeChild(bb)},1600)}
function reveal(fast){if(rv)return;rv=true;H.classList.add("rv");sb.style.display="none";
 var dur=fast?450:1900,s=null,R=Math.sqrt(innerWidth*innerWidth+innerHeight*innerHeight)/2+120;
 setTimeout(function(){H.classList.remove("hz");H.classList.add("go")},fast?0:600);
 function step(ts){if(s===null)s=ts;var p=Math.min(1,(ts-s)/dur),e=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
  mask(e*R);eye.style.transform="translate(-50%,-50%) scale("+(1+e*4)+")";iw.style.opacity=1-e;
  if(p<1)requestAnimationFrame(step);else finish()}
 requestAnimationFrame(step)}
sb.onclick=function(){reveal(true)};
setTimeout(function(){reveal(false)},3800);
setTimeout(finish,12000);
})();
