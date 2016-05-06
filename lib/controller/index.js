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

  // api用户退出登录
  app.get('/logout', checkLogin.login);
  app.get('/logout', pageUser.signOut);

  // 用户文章
  app.get('/u/:name', pagePost.getInfo);

  // 文章详细
  app.get('/u/:name/:day/:title', pageUser.getInfoByDay);

  // 发表评论留言
  app.post('/u/:name/:day/:title', pageComment.saveComment);

  // 文章发表
  app.get('/post', checkLogin.login);
  app.get('/post', function (req, res) {
    res.render('zpost', {
      title: '发表',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  

  // api删除文章
  app.get('/remove/:name/:day/:title', checkLogin.login);
  app.get('/remove/:name/:day/:title', pagePost.removePost);

  // api转载文章
  app.get('/reprint/:name/:day/:title', checkLogin.login);
  app.get('/reprint/:name/:day/:title', pagePost.reprintPost);
  
  // 文章搜索
  app.get('/search', pagePost.search);

  // api发布文章
  app.post('/post', checkLogin.login);
  app.post('/post', pagePost.post);

  // 文章编辑
  app.get('/edit/:name/:day/:title', checkLogin.login);
  app.get('/edit/:name/:day/:title', pagePost.editPost);

  // 文章保存修改
  app.post('/edit/:name/:day/:title', checkLogin.login);
  app.post('/edit/:name/:day/:title', pagePost.updatePost);

  // 所有标签
  app.get('/tags', pagePost.getAllTags);

  // 文章存档
  app.get('/archive', pagePost.getArchive);
  
  // 特定标签文章
  app.get('/tags/:tag', pagePost.getPostByTag);
  // -----------------------



  // app.get('/upload', checkLogin.login);
  // app.get('/upload', function (req, res) {
  //   res.render('upload', {
  //     title: '文件上传',
  //     user: req.session.user,
  //     success: req.flash('success').toString(),
  //     error: req.flash('error').toString()
  //   });
  // });

  // app.post('/upload', checkLogin.login);
  // app.post('/upload', function (req, res) {
  //   req.flash('success', '文件上传成功!');
  //   res.redirect('/upload');
  // });





  app.use(function (req, res) {
    res.render("z404");
  });
};