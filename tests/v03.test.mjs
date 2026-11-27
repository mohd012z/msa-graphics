import test from 'node:test';import assert from 'node:assert/strict';import {chooseBackend,budget,waveParams} from '../engine/render.mjs';
test('fallback order and error evidence',async()=>{const r=await chooseBackend([['gpu',()=>{throw Error('missing')}],['canvas',()=>({ok:true})]]);assert.equal(r.name,'canvas');assert.deepEqual(r.errors,['gpu: missing']);});
test('all backends fail explicitly',async()=>{await assert.rejects(chooseBackend([['gpu',()=>{throw Error('missing')}]]),/gpu: missing/);});
test('quality budget',()=>{assert.equal(budget('balanced').rgbaBytes,960*540*4);assert.throws(()=>budget('__proto__'));});
test('wave uniform contract',()=>{const a=waveParams({depth:1.5,period:2,amplitude:.3},1,.04);assert.equal(a.byteLength,16);assert.ok(a.every(Number.isFinite));assert.ok(Math.abs(a[1]-Math.PI)<1e-6);});
