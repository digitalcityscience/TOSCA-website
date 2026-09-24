import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, cp, symlink, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

test('imports an immutable reference, preserves assets, and rejects unsafe inputs', async () => {
  const root = await mkdtemp(join(tmpdir(), 'tosca-docs-test-'))
  try {
    await mkdir(join(root, 'scripts'))
    await mkdir(join(root, 'app/data'), { recursive: true })
    await mkdir(join(root, 'artifact/assets'), { recursive: true })
    await writeFile(join(root, 'app/data/api-versions.json'), '[]')
    await writeFile(join(root, 'artifact/index.html'), '<h1>Reference fixture</h1>')
    await writeFile(join(root, 'artifact/assets/search.js'), '/* fixture search */')
    await cp(new URL('./import-api-docs.mjs', import.meta.url), join(root, 'scripts/import-api-docs.mjs'))
    const run = version => spawnSync(process.execPath, [join(root, 'scripts/import-api-docs.mjs'), join(root, 'artifact'), version, 'a'.repeat(40)], { encoding: 'utf8' })
    assert.equal(run('v1').status, 0)
    assert.match(await readFile(join(root, 'public/api/v1/assets/search.js'), 'utf8'), /fixture search/)
    const manifest = JSON.parse(await readFile(join(root, 'app/data/api-versions.json'), 'utf8'))
    assert.deepEqual(manifest, [{ version: 'v1', commit: 'a'.repeat(40), href: '/api/v1/index.html' }])
    assert.notEqual(run('v1').status, 0, 'existing versions cannot be overwritten')
    assert.notEqual(run('../escape').status, 0, 'path traversal is rejected')
    await symlink(join(root, 'app/data/api-versions.json'), join(root, 'artifact/linked.json'))
    assert.notEqual(run('v2').status, 0, 'symlinks are rejected')
    assert.equal(JSON.parse(await readFile(join(root, 'app/data/api-versions.json'), 'utf8')).length, 1)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
