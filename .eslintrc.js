/*eslint-disable */
module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2020': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 11,
  },
  'rules': {
    'camelcase': [0, {'properties': 'never'}],
    'linebreak-style': 0,
    'indent': [2, 2],
    'max-len': [2, 120],
    'new-cap': 0,
    'no-extra-parens': [2, 'functions'],
    'no-magic-numbers': [2, {'ignore': [0, 1]}],
    'no-ternary': 0,
    'no-undefined': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'one-var': [2, 'never'],
    'padded-blocks': [2, 'never'],
  },
};
