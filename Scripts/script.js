$(function() {
    getDate();
    adjustWin();
    $('aside li').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('#content > div').hide().eq($(this).index()).removeClass('hidden').show();
    });

    /*-----------------编辑按钮------------------*/
    $('#student_list_panel tbody .edit').on('click', function() {
        var $trInfo = $(this).parent().parent().find('td');
        var name = $trInfo.eq(0).text();
        var sex = $trInfo.eq(1).text();
        var idNum = $trInfo.eq(2).text();
        var telNum = $trInfo.eq(3).text();
        var address = $trInfo.eq(4).text();
        var certificateId = $trInfo.eq(5).text();
        $('#addStudent form')[0].reset();
    });

    function adjustAside() {
        var height = $(window).height() - 60;
        $('aside').height(height);
        var asideHeight = $('aside').height();
        var asideWidth = $('aside').width();
        $('.basic_info').css({
            'marginTop': asideHeight / 8,
            'fontSize': (asideHeight + asideWidth) / 60
        });
        $('.basic_info p').css('marginTop', asideHeight / 50);
        $('aside ul').css('marginTop', asideHeight / 6.5);
        $('aside li').css({
            'fontSize': (asideHeight + asideWidth) / 55,
            'lineHeight': asideHeight / 300,
            'marginTop': asideHeight / 40
        }); //调整侧边栏按钮
    }

    function adjustQuitConfirmWindow() {
        var winWidth = $(window).width();
        $('#quit_promt_window').width(winWidth / 4);
        $('#quit_prompt').css({
            'fontSize': winWidth / 100
        });
        $('#quit_prompt span').css('fontSize', winWidth / 80);
    }

    function adjustContent() { //右边的窗体
        var height = $(window).height() - 60;
        $('#content').height(height);
        frame_height = $("#content").height();
        frame_width = $("#content").width();
    }

    function adjustClass_info() {
        var $item = $('#class_info ul li');
        var contentHeight = window.parent.frame_height;
        var contentWidth = window.parent.frame_width;
        $item.css('marginTop', contentHeight / 3 * 0.12);
        $item.css({
            'height': contentHeight / 3 * 0.85,
        });
        $item.css('font-size', (contentHeight + contentWidth) / 100);
        $item.find('span').css('fontSize', (contentHeight + contentWidth) / 90);
    }

    function adjustWin() {
        //adjustQuitConfirmWindow();
        adjustAside();
        adjustContent();
        adjustClass_info();
    }

    function getDate() {
        var mydate = new Date();
        var str = "" + mydate.getFullYear() + "年";
        str += (mydate.getMonth() + 1) + "月";
        str += mydate.getDate() + "日";
        $('.basic_info').prepend('<div>' + str + '</div>');
    }
    $(window).on('resize', function() {
        adjustWin();
    });
});


