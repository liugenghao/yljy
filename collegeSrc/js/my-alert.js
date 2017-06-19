

/*
//.my-alert-mask{
//    background-color: rgba(0,0,0,0.5);
//    position: absolute;
//    left: 0;
//    bottom: 0;
//    top: 0;
//    right: 0;
//    z-index: 9;
//    display: none;
//}
//.my-alert{
//    position:absolute;
//    left: 50%;
//    margin-left: -30%;
//    width: 60%;
//    top: 35%;
//    z-index: 10;
//    display: none;
//}

alert样式 只能给bootstrap用
*/
$(function () {
    $('.my-alert-mask').css({
        'background-color': 'rgba(0,0,0,0.5)',
        'position': 'absolute',
        'left': 0,
        'bottom': 0,
        'top': 0,
        'right': 0,
        'z-index': '9'
    });
    $('.my-alert').css({
        'position': 'absolute',
        'left': '55%',
        'margin-left': '-20%',
        'width': '25%',
        'top': '35%',
        'z-index': '10'
    });
});

/*
state:状态(1-正确[绿色样式] 2-帮助[蓝色样式] 3-警告[黄色样式] 4-危险[红色样式]);
title:标题;  
html:内容;
time:退出时间; 
callback:回调函数
*/
var timer;
function showAlert(state, title, html, time, callback) {
    var $_alert = $('.my-alert');
    var $_alertCon = $(".alert-con");
    var $_alertMask = $(".my-alert-mask");
    var $_alertTitle = $(".alert-title");
    switch (state) {
        case 1:
            $_alert.addClass('alert-success').removeClass('alert-info alert-warning alert-danger');
            $_alertTitle.html('<i class="icon fa fa-check"></i>'+title);
            break;
        case 2:
            $_alert.addClass('alert-info').removeClass('alert-success alert-warning alert-danger');
            $_alertTitle.html('<i class="icon fa fa-info"></i>' + title);
            break;
        case 3:
            $_alert.addClass('alert-warning').removeClass('alert-info alert-success alert-danger');
            $_alertTitle.html('<i class="icon fa fa-warning"></i>' + title);
            break;
        case 4:
            $_alert.addClass('alert-danger').removeClass('alert-info alert-success alert-warning');
            $_alertTitle.html('<i class="icon fa fa-ban"></i>' + title);
            break;
        default:
            $_alert.addClass('alert-danger').removeClass('alert-info alert-success alert-warning');
            $_alertTitle.html('<i class="icon fa fa-check"></i>' + title);
            break;
    };

    $_alertMask.show();
    $_alert.stop().slideDown().find(".close").click(function () {
        $_alert.stop().slideUp();
        $_alertMask.hide();
    });
    $_alertCon.html(html);
    if (typeof (time) != 'number') {
        callback();
    } else if (typeof (time) != 'undefined') {
        timer = setTimeout(function () {
            $_alertMask.hide();
            $_alert.stop().slideUp();
            callback();
        }, time);
    }
};

function hideAlert(time, callback) {
    var $_alert = $('.my-alert');
    var $_alertMask = $(".my-alert-mask");
    timer = setTimeout(function () {
        $_alertMask.hide();
        $_alert.stop().slideUp();
        callback();
    }, time);
};
