module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            options: {
                browserNoActivityTimeout: 60000,
                browserDisconnectTimeout: 10000,
                browserDisconnectTolerance: 2,
                frameworks: ['qunit'],
                files: ['min/moment-with-locales.js', 'min/tests.js'],
            },
            server: {
                browsers: [],
            },
            chrome: {
                singleRun: true,
                browsers: ['Chrome'],
            },
            firefox: {
                singleRun: true,
                browsers: ['Firefox'],
            },
        },
        uglify: {
            main: {
                files: {
                    'min/moment-with-locales.min.js':
                        'min/moment-with-locales.js',
                    'min/locales.min.js': 'min/locales.js',
                    'min/moment.min.js': 'moment.js',
                },
            },
            options: {
                sourceMap: true,
                mangle: true,
                compress: {
                    dead_code: false,
                },
                output: {
                    ascii_only: true,
                },
                report: 'min',
                preserveComments: /^!|@preserve|@license|@cc_on/i,
            },
        },
        benchmark: {
            compare: { src: ['benchmarks/compare.js'] },
            startOf: { src: ['benchmarks/startOf.js'] },
            endOf: { src: ['benchmarks/endOf.js'] },
            get: { src: ['benchmarks/get.js'] },
            set: { src: ['benchmarks/set.js'] },
            all: { src: ['benchmarks/*.js'] },
        },
        exec: {
            'meteor-publish': {
                command: 'cd meteor && meteor publish',
            },
            'typescript-test': {
                command: 'npm run typescript-test',
            },
            eslint: {
                command: 'npm run eslint',
            },
            checkMonthsParseIssue: {
                // Each locale should have all (3) or none (0) of monthsParse: configs.
                command:
                    'if [ $(ls src/locale/* | while read -r line; do grep -i "monthsParse:" $line | wc -l; done | sort | uniq | wc -l) -ne 2 ]; then echo "Months parse issue: see https://github.com/moment/moment/issues/2754"; exit 1; fi',
            },
            'prettier-fmt': {
                command: function () {
                    var nodeMajor = parseInt(
                        process.version.slice(1).split('.')[0],
                        10
                    );
                    if (nodeMajor < 10) {
                        return "echo 'NOT running prettier on node < v10'";
                    }
                    return 'npm run prettier-fmt';
                },
            },
            'prettier-check': {
                command: function () {
                    var nodeMajor = parseInt(
                        process.version.slice(1).split('.')[0],
                        10
                    );
                    if (nodeMajor < 10) {
                        return "echo 'NOT running prettier on node < v10'";
                    }
                    return 'npm run prettier-check';
                },
            },
        },
    });

    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt);

    // Default task.
    grunt.registerTask('default', ['lint', 'test']);

    // linting
    grunt.registerTask('lint', [
        'exec:eslint',
        'exec:prettier-check',
        'exec:checkMonthsParseIssue',
    ]);

    // test tasks
    grunt.registerTask('test', ['test:node', 'test:typescript']);
    grunt.registerTask('test:node', ['transpile', 'qtest']);
    grunt.registerTask('test:typescript', ['exec:typescript-test']);
    // TODO: For some weird reason karma doesn't like the files in
    // build/umd/min/* but works with min/*, so update-index, then git checkout
    grunt.registerTask('test:server', [
        'transpile',
        'update-index',
        'karma:server',
    ]);
    grunt.registerTask('test:browser', [
        'transpile',
        'update-index',
        'karma:chrome',
        'karma:firefox',
    ]);
    // travis build task
    grunt.registerTask('build:travis', ['lint', 'test']);
    grunt.registerTask('meteor-publish', ['exec:meteor-publish']);

    // Task to be run when releasing a new version
    grunt.registerTask('release', [
        'default',
        'update-index',
        'component',
        'uglify:main',
    ]);
};
