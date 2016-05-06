/**
 * Created by Zhang Mingze on 2016/3/29.
 */

var Comment = require('../model/comment'),
    util = require('../util/index');

// 增加留言
module.exports.saveComment = function (req, res) {
  var date = new Date(),
        time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
               date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  var user = req.session.user;
  console.log(user);
  var comment = {
      name: user.name,
      head: user.head,
      email: user.email,
      website: '/u/'+user.name,
      time: time,
      content: req.body.content
  };
  var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
  newComment.save(function (err) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    req.flash('success', '留言成功!');
    res.redirect('back');
  });
};