var express = require('express');
var path = require('path');
//  var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var routes = require('./routes/index')
var onHire = require('./routes/onHire');
var releaseToShipper = require('./routes/releaseToShipper');
var returnToShipper = require('./routes/returnToShipper');
var loadOnBoard = require('./routes/loadOnBoard');
var discharge = require('./routes/discharge');
var deliverToConsignee = require('./routes/deliverToConsignee');
var strip = require('./routes/strip');
var returnToConsignee = require('./routes/returnToConsignee');
var offHire = require('./routes/offHire');
var loadOnTrainAndTruck = require('./routes/loadOnTrainAndTruck');

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

app.use('/', routes);
app.use('/onHire', onHire);
app.use('/releaseToShipper', releaseToShipper);
app.use('/returnToShipper', returnToShipper);
app.use('/loadOnBoard', loadOnBoard);
app.use('/discharge', discharge);
app.use('/deliverToConsignee', deliverToConsignee);
app.use('/strip', strip);
app.use('/returnToConsignee', returnToConsignee);
app.use('/offHire', offHire);
app.use('/loadOnTrainAndTruck', loadOnTrainAndTruck);

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
