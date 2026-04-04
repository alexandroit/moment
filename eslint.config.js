const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: ['build/**', 'dist/**', 'docs/**', 'min/**', 'node_modules/**'],
    },
    js.configs.recommended,
    {
        files: ['Gruntfile.js', 'tasks/**/*.js', 'src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                Symbol: 'readonly',
            },
        },
        rules: {
            'no-console': 0,
            'no-empty': ['error', { allowEmptyCatch: true }],
            'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
            'no-useless-escape': 0,
            'one-var': 'error',
        },
    },
];
