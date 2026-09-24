# TOSCA project website

Nuxt 4 SSG, Nuxt UI, Vite (Nuxt's default builder), Nuxt i18n, and Nuxt Content. English at `/`, German at `/de`.

## Development

Use Node.js 24 LTS.

```sh
npm ci
npm run dev
npm run typecheck
npm run generate
node scripts/check-static.mjs
```

Deploy `.output/public` to a static host. No runtime application/backend server is required. Configure the host to serve directory `index.html` files and the generated `404.html`. No production domain or publishing credentials are configured.

## Editing

- Project records: `app/data/projects.ts`.
- Interface translations: `i18n/locales/en.json` and `de.json`.
- Authored docs: `content/en/*.md` and `content/de/*.md`.
- Add new guides to the docs navigation and static-check route list.

## Generated frontend reference

TOSCA-2's existing `npm run docs` produces a TypeDoc HTML site. Import an approved artifact:

```sh
node scripts/import-api-docs.mjs /absolute/path/to/artifact v0.1.0 <full-40-character-source-commit>
npm run generate
```

The importer preserves TypeDoc links/search/assets, rejects symlinks and invalid version identifiers, refuses version overwrites, and registers the version in the documentation hub. API symbols remain in their source language. Imported HTML is executable web content: use only verified artifacts. The SHA argument records provenance; it does not independently authenticate the artifact.

`docs/frontend-docs-workflow.yml.example` is a frontend CI template that generates an artifact on every PR and main push. It has no publication permissions. Configure a separate trusted promotion job to verify repository/run/commit, download the artifact, import it, and generate this site. Keep PR references on isolated preview deployments with no production credentials; promote main/release documentation to the stable site. Clean up previews on PR closure and apply an explicit retention policy.

See `docs/IMPLEMENTATION.md` for the plan, source ambiguities, and remaining editorial/integration work.
