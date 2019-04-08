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
      var _val = _this.val();
      if (_val.search(_containerNoReg) > -1) {
        var _chrValidateArr = [10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38];
        var _positionArr = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        var _valArr = _val.split('');
        console.log(_valArr);
        //  _this.parents('.form-group').removeClass('has-error');
      } else {
        _this.parents('.form-group').addClass('has-error');
      }
      //  _this.val();
      //  4 char, 7 numbers
      //  irsu2464907
      /*
      其檢查碼的公式如下: 
先將英文字母部份換成值（參照下表）然後將 
第1碼的值 * 1 +
第2碼的值 * 2 +
第3碼的值 * 4 +
第4碼的值 * 8 +
第5碼的值 * 16 +
第6碼的值 * 32 +
第7碼的值 * 64 +
第8碼的值 * 128 +
第9碼的值 * 256 +
第10碼的值 * 512
/ 11 = A 
將 A 的小數點後的值 乘以 11 得出 B, 再取B的四捨五入值(整數), 可得值C. 求出C後即是檢查碼　 

2008-04-09 14:44:50 補充： 
英文字母代碼對照表 
ＡＢＣＤＥＦＧＨＩ 
101213141516171819 
ＪＫＬＭＮＯＰＱＲ 
202123242526272829 
ＳＴＵＶＷＸＹＺ　 
3031323435363738　 
　位數之乘數 
12345678910 
1248163264128256512 

2008-04-09 14:47:51 補充： 
例 : 
櫃號 APHU4517446 其檢查碼為尾端的 6 
APHU451744英文部份換算成代碼 10, 27,18,32,4, 5,1,7, 4, 4 
所以 10 * 1 + 27 * 2 + 18 * 4 + 32 * 8 + 4 * 16 + 5 * 32 + 1 * 64 + 7 * 128 + 4 * 256 + 4 * 512= 10 + 54 + 72 + 256 + 64 + 160 + 64 + 896 + 1024 + 2048= 4648 

2008-04-09 14:52:16 補充： 
求出4648之後，我們把他除以11 得到 442.545454 (A) 
再以 0.545454 x 11 = 5.999994 (B) 
再四捨五入到整數值得出 6 (C) 就是檢查碼, 也就是櫃號尾碼 ! 
如C值大於或等於10時, 需再減 10, 則檢查碼則為 0 或 1。
      
      */
    },
    formChecked: function(e) {
      e.preventDefault();
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