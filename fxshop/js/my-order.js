$(function() {
    // 待付款
    var n = $('.list-body li').length;
    $('.active span').text(n);

    (function() {
        // 所有商品勾选初始化
        $('.select').attr('buy', false);

        // 商品单一选择
        var re = false;
        $('.area').tap(function() {
            var _self = $(this),
                _target = _self.parents('ol').next(),
                _oDetail = _self.next(),
                n = parseInt(_oDetail.find('.quantity label').text()),
                per = parseFloat(_oDetail.find('.price label').first().text()),
                t = parseFloat(_target.find('.transport-cost').text()),
                monney = parseFloat(_target.find('.summary').text()),
                sum = parseInt(_target.find('.amount').text());

            // 样式切换
            var change = _self.children('.select');
            change.toggleClass('selected');
            var b = change.hasClass('selected') ? true : false;
            change.attr('buy', b);

            // 子商品全部选中时，也勾选对应店铺
            var all = _self.parents('.list-body').find('.select').length,
                some = _self.parents('.list-body').find('.selected').length,
                oShop = _self.parents('li').find('.shop-select');

            if (some === all) {
                oShop.addClass('selected').attr('buy', true);
            } else {
                oShop.removeClass('selected').attr('buy', false);
            };

            // 计算数量(逐个商品勾选时)、金额
            if (b) {
                sum += n;
                monney += n * per;
                if (!re) {
                    re = true;
                    monney += t;
                };
            } else {
                sum -= n;
                monney -= n * per;
                if (_self.parents('.list-body').find('[buy=true]').length === 0) {
                    sum = monney = 0;
                    re = false;
                };
            };
            // 始终保留2个小数
            monney = monney.toFixed(2);

            _target.find('.amount').text(sum);
            _target.find('.summary').text(monney);

        });

        // 店铺内商品全选
        $('.shop-area').tap(function() {
            var _self = $(this),
                _child = _self.children(),
                oThisOl = _self.parent().next(),
                kids = oThisOl.find('.product-select'),
                _target = oThisOl.next().find('.list-bottom_total'),
                b = _child.attr('buy'),
                x = 0,
                y = 0;

            // 一开始先找出原先所有被勾选的商品数量和总额
            x = parseInt(_target.find('.amount').text());
            y = parseFloat(_target.find('.summary').text())

            // 样式切换
            if (b === 'false') {
                b = 'true';
                kids.add(_child).addClass('selected');
            } else {
                b = 'false';
                kids.add(_child).removeClass('selected');
            };

            kids.attr('buy', b);
            _child.attr('buy', b);

            // 计算数量(在店铺上勾选全部商品时)、金额
            (function() {
                var aLabel = oThisOl.find('.quantity label'),
                    t = parseFloat(_target.find('.transport-cost').text()),
                    sum = parseInt(_target.find('.amount').text()),
                    total = parseFloat(_target.find('.summary').text()),
                    monney = 0;

                // 点击后处于勾选状态
                if (_child.hasClass('selected')) {
                    for (var i = 0; i < kids.length; i++) {
                        var n = kids.eq(i).parent().next().find('.quantity label').text(),
                            m = kids.eq(i).parent().next().find('.per').text();

                        sum += parseInt(aLabel.eq(i).text());
                        monney += n * m;
                    };
                    sum -= x;
                    total += monney + t - y;
                } else {
                    sum = total = 0;
                };
                total = total.toFixed(2);

                _target.find('.amount').text(sum);
                _target.find('.summary').text(total);
            })();
        });
        
    })();
})
