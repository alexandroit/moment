module.exports = function (grunt) {
    grunt.task.registerTask('qtest', 'run tests locally', function () {
        var done = this.async(),
            testrunner,
            tests;

        function runSuite(testFiles, next) {
            testrunner.run(
                {
                    code: 'build/umd/moment.js',
                    tests: testFiles,
                },
                function (err, report) {
                    if (err) {
                        console.log('woot', err, report);
                        next(err);
                        return;
                    }

                    if (report.failed !== 0) {
                        next(new Error(report.failed + ' tests failed'));
                        return;
                    }

                    next();
                }
            );
        }

        testrunner = require('node-qunit');
        testrunner.options.log.assertions = false;
        testrunner.options.log.tests = false;
        testrunner.options.log.summary = false;
        testrunner.options.log.testing = false;
        testrunner.options.maxBlockDuration = 600000;

        if (grunt.option('only') != null) {
            tests = grunt.file.expand.apply(
                null,
                grunt
                    .option('only')
                    .split(',')
                    .map(function (file) {
                        if (file === 'moment') {
                            return 'build/umd/test/moment/*.js';
                        } else if (file === 'locale') {
                            return 'build/umd/test/locale/*.js';
                        } else {
                            return 'build/umd/test/' + file + '.js';
                        }
                    })
            );
        } else {
            tests = grunt.file.expand(
                'build/umd/test/moment/*.js',
                'build/umd/test/locale/*.js'
            );
        }

        if (grunt.option('only') == null) {
            runSuite(
                grunt.file.expand('build/umd/test/moment/*.js'),
                function (err) {
                    if (err) {
                        done(err);
                        return;
                    }

                    runSuite(
                        grunt.file.expand('build/umd/test/locale/*.js'),
                        done
                    );
                }
            );
            return;
        }

        runSuite(tests, done);
    });
};
