const gulp = require('gulp');

gulp.task('ejs', () => {
  return gulp.src(__CONFIG.path.ejs.src)
    .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
    .pipe($.ejs(__CONFIG.ejs))
    .pipe(gulp.dest(__CONFIG.path.ejs.dest));
});
