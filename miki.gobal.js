module.exports = {
  file_path : '/srv/workspace/sevenocean',
  zeroLift: function(_str, _length) {
      _str = '' + _str;
      if (_str.length >= _length) {
          return _str;
      } else {
          return this.zeroLift('0' + _str, _length);
      } 
  }
};