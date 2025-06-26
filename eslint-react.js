module.exports = {
  ...require('./eslint.js'),
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
