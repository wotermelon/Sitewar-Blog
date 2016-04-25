/**
 * Created by Zhang Mingze on 2016/3/29.
 */

var User = require('../model/user'),
    util = require('../util/index');
var Post = require('../model/post');

// 用户注册
module.exports.signUp = function (req, res) {
  var username = req.body.name;
  var password = req.body.password;
  var password_re = req.body['password-repeat'];

  // 检验用户两次输入的密码是否一致
  if(password != password_re){
    req.flash('error', '两次输入的密码不一致');
    res.json({
      success: false,
      error: req.flash('error').toString()
    });    
    return;
  }

  // 生成密码的 md5 值
  var password_md5 = util.getMD5(password);

  var newUser = new User({
    name: username,
    password: password_md5,
    email: req.body.email
  });
  // 检查用户名是否已经存在
  User.getByName(newUser.name, function (err, user) {
    if(user){
      req.flash('error', '用户已存在！');
      res.json({
        success: false,
        error: req.flash('error').toString()
      });    
      return;
    }
    // 如果不存在则新增用户
    newUser.save(function (err, user) {
      if (err) {
        req.flash('error', err);
        res.json({
          success: false,
          error: req.flash('error').toString()
        }); 
      }
      req.session.user = user;//用户信息存入 session
      req.flash('success', '注册成功!');
      res.json({
        user: req.session.user,
        success: true,
        msg: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
      return;
    });
  });
};

// 用户登录
module.exports.signIn = function (req, res) {

  var password_md5 = util.getMD5(req.body.password);
  // 检查用户是否存在
  User.getByName(req.body.name, function (err, user) {
    if (!user) {
      req.flash('error', '用户不存在!'); 
      res.json({
        success: false,
        error: req.flash('error').toString()
      }); 
      return;
    }
    //检查密码是否一致
    if (user.password != password_md5) {
      req.flash('error', '密码错误!'); 
      res.json({
        success: false,
        error: req.flash('error').toString()
      }); 
      return;
    }
    //用户名密码都匹配后，将用户信息存入 session
    req.session.user = user;
    req.flash('success', '登陆成功!');

    delete req.session.user.password;

    res.json({
      user: req.session.user,
      success: true,
      msg: req.flash('success').toString(),
      error: req.flash('error').toString()
    }); 
  });
};

// 用户退出
module.exports.signOut = function (req, res) {
  req.session.user = null;
  req.flash('success', '退出成功！');
  res.redirect('/');  //登出成功后跳转到主页
};

// 获取用户特定时间文章
module.exports.getInfoByDay = function (req, res) {
  Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/');
      }
      res.render('article', {
        title: req.params.title,
        post: post,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
};





