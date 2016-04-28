/**
 * Created by Zhang Mingze on 2016/3/29.
 */

var Post = require('../model/post');
var User = require('../model/user');

require('events').EventEmitter.prototype._maxListeners = 100;

// 一次获取十篇文章
module.exports.getPostInTen = function (req, res) {
  //判断是否是第一页，并把请求的页数转换成 number 类型
  var page = req.query.p ? parseInt(req.query.p) : 1;
  //查询并返回第 page 页的 10 篇文章
  Post.getTen(null, page, function (err, posts, total) {
    if (err) {
      posts = [];
    } 
    
    var allPages = ~~(total/10 + 1);

    res.render('zarticle', {
      title: '最新文章',
      posts: posts,
      page: page,
      allPages: allPages,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

// 获取用户所有文章
module.exports.getInfo = function (req, res) {
  var page = req.query.p ? parseInt(req.query.p) : 1;
  //检查用户是否存在
  User.getByName(req.params.name, function (err, user) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    if (!user) {
      req.flash('error', '用户不存在!'); 
      return res.redirect('/');
    }
    //查询并返回该用户第 page 页的 10 篇文章
    Post.getTen(user.name, page, function (err, posts, total) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/home');
      }
      var title;
      if(user.name == req.session.user.name) {
        title = "我的文章";
      } else {
        title = user.name;
      }

      res.render('zarticle', {
        title: title,
        posts: posts,
        page: page,
        allPages:  ~~(total/10 + 1),
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  }); 
};

// 发表文章
module.exports.post = function (req, res) {
  var currentUser = req.session.user,
      tags = req.body.tags.split(','),
      post = new Post(currentUser.name, currentUser.head, req.body.title, tags, req.body.post);
    post.save(function (err) {
      if (err) {
        req.flash('error', err); 
        res.json({
          success: false,
          error: req.flash('success').toString()
        })
      }
      console.log( req.body)
      req.flash('success', '发布成功!');
      res.json({
        success: true,
        msg: req.flash('success').toString(),
        error: req.flash('success').toString()
      });
    });
};

// 返回所有文章存档信息
module.exports.getArchive = function (req, res) {
  Post.getArchive(function (err, posts) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    res.render('zarchive', {
      title: '文章存档',
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

// 返回所有标签
module.exports.getAllTags = function (req, res) {
  Post.getTags(function (err, tags) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    res.render('ztags', {
      title: '所有标签',
      tags: tags,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

// 返回含有特定标签的所有文章
module.exports.getPostByTag = function (req, res) {
  Post.getTag(req.params.tag, function (err, posts) {
    if (err) {
      req.flash('error',err); 
      return res.redirect('/');
    }
    res.render('zarchive', {
      title: 'TAG:' + req.params.tag,
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

// 返回通过标题关键字查询的所有文章信息
module.exports.search = function (req, res) {
  Post.search(req.query.keyword, function (err, posts) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('/');
    }
    res.render('zsearch', {
      title: req.query.keyword,
      posts: posts,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

// 返回原始发表的内容（markdown 格式）
module.exports.editPost = function (req, res) {
  var currentUser = req.session.user;
  Post.edit(currentUser.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    res.render('zedit', {
      title: '编辑',
      post: post,
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

// 更新一篇文章及其相关信息
module.exports.updatePost = function (req, res) {
  var currentUser = req.session.user;
  var tags = req.body.tags.split(',');
  Post.update(currentUser.name, req.params.day, req.params.title, req.body.title, tags, req.body.post, function (err) {
    var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.body.title);
    if (err) {
      req.flash('error', err); 
      return res.redirect(url);//出错！返回文章页
    }
    req.flash('success', '修改成功!');
    res.redirect(url);//成功！返回文章页
  });
};

// 删除一篇文章
module.exports.removePost = function (req, res) {
  var currentUser = req.session.user;
  Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    req.flash('success', '删除成功!');
    res.redirect('/home');
  });
};

//转载一篇文章
module.exports.reprintPost = function (req, res) {
  Post.edit(req.params.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    var currentUser = req.session.user,
        reprint_from = {name: post.name, day: post.time.day, title: post.title},
        reprint_to = {name: currentUser.name, head: currentUser.head};

    Post.reprint(reprint_from, reprint_to, function (err, post) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('back');
      }
      req.flash('success', '转载成功!');
      var url = encodeURI('/u/' + post.name + '/' + post.time.day + '/' + post.title);
      res.redirect(url);
    });
  });
};

