module.exports = {
    dist: 'dist/%type%',
    defaultPath: 'pc',
    server: {
      ghostMode: {
        clicks: false,
        location: false,
        forms: false,
        scroll: false
      }
    },
    path: {
      html: {
        src: 'dist/%type%/**/*.html'
      },
      style: {
        src: 'assets/%type%/styl/**/index.styl',
        watch: 'assets/%type%/styl/**/*.styl',
        dest: 'dist/%type%/css'
      },
      ejs: {
        src: [
          'assets/%type%/templates/**/*.ejs',
          '!assets/%type%/templates/**/_*/*.ejs'
        ],
        watch: ['assets/%type%/templates/**/*.ejs'],
        dest: 'dist/%type%'
      },
      sprite: {
        src: 'assets/%type%/_imgSprites/**/*',
        watch: 'assets/%type%/_imgSprites/**/*',
        imageDest: 'assets/%type%/img/common',
        cssDest: 'assets/%type%/styl/_common/var/'
      },
      ts: {
        src: [
          'assets/%type%/ts/index.ts',
          'assets/%type%/ts/home.ts'
        ],
        watch: 'assets/%type%/**/*.ts'
      },
      js: {
        src: [
          'assets/%type%/js/index.js',
          'assets/%type%/js/home.js'
        ],
        dest: 'dist/%type%/js'
      },
      test: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'dist/%type%/js/*.js',
          'node_modules/power-assert/build/power-assert.js',
          'node_modules/sinon/pkg/sinon.js',
          'assets/%type%/test/**/*.js'
        ]
      },
      copy: [
        {
          from: 'assets/%type%/js/_api/**/*',
          to: 'dist/%type%/js/_api'
        },
        {
          from: 'assets/%type%/lib/**/*',
          to: 'dist/%type%/lib'
        },
        {
          from: 'assets/%type%/img/**/*',
          to: 'dist/%type%/img'
        }
      ]
    }
};
