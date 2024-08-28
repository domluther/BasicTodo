module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'always',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
