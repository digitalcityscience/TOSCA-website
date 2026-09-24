import { readFile, access } from 'node:fs/promises'
import assert from 'node:assert/strict'
const slugs = ['tosca-ind-1','tosca-ecu-1','tosca-pal','tosca-ind-2','tosca-ecu-2','kaba','sumo-ngcn']
const routes = ['', 'projects','about','contact','docs','docs/getting-started','docs/documentation-pipeline', ...slugs.map(s => `projects/${s}`)]
for (const language of ['', 'de/']) {
  for (const route of routes) {
    const file = `.output/public/${language}${route}${route ? '/' : ''}index.html`
    const html = await readFile(file, 'utf8')
    assert.ok(html.includes(`lang="${language ? 'de' : 'en'}"`), file)
    assert.match(html, /TOSCA/, file)
    assert.ok(!/LIG III|LIG IV|lig-3|lig-4/.test(html), `${file} excludes removed projects`)
    if (route.startsWith('projects/')) assert.ok(!/€|Funding reported|Förderung laut/.test(html), `${file} excludes monetary information`)
    assert.match(html, /<h1[ >]/, `${file} has a rendered page heading`)
    if (route === 'docs/getting-started') assert.ok(html.includes(language ? 'Mit einer Planungsfrage beginnen' : 'Start with a planning question'), file)
    assert.ok(!html.includes('Document not found'), file)
  }
}
await access('.output/public/404.html')
console.log(`Verified ${routes.length * 2} localized static pages and 404.html`)

for (const prefix of ['', 'de/']) {
  for (const slug of ['lig-3', 'lig-4']) {
    await assert.rejects(access(`.output/public/${prefix}projects/${slug}/index.html`))
  }
}
