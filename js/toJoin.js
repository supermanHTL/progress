// 验证是否通过函数
function passOrNo() {
	$('#submit').addClass('sure');
	$('input').each(function(i) {
		if ($('input').eq(i).val() == '' || $('#id_number').hasClass('err') || !$('#tick').hasClass('tick')) {
			$('#submit').removeClass('sure');
		}
	});
};
//身份证正则表达式(15位) 
var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
//身份证正则表达式(18位) 
var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

$('#id_number').on('keyup', function() {
	var id = $(this).val();
	if (isIDCard1.test(id) || isIDCard2.test(id)) {
		$(this).addClass('right').removeClass('err');
	} else {
		$(this).addClass('err').removeClass('right');
	}
});
$('input').on('keyup blur', function() {
	passOrNo();
});

$('#submit').tap(function() {
	if ($(this).hasClass('sure')) {
		alert('填写完整,可以提交');
	} else {
		// alert("填写不完整")
		return false;
	}
});

$('#agreement label').tap(function() {
	$('#tick').toggleClass('tick');
	passOrNo();
});

