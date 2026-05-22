# @stackline/moment-core project memory

Last updated: 2026-05-22

## Current release

- Package: `@stackline/moment-core`
- Stable version: `1.0.0`
- Public npm registry: `https://registry.npmjs.org/`
- Local Verdaccio registry: `http://192.168.3.52:4873/`
- Public docs: `https://alexandro.net/docs/vanilla/moment/`
- Repository: `https://github.com/alexandroit/moment`

## What was done for 1.0.0

- Set `package.json` and `package-lock.json` to `1.0.0`.
- Renamed the public package from `@stackline/moment` to `@stackline/moment-core`.
- Updated README, docs sources, generated docs, and download guidance to use `@stackline/moment-core`.
- Added `docs-src/v1.0.0`, rebuilt generated docs, and made the docs index redirect to `v1.0.0`.
- Rebuilt browser download assets as `stackline-moment-core-1.0.0`.
- Published `@stackline/moment-core@1.0.0` to public npm.
- Published `@stackline/moment-core@1.0.0` to the local Verdaccio registry.
- Removed the old local Verdaccio package `@stackline/moment` so the local registry only lists `@stackline/moment-core@1.0.0`.
- Published static docs to the production docs root on `codex-server`:
  - source staging: `/storage/data/build/alexandro.net-docs`
  - production target: `/var/www/html/alexandro.net_docs`
- Updated the `alexandro.net` seed and live database so `/projects/moment/` shows `1.0.0` and the new npm package name.

## npm public registry note

Publishing to `https://registry.npmjs.org/` was attempted for `@stackline/moment@1.0.0`, but npm rejected the old package name because it was previously unpublished.

The registry reports:

```text
Unpublished on 2026-04-10T02:20:09.107Z
```

Because of that registry state, the public catalog should use the `@stackline/moment-core` npm URL instead of the old `@stackline/moment` URL.

## Verification commands

Run these from `/storage/data/github/revivejs/moment/moment`:

```bash
npm run build
npm run build:docs
npm run build:download
npm pack --dry-run --ignore-scripts
npm view @stackline/moment-core version --registry https://registry.npmjs.org/
npm view @stackline/moment-core version --registry http://192.168.3.52:4873/
```

Expected version:

```text
1.0.0
```

## Notes for future releases

- Keep the package name as `@stackline/moment-core`; the old `@stackline/moment` npm name is blocked by the unpublished record.
- Keep docs source changes in `docs-src`, then rebuild generated `docs`.
- Re-run the shared docs staging script before publishing docs:

```bash
node /storage/data/github/revivejs/tools/stage-alexandro-docs.mjs
```

- Sync staged docs to the production server with sudo rsync:

```bash
rsync -az --delete --rsync-path='sudo rsync' /storage/data/build/alexandro.net-docs/ codex-server:/var/www/html/alexandro.net_docs/
```

- Publish to local Verdaccio from localhost because the saved auth token is host-specific:

```bash
npm publish --registry http://127.0.0.1:4873/ --access public
```
