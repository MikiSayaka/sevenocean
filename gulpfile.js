const { src, dest, series } = require('gulp');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const mainBowerFiles = require('main-bower-files');
const less = require('gulp-less');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const js_dest_path = 'public/js'; 
const css_dest_path = 'public/css';
const public_path = 'public/';

//  TODO  合併套件用css
function concatCssLib() {
  return src([
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/bootstrap/css/bootstrap.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/dist/css/sb-admin-2.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/metisMenu/metisMenu.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/font-awesome/css/font-awesome.css',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/morrisjs/morris.css',
    './node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css'
  ]).pipe(concat('lib.css')).pipe(dest(css_dest_path));
}

//  TODO  壓縮套件用css
function minifyStyle() {
  return src([css_dest_path + '/lib.css']).pipe(minifyCSS({keepBreaks: true,})).pipe(rename(function(path) {
    path.basename += '.min';
    path.extname = '.css';
  })).pipe(dest(public_path));
}

//  TODO  合併套件用js
function concatLibJs() {
  return src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/vendor/metisMenu/metisMenu.js',
    './node_modules/startbootstrap-sb-admin-2-gh-pages/dist/js/sb-admin-2.js',
    './node_modules/moment/moment.js',
    './node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
    './node_modules/vue/dist/vue.js',
    './node_modules/axios/dist/axios.js',
  ]).pipe(concat('lib.js')).pipe(dest(js_dest_path));
}

//  TODO  壓縮套件用js
function minifyScript() {
  return src(js_dest_path + '/lib.js').pipe(uglify()).pipe(rename(function(path){
    path.basename += '.min';
    path.extname = '.js';
  })).pipe(dest(public_path));
}

//  TODO  編譯less
function lessCompile() {
  return src(public_path + '*.less').pipe(less({})).pipe(dest(public_path));
}

//  TODO  清除
function clean(cb) { 
  rimraf(js_dest_path, function(){});
  rimraf(css_dest_path, function(){});
  cb();
}

exports.default = series(concatCssLib, minifyStyle, concatLibJs, minifyScript, lessCompile, clean);
