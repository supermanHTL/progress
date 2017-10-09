$('.sort li').each(function (i) {
	$(this).tap(function () {
		$('.sort li').removeClass('active').eq(i).addClass('active');
		$('.items').hide().eq(i).show();
	});
});