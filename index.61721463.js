function t(t,n){return Math.random()*(n-t)+t}const n={drawTraces:!0,useAntiCollisionBug:!0,strokeBalls:!1,dragWithMouseOver:!1};window.settings=n;class e{constructor(t,n,e){this.x=t,this.y=n,this.z=e}add(t){return new e(this.x+t.x,this.y+t.y,this.z+t.z)}sub(t){return new e(this.x-t.x,this.y-t.y,this.z-t.z)}mul(t){return new e(this.x*t,this.y*t,this.z*t)}div(t){return new e(this.x/t,this.y/t,this.z/t)}toRGB(){return`rgb(${this.x} ${this.y} ${this.z})`}toRGBA(t){return`rgba(${this.x}, ${this.y}, ${this.z}, ${t})`}}class o{constructor(t,n){this.x=t,this.y=n}add(t){return new o(this.x+t.x,this.y+t.y)}sub(t){return new o(this.x-t.x,this.y-t.y)}mul(t){return new o(this.x*t,this.y*t)}div(t){return new o(this.x/t,this.y/t)}}let i;(i||(i={})).length=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)};const s=new e(0,255,0),r=new e(255,0,0),c=s.toRGB();class u{constructor(n,e,i){this.r=i,this.position=new o(n,e),this.velocity=new o(t(-4,4),t(-4,4)),this.r=i,this.position_history=Array(100).fill(this.position),this.current_idx=0,this.stableCount=0}save(){this.position_history[this.current_idx]=this.position,this.current_idx=++this.current_idx%100}getVA(){const t=[];for(let n=0;n<100;++n){const o=(n+this.current_idx)%100,i=n/100;t[n]||(t[n]={}),t[n].position=this.position_history[o];const s=255*i;t[n].color=new e(0,s,0)}return t}draw(t){n.drawTraces&&this.drawTrace(t),t.fillStyle=this.color.toRGB(),t.beginPath(),t.arc(this.position.x,this.position.y,this.r,0,2*Math.PI),n.strokeBalls&&this.drawStroke(t),t.fill(),t.closePath()}drawStroke(t){t.strokeStyle="#000a",t.stroke()}drawTrace(t){const n=this.getVA(),e=n[0].position;t.beginPath(),n.forEach((n=>{t.lineTo(n.position.x,n.position.y)})),t.lineTo(this.position.x,this.position.y),t.moveTo(e.x,e.y),t.closePath(),this.applyTraceColor(t,e)}applyTraceColor(t,n){const e=t.createLinearGradient(n.x,n.y,this.position.x,this.position.y);e.addColorStop(0,"transparent"),e.addColorStop(1,c),t.strokeStyle=e,t.stroke()}}const h=1;let a=.35;const d=5e3,l=1e3,w=.2;function v(t,n){return e=t.clientX,o=t.clientY,i=n.clientX,s=n.clientY,Math.sqrt(Math.pow(e-i,2)+Math.pow(o-s,2));var e,o,i,s}function f(){return.18/(Math.abs(-1.55/a)/15.5)}const y=.01,p=.5;function m(t,e){if(!n.dragWithMouseOver)return;const o=t(e);return function(t){const n=o.sub(t.position),e=i.length(n),s=t.r;e<s&&(t.position=t.position.add(n.mul(y*(s-e))),t.velocity=t.velocity.add(n.mul(p*(s-e))))}}function x(t,n){window.addEventListener("keyup",(e=>{e.code!==t&&e.key!==t||n()}))}function g(t,n=300){function e(e){const o=()=>{t(e),s()};function i(){window.removeEventListener("touchend",o)}function s(){window.removeEventListener("touchmove",i)}window.addEventListener("touchend",o,{once:!0}),window.addEventListener("touchmove",i,{once:!0}),setTimeout((()=>{i(),s()}),n)}return window.addEventListener("touchstart",e),e}let E;const b=document.querySelector("canvas"),L=b.getContext("2d");function M(){b.width=window.innerWidth,b.height=window.innerHeight}M(),window.addEventListener("resize",M),function(){let t=.1;function n(n){t+=n,t<0&&(t=0),t>1&&(t=1),a=2.9*t+.1}window.addEventListener("wheel",(({deltaY:t})=>{n(-t/d*f())})),null!==navigator.userAgent.match(/iPhone|iPad|iPod/i)?window.addEventListener("touchmove",(t=>{(function(t){return void 0!==t.scale})(t)&&(function(t){t.scale!==h&&t.preventDefault()}(t),a=function(t){const n=t-h,e=f()*w,o=a+n*w*e;return Math.min(3,Math.max(.1,o))}(t.scale))}),{passive:!1}):function(){let t=null;window.addEventListener("touchstart",(({touches:n})=>{n.length>1&&(t=v(n[0],n[1]))})),window.addEventListener("touchend",(()=>{t=null})),window.addEventListener("touchmove",(({touches:e})=>{if(null!==t){n((v(e[0],e[1])-t)/l)}}))}()}();let T=1,P=1,k=1,C=1;const z=[];for(let n=0;n<20;n++){const n=t(0,2*Math.PI),e=350,o=e*Math.cos(n),i=e*Math.sin(n);z.push(new u(o+.5*b.width,i+.5*b.height,t(70,5)))}var S,A,B,_;function $(){C=1===T?10:1}S=z,A=I,B=70,_=5,window.addEventListener("contextmenu",(n=>{n.preventDefault();const e=A(n);S.push(new u(e.x,e.y,t(B,_)))})),function(t,n,e){function o(o){const i=n(o);!function(t){if(!t)return;E=E===t?null:t}(e(i,t))}window.addEventListener("click",o),g((t=>{if(1!==t.touches.length)return;const n=t.touches[0];o({x:n.clientX,y:n.clientY})})),x("Escape",(()=>{E=null}))}(z,I,(function(t,n){for(const e of n){const n=t.sub(e.position);if(i.length(n)<e.r)return e}return null})),x("Space",$),function(t,n=500,e=200){function o(o){const i=setTimeout((()=>{setTimeout((()=>{t(o)}),e),window.removeEventListener("touchend",s),window.removeEventListener("touchmove",r)}),n);function s(){c(),window.removeEventListener("touchmove",r)}function r(){c(),window.removeEventListener("touchend",s)}function c(){clearTimeout(i)}window.addEventListener("touchend",s,{once:!0}),window.addEventListener("touchmove",r,{once:!0})}window.addEventListener("touchstart",o)}($),x("a",(function(){n.drawTraces=!n.drawTraces}));let q=0;const G={x:0,y:0};let R;function Y(){return[-(t=E?E.position:R).x+.5*b.width/a,-t.y+.5*b.height/a];var t}function I(t){const n=new o(t.x,t.y),[e,i]=Y(),s=new o(e,i);return n.div(a).sub(s)}window.addEventListener("mousemove",(t=>{G.x=t.x,G.y=t.y})),window.requestAnimationFrame((function t(e){k!==C&&(k+=C-k);let c=!0;if(!P){for(const t of z)t.stable=!0,t.save();c=function(t,e){let s=!0;const r=t.length,c=.01,u=new o(.5*b.width,.5*b.width),h=m(I,G);for(let e=0;e<r;e++){const o=t[e],a=u.sub(o.position);o.velocity=o.velocity.add(a.mul(c)),h?.(o);for(let c=e+1;c<r;c++){const e=t[c],r=o.position.sub(e.position),u=i.length(r),h=o.r+e.r;if(u<h){s=!1,o.stable=!1,e.stable=!1;const t=r.div(u);o.position=o.position.add(t.mul(.5*(h-u))),e.position=e.position.sub(t.mul(.5*(h-u))),n.useAntiCollisionBug||(o.velocity=o.velocity.add(t.mul(.5*(h-u))),e.velocity=e.velocity.sub(t.mul(.5*(h-u))))}}}for(let n=0;n<r;n++)t[n].stable?t[n].stableCount++:t[n].stableCount=0;return s}(z),!c&&q<200&&(q=0),c&&++q,k&&(T=k),P=T}(function(t,n){const e=.016;for(const o of t)o.position=o.position.add(o.velocity.mul(e/n));P--})(z,T),R=new o(0,0);for(const t of z){const n=q>199?1:Math.min(1,t.stableCount/255),e=s.mul(n).add(r.mul(1-n));let o=t.r;T>1&&(o=t.r),R=R.add(t.position),t.color=e}R=R.div(z.length),L.clearRect(0,0,b.width,b.height),L.save(),L.scale(a,a),L.translate(...Y()),z.forEach((t=>t.draw(L))),L.fillStyle="purple",L.beginPath(),L.arc(R.x,R.y,10,0,2*Math.PI),L.fill(),L.closePath(),L.restore(),window.requestAnimationFrame(t)}));