let gulp = require('gulp');
// Requires the gulp-sass plugin
let sass = require('gulp-sass');

gulp.task('hello', () => {
  console.log('Hello World');
});

gulp.task('sass', () =>
  gulp.src('app/scss/styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('app/css'))
);