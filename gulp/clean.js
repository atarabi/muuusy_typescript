const gulp = require('gulp');
const del = require('del');

gulp.task('clean', (callback) => {
  del(__CONFIG.dist, callback);
});
