var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var pug = require('gulp-pug');
var autoprefix = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var filter = require('gulp-filter')
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var jsmin = require('gulp-jsmin');

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('scss', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scss-watch', ['scss'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('templates', function() {
    return gulp.src('./src/templates/*.pug')
        .pipe(pug())
        .pipe(filter(function (file) {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('pug-watch', ['templates'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imgs', function() {
    return gulp.src('./src/imgs/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/imgs'));
});

gulp.task('watch', ['templates','scss','js'], function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./src/js/*.js", ['js-watch']);
    gulp.watch("./src/templates/**/*.pug", ['pug-watch']);
    gulp.watch("./src/scss/**/*.scss", ['scss-watch'])
});

// only run 'imgs' task when you build, it takes forever
gulp.task('build', ['templates','scss', 'js', 'imgs', 'fonts']);