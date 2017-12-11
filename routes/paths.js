var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var _url = req.baseUrl;
  res.render('pages' + _url);
});

module.exports = router;