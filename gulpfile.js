var gulp = require('gulp');  
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');


gulp.task('less', function() {
	gulp.src('./less/style.less')
		.pipe(less())
		.pipe(gulp.dest('./css'));
});

gulp.task('concat', function () {
  gulp.src('css/*.css')
    .pipe(concatCss("style.css"))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
		gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('default', ['less', 'concat', 'watch']);
