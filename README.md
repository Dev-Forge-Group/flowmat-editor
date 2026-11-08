# flowmat-editor

FlowMat's vector editor core as a standalone TypeScript package: the element model, geometry, selection, snapping,
tools, undo history and an SVG renderer, with a thin React binding. It was split out of
[FlowMat](https://github.com/Dev-Forge-Group/FlowMat) (`flowmat_frontend/src/lib/flowmat-editor/`) with its history.

The core does not depend on React Flow, the FlowMat API or any state library
(`src/core/importBoundary.test.ts` checks this). FlowMat keeps its own adapters, such as the canvas annotation adapter,
on its side and imports this package.

## Layout

| Folder | What it holds |
|---|---|
| `src/core` | `Editor` and `EditorStore` |
| `src/model`, `src/elements` | The document model and its element types |
| `src/geometry`, `src/snapping`, `src/selection` | Hit testing, bounds, snapping and selection |
| `src/tools`, `src/history` | Drawing and editing tools, undo and redo |
| `src/renderer`, `src/react` | The SVG renderer and the React binding |
| `src/adapters` | The backend editor-document adapter |

## Develop

```bash
npm ci
npm run typecheck
npm test
```

The package is `private` and consumed from source (`exports` points at `src/index.ts`); `react` is a peer dependency.
