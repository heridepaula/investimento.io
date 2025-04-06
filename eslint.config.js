import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'

const compat = new FlatCompat()

export default [
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['.next', 'node_modules'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]
