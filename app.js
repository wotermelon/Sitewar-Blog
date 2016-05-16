var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer  = require('multer');

var routes = require('./lib/controller/index');
var config = require('./config/index');

var fs = require('fs');

var app = express();

var EventEmitter = require('events');
require('events').EventEmitter.prototype._maxListeners = 100;

app.set('port', process.env.PORT || config.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(logger('dev'));

//设置服务器跨域权限
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({
  dest: './public/images',
  rename: function (fieldname, filename) {
    return filename;
  }
}));

app.use(cookieParser());
app.use(session({
  secret: config.mongo.cookieSecret,
  key: config.mongo.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    url: 'mongodb://127.0.0.1/aaa'
  })
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(app.get('port'), function(){
  console.log('\n服务器已启动，监听端口：' + app.get('port'));
});