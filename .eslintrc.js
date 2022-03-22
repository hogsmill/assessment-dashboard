module.exports = {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/recommended'
    ],
    rules: {
      // override/add rules settings here, such as:
      'no-redeclare': 'warn',
      'no-undef': 'error',
      //'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'vue/require-prop-types': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'array-element-newline': 'off',
      'vue/attributes-order': ['error', {
        'order': [],
        'alphabetical': false
       }],
      'vue/max-attributes-per-line': ['error', {
        'singleline': 8,
        'multiline': 3
      }]
    },
    'overrides': [
      {
        'files': ['src/**/*.vue'],
        'rules': {
          'vue/multi-word-component-names': 0
        },
      }
    ],
    'globals': {
        'require': true,
        'module': true,
        'process': true
    }
  }
