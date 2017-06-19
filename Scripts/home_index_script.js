function C(ob) {
    var notice_tit_li = $(".notice_tit li");
    var notice_con_li = $("#notice_con .mod");
    notice_tit_li.removeClass("select").eq(ob.index()).addClass("select");
    notice_con_li.hide().eq(ob.index()).show();
}

$(document).ready(function (e) {
    var ob = null;
    var timeid = null;
    $(".notice_tit li").hover(
		function () {
		    ob = $(this);
		    timeid = setTimeout(function () { C(ob); }, 300);
		},
		function () {
		    clearTimeout(timeid);
		}
	);
    for (i = 0; i < 5; i++) {
        $("#jobs_info-board").eq(0).clone(true).appendTo(".jobs_info");
    }
});

