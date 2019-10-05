var app = new Vue({
  el: '#wrapper',
  data: {
  },
  methods: {
    nextInput: function(e) {
      var _keyCode = e.keyCode;
      var _this = $(e.target);
      if (_keyCode === 13) {
        var _inputs = _this.closest('form').find(':input');
        var _nextEl = _inputs.eq(_inputs.index(_this) + 1);
        if (_nextEl.is('input')) {
          _nextEl.focus();
          e.preventDefault();
        }
      }
    },
    checkContainerNo: function(e) {
      var _this = $(e.target);
      var _containerNoReg = /[a-z]{4}[0-9]{7}/g;
      var _val = _this.val().toLowerCase();
      if (_val.search(_containerNoReg) > -1) {
        var _chrValidateArr = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38];
        var _positionArr = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        var _chkNum;
        var _valArr = _val.split('');
        _this.parents('.form-group').removeClass('has-error');
        for (var _i in _valArr) {
          if (isNaN(_valArr[_i])) {
            _valArr[_i] = _chrValidateArr[_valArr[_i].charCodeAt() - 97];
          }
          if (_i < 10) {
            _chkNum = (isNaN(_chkNum)) ? _valArr[_i] * _positionArr[_i] : _chkNum + _valArr[_i] * _positionArr[_i];
          } else if (_i == 10) {
            _chkNum = (_chkNum / 11) + 0.09;
          }
        }
        _chkNum = (Math.floor(_chkNum * 10) / 10).toString().split('.')[1];
        _chkNum = (_chkNum > 10) ? _chkNum - 10 : _chkNum;
        if (_valArr[10] == _chkNum) {
          _this.parents('.form-group').removeClass('has-error');
        } else {
          _this.parents('.form-group').addClass('has-error');
        }
      } else {
        _this.parents('.form-group').addClass('has-error');
      }
      //  irsu2464907
      //  aphu4517446
    },
    formChecked: function(e) {
      //  FIXME check form and go on.
      if ($(e.currentTarget).has('.has-error').length > 0) {
        e.preventDefault();
      }
    }
  },
  mounted: function() {
    $('#start_date, #end_date').datepicker({
      autoclose: true
    });
    
    $('#start_date').on('changeDate', function(e){
      var _this = $(this);
      var _startDate = moment(_this.val());
      var _endDate = $('#end_date').val();
      
      if (_startDate.isAfter(_endDate, 'date')) {
        $('#end_date').datepicker('update', _startDate.toDate());
      }
    });
  
    $('#end_date').on('changeDate', function(e){
      var _this = $(this);
      var _startDate = $('#start_date').val();
      var _endDate = moment(_this.val())
      
      if (_endDate.isBefore(_startDate, 'date')) {
        $('#start_date').datepicker('update', _endDate.toDate());
      }
    });
    
    //  TODO  變更首頁表單的貨櫃狀態名稱
    var _statusTr = $('.container-status');
    if (_statusTr.length > 0) {
      $.each(_statusTr, function(_key, _item){
        var _$item = $(_item);
        _$item.text($(`#side-menu a[href=${ _$item.text() }]`).text());
      });
    }
    
    //  TODO  輸入完貨櫃編號後帶出TYPE
    //  Unfocus container no and loading type
    //  SELECT CONTAINER_NO FORM CONTAINER_INFO WHERE CONTAINER_NO = '';
    $('#container_no').focusout(function(){
      var _this = $(this);
      ajaxCall({
        url: '/getApi/getContainerType',
        method: 'POST',
        type: 'json',
        data: {
          'container_no': _this.val()
        },
        success: function(_data, _status){
          if (_data.length > 0) {
            $('#type').val(_data[0].CONTAINER_TYPE);
          } else {
            $('#type').val('');
          }
        },
        error: function(_data, _status, _error){},
        downFunc: function(){}
      });
    });
  }
});

function ajaxCall(_config) {
  if (_config != null && _config.url != undefined && _config.url != '') {
    $.ajax({
      url: _config.url,
      method: _config.method,
      dataType: _config.type,
      data: _config.data,
      success: _config.success,
      error: _config.error
    }).done(function(_status, _rst){
      if (_config.downFunc) {
        _config.downFunc();
      }
    });
  }
}
