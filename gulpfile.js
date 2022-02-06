const { src, dest, task, series, watch, parallel } = require("gulp"); //методы gulp
const gulpClean = require('gulp-clean');  //очистка dist
const sass = require('gulp-sass')(require('sass')); //компилятор sass
const concat = require('gulp-concat');  //склейка css % js в один файл
const browserSync = require('browser-sync').create(); //браузер для просмотра
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob'); //подключение всех scss через main (*.scss)
const autoprefixer = require('gulp-autoprefixer');  //префиксы для разных браузеров
const gcmq = require('gulp-group-css-media-queries'); //объединение медиа-запросов
const cleanCSS = require('gulp-clean-css'); //минификация css
const sourcemaps = require('gulp-sourcemaps');  //отображение путей в браузере
const uglify = require('gulp-uglify');  // минификация JS
const gulpif = require('gulp-if');  //'if' для разделения на dev & prod
// Также можно установить: 'gulp-smile-px2rem' — перевод в rem; 'Babel' для ES5; 
// 'gulp-svgo', 'gulp-svg-sprite' для svg

const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS } = require('./gulp.config');

task('clean', () => { //очистка папки dist
  return src(`${DIST_PATH}`, { read: false })
    .pipe(gulpClean({ force:true }))
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
})

task('styles', () => {
  return src([...STYLE_LIBS, 'src/styles/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', { newLine: ';' }))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task('copy:img', () => {
  return src(`${SRC_PATH}/img/**/*`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({ stream: true }));
})

task('copy:mp4', () => {
  return src(`${SRC_PATH}/videos/**/*`)
    .pipe(dest(`${DIST_PATH}/videos`))
    .pipe(reload({ stream: true }));
})

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/*.html', series('copy:html'));
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/img/**/*', series('copy:img'));
  watch('./src/videos/**/*', series('copy:mp4'));
});

task('default',
  series(
    'clean',
    parallel('copy:html', 'styles', 'copy:img', 'copy:mp4', 'scripts'),
    parallel('watch', 'server')
  )
);

task('build',
  series(
    'clean',
    parallel('copy:html', 'styles', 'copy:img', 'copy:mp4', 'scripts'),
    parallel('watch', 'server')
    )
);
