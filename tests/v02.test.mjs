import test from 'node:test';import assert from 'node:assert/strict';import {fft} from '../engine/fft.mjs';import {decodeProject,encodeProject} from '../engine/project.mjs';
test('FFT impulse',()=>{const r=[1,0,0,0],i=[0,0,0,0];fft(r,i);assert.deepEqual(r,[1,1,1,1]);});
test('FFT roundtrip',()=>{const src=[1,2,3,4,5,6,7,8],r=[...src],i=Array(8).fill(0);fft(r,i);fft(r,i,true);r.forEach((v,j)=>assert.ok(Math.abs(v-src[j])<1e-10));i.forEach(v=>assert.ok(Math.abs(v)<1e-10));});
test('FFT rejects invalid size',()=>assert.throws(()=>fft([1,2,3],[0,0,0])));
test('FFT rejects nonfinite',()=>assert.throws(()=>fft([NaN],[0])));
test('project roundtrip',()=>{const s={depth:1.5,period:2,amplitude:.3};assert.deepEqual(decodeProject(encodeProject(s)),s);});
test('project rejects invalid version',()=>assert.throws(()=>decodeProject('{"version":2}')));
test('project rejects out of range',()=>assert.throws(()=>encodeProject({depth:-1,period:2,amplitude:.3})));
test('project rejects oversized',()=>assert.throws(()=>decodeProject(' '.repeat(4097))));
