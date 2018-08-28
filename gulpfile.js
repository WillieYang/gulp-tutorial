let gulp = require('gulp');
// Requires the gulp-sass plugin
let sass = require('gulp-sass');
// Requires the browser-sync plugin
let browserSync = require('browser-sync').create();
// Requires the useref plugin
let useref = require('gulp-useref');
// Other requires...
let uglify = require('gulp-uglify-es').default;
let gulpIf = require('gulp-if');
let cssnano = require('gulp-cssnano');
let imagemin = require('gulp-imagemin');
let cache = require('gulp-cache');
let del = require('del');

gulp.task('hello', () => {
  console.log('Hello World');
});

gulp.task('sass', () =>
  gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
);

gulp.task('browserSync', () =>
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
);

gulp.task('watch', ['sass', 'browserSync'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html').on('change', browserSync.reload);}
);

gulp.task('useref', () =>
  gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
);

gulp.task('images', () =>
  gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/images'))
);

gulp.task('fonts', () =>
  gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
);

gulp.task('clean:dist', () =>
  del.sync('dist')
);