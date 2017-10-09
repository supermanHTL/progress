// 客服拖拽效果
	$(function() {
        var target = document.getElementById("target");
        var top = target.offsetTop;
        var start_x, start_y, end_x, end_y; //坐标
        var firTime, firSec, lasTime, lasSec; //时间
        var dis = 0; //块运动前后两点直线的距离
        var v = 0; //表示速度
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        var eleW = $('#target').width(); //拖拽标签的宽度
        var eleH = $('#target').height(); //拖拽标签的高度
		touch.on('#target', 'touchstart', function(ev){
            ev.preventDefault();
            firTime = new Date();
            firSec = firTime.getTime();
            var touch = ev.changedTouches[0];
            start_x = touch.pageX; //初始的X坐标
            start_y = touch.pageY;  //初始的Y坐标
        });
        var dx, dy;
        touch.on('#target', 'drag', function(ev){
            dx = dx || 0;
            dy = dy || 0;
            var offx = dx + ev.x;
            var offy = dy + ev.y;
            if(offx >= width-eleW-15) {
                offx = width-eleW-15;
            }
            if(offx <= -10) {
                offx = -10;
            }
            if(offy >= height-eleH-top) {
                offy = height-eleH-top;
            }
            if(offy <= -top) {
                offy = -top;
            }
            this.style.webkitTransform = "translate3d(" + offx + "px" + "," + offy + "px" + ",0)";
        });
        touch.on('#target', 'dragend', function(ev){
            dx += ev.x;
            dy += ev.y;
        });
        
	})


// 客服按钮滑动效果
/*
var EventUtil = {
    addHandler: function(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        } else {
            obj["on" + type] = fn;
        }
    },
    removeHandler: function(obj, type, fn) {
        if (obj.removeEventListener) {
            obj.removeEventListener(type, fn, false);
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + type, fn);
        } else {
            obj["on" + type] = null;
        }
    }
};*/
/*var touch = document.getElementById("touch");
EventUtil.addHandler(touch, "touchstart", function(event) {
    console.log(event);
})；

// 连续滑动触发
EventUtil.addHandler(window, "touchmove", function(event) {
        alert(1);
    })；
    //当手指从屏幕上离开时触发;
EventUtil.addHandler(window, "touchend", function(event) {
    alert(1);
})

var oTarget = document.getElementById('drag');
oTarget.on('touch',function(){
    alert(1)
})*/


/*var oDrag = document.getElementById('drag');
var xMax = document.documentElement.clientWidth - oDrag.offsetWidth;
var yMax = document.documentElement.clientHeight - oDrag.offsetHeight;
var iSpeedX = iSpeedY = 0;
var lastX = lastY = 0;

EventUtil.addHandler(oDrag, 'touchstart', function(ev){
    var disX = ev.touches[0].pageX - this.offsetLeft;
    var disY = ev.touches[0].pageY - this.offsetTop;

    EventUtil.addHandler(document, 'touchmove', function(ev){
        var x = ev.touches[0].pageX - disX;
        var y = ev.touches[0].pageY - disY;
        
        if (x < 0) {
            x = 0;
        } else if(x > xMax) {
            x = xMax;
        };

        if (y < 0) {
            y = 0;
        } else if(y > yMax) {
            y = yMax;
        };

        oDrag.style.left = x + 'px';
        oDrag.style.top = y + 'px';

        iSpeedX = x - lastX;
        iSpeedY = y - lastY;

        lastX = x;
        lastY = y;

        EventUtil.addHandler(document,'touchend', function(){
            EventUtil.removeHandler(document,'touchend',function () {
                return false;
            });
            EventUtil.removeHandler(document,'touchmove',function(){
                return false;
            });
            if (Math.abs(iSpeedX) > 8 || Math.abs(iSpeedY) > 8) {
                // iSpeedX = iSpeedY = 0;
                doMove(oDrag);
            // console.log(Math.abs(iSpeedX)+ 'h'+Math.abs(iSpeedX));
            };
        });

    ev.preventDefault();
    });




});

function doMove(obj){
    var disX = document.documentElement.clientWidth - obj.offsetLeft;
    var disY = document.documentElement.clientWidth - obj.offsetTop;

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var x = obj.offsetLeft + iSpeedX;
        var y = obj.offsetTop + iSpeedY;

        if (x < 0) {
            x = 0;
        } else if(x > xMax) {
            x = xMax;
        };

        if (y < 0) {
            y = 0;
        } else if(y > yMax) {
            y = yMax;
        };

        oDrag.style.left = x + 'px';
        oDrag.style.top = y + 'px';

        if ( x === 0 || x === xMax || y === 0 || y === yMax ) {
            clearInterval(obj.timer);
        };
    },30);
}
*/
