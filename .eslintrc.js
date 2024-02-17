module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // ここにカスタムルールを追加
    'indent': ['error', 2], // インデントはスペース2つ
    'linebreak-style': ['error', 'unix'], // 改行コードはUnixスタイル
    'quotes': ['error', 'single'], // シングルクォートのみ許可
    'semi': ['error', 'always'], // 文の末尾にセミコロン必須
    '@typescript-eslint/no-unused-vars': ['warn'], // 未使用変数は警告
  },
};  