# dotfiles25

Личные конфиги для фронта (ESLint, Prettier, Stylelint + полезные шаблоны).

## Установка

```bash
# dev‑зависимость напрямую из GitHub
npm i -D github:hvab/dotfiles25
```

## Быстрый старт

### Автоматическая настройка

```bash
# Базовый проект (копирует шаблоны + создаёт конфиги)
npx dotfiles-init

# React проект
npx dotfiles-init --react
```

### Установка зависимостей

После инициализации установи необходимые инструменты:

```bash
# Базовый набор (ESLint + Prettier + Stylelint)
npm i -D eslint@^8.0.0 prettier eslint-plugin-prettier eslint-config-prettier stylelint stylelint-config-standard stylelint-config-recess-order stylelint-order

# Дополнительно для React
npm i -D eslint-plugin-react
```

### Ручная настройка

1. **ESLint**

   Создай файл `.eslintrc.cjs` в корне проекта:

   ```js
   // Базовый конфиг
   module.exports = require('dotfiles25/eslint');

   // Для React проектов
   module.exports = require('dotfiles25/eslint-react');
   ```

2. **Prettier**

   В `package.json` добавь поле:

   ```jsonc
   {
     "prettier": "dotfiles25/prettier",
   }
   ```

   или создай `prettier.config.cjs`:

   ```js
   module.exports = require('dotfiles25/prettier');
   ```

3. **Stylelint**

   Создай `.stylelintrc.cjs`:

   ```js
   module.exports = {
     extends: 'dotfiles25/stylelint',
   };
   ```

4. **Шаблоны файлов**

   Скопируй дополнительные файлы из пакета (или этого репозитория) в корень проекта:

   ```
   .editorconfig
   .gitignore
   .browserslistrc
   ```

   Пример:

   ```bash
   cp node_modules/dotfiles25/{.editorconfig,.gitignore,.browserslistrc} .
   ```

## Обновление

### 1. Выпускаем новую версию dotfiles25

```bash
# увеличиваем версию в package.json, например 0.1.3 → 0.1.4
git add package.json
git commit -m "chore(release): v0.1.4"
git tag v0.1.4
git push && git push --tags
```

### 2. Обновляем проекты‑потребители

**Вариант A — глобальный апдейт**

```bash
npm up dotfiles25
```

**Вариант B — жёстко на нужный тег**

В `package.json` проекта:

```jsonc
{
  "devDependencies": {
    "dotfiles25": "github:hvab/dotfiles25#v0.1.4",
  },
}
```

Затем:

```bash
npm install
```

После этого ESLint / Prettier / Stylelint автоматически подтянут новые правила.

## Состав

- `eslint.js` — базовый ESLint + Prettier
- `prettier.js` — конфиг Prettier
- `stylelint.js` — Stylelint c сортировкой свойств
- `.editorconfig`, `.gitignore`, `.browserslistrc` — шаблоны для копирования
