// eslint.config.js
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import google from 'eslint-config-google';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': ts
    },
    rules: {
      ...google.rules,
      'quotes': ['error', 'double'],
      'linebreak-style': ['error', 'unix'],
      'max-len': ['error', { 'code': 120 }],
      'require-jsdoc': 'off',
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always']
    }
  }
];