// JavaScript Document
/*
layer函数自定义    layer(titles,layerCon,t,html,callback)
---------------------------------------------------------------------------------
titles:弹窗标题
layerCon：弹窗页面已有内容。layer(titles,'.box')
html：外部ajax返回结果。layer(titles,null,html)
url：外部url返回结果。layer(titles,null,null,url)
callback:回调函数，用于函数执行成功的回调
---------------------------------------------------------------------------------
*/
function layer(titles, layerCon, html, url, callback) {

    $("#windowAlertBg,#windowAlert").remove();//删除以前生成模版,避免重复生成

    var windowAlert = '<div id="windowAlert" class="windowAlert"><div class="alertTitle font_Yahi pr"><h2 class="fn">系统消息</h2><em class="closeAlert">×</em></div><div class="alertCon p20"><div class="loadingBox2" id="loadingBox"><div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div></div></div></div><div id="windowAlertBg" class="windowAlertBg"></div>';
    $("body").append(windowAlert);//生成弹窗HTML

    var windowAlertBg = $("#windowAlertBg");
    var layer = $("#windowAlert");
    var layerMain = layer.find(".alertCon");
    var layerTitle = layer.find(".alertTitle h2");
    var closeLayer = $(".closeAlert");

    layerTitle.html(titles);

    if (layerCon) {
        var layerConHtml = $(layerCon).clone().show();
        layerMain.find(layerCon).show();
        layerMain.html(layerConHtml);
    }
   else if (html) {
        layerMain.html(html);
    } else if (url) {
        $.ajax({
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8;',
            url: url,
            xhrFields: { withCredentials: true }
        })
        .done(function (data) {
            layerMain.html(data);
            var widht = -(layer.width() / 2);
            var height = -(layer.height() / 2);
            layer.css({ "margin-left": widht, "margin-top": height }).show().stop().animate({ top: "50%" }, 500);//对弹出框定位
        })
    };

    var widht = -(layer.width() / 2);
    var height = -(layer.height() / 2);
    layer.css({ "margin-left": widht, "margin-top": height }).show().stop().animate({ top: "50%" }, 500);//对弹出框定位

    callback;
    closeLayer.live("click", function () {
        layer.stop().animate({ top: "80%", opacity: 0 }, 500, function () { $(this).remove(); });
        windowAlertBg.remove();
    });//执行关闭事件
    return false;

};




