$(function() {
    /*-------------------form转json-----------------*/
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
    //$('table tr td:first').css('white-space','nowrap');

    //adjustStuList();
    //function adjustStuList() {
    //    var winWidth = $(document).width();
    //    var winHeight = $(document).height();
    //    $('table').css('fontSize', (winWidth + winHeight) / 160);
    //}
    //$(window).on('resize', function () {
    //    adjustStuList();
    //});
});

