import test from 'node:test'
import assert from 'node:assert/strict'
import { layers, edges, flows, integrations } from '../app/data/architecture.ts'

test('architecture references point to existing components', () => {
  const parts = layers.flatMap(l => l.groups.flatMap(g => g.parts))
  const ids = new Set(parts.map(p => p.id))
  assert.equal(ids.size, parts.length, 'component ids are unique')
  const pairs = new Set()
  for (const [a, b] of edges) {
    assert.ok(ids.has(a) && ids.has(b), `edge ${a} ↔ ${b} uses an unknown id`)
    assert.notEqual(a, b)
    const key = [a, b].sort().join('|')
    assert.ok(!pairs.has(key), `duplicate edge ${key}`)
    pairs.add(key)
  }
  for (const id of ids) assert.ok(edges.some(e => e.includes(id)), `${id} has no connections`)
  for (const f of flows) for (const s of f.steps) assert.ok(ids.has(s.id), `flow step uses unknown ${s.id}`)
})

test('integration messages point to actors of their phase', () => {
  for (const i of integrations) for (const p of i.phases) for (const m of p.msgs) {
    assert.ok(p.actors[m.from] && p.actors[m.to], `${i.title.en}: message "${m.text.en}" has no actor`)
  }
})
