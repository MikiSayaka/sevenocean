var db = require('../db.js');

exports.create = function() {
    
};

exports.getAll = function(done) {
  db.get().query('SELECT * FROM USERS', function(err, rows){
    if (err) {
      return done(err);
    }
    done(null, rows);
  });
};

exports.insertContainerInfo = function(_containerInfo, _done) {
  var _values = [
    _containerInfo.container_no,
    _containerInfo.type,
    _containerInfo.hds_lease_ref,
    _containerInfo.loading_port,
    _containerInfo.lessor_depot,
    _containerInfo.transaction_time,
    _containerInfo.lease_company,
    _containerInfo.hds_depot,
    _containerInfo.depot,
    _containerInfo.shipper,
    _containerInfo.forwardef,
    _containerInfo.booking_ref_no,
    _containerInfo.hauler_co,
    _containerInfo.release_ref_no,
    _containerInfo.full_empty,
    _containerInfo.seal_no,
    _containerInfo.owner_type,
    _containerInfo.physical_status,
    _containerInfo.destination,
    _containerInfo.vessel,
    _containerInfo.voyage,
    _containerInfo.b_l_no,
    _containerInfo.consignee,
    _containerInfo.notify,
    _containerInfo.weight,
    _containerInfo.bay,
    _containerInfo.slot,
    _containerInfo.carrier_type,
    _containerInfo.discharge_port,
    _containerInfo.carrier_id,
    _containerInfo.acceptance_ref,
    _containerInfo.container_status,
    _containerInfo.data_seq
  ];
  db.get().query('INSERT INTO CONTAINER_INFO (CONTAINER_NO, CONTAINER_TYPE, HDS_LEASE_REF, LOADING_PORT, LESSOR_DEPOT, TRANSACTION_TIME, LEASE_COMPANY, HDS_DEPOT, DEPOT, SHIPPER, FORWARDEF, BOOKING_REF_NO, HAULER_CO, RELEASE_REF_NO, FULL_EMPTY, SEAL_NO, OWNER_TYPE, PHYSICAL_STATUS, DESTINATION, VESSEL, VOYAGE, B_L_NO, CONSIGNEE, NOTIFY, WEIGHT, BAY, SLOT, CARRIER_TYPE, DISCHARGE_PORT, CARRIER_ID, ACCEPTANCE_REF, CONTAINER_STATUS, DATA_SEQ, INSERT_DATE) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()) ', _values, function(_err, _result){ if (_err) {
      return _done('Indsert error.');
    }
    _done(null, _result);
  });
}

exports.countSeq = function(_containerStatus, _dataSeqTime, _done) {
  var _values = [_containerStatus, _dataSeqTime];
  db.get().query('SELECT COUNT(CONTAINER_STATUS) AS COUNT FROM CONTAINER_INFO WHERE CONTAINER_STATUS = ? AND DATE(INSERT_DATE) = CURDATE();', _values, function(err, rows){
    if (err) {
      return _done(err);
    }
    _done(null, rows);
  });
};

exports.queryData = function(_containerStatus, _dataSeqTime, _done) {
  var _values = [_containerStatus, _dataSeqTime];
  db.get().query('SELECT * FROM CONTAINER_INFO WHERE CONTAINER_STATUS = ? AND DATE(INSERT_DATE) = CURDATE();', _values, function(err, rows){
    if (err) {
      return _done(err);
    }
    _done(null, rows);
  });
};