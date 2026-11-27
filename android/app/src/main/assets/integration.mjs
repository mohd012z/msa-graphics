import {adapter} from './advanced.mjs';
export function importGraph(raw){if(typeof raw!=='string'||raw.length>2000000)throw RangeError('document size');const g=JSON.parse(raw);if(g.version!==1)throw RangeError('version');return adapter(g.source,g);}
export function layoutGraph(g){const n=g.nodes.length;return g.nodes.map((v,i)=>({id:v.id,x:Math.cos(i*2.399963229728653)*Math.sqrt((i+.5)/Math.max(1,n)),y:Math.sin(i*2.399963229728653)*Math.sqrt((i+.5)/Math.max(1,n))}));}
export function thermalBudget(status){if(!Number.isInteger(status)||status<0||status>6)throw RangeError('thermal status');return {suspended:status>=5,instances:status>=5?0:status>=3?32:status>=2?64:128,fps:status>=3?15:30};}
