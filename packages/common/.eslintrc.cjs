module.exports = {
    extends: '../../.eslintrc.cjs',
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
        ]
    }
}
