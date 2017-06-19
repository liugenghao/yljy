

//发送验证码倒计时开始 
var time = 120;
function sendMessStu() {
    var sjhValue = $("#sjh").val();
    var txyzmValue = $("#txyzm").val();
    var verValue = $(".verification-img").text();
    var phReg = !!sjhValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    if (sjhValue == "") {
        $(".sjh").text("手机号不能为空！").css("color", "red");
    } else if (phReg == false) {
        $(".sjh").text("手机号格式不正确！").css("color", "red");
    } else if (txyzmValue == '') {
        $(".sjh").text("").css("color", "red");
        $(".txyzm").text("图形验证码不能为空！").css("color", "red");
    } else if (txyzmValue != verValue.toLowerCase()) {
        $(".txyzm").text("图形验证码错误！").css("color", "red");
    } else {
        var data = sjhValue + "," + 2;
        $.ajax({
            type: 'POST',
            url: '/college/sendMess',
            data: data,
            contentType: "application/json; charset=utf-8"
        })
            .done(function (data) {
                layer(data[0], null, data[1]);
                setTimeout(function () { eval(data[2]) }, 1000);
            });
        $(this).removeClass("btn-primary").addClass("btn-default");
        setTimeout(setTime, 1000);
    }
};
function sendMessEnterprise() {
    var sjhValue = $("#contactPhone").val();
    var txyzmValue = $("#txyzm").val();
    var verValue = $(".verification-img").text();
    var phReg = !!sjhValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    if (sjhValue == "") {
        $(".contactPhone").text("负责人电话不能为空！").css("color", "red");
    } else if (phReg == false) {
        $(".contactPhone").text("负责人电话格式不正确！").css("color", "red");
    } else if (txyzmValue == '') {
        $(".contactPhone").text("").css("color", "red");
        $(".txyzm").text("图形验证码不能为空！").css("color", "red");
    } else if (txyzmValue != verValue.toLowerCase()) {
        $(".txyzm").text("图形验证码错误！").css("color", "red");
    } else {
        var data = sjhValue + "," + 1;
        alert(data)
        $.ajax({
            type: 'POST',
            url: '/college/sendMess',
            data: data,
            contentType: "application/json; charset=utf-8"
        })
            .done(function (data) {
                layer(data[0], null, data[1]);
                setTimeout(function () { eval(data[2]) }, 1000);
            });
        $(this).removeClass("btn-primary").addClass("btn-default");
        setTimeout(setTime, 1000);
    }
};
function setTime() {
    time--;
    $("#sendMess").text("重发验证码(" + time + "s)");
    $("#sendMess").attr("disabled", "disabled");
    if (time == 0) {
        $("#sendMess").removeAttr("disabled", "disabled");
        $("#sendMess").removeClass("btn-default").addClass("btn-primary");
        $("#sendMess").text("发送验证码");
        time = 120;
        return;
    }
    setTimeout(setTime, 1000);
};
//发送验证码倒计时结束
//手机号码验证   login.html 
function login() {
    var phValue = $("#mobile").val();
    var pwdValue = $("#pwd").val();
    var yzmValue = $("#yzm").val();
    var verValue = $(".verification-img").text();
    var phReg = !!phValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    if (phValue == "") {
        $(".mobile").text("用户名不能为空！").css("color", "red"); //加错误信息提示
    } else if (phValue.length == 11 && phReg == false) {
        $(".mobile").text("手机号码格式不正确！").css("color", "red"); //加错误信息提示
    } else if (pwdValue == "") {
        $(".mobile").text("").css("color", "#20bd00"); //加正确信息提示
        $(".pwd").text("密码不能为空！").css("color", "red"); //加错误信息提示
    } else if (pwdValue.length < 6 || pwdValue.length > 18) {
        $(".pwd").text("密码长度为6-18位字符串！").css("color", "red"); //加错误信息提示

    } else if (yzmValue == '') {
        $(".pwd").text("").css("color", "#20bd00"); //加正确信息提示
        $(".yzm").text("验证码不能为空！").css("color", "red"); //加错误信息提示
    } else {
        if (yzmValue != verValue.toLowerCase()) {
            $(".yzm").text("验证码错误！").css("color", "red"); //加错误信息提示
        } else {
            $("#formId").submit();
            return false;
        }
    }
};
//实习意向填报
function fillFrom() {
    var nameValue = $("#name").val();
    var sfzhmValue = $("#sfzhm").val();
    var jdxxValue = $("#jdxx").val();
    var sjhValue = $("#sjh").val();
    var phReg = !!sjhValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    var IDcardReg = checkIdcard(sfzhmValue);
    //var IDcardReg = !!sfzhmValue.match(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i); //身份证号码
    if (nameValue == "") {
        $(".name").text("姓名不能为空！").css("color", "red"); //加错误信息提示
    } else if (sfzhmValue == "") {
        $(".name").text("").css("color", "#20bd00");
        $(".sfzhm").text("身份证号码不能为空！").css("color", "red"); //加错误信息提示
    } else if (!IDcardReg) {
        $(".sfzhm").text("身份证号码格式不正确！").css("color", "red");
    } else if (jdxxValue == "") {
        $(".sfzhm").text("").css("color", "#20bd00");
        $(".jdxx").text("就读学校不能为空！").css("color", "red"); //加错误信息提示
    } else if (sjhValue == "") {
        $(".jdxx").text("").css("color", "#20bd00");
        $(".sjh").text("手机号不能为空！").css("color", "red"); //加错误信息提示
    } else if (!phReg) {
        $(".sjh").text("手机号格式不正确！").css("color", "red"); //加错误信息提示
    } else {
        $("#formId").submit();
        return false;
    }
};
function checkIdcard(num) {
    num = num.trim();
    num = num.toUpperCase();
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
        return false;
    }
    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
    //下面分别分析出生日期和校验位
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            //alert('输入的身份证号里出生日期不对！');
            popTips('id');
            $('.studenPanel .ID_Card').focus();
            return false;
        }
        else {
            //将15位身份证转成18位
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return true;
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re);

        //检查生日日期是否正确
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            popTips('id');
            $('.studenPanel .ID_Card').focus();
            //alert('输入的身份证号里出生日期不对！');
            return false;
        }
        else {
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                popTips('id');
                $('.studenPanel .ID_Card').focus();
                //alert('18位身份证的校验码不正确！应该为：' + valnum);
                return false;
            }
            return true;
        }
    }
    return false;
}
//学生注册
function regStudent() {
    var username = $("#username").val();
    var nameValue = $("#name").val();
    var pwdhmValue = $("#pwd").val();
    var qrpwdValue = $("#qrpwd").val();
    var sjhValue = $("#sjh").val();
    var txyzmValue = $("#txyzm").val();
    //var yzmValue = $("#yzm").val();
    var verValue = $(".verification-img").text();
    var phReg = !!sjhValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    if (username == "") {
        $(".username").text("用户名不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (nameValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("姓名不能为空！").css("color", "red");
    } else if (pwdhmValue == "") {
        $(".name").text("").css("color", "#20bd00");
        $(".pwd").text("密码不能为空！").css("color", "red");

        if (qrpwdValue == "") {
            $(".qrpwd").text("确认密码不能为空！").css("color", "red");
        }
    } else if (pwdhmValue.length < 6 || pwdhmValue.length > 18) {
        $(".pwd").text("密码长度为6-18位字符！").css("color", "red");
    } else if (qrpwdValue != pwdhmValue) {
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("两次密码不一致！").css("color", "red");
    } else if (sjhValue == "") {
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".sjh").text("手机号不能为空！").css("color", "red");
    } else if (phReg == false) {
        $(".sjh").text("手机号格式不正确！").css("color", "red");
    } else if (txyzmValue == '') {
        $(".sjh").text("").css("color", "red");
        $(".txyzm").text("图形验证码不能为空！").css("color", "red");
    } else if (txyzmValue != verValue.toLowerCase()) {
        $(".txyzm").text("图形验证码错误！").css("color", "red");
        //} else if (yzmValue == "") {
        //    $(".txyzm").text("").css("color", "red");
        //    $(".yzm").text("短信验证码不能为空！").css("color", "red"); 
    } else {
        $("#formId").submit();
        return false;
    }
};
//企业注册
function regEnterprise() {
    var username = $("#username").val();
    var nameValue = $("#name").val();
    var pwdhmValue = $("#pwd").val();
    var qrpwdValue = $("#qrpwd").val();
    var licenseValue = $("#license").val();
    var contactName = $("#contactName").val();
    var contactPhone = $("#contactPhone").val();
    var phReg = !!contactPhone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    if (username == "") {
        $(".username").text("用户名不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (nameValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("单位名称不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (licenseValue == "") {
        $(".name").text("").css("color", "#20bd00");
        $(".license").text("营业执照不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (pwdhmValue == "") {
        $(".license").text("").css("color", "#20bd00");
        $(".pwd").text("密码不能为空！").css("color", "red"); //加错误信息提示
        if (qrpwdValue == "") {
            $(".qrpwd").text("确认密码不能为空！").css("color", "red"); //加错误信息提示
        }
    }
    else if (pwdhmValue.length < 6 || pwdhmValue.length > 18) {
        $(".pwd").text("密码长度为6-18位字符！").css("color", "red"); //加错误信息提示
    }
    else if (qrpwdValue != pwdhmValue) {
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("两次密码不一致！").css("color", "red"); //加错误信息提示
    }
    else if (contactName == "") {
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".contactName").text("负责人不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (contactPhone == "") {
        $(".contactName").text("").css("color", "#20bd00");
        $(".contactPhone").text("负责人电话不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (phReg == false) {
        $(".contactPhone").text("负责人电话格式不正确！").css("color", "red"); //加错误信息提示
    }
    else {
        $("#formId").submit();
        return false;
    }
};