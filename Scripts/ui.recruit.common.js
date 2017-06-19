/* JavaScript Document */
$(function () {    
    //主页面响应式
    mainPageResize();
    $(window).resize(function () {
        //延迟执行,防止多次触发
        setTimeout(function () {
            mainPageResize(); //主页面响应式
        }, 10);
    });
    
    /*右侧回顶特效*/
    asideScroll();

    /*绑定需要浮动的表头*/
    //$(".ltable tr:nth-child(even)>td").addClass("even_bg"); //隔行变色
    $("#floatHead").smartFloat();    
    $(".rule-single-checkbox").ruleSingleCheckbox();
    $(".rule-multi-checkbox").ruleMultiCheckbox();
    $(".rule-multi-radio").ruleMultiRadio();
    $(".rule-single-select").ruleSingleSelect();
    $(".rule-multi-porp").ruleMultiPorp();
    initContentTab();
});

//主页面响应式
function mainPageResize() {
    var docWidth = $(window).width();
    var toplinks = $("#header").find(".toplink");
    var navs = $("#nav").find("li");
    var sections = $(".section");
    var rowsUl = $(".ls_rows>ul");
    var rowsLi = $(".ls_rows>ul>li");
    var copyrights = $("#footer").find(".copyrights>span");
    if (docWidth > 800) {
        $(toplinks).each(function () { $(this).show(); });
        $(navs).each(function () { $(this).removeAttr("style"); });
        $(sections).each(function () { $(this).removeAttr("style"); });
        $(".block-aside").removeAttr("style");
        $(".block-right").removeAttr("style");
        $(rowsUl).each(function () { $(this).removeAttr("style"); });
        $(rowsLi).each(function () { $(this).removeAttr("style"); });
        $(copyrights).each(function () { $(this).css({ "display": "inline" }); });
    } else {
        $(toplinks).each(function () { $(this).hide(); });
        $(navs).each(function () { $(this).css({ "width": "84px" }); });
        $(sections).each(function () { $(this).css({ "width": "99%" }); });
        $(".block-aside").css({ "float": "none", "margin": "0 auto", "padding": "0", "width": "99%" });
        $(".block-right").css({ "float": "none", "margin": "0 auto", "padding": "0", "width": "99%" });
        $(rowsUl).each(function () { $(this).css({ "float": "none", "margin": "0 auto", "padding": "0", "width": "99%" }); });
        $(rowsLi).each(function () { $(this).css({ "width": "99%" }); });
        $(copyrights).each(function () { $(this).css({ "display": "block" }); });
    }
}

/*导航激活特效方法*/
function f_onNavActive(activedCode) {
    var objs = $(".menu>#nav>ul>li");
    $(objs).each(function () {
        var code = "";
        if ($(this).find(".topnav")) {
            code = $(this).find(".topnav").attr("data-code");
            if (code == activedCode) {
                $(this).siblings().removeClass("actived");
                $(this).addClass("actived");
            }
        }
    });
}

/*右侧回顶特效*/
function asideScroll() {
    var asideScroll = $('#asid_scroll');
    if ($.hhShare) {
        $('#asid_scroll').hhShare({
            cenBox: 'asid_share_box',  //里边的小层
            icon: 'adid_icon',
            addClass: 'red_bag',
            titleClass: 'asid_title',
            triangle: 'asid_share_triangle', //鼠标划过显示图层，边上的小三角
            showBox: 'asid_sha_layer' //鼠标划过显示图层
        });
    }
    var redBagEle = $("#go-jobs, #go-companies");
    $(redBagEle).each(function (i, item) {
        $(this).on("click", function () {
            redBagEle.removeClass("red_bag");
            $(this).addClass("red_bag");
        });
    });
}

/*--兼容FF 加入收藏夹和设为首页, @param {} sURL 收藏链接地址，@param {} sTitle 收藏标题--*/
function AddFavorite(sUrl, sTitle) {
    try {
        window.external.addFavorite(sUrl, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sUrl, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

/*-- Set Home Page, @param {} obj 当前对象，一般是使用this引用，@param {} vrl 主页URL --*/
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } catch (e) {
        if (window.netscape != null && window.netscape != "undefined" && window.netscape) {
            try {
                window.netscape.security.PrivilegeManager
                        .enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("此操作不被浏览器允许！\n请在浏览器地址栏输入\"about:config\"并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = window.Components.classes['@mozilla.org/preferences-service;1']
                    .getService(window.Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
        alert("此操作不被浏览器允许，请手动设置！");
    }
}

/*全选取消按钮函数*/
function checkAll(chkobj) {
    if ($(chkobj).text().indexOf("全") > -1 && $(chkobj).prop("checked")) {
        $(chkobj).children("span").text("取消");
        $("input[type='checkbox'].checkall:enabled").prop("checked", true);
    } else {
        $(chkobj).children("span").text("全选");
        $("input[type='checkbox'].checkall:enabled").prop("checked", false);
    }
}

/*全选checkbox 的函数*/
function checkboxAll(chkobj) {
    if ($(chkobj).prop("checked")) {
        $("input[type='checkbox'].checkall:enabled").prop("checked", true);
    } else {
        $("input[type='checkbox'].checkall:enabled").prop("checked", false);
    }
}

/*智能浮动层函数*/
$.fn.smartFloat = function () {
    var position = function (element) {
        var obj = element.children("div");
        var top = obj.position().top;
        var pos = obj.css("position");
        $(window).scroll(function () {
            var scrolls = $(this).scrollTop();
            if (scrolls > top) {
                obj.width(element.width());
                element.height(obj.outerHeight());
                if (window.XMLHttpRequest) {
                    obj.css({
                        position: "fixed",
                        top: 0
                    });
                } else {
                    obj.css({
                        top: scrolls
                    });
                }
            } else {
                obj.css({
                    position: pos,
                    top: top
                });
            }
        });
    };
    return $(this).each(function () {
        position($(this));
    });
};

/*复选框*/
$.fn.ruleSingleCheckbox = function () {
    var singleCheckbox = function (parentObj) {
        //查找复选框
        var checkObj = parentObj.children('input:checkbox').eq(0);
        parentObj.children().hide();
        //添加元素及样式
        var newObj = $('<a href="javascript:;">'
		+ '<i class="off">否</i>'
		+ '<i class="on">是</i>'
		+ '</a>').prependTo(parentObj);
        parentObj.addClass("single-checkbox");
        //判断是否选中
        if (checkObj.prop("checked") == true) {
            newObj.addClass("selected");
        }
        //检查控件是否启用
        if (checkObj.prop("disabled") == true) {
            newObj.css("cursor", "default");
            return;
        }
        //绑定事件
        newObj.click(function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                $(this).addClass("selected");
            }
            checkObj.trigger("click"); //触发对应的checkbox的click事件
        });
        //绑定反监听事件
        checkObj.on('click', function () {
            if ($(this).prop("checked") == true && !newObj.hasClass("selected")) {
                alert();
                newObj.addClass("selected");
            } else if ($(this).prop("checked") == false && newObj.hasClass("selected")) {
                newObj.removeClass("selected");
            }
        });
    };
    return $(this).each(function () {
        singleCheckbox($(this));
    });
};

//多项复选框
$.fn.ruleMultiCheckbox = function () {
    var multiCheckbox = function (parentObj) {
        parentObj.addClass("multi-checkbox"); //添加样式
        parentObj.children().hide(); //隐藏内容
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj); //前插入一个DIV
        parentObj.find(":checkbox").each(function () {
            var indexNum = parentObj.find(":checkbox").index(this); //当前索引
            var newObj = $('<a href="javascript:;">' + parentObj.find('label').eq(indexNum).text() + '</a>').appendTo(divObj); //查找对应Label创建选项
            if ($(this).prop("checked") == true) {
                newObj.addClass("selected"); //默认选中
            }
            //检查控件是否启用
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return;
            }
            //绑定事件
            $(newObj).click(function () {
                if ($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                    //parentObj.find(':checkbox').eq(indexNum).prop("checked",false);
                } else {
                    $(this).addClass("selected");
                    //parentObj.find(':checkbox').eq(indexNum).prop("checked",true);
                }
                parentObj.find(':checkbox').eq(indexNum).trigger("click"); //触发对应的checkbox的click事件
                //alert(parentObj.find(':checkbox').eq(indexNum).prop("checked"));
            });
        });
    };
    return $(this).each(function () {
        multiCheckbox($(this));
    });
}

//多项选项PROP
$.fn.ruleMultiPorp = function () {
    var multiPorp = function (parentObj) {
        parentObj.addClass("multi-porp"); //添加样式
        parentObj.children().hide(); //隐藏内容
        var divObj = $('<ul></ul>').prependTo(parentObj); //前插入一个DIV
        parentObj.find(":checkbox").each(function () {
            var indexNum = parentObj.find(":checkbox").index(this); //当前索引
            var liObj = $('<li></li>').appendTo(divObj)
            var newObj = $('<a href="javascript:;" data-value="' + $(this).val() + '">' + parentObj.find('label').eq(indexNum).text() + '</a><i></i>').appendTo(liObj); //查找对应Label创建选项
            if ($(this).prop("checked") == true) {
                liObj.addClass("selected"); //默认选中
            }
            //检查控件是否启用
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return;
            }
            //绑定事件
            $(newObj).click(function () {
                if ($(this).parent().hasClass("selected")) {
                    $(this).parent().removeClass("selected");
                } else {
                    $(this).parent().addClass("selected");
                }
                parentObj.find(':checkbox').eq(indexNum).trigger("click"); //触发对应的checkbox的click事件
                //alert(parentObj.find(':checkbox').eq(indexNum).prop("checked"));
            });
        });
    };
    return $(this).each(function () {
        multiPorp($(this));
    });
}

//多项单选
$.fn.ruleMultiRadio = function () {
    var multiRadio = function (parentObj) {
        parentObj.addClass("multi-radio"); //添加样式
        parentObj.children().hide(); //隐藏内容
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj); //前插入一个DIV
        parentObj.find('input[type="radio"]').each(function () {
            var indexNum = parentObj.find('input[type="radio"]').index(this); //当前索引
            var newObj = $('<a href="javascript:;">' + parentObj.find('label').eq(indexNum).text() + '</a>').appendTo(divObj); //查找对应Label创建选项
            if ($(this).prop("checked") == true) {
                newObj.addClass("selected"); //默认选中
            }
            //检查控件是否启用
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return;
            }
            //绑定事件
            $(newObj).click(function () {
                $(this).siblings().removeClass("selected");
                $(this).addClass("selected");
                parentObj.find('input[type="radio"]').prop("checked", false);
                parentObj.find('input[type="radio"]').eq(indexNum).prop("checked", true);
                parentObj.find('input[type="radio"]').eq(indexNum).trigger("click"); //触发对应的radio的click事件
                //alert(parentObj.find('input[type="radio"]').eq(indexNum).prop("checked"));
            });
        });
    };
    return $(this).each(function () {
        multiRadio($(this));
    });
}

//单选下拉框
$.fn.ruleSingleSelect = function () {
    var singleSelect = function (parentObj) {
        parentObj.addClass("single-select"); //添加样式
        parentObj.children().hide(); //隐藏内容
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj); //前插入一个DIV
        //创建元素
        var titObj = $('<a class="select-tit" href="javascript:;"><span></span><i></i></a>').appendTo(divObj);
        var itemObj = $('<div class="select-items"><ul></ul></div>').appendTo(divObj);
        var arrowObj = $('<i class="arrow"></i>').appendTo(divObj);
        var selectObj = parentObj.find("select").eq(0); //取得select对象
        //遍历option选项
        selectObj.find("option").each(function (i) {
            var indexNum = selectObj.find("option").index(this); //当前索引
            var liObj = $('<li>' + $(this).text() + '</li>').appendTo(itemObj.find("ul")); //创建LI
            if ($(this).prop("selected") == true) {
                liObj.addClass("selected");
                titObj.find("span").text($(this).text());
            }
            //检查控件是否启用
            if ($(this).prop("disabled") == true) {
                liObj.css("cursor", "default");
                return;
            }
            //绑定事件
            liObj.click(function () {
                $(this).siblings().removeClass("selected");
                $(this).addClass("selected"); //添加选中样式
                selectObj.find("option").prop("selected", false);
                selectObj.find("option").eq(indexNum).prop("selected", true); //赋值给对应的option
                titObj.find("span").text($(this).text()); //赋值选中值
                arrowObj.hide();
                itemObj.hide(); //隐藏下拉框
                selectObj.trigger("change"); //触发select的onchange事件
                //alert(selectObj.find("option:selected").text());
            });
        });
        //设置样式
        //titObj.css({ "width": titObj.innerWidth(), "overflow": "hidden" });
        //itemObj.children("ul").css({ "max-height": $(document).height() - titObj.offset().top - 62 });

        //检查控件是否启用
        if (selectObj.prop("disabled") == true) {
            titObj.css("cursor", "default");
            return;
        }
        //绑定单击事件
        titObj.click(function (e) {
            e.stopPropagation();
            if (itemObj.is(":hidden")) {
                //隐藏其它的下位框菜单
                $(".single-select .select-items").hide();
                $(".single-select .arrow").hide();
                //位于其它无素的上面
                arrowObj.css("z-index", "1");
                itemObj.css("z-index", "1");
                //显示下拉框
                arrowObj.show();
                itemObj.show();
            } else {
                //位于其它无素的上面
                arrowObj.css("z-index", "");
                itemObj.css("z-index", "");
                //隐藏下拉框
                arrowObj.hide();
                itemObj.hide();
            }
        });
        //绑定页面点击事件
        $(document).click(function (e) {
            selectObj.trigger("blur"); //触发select的onblure事件
            arrowObj.hide();
            itemObj.hide(); //隐藏下拉框
        });
    };
    return $(this).each(function () {
        singleSelect($(this));
    });
}

//初始化Tab事件
function initContentTab() {
    var parentObj = $(".content-tab");
    $(parentObj).each(function () {
        var tabContentObj = $(this).parent().parent().find(".tab-content");
        var tabObj = $('<div class="tab-title"><span>' + $(this).find("ul li a.selected").text() + '</span><i></i></div>');
        $(this).children().children("ul").before(tabObj);
        var tabLinks = $(this).find("ul li a");
        $(tabLinks).each(function (i, item) {
            $(this).on("mouseover click", function () {
                //设置点击后的切换样式
                $(this).parent().parent().find("li a").removeClass("selected");
                $(this).addClass("selected");
                tabObj.children("span").text($(this).text());
                //根据参数决定显示内容
                tabContentObj.hide();
                tabContentObj.eq(i).show();
            });
        });

    });
}

//JS压缩图片：等比例修正图片尺寸
function DrawImage(imgD, fitWidth, fitHeight) {
    var image = new Image();
    image.src = imgD.src;
    image.width = imgD.width;
    image.height = imgD.height;
    if (image.width > 0 && image.height > 0) {
        if (image.width > fitWidth) {
            imgD.width = fitWidth;
            imgD.height = (image.height * fitWidth) / image.width;
            if (imgD.height > fitHeight) {
                imgD.height = fitHeight;
                imgD.width = (image.width * fitHeight) / image.height;
            }
        }
        else if (image.height > fitHeight) {
            imgD.height = fitHeight;
            imgD.width = (image.width * fitHeight) / image.height;
            if (image.width > fitWidth) {
                imgD.width = fitWidth;
                imgD.height = (image.height * fitWidth) / image.width;
            }
        }
        else {
            imgD.width = image.width;
            imgD.height = image.height;
        }
    }
}

/*移除动态元素*/
function f_onRemoveItem(obj) {
    if (obj && $(obj).parent()) {
        var dataValue = $(obj).parent().attr("data-value");
        $(obj).parent().parent().addClass("disabled");
        $(obj).parent().remove();
        if (window.setHiddenVal) {
            setHiddenVal(null);
        }
        if ($(".multi-porp")) {
            var prop = $(".multi-porp");
            $("ul>li>a", prop).each(function () {
                if ($(this).parent().hasClass("selected") && $(this).attr("data-value") == dataValue) {
                    $(this).trigger("click");
                }
            });
        }
    }
}