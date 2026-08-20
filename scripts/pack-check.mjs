import { execFile } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const npmCli = process.env.npm_execpath;

if (!npmCli) {
  throw new Error('npm_execpath is required to inspect the package archive.');
}

const destination = await mkdtemp(path.join(os.tmpdir(), 'stackline-moment-core-pack-'));

try {
  const { stdout } = await execFileAsync(
    process.execPath,
    [npmCli, 'pack', '--dry-run', '--json', '--ignore-scripts', '--pack-destination', destination],
    { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }
  );
  const result = JSON.parse(stdout)[0];
  const paths = new Set(result.files.map((file) => file.path));
  const requiredPaths = [
    'dist/moment.js',
    'dist/package.json',
    'locale/am-et.js',
    'locale/fr.js',
    'min/moment.min.js',
    'moment.d.ts',
    'moment.js',
    'ts3.1-typings/moment.d.ts'
  ];
  const missingPaths = requiredPaths.filter((filePath) => !paths.has(filePath));

  if (missingPaths.length) {
    throw new Error(`Package archive is missing: ${missingPaths.join(', ')}`);
  }
  if (paths.has('min/tests.js')) {
    throw new Error('Package archive must not contain min/tests.js.');
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        id: result.id,
        filename: result.filename,
        size: result.size,
        unpackedSize: result.unpackedSize,
        entryCount: result.entryCount,
        shasum: result.shasum,
        integrity: result.integrity
      },
      null,
      2
    )}\n`
  );
} finally {
  await rm(destination, { recursive: true, force: true });
}
