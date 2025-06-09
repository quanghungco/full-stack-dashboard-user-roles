// eslint.config.js
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    files: ['src/**/*.{js,ts}'],
    ignores: [
      '**/*.d.ts',
      'lib/**',
      'node_modules/**',
      '.git/**',
      'firebase-debug.log',
      'firebase-debug.*.log'
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      },
      globals: {
        ...globals.node
      },
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      'quotes': ['error', 'double'],
      'semi': ['error', 'always'],
      'max-len': ['error', { 
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'unix']
    }
  }
];