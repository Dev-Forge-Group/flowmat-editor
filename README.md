# flowmat-editor

FlowMat's vector editor core as a standalone TypeScript package: the element model, geometry, selection, snapping,
tools, undo history and an SVG renderer, with a React binding. It was split out of
[FlowMat](https://github.com/Dev-Forge-Group/FlowMat) (`flowmat_frontend/src/lib/flowmat-editor/`) with its history.

The core does not depend on React Flow, any product API or any state library (`src/core/importBoundary.test.ts` checks
this). Product code, such as FlowMat's backend document format and its canvas annotation adapter, stays in the product
and imports this package.

## Entries

| Import | What it holds |
|---|---|
| `@dev-forge-group/flowmat-editor` | The core: `Editor`, the document model and elements, geometry, selection, snapping, tools, history, the SVG renderer |
| `@dev-forge-group/flowmat-editor/react` | The React binding: `SvgEditorSurface`, `SvgEditorReadOnlyLayer` and their overlays (`react` is a peer dependency) |

## Install

The package is published privately to GitHub Packages. In the consuming project's `.npmrc`:

```text
@dev-forge-group:registry=https://npm.pkg.github.com
```

On a developer machine, a classic token with `read:packages` in the user's `~/.npmrc`:

```bash
npm config set //npm.pkg.github.com/:_authToken <TOKEN>
```

In another repository's GitHub Actions, grant that repository read access in this package's settings (Manage Actions
access), give the job `packages: read`, and install with `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.

## Develop and release

```bash
npm ci
npm run typecheck
npm test
npm run build
```

Bump `version` in `package.json`, merge, then push the matching tag (`vX.Y.Z`); the Publish workflow checks the tag,
tests and publishes it.
