// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    jquery: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'indent': 0,
    'no-multiple-empty-lines': ["error", { "max": 2, "maxBOF": 1}],
    'space-before-function-paren': 0,
    'disable-next-line': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 'off'
  }
}
