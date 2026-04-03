import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsDir = path.join(root, 'docs');
const assetsDir = path.join(docsDir, 'assets');
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));

rmSync(docsDir, { force: true, recursive: true });
mkdirSync(assetsDir, { recursive: true });

cpSync(path.join(root, 'min', 'moment.min.js'), path.join(assetsDir, 'moment.min.js'));
cpSync(path.join(root, 'min', 'locales.min.js'), path.join(assetsDir, 'locales.min.js'));

writeFileSync(path.join(docsDir, '.nojekyll'), '', 'utf8');

writeFileSync(
    path.join(docsDir, 'styles.css'),
    `:root {
  color-scheme: light;
  --bg: #f4efe6;
  --surface: rgba(255, 252, 247, 0.86);
  --surface-strong: #fffdfa;
  --text: #1d1a16;
  --muted: #6d6257;
  --accent: #b6400e;
  --accent-soft: rgba(182, 64, 14, 0.12);
  --border: rgba(29, 26, 22, 0.12);
  --shadow: 0 24px 60px rgba(77, 49, 20, 0.12);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
  color: var(--text);
  background:
    radial-gradient(circle at top left, rgba(255, 215, 170, 0.72), transparent 30%),
    radial-gradient(circle at bottom right, rgba(226, 117, 65, 0.18), transparent 24%),
    linear-gradient(180deg, #f7f1e8 0%, #efe2d0 100%);
}

.shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 48px;
}

.hero,
.panel,
.code {
  border: 1px solid var(--border);
  border-radius: 24px;
  background: var(--surface);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow);
}

.hero {
  padding: 32px;
}

.eyebrow {
  display: inline-flex;
  gap: 8px;
  margin-bottom: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 12px;
  font-family: "IBM Plex Serif", Georgia, serif;
  font-size: clamp(2.5rem, 4vw, 4.6rem);
  line-height: 0.95;
}

.lede {
  max-width: 720px;
  margin: 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.panel {
  padding: 24px;
}

.panel h2,
.code h2 {
  margin: 0 0 16px;
  font-size: 1.15rem;
}

label {
  display: block;
  margin-bottom: 14px;
  color: var(--muted);
  font-size: 0.92rem;
}

input,
select {
  width: 100%;
  margin-top: 8px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface-strong);
  color: var(--text);
  font: inherit;
}

.results {
  display: grid;
  gap: 14px;
}

.result {
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--surface-strong);
  border: 1px solid var(--border);
}

.result strong {
  display: block;
  margin-bottom: 6px;
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.code {
  margin-top: 20px;
  padding: 24px;
}

pre {
  margin: 0;
  overflow: auto;
  color: #fdf7f1;
  background: #211811;
  border-radius: 18px;
  padding: 18px;
  font-size: 0.92rem;
  line-height: 1.6;
}

.footer {
  margin-top: 18px;
  color: var(--muted);
  font-size: 0.92rem;
}

a {
  color: var(--accent);
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .shell {
    width: min(100% - 20px, 1120px);
    padding-top: 20px;
  }

  .hero,
  .panel,
  .code {
    border-radius: 20px;
  }
}
`,
    'utf8'
);

writeFileSync(
    path.join(docsDir, 'app.js'),
    `const version = ${JSON.stringify(pkg.version)};
const dateInput = document.querySelector('#date-input');
const localeSelect = document.querySelector('#locale-select');
const outputNow = document.querySelector('#output-now');
const outputLong = document.querySelector('#output-long');
const outputRelative = document.querySelector('#output-relative');
const outputUtc = document.querySelector('#output-utc');
const exampleCode = document.querySelector('#example-code');

const localeChoices = ['en', 'en-gb', 'fr', 'de', 'es', 'ja', 'zh-cn'];

function populateLocales() {
  localeChoices.forEach((locale) => {
    const option = document.createElement('option');
    option.value = locale;
    option.textContent = locale;
    localeSelect.appendChild(option);
  });
}

function render() {
  const locale = localeSelect.value;
  const value = dateInput.value || new Date().toISOString().slice(0, 16);
  const selected = moment(value);

  moment.locale(locale);

  outputNow.textContent = moment().format('YYYY-MM-DD HH:mm:ss');
  outputLong.textContent = selected.format('LLLL');
  outputRelative.textContent = selected.fromNow();
  outputUtc.textContent = selected.clone().utc().format('YYYY-MM-DD HH:mm:ss [UTC]');
  exampleCode.textContent =
\`import moment from '@revivejs/moment';
import '@revivejs/moment/locale/\${locale}';

moment.locale('\${locale}');

const input = moment('\${value}');
input.format('LLLL');
input.fromNow();
input.utc().format('YYYY-MM-DD HH:mm:ss [UTC]');\`;
}

populateLocales();
dateInput.value = new Date(Date.now() + 36e5).toISOString().slice(0, 16);
localeSelect.value = 'en';
dateInput.addEventListener('input', render);
localeSelect.addEventListener('change', render);
render();

document.querySelector('#version').textContent = version;
`,
    'utf8'
);

writeFileSync(
    path.join(docsDir, 'index.html'),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>@revivejs/moment demo</title>
    <meta
      name="description"
      content="Interactive demo for the maintained @revivejs/moment package."
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <div class="eyebrow">Revived package demo</div>
        <h1>@revivejs/moment</h1>
        <p class="lede">
          A maintained fork of Moment.js for legacy-friendly date parsing, validation,
          formatting, locale handling, durations, and relative time output.
        </p>
        <div class="footer">
          Package version <strong id="version"></strong> ·
          <a href="https://github.com/alexandroit/moment">Repository</a> ·
          <a href="https://www.npmjs.com/package/@revivejs/moment">npm</a>
        </div>
      </section>

      <section class="grid">
        <section class="panel">
          <h2>Play with parsing and locale output</h2>
          <label>
            Datetime input
            <input id="date-input" type="datetime-local" />
          </label>
          <label>
            Locale
            <select id="locale-select"></select>
          </label>
        </section>

        <section class="panel">
          <h2>Live results</h2>
          <div class="results">
            <div class="result">
              <strong>Current time</strong>
              <span id="output-now"></span>
            </div>
            <div class="result">
              <strong>Localized format</strong>
              <span id="output-long"></span>
            </div>
            <div class="result">
              <strong>Relative time</strong>
              <span id="output-relative"></span>
            </div>
            <div class="result">
              <strong>UTC output</strong>
              <span id="output-utc"></span>
            </div>
          </div>
        </section>
      </section>

      <section class="code">
        <h2>Equivalent package usage</h2>
        <pre><code id="example-code"></code></pre>
      </section>
    </main>

    <script src="./assets/moment.min.js"></script>
    <script src="./assets/locales.min.js"></script>
    <script src="./app.js"></script>
  </body>
</html>
`,
    'utf8'
);
