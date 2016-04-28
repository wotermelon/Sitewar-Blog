$(document).ready(function() {
  // 分页组件初始化
  if($('#z-pagination').length != 0) {
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
  }

  // 发表文章
  $('.z-publish').on('click', function () {

    var dataObj = {};
    dataObj.title = $('#z-title').val();
    dataObj.tags = $('#z-tag').val();
    dataObj.post = $('#z-textarea').val();

    $.ajax({
      url: '/post',
      dataType: 'JSON',
      type: 'POST',
      data: dataObj
    }).done(function (result) {
      if(result.success === true) {
        alert(result.msg);
      } else {
        alert(result.arror);
      }
    });

  });

  // 手风琴收缩
  $('li[data-title]').on('click', function () {
    var $this = $(this);
    var $span = $this.find('span');
    var clname = $this.attr("class");
    console.log($span.get(0))
    $this.siblings('.' + clname).toggle(200);
    $span.html() === "放下"? $span.html('收起'):$span.html('放下');
  })

});
