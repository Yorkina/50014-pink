var gulp = require('gulp');  
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function() {
	gulp.src('./less/style.less')
		.pipe(less())
		.pipe(gulp.dest('./css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('prefix', function () {
    gulp.src('./css/style.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
		gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('serve', ['less'], function () {

	browserSync.init({
		server: '.'
	});

	gulp.watch("./less/**/*.less", ['less']);
	gulp.watch("Pink/*.html").on('change', reload);
});

gulp.task('default', ['less', 'serve']);