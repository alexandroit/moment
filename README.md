# @stackline/moment

> A maintained **Moment.js 2.30.x fork** for parsing, validating, manipulating, and formatting dates with support for strict parsing, locale bundles, UTC workflows, durations, browser-ready minified assets, and TypeScript declarations.

[![npm version](https://img.shields.io/npm/v/%40stackline%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/moment)
[![npm downloads](https://img.shields.io/npm/dt/%40stackline%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/moment)
[![npm monthly](https://img.shields.io/npm/dm/%40stackline%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/moment)
[![license](https://img.shields.io/npm/l/%40stackline%2Fmoment.svg?style=flat-square)](https://github.com/alexandroit/moment/blob/develop/LICENSE)
[![JavaScript ES5+](https://img.shields.io/badge/JavaScript-ES5%2B-f7df1e?style=flat-square&logo=javascript&logoColor=111)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TypeScript typings](https://img.shields.io/badge/TypeScript-1.8%2B%20%7C%203.1%2B-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/moment.svg?style=flat-square)](https://github.com/alexandroit/moment/stargazers)

**[Documentation & Live Demos](https://alexandroit.github.io/moment/)** | **[npm](https://www.npmjs.com/package/@stackline/moment)** | **[Issues](https://github.com/alexandroit/moment/issues)** | **[Repository](https://github.com/alexandroit/moment)**

**Latest version:** `2.30.5`

---

> **Credits:** Original project by Iskren Ivov Chernev and the Moment.js contributors.  
> Maintained and republished by Alexandroit under the Stackline scope.

---

## Why this library?

`@stackline/moment` keeps the stable Moment.js API available under active package ownership for
teams that still depend on its parsing, formatting, locale, duration, and relative-time behavior.
The package stays intentionally close to upstream `moment@2.30.x`, while cleaning up metadata and
preserving browser-ready bundles, locale files, and TypeScript declarations.

## Features

| Feature | Supported |
| :--- | :---: |
| Maintained Moment.js 2.30.x release line | ✅ |
| Parse common date inputs and custom formats | ✅ |
| Strict parsing and validation diagnostics | ✅ |
| Localized formatting and calendar output | ✅ |
| Relative time and duration helpers | ✅ |
| UTC and offset-aware workflows | ✅ |
| 130+ locale bundles | ✅ |
| TypeScript declaration files | ✅ |
| Browser-ready minified bundles | ✅ |
| Versioned docs per published package release | ✅ |

## Table of Contents

1. [Published Version Compatibility](#published-version-compatibility)
2. [Installation](#installation)
3. [Setup](#setup)
4. [Basic Usage](#basic-usage)
5. [Core APIs](#core-apis)
6. [Browser Assets](#browser-assets)
7. [Run Locally](#run-locally)
8. [Publishing](#publishing)
9. [License](#license)

## Published Version Compatibility

| Package version | Upstream base | Runtime target | TypeScript declarations | Demo link |
| :---: | :---: | :--- | :--- | :--- |
| **2.30.5** | **Moment 2.30.x** | **ES5+ browsers and Node.js** | **`moment.d.ts` + `ts3.1-typings/`** | [Moment 2.30.5 docs](https://alexandroit.github.io/moment/v2.30.5/) |
| **2.30.4** | **Moment 2.30.x** | **ES5+ browsers and Node.js** | **`moment.d.ts` + `ts3.1-typings/`** | [Moment 2.30.4 docs](https://alexandroit.github.io/moment/v2.30.4/) |
| 2.30.3 | Moment 2.30.x | ES5+ browsers and Node.js | `moment.d.ts` + `ts3.1-typings/` | [Moment 2.30.3 docs](https://alexandroit.github.io/moment/v2.30.3/) |
| 2.30.2 | Moment 2.30.x | ES5+ browsers and Node.js | `moment.d.ts` + `ts3.1-typings/` | [Moment 2.30.2 docs](https://alexandroit.github.io/moment/v2.30.2/) |

---

## Installation

```bash
npm install @stackline/moment
```

---

## Setup

```ts
import moment from '@stackline/moment';
import '@stackline/moment/locale/fr';

moment.locale('fr');
```

---

## Basic Usage

```ts
import moment from '@stackline/moment';

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
| `moment.d.ts` | TypeScript declarations |
| `ts3.1-typings/` | Alternate declarations for TS 3.1+ consumers |

---

## Run Locally

```bash
npm install
npm run lint
npm test
npm run build
npm run build:docs:all
```

---

## Publishing

```bash
npm run build:package
npm run build:docs:all
npm run pack:check
```

---

## License

MIT. See [LICENSE](LICENSE).

---

## Credits

- Original project: Iskren Ivov Chernev and the Moment.js contributors
- Upstream repository: https://github.com/moment/moment
- Maintained by: Alexandroit
