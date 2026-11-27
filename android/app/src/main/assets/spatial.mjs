// Independent column-major mathematics; no imported textbook source.
function vector(v,n){if(!Array.isArray(v)||v.length!==n||!v.every(Number.isFinite))throw RangeError('Invalid vector');return v;}
export function cross(a,b){vector(a,3);vector(b,3);return vector([a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],3);}
export function normalize(a){vector(a,3);let l=Math.hypot(...a);if(!l||!Number.isFinite(l))throw RangeError('Invalid length');return a.map(x=>x/l);}
export function identity(){return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];}
export function translation(v){vector(v,3);let m=identity();m.splice(12,3,...v);return m;}
export function multiply(a,b){vector(a,16);vector(b,16);return vector(Array.from({length:16},(_,i)=>{let r=i%4,c=i>>2;return [0,1,2,3].reduce((s,k)=>s+a[k*4+r]*b[c*4+k],0)}),16);}
export function transform(m,v){vector(m,16);vector(v,4);return vector(Array.from({length:4},(_,i)=>v.reduce((s,x,k)=>s+m[k*4+i]*x,0)),4);}
export function quaternion(axis,angle){if(!Number.isFinite(angle))throw RangeError('Invalid angle');return [...normalize(axis).map(x=>x*Math.sin(angle/2)),Math.cos(angle/2)];}
export function rotate(q,v){vector(q,3);vector(v,3);if(Math.abs(Math.hypot(...q)-1)>1e-8)throw RangeError('Quaternion must be unit');let u=q.slice(0,3),t=cross(u,v).map(x=>2*x),b=cross(u,t);return vector(v.map((x,i)=>x+q[3]*t[i]+b[i]),3);}
export function impulse(a,b,u,v,e){if(![a,b,u,v,e].every(Number.isFinite)||a<=0||b<=0||e<0||e>1)throw RangeError('Invalid contact');let j=(1+e)*Math.max(0,u-v)/(1/a+1/b);return vector([u-j/a,v+j/b],2);}
export function raySphere(o,d,c,r){vector(o,3);vector(c,3);d=normalize(d);if(!Number.isFinite(r)||r<=0)throw RangeError('Invalid radius');let p=o.map((x,i)=>x-c[i]),b=p.reduce((s,x,i)=>s+x*d[i],0),h=b*b-p.reduce((s,x)=>s+x*x,0)+r*r;if(!Number.isFinite(h))throw RangeError('Overflow');if(h<0)return null;let t=-b-Math.sqrt(h),f=-b+Math.sqrt(h);return t>=0?t:f>=0?f:null;}
export function validateGraph(g){if(!g||!Array.isArray(g.nodes)||!Array.isArray(g.edges)||g.nodes.length>5000||g.edges.length>20000)throw RangeError('Invalid graph');let ids=new Set();let nodes=g.nodes.map(n=>{if(typeof n?.id!=='string'||!n.id.length||n.id.length>128||ids.has(n.id))throw RangeError('Invalid ID');ids.add(n.id);return {id:n.id};});let edges=g.edges.map(e=>{if(!ids.has(e?.from)||!ids.has(e?.to))throw RangeError('Invalid edge');return {from:e.from,to:e.to};});return {nodes,edges};}
