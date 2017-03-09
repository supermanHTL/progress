$(function () {
	// 待发/收货
	var len = $('.product').length;
	$('.active span').text(len);
	(function() {

		// 每个订单的商品数量amount和金额summary
		(function() {
			var len = $('.product').length;

			for (var i = 0; i < len; i++) {
				var n = parseInt($('.quantity label').eq(i).text()),
					m = ($('.monney').eq(i).text()) * 100,
					t = ($('.transport-cost').eq(i).text()) * 100,
					total = (n * m + t) / 100;
				// 始终保留两个小数
				total = total.toFixed(2);
				$('.amount').eq(i).text(n);
				$('.summary').eq(i).text(total);
			};
		})();
	})();
})