# Repository Guidelines

## Project Structure & Module Organization
This repository ships shared frontend tooling presets and a small bootstrap CLI.
- Root config modules: `eslint.js`, `eslint-react.js`, `prettier.js`, `stylelint.js`
- CLI entrypoint: `bin/init.js` (published as `dotfiles-init`)
- Package metadata and exports: `package.json`
- Template files for consumer projects: `.editorconfig`, `.gitignore`, `.browserslistrc`

Keep new functionality close to the relevant preset file; avoid creating deep folders unless logic grows beyond single-module scope.

## Build, Test, and Development Commands
- `npm run init` — runs `node bin/init.js` locally to verify bootstrap behavior.
- `npm run smoke` — runs automated smoke checks for generated config files.
- `npx dotfiles-init` — tests the published CLI flow in a consumer project.
- `npx dotfiles-init --react` — validates React-specific setup path.
- `npm pack` — creates a tarball to verify published file contents and `exports`.

Note: `npm test` is currently a placeholder and intentionally fails.

## Coding Style & Naming Conventions
- Module system: CommonJS (`module.exports`, `require`).
- Formatting: follow existing Prettier config in `prettier.js`.
- Lint presets: extend from `eslint.js` / `eslint-react.js`; keep rule changes minimal and explicit.
- Naming: use descriptive, tool-aligned filenames (`eslint-react.js`, not generic names like `config2.js`).
- CLI changes should remain idempotent: re-running init should not break existing project files.

## Testing Guidelines
There is no full unit/integration test suite yet. Validate changes through:
- Automated smoke check (`npm run smoke`).
- Local CLI smoke runs (`npm run init`, `npx dotfiles-init --react` in a temp folder).
- Sanity checks that exported paths from `package.json` resolve correctly.

When adding tests in the future, place them under `tests/` and name files `*.test.js`.

## Commit & Pull Request Guidelines
Current git history is minimal (`Initial commit`, `Add files`), so use clear imperative commits going forward.
- Preferred format: `type(scope): short summary` (example: `chore(eslint): tighten import rules`).
- Keep commits focused to one concern.
- PRs should include: purpose, changed files, validation steps, and before/after examples for CLI behavior.
- Link related issues and attach terminal output snippets when changing bootstrap logic.
- For every user-visible or maintenance change, update `CHANGELOG.md` in the same task. Keep the journal in Russian, append a dated version section, and record both what changed and any important conclusions or compatibility notes.

## Security & Configuration Tips
Treat generated config files as code: avoid writing unsafe shell fragments from user input in `bin/init.js`. Validate paths before file writes to prevent accidental overwrite outside the target project.
