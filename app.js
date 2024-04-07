var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { StatusCode } = require('status-code-enum');
var swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output');
const cors = require('cors');

var memberRouter = require('./routes/memberRoute');
var indexRouter = require('./routes/indexRoute');
var promotionRouter = require('./routes/promotionRoute');
var cartRouter = require('./routes/cartRoute');
var productRouter = require('./routes/productRoute');

var app = express();
const apiPrefix = '/baiwei-clientside-api/api';

//api doc
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//enable cors
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${apiPrefix}/`, indexRouter);
app.use(`${apiPrefix}/member`, memberRouter);
app.use(`${apiPrefix}/promotion`, promotionRouter);
app.use(`${apiPrefix}/cart`, cartRouter);
app.use(`${apiPrefix}/product`, productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(StatusCode.ClientErrorNotFound));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || StatusCode.ServerErrorInternal);
  res.render('error');
});

module.exports = app;
