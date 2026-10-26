# Changelog

Все заметные изменения в этом репозитории фиксируются в этом файле.

## [0.2.2] - 2026-10-26

### Изменено

- `stylelint-config-recess-order` обновлён до `^7.9.0`; синхронизированы lockfile и README.
- Добавлен `.ncurc.json`: `eslint` и `@eslint/js` исключены из проверок и обновлений через `ncu`; обновления React-плагина остаются видимыми.
- В README описаны причина сохранения ESLint 9, потери относительно ESLint 10 и порядок снятия исключений.

### Выводы

- [Recess Order 7.9.0](https://github.com/stormwarning/stylelint-config-recess-order/releases/tag/v7.9.0) совместим с текущими Stylelint 17 и stylelint-order 8; миграция `stylelint.js` не требуется.
- Сравнение опубликованных конфигов 7.8.0 и 7.9.0 выявило 24 добавленных свойства: `field-sizing`, `text-box*`, `text-autospace`, логические `border-block-*`/`border-inline-*`, SVG-свойства, MathML и `page`. Прежние свойства не удалены, их относительный порядок сохранён. Autofix теперь может переставлять новые свойства.
- `eslint-plugin-react@7.37.5` по-прежнему объявляет поддержку ESLint только до ветки 9. Исключения `ncu` скрывают также patch/minor-обновления двух пакетов; это не проверка совместимости и не ограничение для остальных ESLint-плагинов.
- Три правила, добавленные в `recommended` ESLint 10, уже доступны в ESLint 9.39.5, но сейчас не включены: `no-unassigned-vars`, `no-useless-assignment`, `preserve-caught-error`. Главные ограничения сохранения ветки 9 — завершённая поддержка upstream и отсутствие последующих улучшений диагностики.

## [0.2.1] - 2026-10-19

### Изменено

- Обновлены все зависимости, для которых доступны совместимые версии:
  - `eslint` и `@eslint/js` до `^9.39.5`;
  - `eslint-plugin-prettier` до `^5.5.7`;
  - `globals` до `^17.13.0`;
  - `prettier` до `^3.9.10`;
  - `stylelint` до `^17.16.0`;
  - `stylelint-config-recess-order` до `^7.8.0`;
  - `stylelint-order` до `^8.1.2`.
- Синхронизированы `package-lock.json` и команды установки в README; версия репозитория повышена до `0.2.1`.
- В `eslint-react.js` добавлена явная маска `.js`, `.mjs`, `.cjs`, `.jsx`: без неё `.jsx` игнорировались при обычном запуске ESLint.
- В инструкцию обновления добавлен `ncu --target minor`: обычный `ncu` может скрыть свежий патч текущей major-ветки за предложением следующей.

### Выводы

- ESLint 10 отложен по согласованию: [eslint-plugin-react@7.37.5](https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.37.5/package.json) поддерживает ESLint только до ветки 9. Установка не требует обхода peer-зависимостей. ESLint 9 [достиг EOL 2026-08-06](https://eslint.org/version-support/); это ограничение сохраняется до обновления или замены React-плагина.
- [ESLint 9.39.5](https://github.com/eslint/eslint/releases/tag/v9.39.5) исправляет обработку недоступного require cache; базовый flat config менять не требуется.
- [eslint-plugin-prettier 5.5.7](https://github.com/prettier/eslint-plugin-prettier/releases/tag/v5.5.7) исправляет позиции диагностик при разных окончаниях строк и зависание при невозможности загрузить worker.
- [Prettier 3.9.10](https://github.com/prettier/prettier/blob/3.9.10/CHANGELOG.md) включает обновления парсеров и форматирования, в том числе исправления Markdown, CSS и JS. `singleQuote`, `trailingComma` и `printWidth` остаются актуальными; форматирование существующих проектов может измениться после обновления.
- [Stylelint 17.14–17.16](https://github.com/stylelint/stylelint/blob/17.16.0/CHANGELOG.md) добавляет опции и правило `selector-no-unmatchable`, исправляет CSS-диагностики и autofix. Новые правила автоматически не включены в наш конфиг; текущие настройки остаются актуальными.
- [Recess Order 7.8.0](https://github.com/stormwarning/stylelint-config-recess-order/releases/tag/v7.8.0) добавляет multi-column-свойства перед flexbox, выделяет gap в отдельную группу и добавляет `transition-behavior`: порядок CSS-деклараций при autofix может измениться. [stylelint-order 8.1.2](https://github.com/hudochenkov/stylelint-order/releases/tag/8.1.2) готовит совместимость со Stylelint 18.
- `eslint-config-prettier`, `eslint-plugin-react` и `stylelint-config-standard` уже на последних версиях. CommonJS-конфиги, Node.js `>=20.19.0` и базовые dotfiles не требуют миграции.

## [0.2.0] - 2026-06-16

### Изменено

- README переведен на copy-only сценарий: репозиторий используется как источник для копирования конфигов и шаблонов, а не как npm-зависимость проекта-потребителя.
- Удалены `presets.js`, `bin/init.js` и `bin/smoke.js`: репозиторий больше не содержит CLI и локальную smoke-обвязку.
- `package.json` обновлён как нормальный private manifest с версией `0.2.0`, описанием, repo metadata и `devDependencies`.
- `package-lock.json` сохранён для воспроизводимого локального install/verify.
- README упрощен до прямой карты копирования файлов и списка зависимостей для проектов-потребителей.
- `AGENTS.md` синхронизирован с новой структурой репозитория без npm-пакета и CLI.
- Совместимые версии зависимостей обновлены:
  - `prettier` до `^3.8.4`;
  - `eslint-plugin-prettier` до `^5.5.6`;
  - `globals` до `^17.6.0`;
  - `stylelint` до `^17.13.0`;
  - `stylelint-config-recess-order` до `^7.7.0`;
  - `stylelint-order` до `^8.1.1`.

### Выводы

- Обычный `ncu` теперь снова показывает обновления, потому что зависимости хранятся в `devDependencies`.
- `eslint` и `@eslint/js` остаются на ветке `^9.39.4`: `eslint-plugin-react@7.37.5` пока не поддерживает `eslint@10`.
- `stylelint-order@8` теперь совместим с текущим стеком через `stylelint-config-recess-order@7.7.0`.
- `package.json` нужен для версии релиза и сопровождения зависимостей через `ncu`, но `private: true` не возвращает сценарий установки `dotfiles25` как зависимости.

## [0.1.3] - 2026-03-11

### Изменено

- Добавлен `presets.js` как единый источник истины для пресетов, шаблонов файлов, совместимых зависимостей и поддерживаемого стека.
- `bin/init.js` переведен на манифест пресетов вместо захардкоженных строк.
- `bin/smoke.js` переведен на манифест пресетов и теперь валидирует оба пресета через один источник данных.
- В `package.json` добавлены `exports` для `./presets`, `engines.node` и локальная команда `npm run verify`.
- `README.md` переписан под реальный сценарий использования через Codex, добавлены явные рецепты для `base` и `react`, контракт пакета и supported matrix.
- Версия пакета повышена до `0.1.3`.

### Выводы

- Для этого репозитория важнее быть стабильным эталоном для агента и новых проектов, чем универсальным CLI.
- Единый манифест снижает риск рассинхронизации между README, bootstrap-скриптом и фактическими зависимостями.
- Локальная команда `verify` полезнее внешнего CI, если основной сценарий работы остается локальным.

## [0.1.2] - 2026-03-11

### Изменено

- Добавлен этот `CHANGELOG.md`.
- Расширен `bin/smoke.js`: теперь он проверяет и базовый режим, и `--react`, а также копирование шаблонов `.editorconfig`, `.gitignore`, `.browserslistrc`.
- Версии peer-зависимостей приведены к совместимому состоянию:
  - `eslint` и `@eslint/js` зафиксированы на ветке `^9.39.4`;
  - `stylelint-order` возвращен на `^7.0.1`;
  - `globals` обновлен до `^17.4.0`;
  - `stylelint` обновлен до `^17.4.0`.
- Полностью пересобран `package-lock.json`, чтобы убрать конфликт со старым деревом зависимостей.
- В `AGENTS.md` добавлено правило о ведении журнала изменений.

### Почему

- `eslint-plugin-react@7.37.5` не поддерживает `eslint@10`.
- `stylelint-config-recess-order@7.6.1` требует `stylelint-order@^7`, поэтому `stylelint-order@8` с текущим стеком несовместим.
- Старый `package-lock.json` содержал устаревшие peer ranges и старое имя пакета, из-за чего `npm install` резолвил зависимости некорректно.

### Выводы

- `peerDependencies` в этом пакете нужно обновлять совместимыми группами, а не одной массовой командой.
- `eslint` нельзя поднимать до `10.x`, пока `eslint-plugin-react` не добавит поддержку этой major-ветки.
- `stylelint-order` нельзя поднимать до `8.x`, пока `stylelint-config-recess-order` не обновит свой peer range.
- Текущие конфиги `eslint.js`, `eslint-react.js` и `stylelint.js` менять не потребовалось.
- Smoke-проверка должна покрывать не только React-сценарий, но и базовую инициализацию и шаблонные файлы, иначе часть заявленного поведения остается без валидации.

## [0.1.1] - 2026-02-17

### Изменено

- Добавлен `AGENTS.md` с правилами для работы в репозитории.
- Добавлен `bin/smoke.js` для smoke-проверки пакета.
- Обновлены `eslint.js` и `eslint-react.js`.
- Доработаны `bin/init.js`, `README.md`, `package.json` и `package-lock.json`.

### Выводы

- В репозитории появился базовый процесс проверки пакета через smoke-скрипт.
- Правила для агентов и документация были выделены в отдельные артефакты, что упростило дальнейшее сопровождение.

## [0.1.0] - 2025-06-26

### Изменено

- Создан репозиторий и базовый `README.md`.
- Добавлены основные конфиги `eslint.js`, `eslint-react.js`, `prettier.js`, `stylelint.js`.
- Добавлен CLI `bin/init.js`.
- Добавлены шаблоны `.editorconfig`, `.gitignore`, `.browserslistrc`.
- Добавлены `package.json` и `package-lock.json`.

### Выводы

- Сформирован минимальный набор пресетов и шаблонов для инициализации фронтенд-проектов.
