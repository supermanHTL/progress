var re1 = /^1[34578]\d{9}$/,
	re2 = /\d{6}/,
	phone, code,
	Countdown = false;

$('#tel').keyup(function() {
	if (Countdown) return;
	phone = $(this).val();
	if (re1.test(phone)) {
		$('#getCode').addClass('getCode');
	} else {
		$('#getCode').removeClass('getCode');
	};
	passOrNo();
});

$('#code').keyup(function() {
	code = $(this).val();
	if (re2.test(code) && $('#getCode').hasClass('getCode')) {
		$('.btn').addClass('btn-active');
	} else {
		$('.btn').removeClass('btn-active');
	}
	passOrNo();
});

// 验证码倒计时
$('#getCode').tap(function() {
	var that = this,
		seconds = 10;

	if (!$(this).hasClass('getCode') || Countdown) return;
	
	$(this).removeClass('getCode').text(seconds + 's后可重试');	
	clearInterval(that.timer);

	Countdown = true;
	that.timer = setInterval(function() {
		seconds--;
		$(that).text(seconds + 's后可重试');
		if (seconds === -1) {
			clearInterval(that.timer);
			Countdown = false;
			$(that).text('获取验证码').addClass('getCode');
		}
	}, 1000)
})

$('.btn').tap(function() {
	if (!$(this).hasClass('btn-active')) {
		return false;
	} else {
		$('#QRcode').show().on('touchmove', function(e) {
			e.preventDefault();
		});
	}
})

// 实时监测
function passOrNo() {
	$('.btn').addClass('btn-active');
	$('input').each(function() {
		if ($(this).val() == '' || !re1.test(phone) || !re2.test(code)) {
			$('.btn').removeClass('btn-active');
		}
	});
};