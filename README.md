# @revivejs/moment

> Maintained Moment.js fork for parsing, validating, manipulating, and formatting dates.

[![npm version](https://img.shields.io/npm/v/%40revivejs%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/moment)
[![npm downloads](https://img.shields.io/npm/dt/%40revivejs%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/moment)
[![npm monthly](https://img.shields.io/npm/dm/%40revivejs%2Fmoment.svg?style=flat-square)](https://www.npmjs.com/package/@revivejs/moment)
[![license](https://img.shields.io/npm/l/%40revivejs%2Fmoment.svg?style=flat-square)](https://github.com/alexandroit/moment/blob/main/LICENSE)
[![JavaScript ES5+](https://img.shields.io/badge/JavaScript-ES5%2B-f7df1e?style=flat-square&logo=javascript&logoColor=111)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TypeScript typings](https://img.shields.io/badge/TypeScript-1.8%2B%20%7C%203.1%2B-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![GitHub stars](https://img.shields.io/github/stars/alexandroit/moment.svg?style=flat-square)](https://github.com/alexandroit/moment/stargazers)

**[Documentation & Demo](https://alexandroit.github.io/moment/)** | **[Repository](https://github.com/alexandroit/moment)** | **[npm](https://www.npmjs.com/package/@revivejs/moment)** | **[Changelog](https://github.com/alexandroit/moment/blob/main/CHANGELOG.md)**

---

> **Credits:** Original project by Iskren Ivov Chernev and the Moment.js contributors.  
> Maintained and modernized by Alexandroit.

---

## Why this library?

`@revivejs/moment` keeps the stable Moment.js API available under active repository ownership for teams that still depend on its parsing, formatting, locale, duration, and relative-time behavior. The package stays intentionally close to upstream `moment@2.30.x`, while cleaning up metadata, modernizing publish flow, and providing a docs/demo surface for maintained distribution.

---

## Features

| Feature | Supported |
| :--- | :---: |
| Parse common date inputs and custom formats | Yes |
| Format localized dates and times | Yes |
| Relative time and duration helpers | Yes |
| UTC and offset-aware workflows | Yes |
| 130+ locale bundles | Yes |
| TypeScript declaration files | Yes |
| Browser-ready minified bundles | Yes |

---

## Table of Contents

1. [Angular Version Compatibility](#angular-version-compatibility)
2. [Installation](#installation)
3. [Setup](#setup)
4. [Basic Usage](#basic-usage)
5. [Settings](#settings)
6. [Events](#events)
7. [Theming](#theming)
8. [Run Locally](#run-locally)
9. [Publishing](#publishing)
10. [License](#license)

---

## Angular Version Compatibility

| Package Version | Angular | TypeScript | Node.js |
| :--- | :---: | :---: | :---: |
| 2.x | N/A | 1.8+ and 3.1+ typings test coverage | 18+ for local maintenance tooling |

This repository is not an Angular package, so Angular compatibility is intentionally marked `N/A`.

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

## Settings

| Setting | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `moment.locale(locale)` | `string` | Sets the active locale for formatting and relative time output. | `en` |
| `moment(input, format, strict)` | `string, string, boolean` | Parses a value with an explicit format and optional strict validation. | Forgiving parsing |
| `moment.utc(input)` | `MomentInput` | Creates a UTC-based moment instance. | Local time |
| `moment.parseZone(input)` | `MomentInput` | Preserves the original offset from the input string. | Local/derived offset |
| `moment.relativeTimeThreshold(unit, value)` | `string, number` | Tunes relative time cutover thresholds. | Built-in defaults |
| `moment.relativeTimeRounding(fn)` | `(value: number) => number` | Overrides rounding behavior for relative time output. | `Math.round` |

---

## Events

This package does not expose UI or component events. It provides synchronous formatting, parsing, locale, and duration APIs.

---

## Theming

There is no component styling layer. Locale loading controls textual output, and the published package includes ESM, CommonJS, locale bundles, and minified browser builds.

---

## Run Locally

```bash
npm install
npm test
npm run build
npm run docs:build
```

---

## Publishing

```bash
npm run build:package
npm run docs:build
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
