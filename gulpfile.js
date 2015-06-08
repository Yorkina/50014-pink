var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('css-comb', function() {
    gulp.src('./src/less/**/*.less')
        .pipe(csscomb())
        .pipe(gulp.dest('./dest/less'));
});

gulp.task('minify-html', function() {
    gulp.src('./src/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dest/'));
});

gulp.task('img-min', function() {
    gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dest/img'));
});

gulp.task('js-min', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dest/js'));
});

gulp.task('less', function() {
    gulp.src('./src/less/style.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dest/css'))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dest/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('watch', function() {
    gulp.watch('./src/less/**/*.less', ['less']);
});

gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: '.'
    });

    gulp.watch("./src/less/**/*.less", ['less']);
    gulp.watch("./src/*.html").on('change', reload);
});

gulp.task('build', ['minify-html', 'less', 'img-min', 'js-min']);
gulp.task('default', ['less', 'serve']);
