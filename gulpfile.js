const { series } = require('gulp');

function clean(cb){
  console.log('I\'m clean!');
  cb();
}

function build(cb){
  console.log('I\'m build!');
  cb();
}

exports.build = build;
exports.default = series(clean, build);
