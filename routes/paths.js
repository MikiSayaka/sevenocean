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
  
  if (_startDate != undefined && _endDate != undefined) {
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
    var _containerInfo = new Object();
    var _seqCount;
    
    _containerInfo.container_no = (req.body.container_no == undefined) ? '' : req.body.container_no;
    _containerInfo.type = (req.body.type == undefined) ? '' : req.body.type;
    _containerInfo.hds_lease_ref = (req.body.hds_lease_ref == undefined) ? '' : req.body.hds_lease_ref;
    _containerInfo.loading_port = (req.body.loading_port == undefined) ? '' : req.body.loading_port;
    _containerInfo.lessor_depot = (req.body.lessor_depot == undefined) ? '' : req.body.lessor_depot;
    _containerInfo.transaction_time = (req.body.transaction_time == undefined) ? '' : req.body.transaction_time;
    _containerInfo.lease_company = (req.body.lease_company == undefined) ? '' : req.body.lease_company;
    _containerInfo.hds_depot = (req.body.hds_depot == undefined) ? '' : req.body.hds_depot;
    _containerInfo.depot = (req.body.depot == undefined) ? '' : req.body.depot;
    _containerInfo.shipper = (req.body.shipper == undefined) ? '' : req.body.shipper;
    _containerInfo.forwardef = (req.body.forwardef == undefined) ? '' : req.body.forwardef;
    _containerInfo.booking_ref_no = (req.body.booking_ref_no == undefined) ? '' : req.body.booking_ref_no;
    _containerInfo.hauler_co = (req.body.hauler_co == undefined) ? '' : req.body.hauler_co;
    _containerInfo.release_ref_no = (req.body.release_ref_no == undefined) ? '' : req.body.release_ref_no;
    _containerInfo.full_empty = (req.body.full_empty == undefined) ? '' : req.body.full_empty;
    _containerInfo.seal_no = (req.body.seal_no == undefined) ? '' : req.body.seal_no;
    _containerInfo.owner_type = (req.body.owner_type == undefined) ? '' : req.body.owner_type;
    _containerInfo.physical_status = (req.body.physical_status == undefined) ? '' : req.body.physical_status;
    _containerInfo.destination = (req.body.destination == undefined) ? '' : req.body.destination;
    _containerInfo.vessel = (req.body.vessel == undefined) ? '' : req.body.vessel;
    _containerInfo.voyage = (req.body.voyage == undefined) ? '' : req.body.voyage;
    _containerInfo.b_l_no = (req.body.b_l_no == undefined) ? '' : req.body.b_l_no;
    _containerInfo.consignee = (req.body.consignee == undefined) ? '' : req.body.consignee;
    _containerInfo.notify = (req.body.notify == undefined) ? '' : req.body.notify;
    _containerInfo.weight = (req.body.weight == undefined) ? '' : req.body.weight;
    _containerInfo.bay = (req.body.bay == undefined) ? '' : req.body.bay;
    _containerInfo.slot = (req.body.slot == undefined) ? '' : req.body.slot;
    _containerInfo.carrier_type = (req.body.carrier_type == undefined) ? '' : req.body.slot;
    _containerInfo.discharge_port = (req.body.discharge_port == undefined) ? '' : req.body.discharge_port;
    _containerInfo.carrier_id = (req.body.carrier_id == undefined) ? '' : req.bod.carrier_id;
    _containerInfo.acceptance_ref = (req.body.acceptance_ref == undefined) ? '' : req.bod.acceptance_ref;
    _containerInfo.container_status = _url.replace('/', '');
    
    data.countSeq(_containerInfo.container_status, function(_flag, _data){
      _seqCount = JSON.parse(JSON.stringify(_data[0]));
      _containerInfo.data_seq = moment().format('YYYYMMDD') + mikiGobal.zeroLift(_seqCount.COUNT, 4);
      data.insertContainerInfo(_containerInfo ,function(_flag, _data){
        data.queryData(_containerInfo.container_status, function(_flag, _data){
          var _responseData = JSON.parse(JSON.stringify(_data));
          res.render('pages' + _url, {
            container_data: _responseData
          });
        });
      });
    });
  }
});

module.exports = router;