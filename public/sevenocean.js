$(document).ready(function() {
  $('#start_date, #end_date').datepicker({
      autoclose: true
  });
  $('#start_date').on('changeDate', function(e){
      var _this = $(this);
      var _startDate = moment(_this.val());
      var _endDate = moment($('#end_date').val());
      
      if (_startDate.diff(_endDate, 'days') > 0) {
          $('#end_date').datepicker('update', _startDate.toDate());
      }
  });
  
  $('#end_date').on('changeDate', function(e){
      var _this = $(this);
      var _startDate = moment($('#start_date').val());
      var _endDate = moment(_this.val());
      
      if (_startDate.diff(_endDate, 'days') > 0) {
          $('#start_date').datepicker('update', _endDate.toDate());
      }
  });
  
  //  $('#query_by_date').on('click', function(){
  //    var _this = $(this);
  //    var _queryForm = _this.parents('form');
  //  });
});