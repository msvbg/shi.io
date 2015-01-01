var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    es6ify = require('es6ify'),
    source = require('vinyl-source-stream'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    reactify = require('reactify');

var paths = {
    public: './public',

    index: './app/index.html',
    mainScript: './app/scripts/main.jsx',
    mainStyle: './app/styles/main.scss',

    styles: './app/**/*.scss',
    scripts: './app/**/*.{js,jsx}',
};

var continueOnError = function (err) {
    gutil.beep();
    gutil.log(err);
    this.emit("end");
};

gulp.task('reloadScripts', ['buildScripts'], doReload);
gulp.task('buildScripts', function () {
    return (
        browserify({
            files: es6ify.runtime,
            debug: true
        })
        .require('./bower_components/react/react.js', {expose: 'react'})
        .require('./bower_components/ramda/ramda.js', {expose: 'ramda'})
        .add(paths.mainScript)
        .transform(reactify)
        .transform(es6ify.configure(/.(js|jsx)/))
        .bundle().on('error', continueOnError)
        .pipe(source('scripts/app.js'))
        .pipe(gulp.dest(paths.public)));
});

gulp.task('reloadStyles', ['buildStyles'], doReload);
gulp.task('buildStyles', function () {
    return gulp.src(paths.mainStyle)
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['./bower_components/']
        }))
        .pipe(autoprefix())
        .pipe(rename(function (path) {
            path.dirname += '/styles';
        }))
        .pipe(gulp.dest(paths.public));
});

gulp.task('reloadIndex', ['buildIndex'], doReload);
gulp.task('buildIndex', function () {
    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.public));
})

gulp.task('default', [
    'buildIndex',
    'buildScripts',
    'buildStyles'], function () {

    livereload.listen();

    var watch = function (what) {
        what.forEach(function (each) {
            gulp.watch(each.dir, [each.action]);
        });
    };
  
    watch([
        { dir: paths.index, action: 'reloadIndex' },
        { dir: paths.scripts, action: 'reloadScripts' },
        { dir: paths.styles, action: 'reloadStyles' },
    ]);

});

function doReload() {
    return livereload.changed();
}
