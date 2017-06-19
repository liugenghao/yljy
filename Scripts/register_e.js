$(function () {
    adjustWin();
    $('form #ComIndustry').on('click', function () {
        $('#industrySelecting').show();
        $('#industrySelecting_head').show();
    });
    $('#industrySelecting_head .confirm').on('click', function () {
        
        var result = '';
        var count = 0;
        $('#industrySelecting input[type="checkbox"]').each(function (i) {
            var flag = $(this).prop("checked");
            if (flag) {
                var text = $(this).prop('id');
                $("#Industry").val(text);
                result += $(this).next().text() + '，';
                count++;
            }
        });
        if (count <= 3) {
            if (result != '') {
                //result = result.substring(0, result.Length - 1);
                $('#ComIndustry').css({ 'width': 'auto', 'paddingLeft': 10, 'paddingRight': 10, 'fontSize': '13px' });
                var newResult = result.substring(0, result.length - 1);
                $('#ComIndustry').text(newResult);
                $('#ComIndustry').append('<span class="triangle"></span>');
            } else {
                $('#ComIndustry').css({ 'width': 80 });
                $('#ComIndustry').text('请选择');
                $('#ComIndustry').append('<span class="triangle"></span>')
            }
            $('#industrySelecting input[type="checkbox"]').prop("checked", false);
            $('.industrySelecting .ind_subject').next().hide();
            $('#industrySelecting').hide();
            $('#industrySelecting_head').hide();
        } else {
            alert('行业选项不得超过3个');
        }
        
    });
    $('#industrySelecting_head .cancel').on('click', function () {
        $('#industrySelecting').hide();
        $('#industrySelecting_head').hide();
        $('.industrySelecting .ind_child').hide();
        
        $('#industrySelecting input[type="checkbox"]').each(function () {
            var flag = $(this).prop("checked");
            if (flag) {
                var text = $(this).prop('id');
                $(this).prop("checked", false);                
            }
        });
        
    });
    $('.industrySelecting .ind_subject').on('click', function () {
        if ($(this).next().is(':hidden')) {
            $(this).next().show();
            $(this).find('span').css('')
        } else {
            $(this).next().hide();
        }
        
    });
    function adjustWin() {
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        var selectpanelHeight = $('.industrySelecting').height();
        var selectpanelWidth = $('.industrySelecting').width();
        var shHeight = $('.industrySelecting_head').height();
        var shWidth = $('.industrySelecting_head').width();
        var spMarginTop = (winHeight - selectpanelHeight) / 2;
        $('#industrySelecting').css({ 'top': spMarginTop, 'left': (winWidth - selectpanelWidth) / 2 });
        $('.industrySelecting_head').css({ 'top': spMarginTop - shHeight, 'left': (winWidth - shWidth) / 2 });
        //console.log(spMarginTop)
        
    }
    $(window).on('resize', function () {
        adjustWin();
    });
});