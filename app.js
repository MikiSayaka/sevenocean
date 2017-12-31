var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var paths = require('./routes/paths');
var db = require('./db');

var app = express();

//  view engine setup
app.set('view engine', 'ejs');

//  uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Database and models
db.connect(db.TEST_DB, function(err){
  if (err) {
    console.log('Unable to connect database.');
    process.exit(1);
  } else {
    app.listen(3000, function(){
      console.log('Listening on port 3000...');
    });
  }
});

app.use('/', paths);
app.use('/onHire', paths);
app.use('/releaseToShipper', paths);
app.use('/returnToShipper', paths);
app.use('/loadOnBoard', paths);
app.use('/discharge', paths);
app.use('/deliverToConsignee', paths);
app.use('/strip', paths);
app.use('/returnToConsignee', paths);
app.use('/offHire', paths);
app.use('/loadOnTrainAndTruck', paths);
app.use('/dischargeOnTrainAndTruck', paths);
app.use('/cfsStuff', paths);
app.use('/emptyGateIn', paths);
app.use('/emptyGateOut', paths);

//  catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//  error handlers

//  development error handler
//  will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
