var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();
var data = require('../modules/dataHandle');
var moment = require('../node_modules/moment/moment');

router.post('/getContainerType', function(req, res, next) {
  //  TODO  查詢貨櫃TYPE
  var _containerNo = req.body.container_no;
  data.queryDataByContainerNo(_containerNo, function(_flag, _data){
    res.write(JSON.stringify(_data));
    res.end();
  });
});

module.exports = router;