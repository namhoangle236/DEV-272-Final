// ESLint flat config (no legacy "env", fully compatible with Flat Config)

import tsParser from '@typescript-eslint/parser'; // Importing the TypeScript parser for ESLint
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReact from 'eslint-plugin-react';

export default [
  {
    // File pattern to apply config to
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
      },
    },

    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
    },

    settings: {
      react: {
        version: 'detect', // auto-detect React version
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off', // DISABLE this outdated rule
      'prettier/prettier': 'off',        // treat Prettier issues as ESLint errors -> turn this off
      'no-unused-vars': 'warn',          // will warn if variables are unused
      'semi': ['off'],                   // Doesn't enforces semicolons
      'quotes': 'off',                   // 🔧 disable quote rule, either "" or '' is fine
    },
  },
];
