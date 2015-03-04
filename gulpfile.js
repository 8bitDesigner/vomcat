var gulp = require('gulp')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , babelify = require('babelify')

gulp.task('build:js', function() {
  browserify('./app/public/jsx/app.jsx')
  .require('./app/public/jsx/app.jsx', {expose: 'App'})
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./app/public/js'))
})

gulp.task('watch', ['default'], function() {
  gulp.watch('./app/public/jsx/**/*.jsx', ['build:js'])
})

gulp.task('default', ['build:js'])

