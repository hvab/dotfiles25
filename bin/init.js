#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { defaultPreset, presets, templates } = require('../presets');

const packageDir = path.dirname(__dirname);
const targetDir = process.cwd();

const args = process.argv.slice(2);
const presetKey = args.includes('--react') ? 'react' : defaultPreset;
const preset = presets[presetKey];

console.log('🚀 Инициализация dotfiles25...\n');

// Копируем файлы-шаблоны
templates.forEach(template => {
  const sourcePath = path.join(packageDir, template);
  const targetPath = path.join(targetDir, template);

  if (fs.existsSync(targetPath)) {
    console.log(`⚠️  ${template} уже существует, пропускаем`);
    return;
  }

  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Скопирован ${template}`);
  } catch (error) {
    console.error(`❌ Ошибка копирования ${template}:`, error.message);
  }
});

// Создаём конфиги
console.log('\n📝 Создаём конфиги...\n');

Object.entries(preset.files).forEach(([filename, content]) => {
  writeConfigFile(filename, content);
});

console.log(
  `\n🎉 Готово! Настроен ${preset.title} проект`
);
console.log('\n📦 Установите зависимости:');
console.log(`   npm i -D ${preset.peerDependencies.join(' ')}`);
console.log('\n💡 Доступные пресеты:');
console.log('   npx dotfiles-init');
console.log('   npx dotfiles-init --react');

function writeConfigFile(filename, content) {
  const filePath = path.join(targetDir, filename);

  if (fs.existsSync(filePath)) {
    console.log(`⚠️  ${filename} уже существует, пропускаем`);
    return;
  }

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Создан ${filename}`);
  } catch (error) {
    console.error(`❌ Ошибка создания ${filename}:`, error.message);
  }
}
