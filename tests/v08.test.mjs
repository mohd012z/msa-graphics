import test from 'node:test';import assert from 'node:assert/strict';import {importGraph,layoutGraph,thermalBudget} from '../engine/integration.mjs';
const g={version:1,source:'rea',nodes:[{id:'a'},{id:'b'}],edges:[{from:'a',to:'b'}]};
test('versioned graph import',()=>assert.equal(importGraph(JSON.stringify(g)).source,'rea'));
test('reject unsupported version',()=>assert.throws(()=>importGraph(JSON.stringify({...g,version:2}))));
test('reject oversized graph input',()=>assert.throws(()=>importGraph(' '.repeat(2000001))));
test('layout deterministic and bounded',()=>{const p=layoutGraph(g);assert.deepEqual(p,layoutGraph(g));assert.ok(p.every(v=>Math.hypot(v.x,v.y)<=1))});
test('thermal emergency suspends',()=>assert.deepEqual(thermalBudget(5),{suspended:true,instances:0,fps:15}));
test('thermal invalid rejected',()=>assert.throws(()=>thermalBudget(2.5)));
