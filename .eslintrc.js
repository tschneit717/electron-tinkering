module.exports = {
  'parser': '@typescript-eslint/parser',
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  'overrides': [],
  'parserOptions': {
    'ecmaFeatures': {
      jsx: true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'rules': {
    'react/react-in-jsx-scope': 0
  }
}
