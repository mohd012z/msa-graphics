import {command} from './core.mjs';
export function decodeProject(raw){if(typeof raw!=='string'||raw.length>4096)throw Error('Invalid project');const p=JSON.parse(raw);if(!p||p.version!==1||!p.scene||Object.keys(p.scene).length!==3)throw Error('Invalid schema');let s={depth:1.5,period:2,amplitude:.3};for(const action of ['depth','period','amplitude'])s=command(s,{action,value:p.scene[action]});return s;}
export function encodeProject(scene){const raw=JSON.stringify({version:1,scene});decodeProject(raw);return raw;}
