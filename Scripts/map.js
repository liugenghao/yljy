$(function () {
    $("#draggable").draggable({ handle: ".title" });
    $("#draggable .close").click(function () {
        $("#draggable").hide();
    });
    adjustWin();
    initPlaceSearchPanle();
    function initPlaceSearchPanle() {
        var placeSearchPanelHeight = $('#placeSearchPanel').width();
        $('#placeSearchPanel').css({
            'right': -placeSearchPanelHeight
        });
    }

    $('aside .areaList li').on('click', function () {
        $('aside .areaList li').removeClass('actived');
        $(this).addClass('actived');
    });
    $('aside .tab li').on('click', function () {
        $('aside .tab li').removeClass('selected');
        $(this).addClass('selected');
        $('#listPanel > ul').hide().eq($(this).index()).show();
        var tabVal = $(this).find('a').text();
        if (tabVal == '区域选择' || tabVal == '机构列表') {
            $('aside .classList li').removeClass('actived');
            closeStuListPanel();
        }        
        $('aside .institutionList li').removeClass('actived');
        $('#classEditPanelAfter').css('opacity', 0);
        $('#classEditPanel').stop().animate({
            left: 0
        }, 500, function () {
            $('#classEditPanel').hide();
        });        
    });
    $('aside .institutionTab a').on('click', function () {
        $('aside .institutionTab a').removeClass('selected');
        $(this).addClass('selected');
        $('#institutionList > ul').hide().eq($(this).index()).show();
    });
    $('#classEditPanelAfter').hover(
        function () {
            $(this).text('查看学员');
        },
        function () {
            $(this).text('学员名单');
        }
    );
    $('#close_editPanelBtn').on('click', function () {
        $('#classEditPanel').stop().animate({
            left: 0
        }, 500, function () {
            $('#classEditPanel').hide();
        });
        $('#classEditPanelAfter').css('opacity', 0).hide();
        closeStuListPanel();
    });
    $('#placeSearchBtn').hover(
        function () {
            $('#placeSearchBtn').css('opacity', 1);
        },
        function () {
            if (!$('#placeSearchBtn input').is(':focus'))
                $('#placeSearchBtn').css('opacity', 0.6);
        }
    );
    $('#classEditPanelAfter').on('click', function () {
        var winWidth = $(window).width();
        var asideWidth = $('aside').width();
        var editPanelWidth = $('#classEditPanel').width();
        $('#studentListPanel').css({
            'marginLeft': asideWidth + editPanelWidth,
            'width': winWidth - asideWidth * 2
        });
        if ($('#studentListPanel').is(":hidden")) {
            $('#right').attr('src', '../StudentManager/Index?id=' + selectedClassId);// = "/StudentManager/Index/" + id;
            $('#studentListPanel').show().stop().animate({
                opacity: 1
            }, 500, function () {
                $('#classEditPanelAfter.actived').hover(
                    function () {
                        $(this).text('关闭名单');
                    },
                    function () {
                        $(this).text('学员名单');
                    }
                );
            });
            $('#classEditPanelAfter').addClass('actived');
        } else if ($('#studentListPanel').is(":visible")) {
            closeStuListPanel();
        }

    });
    function adjustAside() {
        var height = $(window).height() - 80;
        $('aside').height(height);
        var placeSearchPanelHeight = $('#placeSearchPanel').height(height);
        $('#classEditPanel').height(height);
        $('#studentListPanel').height(height);
        $('#institutionEditPanel').height(height);
        var asideHeight = $('aside').height();
        var asideWidth = $('aside').width();
        var editPanelWidth = $('#classEditPanel').width();
        var editPanelHeight = $('#classEditPanel').height();
        var searchBtnPanelWidth = $('#placeSearchBtn').width();
        var mapWidth = $(window).width() - asideWidth;
        $('#placeSearchBtn').css('left', (mapWidth - searchBtnPanelWidth) / 2 + asideWidth);
        $('#deleteConfirmPanel .modal-content').width(editPanelWidth - 20);
        $('#placeSearchPanel ul').height(height - 60);
        $('aside .search_panel').css({ 'marginTop': asideHeight / 15 });
        $('aside .maintainBtns').css('marginTop', asideHeight / 50);
        $('aside .tab ul').css('marginTop', asideHeight / 30);
        $('aside .tab ul a').css({
            'fontSize': (asideHeight + asideWidth) / 60,
            'lineHeight': asideHeight / 280
        });
        $('aside .institutionList .underLine').css({ 'marginBottom': asideHeight / 120, 'marginTop': (asideHeight + asideWidth) / 120 });
        $('aside .institutionTab a').css({
            'fontSize': (asideHeight + asideWidth) / 80,
            'lineHeight': asideHeight / 880,
        });
        $('aside .classTab > a').css({
            'fontSize': (asideHeight + asideWidth) / 80,
            'lineHeight': asideHeight / 880,
        });
        $('aside .classList .underLine').css({ 'marginBottom': asideHeight / 120, 'marginTop': (asideHeight + asideWidth) / 120 });
        $('aside #listPanel').css('marginTop', asideHeight / 80);
        $('aside .areaList li').css({
            'marginTop': asideHeight / 45,
        });
        //$('aside .underLine').css({
        //    'marginTop': (asideHeight + asideWidth) / 100,
        //});

        $('aside .areaList li a').css({
            'fontSize': (asideHeight + asideWidth) / 65,
            'lineHeight': asideHeight / 280
        });
        //$('aside .classList').css('height', asideHeight / 2 + asideHeight / 9);
        $('aside .trainingList').height(asideHeight / 2);
        $('aside .enterpriseList').height(asideHeight / 2);
        $('aside .classList').height(asideHeight / 1.8);
        //$('aside .classList li').css({
        //    'marginTop': asideHeight / 80
        //});
        $('aside .institutionList li a').css({
            'fontSize': (asideHeight + asideWidth) / 80,
            'lineHeight': asideHeight / 360
        });
        $('aside .classList li a').css({
            'fontSize': (asideHeight + asideWidth) / 80,
            'lineHeight': asideHeight / 360,
        });
        //$('aside .institutionList').css('height', asideHeight / 2 + asideHeight / 9);
        //$('aside .institutionList li').css({
        //    'marginTop': asideHeight / 200
        //});
        //$('aside .institutionList li a').css({
        //    'fontSize': (asideHeight + asideWidth) / 80,
        //    'lineHeight': asideHeight / 200,
        //});
        $('.maintainBtns a img').css({
            'width': (asideHeight + asideWidth) / 15,
            'height': (asideHeight + asideWidth) / 15
        });
        if ($('#classEditPanel').is(":visible")) {
            $('#classEditPanel').css({
                'left': asideWidth
            });
        }

        //var inputFormHeight = asideHeight / 40;
        //$('#classEditPanel .form-control').css({
        //    'height': inputFormHeight,
        //    'line-height': inputFormHeight + 'px'
        //});
        //$('#classEditPanel .form-control option').css({
        //    'height': inputFormHeight,
        //    'line-height': inputFormHeight + 'px'
        //});
        //var inputFormHeight = asideHeight / 26;
        //$('#classEditPanel .form-control').css({
        //    'height': inputFormHeight,
        //    'line-height': inputFormHeight + 'px',
        //    'paddingTop': 0,
        //    'paddingBottom': 0
        //});
        //$('#classEditPanel span').css({
        //    'line-height': inputFormHeight + 'px'
        //});
        //$('#classEditPanel .region').css({
        //    'paddingTop': 0,
        //    'paddingBottom': 0,
        //});
        $('#classEditPanelAfter').css({
            'marginLeft': asideWidth + editPanelWidth,
            'marginTop': (editPanelHeight - $('#classEditPanelAfter').height()) / 2
        });

        //$('#studentListPanel').css({
        //    'marginLeft': asideWidth + editPanelWidth
        //});
        $('#map').width($(document).width() - asideWidth);
    }

    function adjustMap() { //右边的窗体
        var height = $(window).height() - 80;
        $('#map').height(height);
        frame_height = $("#map").height();
        frame_width = $("#map").width();
    }

    function adjustWin() {
        //adjustQuitConfirmWindow();
        adjustAside();
        adjustMap();
        //adjustTools();
    }

    function adjustTools() {
        var asideWidth = $('aside').width();
        var mapWidth = $(document).width() - asideWidth;
        var offsetLeft = (mapWidth - $('#addClass').width()) / 2 + asideWidth;
        $('#addClass').css('marginLeft', offsetLeft - 50);
        $('#addInstitution').css('marginLeft', offsetLeft + 50);
    }
    // function getDate() {
    //     var mydate = new Date();
    //     var str = "" + mydate.getFullYear() + "年";
    //     str += (mydate.getMonth() + 1) + "月";
    //     str += mydate.getDate() + "日";
    //     $('.basic_info').prepend('<div>' + str + '</div>');
    // }
    $(window).on('resize', function () {
        adjustWin();
    });

    //var userAgent = navigator.userAgent.toLowerCase();
    //// Figure out what browser is being used 
    //var browser = {
    //    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    //    safari: /webkit/.test(userAgent),
    //    opera: /opera/.test(userAgent),
    //    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    //    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    //};
    //if (browser.msie) {
    //    alert(111)
    //}
});

