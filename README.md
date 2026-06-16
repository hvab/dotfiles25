# dotfiles25

Личные шаблоны для фронтенд-проектов: ESLint, Prettier, Stylelint и базовые dotfiles.

Репозиторий больше не используется как npm-пакет, CLI или зависимость проекта-потребителя. Это актуальный набор файлов-эталонов, которые Codex копирует в новый проект.

## Контракт

`dotfiles25` хранит:

- базовый ESLint-конфиг: `eslint.js`;
- React ESLint-конфиг: `eslint-react.js`;
- Prettier-конфиг: `prettier.js`;
- Stylelint-конфиг: `stylelint.js`;
- шаблоны `.editorconfig`, `.gitignore`, `.browserslistrc`;
- служебный `package.json` со списком зависимостей для `ncu`.

Не входит в ответственность репозитория:

- публикация npm-пакета;
- CLI для инициализации проекта;
- lockfile и обязательное локальное дерево зависимостей;
- автоматическое обновление проектов-потребителей;
- настройка TypeScript;
- framework-специфичные правила кроме базового React-пресета.

## Как применять

### Базовый JS-проект

Скопировать в проект:

- `eslint.js` -> `eslint.config.cjs`
- `prettier.js` -> `prettier.config.cjs`
- `stylelint.js` -> `.stylelintrc.cjs`
- `.editorconfig` -> `.editorconfig`
- `.gitignore` -> `.gitignore`
- `.browserslistrc` -> `.browserslistrc`

Зависимости для проекта-потребителя:

```bash
npm i -D eslint@^9.39.4 @eslint/js@^9.39.4 globals@^17.6.0 prettier@^3.8.4 eslint-plugin-prettier@^5.5.6 eslint-config-prettier@^10.1.8 stylelint@^17.13.0 stylelint-config-standard@^40.0.0 stylelint-config-recess-order@^7.7.0 stylelint-order@^8.1.1
```

### React-проект

Скопировать в проект:

- `eslint-react.js` -> `eslint.config.cjs`
- `prettier.js` -> `prettier.config.cjs`
- `stylelint.js` -> `.stylelintrc.cjs`
- `.editorconfig` -> `.editorconfig`
- `.gitignore` -> `.gitignore`
- `.browserslistrc` -> `.browserslistrc`

Зависимости для проекта-потребителя:

```bash
npm i -D eslint@^9.39.4 @eslint/js@^9.39.4 globals@^17.6.0 prettier@^3.8.4 eslint-plugin-prettier@^5.5.6 eslint-config-prettier@^10.1.8 eslint-plugin-react@^7.37.5 stylelint@^17.13.0 stylelint-config-standard@^40.0.0 stylelint-config-recess-order@^7.7.0 stylelint-order@^8.1.1
```

## Поддерживаемый стек

- Node.js: `>=20.19.0`
- ESLint: `^9.39.4`
- `@eslint/js`: `^9.39.4`
- `eslint-plugin-react`: `^7.37.5`
- Prettier: `^3.8.4`
- Stylelint: `^17.13.0`
- `stylelint-config-standard`: `^40.0.0`
- `stylelint-config-recess-order`: `^7.7.0`
- `stylelint-order`: `^8.1.1`

Известное ограничение:

- `eslint@10` пока не поддерживается в React-конфиге, потому что `eslint-plugin-react@7.37.5` несовместим с этой major-веткой.

## Обновление

1. Запустить `ncu` в корне репозитория.
2. Обновить `devDependencies` в `package.json` совместимыми группами.
3. Обновить версии в этом README.
4. Проверить, нужны ли изменения в `eslint.js`, `eslint-react.js`, `prettier.js`, `stylelint.js`.
5. Зафиксировать выводы в `CHANGELOG.md`.

`package.json` нужен для версии релиза и сопровождения зависимостей через `ncu`. Пакет остаётся `private`, поэтому проекты-потребители не должны устанавливать этот репозиторий как зависимость.
