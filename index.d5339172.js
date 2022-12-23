function t(t){return e(0,t)}function e(t,e){return Math.random()*(e-t)+t}const n={drawTraces:!0,useAntiCollisionBug:!0,strokeBalls:!1,dragWithMouseOver:!1,bounciness:0};window.settings=n;class i{add(t){return new i(this.x+t.x,this.y+t.y,this.z+t.z)}sub(t){return new i(this.x-t.x,this.y-t.y,this.z-t.z)}mul(t){return new i(this.x*t,this.y*t,this.z*t)}div(t){return new i(this.x/t,this.y/t,this.z/t)}toRGB(){return`rgb(${this.x} ${this.y} ${this.z})`}toRGBA(t){return`rgba(${this.x}, ${this.y}, ${this.z}, ${t})`}constructor(t,e,n){this.x=t,this.y=e,this.z=n}}class o{add(t){return new o(this.x+t.x,this.y+t.y)}sub(t){return new o(this.x-t.x,this.y-t.y)}mul(t){return new o(this.x*t,this.y*t)}div(t){return new o(this.x/t,this.y/t)}constructor(t,e){this.x=t,this.y=e}}let s;!function(t){let e;var n;t.length=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},t.rotate=function(t,e,n){const i=Math.atan2(t.y,t.x)-Math.PI/2*e*n;return new o(Math.cos(i),Math.sin(i)).mul(s.length(t))},(n=e=t.RotationDirection||(t.RotationDirection={}))[n.Left=1]="Left",n[n.Right=-1]="Right"}(s||(s={}));const r=new i(0,255,0),c=new i(255,0,0),a=r.toRGB();function u(t){const e=t.reduce(((t,e)=>t.stableScore<e.stableScore?t:e));t.forEach((t=>{t.hasLeastStableScore=!1})),e.hasLeastStableScore=!0}function l(t){t.stableScore+=t.stableCount}function h(t,e){e.hasLeastStableScore&&(t.fillStyle="#fffd",t.beginPath(),t.arc(e.position.x,e.position.y,e.r/5,0,2*Math.PI),t.fill(),t.closePath())}class d{save(){this.position_history[this.current_idx]=this.position,this.current_idx=++this.current_idx%100}getVA(){const t=[];for(let e=0;e<100;++e){const n=(e+this.current_idx)%100,o=e/100;t[e]||(t[e]={}),t[e].position=this.position_history[n];const s=255*o;t[e].color=new i(0,s,0)}return t}draw(t,e){n.drawTraces&&this.drawTrace(e),t.fillStyle=this.color.toRGB(),t.beginPath(),t.arc(this.position.x,this.position.y,this.r,0,2*Math.PI),n.strokeBalls&&this.drawStroke(t),t.fill(),t.closePath(),this.drawStableScore(t)}drawStroke(t){t.strokeStyle="#000a",t.stroke()}drawTrace(t){const e=this.getVA(),n=e[0].position;t.beginPath(),e.forEach((e=>{t.lineTo(e.position.x,e.position.y)})),t.lineTo(this.position.x,this.position.y),t.moveTo(n.x,n.y),t.closePath(),this.applyTraceColor(t,n)}applyTraceColor(t,e){const n=t.createLinearGradient(e.x,e.y,this.position.x,this.position.y);n.addColorStop(0,"transparent"),n.addColorStop(1,a),t.strokeStyle=n,t.stroke()}drawStableScore(t){h(t,this)}constructor(t,n,i){this.r=i,this.stableScore=0,this.hasLeastStableScore=!1,this.position=new o(t,n),this.velocity=new o(e(-4,4),e(-4,4)),this.r=i,this.position_history=Array(100).fill(this.position),this.current_idx=0,this.stableCount=0}}function m(t){t.scale!==f&&t.preventDefault()}const f=1;function y(t){return void 0!==t.scale}let w=.35;const v=5e3,p=500;function b(t,e){return n=t.clientX,i=t.clientY,o=e.clientX,s=e.clientY,Math.sqrt(Math.pow(n-o,2)+Math.pow(i-s,2));var n,i,o,s}const x=.01,g=.5;function S(t,e){if(!n.dragWithMouseOver)return;const i=t(e);return function(t){const e=i.sub(t.position),n=s.length(e),o=t.r;n<o&&(t.position=t.position.add(e.mul(x*(o-n))),t.velocity=t.velocity.add(e.mul(g*(o-n))))}}function L(t,e,n=!1){window.addEventListener(n?"keydown":"keyup",(n=>{n.code!==t&&n.key!==t||e()}))}function k(t,e=300){function n(n){const i=()=>{t(n),s()};function o(){window.removeEventListener("touchend",i)}function s(){window.removeEventListener("touchmove",o)}window.addEventListener("touchend",i,{once:!0}),window.addEventListener("touchmove",o,{once:!0}),setTimeout((()=>{o(),s()}),e)}return window.addEventListener("touchstart",n),n}let M;function _(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}class E{changeState(t){var e,n;this.isKeyCodeInKeysList(t.code)&&(this.keys[t.code]="keydown"===t.type,!t.repeat&&this.keys[t.code]&&(null===(n=(e=this.callbacks)[t.code])||void 0===n||n.call(e),setTimeout((()=>{this.repeat(t)}),E.keyRepeatDelay)))}isKeyCodeInKeysList(t){return this.keysList.includes(t)}repeat(t){if(!this.keys[t.code])return;const e=setInterval((()=>{var n,i;this.keys[t.code]?null===(i=(n=this.callbacks)[t.code])||void 0===i||i.call(n):clearInterval(e)}),E.keyRepeatInterval)}constructor(t){this.keysList=t,this.callbacks={},this.keys=Object.fromEntries(this.keysList.map((t=>[t,!1]))),window.addEventListener("keydown",this.changeState.bind(this)),window.addEventListener("keyup",this.changeState.bind(this))}}_(E,"keyRepeatInterval",60),_(E,"keyRepeatDelay",E.keyRepeatInterval);const P={radius:{increment:"BracketRight",decrement:"BracketLeft",incrementFast:"}",decrementFast:"{"},velocity:{increment:"ArrowUp",decrement:"ArrowDown",rotateLeft:"ArrowLeft",rotateRight:"ArrowRight"}},R={default:.1,fast:.3},C={default:.2};function T(t,e){const n=t.r+t.r*e;t.r=Math.max(n,5)}function A(t,e){if(M)e(M);else for(const n of t)e(n)}function $(t){t.velocity=t.velocity.mul(1+C.default)}function H(t){t.velocity=t.velocity.mul(1-C.default)}function I(t){t.velocity=s.rotate(t.velocity,C.default,s.RotationDirection.Left)}function q(t){t.velocity=s.rotate(t.velocity,C.default,s.RotationDirection.Right)}class B extends class{cycle(t){this.animation_frame_request=window.requestAnimationFrame(this.startCycle),this.accumulated_time+=t-this.time,this.time=t;let e=!1;for(this.accumulated_time>1e3&&(this.accumulated_time=this.time_step);this.accumulated_time>this.time_step;)this.accumulated_time-=this.time_step,this.update(t),e=!0;return e&&this.render(),e}start(){this.animation_frame_request=window.requestAnimationFrame(this.startCycle)}stop(){window.cancelAnimationFrame(this.animation_frame_request)}constructor(t,e,n){this.update=t,this.render=e,this.time_step=n,this.animation_frame_request=void 0,this.accumulated_time=n,this.time=0,this.startCycle=t=>{this.cycle(t)}}}{getFPS(){return this.renderHistory=this.renderHistory.filter((t=>t>Date.now()-1e3)),this.renderHistory.length}getUPS(){return Math.round(1e3/this.time_step)}cycle(t){const e=performance.now(),n=super.cycle(t),i=performance.now()-e;return this.handleMaximumUPSCalculation(i),n&&this.renderHistory.push(Date.now()),n}handleMaximumUPSCalculation(t){const e=Math.max(30,this.getFPS())/(1e3/t),n=1/e,i=this.getUPS()*n;if(i!==1/0)if(e>1){const t=.9;this.maximumSpeedHistory.push(i/(e*t))}else this.maximumSpeedHistory.push(i);this.maximumSpeedHistory.length>=50&&this.maximumSpeedHistory.shift()}getRecommendedMaximumUPS(){return Math.round(this.maximumSpeedHistory.reduce(((t,e)=>t+e),0)/this.maximumSpeedHistory.length)}constructor(...t){super(...t),_(this,"renderHistory",[]),_(this,"maximumSpeedHistory",[])}}function D(t,e,i,o){const s=100*n.bounciness,r=t.mul(e*s*-1);i.velocity=i.velocity.sub(r.div(i.r)),o.velocity=o.velocity.add(r.div(o.r))}function F(t,e){const n=10**e;return Math.round(t*n)/n}const z=document.querySelector("#stats");function U(t,e,n,i){const o=[`FPS: ${t.getFPS()}`,`Speed: ${t.getUPS()}${1===e?"":` / ${e}`}`,`Zoom: ${F(n,2)}`,`Balls: ${i.length}`,"Approximate Stability: "+(s=i,r=t=>t.stableCount>255,`${Math.round(s.filter(r).length/s.length*100)}%`),`Recommended Maximum Speed: ${t.getRecommendedMaximumUPS()}`];var s,r;z.innerText=o.join("; ")}const K=document.querySelector("#balls"),O=K.getContext("2d"),j=document.querySelector("#traces"),G=j.getContext("2d");function Y(){W(K),W(j)}function W(t){t.width=window.innerWidth,t.height=window.innerHeight}Y(),window.addEventListener("resize",Y),function(){let t=.1;window.addEventListener("wheel",(({deltaY:t})=>{n(-t/v*function(){const t={scalingEasiness:.18},e=1.55,n=Math.abs(-e/w),i=n/(10*e);return t.scalingEasiness/i}())}));const e=null!==navigator.userAgent.match(/iPhone|iPad|iPod/i);function n(e){t+=e,t<0&&(t=0),t>1&&(t=1),w=2.9*t+.1}!function(){let t=null;window.addEventListener("touchstart",(({touches:e})=>{e.length>1&&(t=b(e[0],e[1]))})),window.addEventListener("touchend",(()=>{t=null})),window.addEventListener("touchmove",(i=>{if(e){if(!y(i))return;m(i)}const{touches:o}=i;if(null!==t){const e=b(o[0],o[1]);n((e-t)/p),t=e}}),e?{passive:!1}:void 0)}()}();let X=1,V=1,J=1,Z=1;const N=[];var Q,tt,et,nt;function it(){Z=1===X?10:1}!function(){for(let n=0;n<20;n++){const n=t(2*Math.PI),i=350,o=i*Math.cos(n),s=i*Math.sin(n);N.push(new d(o+.5*K.width,s+.5*K.height,e(70,5)))}}(),Q=N,tt=ht,et=70,nt=5,window.addEventListener("contextmenu",(t=>{t.preventDefault();const n=tt(t),i=new d(n.x,n.y,e(et,nt));(function(t,e){const n=t.find((t=>t.hasLeastStableScore));n&&(e.stableScore=n.stableScore)})(Q,i),Q.push(i)})),function(t,e,n){function i(i){const o=e(i);!function(t){if(!t)return;M=M===t?null:t}(n(o,t))}window.addEventListener("click",i),k((t=>{if(1!==t.touches.length)return;const e=t.touches[0];i({x:e.clientX,y:e.clientY})})),L("Escape",(()=>{M=null}))}(N,ht,(function(t,e){for(const n of e){const e=t.sub(n.position);if(s.length(e)<n.r)return n}return null})),function(t){const e=new E(Object.values(P).flatMap(Object.values));!function(t,e){e.callbacks[P.radius.increment]=()=>{A(t,(t=>{T(t,R.default)}))},e.callbacks[P.radius.decrement]=()=>{A(t,(t=>{T(t,-R.default)}))},L(P.radius.incrementFast,(()=>{A(t,(t=>{T(t,R.fast)}))}),!0),L(P.radius.decrementFast,(()=>{A(t,(t=>{T(t,-R.fast)}))}),!0)}(t,e),function(t,e){e.callbacks[P.velocity.increment]=()=>{A(t,$)},e.callbacks[P.velocity.decrement]=()=>{A(t,H)},e.callbacks[P.velocity.rotateLeft]=()=>{A(t,I)},e.callbacks[P.velocity.rotateRight]=()=>{A(t,q)}}(t,e)}(N),L("Space",it),function(t,e=500,n=200){function i(i){const o=setTimeout((()=>{setTimeout((()=>{t(i)}),n),window.removeEventListener("touchend",s),window.removeEventListener("touchmove",r)}),e);function s(){c(),window.removeEventListener("touchmove",r)}function r(){c(),window.removeEventListener("touchend",s)}function c(){clearTimeout(o)}window.addEventListener("touchend",s,{once:!0}),window.addEventListener("touchmove",r,{once:!0})}window.addEventListener("touchstart",i)}(it),L("a",(function(){n.drawTraces=!n.drawTraces}));let ot=0;const st={x:0,y:0};window.addEventListener("mousemove",(t=>{st.x=t.x,st.y=t.y}));const rt=new B((function(t){U(rt,X,w,N),J!==Z&&(J+=Z-J);let e=!0;if(!V){for(const t of N)t.stable=!0,t.save();e=function(t,e){let n=!0;u(t);const i=t.length,s=.01,r=new o(.5*K.width,.5*K.width),c=S(ht,st);for(let e=0;e<i;e++){const o=t[e],a=r.sub(o.position);o.velocity=o.velocity.add(a.mul(s)),null==c||c(o);for(let s=e+1;s<i;s++){const e=t[s],i=()=>{n=!1,o.stable=!1,e.stable=!1};dt(o,e,i)}}for(let e=0;e<i;e++)t[e].stable?t[e].stableCount++:t[e].stableCount=0,l(t[e]);return n}(N),!e&&ot<200&&(ot=0),e&&++ot,J&&(X=J),V=X}(function(t,e){const n=.016;for(const i of t)i.position=i.position.add(i.velocity.mul(n/e));V--})(N,X),at=new o(0,0);for(const t of N){const e=ot>199?1:Math.min(1,t.stableCount/255),n=r.mul(e).add(c.mul(1-e));let i=t.r;X>1&&(i=t.r),at=at.add(t.position),t.color=n}at=at.div(N.length)}),(function(){ut(O),ut(G),N.forEach((t=>t.draw(O,G))),t=O,t.fillStyle="purple",t.beginPath(),t.arc(at.x,at.y,10,0,2*Math.PI),t.fill(),t.closePath(),O.restore(),G.restore();var t}),1e3/60);var ct;let at;function ut(t){t.clearRect(0,0,t.canvas.width,t.canvas.height),t.save(),t.scale(w,w),t.translate(...lt())}function lt(){return[-(t=M?M.position:at).x+.5*K.width/w,-t.y+.5*K.height/w];var t}function ht(t){const e=new o(t.x,t.y),[n,i]=lt(),s=new o(n,i);return e.div(w).sub(s)}function dt(t,e,i){const o=t.position.sub(e.position),r=s.length(o),c=t.r+e.r;r<c&&(null==i||i(),function(t,e,i,o,s){const r=t.div(e);n.bounciness>0&&D(r,i,o,s);o.position=o.position.add(r.mul(.5*(i-e))),s.position=s.position.sub(r.mul(.5*(i-e))),n.useAntiCollisionBug||(o.velocity=o.velocity.add(r.mul(.5*(i-e))),s.velocity=s.velocity.sub(r.mul(.5*(i-e))))}(o,r,c,t,e))}rt.start(),L("KeyJ",function(t){return()=>{t.time_step=Math.min(600,1.1*t.time_step)}}(ct=rt),!0),L("KeyL",function(t){const e=.9,n=t instanceof B;return()=>{const i=t.time_step*e;if(n){const e=Math.round(1e3/i),n=.9,o=t.getRecommendedMaximumUPS()*n;if(e<=o)t.time_step=i;else{const e=1e3/o;e<t.time_step&&(t.time_step=e)}}else t.time_step=i}}(ct),!0);