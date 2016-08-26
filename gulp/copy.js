const gulp = require('gulp');
const ms = require('merge-stream');

gulp.task('copy', () => {
  const files = __CONFIG.path.copy;
  const stream = ms();
  files.forEach((file) => {
    stream.add(gulp.src(file.from)
    .pipe(gulp.dest(file.to)));
  });
  return stream;
});
