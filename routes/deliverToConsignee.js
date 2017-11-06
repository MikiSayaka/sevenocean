var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/deliverToConsignee');
});

module.exports = router;
