// eslint.config.mjs
import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
]);
