const gulp = require('gulp');
const saveLicense = require('uglify-save-license');

gulp.task('minify:img', () => {
  return gulp.src(__CONFIG.path.img.dist)
    .pipe($.size({title: 'images:before'}))
    .pipe($.imagemin({ progressive: true }))
    .pipe(gulp.dest(__CONFIG.path.img.dest))
    .pipe($.size({title: 'images:after'}));
});

gulp.task('minify:js', () => {
  return gulp.src(__CONFIG.path.js.dist)
    .pipe($.uglify({ preserveComments: saveLicense }))
    .pipe(gulp.dest(__CONFIG.path.js.dest));
});

gulp.task('minify:json', () => {
  return gulp.src(__CONFIG.path.json.dist)
    .pipe($.jsonminify())
    .pipe(gulp.dest(__CONFIG.path.json.dest));
});

gulp.task('minify:html', () => {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src(__CONFIG.path.html.dist)
    .pipe($.minifyHtml(opts))
    .pipe(gulp.dest(__CONFIG.path.html.dest));
});

gulp.task('minify:css', () => {
  return gulp.src(__CONFIG.path.style.dist)
    .pipe($.pleeease())
    .pipe(gulp.dest(__CONFIG.path.style.dest));
});
