# План обновления dotfiles25

Дата: 2026-06-16

## Актуальный контракт

`dotfiles25` больше не используется как npm-пакет, CLI или зависимость проекта-потребителя.

Репозиторий нужен как шаблонный набор файлов:

- `eslint.js`;
- `eslint-react.js`;
- `prettier.js`;
- `stylelint.js`;
- `.editorconfig`;
- `.gitignore`;
- `.browserslistrc`.

ИИ копирует эти файлы в проект-потребитель и ставит нужные dev-зависимости.

## Зачем оставлен package.json

`package.json` оставлен как private package manifest для версии релиза и сопровождения зависимостей.

В нём нет:

- `bin`;
- `exports`;
- public package entrypoints.

В нём есть:

- `name`;
- `version`;
- `description`;
- `private: true`;
- `type: commonjs`;
- repository metadata;
- `devDependencies` с актуальной compatibility matrix.

Так обычный `ncu` снова работает без `--dep peer`.

## Выполнено

- Подготовлен релиз `0.2.0`: `CHANGELOG.md` переведён с `Unreleased` на `0.2.0`.
- Удалены `presets.js`, `bin/init.js`, `bin/smoke.js`.
- `package.json` оформлен как normal private manifest с версией, описанием и `devDependencies`.
- `package-lock.json` сохранён для воспроизводимого локального install/verify.
- README переведён на copy-only сценарий.
- `AGENTS.md` синхронизирован с новой структурой.
- `CHANGELOG.md` обновлён.
- `eslint` и `@eslint/js` оставлены на `^9.39.4`, потому что `eslint-plugin-react@7.37.5` пока не поддерживает `eslint@10`.
- Обновлены совместимые зависимости:
  - `prettier` до `^3.8.4`;
  - `eslint-plugin-prettier` до `^5.5.6`;
  - `globals` до `^17.6.0`;
  - `stylelint` до `^17.13.0`;
  - `stylelint-config-recess-order` до `^7.7.0`;
  - `stylelint-order` до `^8.1.1`.
- В самих правилах `eslint.js`, `eslint-react.js`, `prettier.js` и `stylelint.js` изменений не потребовалось.

## Как обновлять дальше

1. Запустить `ncu`.
2. Проверить major-обновления по peer ranges связанных пакетов.
3. Обновить `package.json` совместимыми группами.
4. Синхронизировать версии в README.
5. Проверить, нужны ли изменения в самих конфигах.
6. Записать выводы в `CHANGELOG.md`.
