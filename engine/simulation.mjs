// Independently implemented deterministic simulation utilities; SI units.
const STEP=1/60;
export class Clock {
  time=0; ticks=0; last=null; accumulator=0;
  reset(){this.last=null;this.accumulator=0;}
  tick(ms,update=()=>{}){if(!Number.isFinite(ms))throw RangeError('Invalid timestamp');if(this.last===null){this.last=ms;return this.time;}this.accumulator+=Math.min(.25,Math.max(0,(ms-this.last)/1000));this.last=ms;let n=0;while(this.accumulator+1e-10>=STEP&&n<5){update(STEP);this.accumulator=Math.max(0,this.accumulator-STEP);this.time=++this.ticks*STEP;n++;}if(n===5&&this.accumulator>=STEP)this.accumulator%=STEP;return this.time;}
}
function vec(v){if(!Array.isArray(v)||v.length!==3||!v.every(Number.isFinite))throw RangeError('Invalid vector');return v;}
export function advanceBody(body,a,dt){const p=vec(body.position),v=vec(body.velocity);vec(a);if(!Number.isFinite(dt)||dt<=0||dt>1)throw RangeError('Invalid timestep');const velocity=vec(v.map((x,i)=>x+a[i]*dt));return {velocity,position:vec(p.map((x,i)=>x+velocity[i]*dt))};}
export function boundingRadius(vertices,center=[0,0,0]){vec(center);let r=0;for(const v of vertices){vec(v);r=Math.max(r,Math.hypot(...v.map((x,i)=>x-center[i])));}return r;}
