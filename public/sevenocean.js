/*
$(document).ready(function() {
  var _inputArr = $('#page-wrapper .form-horizontal input[type=text]'); 
  
  $('#start_date, #end_date').datepicker({
      autoclose: true
  });
  
  $('#start_date').on('changeDate', function(e){
      var _this = $(this);
      var _startDate = moment(_this.val());
      var _endDate = $('#end_date').val();
      
      if (_endDate == '' || (_startDate.diff(_endDate, 'days') > 0)) {
        $('#end_date').datepicker('update', _startDate.toDate());
      }
  });
  
  $('#end_date').on('changeDate', function(e){
      var _this = $(this);
      var _startDate = $('#start_date').val();
      var _endDate = moment(_this.val());
      
      if ( _startDate == '' || (_startDate.diff(_endDate, 'days') > 0)) {
          $('#start_date').datepicker('update', _endDate.toDate());
      }
  });
  
  $('#page-wrapper .form-horizontal input[type=text]').keydown(function(e){
    var _this = $(this);
    if (e.which == 13) {
      var _inputs = _this.closest('form').find(':input');
      var _nextEl = _inputs.eq(_inputs.index(_this) + 1);
      if (_nextEl.is('input')) {
        _nextEl.focus();
        e.preventDefault();
      }
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
});
*/

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