$(function() {
	// 收货地址页面
	// 手机的验证
    $('.phoneNum input').blur(function() {
        var phoneCon = $('.phoneNum input').val();
        var phoneTest=/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        if(!phoneTest.test(phoneCon)) {
            $(this).addClass('isFalse');
        } else {
            $(this).removeClass('isFalse');
        }
    });
    // 联系人不能为空
    // $('.submit').tap(function(e) {
    // 	if($('.man input').val() == '' || $('.phoneNum input').val() == '' 
    // 		&& !$('.man input, .phoneNum input').hasClass('isFalse')) {
    // 		$('.man input').addClass('isFalse');
    // 		$('.phoneNum input').addClass('isFalse');    		
    // 	} else {
    // 		window.location.href="";
    // 		$('.man input').removeClass('isFalse'); 
    // 		$('.phoneNum input').removeClass('isFalse'); 
    // 	}
    // 	console.log(!$('.man input, .phoneNum input').hasClass('isFalse'))
    // })
})