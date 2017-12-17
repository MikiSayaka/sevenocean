var mysql = require('mysql');
var async = require('async');
const TEST_DB = 'SEVENOCEAN';

var state = {
  pool: null,
  mode: null
};

exports.READ = 'read';
exports.WRITE = 'write';

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'a8965128',
    password: '',
    database: TEST_DB,
    charset: 'utf8'
  });

  state.mode = mode;
  done();
}

exports.get = function() {
  return state.pool;
}