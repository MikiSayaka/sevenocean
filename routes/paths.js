var express = require('express');
var mikiGobal = require('../miki.gobal.js');
var router = express.Router();
var data = require('../modules/dataHandle');
var moment = require('../node_modules/moment/moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  var _url = req.baseUrl;
  data.queryData(_url.replace('/', ''), function(_flag, _data){
    var _responseData = JSON.parse(JSON.stringify(_data));
    res.render('pages' + _url, {
      container_data: _responseData
    });
  });
});

/* POST data insert. */
router.post('/', function(req, res, next) {
  var _url = req.baseUrl;
  var _startDate = req.body.start_date;
  var _endDate = req.body.end_date;
  var _containerNo = req.body.container_id;
  
  if ((_startDate != undefined && _endDate != undefined) || _containerNo != undefined) {
    //  TODO  若參數中有開始和結束日期則根據連結判斷要查詢的分類
    if (_containerNo == undefined) {
      //  TODO  沒有櫃號,根據時間區間查詢
      var _momentStart = moment(_startDate);
      var _momentEnd = moment(_endDate);
      if (_momentStart.isValid() && _momentEnd.isValid()) {
        data.queryDataByDate(_url.replace('/', ''), moment(_startDate).format('YYYY-MM-DD 00:00:00'), moment(_endDate).format('YYYY-MM-DD 23:59:59'), function(_flag, _data){
          var _responseData = JSON.parse(JSON.stringify(_data));
          res.render('pages' + _url, {
            container_data: _responseData
          });
        });
      } else {
        data.queryData(_url.replace('/', ''), function(_flag, _data){
          var _responseData = JSON.parse(JSON.stringify(_data));
          res.render('pages' + _url, {
            container_data: _responseData
          });
        });
      }
    } else {
      //  根據櫃號查詢
      data.queryDataByContainerNo(_containerNo, function(_flag, _data){
        var _responseData = JSON.parse(JSON.stringify(_data));
        res.render('pages' + _url, {
          container_data: _responseData
        });
      });
    }
  } else {
    //  TODO  若參數中沒有開始和結束日期或是沒有櫃號則將資料寫入
    _insertData(req, _url, function(_data){
      var _responseData = JSON.parse(JSON.stringify(_data));
      res.render('pages' + _url, {
        container_data: _responseData
      });
    });
  }
});

//  TODO  新增資料
function _insertData(_reqData, _url, _redirect) {
  var _containerInfo = new Object();
  var _seqCount;
  
  try {
    _containerInfo.container_no = (_reqData.body.container_no == undefined) ? '' : _reqData.body.container_no;
    _containerInfo.type = (_reqData.body.type == undefined) ? '' : _reqData.body.type;
    _containerInfo.hds_lease_ref = (_reqData.body.hds_lease_ref == undefined) ? '' : _reqData.body.hds_lease_ref;
    _containerInfo.loading_port = (_reqData.body.loading_port == undefined) ? '' : _reqData.body.loading_port;
    _containerInfo.port = (_reqData.body.port == undefined) ? '' : _reqData.body.port;
    _containerInfo.lessor_depot = (_reqData.body.lessor_depot == undefined) ? '' : _reqData.body.lessor_depot;
    _containerInfo.transaction_time = (_reqData.body.transaction_time == undefined) ? '' : _reqData.body.transaction_time;
    _containerInfo.lease_company = (_reqData.body.lease_company == undefined) ? '' : _reqData.body.lease_company;
    _containerInfo.hds_depot = (_reqData.body.hds_depot == undefined) ? '' : _reqData.body.hds_depot;
    _containerInfo.depot = (_reqData.body.depot == undefined) ? '' : _reqData.body.depot;
    _containerInfo.shipper = (_reqData.body.shipper == undefined) ? '' : _reqData.body.shipper;
    _containerInfo.forwardef = (_reqData.body.forwardef == undefined) ? '' : _reqData.body.forwardef;
    _containerInfo.booking_ref_no = (_reqData.body.booking_ref_no == undefined) ? '' : _reqData.body.booking_ref_no;
    _containerInfo.hauler_co = (_reqData.body.hauler_co == undefined) ? '' : _reqData.body.hauler_co;
    _containerInfo.release_ref_no = (_reqData.body.release_ref_no == undefined) ? '' : _reqData.body.release_ref_no;
    _containerInfo.full_empty = (_reqData.body.full_empty == undefined) ? '' : _reqData.body.full_empty;
    _containerInfo.seal_no = (_reqData.body.seal_no == undefined) ? '' : _reqData.body.seal_no;
    _containerInfo.owner_type = (_reqData.body.owner_type == undefined) ? '' : _reqData.body.owner_type;
    _containerInfo.physical_status = (_reqData.body.physical_status == undefined) ? '' : _reqData.body.physical_status;
    _containerInfo.destination = (_reqData.body.destination == undefined) ? '' : _reqData.body.destination;
    _containerInfo.vessel = (_reqData.body.vessel == undefined) ? '' : _reqData.body.vessel;
    _containerInfo.voyage = (_reqData.body.voyage == undefined) ? '' : _reqData.body.voyage;
    _containerInfo.b_l_no = (_reqData.body.b_l_no == undefined) ? '' : _reqData.body.b_l_no;
    _containerInfo.consignee = (_reqData.body.consignee == undefined) ? '' : _reqData.body.consignee;
    _containerInfo.notify = (_reqData.body.notify == undefined) ? '' : _reqData.body.notify;
    _containerInfo.weight = (_reqData.body.weight == undefined) ? '' : _reqData.body.weight;
    _containerInfo.bay = (_reqData.body.bay == undefined) ? '' : _reqData.body.bay;
    _containerInfo.slot = (_reqData.body.slot == undefined) ? '' : _reqData.body.slot;
    _containerInfo.carrier_type = (_reqData.body.carrier_type == undefined) ? '' : _reqData.body.carrier_type;
    _containerInfo.discharge_port = (_reqData.body.discharge_port == undefined) ? '' : _reqData.body.discharge_port;
    _containerInfo.carrier_id = (_reqData.body.carrier_id == undefined) ? '' : _reqData.body.carrier_id;
    _containerInfo.acceptance_ref = (_reqData.body.acceptance_ref == undefined) ? '' : _reqData.body.acceptance_ref;
    _containerInfo.container_from = (_reqData.body.container_from == undefined) ? '' : _reqData.body.container_from;
    _containerInfo.container_to = (_reqData.body.container_to == undefined) ? '' : _reqData.body.container_to;
    _containerInfo.container_status = _url.replace('/', '');
  } catch(_err) {
    console.log(_err);
  }
  
  data.countSeq(_containerInfo.container_status, function(_flag, _data){
    _seqCount = JSON.parse(JSON.stringify(_data[0]));
    _containerInfo.data_seq = moment().format('YYYYMMDD') + mikiGobal.zeroLift(_seqCount.COUNT, 4) + '_' + _containerInfo.container_status;
    data.insertContainerInfo(_containerInfo ,function(_flag, _data){
      data.queryData(_containerInfo.container_status, function(_flag, _data){
        _redirect(_data);
      });
    });
  }); 
}

module.exports = router;