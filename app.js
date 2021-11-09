var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var githubRouter = require('./routes/gitHubImages');
const jwtAuth = require('./utils/jwt')
require('./dao/database');
var app = express();

// view engine setup 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/blog',express.static(path.join(__dirname, 'web')));
app.use('/manage',express.static(path.join(__dirname, 'manage')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'))
app.use(jwtAuth)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({
        message: '请先登录!',
        status: 401,
      })
    }
})

// 配置一级路径
app.use('/my-blog', indexRouter);
app.use('/my-blog/users', usersRouter);
app.use('/my-blog/github', githubRouter);
app.use('/my-blog/article', articleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
