module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Basic rules for TypeScript
    'no-unused-vars': 'off', // Turn off for TypeScript
    '@typescript-eslint/no-unused-vars': 'error',
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js'],
};
