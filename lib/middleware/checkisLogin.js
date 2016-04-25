/**
 * Created by Zhang Mingze on 2016/3/32.
 */

// 检查登录
module.exports.login = function (req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录!'); 
    return res.redirect('/login');
  }
  next();
};

// 检查没有登录
module.exports.notLogin = function (req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录!'); 
    return res.redirect('back');//返回之前的页面
  }
  next();
};

