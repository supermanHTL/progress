$('header h2').each(function(i) {
	$(this).tap(function() {
		$('header h2').removeClass('active').eq(i).addClass('active');
		$('table').hide().eq(i).show();
	})
});