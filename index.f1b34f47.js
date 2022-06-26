function t(t,i){return Math.random()*(i-t)+t}const i={drawTraces:!0};window.settings=i;class n{constructor(t,i,n){this.x=t,this.y=i,this.z=n}add(t){return new n(this.x+t.x,this.y+t.y,this.z+t.z)}sub(t){return new n(this.x-t.x,this.y-t.y,this.z-t.z)}mul(t){return new n(this.x*t,this.y*t,this.z*t)}div(t){return new n(this.x/t,this.y/t,this.z/t)}toRGB(){return`rgb(${this.x} ${this.y} ${this.z})`}toRGBA(t){return`rgba(${this.x}, ${this.y}, ${this.z}, ${t})`}}class o{constructor(t,i){this.x=t,this.y=i}add(t){return new o(this.x+t.x,this.y+t.y)}sub(t){return new o(this.x-t.x,this.y-t.y)}mul(t){return new o(this.x*t,this.y*t)}div(t){return new o(this.x/t,this.y/t)}}class e{constructor(i,n,e){this.r=e,this.position=new o(i,n),this.velocity=new o(t(-4,4),t(-4,4)),this.r=e,this.position_history=[],this.current_idx=0;for(let t=0;t<100;t+=1)this.position_history.push(new o(i,n));this.stableCount=0}save(){this.position_history[this.current_idx]=this.position,this.current_idx=++this.current_idx%100}getVA(){const t=[];for(let i=0;i<100;++i){const o=(i+this.current_idx)%100,e=i/100;t[i]||(t[i]={}),t[i].position=this.position_history[o];const s=255*e;t[i].color=new n(0,s,0)}return t}draw(t){i.drawTraces&&this.drawTrace(t),t.fillStyle=this.color.toRGB(),t.beginPath(),t.arc(this.position.x,this.position.y,this.r,0,2*Math.PI),t.fill(),t.closePath()}drawTrace(t){const i=this.getVA(),n=i[0].position;t.beginPath(),i.forEach((i=>{t.lineTo(i.position.x,i.position.y)})),t.moveTo(n.x,n.y),t.closePath(),this.applyTraceColor(t,n)}applyTraceColor(t,i){const n=t.createLinearGradient(i.x,i.y,this.position.x,this.position.y);n.addColorStop(0,"transparent"),n.addColorStop(1,s),t.strokeStyle=n,t.stroke()}}const s=new n(0,255,0).toRGB();let r=.35;const h=document.querySelector("canvas"),a=h.getContext("2d");function c(){h.width=window.innerWidth,h.height=window.innerHeight}c(),window.addEventListener("resize",c);const l=new n(0,255,0),d=new n(255,0,0);!function(){let t=.1;window.addEventListener("wheel",(({deltaY:t})=>{n(-t/5e3)}));let i=null;function n(i){t+=i,t<0&&(t=0),t>1&&(t=1),r=2.9*t+.1}window.addEventListener("touchstart",(({touches:t})=>{t.length>1&&(i=Math.sqrt(Math.pow(t[0].clientX-t[1].clientX,2)+Math.pow(t[0].clientY-t[1].clientY,2)))})),window.addEventListener("touchend",(()=>{i=null})),window.addEventListener("touchmove",(({touches:t})=>{if(null!==i){n((Math.sqrt(Math.pow(t[0].clientX-t[1].clientX,2)+Math.pow(t[0].clientY-t[1].clientY,2))-i)/1e3)}}))}();let u=1,w=1,y=1,p=1;const x=[];for(let i=0;i<20;i++){const i=t(0,2*Math.PI),n=350,o=n*Math.cos(i),s=n*Math.sin(i);x.push(new e(o+.5*h.width,s+.5*h.height,t(70,5)))}m("Space",(function(){p=1===u?10:1})),m("a",(function(){i.drawTraces=!i.drawTraces}));let f=0;const v={x:0,y:0};function m(t,i){window.addEventListener("keyup",(n=>{n.code!==t&&n.key!==t||i()}))}window.addEventListener("mousemove",(t=>{v.x=t.x,v.y=t.y})),window.requestAnimationFrame((function t(i){y!==p&&(y+=p-y);let n=!0;if(!w){for(const t of x)t.stable=!0,t.save();n=function(t,i){let n=!0;const e=t.length,s=.01,r=new o(.5*h.width,.5*h.width);for(let i=0;i<e;i++){const o=t[i],h=r.sub(o.position);o.velocity=o.velocity.add(h.mul(s));for(let s=i+1;s<e;s++){const i=t[s],e=o.position.sub(i.position),r=Math.sqrt(e.x*e.x+e.y*e.y),h=o.r+i.r;if(r<h){n=!1,o.stable=!1,i.stable=!1;const t=e.div(r);o.position=o.position.add(t.mul(.5*(h-r))),i.position=i.position.sub(t.mul(.5*(h-r)))}}}for(let i=0;i<e;i++)t[i].stable?t[i].stableCount++:t[i].stableCount=0;return n}(x),!n&&f<200&&(f=0),n&&++f,y&&(u=y),w=u}!function(t,i){const n=.016;for(const o of t)o.position=o.position.add(o.velocity.mul(n/i));w--}(x,u);let e=new o(0,0);for(const t of x){const i=f>199?1:Math.min(1,t.stableCount/255),n=l.mul(i).add(d.mul(1-i));let o=t.r;u>1&&(o=t.r),e=e.add(t.position),t.color=n}e=e.div(x.length),a.clearRect(0,0,h.width,h.height),a.save(),a.scale(r,r),a.translate(-e.x+.5*h.width/r,-e.y+.5*h.height/r),x.forEach((t=>t.draw(a))),a.fillStyle="purple",a.beginPath(),a.arc(e.x,e.y,10,0,2*Math.PI),a.fill(),a.closePath(),a.restore(),window.requestAnimationFrame(t)}));