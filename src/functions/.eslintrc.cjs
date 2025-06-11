// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    node: true,
    es2022: true
  },
  rules: {
    'quotes': ['error', 'double'],
    'linebreak-style': ['error', 'unix'],
    'max-len': ['error', { 'code': 120 }],
    'require-jsdoc': 'off',
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always']
  }
};