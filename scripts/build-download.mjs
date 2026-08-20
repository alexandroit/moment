import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const rootDir = process.cwd();
const packageJson = JSON.parse(await fs.readFile(path.join(rootDir, "package.json"), "utf8"));
const version = packageJson.version;
const downloadRootDir = path.join(rootDir, "downloads");
const bundleDirName = `stackline-moment-core-${version}`;
const bundleDir = path.join(downloadRootDir, bundleDirName);
const zipPath = path.join(downloadRootDir, `${bundleDirName}.zip`);

const installGuide = `@stackline/moment-core ${version}

Browser bundle download
=======================

This folder is for browser applications that do not install packages from npm.

Files
-----
- moment.min.js
- moment-with-locales.min.js
- locales.min.js
- LICENSE
- README.md

Script tag usage
----------------
<script src="./moment.min.js"></script>
<script>
  const value = moment("2026-04-03 14:30", "YYYY-MM-DD HH:mm", true);
  console.log(value.isValid(), value.format("LLLL"));
</script>

With locales
------------
<script src="./moment-with-locales.min.js"></script>
<script>
  moment.locale("fr");
  console.log(moment().format("LLLL"));
</script>

Global name
-----------
window.moment
`;

await fs.mkdir(downloadRootDir, { recursive: true });
await fs.rm(bundleDir, { recursive: true, force: true });
await fs.rm(zipPath, { force: true });
await fs.mkdir(bundleDir, { recursive: true });

await fs.copyFile(path.join(rootDir, "README.md"), path.join(bundleDir, "README.md"));
await fs.copyFile(path.join(rootDir, "LICENSE"), path.join(bundleDir, "LICENSE"));
await fs.copyFile(path.join(rootDir, "min", "moment.min.js"), path.join(bundleDir, "moment.min.js"));
await fs.copyFile(path.join(rootDir, "min", "moment-with-locales.min.js"), path.join(bundleDir, "moment-with-locales.min.js"));
await fs.copyFile(path.join(rootDir, "min", "locales.min.js"), path.join(bundleDir, "locales.min.js"));
await fs.writeFile(path.join(bundleDir, "INSTALLATION.txt"), installGuide, "utf8");
await normalizeTimestamps(bundleDir);

const archiveFiles = (await listFiles(bundleDir))
  .map((filePath) => path.relative(downloadRootDir, filePath))
  .sort();

await execFileAsync("zip", ["-Xq", zipPath, ...archiveFiles], {
  cwd: downloadRootDir
});

const archiveNames = (await fs.readdir(downloadRootDir))
  .filter((fileName) => /^stackline-moment-core-\d+\.\d+\.\d+\.zip$/.test(fileName))
  .sort((left, right) => right.localeCompare(left, "en", { numeric: true }));
const archiveLinks = archiveNames
  .map((fileName) => `- [${fileName}](./${fileName})${fileName === `${bundleDirName}.zip` ? " (current)" : ""}`)
  .join("\n");
const downloadReadme = `# GitHub Downloads

This directory contains browser-ready downloads for developers who want to use \`@stackline/moment-core\` with plain JavaScript.

Available versions:

${archiveLinks}

Each archive contains:

- \`moment.min.js\`
- \`moment-with-locales.min.js\`
- \`locales.min.js\`
- \`README.md\`
- \`LICENSE\`
- \`INSTALLATION.txt\`
`;

await fs.writeFile(path.join(downloadRootDir, "README.md"), downloadReadme, "utf8");

console.log(`Built GitHub download bundle into ${path.relative(rootDir, downloadRootDir)}/`);

async function normalizeTimestamps(directory) {
  const timestamp = new Date("2000-01-01T00:00:00.000Z");
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await normalizeTimestamps(entryPath);
    } else {
      await fs.utimes(entryPath, timestamp, timestamp);
    }
  }

  await fs.utimes(directory, timestamp, timestamp);
}

async function listFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}
