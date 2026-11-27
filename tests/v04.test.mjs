import test from 'node:test';import assert from 'node:assert/strict';import {Clock,advanceBody,boundingRadius} from '../engine/simulation.mjs';
test('clock freezes and excludes background time',()=>{const c=new Clock();c.tick(0);c.tick(100);const t=c.time;c.reset();c.tick(10000);assert.equal(c.time,t);});
test('fixed step independent of render frequency',()=>{function run(hz){const c=new Clock();let b={position:[0,0,0],velocity:[0,0,0]};for(let i=0;i<=hz;i++)c.tick(i*1000/hz,dt=>{b=advanceBody(b,[0,-9.81,0],dt)});return b;}assert.deepEqual(run(30),run(120));});
test('cube bounding sphere encloses corners',()=>assert.equal(boundingRadius([[1,1,1],[-1,-1,-1]]),Math.sqrt(3)));
test('invalid input rejected',()=>{assert.throws(()=>advanceBody({position:[0,0,0],velocity:[0,0,0]},[0,NaN,0],1));assert.throws(()=>new Clock().tick(NaN));});
