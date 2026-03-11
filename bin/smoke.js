#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { presets, templates } = require('../presets');

const repoRoot = path.join(__dirname, '..');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dotfiles25-smoke-'));

try {
  Object.values(presets).forEach(preset => {
    const presetDir = path.join(tempDir, preset.key);

    fs.mkdirSync(presetDir);
    runInit(presetDir, preset.flags);
    assertTemplates(presetDir);

    Object.entries(preset.files).forEach(([filename, content]) => {
      assertFileContent(path.join(presetDir, filename), content);
    });
  });

  console.log('Smoke check passed');
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function runInit(targetDir, flags) {
  const args = [path.join(repoRoot, 'bin/init.js'), ...(flags || [])];

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
