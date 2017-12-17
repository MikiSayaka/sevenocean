var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();
var data = require('../modules/dataHandle');

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
  
  data.test(function(_a, _b){
    var _restuleArr = _b;
    for (var _key in _restuleArr) {
      console.log(_restuleArr[_key]);
      //  JSON.stringify(_dataArr)
    }
  }); 
  
  res.render('pages' + _url);
});

module.exports = router;