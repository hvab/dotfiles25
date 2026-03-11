# dotfiles25

Личные конфиги для фронта: ESLint, Prettier, Stylelint, шаблоны файлов и небольшой bootstrap для новых проектов.

Основной сценарий использования: открыть новый проект в Codex, дать путь до этого репозитория и применить один из пресетов из `presets.js`. CLI `dotfiles-init` остается вспомогательным способом, а не единственным источником истины.

## Контракт

`dotfiles25` гарантирует:

- два пресета: `base` и `react`;
- готовые файлы конфигурации для ESLint, Prettier и Stylelint;
- копирование `.editorconfig`, `.gitignore`, `.browserslistrc`;
- совместимые версии peer-зависимостей, описанные в `presets.js`.

Не входит в ответственность пакета:

- настройка TypeScript;
- framework-специфичные правила кроме базового React-пресета;
- автоматическое обновление peer-зависимостей в проектах-потребителях.

## Поддерживаемый стек

- Node.js: `>=20.19.0`
- ESLint: `^9.39.4`
- `@eslint/js`: `^9.39.4`
- `eslint-plugin-react`: `^7.37.5`
- Prettier: `^3.8.1`
- Stylelint: `^17.4.0`
- `stylelint-config-standard`: `^40.0.0`
- `stylelint-config-recess-order`: `^7.6.1`
- `stylelint-order`: `^7.0.1`

Известные ограничения:

- `eslint@10` пока не поддерживается, потому что `eslint-plugin-react@7.37.5` несовместим с этой major-веткой.
- `stylelint-order@8` пока не поддерживается, потому что `stylelint-config-recess-order@7.6.1` требует `stylelint-order@^7`.

## Установка

```bash
# dev‑зависимость напрямую из GitHub
npm i -D github:hvab/dotfiles25
```

## Рецепты подключения

### Через Codex

1. Дай Codex путь до этого репозитория.
2. Попроси выбрать пресет из `presets.js`.
3. Попроси создать файлы из секции `files`, скопировать `templates` и установить `peerDependencies` выбранного пресета.

Пример запроса:

```text
Возьми пресет react из /Users/hob/Code/dotfiles25/presets.js, примени его в текущем проекте, создай нужные конфиги, скопируй шаблоны и установи совместимые зависимости.
```

### Базовый JS-проект

```bash
npm i -D github:hvab/dotfiles25
npm i -D eslint@^9.39.4 @eslint/js@^9.39.4 globals@^17.4.0 prettier@^3.8.1 eslint-plugin-prettier@^5.5.5 eslint-config-prettier@^10.1.8 stylelint@^17.4.0 stylelint-config-standard@^40.0.0 stylelint-config-recess-order@^7.6.1 stylelint-order@^7.0.1
```

Создай `eslint.config.cjs`:

```js
module.exports = require('dotfiles25/eslint');
```

Создай `prettier.config.cjs`:

```js
module.exports = require('dotfiles25/prettier');
```

Создай `.stylelintrc.cjs`:

```js
module.exports = {
  extends: 'dotfiles25/stylelint',
};
```

Скопируй шаблоны:

```bash
cp node_modules/dotfiles25/{.editorconfig,.gitignore,.browserslistrc} .
```

### React-проект

```bash
npm i -D github:hvab/dotfiles25
npm i -D eslint@^9.39.4 @eslint/js@^9.39.4 globals@^17.4.0 prettier@^3.8.1 eslint-plugin-prettier@^5.5.5 eslint-config-prettier@^10.1.8 eslint-plugin-react@^7.37.5 stylelint@^17.4.0 stylelint-config-standard@^40.0.0 stylelint-config-recess-order@^7.6.1 stylelint-order@^7.0.1
```

Создай `eslint.config.cjs`:

```js
module.exports = require('dotfiles25/eslint-react');
```

Остальные файлы такие же, как в базовом пресете.

### Через CLI

```bash
# Базовый проект
npx dotfiles-init

# React проект
npx dotfiles-init --react
```

`bin/init.js` использует тот же манифест `presets.js`, поэтому ручной сценарий, Codex и CLI синхронизированы.

## Локальная проверка

```bash
npm run verify
```

Сейчас команда запускает smoke-проверку и валидирует:

- базовый пресет;
- React-пресет;
- копирование шаблонов;
- точное содержимое сгенерированных конфигов.

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

- `presets.js` — источник истины для пресетов, файлов и совместимых зависимостей
- `bin/init.js` — CLI, который применяет пресет из `presets.js`
- `bin/smoke.js` — локальная smoke-проверка пресетов
- `eslint.js` — базовый ESLint + Prettier
- `eslint-react.js` — React-пресет ESLint
- `prettier.js` — конфиг Prettier
- `stylelint.js` — Stylelint c сортировкой свойств
- `.editorconfig`, `.gitignore`, `.browserslistrc` — шаблоны для копирования
