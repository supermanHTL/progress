$('#manage').tap(function(){
    if($(this).hasClass('sel')) {
        $('.tick').hide();
    } else {
        $('.tick').show();
        $('#bottom-fix').show();

    }
});

// 勾选
(function(){
	var L = $('.tick').length;
	$('.tick').tap(function(){
		$(this).children().toggleClass('tick-act');
		var l = $('.tick').find('.tick-act').length;
		if ( l === L ) {
			$('.select-all').children().addClass('tick-act');
		}else {
			$('.select-all').children().removeClass('tick-act');
		};
	});

})();

// 全部勾选
(function() {
	var b = false;
	var icons = $('.tick').children();
	$('.select-all').tap(function(){
		$(this).children().toggleClass('tick-act');
		b = !b;
		if (b) {
			icons.addClass('tick-act');
		}else{
			icons.removeClass('tick-act');
		};
	});


    // 删除
    $('.del').tap(function() {
        if($('.tick-act').length != 0) {
            $('.mask').show();
            $('.wrap').addClass('wrap-sel');
        }     
    })
   
    // 取消
    $('.cancel').tap(function() {
        $('.tick').hide();
        $('#bottom-fix').hide();
        $('.tick, .select-all').find('span').removeClass('tick-act');
        if(b) {
            b = !b;
        }
    })

    // 弹窗的确定和取消
     $('.mask-sure').tap(function() {
        $('li').find('.tick-act').parents('li').remove();
        $('.tick, .mask').hide();
        $('#bottom-fix').hide();
        $('.wrap').removeClass('wrap-sel');
    })
    $('.mask-cancel').tap(function() {
        $('.tick, .mask').hide();
        $('#bottom-fix').hide();
        $('.tick, .select-all').find('span').removeClass('tick-act');
        $('.wrap').removeClass('wrap-sel');
    })
})();