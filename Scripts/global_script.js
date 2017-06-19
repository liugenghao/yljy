var pageFlag = "";
$(document).ready(function (e) {
    $("#main_nav a").each(function () {//导航栏变色
        $(this).css("color", "#FFF");
        if ($(this).attr("data-flag") && $(this).attr("data-flag") == pageFlag) {
            $(this).css("color", "#f90");
        }
    });
    $("#log_link").hover(function () {//登陆图标
        $("#log_res_btn").css("background-position","0 -53px");
        }, function () {
        $("#log_res_btn").css("background-position", "0 0");
        });
    $("#res_link").hover(function () {
        $("#log_res_btn").css("background-position", "0 -27px");
    }, function () {
        $("#log_res_btn").css("background-position", "0 0");
    });

    //$.ajax({
    //    url: "/api/newsapi",
    //    type: 'GET',
    //    dataType: 'json',
    //    jsonpCallback: "data",
    //    timeout: 5000,
    //    error: function (XMLHttpRequest, textStatus, errorThrown) {
    //        //alert(XMLHttpRequest.status);
    //        //alert(XMLHttpRequest.readyState);
    //        //alert(textStatus);
    //    },
    //    success: function (json) {
    //        var i = 0;
    //        $.each(json, function (idx, item) {
    //            $("#notice_tab ul li a").eq(i).text(item.Title);
    //            i++;
    //        });
    //    }
    //});
});