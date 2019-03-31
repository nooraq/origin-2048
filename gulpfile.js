const gulp = require('gulp');
babel = require('gulp-babel');
gulp.task('es6', () => {
    return src('js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});