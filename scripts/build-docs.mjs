import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsSrcDir = path.join(root, 'docs-src');
const docsDir = path.join(root, 'docs');

const requestedTarget = process.argv[2] || 'v2.30.5';
const buildAll = requestedTarget === '--all';

const versionDirs = readdirSync(docsSrcDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^v\d+\.\d+\.\d+$/.test(entry.name))
  .map((entry) => entry.name)
  .sort(compareVersionDirs);

const latestVersionDir = versionDirs[versionDirs.length - 1];
const selectedVersionDirs = buildAll ? versionDirs : versionDirs.filter((dir) => dir === requestedTarget);

if (!selectedVersionDirs.length) {
  throw new Error(`Unknown docs target "${requestedTarget}". Available targets: ${versionDirs.join(', ')}`);
}

if (buildAll) {
  rmSync(docsDir, { force: true, recursive: true });
}

mkdirSync(docsDir, { recursive: true });
writeFileSync(path.join(docsDir, '.nojekyll'), '', 'utf8');

for (const versionDir of selectedVersionDirs) {
  const source = path.join(docsSrcDir, versionDir);
  const destination = path.join(docsDir, versionDir);

  rmSync(destination, { force: true, recursive: true });
  cpSync(source, destination, { recursive: true });
}

writeFileSync(path.join(docsDir, 'index.html'), renderVersionIndex(versionDirs, latestVersionDir), 'utf8');

function compareVersionDirs(left, right) {
  const leftParts = left.slice(1).split('.').map(Number);
  const rightParts = right.slice(1).split('.').map(Number);

  for (let index = 0; index < Math.max(leftParts.length, rightParts.length); index += 1) {
    const leftPart = leftParts[index] || 0;
    const rightPart = rightParts[index] || 0;
    if (leftPart !== rightPart) {
      return leftPart - rightPart;
    }
  }

  return 0;
}

function renderVersionIndex(versionList, latestVersion) {
  const latestHref = `${latestVersion}/`;
  const versionCards = [...versionList]
    .reverse()
    .map((versionDir) => {
      const versionNumber = versionDir.slice(1);
      const latestClass = versionDir === latestVersion ? 'ver latest' : 'ver other';
      const latestLabel = versionDir === latestVersion ? ' <span>(latest)</span>' : '';
      return `      <a class="${latestClass}" href="${versionDir}/">Moment ${versionNumber}${latestLabel}</a>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>@stackline/moment — Docs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=${latestHref}">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6353624842390947" crossorigin="anonymous"></script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-3KQ9KECXR9"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-3KQ9KECXR9');
  </script>
  <style>
    :root {
      color-scheme: light;
      --text: #102033;
      --muted: #59708a;
      --surface: rgba(255,255,255,0.9);
      --border: rgba(191,206,223,0.8);
      --shadow: 0 24px 60px rgba(23, 50, 77, 0.12);
      --accent: #c15d3f;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 1rem;
      font-family: "Avenir Next", "Helvetica Neue", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top right, rgba(254,228,179,0.5), transparent 32%),
        radial-gradient(circle at left 18%, rgba(170,219,255,0.4), transparent 28%),
        linear-gradient(180deg, #fff9f0 0%, #f5fbff 55%, #eef4fb 100%);
    }

    .card {
      width: min(760px, 100%);
      padding: 1.5rem;
      border: 1px solid var(--border);
      border-radius: 24px;
      background: var(--surface);
      box-shadow: var(--shadow);
    }

    h1 {
      margin: 0 0 0.75rem;
      font-family: Georgia, "Times New Roman", serif;
      letter-spacing: -0.02em;
    }

    p {
      margin: 0 0 1rem;
      color: var(--muted);
      line-height: 1.6;
    }

    .versions {
      display: grid;
      gap: 0.75rem;
      margin: 1rem 0;
    }

    .ver {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.9rem 1rem;
      border-radius: 16px;
      text-decoration: none;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.8);
      color: var(--text);
    }

    .ver.latest {
      border-color: transparent;
      background: linear-gradient(135deg, var(--accent), #9e4a31);
      color: #fff;
    }

    .ver span {
      font-weight: 700;
    }

    .note {
      margin-top: 0.75rem;
      font-size: 0.92rem;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>@stackline/moment</h1>
    <p>Select a published package version to view the matching docs build:</p>
    <div class="versions">
${versionCards}
    </div>
    <p class="note">Redirecting to the latest version…</p>
  </div>
</body>
</html>`;
}
