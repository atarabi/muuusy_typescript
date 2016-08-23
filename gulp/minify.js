/**
 * スタイルタスク
 * stylをコンパイルしてAutoprefixerをかける。プロダクションリリース時には圧縮する
 */
var gulp = require('gulp');
var saveLicense = require('uglify-save-license');

module.exports = (function () {

  gulp.task('minify:img', function () {
    return gulp.src(__CONFIG.path.img.dist)
      .pipe($.size({title: 'images:before'}))
      .pipe($.imagemin({
        progressive: true
      }))
      .pipe(gulp.dest(__CONFIG.path.img.dest))
      .pipe($.size({title: 'images:after'}));
  });

  gulp.task('minify:js', function () {
    return gulp.src(__CONFIG.path.js.dist)
      .pipe($.uglify({
        preserveComments: saveLicense
      }))
      .pipe(gulp.dest(__CONFIG.path.js.dest));
  });

  gulp.task('minify:json', function () {
    return gulp.src(__CONFIG.path.json.dist)
      .pipe($.jsonminify())
      .pipe(gulp.dest(__CONFIG.path.json.dest));
  });

  gulp.task('minify:html', function () {
    var opts = {
      conditionals: true,
      spare:true
    };
    return gulp.src(__CONFIG.path.html.dist)
      .pipe($.minifyHtml(opts))
      .pipe(gulp.dest(__CONFIG.path.html.dest));
  });

  gulp.task('minify:css', function () {
    return gulp.src(__CONFIG.path.style.dist)
      .pipe($.pleeease())
      .pipe(gulp.dest(__CONFIG.path.style.dest));
  });

})();
