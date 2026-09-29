# @stackline/moment-core

> Maintained Moment.js API package for parsing, validating, manipulating, and formatting dates.

[![npm version](https://img.shields.io/npm/v/@stackline/moment-core.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/moment-core)
[![license](https://img.shields.io/npm/l/@stackline/moment-core.svg?style=flat-square)](https://github.com/alexandroit/moment)
[![GitHub repository](https://img.shields.io/badge/GitHub-repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/moment)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/moment/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/moment/)** | **[npm](https://www.npmjs.com/package/@stackline/moment-core)** | **[Issues](https://github.com/alexandroit/moment/issues)** | **[Repository](https://github.com/alexandroit/moment)**

**Current package version:** `1.0.5`

---

## Why this package?

`@stackline/moment-core` is maintained as part of the Stackline package collection.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/moment-core@1.0.5` |
| API target | `See the package-specific API reference` |
| Supported Node.js | `*` |
| License | `MIT` |
| Module type | `commonjs` |
| Main entry | `./moment.js` |
| Module entry | `./dist/moment.js` |
| Types | `./moment.d.ts` |
| Runtime dependencies | `none` |

## Installation

```bash
npm install @stackline/moment-core
```

## Usage and API reference

> A maintained **Moment.js API package** for parsing, validating, manipulating, and formatting dates with support for strict parsing, locale bundles, UTC workflows, durations, browser-ready minified assets, and TypeScript declarations.


**[Documentation & Live Demos](https://alexandro.net/docs/vanilla/moment/)** | **[npm](https://www.npmjs.com/package/@stackline/moment-core)** | **[GitHub Download](https://github.com/alexandroit/moment/tree/develop/downloads)** | **[Security](SECURITY.md)** | **[Issues](https://github.com/alexandroit/moment/issues)** | **[Repository](https://github.com/alexandroit/moment)**

**Latest version:** `1.0.5`

---

> **Credits:** Original project by Iskren Ivov Chernev and the Moment.js contributors.<br>
> Maintained and republished by Alexandroit under the Stackline scope.

---

## Why this library?

`@stackline/moment-core` keeps the stable Moment.js API available under active package ownership for
teams that still depend on its parsing, formatting, locale, duration, and relative-time behavior.
The package stays intentionally close to the classic Moment.js API, while cleaning up metadata and
preserving browser-ready bundles, locale files, and TypeScript declarations.

Moment remains a legacy API in maintenance mode. New applications should evaluate modern date/time
libraries, while existing applications can use this package when behavioral compatibility is the
primary requirement. The package version is `1.0.3`; `moment.version` intentionally remains
`2.30.1` for runtime compatibility.

## Features

| Feature | Supported |
| :--- | :---: |
| Stackline 1.0.3 maintenance release on the Moment.js API | ✅ |
| Parse common date inputs and custom formats | ✅ |
| Strict parsing and validation diagnostics | ✅ |
| Localized formatting and calendar output | ✅ |
| Relative time and duration helpers | ✅ |
| UTC and offset-aware workflows | ✅ |
| 138 locale bundles | ✅ |
| TypeScript declaration files | ✅ |
| Browser-ready minified bundles | ✅ |
| Versioned docs per published package release | ✅ |

## Table of Contents

1. [Published Version Compatibility](#published-version-compatibility)
2. [Installation](#installation)
3. [Direct Download](#direct-download)
4. [Setup](#setup)
5. [Basic Usage](#basic-usage)
6. [Core APIs](#core-apis)
7. [Browser Assets](#browser-assets)
8. [Run Locally](#run-locally)
9. [Publishing](#publishing)
10. [Security](#security)
11. [Community and Links](#community-and-links)
12. [License](#license)
13. [Credits](#credits)

## Published Version Compatibility

| Package version | Upstream base | Runtime target | TypeScript declarations | Demo link |
| :---: | :---: | :--- | :--- | :--- |
| **1.0.3** | **Moment 2.30.1 plus accepted upstream fixes through 2026-08-18** | **ES5+ browsers and Node.js** | **Verified with TypeScript 1.8 through 7.0** | [Moment 1.0.3 docs](https://alexandro.net/docs/vanilla/moment/v1.0.3/) |
| **1.0.2** | **Moment 2.30.1 plus accepted upstream fixes through 2026-08-18** | **ES5+ browsers and Node.js** | **Verified with TypeScript 1.8 through 7.0** | [Moment 1.0.2 docs](https://alexandro.net/docs/vanilla/moment/v1.0.2/) |
| 1.0.1 | Moment 2.30.1 plus accepted upstream fixes through 2026-08-18 | ES5+ browsers and Node.js | Verified with TypeScript 1.8 through 7.0 | [Moment 1.0.1 docs](https://alexandro.net/docs/vanilla/moment/v1.0.1/) |
| **1.0.0** | **Moment API baseline** | **ES5+ browsers and Node.js** | **`moment.d.ts` + `ts3.1-typings/`** | [Moment 1.0.0 docs](https://alexandro.net/docs/vanilla/moment/v1.0.0/) |

---

## Installation

```bash
npm install @stackline/moment-core
```

---

## Direct Download

If your project loads JavaScript directly in the browser, download the prebuilt release from GitHub:

- [GitHub downloads folder](https://github.com/alexandroit/moment/tree/develop/downloads)

The archive includes `moment.min.js`, `moment-with-locales.min.js`, and `locales.min.js`.

```html
<script src="./moment.min.js"></script>
<script>
  const value = moment('2026-04-03 14:30', 'YYYY-MM-DD HH:mm', true);
  console.log(value.isValid(), value.format('LLLL'));
</script>
```

```html
<script src="./moment-with-locales.min.js"></script>
<script>
  moment.locale('fr');
  console.log(moment().format('LLLL'));
</script>
```

---

## Setup

```ts
import moment from '@stackline/moment-core';
import '@stackline/moment-core/locale/fr';

moment.locale('fr');
```

---

## Basic Usage

```ts
import moment from '@stackline/moment-core';

const parsed = moment('2026-04-03 14:30', 'YYYY-MM-DD HH:mm', true);

const isoOutput = parsed.clone().utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
const longOutput = parsed.format('LLLL');
const relativeOutput = parsed.fromNow();

console.log({ isoOutput, longOutput, relativeOutput });
```

---

## Core APIs

| API | Description |
| :--- | :--- |
| `moment(input)` | Creates a local instance from strings, numbers, arrays, objects, and native `Date` values. |
| `moment(input, format, strict)` | Parses using a declared token pattern and optional strict validation. |
| `moment.utc(input)` | Creates a UTC-based moment instance. |
| `moment.parseZone(input)` | Preserves the original offset encoded in the input string. |
| `moment.duration(value, unit)` | Creates a duration for humanize, ISO serialization, and unit conversion. |
| `moment.locale(locale)` | Sets the active locale for formatting and relative time output. |
| `moment.relativeTimeThreshold(unit, value)` | Tunes relative time cutover thresholds. |
| `moment.relativeTimeRounding(fn)` | Overrides rounding behavior for relative time strings. |

---

## Browser Assets

The published package keeps the classic Moment.js distribution layout:

| File | Description |
| :--- | :--- |
| `moment.js` | Classic CommonJS/browser entry |
| `dist/moment.js` | ESM-friendly build |
| `locale/` | Individual locale bundles |
| `min/moment.min.js` | Browser-ready minified build |
| `min/locales.min.js` | Browser-ready locale bundle |
| `min/moment-with-locales.min.js` | Browser-ready build with locales included |
| `moment.d.ts` | TypeScript declarations |
| `ts3.1-typings/` | Alternate declarations for TS 3.1+ consumers |

---

## Run Locally

The maintained development dependencies use exact Stackline aliases. The
`karma` override references the direct dependency (`$karma`) so the compatible
Classic Karma API satisfies the installed plugins' peer graph. A fresh install,
`npm ls --all`, audit and actual Chromium/Firefox tests validate this setup;
`--legacy-peer-deps` is not used. Historical TypeScript packages remain independent
compatibility compilers. Inherited Grunt/Karma transitive deprecations are
recorded under the original-parent-only migration scope, without claiming an
unrestricted dependency-closure policy pass.

```bash
npm install
npm run lint
npm test
npm run build
npm run build:docs
```

---

## Publishing

Releases are built, tested, and published through the repository's
[GitHub Actions workflow](https://github.com/alexandroit/moment/actions/workflows/publish.yml) using npm trusted
publishing and provenance. The workflow verifies the tested tarball's SHA-512
digest before publishing.

---

## Security

Please report suspected vulnerabilities privately using the process in [SECURITY.md](SECURITY.md).
Do not include secrets or exploit details in a public issue.

---

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use the repository's issue tracker for reproducible bugs and feature requests.
Join r/Stackline to share examples, ask usage questions, and discuss releases.

## License

MIT. See [LICENSE](LICENSE).

---

## Credits

- Original project: Iskren Ivov Chernev and the Moment.js contributors
- Upstream repository: https://github.com/moment/moment
- Maintained by: Alexandroit

## Credits and original authors

- Alexandroit.
- Tim Wood.
- Rocky Meza.
- Matt Johnson.
- Isaac Cambron.
- Andre Polykanine.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
