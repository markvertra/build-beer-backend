const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session    = require('express-session');
const passport   = require('passport');

const passportSetup = require('./helpers/passport');
const index = require('./routes/index');
const response = require('./helpers/response');

const app = express();

mongoose.connect('mongodb://localhost/app-beer-builder');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '--');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// passport for authentication
passportSetup(passport);
app.use(session({
  secret: 'beerbuilder passport secret shh',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// routes managed in index
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(req.path, req.method, err);
  // render the error page
  if (!res.headersSent) {

    response.unexpectedError(req, res, err);
    
  }
});

module.exports = app;
