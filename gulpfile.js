var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(); 

var runSequence = require('run-sequence');

var childProcess = require('child_process');

var pkg = require('./package.json');
var dirs = pkg.projectConfig.directories;

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------


gulp.task('clean', function (done) {
    require('del')([
        dirs.vendor,
        dirs.dist
    ], done);
});

gulp.task('copy', [
    'copy:normalize',
    'copy:skeleton',
    'copy:morpheus',
    'copy:easings'
]);

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
               .pipe(gulp.dest(dirs.vendor + '/css'));
});

gulp.task('copy:skeleton', function () {
    return gulp.src('node_modules/skeleton.css/skeleton.css')
               .pipe(gulp.dest(dirs.vendor + '/css'));
});

gulp.task('copy:morpheus', function () {
    return gulp.src('node_modules/morpheus/morpheus.min.js')
               .pipe(gulp.dest(dirs.vendor + '/js'));
});

gulp.task('copy:easings', function () {
    return gulp.src('node_modules/morpheus/src/easings.js')
               .pipe(gulp.dest(dirs.vendor + '/js'));
});

gulp.task('jekyll:build', function () {
    return childProcess.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'});
});

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('build', function (done) {
    runSequence(
        ['clean'],
        'copy',
        'jekyll:build',
    done);
});

gulp.task('default', ['build']);
