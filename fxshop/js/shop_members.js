$('.sort li').each(function (i) {
	$(this).tap(function () {
		$('.sort li').removeClass('active');
		$(this).addClass('active');
		$('.items').hide();
		$('.items').eq(i).show();
	});
});