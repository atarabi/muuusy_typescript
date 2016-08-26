const gulp = require('gulp');
const runSequence = require('run-sequence');
const tasks = require('./gulp/load');
global.__CONFIG = tasks.config;
global.__IS_PRODUCTION = false;
global.$ = tasks.plugins;


gulp.task('build', (callback) => {
  return runSequence('sprite', ['ejs', 'script', 'style', 'copy'], callback);
});

gulp.task('minify', (callback) => {
  return runSequence('minify:img', 'minify:js', 'minify:json', 'minify:html', 'minify:css', callback);
});

gulp.task('dist', (callback) => {
  global.__IS_PRODUCTION = true;
  return runSequence('build', 'minify', callback);
});

gulp.task('default', ['clean'], () => {
  return runSequence('build', 'server', 'watch', 'watchScript');
});
