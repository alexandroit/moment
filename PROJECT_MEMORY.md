# @stackline/moment-core project memory

Last updated: 2026-08-19

## Current release

- Package: `@stackline/moment-core`
- Stable version: `1.0.1`
- Public npm registry: `https://registry.npmjs.org/`
- Local Verdaccio registry: `http://192.168.3.52:4873/`
- Public docs: `https://alexandro.net/docs/vanilla/moment/`
- Repository: `https://github.com/alexandroit/moment`

## Release 1.0.1 (2026-08-19)

- Release commit: `49aea6b87b3c5f96c01d2813b8ef55bce6d2d2bb`.
- Git tag and release: `v1.0.1` / `https://github.com/alexandroit/moment/releases/tag/v1.0.1`.
- GitHub CI run `32316820195`: successful on Node.js `20.20.2` and `22.22.0`, including the canonical release artifact job.
- GitHub Pages run `32316820178`: successful.
- Imported accepted upstream runtime and locale fixes through 2026-08-18 without changing the public API or runtime `moment.version` (`2.30.1`).
- Preserved CommonJS, native ESM, browser bundles, locale deep imports, and historical public package paths.
- Added the Amharic Ethiopia locale (`am-et`) and hardened object-prototype format-string handling.
- Replaced obsolete development tooling and removed abandoned dependencies. Both production and development `npm audit` checks report zero known vulnerabilities.
- Full runtime suite: 3,901 tests, 163,946 assertions, zero failures.
- Type compatibility matrix passed with TypeScript 1.8, 2.9, 3.0, 3.1, 3.9, 4.9, 5.9, 6.0, and 7.0.
- Package validation passed with publint (only the intentional compatibility suggestions for `jsnext:main` and no restrictive `exports` map remain) and Are the Types Wrong (zero problems).
- Consumer tests passed from the public npm artifact for CommonJS, ESM, browser global, TypeScript 3.9, and current TypeScript.
- Removed only the internal `min/tests.js` file from the npm package. All supported 1.0.0 public paths remain available.
- Published the same canonical artifact to public npm and local Verdaccio with `latest` pointing to `1.0.1`.
- Published versioned documentation to `https://alexandro.net/docs/vanilla/moment/`; `v1.0.0` and the historical `v2.30.x` pages remain available.
- Added durable `llms.txt` and `llms-full.txt` discovery files to the latest and `v1.0.0` documentation.

### Canonical 1.0.1 artifacts

- CI artifact directory: `/storage/data/releases/stackline-moment-core/1.0.1-ci-32316820195/`.
- npm tarball: `stackline-moment-core-1.0.1.tgz` (686,778 bytes; 296 files; 3,850,967 bytes unpacked).
- Raw SHA-512: `9f15d14a9cc7ddd6e1e96656190ec0a2950f9fa01630bcfd02e3fc4e7d245bc3b84a58b0323123dbebad91261e7906e3f27642f93f4e79d1dce9c600ca911921`.
- npm SHA-1 shasum: `e866a75b89668c6ba1348df8aba400b8920083dd`.
- npm integrity: `sha512-nxXRSpzH3dbh6WZWGQ7AopUPn6AWMLz9AuP8Tn0kW8O4SliwMjEj2+utkSYeeQbj8nZC+T9OedHc6cYAypEZIQ==`.
- Standalone ZIP SHA-512: `83254c60d7fcd7e2c1b336562586c9d553153acdca07429cebcd6842c11e4df55fb3b3c6a555007c11eb580e0806cba772b7e744e6169b4c34490eb572842f03`.
- Anonymous downloads from public npm and Verdaccio were byte-identical to the canonical CI tarball.

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
1.0.1
```

## Notes for future releases

- Keep the package name as `@stackline/moment-core`; the old `@stackline/moment` npm name is blocked by the unpublished record.
- Do not recreate or publish `@stackline/moment`; its npm tombstone is permanent for this project.
- Keep docs source changes in `docs-src`, then rebuild generated `docs`.
- Publish this project's docs only to its isolated production directory:

```bash
rsync -az --delete --rsync-path='sudo rsync' docs/ codex-server:/var/www/html/alexandro.net_docs/vanilla/moment/
```

- Never use `--delete` against `/var/www/html/alexandro.net_docs/` itself. It is a shared documentation root. `--delete` is permitted only on the package-specific `/vanilla/moment/` target.
- Build and verify every historical docs source before deployment so an old version cannot be silently removed.
- Build once in CI, publish that exact tarball to Verdaccio and public npm, then compare anonymous downloads byte for byte.
- Keep the unrestricted historical deep imports. Do not add a restrictive `exports` map without a major-version compatibility plan.

- Publish to local Verdaccio from localhost because the saved auth token is host-specific:

```bash
npm publish --registry http://127.0.0.1:4873/ --access public
```
