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
// 是否勾选底部全选
function selectAll() {
    if ($('.list-body .selected').length === $('.product-select').length) {
        $('.all-above .select').addClass('selected') /*.attr('tick', 'true')*/ ;
    } else {
        $('.all-above .select').removeClass('selected') /*.attr('tick', 'false')*/ ;
    }
}

// 价格及数量计算
function cal() {
    var aSelected = $('.list-body .selected'),
        aTotal = aSelected.next().find('.quantity em'),
        aPrice = aSelected.next().find('.per'),
        total = 0,
        price = 0;

    aTotal.each(function() {
        total += parseInt($(this).text());
    });
    $('#total').text(total);

    aPrice.each(function(i) {
        price += aTotal.eq(i).text() * ($(this).text() * 100);
    });
    price = (price / 100).toFixed(2);
    $('#sum').text(price);
};

// 退出选择界面
function slideOut() {
    var oWrap = $('#others-wrap');
    $('.others').removeClass('others-in').addClass('others-out');

    clearTimeout(oWrap.timer);
    oWrap.timer = setTimeout(function() {
        oWrap.hide();
    }, 200)

    // 退出初始化
    $('.options li').removeClass('active');
    $('.hasSelected').text('请选择商品属性');
}

// 提示信息弹出(默认背景：打勾)
function fadeInOut(info, cb) {
    $('.fadeInOut span').text(info).parent().show();
    clearTimeout(this.timer);
    this.timer = setTimeout(function() {
        $('.fadeInOut').hide().find('i').removeClass('fadeWarn');
        cb && cb();
    }, 800);
}

// 信息不完整提示

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

// 数据同步到编辑面板
function getData() {
    var ol = $('.list-body'),
        aInfo = ol.find('.info'),
        aEdit = ol.find('.info-edit');

    aInfo.each(function(i) {
        var attr = $(this).find('.info-attr').text();
        var n = $(this).find('.quantity em').text();
        aEdit.eq(i).find('p').text(attr);
        aEdit.eq(i).find('.iNow').val(n);
    });
}
// 删除的过渡动画
function removeAnimation(obj, cb) {
    obj.addClass('removeAnimation');
    // 400ms是过渡动画的时间
    setTimeout(function() {
        obj.removeClass('removeAnimation').remove();
        cb && cb();
    }, 400);
}
// 删除数据后数量、价格的更新
function refresh() {
    var L = $('.product-select').length;
    $('#top-num').text(L);
    cal();
}

/* 页面初始化 */
var init = (function() {
    $('.currency').each(function() {
        $(this).currency();
    });

    $('#top-num').text($('.product-img').length);
})();

// 一下所有弹出层会发生点透，均改用click代替tap事件
// 勾选
(function() {
    // 商品逐一勾选
    $('.product-select').tap(function() {
        var that = $(this),
            oList = that.closest('.list-body'),
            oShop = oList.prev().find('.shop-select'),
            aSelect = oList.find('.select');

        that.toggleClass('selected');

        var s = oList.find('.selected');

        if (s.length === aSelect.length) {
            oShop.addClass('selected');
        } else {
            oShop.removeClass('selected');
        };

        selectAll();
        cal();
    });

    // 商铺内全选
    $('.shop-select').tap(function() {
        var that = $(this),
            kids = that.parent().next().find('.product-select');

        if (that.hasClass('selected')) {
            that.add(kids).removeClass('selected');
        } else {
            that.add(kids).addClass('selected');
        };

        selectAll();
        cal();
    });
})();

// 数量编辑
(function() {
    $('.increase').tap(function() {
        var n = parseInt($(this).prev().val());
        n++;
        $(this).prev().val(n);
        $(this).parents('.info-edit').prev().find('.quantity em').text(n);
    });

    $('.decrease').tap(function() {
        var n = parseInt($(this).next().val());
        n--;
        if (n === 0) n = 1;
        $(this).next().val(n);
        $(this).parents('.info-edit').prev().find('.quantity em').text(n);
    });
})();

// 顶部编辑+底部编辑(全选+移入收藏+批量删除)

(function() {
    // 顶部编辑
    $('.top-edit').tap(function() {
        var edits = $('.bottom-edit, .info-edit'),
            that = $(this);

        that.text() === '编辑' ? that.text('完成') : that.text('编辑');
        $('.shop-edit').toggle();

        if (that.text() === '完成') {
            edits.show();
        } else {
            edits.hide();
        }

        getData();
    });

    // 底部编辑
    // 1.全选
    $('.all-above').tap(function() {
        var oI = $(this).find('i');

        oI.toggleClass('selected');
        if (oI.hasClass('selected')) {
            $('.select').addClass('selected');
        } else {
            $('.select').removeClass('selected');
        };

        cal();
    });

    // 2.批量删除
    $('.bottom-del').click(function() {
        var confirm = $('#confirm'),
            aShop = $('.list-head .selected'),
            aProduct = $('.list-body .selected');

        if (aProduct.length === 0) {
            var info = '请选择商品';
            $('.fadeInOut i').addClass('fadeWarn');
            fadeInOut(info);
        } else {
            confirm.show().find('.ensure').click(function() {
                aShop.each(function() {
                    removeAnimation($(this).closest('.block'));
                });
                aProduct.each(function() {
                    removeAnimation($(this).closest('li'), refresh);
                });

                confirm.hide();

                // 编辑完成即退出并初始化
                $('.top-edit').text('编辑');
                $('.info-edit, .bottom-edit').hide();
                $('.all-above .select').removeClass('selected');
            })
        };
    });
})();

// 店铺内部编辑(删除)
(function() {
    var confirm = $('#confirm');

    $('.shop-edit').tap(function() {
        var that = $(this),
            ol = that.parent().next('ol'),
            aInfo = ol.find('.info'),
            aEdit = ol.find('.info-edit'),
            str = '',
            attr = '';

        if (that.text() === '编辑') {
            str = '完成';
            getData();
        } else {
            aEdit.each(function(i) {
                var n = $(this).find('.iNow').val();
                aInfo.eq(i).find('.quantity em').text(n);
            });
            str = '编辑';
        }

        that.text(str);
        aEdit.toggle();
    });


    // 店铺编辑(单个删除)
    $('.info-edit-del').tap(function() {
        var that = $(this),
            oShop = that.closest('.list-body').parent(),
            closestLi = that.closest('li'),
            len = that.closest('.list-body').children().length;

        confirm.show().find('p').text("确认删除该商品吗？");

        // tap出现了点透,所以用click
        confirm.find('.ensure').click(function() {
            removeAnimation(closestLi, refresh);

            // 无商品时连同商铺一起删除
            if (len === 1) removeAnimation(oShop);
            confirm.hide();
            cal();
        });

        // tap出现了点透,所以用click
        confirm.find('.cancel').click(function() {
            confirm.hide();
        });
    });

    // 移入收藏
    $('.favorite').tap(function() {
        var aSelected = $('.list-body .selected'),
            info = '';
        if (aSelected.length === 0) {
            info = '请选择商品';
            $('.fadeInOut i').addClass('fadeWarn');
        } else {
            info = '收藏成功';
        }
        fadeInOut(info);
    })

    // 阻止滚动
    confirm.on('touchmove', function(event) {
        event.preventDefault();
    });
})();

// 修改当前属性
(function() {
    var editP,chosen,shopEdit,oDel,infoEdit,
        oWrap = $('#others-wrap'),
        oSure = $('.others-bottom .sure'),
        oI = $('.fadeInOut i'),
        opts = $('.options'),
        L = opts.length,
        str = '',
        chosenText = '',
        val = '';

    // 弹出属性选择页面
    $('.info-edit p').tap(function() {
        editP = $(this),
            listBody = editP.closest('.list-body');
        //标记当前
        chosen = editP.closest('li').find('.info-attr');
        shopEdit = listBody.prev().find('.shop-edit');
        oDel = editP.next();
        infoEdit = listBody.find('.info-edit');

        $('.others').removeClass('others-out').addClass('others-in');

        oWrap.show().add('.close').tap(function() {
            slideOut();
            event.stopPropagation();
        });

        $('.others').tap(function(event) {
            event.stopPropagation();
        })

        // 阻止弹出层的默认事件
        oWrap.on('touchmove', function(event) {
            event.preventDefault();
        });
    });
    // 选择颜色和尺码
    $('.options').each(function() {
        var aLi = $(this).find('li:not(.disable)');

        aLi.each(function() {
            $(this).tap(function() {
                str = '';

                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                } else {
                    aLi.removeClass('active');
                    $(this).addClass('active');
                }

                // 提示
                $('.options li.active').each(function() {
                    str += $(this).parent().prev().text() + ':' + $(this).text() + ';';
                });
                chosenText = str;
                if (str === '') {
                    str = '请选择商品属性';
                } else {
                    str = '已选择：' + str;
                };
                $('.hasSelected').text(str);
            })
        })
    });

    // 点击确定
    oSure.tap(function() {
        var len = opts.find('.active').length;

        switch (len) {
            // 1.都不勾选则提示
            case 0:
                info = '请选择商品属性';
                oI.addClass('fadeWarn');
                fadeInOut(info, function() {
                    oI.removeClass('fadeWarn');
                });
                break;
            // 2.信息正确(判断)
            case L:
                str = oWrap.find('input').val();
                info = '修改成功';
                infoEdit.hide();
                fadeInOut(info);
                slideOut();
                editP.closest('li').find('.quantity em').text(str);
                chosen.text(chosenText);
                shopEdit.text('编辑');
                break;
            // 3.信息不完整
            default:
                incomplete();
        };
    });
})();

// 输入框纯数字输入(不可粘贴功能)
(function() {
    var re = /^[1~9]\d*$/g;
    var str = '';
    $('input[type=tel]').each(function() {
        // 禁止复制粘贴
        $('input[type=tel]').attr({
            'oncopy': 'document.selection.empty()',
            'onpaste': 'return false'
        });
        $(this).on('keyup', function(ev) {
            str = $(this).val();
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
