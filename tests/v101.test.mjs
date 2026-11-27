import test from 'node:test';import assert from 'node:assert/strict';import * as p from '../engine/production.mjs';
test('image bounds preserve portrait aspect',()=>assert.deepEqual(p.imageBounds(1000,4000),{resizeWidth:320,resizeHeight:1280}));
test('image bounds do not upscale',()=>assert.deepEqual(p.imageBounds(320,200),{resizeWidth:320,resizeHeight:200}));
test('reject invalid image dimensions',()=>assert.throws(()=>p.imageBounds(0,100)));
test('PCM analysis is independent of seek order',()=>{const x=Float32Array.from({length:8192},(_,i)=>Math.sin(i*.1)*.5);const a=p.analyzeAt(x,48000,.05);p.analyzeAt(x,48000,.1);assert.deepEqual(p.analyzeAt(x,48000,.05),a)});
test('PCM beyond end is silent',()=>assert.equal(p.analyzeAt(new Float32Array(100),48000,2).rms,0));
