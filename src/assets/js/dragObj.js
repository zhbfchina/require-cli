function Move_obj(obj, col) {
    var zmove = false;
    var D = new Function('obj', 'return document.getElementsByClassName("ky-bodys active")[0].getElementsByClassName(obj)[0];');
    var oevent = new Function('e', 'if (!e) e = window.event;return e');
    var x, y;
    D(obj).onmousedown = function(e) {
        $('.mask').addClass('active');
        zmove = true;
        with(this) {
            var temp1 = offsetLeft;
            var temp2 = offsetTop;
            x = oevent(e).clientX;
            y = oevent(e).clientY;
            document.onmousemove = function(e) {
                if (!zmove) return false;
                with(this) {
                    var sl = temp1 + oevent(e).clientX - x,
                        st = temp2 + oevent(e).clientY - y,
                        ww = $(window).width(),
                        wh = $(window).height();
                    if (col == 'col') {
                        style.left = sl + "px";
                        $('.ky-bodys.active .ky-center-line').css('left', sl + "px");
                        $('.ky-bodys.active .ky-ne-line').css({ 'left': sl + "px", 'width': ww - sl });
                        $('.ky-bodys.active .ky-body-left .ky-pannel-header').css({ 'width': sl + "px" });
                        $('.ky-bodys.active .ky-body-right .ky-pannel-header').css({ 'width': ww - sl + "px" });
                        $('.ky-bodys.active .ky-body-left').width(style.left);
                        $('.ky-bodys.active .ky-body-right').width(ww - sl - 1);
                    } else if (col == 'row') {
                        style.top = st + "px";
                        $('.ky-bodys.active .ky-center-line').css('top', st + "px");
                        $('.ky-bodys.active .ky-body-right-top').height(style.top);
                        $('.ky-bodys.active .ky-body-right-bottom').height(wh - st - 1);
                    } else if (col == undefined) {
                        style.left = sl + "px";
                        style.top = st + "px";
                        $('.ky-bodys.active .ky-sw-line').css('left', sl + "px");
                        $('.ky-bodys.active .ky-ne-line').css({ 'left': sl + "px", 'top': st + "px", 'width': ww - sl });
                        $('.ky-bodys.active .ky-body-left .ky-pannel-header').css({ 'width': sl + "px" });
                        $('.ky-bodys.active .ky-body-right .ky-pannel-header').css({ 'width': ww - sl + "px" });
                        $('.ky-bodys.active .ky-body-left').width(style.left);
                        $('.ky-bodys.active .ky-body-right').width(ww - sl - 1);
                        $('.ky-bodys.active .ky-body-right-top').height(style.top);
                        $('.ky-bodys.active .ky-body-right-bottom').height(wh - st - 1);
                    }
                }
            }
        }
        document.onmouseup = function() {
            zmove = false;
            $('.mask').removeClass('active');
        };
    }
}

function dump(str) {
    // return console.info(JSON.parse(JSON.stringify(str)));
    return JSON.parse(JSON.stringify(str));
}