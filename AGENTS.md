# Repository Guidelines

## Project Structure & Module Organization
This repository ships shared frontend linting templates for copying into consumer projects.
- Root config modules: `eslint.js`, `eslint-react.js`, `prettier.js`, `stylelint.js`
- Template files for consumer projects: `.editorconfig`, `.gitignore`, `.browserslistrc`
- Private package manifest for release version and maintenance dependencies: `package.json`

Keep new functionality close to the relevant config file; avoid creating deep folders unless logic grows beyond single-module scope.

## Build, Test, and Development Commands
- `ncu` — checks dependency updates in `package.json`.

There is no bootstrap CLI in this repository. Validate config changes by reviewing the edited template files and, when needed, copying them into a temporary consumer project.

## Coding Style & Naming Conventions
- Module system: CommonJS (`module.exports`, `require`).
- Formatting: follow existing Prettier config in `prettier.js`.
- Lint presets: extend from `eslint.js` / `eslint-react.js`; keep rule changes minimal and explicit.
- Naming: use descriptive, tool-aligned filenames (`eslint-react.js`, not generic names like `config2.js`).

## Testing Guidelines
There is no full unit/integration test suite yet. Validate changes through:
- Direct review of changed config files.
- Temporary consumer-project smoke runs when config behavior changes.
- Sanity checks that README copy maps source files to the intended target filenames.

When adding tests in the future, place them under `tests/` and name files `*.test.js`.

## Commit & Pull Request Guidelines
Current git history is minimal (`Initial commit`, `Add files`), so use clear imperative commits going forward.
- Preferred format: `type(scope): short summary` (example: `chore(eslint): tighten import rules`).
- Keep commits focused to one concern.
- PRs should include: purpose, changed files, validation steps, and before/after examples when config behavior changes.
- Link related issues and attach terminal output snippets when validating in a consumer project.
- For every user-visible or maintenance change, update `CHANGELOG.md` in the same task. Keep the journal in Russian, append a dated version section, and record both what changed and any important conclusions or compatibility notes.

## Security & Configuration Tips
Treat copied config files as code. When documenting copy steps, avoid unsafe shell fragments and keep target filenames explicit.
