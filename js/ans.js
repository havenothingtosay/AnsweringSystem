    // 使用须知动画定义
    $(function(){
      $("#help").bind("click",function(){
        var $content = $(this).next();
        if($content.is(":visible")){
          $content.slideUp(500);
        }else{
          $content.slideDown(500);
        }
      })
    })
    // 历史记录动画定义，点击显示历史记录，展开显示历史记录
    $(function(){
      $("#showhis").bind("click",function(){
        var $content = $(this).next();
        var $pages = $("#review div:eq(1)");
        if($content.is(":visible")&&$pages.is(":visible")){
          $content.slideUp(500);
          $pages.slideUp(500);
        }else{
          $content.slideDown(500);
          $pages.slideDown(500);
        }
        showpages();
      })
    })

    //个性化人物的选择，点击按钮更换图片及语气
    $(function(){
        $("#replace").toggle(function(){
            $("img.place").attr("src","image/mai.gif");
            $("#display p:first").empty().append("En...I think...");
        },
        function(){
            $("img.place").attr("src","image/nice.gif");
            $("#display p:first").empty().append("Whatever you ask, I will give you a good answer~  (´・ω・`)");
        },
        function(){
            $("img.place").attr("src","image/cute.gif");
            $("#display p:first").empty().append("Just ask");
        }
        );
    });

        // 表单的异步提交，与中间件对接返回数据
    (function($) {
      var config = {
        url: 'http://115.28.26.5/middleware',
        form: $('#form1')
      }
      $('document').ready(function() {
        $('input[name=form_submit]').click(function(event) {
          // console.log($('#form1').serialize());
          $.post(config.url, $('#form1').serialize(), function(data) {
            // console.log(data);
            data = JSON.parse(data);
              if (data.error == '200') {
                $('#usercom').html(data.content);
                $('#userinput').html($('#test').val());
                saveStorage('usercom');
                showpages();

              } else {
                alert(data.content);
              }
          });
          return false;
        });      
      })
    })(jQuery);
     
    // 历史记录面板，使用localstorage
    // 存储
    function saveStorage(id){
      var data ="<span style='color:#696969;'>Q:"+document.getElementById('userinput').innerHTML+"</span></br><span style='color:#8DB6CD;'>A:"+document.getElementById(id).innerHTML+"</span>";//获取答案内容
      var time = new Date().getTime();
      localStorage.setItem(time,data);//以时间来操作为键值,时间不会有重复
      //alert("success");
      // loadStorage("showmsg");
    }

    // 将对象存储到数组中去，并将其按照时间先后排序
    function loadarr(){
      var arr = new Array();
      for(var i = 0; i<localStorage.length; i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if(value != ""){
        arr.push({value: value, key: key});
        }
      }
      arr.sort(function(a, b) {
        return b.key - a.key;
      });

      // console.log(arr);
      return arr;

    }

    //取出并显示数据
    function loadStorage(id){
      var arr = loadarr();
      var result = "";
      for( var j = 0; j<arr.length; j++){
        // 显示样式,问题-答案展开
        result += "<p>"+arr[j].value+"</p>";

      }
      var target = document.getElementById(id);
      target.innerHTML = result;

    }

    // 分页
    function showpages(){
      loadStorage('showmsg');

      // 每页显示的数量
      var show_per_page = 5; 

      // 总的历史记录数量
      var number_of_items = localStorage.length;

      // 总的页数
      var number_of_pages = Math.ceil(number_of_items/show_per_page);
      $('#current_page').val(0);
      $('#show_per_page').val(show_per_page);
      var navigation_html="";

      // 当页数大于1的时候显示prev和next，可以前进或者后退一页
      if(number_of_pages>1){
        navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
      }

      // 设置当前共多少页
      var current_link = 0;
      while(number_of_pages > current_link){
        navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
        current_link++;
      }
      if (number_of_pages>1) {
        navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';
      }

      // 给分页的导航添加样式
      $('#page_navigation').html(navigation_html);
      $('#page_navigation .page_link:first').addClass('active_page');

      // 每页上的内容显示
      $('#showmsg').children().css('display', 'none');
      $('#showmsg').children().slice(0, show_per_page).css('display', 'block'); 
    }

    // 设置prev
    function previous(){
      new_page = parseInt($('#current_page').val()) - 1;
      if($('.active_page').prev('.page_link').length==true){
        go_to_page(new_page);
      }
    }

    // 设置next
    function next(){
      new_page = parseInt($('#current_page').val()) + 1;
      if($('.active_page').next('.page_link').length==true){
        go_to_page(new_page);
      }
    }

    // 设置跳页
    function go_to_page(page_num){
      var show_per_page = parseInt($('#show_per_page').val());
      start_from = page_num * show_per_page;
      end_on = start_from + show_per_page;
      $('#showmsg').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
      $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
      $('#current_page').val(page_num);
    }

    // 清除历史记录
    /*$(function(){
        $("#clear").click(function(){
            localStorage.clear();
        })
    })*/

    // 测试localstorage
    // setInterval(function(){
    //   $('input[name=question_input]').value = 'a';
    //   saveStorage('usercom');
    // },100);
