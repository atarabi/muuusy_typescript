const gulp = require('gulp');
gulp.task('watch', () => {
  gulp.watch(__CONFIG.path.ejs.watch, ['ejs']);
  gulp.watch(__CONFIG.path.html.src, ['html']);
  gulp.watch(__CONFIG.path.style.watch, ['style']);
  gulp.watch(__CONFIG.path.sprite.watch, ['sprite', 'style', 'copy']);
  const copyWatches = [];
  if (__CONFIG.path.copy) {
    __CONFIG.path.copy.forEach((src) => { copyWatches.push(src.from); });
    gulp.watch(copyWatches, ['copy']);
  }
});
