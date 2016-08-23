/**
 * ユニットタスク
 * karmaを使ってユニットテストを実行する
 */
var gulp = require('gulp');
var Server = require('karma').Server;
var runner = require('karma').runner;

gulp.task('runTest', function(callback) {
  runner.run({
    configFile: process.cwd() + '/karma.conf.js'
  },function(exitCode) {
    process.exit(exitCode);
    callback();
  });
});

gulp.task('test', function(callback) {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: true,
    autoWatch: false
  }).start({}, callback);
});
gulp.task('watchTest', function(callback) {
  new Server({
    configFile: process.cwd() + '/karma.conf.js',
    singleRun: false,
    autoWatch: true
  }).start({}, callback);
});
