$.fn._test = function(re) {
	$(this).on('keyup', function() {
		var val = $(this).val();
		if (re.test(val)) {
			$(this).addClass('correct');
		} else {
			$(this).removeClass('correct');
		}
	})
}

// 电话、QQ号码验证
$('#tel')._test(/^1[34578]\d{9}$/);
$('#qq')._test(/[1-9]\d{4,14}/);

$('#form input').on('keyup',function(){
	var aInp = $('#form input');
	aInp.each(function(i){
		if( aInp.eq(i).val() == '' || ( !$('#qq').hasClass('correct') || !$('#tel').hasClass('correct') ) ) {
			$('.confirm').removeClass('active');
			return false;
		};

		$('.confirm').addClass('active');
	});
});

// 提交判定
$('.confirm').tap(function(){
	if (!$(this).hasClass('active')) return;
	alert('可以提交了！');
})