module.exports = function (grunt) {
    grunt.task.registerTask('qtest', 'run tests locally', function () {
        var done = this.async(),
            spawn = require('child_process').spawn,
            tests;

        function runSuite(testFiles, next) {
            var completed = false,
                child = spawn(
                    process.execPath,
                    [
                        require.resolve('qunit/bin/qunit'),
                        '--reporter',
                        require.resolve('./qunit-reporter'),
                    ].concat(testFiles),
                    { stdio: 'inherit' }
                );

            function complete(err) {
                if (!completed) {
                    completed = true;
                    next(err);
                }
            }

            child.on('error', complete);
            child.on('exit', function (code, signal) {
                if (signal) {
                    complete(new Error('QUnit exited due to signal ' + signal));
                } else {
                    complete(
                        code === 0
                            ? null
                            : new Error('QUnit exited with code ' + code)
                    );
                }
            });
        }

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
