let gulp = require('gulp');
// Requires the gulp-sass plugin
let sass = require('gulp-sass');
// Requires the browser-sync plugin
let browserSync = require('browser-sync').create();
// Requires the useref plugin
let useref = require('gulp-useref');

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
    .pipe(gulp.dest('dist'))
);