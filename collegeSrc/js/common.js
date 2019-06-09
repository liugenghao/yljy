

//发送验证码倒计时开始 
var time = 1;
function sendMessStu() {
    var sjhValue = $("#sjh").val();
    var txyzmValue = $("#txyzm").val();
    var verValue = $(".verification-img").text();
    var phReg = !!sjhValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[5678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
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
    } else if (yzmValue != verValue.toLowerCase()) {
        $(".yzm").text("验证码错误！").css("color", "red"); //加错误信息提示
    } else {
        $("#formId").submit();
        return false;
    }
};
function clearFormat() {
    $(".nameAlert").text("").css("color", "#20bd00");
    $(".IDCardAlert").text("").css("color", "#20bd00");
    $(".collegeAlert").text("").css("color", "#20bd00");
    $(".entranceAlert").text("").css("color", "#20bd00");
    $(".graduationAlert").text("").css("color", "#20bd00");
    $(".majorAlert").text("").css("color", "#20bd00");
    $(".phoneNumAlert").text("").css("color", "#20bd00");
    $(".ECAlert").text("").css("color", "#20bd00");
    $(".ECPhoneAlert").text("").css("color", "#20bd00");
}
//实习意向填报
function fillFrom() {
    var ChinesePattern = /^[\u4e00-\u9fa5]+$/;
    var nameValue = $("#name").val().trim();//名字
    var sfzhmValue = $("#sfzhm").val().trim();//身份证号
    var jdxxValue = $("#jdxx").val().trim();//就读学校
    var entranceValue = $("#entrance").val().trim();//入学时间
    var graduationValue = $("#graduation").val().trim();//毕业时间
    var majorValue = $("#major").val().trim();//专业
    var addressValue = $("#address").val().trim();//家庭住址
    var phoneNumValue = $("#phoneNum").val().trim();//手机
    var phReg = !!phoneNumValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    var emergencyContactValue = $("#EC").val().trim();//紧急联系人
    var emergencyPhone = $("#ECPhone").val().trim();//紧急联系人电话
    var bankAccountValue = $("#bankAccount").val().trim();//银行卡号
    var ECphReg = !!emergencyPhone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    var IDcardReg = checkIdcard(sfzhmValue);
    //var IDcardReg = !!sfzhmValue.match(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i); //身份证号码
    clearFormat();
    if (nameValue == "") {
        $(".nameAlert").text("姓名不能为空！").css("color", "red"); //加错误信息提示
    } else if (!ChinesePattern.test(nameValue)) {
        $(".nameAlert").text("请填写正确的中文名！").css("color", "red");
    } else if (sfzhmValue == "") {
        $(".IDCardAlert").text("身份证号码不能为空！").css("color", "red"); //加错误信息提示
    } else if (!IDcardReg) {
        $(".IDCardAlert").text("身份证号码格式不正确！").css("color", "red");
    } else if (jdxxValue == "") {
        $(".collegeAlert").text("就读学校不能为空！").css("color", "red"); //加错误信息提示
    } else if (entranceValue == "") {
        $(".entranceAlert").text("入学时间不能为空").css("color", "red");
    } else if (graduationValue == "") {
        $(".graduationAlert").text("毕业时间不能为空").css("color", "red");
    } else if (majorValue == "") {
        $(".majorAlert").text("专业不能为空").css("color", "red");
    } else if (addressValue == "") {
        $(".addressAlert").text("家庭住址不能为空").css("color", "red");
    } else if (phoneNumValue == "") {
        $(".phoneNumAlert").text("手机号不能为空！").css("color", "red"); //加错误信息提示
    } else if (!phReg) {
        $(".phoneNumAlert").text("手机号格式不正确！").css("color", "red"); //加错误信息提示
    } else if (emergencyContactValue == "") {
        $(".ECAlert").text("紧急联系人不能为空").css("color", "red");
    } else if (emergencyPhone == "") {
        $(".ECPhoneAlert").text("紧急联系人号码不能为空").css("color", "red");
    } else if (!ECphReg) {
        $(".ECPhoneAlert").text("紧急联系人号码格式不对").css("color", "red"); 
    } else if (bankAccountValue == "") {
        $(".bankAccountAlert").text("银行卡号不能为空").css("color", "red");
    } else if (!luhnCheck(bankAccountValue)) {
        $(".bankAccountAlert").text("请填写正确的银行卡号").css("color", "red");
    } else {
        $("#formId").submit();
        return false;
    }
};
//银行卡号码检测
function luhnCheck(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9
    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
            else arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算luhn值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhn = 10 - k;

    if (lastNum == luhn) {
        //$("#banknoInfo").html("luhn验证通过");
        return true;
    } else {
        //$("#banknoInfo").html("银行卡号必须符合luhn校验");
        return false;
    }
}
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
            //popTips('id');
            //$('.studenPanel .ID_Card').focus();
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
            //popTips('id');
            //$('.studenPanel .ID_Card').focus();
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
                //popTips('id');
                //$('.studenPanel .ID_Card').focus();
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
    var yzmValue = $("#yzm").val();
    var verValue = $(".verification-img").text();
    var phReg = !!sjhValue.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
    if (username == "") {
        $(".username").text("用户名不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (nameValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("姓名不能为空！").css("color", "red");
    } else if (pwdhmValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".pwd").text("密码不能为空！").css("color", "red");
        if (qrpwdValue == "") {
            $(".qrpwd").text("确认密码不能为空！").css("color", "red");
        }
    } else if (pwdhmValue.length < 6 || pwdhmValue.length > 18) {
        $(".pwd").text("密码长度为6-18位字符！").css("color", "red");
    } else if (qrpwdValue != pwdhmValue) {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("两次密码不一致！").css("color", "red");
    } else if (sjhValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".sjh").text("手机号不能为空！").css("color", "red");
    } else if (phReg == false) {
        $(".sjh").text("手机号格式不正确！").css("color", "red");
    } else if (txyzmValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".sjh").text("").css("color", "#20bd00");
        $(".txyzm").text("图形验证码不能为空！").css("color", "red");
    } else if (txyzmValue != verValue.toLowerCase()) {
        $(".txyzm").text("图形验证码错误！").css("color", "red");
    } else if (yzmValue == "") {
        $(".txyzm").text("").css("color", "#20bd00");
        $(".yzm").text("短信验证码不能为空！").css("color", "red");
    } else {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".sjh").text("").css("color", "#20bd00");
        $(".txyzm").text("").css("color", "#20bd00");
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
    var txyzmValue = $("#txyzm").val();
    var yzmValue = $("#yzm").val();
    var verValue = $(".verification-img").text();
    var phReg = !!contactPhone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    if (username == "") {
        $(".username").text("用户名不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (nameValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("单位名称不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (licenseValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".license").text("营业执照不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (pwdhmValue == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
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
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".license").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("两次密码不一致！").css("color", "red"); //加错误信息提示
    }
    else if (contactName == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".license").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".contactName").text("负责人不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (contactPhone == "") {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".license").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".contactName").text("").css("color", "#20bd00");
        $(".contactPhone").text("负责人电话不能为空！").css("color", "red"); //加错误信息提示
    }
    else if (phReg == false) {
        $(".contactPhone").text("负责人电话格式不正确！").css("color", "red"); //加错误信息提示
    } else if (txyzmValue == '') {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".license").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".contactName").text("").css("color", "#20bd00");
        $(".contactPhone").text("").css("color", "red");
        $(".txyzm").text("图形验证码不能为空！").css("color", "red");
    } else if (txyzmValue != verValue.toLowerCase()) {
        $(".txyzm").text("图形验证码错误！").css("color", "red");
    } else if (yzmValue == "") {
        $(".txyzm").text("").css("color", "red");
        $(".yzm").text("短信验证码不能为空！").css("color", "red");
    } else {
        $(".username").text("").css("color", "#20bd00");
        $(".name").text("").css("color", "#20bd00");
        $(".license").text("").css("color", "#20bd00");
        $(".pwd").text("").css("color", "#20bd00");
        $(".qrpwd").text("").css("color", "#20bd00");
        $(".contactName").text("").css("color", "#20bd00");
        $(".contactPhone").text("").css("color", "red");
        $("#formId").submit();
        return false;
    }
};