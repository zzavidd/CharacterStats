/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: '@zzavidd/eslint-config/react-ts',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['**/tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/consistent-type-exports': 'off',
  },
};
