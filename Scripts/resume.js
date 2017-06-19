$(function () {

    //console.log($('#edu_expPanel .detailPanel2_item').text());
    var eidtEduExpIdTemp = -1;
    $('#basicInfo .con a').on('click', function () {//点击修改个人信息
        openPersonInfoMaintain();
    });
    $('#personInfoMaintain .cancel').on('click', function () {//取消修改个人信息
        closePersonInfoMaintain();
    });
    function openPersonInfoMaintain() {//打开个人信息修改界面
        $('#basicInfo .con').hide();
        $('#personInfoMaintain').show();
    }
    function closePersonInfoMaintain() {//关闭个人信息修改界面
        $('#personName').val('');
        $('#sex_choose input').removeAttr("checked");
        $('#marriage select').val('');
        $('#regis_res').val('');
        $('#workExp select').val('');
        $('#id_num').val('');
        $('#personTel').val('');
        $('#personEmail').val('');
        $('#basicInfo .con').show();
        $('#personInfoMaintain').hide();
    }
    $('#work_exp a').on('click', function () {//修改工作经验
        if ($('#workExpMaintain').is(':hidden')) {
            var company = [];
            var time = [];
            //var major = [];
            //var degree = [];
            $('#work_expPanel .detailPanel2_item').each(function (i) {
                time.push($(this).find('span').eq(0).text());
                company.push($(this).find('span').eq(1).text());
            });
            if (time.length > 0) {
                $('#workExpMaintain table').show();
                var con = '';
                for (var i = 0; i < time.length; i++) {
                    con += '<tr data-id="' + i + '"><td>' + company[i] + '</td><td>' + time[i] + '</td><td><a class="btn btn-success edit">编辑</a><a class="btn btn-danger delete">删除</a></td></tr>';
                }
                var tbHead = '<tr><th>公司名称</th><th>时间</th><th></th></tr>';
                $('#workExpMaintain table').empty().append(tbHead);
                $('#workExpMaintain table').append(con);
                //bindEduExpEvent();
        } else {
            $('#work_expPanel table').hide();
        }
        $('#workExpMaintain').show();
        $('#work_expPanel').hide();
    }
        
    });
    
    $('#edu_exp a').on('click', function () {//修改教育背景
        if ($('#eduMaintain').is(':hidden')) {
            var time = [];
            var univ = [];
            var major = [];
            var degree = [];
            $('#edu_expPanel .detailPanel2_item').each(function (i) {
                //var time = $(this).find('span').eq(0).text().split('-');
                //startT.push(time[0]);
                //endT.push(time[1]);
                time.push($(this).find('span').eq(0).text());
                univ.push($(this).find('span').eq(1).text());
                major.push($(this).find('span').eq(2).text())
                degree.push($(this).find('span').eq(3).text());
            });
            if (time.length > 0) {
                $('#eduMaintain table').show();
                var con = '';
                for (var i = 0; i < time.length; i++) {                    
                    con += '<tr data-id="'+i+'"><td>' + time[i] + '</td><td>' + univ[i] + '</td><td>' + major[i] + '</td><td>' + degree[i] + '</td><td><a class="btn btn-success edit">编辑</a><a class="btn btn-danger delete">删除</a></td></tr>';
                }
                var tbHead = '<tr><th>时间</th><th>学校名称</th><th>专业名称</th><th>学历学位</th><th></th></tr>';
                $('#eduMaintain table').empty().append(tbHead);
                $('#eduMaintain table').append(con);
                bindEduExpEvent();
            } else {
                $('#eduMaintain table').hide();
            }
            $('#eduMaintain').show();
            $('#edu_expPanel').hide();
        }
    });
    function bindEduExpEvent() {//绑定教育经历编辑事件
        $('#eduMaintain table .edit').on('click', function () {//编辑教育经历
            $('#eduMaintain table tr').css('background-color', '#fff');
            $(this).parent().parent().css('background-color', '#FCF8E3');
            var dataId = $(this).parent().parent().attr('data-id');
            var item = $(this).parent().parent().find('td');
            var time = item.eq(0).text().split('至');
            var startT = time[0];
            var endT = time[1];
            var univ = item.eq(1).text();
            var major = item.eq(2).text();
            var degree = item.eq(3).text();
            $('#addEduInfoBtnGrp .add').text('确认修改');
            openAddEduInfoP();
            $('#addEduInfo input.datepicker').eq(0).val(startT);
            $('#addEduInfo input.datepicker').eq(1).val(endT);
            $('#schName').val(univ);
            $('#marjorName').val(major);
            $('#degree').val(degree);
            eidtEduExpIdTemp = dataId;
        })
        $('#eduMaintain table .delete').on('click', function () {//编辑教育经历
            $(this).parent().parent().remove();
            if($('#eduMaintain table tr').length==1){
                $('#eduMaintain table').hide();
            }
        })
    }
    $('#eduMaintain > .save').on('click', function () {//保存所有教育经历
        var time = [];
        var univ = [];
        var major = [];
        var degree = [];
        $('#eduMaintain table tr').each(function (i) {
            if (i > 0) {
                time.push($(this).find('td').eq(0).text());
                univ.push($(this).find('td').eq(1).text());
                major.push($(this).find('td').eq(2).text());
                degree.push($(this).find('td').eq(3).text());
            }
        });
        var con = '';
        for (var i = 0; i < time.length; i++) {
            con += '<div class="detailPanel2_item clearfix"><span>' + time[i] + '</span><span class="bold">' + univ[i] + '</span><span>' + major[i] + '</span><span class="bold">' + degree[i] + '</span></div>';
        }
        $('#edu_expPanel').empty().append(con);
        closeAddEduInfoP();
        $('#eduMaintain').hide();
        $('#edu_expPanel').show();      
    });
    $('#eduMaintain > .cancel').on('click', function () {//取消保存所有教育经历
        closeAddEduInfoP();
        $('#eduMaintain').hide();
        $('#edu_expPanel').show();

    });
    $('#eduMaintain > .add').on('click', function () {//添加教育背景按钮
        $('#addEduInfoBtnGrp .add').text('确认添加');
        eidtEduExpIdTemp = -1;
        openAddEduInfoP();
    });
    function addEduInfo() {//确认添加
        var time = $('#addEduInfo input.datepicker').eq(0).val() + ' 至 ' + $('#addEduInfo input.datepicker').eq(1).val();
        var univName = $('#schName').val();
        var marjor = $('#marjorName').val();
        var degreeName = $('#degree').val();
        if ($('#eduMaintain table tr').length <= 1) {
            var tbHead = '<tr><th>时间</th><th>学校名称</th><th>专业名称</th><th>学历学位</th><th></th></tr>';
            $('#eduMaintain table').show().empty().append(tbHead);
        }
        var trCon = '<tr><td>' + time + '</td><td>' + univName + '</td><td>' + marjor + '</td><td>' + degreeName + '</td><td><a class="btn btn-success edit">编辑</a><a class="btn btn-danger delete">删除</a></td></tr>';
        $('#eduMaintain table').append(trCon);
        bindEduExpEvent();
        closeAddEduInfoP();
    }
    function modifyEduInfo(id) {
        $('#eduMaintain table tr').each(function () {
            if ($(this).attr('data-id') == id) {
                var time = $('#addEduInfo input.datepicker').eq(0).val() + ' 至 ' + $('#addEduInfo input.datepicker').eq(1).val();
                var univName = $('#schName').val();
                var marjor = $('#marjorName').val();
                var degreeName = $('#degree').val();
                var tdCon = $(this).find('td');
                tdCon.eq(0).text(time);
                tdCon.eq(1).text(univName);
                tdCon.eq(2).text(marjor);
                tdCon.eq(3).text(degreeName);
            }            
        });
    }
    $('#addEduInfoBtnGrp .add').on('click', function () {//确认添加或修改
        if (eidtEduExpIdTemp == -1) {
            addEduInfo();
        } else {
            modifyEduInfo(eidtEduExpIdTemp);
        }
        closeAddEduInfoP();
    });
    $('#addEduInfoBtnGrp .cancel').on('click', function () {//取消添加教育背景按钮
        closeAddEduInfoP();
    });

    function closeAddEduInfoP() {//关闭添加教育经历面板
        $('#addEduInfo').hide();
        $('#eduMaintain table tr').css('background-color', '#fff');
        $('#eduMaintain > .cancel').show();
        $('#eduMaintain .add').show();
        $('#addEduInfo input').val('');
        $('#addEduInfo select').val('');
    }
    function openAddEduInfoP() {//打开添加教育经历面板
        $('#addEduInfo').show();
        $('#eduMaintain > .cancel').hide();
        $('#eduMaintain > .add').hide();
    }
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);

    $(".datepicker").datepicker({
        dateFormat: 'yy.mm',
        changeMonth: true,
        changeYear: true,
        yearRange: "1979:2015"

    });
});