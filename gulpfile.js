var gulp = require('gulp')
  , source = require('vinyl-source-stream')
  , sass = require('gulp-sass')
  , browserify = require('browserify')
  , babelify = require('babelify')

gulp.task('build:js', function() {
  return browserify('./app/public/jsx/app.jsx')
  .require('./app/public/jsx/app.jsx', {expose: 'App'})
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./app/public/js'))
})

gulp.task('build:css', function () {
  return gulp.src('./app/public/scss/**/*.scss')
  .pipe(sass({
    includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
  }))
  .pipe(gulp.dest('./app/public/css'))
});

gulp.task('watch', ['default'], function() {
  gulp.watch('./app/public/jsx/**/*.jsx', ['build:js'])
  gulp.watch('./app/public/scss/**/*.scss', ['build:css'])
})

gulp.task('default', ['build:js', 'build:css'])

