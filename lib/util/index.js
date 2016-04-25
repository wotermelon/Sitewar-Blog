/**
 * Created by Zhang Mingze on 2016/3/29.
 */

var crypto = require('crypto'); //加密模块

// MD5加密
module.exports.getMD5 = function (str) {
  var result = '';
  result = crypto.createHash('md5').update(str).digest('hex');
  return result;
}

// 过滤
module.exports.scriptPass = function (str) {
  return str.replace(/<[^><]*script[^><]*>/gi, '');
}