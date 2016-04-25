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
  var email_MD5 = util.getMD5(req.body.email.toLowerCase()),
      head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48"; 
  var comment = {
      name: req.body.name,
      head: head,
      email: req.body.email,
      website: req.body.website,
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