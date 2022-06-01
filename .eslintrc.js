module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    '@typescript-eslint/no-empty-function',
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.yarn/'],
}
