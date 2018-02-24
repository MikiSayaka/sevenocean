var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();
var data = require('../modules/dataHandle');
var moment = require('../node_modules/moment/moment');

router.post('/getContainerType', function(req, res, next) {
  //  TODO  查詢貨櫃TYPE
  var _containerNo = req.body.container_no;
  var _resObj = new Object();
  _resObj.container_no = _containerNo;
  
  console.log(_resObj);
  res.write(JSON.stringify(_resObj));
  res.end();
});

module.exports = router;