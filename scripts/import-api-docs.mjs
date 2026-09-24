import { cp, lstat, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Only import artifacts from a trusted, verified frontend workflow run.
const [sourceArg, version, commit] = process.argv.slice(2)
if (!sourceArg || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(version || '') || !/^[a-f0-9]{40}$/.test(commit || '')) {
  throw new Error('Usage: node scripts/import-api-docs.mjs <artifact-directory> <version> <40-character-commit-sha>')
}
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(sourceArg)
const destination = join(root, 'public/api', version)
const staging = `${destination}.importing`
const manifestPath = join(root, 'app/data/api-versions.json')
async function validate(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not accepted: ${path}`)
    if (entry.isDirectory()) await validate(path)
    else if (!entry.isFile()) throw new Error(`Unsupported artifact entry: ${path}`)
  }
}
if (!(await lstat(source)).isDirectory()) throw new Error('Artifact must be a directory, not a symlink')
await validate(source)
if (!(await lstat(join(source, 'index.html'))).isFile()) throw new Error('Missing TypeDoc index.html')
try { await lstat(destination); throw new Error('Version already exists; choose an immutable version identifier') } catch (error) { if (error.code !== 'ENOENT') throw error }
const versions = JSON.parse(await readFile(manifestPath, 'utf8'))
await mkdir(dirname(destination), { recursive: true })
try {
  await cp(source, staging, { recursive: true, errorOnExist: true, force: false })
  await rename(staging, destination)
  versions.unshift({ version, commit, href: `/api/${version}/index.html` })
  await writeFile(`${manifestPath}.tmp`, `${JSON.stringify(versions, null, 2)}\n`)
  await rename(`${manifestPath}.tmp`, manifestPath)
} catch (error) {
  await rm(staging, { recursive: true, force: true })
  await rm(destination, { recursive: true, force: true })
  throw error
}
console.log(`Imported ${version} (${commit}) into ${destination}`)
