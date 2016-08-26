const gulp = require('gulp');
const Server = require('karma').Server;
const runner = require('karma').runner;

gulp.task('runTest', (callback) => {
  runner.run({
    configFile: process.cwd() + '/karma.conf.js'
  }, (exitCode) => {
    process.exit(exitCode);
    callback();
  });
});

gulp.task('test', (callback) => {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true,
    autoWatch: false
  }).start({}, callback);
});
gulp.task('watchTest', (callback) => {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: false,
    autoWatch: true
  }).start({}, callback);
});
