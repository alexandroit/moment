# @revivejs/moment

> Maintained Moment.js 2.30.x fork for parsing, validating, manipulating, and formatting dates.

[![npm version](https://img.shields.io/npm/v/%40revivejs%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/moment)
[![npm downloads](https://img.shields.io/npm/dt/%40revivejs%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/moment)
[![npm monthly](https://img.shields.io/npm/dm/%40revivejs%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/moment)
[![license](https://img.shields.io/npm/l/%40revivejs%2Fmoment.svg?style=flat-square)](https://github.com/alexandroit/moment/blob/develop/LICENSE)
[![JavaScript ES5+](https://img.shields.io/badge/JavaScript-ES5%2B-f7df1e?style=flat-square&logo=javascript&logoColor=111)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TypeScript typings](https://img.shields.io/badge/TypeScript-1.8%2B%20%7C%203.1%2B-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/moment.svg?style=flat-square)](https://github.com/alexandroit/moment/stargazers)

**[Documentation & Demo](https://alexandroit.github.io/moment/)** | **[Repository](https://github.com/alexandroit/moment)** | **[npm](https://www.npmjs.com/package/@revivejs/moment)** | **[Changelog](https://github.com/alexandroit/moment/blob/develop/CHANGELOG.md)**

---

> **Credits:** Original project by Iskren Ivov Chernev and the Moment.js contributors.  
> Maintained and republished by Alexandroit under the ReviveJS scope.

---

## Why this library?

`@revivejs/moment` keeps the stable Moment.js API available under active package ownership for
teams that still depend on its parsing, formatting, locale, duration, and relative-time behavior.
The package stays intentionally close to upstream `moment@2.30.x`, while cleaning up metadata and
preserving browser-ready bundles, locale files, and TypeScript declarations.

---

## Features

| Feature | Supported |
| :--- | :---: |
| Parse common date inputs and custom formats | Yes |
| Strict parsing and validation diagnostics | Yes |
| Format localized dates and times | Yes |
| Relative time and duration helpers | Yes |
| UTC and offset-aware workflows | Yes |
| 130+ locale bundles | Yes |
| TypeScript declaration files | Yes |
| Browser-ready minified bundles | Yes |
| Versioned docs per published release line | Yes |

---

## Supported Package Versions

| Package version | Runtime target | TypeScript declarations | Docs |
| :--- | :--- | :--- | :--- |
| `2.30.4` | ES5+ browsers and Node.js | `moment.d.ts` + `ts3.1-typings/` | [Moment 2.30.4](https://alexandroit.github.io/moment/v2.30.4/) |
| `2.30.3` | ES5+ browsers and Node.js | `moment.d.ts` + `ts3.1-typings/` | [Moment 2.30.3](https://alexandroit.github.io/moment/v2.30.3/) |
| `2.30.2` | ES5+ browsers and Node.js | `moment.d.ts` + `ts3.1-typings/` | [Moment 2.30.2](https://alexandroit.github.io/moment/v2.30.2/) |

Latest published version: `2.30.4`

---

## Installation

```bash
npm install @revivejs/moment
```

---

## Setup

```ts
import moment from '@revivejs/moment';
import '@revivejs/moment/locale/fr';

moment.locale('fr');
```

---

## Basic Usage

```ts
import moment from '@revivejs/moment';

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
