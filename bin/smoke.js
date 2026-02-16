#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.join(__dirname, '..');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dotfiles25-smoke-'));

try {
  const initResult = spawnSync(process.execPath, [path.join(repoRoot, 'bin/init.js'), '--react'], {
    cwd: tempDir,
    stdio: 'pipe',
    encoding: 'utf8',
  });

  if (initResult.status !== 0) {
    throw new Error(`init.js failed:\n${initResult.stdout}\n${initResult.stderr}`);
  }

  assertFileContent(
    path.join(tempDir, 'eslint.config.cjs'),
    "module.exports = require('dotfiles25/eslint-react');\n"
  );
  assertFileContent(
    path.join(tempDir, 'prettier.config.cjs'),
    "module.exports = require('dotfiles25/prettier');\n"
  );
  assertFileContent(
    path.join(tempDir, '.stylelintrc.cjs'),
    "module.exports = {\n  extends: 'dotfiles25/stylelint',\n};\n"
  );

  console.log('Smoke check passed');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function assertFileContent(filePath, expectedContent) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${path.basename(filePath)}`);
  }

  const actualContent = fs.readFileSync(filePath, 'utf8');
  if (actualContent !== expectedContent) {
    throw new Error(
      `Unexpected content in ${path.basename(filePath)}\nExpected:\n${expectedContent}\nActual:\n${actualContent}`
    );
  }
}
