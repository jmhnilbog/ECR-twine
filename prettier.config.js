// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    parser: 'babel',
    overrides: [
        {
            files: '*.css',
            options: {
                parser: 'css',
            },
        },
        {
            files: '*.twee',
            options: {
                parser: 'markdown',
            },
        },
        {
            files: '*.ts',
            options: {
                parser: 'typescript',
            },
        },
    ],
};

module.exports = config;
