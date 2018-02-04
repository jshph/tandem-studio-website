const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefix = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const filter = require('gulp-filter')
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const jsmin = require('gulp-jsmin');
const clean = require('gulp-clean');
const cache = require('gulp-cache');

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jsmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-watch', ['js'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('css-watch', ['css'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('scss-watch', ['scss'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('templates', function() {
    return gulp.src('./src/templates/*.pug')
        .pipe(pug())
        .pipe(filter(function(file) {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('pug-watch', ['templates'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('imgs-watch', ['imgs'], function(done) {
    browserSync.reload();
    done();
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imgs', function() {
    return gulp.src('./src/imgs/**/*')
        .pipe(cache(imagemin({
            verbose: true
        })))
        .pipe(gulp.dest('./dist/imgs'));
});

gulp.task('clean', function() {
	return gulp.src('./dist', {read: false})
		.pipe(clean());
})

gulp.task('watch', ['templates', 'imgs', 'scss', 'js'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("./src/js/*.js", ['js-watch']);
    gulp.watch("./src/templates/**/*.pug", ['pug-watch']);
    gulp.watch("./src/scss/**/*.scss", ['scss-watch']);
    gulp.watch("./src/imgs/*", ['imgs-watch']);
    gulp.watch("./src/css/**/*.css", ['css-watch']);
});

gulp.task('build', ['clean'], () => {
	gulp.run('js', 'css', 'scss', 'imgs', 'fonts', 'templates');
});