var gulp = require('gulp');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var mainBowerFiles = require('main-bower-files');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var js_dest_path = 'public/js'; 
var css_dest_path = 'public/css';
var public_path = 'public/';

//  TODO  合併套件用css
gulp.task('concatLibCss', function(){
  return gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/dist/css/sb-admin-2.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/metisMenu/metisMenu.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/font-awesome/css/font-awesome.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/morrisjs/morris.css'
  ]).pipe(concat('lib.css')).pipe(gulp.dest(css_dest_path));
});

//  TODO  壓縮套件用css
gulp.task('minifyCss', ['concatLibCss'], function() {
  gulp.src([css_dest_path + '/lib.css']).pipe(minifyCSS({keepBreaks: true,})).pipe(rename(function(path) {
    path.basename += '.min';
    path.extname = '.css';
  })).pipe(gulp.dest(public_path));
});

//  TODO  合併套件用js
gulp.task('concatLibJs', function(){
  return gulp.src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/metisMenu/metisMenu.js',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/dist/js/sb-admin-2.js',
    './node_modules/moment/moment.js'
  ]).pipe(concat('lib.js')).pipe(gulp.dest(js_dest_path));
});

//  TODO  壓縮套件用js
gulp.task('minifyJs', ['concatLibJs'], function() {
  gulp.src(js_dest_path + '/lib.js').pipe(uglify()).pipe(rename(function(path){
    path.basename += '.min';
    path.extname = '.js';
  })).pipe(gulp.dest(public_path));
});

//  TODO  編譯less
gulp.task('less', function(){
  return gulp.src(public_path + '*.less').pipe(less({})).pipe(gulp.dest(public_path));
});

//  TODO  清除
gulp.task('clean', function() { 
  rimraf(js_dest_path, function(){});
  rimraf(css_dest_path, function(){});
});

gulp.task('minify', function(){
  console.log('Run process!!');
  runSequence('less', 'minifyJs', 'minifyCss', 'clean');
});

