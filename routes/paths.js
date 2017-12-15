var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  var _url = req.baseUrl;
  res.render('pages' + _url);
});

/* POST data insert. */
router.post('/', function(req, res, next) {
  var _url = req.baseUrl;

  //  console.log(_url);
  //  console.log('test');
  //  console.log(req.body.container_no);
  //  console.log(req.body.type);
  //  console.log(req.body.hds);
  //  console.log(req.body.loading_port);
  //  console.log(req.body.lessor_depot);
  //  console.log(req.body.transaction_time);
  //  console.log(req.body.hds_depot);

  var connection = mysql.createConnection({
    //  host     : 'a8965128-sevenocean-4506657',
    host     : 'sevenocean-a8965128.c9users.io',
    port     : '3306',
    user     : 'mikisayaka',
    password : '',
    database : 'c9'
  });
  
  connection.connect();
   
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
    console.log('The solution is: ', rows[0].solution);
  });
   
  connection.end();
  
  res.render('pages' + _url);
});

module.exports = router;