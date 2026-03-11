const packageName = 'dotfiles25';

const templates = ['.editorconfig', '.gitignore', '.browserslistrc'];

const sharedFiles = {
  'prettier.config.cjs': `module.exports = require('${packageName}/prettier');
`,
  '.stylelintrc.cjs': `module.exports = {
  extends: '${packageName}/stylelint',
};
`,
};

const supported = {
  node: '>=20.19.0',
  eslint: '^9.39.4',
  '@eslint/js': '^9.39.4',
  eslintPluginReact: '^7.37.5',
  prettier: '^3.8.1',
  eslintPluginPrettier: '^5.5.5',
  eslintConfigPrettier: '^10.1.8',
  globals: '^17.4.0',
  stylelint: '^17.4.0',
  stylelintConfigStandard: '^40.0.0',
  stylelintConfigRecessOrder: '^7.6.1',
  stylelintOrder: '^7.0.1',
};

const presets = {
  base: {
    key: 'base',
    title: 'Базовый JS',
    description: 'Базовый проект с ESLint, Prettier, Stylelint и шаблонами.',
    flags: [],
    files: {
      'eslint.config.cjs': `module.exports = require('${packageName}/eslint');
`,
      ...sharedFiles,
    },
    peerDependencies: [
      `eslint@${supported.eslint}`,
      `@eslint/js@${supported['@eslint/js']}`,
      `globals@${supported.globals}`,
      `prettier@${supported.prettier}`,
      `eslint-plugin-prettier@${supported.eslintPluginPrettier}`,
      `eslint-config-prettier@${supported.eslintConfigPrettier}`,
      `stylelint@${supported.stylelint}`,
      `stylelint-config-standard@${supported.stylelintConfigStandard}`,
      `stylelint-config-recess-order@${supported.stylelintConfigRecessOrder}`,
      `stylelint-order@${supported.stylelintOrder}`,
    ],
  },
  react: {
    key: 'react',
    title: 'React',
    description: 'React-проект с JSX и eslint-plugin-react.',
    flags: ['--react'],
    files: {
      'eslint.config.cjs': `module.exports = require('${packageName}/eslint-react');
`,
      ...sharedFiles,
    },
    peerDependencies: [
      `eslint@${supported.eslint}`,
      `@eslint/js@${supported['@eslint/js']}`,
      `globals@${supported.globals}`,
      `prettier@${supported.prettier}`,
      `eslint-plugin-prettier@${supported.eslintPluginPrettier}`,
      `eslint-config-prettier@${supported.eslintConfigPrettier}`,
      `eslint-plugin-react@${supported.eslintPluginReact}`,
      `stylelint@${supported.stylelint}`,
      `stylelint-config-standard@${supported.stylelintConfigStandard}`,
      `stylelint-config-recess-order@${supported.stylelintConfigRecessOrder}`,
      `stylelint-order@${supported.stylelintOrder}`,
    ],
  },
};

module.exports = {
  defaultPreset: 'base',
  packageName,
  presets,
  supported,
  templates,
};
