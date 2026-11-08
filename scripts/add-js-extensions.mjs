// TypeScript keeps relative imports as written (`./core/Editor`). Bundlers resolve those, but Node's ESM loader, which
// test runners such as Vitest use for dependencies, needs the file: this adds `.js` or `/index.js` to every relative
// import and export in the built files.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

const root = resolve(process.argv[2] ?? 'dist')
const specifier = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])(\.{1,2}\/[^'"]*?)\2/g

function withExtension(file, path) {
  if (/\.(js|json)$/.test(path)) return path
  const target = resolve(dirname(file), path)
  if (existsSync(`${target}.js`)) return `${path}.js`
  if (existsSync(join(target, 'index.js'))) return `${path}/index.js`
  throw new Error(`${file}: cannot resolve ${path}`)
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (/\.(js|d\.ts)$/.test(name)) {
      const source = readFileSync(path, 'utf8')
      const next = source.replace(specifier, (_, lead, quote, spec) => `${lead}${quote}${withExtension(path, spec)}${quote}`)
      if (next !== source) writeFileSync(path, next)
    }
  }
}

walk(root)
