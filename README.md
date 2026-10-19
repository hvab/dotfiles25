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
npm i -D eslint@^9.39.5 @eslint/js@^9.39.5 globals@^17.13.0 prettier@^3.9.10 eslint-plugin-prettier@^5.5.7 eslint-config-prettier@^10.1.8 stylelint@^17.16.0 stylelint-config-standard@^40.0.0 stylelint-config-recess-order@^7.8.0 stylelint-order@^8.1.2
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
npm i -D eslint@^9.39.5 @eslint/js@^9.39.5 globals@^17.13.0 prettier@^3.9.10 eslint-plugin-prettier@^5.5.7 eslint-config-prettier@^10.1.8 eslint-plugin-react@^7.37.5 stylelint@^17.16.0 stylelint-config-standard@^40.0.0 stylelint-config-recess-order@^7.8.0 stylelint-order@^8.1.2
```

React-пресет явно включает `.js`, `.mjs`, `.cjs` и `.jsx`; TypeScript/TSX требует отдельного парсера и настроек проекта.

## Поддерживаемый стек

- Node.js: `>=20.19.0`
- ESLint: `^9.39.5`
- `@eslint/js`: `^9.39.5`
- `eslint-plugin-react`: `^7.37.5`
- Prettier: `^3.9.10`
- Stylelint: `^17.16.0`
- `stylelint-config-standard`: `^40.0.0`
- `stylelint-config-recess-order`: `^7.8.0`
- `stylelint-order`: `^8.1.2`

Известное ограничение:

- `eslint@10` пока не поддерживается в React-конфиге: [eslint-plugin-react@7.37.5](https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.37.5/package.json) объявляет поддержку только до `eslint@9`. Оба пресета используют общую совместимую ветку `9.39.5`; установка с `--force` или `--legacy-peer-deps` не нужна.
- ESLint 9 [достиг конца поддержки 2026-08-06](https://eslint.org/version-support/); до обновления или замены React-плагина это осознанное ограничение стека.

## Обновление

1. Запустить `ncu` в корне репозитория. Дополнительно запустить `ncu --target minor`, чтобы увидеть обновления внутри текущих major-веток.
2. Обновить `devDependencies` в `package.json` совместимыми группами.
3. Обновить версии в этом README.
4. Проверить, нужны ли изменения в `eslint.js`, `eslint-react.js`, `prettier.js`, `stylelint.js`.
5. Зафиксировать выводы в `CHANGELOG.md`.

`package.json` нужен для версии релиза и сопровождения зависимостей через `ncu`. Пакет остаётся `private`, поэтому проекты-потребители не должны устанавливать этот репозиторий как зависимость.
