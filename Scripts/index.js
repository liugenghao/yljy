// JavaScript Document
$(function () {
    f_onResetIndexElements();    
	f_onLoadBanner(); 	
});
	
// 移除或重置某些默认样式或元素
function f_onResetIndexElements() {
    //首页链接设置为打开新窗口或新选项卡
    //$("#main a").attr("target", "_blank");
    
    // a.link_next加上title属性
	var arr=[$("#go-jobs"), $("#go-companies")];
    $(arr).each(function() {$(this).show();});	
	
	//页面尺寸改变时
    
}

//实例化焦点图
function f_onLoadBanner() {
        //图片新闻 slider实例化
    $('#indexPics').flexslider({
        animation: "slide",
        randomize: false,
        pauseOnHover: true
    });  	
	 
	//图片位
	//$("#rtabAds").rTabs({ autoSpeed: 4000, bind: 'hover', animation: 'fadein' });
	
	//右侧回顶特效
	$('#asid_scroll').hhShare({
		cenBox: 'asid_share_box',  //里边的小层
		icon: 'adid_icon',
		addClass: 'red_bag',
		titleClass: 'asid_title',
		triangle: 'asid_share_triangle', //鼠标划过显示图层，边上的小三角
		showBox: 'asid_sha_layer' //鼠标划过显示图层
	});
}