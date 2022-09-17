!function(){function t(t){if(Array.isArray(t))return t}function e(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function o(t,e){if(t){if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function r(i,r){return t(i)||e(i)||o(i,r)||n()}function a(t){if(Array.isArray(t))return i(t)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t){return a(t)||e(t)||o(t)||u()}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function h(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}function f(t,e){return Math.random()*(e-t)+t}var d={drawTraces:!0,useAntiCollisionBug:!0,strokeBalls:!1,dragWithMouseOver:!1,bounciness:0};window.settings=d;var v,y,w,m=function(){"use strict";function t(e,n,i){s(this,t),this.x=e,this.y=n,this.z=i}return h(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y,this.z+e.z)}},{key:"sub",value:function(e){return new t(this.x-e.x,this.y-e.y,this.z-e.z)}},{key:"mul",value:function(e){return new t(this.x*e,this.y*e,this.z*e)}},{key:"div",value:function(e){return new t(this.x/e,this.y/e,this.z/e)}},{key:"toRGB",value:function(){return"rgb(".concat(this.x," ").concat(this.y," ").concat(this.z,")")}},{key:"toRGBA",value:function(t){return"rgba(".concat(this.x,", ").concat(this.y,", ").concat(this.z,", ").concat(t,")")}}]),t}(),p=function(){"use strict";function t(e,n){s(this,t),this.x=e,this.y=n}return h(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y)}},{key:"sub",value:function(e){return new t(this.x-e.x,this.y-e.y)}},{key:"mul",value:function(e){return new t(this.x*e,this.y*e)}},{key:"div",value:function(e){return new t(this.x/e,this.y/e)}}]),t}();(y=v||(v={})).length=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},y.rotate=function(t,e,n){var i=Math.atan2(t.y,t.x)-Math.PI/2*e*n;return new p(Math.cos(i),Math.sin(i)).mul(v.length(t))},(w=y.RotationDirection||(y.RotationDirection={}))[w.Left=1]="Left",w[w.Right=-1]="Right";var b=new m(0,255,0),g=new m(255,0,0),x=b.toRGB();function S(t){var e=t.reduce((function(t,e){return t.stableScore<e.stableScore?t:e}));t.forEach((function(t){t.hasLeastStableScore=!1})),e.hasLeastStableScore=!0}function L(t){t.stableScore+=t.stableCount}function k(t,e){e.hasLeastStableScore&&(t.fillStyle="#fffd",t.beginPath(),t.arc(e.position.x,e.position.y,e.r/5,0,2*Math.PI),t.fill(),t.closePath())}var E=100,_=function(){"use strict";function t(e,n,i){s(this,t),this.r=i,this.stableScore=0,this.hasLeastStableScore=!1,this.position=new p(e,n),this.velocity=new p(f(-4,4),f(-4,4)),this.r=i,this.position_history=Array(E).fill(this.position),this.current_idx=0,this.stableCount=0}return h(t,[{key:"save",value:function(){this.position_history[this.current_idx]=this.position,this.current_idx=++this.current_idx%E}},{key:"getVA",value:function(){for(var t=[],e=0;e<E;++e){var n=(e+this.current_idx)%E,i=e/E;t[e]||(t[e]={}),t[e].position=this.position_history[n];var o=255*i;t[e].color=new m(0,o,0)}return t}},{key:"draw",value:function(t){d.drawTraces&&this.drawTrace(t),t.fillStyle=this.color.toRGB(),t.beginPath(),t.arc(this.position.x,this.position.y,this.r,0,2*Math.PI),d.strokeBalls&&this.drawStroke(t),t.fill(),t.closePath(),this.drawStableScore(t)}},{key:"drawStroke",value:function(t){t.strokeStyle="#000a",t.stroke()}},{key:"drawTrace",value:function(t){var e=this.getVA(),n=e[0].position;t.beginPath(),e.forEach((function(e){t.lineTo(e.position.x,e.position.y)})),t.lineTo(this.position.x,this.position.y),t.moveTo(n.x,n.y),t.closePath(),this.applyTraceColor(t,n)}},{key:"applyTraceColor",value:function(t,e){var n=t.createLinearGradient(e.x,e.y,this.position.x,this.position.y);n.addColorStop(0,"transparent"),n.addColorStop(1,x),t.strokeStyle=n,t.stroke()}},{key:"drawStableScore",value:function(t){k(t,this)}}]),t}();var A=1;var M=.35,T=.1,C=5e3,P=1e3,R=.2;function z(t,e){return n=t.clientX,i=t.clientY,o=e.clientX,r=e.clientY,Math.sqrt(Math.pow(n-o,2)+Math.pow(i-r,2));var n,i,o,r}function I(){return.18/(Math.abs(-1.55/M)/15.5)}var q,B=.01,D=.5;function F(t,e){if(d.dragWithMouseOver){var n=t(e);return function(t){var e=n.sub(t.position),i=v.length(e),o=t.r;i<o&&(t.position=t.position.add(e.mul(B*(o-i))),t.velocity=t.velocity.add(e.mul(D*(o-i))))}}}function j(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];window.addEventListener(n?"keydown":"keyup",(function(n){n.code!==t&&n.key!==t||e()}))}function G(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=function(n){var i=function(){t(n),r()};function o(){window.removeEventListener("touchend",i)}function r(){window.removeEventListener("touchmove",o)}window.addEventListener("touchend",i,{once:!0}),window.addEventListener("touchmove",o,{once:!0}),setTimeout((function(){o(),r()}),e)};return window.addEventListener("touchstart",n),n}var O={increment:"]",decrement:"[",incrementFast:"}",decrementFast:"{"},Y={increment:"ArrowUp",decrement:"ArrowDown",rotateLeft:"ArrowLeft",rotateRight:"ArrowRight"},W={default:.1,fast:.3},X={default:.2};function U(t,e){var n=t.r+t.r*e;t.r=Math.max(n,5)}var V=function(){"use strict";function t(e,n,i){var o=this;s(this,t),this.update=e,this.render=n,this.time_step=i,this.animation_frame_request=void 0,this.accumulated_time=i,this.time=0,this.startCycle=function(t){o.cycle(t)}}return h(t,[{key:"cycle",value:function(t){this.animation_frame_request=window.requestAnimationFrame(this.startCycle),this.accumulated_time+=t-this.time,this.time=t;var e=!1;for(this.accumulated_time>1e3&&(this.accumulated_time=this.time_step);this.accumulated_time>this.time_step;)this.accumulated_time-=this.time_step,this.update(t),e=!0;e&&this.render()}},{key:"start",value:function(){this.animation_frame_request=window.requestAnimationFrame(this.startCycle)}},{key:"stop",value:function(){window.cancelAnimationFrame(this.animation_frame_request)}}]),t}();function H(t,e,n,i){var o=100*d.bounciness,r=t.mul(e*o*-1);n.velocity=n.velocity.sub(r.div(n.r)),i.velocity=i.velocity.add(r.div(i.r))}var $,J,K,N=document.querySelector("canvas"),Q=N.getContext("2d");function Z(){N.width=window.innerWidth,N.height=window.innerHeight}Z(),window.addEventListener("resize",Z),J=function(t){(K+=t)<0&&(K=0),K>1&&(K=1),M=2.9*K+T},K=.1,window.addEventListener("wheel",(function(t){var e=t.deltaY;J(-e/C*I())})),null!==navigator.userAgent.match(/iPhone|iPad|iPod/i)?window.addEventListener("touchmove",(function(t){var e,n,i,o;(function(t){return void 0!==t.scale})(t)&&(function(t){t.scale!==A&&t.preventDefault()}(t),e=t.scale,n=e-A,i=I()*R,o=M+n*R*i,M=Math.min(3,Math.max(T,o)))}),{passive:!1}):($=null,window.addEventListener("touchstart",(function(t){var e=t.touches;e.length>1&&($=z(e[0],e[1]))})),window.addEventListener("touchend",(function(){$=null})),window.addEventListener("touchmove",(function(t){var e=t.touches;if(null!==$){var n=z(e[0],e[1]);J((n-$)/P)}})));for(var tt,et,nt,it,ot=1,rt=1,at=1,ut=1,ct=[],st=0;st<20;st++){var lt=f(0,2*Math.PI),ht=350*Math.cos(lt),ft=350*Math.sin(lt);ct.push(new _(ht+.5*N.width,ft+.5*N.height,f(70,5)))}function dt(){ut=1===ot?10:1}tt=ct,et=pt,nt=70,it=5,window.addEventListener("contextmenu",(function(t){t.preventDefault();var e=et(t),n=new _(e.x,e.y,f(nt,it));(function(t,e){var n=t.find((function(t){return t.hasLeastStableScore}));n&&(e.stableScore=n.stableScore)})(tt,n),tt.push(n)})),function(t,e,n){var i=function(i){var o=e(i);!function(t){if(!t)return;q=q===t?null:t}(n(o,t))};window.addEventListener("click",i),G((function(t){if(1===t.touches.length){var e=t.touches[0];i({x:e.clientX,y:e.clientY})}})),j("Escape",(function(){q=null}))}(ct,pt,(function(t,e){var n=!0,i=!1,o=void 0;try{for(var r,a=e[Symbol.iterator]();!(n=(r=a.next()).done);n=!0){var u=r.value,c=t.sub(u.position);if(v.length(c)<u.r)return u}}catch(t){i=!0,o=t}finally{try{n||null==a.return||a.return()}finally{if(i)throw o}}return null})),j(O.increment,(function(){q&&U(q,W.default)}),!0),j(O.decrement,(function(){q&&U(q,-W.default)}),!0),j(O.incrementFast,(function(){q&&U(q,W.fast)}),!0),j(O.decrementFast,(function(){q&&U(q,-W.fast)}),!0),j(Y.increment,(function(){q&&(q.velocity=q.velocity.mul(1+X.default))}),!0),j(Y.decrement,(function(){q&&(q.velocity=q.velocity.mul(1-X.default))}),!0),j(Y.rotateLeft,(function(){q&&(q.velocity=v.rotate(q.velocity,X.default,v.RotationDirection.Left))}),!0),j(Y.rotateRight,(function(){q&&(q.velocity=v.rotate(q.velocity,X.default,v.RotationDirection.Right))}),!0),j("Space",dt),function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200,i=function(i){var o=setTimeout((function(){setTimeout((function(){t(i)}),n),window.removeEventListener("touchend",r),window.removeEventListener("touchmove",a)}),e);function r(){u(),window.removeEventListener("touchmove",a)}function a(){u(),window.removeEventListener("touchend",r)}function u(){clearTimeout(o)}window.addEventListener("touchend",r,{once:!0}),window.addEventListener("touchmove",a,{once:!0})};window.addEventListener("touchstart",i)}(dt),j("a",(function(){d.drawTraces=!d.drawTraces}));var vt,yt=0,wt={x:0,y:0};function mt(){return[-(t=q?q.position:vt).x+.5*N.width/M,-t.y+.5*N.height/M];var t}function pt(t){var e=new p(t.x,t.y),n=r(mt(),2),i=n[0],o=n[1],a=new p(i,o);return e.div(M).sub(a)}window.addEventListener("mousemove",(function(t){wt.x=t.x,wt.y=t.y})),new V((function(t){at!==ut&&(at+=ut-at);var e=!0;if(!rt){var n=!0,i=!1,o=void 0;try{for(var r,a=ct[Symbol.iterator]();!(n=(r=a.next()).done);n=!0){var u=r.value;u.stable=!0,u.save()}}catch(t){i=!0,o=t}finally{try{n||null==a.return||a.return()}finally{if(i)throw o}}!(e=function(t,e){var n=!0;S(t);for(var i=t.length,o=.01,r=new p(.5*N.width,.5*N.width),a=F(pt,wt),u=0;u<i;u++){var c=t[u],s=r.sub(c.position);c.velocity=c.velocity.add(s.mul(o)),null==a||a(c);for(var l=u+1;l<i;l++){var h=t[l],f=c.position.sub(h.position),y=v.length(f),w=c.r+h.r;if(y<w){n=!1,c.stable=!1,h.stable=!1;var m=f.div(y);d.bounciness>0&&H(m,w,c,h),c.position=c.position.add(m.mul(.5*(w-y))),h.position=h.position.sub(m.mul(.5*(w-y))),d.useAntiCollisionBug||(c.velocity=c.velocity.add(m.mul(.5*(w-y))),h.velocity=h.velocity.sub(m.mul(.5*(w-y))))}}}for(var b=0;b<i;b++)t[b].stable?t[b].stableCount++:t[b].stableCount=0,L(t[b]);return n}(ct))&&yt<200&&(yt=0),e&&++yt,at&&(ot=at),rt=ot}(function(t,e){var n=.016,i=!0,o=!1,r=void 0;try{for(var a,u=t[Symbol.iterator]();!(i=(a=u.next()).done);i=!0){var c=a.value;c.position=c.position.add(c.velocity.mul(n/e))}}catch(t){o=!0,r=t}finally{try{i||null==u.return||u.return()}finally{if(o)throw r}}rt--})(ct,ot),vt=new p(0,0);var c=!0,s=!1,l=void 0;try{for(var h,f=ct[Symbol.iterator]();!(c=(h=f.next()).done);c=!0){var y=h.value,w=yt>199?1:Math.min(1,y.stableCount/255),m=b.mul(w).add(g.mul(1-w));y.r;ot>1&&y.r,vt=vt.add(y.position),y.color=m}}catch(t){s=!0,l=t}finally{try{c||null==f.return||f.return()}finally{if(s)throw l}}vt=vt.div(ct.length)}),(function(){var t;Q.clearRect(0,0,N.width,N.height),Q.save(),Q.scale(M,M),(t=Q).translate.apply(t,c(mt())),ct.forEach((function(t){return t.draw(Q)})),Q.fillStyle="purple",Q.beginPath(),Q.arc(vt.x,vt.y,10,0,2*Math.PI),Q.fill(),Q.closePath(),Q.restore()}),1e3/60).start()}();