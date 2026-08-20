module.exports = function (grunt) {
    grunt.config('copy.index-files', {
        expand: true,
        cwd: 'build/umd/',
        src: [
            'moment.js',
            'locale/*.js',
            'min/locales.js',
            'min/moment-with-locales.js',
            'min/tests.js',
        ],
        dest: '.',
    });
    grunt.config('copy.esm', {
        expand: true,
        cwd: 'build/esm',
        src: ['moment.js'],
        dest: 'dist',
    });
    grunt.config('copy.esm-locales', {
        expand: true,
        cwd: 'src',
        src: ['locale/*.js'],
        dest: 'dist',
        options: {
            process: function (content) {
                return content.replace(
                    /from ['"]\.\.\/moment['"];?/,
                    "from '../moment.js';"
                );
            },
        },
    });

    grunt.registerTask('write-esm-package', function () {
        grunt.file.write(
            'dist/package.json',
            JSON.stringify({ type: 'module' }, null, 2) + '\n'
        );
    });

    grunt.registerTask('update-index', [
        'copy:index-files',
        'copy:esm',
        'copy:esm-locales',
        'write-esm-package',
    ]);
};
