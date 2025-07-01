import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      // Possible errors
      'no-console': 'warn',
      'no-debugger': 'error',

      // Best practices
      eqeqeq: 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Variables
      'no-unused-vars': 'warn',
      'no-undef': 'error',

      // Stylistic issues
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // ES6
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-spacing': 'error',
      'template-curly-spacing': 'error',
    },
  },
  {
    files: ['**/*.js', 'src/**/*.js'],
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
  // Thêm cấu hình để tắt các rule xung đột với Prettier
  eslintConfigPrettier,
];
