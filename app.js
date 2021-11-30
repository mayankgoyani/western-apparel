var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config();

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const utility = require('./core/utility');

const connectToDb = require('./db/connect');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.router');
var adminRouter = require('./routes/admin.router');
var productRouter = require('./routes/product.router');

var app = express();

const store = new MongoDBStore({
  uri: process.env.connectionString,
  collection: 'sessions'

})
app.use(session({ secret: 'shhhhh', resave: false, saveUninitialized: false, store: store }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//jwt auth
// app.use(utility.jwtAuth);

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/product', productRouter)






//database connection
connectToDb();


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
