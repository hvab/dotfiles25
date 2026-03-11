#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.join(__dirname, '..');
const templates = ['.editorconfig', '.gitignore', '.browserslistrc'];
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dotfiles25-smoke-'));

try {
  const baseDir = path.join(tempDir, 'base');
  const reactDir = path.join(tempDir, 'react');

  fs.mkdirSync(baseDir);
  fs.mkdirSync(reactDir);

  runInit(baseDir);
  assertTemplates(baseDir);
  assertFileContent(
    path.join(baseDir, 'eslint.config.cjs'),
    "module.exports = require('dotfiles25/eslint');\n"
  );
  assertFileContent(
    path.join(baseDir, 'prettier.config.cjs'),
    "module.exports = require('dotfiles25/prettier');\n"
  );
  assertFileContent(
    path.join(baseDir, '.stylelintrc.cjs'),
    "module.exports = {\n  extends: 'dotfiles25/stylelint',\n};\n"
  );

  runInit(reactDir, '--react');
  assertTemplates(reactDir);
  assertFileContent(
    path.join(reactDir, 'eslint.config.cjs'),
    "module.exports = require('dotfiles25/eslint-react');\n"
  );
  assertFileContent(
    path.join(reactDir, 'prettier.config.cjs'),
    "module.exports = require('dotfiles25/prettier');\n"
  );
  assertFileContent(
    path.join(reactDir, '.stylelintrc.cjs'),
    "module.exports = {\n  extends: 'dotfiles25/stylelint',\n};\n"
  );

  console.log('Smoke check passed');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function runInit(targetDir, flag) {
  const args = [path.join(repoRoot, 'bin/init.js')];

  if (flag) {
    args.push(flag);
  }

  const initResult = spawnSync(process.execPath, args, {
    cwd: targetDir,
    stdio: 'pipe',
    encoding: 'utf8',
  });

  if (initResult.status !== 0) {
    throw new Error(`init.js failed:\n${initResult.stdout}\n${initResult.stderr}`);
  }
}

function assertTemplates(targetDir) {
  templates.forEach(template => {
    assertFileContent(
      path.join(targetDir, template),
      fs.readFileSync(path.join(repoRoot, template), 'utf8')
    );
  });
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
