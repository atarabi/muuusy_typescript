const gulp = require('gulp');
const ms = require('merge-stream');

gulp.task('sprite', () => {
  const spriteData = gulp.src(__CONFIG.path.sprite.src)
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.styl',
      imgPath: '../../img/common/sprite.png',
      cssFormat: 'stylus'
      // cssVarMap: function (sprite) {
      //   sprite.name = 'icon-' + sprite.name;
      // }
    })
  );
  return ms(
    spriteData.img.pipe(gulp.dest(__CONFIG.path.sprite.imageDest)),
    spriteData.css.pipe(gulp.dest(__CONFIG.path.sprite.cssDest))
  );
});
