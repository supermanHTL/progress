$(function() {
	$('.goback').on("touchend", function(e) {
			history.back();
			e.preventDefault();
	})
	
	// 《客服页面》
	// 底部功能模块的出现于消失
	$('.adFn').tap(function() {
		if(!$('.foot').hasClass('fnShow')) {
			$('.foot').addClass('fnShow').removeClass('fnShows');
			$('.main').addClass('main-change').removeClass('main-changes');
		} else {
			$('.foot').addClass('fnShows').removeClass('fnShow');
			$('.main').addClass('main-changes').removeClass('main-change');
		}
		
	})
	// 底部功能模块的出现于消失
	$(document).tap(function(e) {
		if(!$(e.target).hasClass('adFn') && $('.foot').hasClass('fnShow')) {
			$('.main').addClass('main-changes').removeClass('main-change');
			$('.foot').addClass('fnShows').removeClass('fnShow');
		}
	})

	// 发送消息
	$('.sendChat').tap(function() {
		// 获取当前头像图片的路径
		var imgSrc = $('.self-language').children('img').attr('src');
		var sentence = $('.chat-con').val(); //拿到输入框的值
		// 动态插入标签
		var chatEle = "<div class=self-language><img src=" + imgSrc + "><p>" + sentence + "</p></div>";

		// 如果输入框有内容，才可以执行
		if(!sentence == '') {
			$('.main').append(chatEle);
			$('.chat-con').val(''); //消息发送后清空输入框的内容
		}

	})

	// 《密码修改页》
	// 
	// 以字母开头，长度在6~18之间，只能包含字符、数字和下划线
	var pwdTest = /^[a-zA-Z]\w{5,17}$/;
	$('.form input').blur(function() {
		var val = $(this).val();
		// 密码格式不符合要求的时候
		if(!pwdTest.test(val)) {
			$(this).next().addClass('isFalse');
			$('.tip1').show();
		} else {
			$(this).next().addClass('isTrue');
			$('.tip1').hide();
		}	
	})

	// 密码是否一致判断
	$('.form input').eq(2).blur(function() {
		var newVal = $('.form input').eq(1).val();
		if($(this).val() != newVal || $(this).val() == '') {
			$('.tip2').show();
			$(this).next().removeClass('isTrue').addClass('isFalse');
		} else {
			$('.tip2').hide();
			$(this).next().removeClass('isFalse').addClass('isTrue');
		}
	})

	// 确定修改密码的功能
	var timer = null;
	$('.finish').on('touchstart', function(e) {
		clearTimeout(timer);
		var isTrue = $('.form input').eq(0).val() != '' && $('.form input').eq(1).val() != '' &&
		$('.form input').eq(2).val() != '';
		// 这里启用了计时器，延后了跳转事件，因为是在失去焦点后才
		// 判断是否符合跳转
		timer = setTimeout(function() {
			var isT = $('.tip2').css('display') == 'none';
			if($('.tip1').css('display') == 'none' && isT && isTrue) {
				window.location.href = 'change_suc.html';
			} 
		}, 300)
		
	})
	
	// 《地址的修改页面》
	// 地址的选择
	$('.select').tap(function() {
		$(this).addClass('selected').parent().siblings().children('.select')
		.removeClass('selected');
		setTimeout(function() {
			window.location.href="conf_order.html";
		}, 300);
	})
	// 设置为默认收货地址
	$('.act').tap(function() {
		$(this).addClass('active').parent().parent().siblings().find('.act')
		.removeClass('active');
	})

	var ls = window.localStorage;
	$('.re-write').tap(function() {
		ls.setItem('name', $(this).parents('ul').find('.addr-name strong').text());
		ls.setItem('phone', $(this).parents('ul').find('.phone').text());
		ls.setItem('addr', $(this).parents('ul').find('.addr-addr strong').text());		
	})
	
	// 弹窗
	$('.addr-addr i').tap(function() {
		$(this).addClass('choosed');
		$('.mask').show();
		$('.perAddr-wrap').addClass('wrap-sel');
	})
	// 取消
	$('.mask-cancel').on('touchend', function(e) {
		$('.mask').hide();
		$('.perAddr-wrap').removeClass('wrap-sel');
		e.preventDefault();
	})
	// 确定
	$('.mask-sure').on('touchend', function(e) {
		$('.choosed').parent().parent().remove();
		$('.mask').hide();
		$('.perAddr-wrap').removeClass('wrap-sel');
		e.preventDefault();
	})

})