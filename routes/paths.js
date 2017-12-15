var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var _url = req.baseUrl;
  res.render('pages' + _url);
});

/* POST data insert. */
router.post('/', function(req, res, next) {
  var _url = req.baseUrl;

  console.log(_url);
  console.log('test');
  console.log(req.body.container_no);
  console.log(req.body.type);

  res.render('pages' + _url);
});


module.exports = router;