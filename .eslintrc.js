/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  settings: {
    overrides: [],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: ['./tsconfig.json']
    },
    'import/resolver': {
      node: {
        paths: ['src']
      }
    },
    react: {
      version: 'detect'
    }
  },
  rules: {
    'indent': ['error', 2],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/space-before-function-paren': 'off'
  }
}
