/**
* 管理面板基础工具脚本（基于jQuery 1.9.0主框架）
* 作者：admin
*/
/*-- 变量设置 Variables Config --*/
var Common = Common || {};
var browserVersion = window.navigator.userAgent.toUpperCase();
var isIE = false;
var isOpera = false;
var isFireFox = false;
var isChrome = false;
var isSafari = false;
var iframeTime;

$(function () {
    //$(".ltable tr:nth-child(even)>td").addClass("even_bg"); //隔行变色
    $("#floatHead").smartFloat(); //绑定需要浮动的表头
    $(".rule-single-checkbox").ruleSingleCheckbox(); //复选框单选
    $(".rule-multi-checkbox").ruleMultiCheckbox(); //复选框多选
    $(".rule-single-select").ruleSingleSelect(); // 多项单选
    $(".rule-multi-radio").ruleMultiRadio(); //多项选择
    $(".rule-multi-porp").ruleMultiPorp(); //多项选择PORP
});

function reinitIframe(iframeId, minHeight) {
    try {
        var iframe = document.getElementById(iframeId);
        var bHeight = 0;
        if (isChrome == false && isSafari == false)
            bHeight = iframe.contentWindow.document.body.scrollHeight;

        var dHeight = 0;
        if (isFireFox == true)
            dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
        else if (isIE == false && isOpera == false)
            dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        else
            bHeight += 3;
        var height = Math.max(bHeight, dHeight);
        if (height < minHeight) height = minHeight;
        iframe.style.height = height + "px";
        iframe.parentNode.style.height = height + "px";
    } catch (ex) { }
}

function startInit(iframeId, minHeight) {
    isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
    isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
    isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
    isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        isIE = true;
    reinitIframe(iframeId, minHeight);
    if (iframeTime != null)
        clearInterval(iframeTime)
    iframeTime = window.setInterval("reinitIframe('" + iframeId + "'," + minHeight + ")", 100);
}

//全选取消按钮函数
function checkAll(chkobj) {
    if ($(chkobj).text().indexOf("全选") > -1) {
        $(chkobj).children("span").text("取消");
        $("input[type='checkbox'].checkall:enabled").prop("checked", true);
    } else {
        $(chkobj).children("span").text("全选");
        $("input[type='checkbox'].checkall:enabled").prop("checked", false);
    }
}

//===========================工具类函数============================
//只允许输入数字
function checkNumber(e) {
    var keynum = window.event ? e.keyCode : e.which;
    if ((48 <= keynum && keynum <= 57) || keynum == 8) {
        return true;
    } else {
        return false;
    }
}

//只允许输入小数
function checkForFloat(obj, e) {
    var isOk = false;
    var key = window.event ? e.keyCode : e.which;
    if ((key > 95 && key < 106) || //小键盘上的0到9  
        (key > 47 && key < 60) || //大键盘上的0到9  
        (key == 110 && obj.value.indexOf(".") < 0) || //小键盘上的.而且以前没有输入.  
        (key == 190 && obj.value.indexOf(".") < 0) || //大键盘上的.而且以前没有输入.  
        key == 8 || key == 9 || key == 46 || key == 37 || key == 39) {
        isOk = true;
    } else {
        if (window.event) { //IE
            e.returnValue = false; //event.returnValue=false 效果相同.    
        } else { //Firefox 
            e.preventDefault();
        }
    }
    return isOk;
}

//检查短信字数
function checktxt(obj, txtId) {
    var txtCount = $(obj).val().length;
    if (txtCount < 1) {
        return false;
    }
    var smsLength = Math.ceil(txtCount / 62);
    $("#" + txtId).html("您已输入<b>" + txtCount + "</b>个字符，将以<b>" + smsLength + "</b>条短信扣取费用。");
    return true;
}

//四舍五入函数
function ForDight(dight, how) {
    dight = Math.round(dight * Math.pow(10, how)) / Math.pow(10, how);
    return dight;
}

//写Cookie
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

//读Cookie
function getCookie(objName) { //获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}

//Dom 元素操作之原生 Javascript 方法追加事件监听
function addEventListener(o, type, fn) {
    if (o.attachEvent) {
        o.attachEvent('on' + type, fn);
    } else if (o.addEventListener) {
        o.addEventListener(type, fn, false);
    } else {
        o['on' + type] = fn;
    }
}

//原生 JavaScript 方法判断 element 是否含有指定 CSS ClassName
function hasClass(element, className) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    return element.className.match(reg);
}

//原生 JavaScript 方法为 element 添加 CSS ClassName
function addClass(element, className) {
    if (!this.hasClass(element, className)) {
        element.className += " " + className;
    }
}

//原生 JavaScript 方法为 element 移除 CSS ClassName
function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}

/**
* js 获取 url 中的参数，方法一的重载方法：正则分析法，获取指定 url 中的参数
* @param url: url 路径 
* @param name: 参数名 
*/
function getQueryString(url, name) {
    var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
    var r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//去掉所有的html标记 
function killHtml(str) {
    return str.replace(/<[^>]+>/g, "");
}

/**
* JavaScript 压缩图片：等比例修正图片尺寸
* @param imgD: 目标图片对象
* @param fixWidth: 指定修正后的最大宽值
* @param fixHeight: 指定修正后的最大高值
*/
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
        } else if (image.height > fitHeight) {
            imgD.height = fitHeight;
            imgD.width = (image.width * fitHeight) / image.height;
            if (image.width > fitWidth) {
                imgD.width = fitWidth;
                imgD.height = (image.height * fitWidth) / image.width;
            }
        } else {
            imgD.width = image.width;
            imgD.height = image.height;
        }
    }
}

/**
* 设置预览图片自适应(保持原比例)
* @param img: 指定修正的图片对象
* @param maxSize: 宽或者高不允许超过的最大值
*/
function resizeImage(img, maxSize) {
    if (img && img.src) {
        var image = new Image();
        image.src = img.src;
        var naturalWidth = image.width;
        var naturalHeight = image.height;
        if (Math.max(naturalWidth, naturalHeight) > maxSize) {
            if (naturalWidth > naturalHeight) img.width = maxSize;
            else img.height = maxSize;
        }
        return true;
    } else return false;
}

/*仿 C# 构造 Javascript 的 StringBuilder 原型，替换 string += "xx"，使字符串拼接效率提升*/
function StringBuilder() {
    this.tmp = new Array();
}
StringBuilder.prototype.Append = function (value) {
    this.tmp.push(value);
    return this;
}
StringBuilder.prototype.Clear = function () {
    tmp.length = 1;
}
StringBuilder.prototype.toString = function () {
    return this.tmp.join('');
}

/*jQuery 表单数据序列化为json格式*/
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/**
* 对Date的扩展，将 Date 转化为指定格式的String 
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
* 例子：(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
*/
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
* "是否布尔值"前端逻辑处理输出
* @param flag: true or false
*/
Common.booleanHtml = function (flag) {
    return flag ? "<span class='icn_ok' title='是'></span>" : "<span class='icn_negative' title='否'></span>";
}

/**
* 基于自定义样式与脚本的弹窗提示的工具函数
* @param options: {type, content, ...}
*/
Common.tips = function (options) { return new Common.Tips(options); }
Common.Tips = function (options) {
    var defaults = {
        renderTo: 'body',
        type: 0,
        autoClose: true,
        removeOthers: true,
        time: undefined,
        top: 13,
        onClose: null,
        onShow: null
    }
    this.options = $.extend({}, defaults, options);
    this._init();
    !Common.Tips._collection ? Common.Tips._collection = [this] : Common.Tips._collection.push(this);
}
Common.Tips.removeAll = function () {
    try {
        for (var i = Common.Tips._collection.length - 1; i >= 0; i--) {
            Common.Tips._collection[i].remove();
        }
    } catch (e) {
    }
}
Common.Tips.prototype = {
    _init: function () {
        var self = this, opts = this.options, time;
        if (opts.removeOthers) {
            Common.Tips.removeAll();
        }
        this._create();
        this.closeBtn.bind('click', function () {
            self.remove();
        });
        if (opts.autoClose) {
            time = opts.time || opts.type == 1 ? 6000 : 5000;
            window.setTimeout(function () {
                self.remove();
            }, time);
        }
    },
    _create: function () {
        var opts = this.options;
        this.obj = $('<div class="ui-tips"><i></i><span class="close">X</span></div>').append(opts.content);
        this.closeBtn = this.obj.find('.close');

        switch (opts.type) {
            default:
            case 0:
                this.obj.addClass('ui-tips-success');
                break;
            case 1:
                this.obj.addClass('ui-tips-error');
                break;
            case 2:
                this.obj.addClass('ui-tips-warning');
                break;
        }
        this.obj.appendTo('body').hide();
        this._setPos();
        if (opts.onShow) {
            opts.onShow();
        }
    },
    _setPos: function () {
        var self = this, opts = this.options;
        if (opts.width) {
            this.obj.css('width', opts.width);
        }
        var h = this.obj.outerHeight(), winH = $(window).height(), scrollTop = $(window).scrollTop();
        //var top = parseInt(opts.top) ? (parseInt(opts.top) + scrollTop) : (winH > h ? scrollTop+(winH - h)/2 : scrollTop);
        var top = parseInt(opts.top) + scrollTop;
        this.obj.css({
            position: Common.isIE6 ? 'absolute' : 'fixed',
            left: '50%',
            top: top,
            zIndex: '9999',
            marginLeft: -self.obj.outerWidth() / 2
        });

        window.setTimeout(function () {
            self.obj.show().css({
                marginLeft: -self.obj.outerWidth() / 2
            });
        }, 150);

        if (Common.isIE6) {
            $(window).bind('resize scroll', function () {
                var topOff = $(window).scrollTop() + parseInt(opts.top);
                self.obj.css('top', topOff);
            });
        }
    },
    remove: function () {
        var opts = this.options;
        this.obj.fadeOut(2000, function () {
            $(this).remove();
            if (opts.onClose) {
                opts.onClose();
            }
        });
    }
};


/*-- 基于artdialog插件 --*/
/*可以自动关闭的提示，基于artdialog插件*/
function jsprint(msg, url, callback) {
    var d = dialog({title:"消息中心", content: msg + "<p style='color: #999;'>（该提示将在3秒钟后自动关闭...）</p>" }).show();
    setTimeout(function () {
        d.close().remove();
    }, 3500);
    if (url) {
        if (url == "back") {
            window.parent.right.history.back(-1);
        } else if (url != "") {
            window.parent.right.location.href = url;
        }
    }
    //执行回调函数
    if (arguments.length == 3) {
        callback();
    }
}

/*弹出一个Dialog窗口*/
function jsdialog(msgtitle, msgcontent, url, callback) {
    var d = dialog({
        title: msgtitle,
        content: msgcontent,
        okValue: '确定',
        ok: function () {
            if (url) {
                if (url == "back") {
                    history.back(-1);
                    return;
                } else if (url == "reload") {
                    window.location.reload();
                    return;
                }
                if (url != "") {
                    location.href = url;
                    return;
                }
            }
            /*执行回调函数*/
            if (callback) {
                callback();
            }
        },
        onclose: function () {
            if (url) {
                if (url == "back") {
                    history.back(-1);
                    return;
                } else if (url == "reload") {
                    window.location.reload();
                    return;
                }
                if (url != "") {
                    location.href = url;
                    return;
                }
            }
            /*执行回调函数*/
            if (callback) {
                callback();
            }
        }
    }).showModal();
}

/* 打开一个最大化的Dialog */
function ShowMaxDialog(tit, url) {
    dialog({
        title: tit,
        url: url
    }).showModal();
}

/* 执行回传函数 */
function ExePostBack(urlAction, objmsg) {
    var checked_boxs = $("input[type='checkbox'].checkall:checked");
    if (checked_boxs.size() < 1) {
        parent.dialog({
            title: '提示',
            content: '对不起，请选中您要操作的记录！',
            okValue: '确定',
            ok: function () { }
        }).showModal();
        return false;
    }
    var msg = "删除记录后不可恢复，您确定吗？";
    if (arguments.length == 2) {
        msg = objmsg;
    }
    var hidBulkIds = $("#hidBulkIds");
    if (hidBulkIds) {
        $(checked_boxs).each(function (i, item) {
            var val = $(this).val();
            hidBulkIds.val(hidBulkIds.val() + $(this).val() + ",");
        });
    }
    parent.dialog({
        title: '提示',
        content: msg,
        okValue: '确定',
        ok: function () {
            if (urlAction) {
                $.ajax({
                    type: "POST",
                    url: urlAction,
                    dataType: 'json',
                    data: { "bulkIds": hidBulkIds.val() },
                    success: function(data, textStatus){
                        var result = data;
                        if (result) {
                            var str = "删除";
                            if (result.rows)
                                str += result.rows + "项";
                            str += "成功！";
                            var dia = parent.dialog({
                                title: "消息中心（对话框将在3秒后关闭）",
                                content: str,
                            }).show();
                            setTimeout(function () {
                                dia.close().remove();
                            }, 3000);
                        }
                    },
                    error: function(msg, testStatus){
                        alert(JSON.stringify(msg));
                    }
                });
            }

        },
        cancelValue: '取消',
        cancel: function () { }
    }).showModal();
    return false;
}

/*检查是否有选中再决定回传*/
function CheckPostBack(objmsg) {
    var checked_boxs = $("input[type='checkbox'].checkall:checked");
    var msg = "对不起，请选中您要操作的记录！";
    if (arguments.length == 2) {
        msg = objmsg;
    }
    if (checked_boxs.size() < 1) {
        parent.dialog({
            title: '提示',
            content: msg,
            okValue: '确定',
            ok: function () { }
        }).showModal();
        return false;
    } else
        return true;
}

/*执行回传无复选框确认函数*/
function ExeNoCheckPostBack(urlAction, objmsg) {
    var msg = "删除记录后不可恢复，您确定吗？";
    if (arguments.length == 2) {
        msg = objmsg;
    }
    var d = parent.dialog({
        title: '提示',
        content: msg,
        okValue: '确定',
        ok: function () {
            if (urlAction)
                window.location.href = urlAction;
        },
        cancelValue: '取消',
        cancel: function () { }
    }).showModal();
    //return false;
}

/*-- 以上基于artdialog插件 --*/

/*-- 基于Validform插件 --*/
/*初始化验证表单*/
$.fn.initValidform = function () {
    var checkValidform = function (formObj) {
        $(formObj).Validform({
            tiptype: function (msg, o, cssctl) {
                /*msg：提示信息;
                o:{obj:*,type:*,curform:*}
                obj指向的是当前验证的表单元素（或表单对象）；
                type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态；
                curform为当前form对象;
                cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）；*/
                /*全部验证通过提交表单时o.obj为该表单对象;*/
                if (!o.obj.is("form")) {
                    //定位到相应的Tab页面
                    if (o.obj.is(o.curform.find(".Validform_error:first"))) {
                        var tabobj = o.obj.parents(".tab-content"); /*显示当前的选项*/
                        var tabindex = $(".tab-content").index(tabobj); /*显示当前选项索引*/
                        if (!$(".content-tab ul li").eq(tabindex).children("a").hasClass("selected")) {
                            $(".content-tab ul li a").removeClass("selected");
                            $(".content-tab ul li").eq(tabindex).children("a").addClass("selected");
                            $(".tab-content").hide();
                            tabobj.show();
                        }
                    }
                    /*页面上不存在提示信息的标签时，自动创建;*/
                    if (o.obj.parents("dd").find(".Validform_checktip").length == 0) {
                        o.obj.parents("dd").append("<span class='Validform_checktip' />");
                        o.obj.parents("dd").next().find(".Validform_checktip").remove();
                    }
                    var objtip = o.obj.parents("dd").find(".Validform_checktip");
                    cssctl(objtip, o.type);
                    objtip.text(msg);
                }
            },
            showAllError: true
           
        });
    };
    return $(this).each(function () {
        checkValidform($(this));
    });
}
/*-- 以上基于Validform插件 --*/

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
        /*查找复选框*/
        var checkObj = parentObj.children('input:checkbox').eq(0);
        parentObj.children().hide();
        /*添加元素及样式*/
        var newObj = $('<a href="javascript:;">'
            + '<i class="off">否</i>'
            + '<i class="on">是</i>'
            + '</a>').prependTo(parentObj);
        parentObj.addClass("single-checkbox");
        /*判断是否选中*/
        if (checkObj.prop("checked") == true) {
            newObj.addClass("selected");
        }
        /*检查控件是否启用*/
        if (checkObj.prop("disabled") == true) {
            newObj.css("cursor", "default");
            return;
        }
        /*绑定事件*/
        newObj.click(function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                $(this).addClass("selected");
            }
            checkObj.trigger("click"); /*触发对应的checkbox的click事件*/
        });
        /*绑定反监听事件*/
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

/*多项复选框*/
$.fn.ruleMultiCheckbox = function () {
    var multiCheckbox = function (parentObj) {
        parentObj.addClass("multi-checkbox"); /*添加样式*/
        parentObj.children().hide(); /*隐藏内容*/
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj); /*前插入一个DIV*/
        parentObj.find(":checkbox").each(function () {
            var indexNum = parentObj.find(":checkbox").index(this); /*当前索引*/
            var newObj = $('<a href="javascript:;">' + parentObj.find('label').eq(indexNum).text() + '</a>').appendTo(divObj); /*查找对应Label创建选项*/
            if ($(this).prop("checked") == true) {
                newObj.addClass("selected"); /*默认选中*/
            }
            /*检查控件是否启用*/
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return;
            }
            /*绑定事件*/
            $(newObj).click(function () {
                if ($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                    /*parentObj.find(':checkbox').eq(indexNum).prop("checked",false);*/
                } else {
                    $(this).addClass("selected");
                    /*parentObj.find(':checkbox').eq(indexNum).prop("checked",true);*/
                }
                parentObj.find(':checkbox').eq(indexNum).trigger("click"); /*触发对应的checkbox的click事件*/
                /*alert(parentObj.find(':checkbox').eq(indexNum).prop("checked"));*/
            });
        });
    };
    return $(this).each(function () {
        multiCheckbox($(this));
    });
}

/*多项选项PROP*/
$.fn.ruleMultiPorp = function () {
    var multiPorp = function (parentObj) {
        parentObj.addClass("multi-porp"); /*添加样式*/
        parentObj.children().hide(); /*隐藏内容*/
        var divObj = $('<ul></ul>').prependTo(parentObj); /*前插入一个DIV*/
        parentObj.find(":checkbox").each(function () {
            var indexNum = parentObj.find(":checkbox").index(this); /*当前索引*/
            var liObj = $('<li></li>').appendTo(divObj)
            var newObj = $('<a href="javascript:;">' + parentObj.find('label').eq(indexNum).text() + '</a><i></i>').appendTo(liObj); /*查找对应Label创建选项*/
            if ($(this).prop("checked") == true) {
                liObj.addClass("selected"); /*默认选中*/
            }
            /*检查控件是否启用*/
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return;
            }
            /*绑定事件*/
            $(newObj).click(function () {
                if ($(this).parent().hasClass("selected")) {
                    $(this).parent().removeClass("selected");
                } else {
                    $(this).parent().addClass("selected");
                }
                parentObj.find(':checkbox').eq(indexNum).trigger("click"); /*触发对应的checkbox的click事件*/
                /*alert(parentObj.find(':checkbox').eq(indexNum).prop("checked"));*/
            });
        });
    };
    return $(this).each(function () {
        multiPorp($(this));
    });
}

/*多项单选*/
$.fn.ruleMultiRadio = function () {
    var multiRadio = function (parentObj) {
        parentObj.addClass("multi-radio"); /*添加样式*/
        parentObj.children().hide(); /*隐藏内容*/
        var divObj = $('<div class="boxwrap"></div>').prependTo(parentObj); /*前插入一个DIV*/
        parentObj.find('input[type="radio"]').each(function () {
            var indexNum = parentObj.find('input[type="radio"]').index(this); /*当前索引*/
            var newObj = $('<a href="javascript:;">' + parentObj.find('label').eq(indexNum).text() + '</a>').appendTo(divObj); /*查找对应Label创建选项*/
            if ($(this).prop("checked") == true) {
                newObj.addClass("selected"); /*默认选中*/
            }
            /*检查控件是否启用*/
            if ($(this).prop("disabled") == true) {
                newObj.css("cursor", "default");
                return;
            }
            /*绑定事件*/
            $(newObj).click(function () {
                $(this).siblings().removeClass("selected");
                $(this).addClass("selected");
                parentObj.find('input[type="radio"]').prop("checked", false);
                parentObj.find('input[type="radio"]').eq(indexNum).prop("checked", true);
                parentObj.find('input[type="radio"]').eq(indexNum).trigger("click"); /*触发对应的radio的click事件*/
                /*alert(parentObj.find('input[type="radio"]').eq(indexNum).prop("checked"));*/
            });
        });
    };
    return $(this).each(function () {
        multiRadio($(this));
    });
}

/*单选下拉框*/
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
                arrowObj.css("z-index", "1000");
                itemObj.css("z-index", "1000");
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

/*
* jquery 倒计时间展示
* 示例:
* countDown("2014/8/10 23:59:59","#demo01 .day","#demo01 .hour","#demo01 .minute","#demo01 .second");
* countDown("2014/8/10 22:59:59",null,"#demo02 .hour","#demo02 .minute","#demo02 .second");
*/
function countDown(time, day_elem, hour_elem, minute_elem, second_elem) {
    //if(typeof end_time == "string")
    var end_time = new Date(time).getTime(),//月份是实际月份-1
	//current_time = new Date().getTime(),
	sys_second = (end_time - new Date().getTime()) / 1000;
    var timer = setInterval(function () {
        if (sys_second > 0) {
            sys_second -= 1;
            var day = Math.floor((sys_second / 3600) / 24);
            var hour = Math.floor((sys_second / 3600) % 24);
            var minute = Math.floor((sys_second / 60) % 60);
            var second = Math.floor(sys_second % 60);
            day_elem && $(day_elem).text(day);//计算天
            $(hour_elem).text(hour < 10 ? "0" + hour : hour);//计算小时
            $(minute_elem).text(minute < 10 ? "0" + minute : minute);//计算分
            $(second_elem).text(second < 10 ? "0" + second : second);// 计算秒
        } else {
            clearInterval(timer);
        }
    }, 1000);
}
