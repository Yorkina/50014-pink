var gulp = require('gulp');  
var less = require('gulp-less');



gulp.task('less', function() {
	gulp.src('./less/style.less')
		.pipe(less())
		.pipe(gulp.dest('./css'));
});


gulp.task('watch', function() {
		gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('default', ['less', 'watch']);
