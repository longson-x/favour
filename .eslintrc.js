module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    "_hmt": "readonly"
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'standard/no-callback-literal': 'off',
    'space-before-function-paren': ['error', 'never'],
    "comma-dangle": ["error", "always-multiline"],
  }
}
