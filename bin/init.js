#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templates = ['.editorconfig', '.gitignore', '.browserslistrc'];
const packageDir = path.dirname(__dirname);
const targetDir = process.cwd();

// Определяем тип проекта из аргументов
const args = process.argv.slice(2);
const projectType = args.includes('--react') ? 'react' : 'base';

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

// ESLint
const eslintConfig =
  projectType === 'react' ? 'dotfiles25/eslint-react' : 'dotfiles25/eslint';

const eslintContent = `module.exports = require('${eslintConfig}');
`;

writeConfigFile('eslint.config.cjs', eslintContent);

// Prettier
const prettierContent = `module.exports = require('dotfiles25/prettier');
`;

writeConfigFile('prettier.config.cjs', prettierContent);

// Stylelint
const stylelintContent = `module.exports = {
  extends: 'dotfiles25/stylelint',
};
`;

writeConfigFile('.stylelintrc.cjs', stylelintContent);

console.log(
  `\n🎉 Готово! Настроен ${projectType === 'base' ? 'базовый' : projectType.toUpperCase()} проект`
);
console.log('\n💡 Доступные флаги:');
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
