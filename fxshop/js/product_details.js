(function() {
    var oWrap = $('#others-wrap');

    /*
     * 扩展方法
     */
    $.fn.currency = function(v) {
        // 默认保留两位小数
        if (typeof(v) === 'undefined') v = 2;
        var n = parseInt(this.text());
        n = n.toFixed(v);
        $(this).text(n);
    }

    /* 
     * 函数封装
     */
    // 进入选择界面
    function slideIn() {
        oWrap.show();
        $('.others').removeClass('others-out').addClass('others-in');
        $('.fix-bottom .sure').show();
    }
    // 退出选择界面
    function slideOut() {
        $('.others').removeClass('others-in').addClass('others-out');

        clearTimeout(oWrap.timer);
        oWrap.timer = setTimeout(function() {
            oWrap.hide();
        }, 200)

        // 退出初始化
        $('.options li').removeClass('active');
        $('.selected').text('请选择商品属性');
        $('.fix-bottom .sure').hide();
    }

    // 选择商品属性信息不完整时提示
    function incomplete() {
        var opts = $('.options'),
            oI = $('.fadeInOut i'),
            info = '';
        opts.each(function() {
            if ($(this).find('.active').length === 0) {
                oI.addClass('fadeWarn');
                info = '请选择' + $(this).prev().text();
                fadeInOut(info, function() {
                    oI.removeClass('fadeWarn');
                });
            }
        });
    }

    // 提示信息弹出
    function fadeInOut(info, cb) {
        $('.fadeInOut span').text(info).parent().show();
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            $('.fadeInOut').hide();
            cb && cb();
        }, 800);
    }

    // 所有价格保留两位小数
    $('.currency').each(function(){
        $(this).currency();
    });

    // banner图
    (function() {
        var w = $(window).width(),
            oSwiper = $('#banner ul'),
            len = $('#banner li').length,
            str = '',
            iNow = 0,
            L, x0, x1, disX;

        // 初始化及小圆点的创建
        $('#banner li').css('width', w);
        oSwiper.css('width', w * len);
        for (var i = 0; i < len; i++) {
            str += '<i></i>';
        };
        str = '<div class="points">'+ str +'</div>';
        $('#banner').append(str);
        $('.points i').first().addClass('dot');

        oSwiper.on('touchstart', function(ev) {
            x0 = ev.changedTouches[0].pageX;
            disX = x0 - $(this).offset().left;
        });

        oSwiper.on('touchmove', function(ev) {
            ev.preventDefault();
            x1 = ev.changedTouches[0].pageX;
            L = x1 - disX;
            // 阻止划出边界
            if (L > 0) {
                L = 0;
            } else if (L < -(len - 1) * w) {
                L = -(len - 1) * w;
            }

            $(this).css('marginLeft', L).removeClass('swiper');
        });
        oSwiper.on('touchend', function() {
            var t = x1 - x0;
            if (Math.abs(t) > w / 6) {
                if (t < 0) {
                    iNow--;
                    if (iNow < 1 - len) iNow = 1 - len;
                } else {
                    iNow++;
                    if (iNow > 0) iNow = 0;
                }
            };
            $(this).css('marginLeft', iNow * w).addClass('swiper');
            $('.points i').removeClass('dot').eq(-iNow).addClass('dot');
        });
    })();

    //  顶部栏样式变换
    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            $("#topfix").addClass('topfix-active');
            $(".back").addClass('back-active');
            $(".shopping-cart").addClass('cart-active');
        } else {
            $("#topfix").removeClass('topfix-active');
            $(".back").removeClass('back-active');
            $(".shopping-cart").removeClass('cart-active');
        }
    });

    // 选择其他属性
    (function() {
        $('.select-attr').tap(function() {
            oWrap.add('.sure').show();
            $('.others').removeClass('others-out').addClass('others-in');
            $('.sure').attr('index',0);// oWrap被触发目的是为了加入购物车

            // 退出选择界面
            oWrap.add('.close').tap(function(event) {
                slideOut();
                // 阻止结构父级再次触发点击事件
                event.stopPropagation();
            });

            $('.others').tap(function(event) {
                event.stopPropagation();
            });
        })
    })();

    // 选择颜色和尺码
    (function() {
        $('.options').each(function() {
            var aLi = $(this).find('li:not(.disable)');

            aLi.each(function() {
                $(this).tap(function() {
                    var str = '';

                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    } else {
                        aLi.removeClass('active');
                        $(this).addClass('active');
                    }

                    // 提示
                    $('.options li.active').each(function() {
                        str += $(this).parent().prev().text() + $(this).text() + ';';
                    });

                    if (str === '') {
                        str = '请选择商品属性';
                    } else {
                        str = '已选择：' + str;
                    };
                    $('.selected').text(str);
                })
            })
        })
    })();

    // 数量编辑
    (function() {
        var n = 0;
        // 减少
        $('#reduce').tap(function() {
            n = parseInt($('.edit input').val());
            n--;
            if (n === 0) n = 1;
            $('.edit input').val(n);
        });
        // 增加
        $('#increase').tap(function() {
            n = parseInt($('.edit input').val());
            n++;
            $('.edit input').val(n);
        });
    })();

    // 选择并加入购物车或立即购买
    (function() {
        var oSure = $('.fix-bottom .sure'),
            oI = $('.fadeInOut i'),
            L = $('.options').length,
            info = '',
            iNow;

        $('.fix-bottom input').each(function(i) {
            $(this).tap(function(e) {
                slideIn();
                oSure.attr('index',i); // 判断当前点击的是加入购物车还是立即购买
            })
        })

        oSure.tap(function() {
            var len = $('.options .active').length;

            switch (len) {
                // 1.都不勾选
                case 0:
                    info = '请选择商品属性';
                    oI.addClass('fadeWarn');
                    fadeInOut(info, function() {
                        oI.removeClass('fadeWarn');
                    });
                    break;
                // 2.信息正确
                case L:
                    if ($(this).attr('index') == 0) {
                        info = '已加入购物车';
                        fadeInOut(info);
                        slideOut();
                    } else if ($(this).attr('index') == 1) {
                        window.location.href = "order_details_forPay.html";
                    }
                    break;
                // 3.信息不完整
                default:
                    incomplete();
            };
        });
    })();

    // 阻止滚动默认事件
    oWrap.on('touchmove', function(event) {
        event.preventDefault();
    });

    // 输入框纯数字输入（含粘贴）
    (function() {
        var re = /^[1~9]\d*$/g;
        $('.edit input').each(function(i) {
            // 禁止复制粘贴
            $(this).attr({
                'oncopy': 'document.selection.empty()',
                'onpaste': 'return false'
            });
            $(this).on('keyup', function(ev) {
                var str = $(this).val();
                if (str.length === 0) {
                    str = '';
                } else if (!re.test(str) && str.length !== 0) {
                    str = parseInt(str);
                    if (isNaN(str)) str = '';
                };
                $(this).val(str);
                // 重置lastIndex数值
                re.lastIndex = 0;
            });
            $(this).on('blur', function() {
                str = $(this).val();
                if (str === '') str = 1;
                $(this).val(str);
            })
        });

    })();

    // 收藏
    $('.collect').tap(function() {
        var oImg = $(this).children('img'),
            oP = $(this).children('p'),
            info = '';

        if (oP.text() === "收藏") {
            // ajax请求
            // 收藏成功
            oImg.attr('src', '../images/details_imgs/down.png');
            oP.text('已收藏');
            info = '收藏成功';
        } else {
            // 取消收藏
            oImg.attr('src', '../images/details_imgs/up.png');
            oP.text('收藏');
            info = '取消收藏'
        }
        fadeInOut(info);
    })

})()