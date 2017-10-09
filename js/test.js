$(function() {
	// 登录页面
	// 手机的验证
	$('.login-phone input').blur(function() {
		var phoneCon = $('.login-phone input').val();
		var phoneTest=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
		if(!phoneTest.test(phoneCon)) {
			$('.phone-tip').show();
		} else {
			$('.phone-tip').hide();
		}
	});
	// 密码格式的验证
	$('.login-pwd input').blur(function() {
		var phoneCon = $('.login-pwd input').val();
		var pwdTest=/^[a-zA-Z]\w{5,17}$/;
		if(!pwdTest.test(phoneCon)) {
			$('.pwd-tip').show();
		} else {
			$('.pwd-tip').hide();
		}
	});
})