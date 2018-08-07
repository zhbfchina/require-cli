var dragMinWidth = 300;
var dragMinHeight = 300;
var oDrag = document.querySelector('.api-code');
/* var oTitle = document.querySelector('.drag .title'); */
/* var min = document.querySelector('.min');
var max = document.querySelector('.max');
var revert = document.querySelector('.revert');
var close = document.querySelector('.close'); */
/* var resizeL = document.querySelector('.resizeL');
var resizeB = document.querySelector('.resizeB'); */
var resizeR = document.querySelector('.resizeR');
/* var resizeT = document.querySelector('.resizeT');
var resizeLT = document.querySelector('.resizeLT');
var resizeLB = document.querySelector('.resizeLB');
var resizeRT = document.querySelector('.resizeRT');
var resizeRB = document.querySelector('.resizeRB'); */



//拖拉函数
function drag(oDrag, handle) {
    var disX = disY = 0;
    handle = handle || oDrag;
    handle.style.cursor = 'move';

    handle.onmousedown = function(e) {
        e = e || event;
        e.preventDefault();
        disX = e.clientX - oDrag.offsetLeft;
        disY = e.clientY - oDrag.offsetTop;
        document.onmousemove = function(e) {
            e = e || event;
            var Left = e.clientX - disX;
            var Top = e.clientY - disY;
            var maxleft = document.documentElement.offsetWidth - oDrag.offsetWidth;
            var maxtop = document.documentElement.clientHeight - oDrag.offsetHeight;
            if (Left < 0) {
                Left = 0;
            } else if (Left > maxleft) {
                Left = maxleft;
            };
            if (Top < 0) {
                Top = 0;
            } else if (Top > maxtop) {
                Top = maxtop;
            };
            oDrag.style.left = Left + 'px';
            oDrag.style.top = Top + 'px';
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };


};

//改变大小函数
function resize(oparent, handle, isleft, istop, lookx, looky) {
    var disX = disY = 0;
    handle = handle || oDrag;

    handle.onmousedown = function(e) {
        e = e || event;
        e.preventDefault();
        disX = e.clientX - this.offsetLeft;
        disY = e.clientY - this.offsetTop;
        var iparenttop = oparent.offsetTop;
        var iparentleft = oparent.offsetLeft;
        var iparentwidth = oparent.offsetWidth;
        var iparentheight = oparent.offsetHeight;

        document.onmousemove = function(e) {
            e = e || event;
            var iL = e.clientX - disX;
            var iT = e.clientY - disY;
            var maxw = document.documentElement.clientWidth - oparent.offsetLeft - 2;
            var maxh = document.documentElement.clientHeight - oparent.offsetTop - 2;
            var iw = isleft ? iparentwidth - iL : handle.offsetWidth + iL;
            var ih = istop ? iparentheight - iT : handle.offsetHeight + iT;
            if (isleft) {
                oparent.style.left = iparentleft + iL + 'px';
            };
            if (istop) {
                oparent.style.top = iparenttop + iT + 'px';
            };
            if (iw < dragMinWidth) {
                iw = dragMinWidth
            } else if (iw > maxw) {
                iw = maxw;
            };
            if (lookx) {
                oparent.style.width = iw + 'px';
            };
            if (ih < dragMinHeight) {
                ih = dragMinHeight;
            } else if (ih > maxh) {
                ih = maxh;
            };
            if (looky) {
                oparent.style.height = ih + 'px';
            };
            if ((isleft && iw == dragMinWidth) || (istop && ih == dragMinHeight)) {
                document.onmousemove = null;
            };
            return false;
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
};