/**
 * Created by Zhang Mingze on 2016/3/29.
 */

var pageUser = require('../page/pageUser'),
    pagePost = require('../page/pagePost'),
    pageComment = require('../page/pageComment'),
    checkLogin = require('../middleware/checkisLogin');

module.exports = function(app) {


  app.get('/', function (req, res) {
    res.render('zindex', {
      title: "首页",
      user: req.session.user
    })
  });

  app.get('/home', pagePost.getPostInTen);


  // api用户注册
  app.post('/reg', pageUser.signUp);

  // 用户登录
  app.get('/login', checkLogin.notLogin);
  app.get('/login', function (req, res) {
    res.render('zlogin', {
      title: '登录注册',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    }); 
  });

  // api用户登录
  app.post('/login', checkLogin.notLogin);
  app.post('/login', pageUser.signIn);

  // -----------------------

  app.get('/post', checkLogin.login);
  app.get('/post', function (req, res) {
    res.render('post', {
      title: '发表',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  app.post('/post', checkLogin.login);
  app.post('/post', pagePost.post);

  app.get('/logout', checkLogin.login);
  app.get('/logout', pageUser.signOut);

  app.get('/upload', checkLogin.login);
  app.get('/upload', function (req, res) {
    res.render('upload', {
      title: '文件上传',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  app.post('/upload', checkLogin.login);
  app.post('/upload', function (req, res) {
    req.flash('success', '文件上传成功!');
    res.redirect('/upload');
  });

  app.get('/archive', pagePost.getArchive);

  app.get('/tags', pagePost.getAllTags);

  app.get('/tags/:tag', pagePost.getPostByTag);

  app.get('/links', function (req, res) {
    res.render('links', {
      title: '友情链接',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  app.get('/search', pagePost.search);

  app.get('/u/:name', pagePost.getInfo);

  app.get('/u/:name/:day/:title', pageUser.getInfoByDay);

  app.post('/u/:name/:day/:title', pageComment.saveComment);

  app.get('/edit/:name/:day/:title', checkLogin.login);
  app.get('/edit/:name/:day/:title', pagePost.editPost);

  app.post('/edit/:name/:day/:title', checkLogin.login);
  app.post('/edit/:name/:day/:title', pagePost.updatePost);

  app.get('/remove/:name/:day/:title', checkLogin.login);
  app.get('/remove/:name/:day/:title', pagePost.removePost);

  app.get('/reprint/:name/:day/:title', checkLogin.login);
  app.get('/reprint/:name/:day/:title', pagePost.reprintPost);

  app.use(function (req, res) {
    res.render("404");
  });
};
