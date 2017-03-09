$('#form li').first().tap(function() {
	$('.items').toggle();

	$('.items li').tap(function(e) {
		var txt = $(this).html();
		$('#select').html(txt).css('color', "#333");
		$('.items').hide();

		// 判断是否激活按钮
		$('input').each(function() {
			if ($(this).val() == '') {
				$('#submit').removeClass('active');
				// 跳出循环
				return false;
			};
			$('#submit').addClass('active');
		})
		// 阻止冒泡到至$('#form li')
		e.stopPropagation();
	});
	$(document).tap(function() {
		$('.items').hide();
	})
	return false;
});

// 点击判断
(function() {
	$('input').on('keyup', function() {
		if ($('.way span').text() !== '请选择') {
			$('input').each(function() {
				if ($(this).val() == '') {
					$('#submit').removeClass('active');
					// 跳出循环
					return false;
				}
				$('#submit').addClass('active');
			})
		};
	});

	$('#submit').tap(function() {
		if (!$(this).hasClass('active')) {
			return false;
		} else {
			// 执行提交
			alert('申请成功!')
		}
	})
})();