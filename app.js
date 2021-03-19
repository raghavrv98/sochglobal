var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var fileUpload = require('express-fileupload')
var bodyParser = require("body-parser");
var appRouter = require('./routes/appRoutes');
var app = express();
var mysql = require('mysql')
var session = require('express-session');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sochglobal'
});

connection.connect();

global.db = connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'sochglobal',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10800000 }
}))


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/', appRouter);

app.get('*', function (req, res) {
  res.status(404).send("Not Found")
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.redirect('/notFound');
});

app.locals.baseUrl = "http://www.google.com"

module.exports = app;
