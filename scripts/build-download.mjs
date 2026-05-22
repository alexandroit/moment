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

const downloadReadme = `# GitHub Downloads

This directory contains browser-ready downloads for developers who want to use \`@stackline/moment-core\` with plain JavaScript.

Current version:

- [${bundleDirName}.zip](./${bundleDirName}.zip)

Inside the archive:

- \`moment.min.js\`
- \`moment-with-locales.min.js\`
- \`locales.min.js\`
- \`README.md\`
- \`LICENSE\`
- \`INSTALLATION.txt\`
`;

await fs.rm(downloadRootDir, { recursive: true, force: true });
await fs.mkdir(bundleDir, { recursive: true });

await fs.copyFile(path.join(rootDir, "README.md"), path.join(bundleDir, "README.md"));
await fs.copyFile(path.join(rootDir, "LICENSE"), path.join(bundleDir, "LICENSE"));
await fs.copyFile(path.join(rootDir, "min", "moment.min.js"), path.join(bundleDir, "moment.min.js"));
await fs.copyFile(path.join(rootDir, "min", "moment-with-locales.min.js"), path.join(bundleDir, "moment-with-locales.min.js"));
await fs.copyFile(path.join(rootDir, "min", "locales.min.js"), path.join(bundleDir, "locales.min.js"));
await fs.writeFile(path.join(bundleDir, "INSTALLATION.txt"), installGuide, "utf8");
await fs.writeFile(path.join(downloadRootDir, "README.md"), downloadReadme, "utf8");

await execFileAsync("zip", ["-rq", zipPath, bundleDirName], {
  cwd: downloadRootDir
});

console.log(`Built GitHub download bundle into ${path.relative(rootDir, downloadRootDir)}/`);
