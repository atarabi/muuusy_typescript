/**
 * スプライト生成タスク
 * スプライト画像とCSSを生成するタスク
 */
var gulp = require('gulp');
var ms = require('merge-stream');

module.exports = (function () {
  gulp.task('sprite',function () {
    var spriteData = gulp.src(__CONFIG.path.sprite.src).pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.styl',
      imgPath: '../../img/common/sprite.png',
      cssFormat: 'stylus'
      // cssVarMap: function (sprite) {
      //   sprite.name = 'icon-' + sprite.name;
      // }
    }));
    return ms(
      spriteData.img.pipe(gulp.dest(__CONFIG.path.sprite.imageDest)),
      spriteData.css.pipe(gulp.dest(__CONFIG.path.sprite.cssDest))
    );
  });
})();
