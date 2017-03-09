$(function() {
	// 我是买家和创客的的切换
	// 买家
	$('.mj').tap(function() {
		$(this).addClass('active');
		$('.ck').removeClass('active');
		$('.buyer, .cost, .red').show();
		$('.seller, .situation, .charges').hide();
	})
	// 创客
	$('.ck').tap(function() {
		$(this).addClass('active');
		$('.mj').removeClass('active');
		$('.seller, .situation, .charges').show();
		$('.buyer, .cost, .red').hide();
	})

});