const gulp = require('gulp');

gulp.task('html', () => {
  return gulp.src(__CONFIG.path.html.src)
    .pipe($.plumber({ errorHandler: $.notify.onError('<%= error.message %>') }))
    // .pipe($.htmlhint(__CONFIG.htmlhint))
    .pipe($.htmlhint.reporter())
    .pipe($.htmlhint.failReporter());
});
