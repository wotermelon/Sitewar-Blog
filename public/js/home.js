$(document).ready(function() {
  laypage({
    cont: 'z-pagination',
    pages: $('#z-pagination').attr('allPages'),
    skip: true,
    skin: 'molv',
    curr: $('#z-pagination').attr('page'),
    first: 1,
    last: $('#z-pagination').attr('allPages'),
    jump: function (e, first) {
      if(!first) {
        var lostr = location.href;
        if(lostr.indexOf("?") != -1){
          location.href = lostr.replace(/\?p=\w+$/,"?p="+e.curr);
        } else {
          location.href = lostr + "?p=" +e.curr;
        }
      }
    }
  });
});