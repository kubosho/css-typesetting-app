module.exports = {
  'root': true,

  'env': {
    'node': true,
    'es6': true
  },

  'extends': [
    'eslint:recommended'
  ],

  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'script',
    'ecmaFeatures': {
      impliedStrict: true,
      jsx: true
    }
  }
};
