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
let runSequence = require('run-sequence');
let replace = require('gulp-replace');
let cn = require('./lang/cn');

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

gulp.task('build', (callback) =>
  runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'], callback)
);

gulp.task('default', (callback) =>
  runSequence(['sass', 'browserSync', 'watch'], callback)
);

gulp.task('templates', function(){
    gulp.src(['cathay.txt'])
    .pipe(replace(/[\u4e00-\u9fa5]+/g, function(match) {
        // Replace foobaz with barbaz and log a ton of information
        // See http://mdn.io/string.replace#Specifying_a_function_as_a_parameter
        // console.log('Found ' + match + ' with param ' + p1 + ' at ' + offset + ' inside of ' + string);
        // if(match == '中国') {
        //     return 'China';
        // } else if (match == '人') {
        //     return 'people';
        // } else if (match == '民') {
        //     return 'citizen'
        // }
        // console.log(cn);
        let template;
        for (let key in cn) {
            let value = cn[key]
            if(value == match) {
                template = key
            }
        }
        if (template) {
            let str = `$t('${template}')`
            console.log(`i18n: ${template}`)
            return str
        } else {
            return match
        }
    }))
    .pipe(gulp.dest('build/'));
});