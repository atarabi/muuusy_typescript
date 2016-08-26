/**
 * Loca Setting
 */
// const gulp = require('gulp');
// gulp.task('server', () => {
//   gulp.src(__CONFIG.dist)
//     .pipe($.webserver({
//       port: 3000,
//       livereload: true,
//       fallback: 'index.html',
//       open: true,
//       proxies: [{
//         source: '/api',
//         target: 'http://localhost:9000/api'
//       }]
//     }));
// });

/**
 * Vagrant Setting
 */
const gulp = require('gulp');
gulp.task('server', () => {
  gulp.src(__CONFIG.dist)
    .pipe($.webserver({
      host: '0.0.0.0',
      port: 3000,
      livereload: false,
      directoryListing: false,
      fallback: 'index.html',
      open: true,
      proxies: [{
        source: '/api',
        target: 'http://localhost:9000/api'
      }]
    }));
});
